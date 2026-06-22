# Skill: Build Scripts - Run Tests and Interpret Results

## When to use this skill

Use when the user asks to install dependencies, run tests, check results, troubleshoot runs, or configure CI for Selenium Python BDD.

---

## Run Commands

```bash
python -m venv .venv
.venv\Scripts\activate
source .venv/bin/activate
pip install -r requirements.txt

behave
behave --tags=@smoke
behave --tags=@regression
behave --tags=@leaveManagement
behave --tags=@TC-LM-001
behave --tags="@smoke and @leaveManagement"

behave -D browser=firefox
behave -D browser=edge
behave -D browser=chrome -D headless=true
behave -D environment=staging -D base_url=https://staging.app.com

behave -f allure_behave.formatter:AllureFormatter -o reports/allure-results
allure serve reports/allure-results
```

If the project wraps Behave with pytest or a custom runner, prefer the local README/script once inspected.

---

## CI Overrides

Use `behave -D key=value` or environment variables for CI-specific values:

```yaml
- script: |
    python -m venv .venv
    .venv\Scripts\activate
    pip install -r requirements.txt
    behave --tags=@smoke -D browser=chrome -D headless=true -D base_url=$(BASE_URL)
  displayName: Run Selenium Python BDD smoke tests
```

---

## Interpreting Results

### Exit codes

- `0` = all selected scenarios passed
- Non-zero = one or more scenarios failed, were undefined, or the test runner crashed

### Reports location after run

```text
reports/allure-results/        <- Allure raw results
reports/behave-report.json     <- JSON report if configured
reports/junit/                 <- JUnit XML for ADO/GitHub publishing
reports/screenshots/           <- failure screenshots if configured
reports/html/                  <- generated HTML reports if configured
```

### Common failures and fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `Undefined step` | Step text has no matching decorator | Align feature step with existing step or add a thin step definition |
| `AmbiguousStep` | Multiple decorators match same text | Rename one step to be feature-specific |
| `NoSuchElementException` | Locator wrong or element not loaded | Use explore skill and update page object locator |
| `TimeoutException` | Slow page or wrong wait condition | Add/adjust explicit wait in page method |
| `StaleElementReferenceException` | DOM refreshed after locating element | Re-locate element after wait; avoid caching WebElements |
| `AssertionError` | Expected value changed or app behavior changed | Confirm expected behavior before updating assertion/test data |
| `AttributeError: 'Context' object has no attribute ...` | Context object/page not initialized | Initialize page in Background/common step or environment hook |
| `SessionNotCreatedException` | Browser/driver mismatch | Upgrade Selenium/browser or rely on Selenium Manager |

---

## Parallel Execution

Behave is commonly serial by default. If the project uses `behave-parallel`, `pytest-xdist`, or a custom runner, verify that:

- Each worker gets an isolated WebDriver instance.
- Test data is not shared across scenarios.
- Scenario context is per scenario.
- Reports and screenshots use unique filenames.

---

## Adding New Tag-Based Run Targets

Prefer tags over new runner files:

```bash
behave --tags=@sanity
behave --tags="@sanity and not @wip"
```

Only add runner scripts if the existing framework already has that pattern.
