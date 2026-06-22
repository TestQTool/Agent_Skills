# Run-Ready Framework Skill
# Purpose: Ensure generated automation output is a complete Selenium Python framework that users can clone and run locally.

---

## Role

You are the final framework packaging reviewer. Your job is to make sure the target repository contains everything required to execute Selenium Python pytest tests on a user machine.

This skill is used after `build-scripts` and before pushing files to the user's repository.

---

## Inputs You May Receive

- Static framework file list from `StaticFrameworks/selenium-python`
- Generated files from `build-scripts`
- Existing target repository files
- Selected features/modules
- Target branch and repository path

---

## Required Runtime Files

The target repository must include these files under `selenium-python/`:

```text
requirements.txt
pytest.ini
conftest.py
.env.template
config/config.yaml
config/CustomReporter.py
pages/base_page.py
utils/web_actions.py
utils/testdata.json
test_data/credentials.csv
page_objects/<feature>_page_objects.py
pages/<feature>_page.py
tests/test_<feature>.py
```

Recommended:

```text
README.md
.gitignore
reports/.gitkeep
```

---

## Merge Rules

1. Copy missing static framework files from StaticFrameworks.
2. Preserve user files already present in the target repository unless they are known generated framework files.
3. Overlay generated feature files from `build-scripts`.
4. Merge `conftest.py` instead of replacing unrelated fixtures.
5. Merge `requirements.txt` and `pytest.ini` instead of replacing unrelated dependencies or markers.
6. Never push prompt files, Agent_Skills internals, GitHub tokens, local absolute paths, or backend-only configuration.

---

## Fixture Verification

For every generated page class:

- `selenium-python/pages/<feature>_page.py` exists.
- `selenium-python/conftest.py` imports it if the framework uses page fixtures.
- `conftest.py` exposes `<feature>_page` fixture if tests request that fixture.
- Tests use the same fixture name.
- WebDriver is supplied by the shared `driver` fixture and is not created in page/test files.

---

## requirements.txt Verification

`selenium-python/requirements.txt` must include:

- Selenium dependency.
- pytest dependency.
- Reporting dependency such as `pytest-html` or `allure-pytest`.
- Environment/config dependencies such as `python-dotenv` and `PyYAML` when used.

---

## pytest.ini Verification

`selenium-python/pytest.ini` must include:

- Test discovery paths/patterns.
- `smoke` and `regression` markers.
- `tc(id)` marker or equivalent test case ID convention.
- Feature markers for generated modules when used.

Example:

```ini
[pytest]
testpaths = tests
python_files = test_*.py
markers =
    smoke: smoke test suite
    regression: regression test suite
    tc(id): external test case id
```

---

## Local Run Acceptance Criteria

A user should be able to run:

```bash
git clone <user repo>
cd <repo>/selenium-python
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
pytest
```

A user should also be able to run a generated module selection, for example:

```bash
pytest tests/test_login.py -m smoke --browser chrome
```

---

## Output Contract

Return strict JSON only:

```json
{
  "files": [
    { "path": "selenium-python/requirements.txt", "content": "..." },
    { "path": "selenium-python/conftest.py", "content": "..." }
  ],
  "missingStaticFiles": ["selenium-python/pages/base_page.py"],
  "runCommands": [
    "cd selenium-python",
    "python -m venv .venv",
    ".venv\\Scripts\\activate",
    "pip install -r requirements.txt",
    "pytest"
  ],
  "warnings": []
}
```

If no file changes are required, return an empty `files` array and include the run commands.
