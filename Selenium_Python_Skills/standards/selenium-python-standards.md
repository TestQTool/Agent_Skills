# Selenium Python Coding Standards - Hybrid/POM Framework Structure

Generated Selenium Python scripts must match the static framework in `StaticFrameworks/selenium-python` and must run after the user clones the target repository.

---

## File Outputs Per Feature

```text
selenium-python/page_objects/<feature>_page_objects.py
selenium-python/pages/<feature>_page.py
selenium-python/tests/test_<feature>.py
selenium-python/conftest.py
selenium-python/requirements.txt
selenium-python/pytest.ini
```

The first three are feature files. `conftest.py`, `requirements.txt`, and `pytest.ini` are framework wiring files and must be updated only when necessary.

---

## page_objects Rules

- File path: `selenium-python/page_objects/<feature>_page_objects.py`.
- Import only `By` from `selenium.webdriver.common.by`.
- Define one PageObjects class named `<Feature>PageObjects`.
- Locators are uppercase class constants as Selenium tuples, for example `LOGIN_BUTTON = (By.ID, "login-button")`.
- No WebDriver calls, functions, waits, assertions, conditional logic, or runtime code.
- Group locators by section.
- Use clear names ending in element type where useful: `LOGIN_BUTTON`, `EMAIL_INPUT`, `STATUS_DROPDOWN`, `RESULTS_TABLE`.

Selector priority:

1. Stable `By.ID` when the id is not generated.
2. Accessibility and label-based selectors, including `aria-label`, label text, role, and accessible name relationships.
3. Dynamic XPath when stable, readable, and tied to durable text, attributes, parent/child relationships, or sibling relationships.
4. Stable attributes such as `data-testid`, `name`, `type`, `placeholder`, or `title`.
5. Stable CSS classes that are not generated or hashed.
6. Exact text XPath as a last resort.

XPath is valid when it improves reliability or expresses relationships better than CSS. Prefer dynamic XPath such as `//*[contains(text(), 'Save')]`, `//button[contains(., 'Submit')]`, `//label[contains(., 'Email')]/following::input[1]`, or `//*[contains(@class,'modal')]//button[contains(.,'Cancel')]`. Avoid brittle absolute XPath, generated ids/classes, and blind positional chains such as `/html/body/div[2]/div[3]/button[1]`.

---

## Page Class Rules

- File path: `selenium-python/pages/<feature>_page.py`.
- Import `BasePage` from `pages.base_page`.
- Import selectors from `page_objects.<feature>_page_objects`.
- Class name: `<Feature>Page`.
- Constructor: `def __init__(self, driver): super().__init__(driver)`.
- One page method should represent one user action or assertion.
- Navigation methods call `self.open(path_or_url)` and wait for page load/readiness.
- Action methods use inherited helpers such as `click`, `fill`, `select_by_visible_text`, `wait_until_visible`, `wait_until_clickable`, `get_text`, `get_count`, `is_visible`, `scroll_into_view`, and `wait_for_url_contains`.
- Assertion methods wait first and use descriptive assertion messages.
- Use `self.test_data` and `self.get_login_data_by_role(role_name)` instead of hardcoded data.

---

## Test Rules

- File path: `selenium-python/tests/test_<feature>.py`.
- Use pytest.
- Use page fixtures from `conftest.py` or instantiate page classes with the shared `driver` fixture.
- Every test has a TC-ID marker such as `@pytest.mark.tc("TC-LGN-001")` when the framework supports custom marker payloads, or includes the TC-ID in the test function name/docstring.
- Every test is marked `@pytest.mark.smoke` or `@pytest.mark.regression`.
- Use page object methods only.
- Do not use raw Selenium locators or `driver.find_element` in tests.
- Use `allure.step()` when Allure is configured; otherwise keep step comments precise.
- Use `pytest.mark.parametrize` for data-driven scenarios.

---

## Fixture Rules

When a new page class is generated, update `selenium-python/conftest.py` only if the project uses page fixtures.

Add import:

```python
from pages.feature_page import FeaturePage
```

Add fixture:

```python
@pytest.fixture
def feature_page(driver):
    return FeaturePage(driver)
```

Preserve all existing imports and fixtures.

---

## pytest.ini Rules

Generated feature markers should be added without removing existing markers.

Required marker examples:

```ini
markers =
    smoke: smoke test suite
    regression: regression test suite
    tc(id): external test case id
```

Feature markers are recommended:

```ini
    login: login module tests
```

---

## requirements.txt Rules

Generated frameworks should include or preserve:

```text
selenium>=4.20.0
pytest>=8.0.0
pytest-html>=4.1.0
pytest-xdist>=3.5.0
allure-pytest>=2.13.0
python-dotenv>=1.0.0
PyYAML>=6.0.0
```

Do not remove existing dependencies.

---

## Runtime Rules

The generated repository must run on a user machine with:

```bash
cd selenium-python
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
pytest
```

Do not write absolute local paths, backend URLs, prompt repository URLs, API tokens, GitHub tokens, or secrets into generated files.

---

## Exploration-Backed Selector Rule

Test inventory cases provide expected behavior and steps. They do not guarantee accurate selectors. Before final script generation, the system should use supplied exploration results when available.

When exploration results are available, generated scripts must use those explored selectors. When exploration results are not available, selectors are best-effort and uncertain selectors must be marked with `# TODO: verify selector against live app`.
