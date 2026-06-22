# QA Automation - Selenium Python Project Memory
# Loaded for script generation. Keep this domain-neutral; app-specific details come from docs/app-context.md or backend project config.

---

## Goal

Generate a self-contained Selenium Python Hybrid/POM automation framework that a user can clone and run on their own machine.

The final repository must not depend on Qentrix backend, local prompt files, Agent_Skills, or StaticFrameworks at runtime. Those repos are generation inputs only.

---

## Runtime Layout

```text
selenium-python/
  requirements.txt
  pytest.ini
  conftest.py
  .env.template
  config/
    config.yaml
    CustomReporter.py
  pages/
    base_page.py
    <feature>_page.py
  page_objects/
    <feature>_page_objects.py
  tests/
    test_<feature>.py
  test_data/
    credentials.csv
  utils/
    web_actions.py
    testdata.json
```

---

## Framework Architecture

```text
WebActions (utils/web_actions.py)
  -> BasePage (pages/base_page.py)
    -> FeaturePage (pages/<feature>_page.py)
```

- `page_objects/<feature>_page_objects.py` contains Selenium locator tuples only.
- `pages/<feature>_page.py` contains page actions and assertions.
- `tests/test_<feature>.py` contains test orchestration using pytest steps/logging or Allure steps when configured.
- `conftest.py` wires WebDriver, browser options, config, and page fixtures.

---

## Generated Files Per Feature

For every feature, generate or update:

```text
selenium-python/page_objects/<feature>_page_objects.py
selenium-python/pages/<feature>_page.py
selenium-python/tests/test_<feature>.py
selenium-python/conftest.py
selenium-python/requirements.txt
selenium-python/pytest.ini
```

Only update `conftest.py`, `requirements.txt`, and `pytest.ini` when needed. Preserve existing content and append missing fixtures, markers, dependencies, and settings without removing unrelated entries.

---

## Coding Standards

### page_objects/<feature>_page_objects.py

- Class constants only.
- Import only `By` from Selenium unless the local template requires otherwise.
- No WebDriver calls, functions, assertions, waits, classes with behavior, or runtime logic.
- Group locators by page area.
- Prefer stable selectors.
- Add `# TODO: verify selector against live app` only when exploration data is missing.

### pages/<feature>_page.py

- Import `BasePage` from `pages.base_page`.
- Import selectors from `page_objects.<feature>_page_objects`.
- Class extends `BasePage`.
- Constructor calls `super().__init__(driver)`.
- Page methods use inherited `WebActions` helpers.
- Credentials come from `self.get_login_data_by_role(role_name)` or environment-driven test data, never from hardcoded secrets.
- Assertion methods wait before asserting and include descriptive assertion messages.

### tests/test_<feature>.py

- Use pytest.
- Use page fixtures from `conftest.py` or instantiate page classes with the shared `driver` fixture.
- Every test name or marker includes a TC-ID and `smoke` or `regression`.
- Use page object methods only; do not use raw selectors in tests.
- Use `allure.step()` when Allure is configured; otherwise log steps with clear comments or helper calls.
- Use `pytest.mark.parametrize` for data-driven cases.

---

## Selector Priority

1. Stable `By.ID` when the id is stable and not generated.
2. Accessibility and label-based selectors: `aria-label`, associated label, role, accessible name, or visible label relationship.
3. Dynamic XPath when it is stable, readable, and best represents the element relationship.
4. Stable attributes such as `data-testid`, `name`, `type`, `placeholder`, `title`, or custom semantic attributes.
5. Stable CSS classes that are not generated or hashed.
6. Exact text XPath as a last resort.

XPath is allowed and useful when written dynamically. Prefer XPath patterns based on durable text, labels, parent/child relationships, sibling relationships, or stable attributes, such as `//*[contains(text(), 'Save')]`, `//button[contains(., 'Submit')]`, `//label[contains(., 'Email')]/following::input[1]`, or `//*[@id='login']//button[contains(., 'Submit')]`. Avoid brittle absolute XPath, generated ids/classes, and blind positional chains. If a selector cannot be verified from exploration, mark it with `# TODO: verify selector against live app`.

---

## Exploration Findings For Accurate Scripts

Approved test cases from test inventory are the behavioral source of truth. Automation script generation must not load or run `explore/SKILL.md` by default.

If exploration notes, selector findings, DOM snapshots, or screenshots are supplied, treat them as first-priority evidence for selectors, waits, page actions, and assertions. If exploration data is missing, do not block script generation. Fall back to intelligent selector inference from approved test-case steps, app context, existing repository files, and common stable UI patterns; mark uncertain selectors with `# TODO: verify selector against live app`.

---

## Skill Read Order

For automation script generation, read and apply the prompt files in this order:

1. `CLAUDE.md`
2. `docs/onboarding-guide.md`
3. `docs/app-context.md` or client/project-specific app context
4. `standards/selenium-python-standards.md`
5. `build-scripts/SKILL.md`
6. `run-ready-framework/SKILL.md`
7. `../GitHub_Workflow/SKILL.md`
8. Static framework files from `StaticFrameworks/selenium-python`
9. Selected test inventory cases, supplied exploration findings, and existing target repository files

Do not read `explore/SKILL.md` during normal automation script generation. Use it only in a separate exploration workflow that produces exploration notes or selector findings before script generation. Automation script generation must still proceed when those artifacts are absent by using fallback selector inference rules.

Use `heal/SKILL.md` only for failing or broken existing scripts.

---

## Runtime Rules

Generated code must run after:

```bash
cd selenium-python
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
pytest
```

Specific generated scripts should also work, for example:

```bash
pytest tests/test_login.py -m smoke --browser chrome
pytest tests/test_login.py -m regression --browser chrome
```

Use environment variables for machine-specific values:

```text
BASE_URL=<application url>
TEST_ROLE=Admin
HEADLESS=true
BROWSER=chrome
```

Do not write local absolute paths, backend URLs, GitHub tokens, API keys, or prompt repository paths into generated files.
