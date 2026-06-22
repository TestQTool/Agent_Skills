# BDD Standards - Selenium Python BDD

These rules are enforced during review and must be followed during generation.

---

## Layer Rules

### Layer 1 - `page_objects/<feature>_page_objects.py`

- Contains only Selenium locator tuple constants.
- Uses `from selenium.webdriver.common.by import By`.
- No methods, constructors, driver usage, assertions, waits, or logic.
- Group constants by section:

```python
# Page Heading
# Form Inputs
# Buttons
# Dropdowns
# Messages
# Table
# Modal
# UNVERIFIED - update after exploration
```

- Put unverified AI-generated stubs at the bottom.

### Layer 2 - `pages/<feature>_page.py`

- Extends the framework `BasePage`.
- Imports locators only from `<feature>_page_objects.py`.
- Uses `self.driver` or BasePage helpers; never creates a driver.
- Groups methods by:

```python
# Navigation
# Actions
# Assertions
```

- All assertions live here with descriptive messages.
- No Behave decorators in page classes.
- No locator tuples in page classes.

### Layer 3 - `features/steps/<feature>_steps.py`

- Uses `from behave import given, when, then, step`.
- Each step delegates to one page method where possible.
- Stores cross-step data on `context` or framework scenario context.
- No assertions, locators, waits, or direct WebDriver interaction in steps.

### Layer 4 - `features/<feature>.feature`

- Pure Gherkin in business language.
- No technical details such as IDs, CSS selectors, XPath, DOM nodes, or implementation wording.
- Background contains shared preconditions only.
- Scenario Outline plus Examples for data-driven cases.

---

## Naming Conventions

| Artifact | Convention | Example |
|----------|------------|---------|
| Feature file | `<feature>.feature` | `leave_management.feature` |
| Page class file | `<feature>_page.py` | `leave_management_page.py` |
| Page class | `<Feature>Page` | `LeaveManagementPage` |
| PageObjects file | `<feature>_page_objects.py` | `leave_management_page_objects.py` |
| PageObjects class | `<Feature>PageObjects` | `LeaveManagementPageObjects` |
| Step definitions | `<feature>_steps.py` | `leave_management_steps.py` |
| Test case tag | `@TC-<MODULE>-<NNN>` | `@TC-LM-001` |
| Feature tag | `@<featureName>` | `@leaveManagement` |
| Suite tags | `@smoke` or `@regression` |  |

---

## Gherkin Writing Rules

1. Feature name equals module name.
2. Scenario name comes from ADO/Jira test case title when possible.
3. Background contains login and navigation shared by all scenarios.
4. Given = precondition or state.
5. When = user action.
6. Then = expected outcome or assertion.
7. And = continuation of previous Given/When/Then.
8. Keep scenarios to 7 steps or fewer; split long flows.
9. Use Scenario Outline when the same flow runs with 3+ data rows.
10. Each scenario is independent and creates or locates its own data.

---

## Tag Rules

Every scenario must have:

- `@smoke` or `@regression`, not both.
- `@TC-XXX-NNN`, mapped to the source test case.
- `@<featureName>`, for selective runs.

Optional tags:

- `@wip` - in progress, excluded from CI when configured.
- `@skip` - known broken, excluded from normal runs.
- `@api` - scenario uses API setup/verification.

---

## What The Agent Must Never Do

- Add locators inside page classes or step definitions.
- Add assertions inside step definitions.
- Add Behave decorators to page classes.
- Instantiate Selenium WebDriver in generated feature-level code.
- Hardcode credentials or secrets.
- Modify framework-level files.
- Write Gherkin with implementation details.
