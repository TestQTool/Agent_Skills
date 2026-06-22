# Skill: Generate Tests - Convert Work Items to BDD Scripts

## When to use this skill

Use when the user provides ADO/Jira work items, user stories, acceptance criteria, manual test cases, or scenario lists and asks to generate Selenium Python BDD automation.

---

## Input the Agent Expects

The user may provide one or more of:

- ADO/Jira test cases with title, steps, and expected results
- User story with acceptance criteria
- Manual test case document
- Feature name plus scenarios to automate

---

## Generation Process

### Step 1 - Read standards

Read `standards/bdd-standards.md` before writing code.

### Step 2 - Read app context

Read `app-context.md` to understand the module, roles, URLs, and known quirks.

### Step 3 - Read static framework templates

Read templates from the cloned static framework when present:

- `page_objects/_template_page_objects.py`
- `pages/_template_page.py`
- `features/steps/_template_steps.py`
- `features/_template.feature`

These are the generation contract. Follow the project's imports, fixture/context style, and naming exactly.

### Step 4 - Read mapping template

Read `templates/test-case-template.md` and map each incoming work item to Gherkin.

### Step 5 - Determine what already exists

Check `features/` and `features/steps/`:

- If a feature file exists, add new scenarios to it and reuse existing steps when the business wording matches.
- If it does not exist, generate all four feature-level files.

### Step 6 - Generate in this order

#### 6a. Feature file - `features/<feature>.feature`

- One Feature block per file.
- Use Background for shared login/navigation.
- Each ADO test case maps to one Scenario or Scenario Outline.
- Tags: `@smoke` or `@regression`, plus `@<featureName>` and `@TC-XXX-NNN`.
- Use business language only.

#### 6b. PageObjects - `page_objects/<feature>_page_objects.py`

- Contains only a class of uppercase locator tuple constants.
- Import only `By` unless the local template requires otherwise.
- Stub unverified selectors in an UNVERIFIED section.
- Mirror the section structure from `_template_page_objects.py` when available.

#### 6c. Page class - `pages/<feature>_page.py`

- Extends `BasePage` or the framework's page base class.
- Imports locators from `<feature>_page_objects.py` only.
- Methods cover every When/Then step in the feature file.
- Group methods into Navigation, Actions, and Assertions sections.
- Assertions use plain `assert` with descriptive messages or the framework's assertion helper, according to local template style.
- Do not create a WebDriver instance here; use `self.driver` or framework-provided context.

#### 6d. Step definitions - `features/steps/<feature>_steps.py`

- Use Behave decorators: `@given`, `@when`, `@then`, `@step`.
- Each step body delegates to one page method whenever possible.
- Use `context` for page objects and cross-step data, or the framework's scenario context helper if present.
- Reuse existing common steps if already defined.

### Step 7 - Output format

Output each file in full with this header:

```text
===== features/<feature>.feature =====
<full file content>

===== page_objects/<feature>_page_objects.py =====
<full file content>

===== pages/<feature>_page.py =====
<full file content>

===== features/steps/<feature>_steps.py =====
<full file content>
```

### Step 8 - Post-generation checklist

Before outputting or committing, verify:

- Every feature step has a matching Behave step definition.
- Every step definition delegates to a page method and has no assertions.
- Every page method uses locators only from `<Feature>PageObjects`.
- No hardcoded credentials; role-based helpers are used.
- No direct `webdriver.Chrome()`, `webdriver.Firefox()`, or driver setup in feature code.
- All scenarios have suite, feature, and test-case tags.
- Gherkin contains no selectors or technical DOM details.
- Unverified selectors are clearly marked.

---

## Common Step Patterns

```python
from behave import given, when, then
from pages.leave_management_page import LeaveManagementPage


@given('the admin is logged in with role "{role}"')
def step_login_as(context, role):
    context.login_page.login_as(role)


@given("the admin is on the Leave Management page")
def step_open_leave_management(context):
    context.leave_management_page = LeaveManagementPage(context.driver)
    context.leave_management_page.navigate()


@when("the admin submits the leave request")
def step_submit_leave_request(context):
    context.leave_management_page.submit_leave_request()


@then("the leave request is submitted successfully")
def step_verify_leave_request(context):
    context.leave_management_page.verify_leave_request_submitted()
```

Store cross-step data on `context` or the framework scenario context, for example `context.created_record_id = record_id`.
