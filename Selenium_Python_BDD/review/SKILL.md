# Skill: Review - PR Review for BDD Layer Compliance

## When to use this skill

Use when reviewing a PR that adds or modifies Selenium Python BDD automation scripts.

---

## Review Checklist

### Layer 1 - `page_objects/<feature>_page_objects.py`

- [ ] Contains locator tuple constants only; no WebDriver calls, methods, assertions, or logic.
- [ ] Imports only `By` unless local template requires otherwise.
- [ ] Constants are `UPPER_SNAKE_CASE`.
- [ ] Sections present: Page Heading, Form Inputs, Buttons, Messages, Table, Modal, UNVERIFIED.
- [ ] No absolute XPath.
- [ ] No generated class names without an `UNSTABLE` comment.

### Layer 2 - `pages/<feature>_page.py`

- [ ] Extends `BasePage` or the framework page base class.
- [ ] Does not instantiate WebDriver.
- [ ] Defines no locator tuples; imports from page objects only.
- [ ] Sections present: Navigation, Actions, Assertions.
- [ ] Assertions live here and include descriptive failure messages.
- [ ] No Behave decorators.
- [ ] No hardcoded credentials.

### Layer 3 - `features/steps/<feature>_steps.py`

- [ ] Uses Behave decorators only: `@given`, `@when`, `@then`, `@step`.
- [ ] Each step body delegates to one page method where possible.
- [ ] No locator tuples or direct WebDriver calls.
- [ ] No assertions.
- [ ] Cross-step data uses Behave `context` or framework scenario context.
- [ ] Step text matches feature file wording.

### Layer 4 - `features/<feature>.feature`

- [ ] Feature description present: As a / I want / So that.
- [ ] Background contains only shared preconditions.
- [ ] Every scenario has `@smoke` or `@regression`, `@<featureName>`, and `@TC-XXX-NNN`.
- [ ] Business language only; no XPath, CSS selectors, IDs, or DOM terminology.
- [ ] Max 7 steps per scenario.
- [ ] Scenario Outline used for 3+ data variations.
- [ ] Scenarios are independent.

### Framework Files - must not be modified

- [ ] Base page file not modified.
- [ ] Driver factory not modified.
- [ ] Behave environment/hooks not modified.
- [ ] Shared web actions not modified.
- [ ] Reporting utilities not modified.
- [ ] Runner/config files not modified unless explicitly requested.

### Build Verification

- [ ] `behave --tags=@smoke` or the project smoke command passes.
- [ ] New scenarios have at least one green browser run.
- [ ] No undefined or ambiguous steps.
- [ ] No new failures introduced in existing scenarios.

---

## Scoring

| Violations | Score | Decision |
|------------|-------|----------|
| 0 | 100 | Approve |
| 1-2 | 85+ | Approve with note |
| 3-5 | 70+ | Request changes |
| 6+ | <70 | Block PR |

---

## PR Comment Template

```text
## BDD Automation Review - Quality Matrix

Score: XX/100

Passed
- Layer separation correct
- Gherkin in business language
- Required tags present

Issues Found

[LAYER-2 | MEDIUM] pages/leave_management_page.py line 47:
Locator tuple defined in page class instead of page_objects.
Move it to page_objects/leave_management_page_objects.py.

[LAYER-3 | HIGH] features/steps/leave_management_steps.py line 32:
Assertion found in step definition.
Move the assertion to LeaveManagementPage.verify_success_message().

Decision: Request Changes
```
