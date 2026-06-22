# Selenium Python Behave Framework Coding Standards

## File Outputs Per Feature

```text
page_objects/<feature>_page_objects.py
pages/<feature>_page.py
features/steps/<feature>_steps.py
```

Framework wiring files:

```text
requirements.txt
behave.ini
```

## Locator / Selector Rules

- Locator files contain selectors only.
- Do not place WebDriver/browser calls, assertions, waits, or business logic in locator files.
- Group selectors by page area: headings, inputs, buttons, messages, tables, modals, navigation.
- Prefer stable ids, accessibility labels, names, test ids, semantic attributes, readable dynamic XPath, then stable CSS.
- Avoid absolute XPath, generated class names, blind positional selectors, and brittle text-only selectors unless no alternative exists.
- Mark inferred selectors with `TODO: verify selector against live app`.

Example:

```text
LOGIN_BUTTON = (By.ID, "login")
```

## Page / Keyword Rules

- Page or keyword files contain interactions, waits, and assertions.
- Use framework helper methods instead of low-level driver calls when helpers exist.
- One method should represent one user action or one assertion.
- Credentials must come from role-based helpers or environment-backed test data.

Example action:

```text
def click_login(self):
    self.click(LoginPageObjects.LOGIN_BUTTON)
```

Example assertion:

```text
assert expected_message in self.get_text(LoginPageObjects.ERROR_MESSAGE)
```

## Test / Spec / Feature Rules

- Test files orchestrate behavior only.
- Do not hardcode selectors in tests.
- Every automated case must include a TC-ID and suite marker/tag: `@smoke @TC-XXX-NNN`.
- Use data-driven patterns for repeated flows.
- Keep tests independent and safe for parallel execution unless the framework requires serial execution.

Example:

```text
@then("the dashboard is displayed")
def step_dashboard_displayed(context):
    context.login_page.verify_dashboard_displayed()
```

## Runtime Rules

Run command:

```bash
behave --tags=@smoke
```

Do not write absolute local paths, prompt repository URLs, API tokens, GitHub tokens, or secrets into generated files.
