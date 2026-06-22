# Robot Framework Robot Selenium Library Coding Standards

## File Outputs Per Feature

```text
resources/locators/<feature>_locators.resource
resources/pages/<feature>_keywords.resource
tests/<feature>.robot
```

Framework wiring files:

```text
requirements.txt
variables/config.yaml
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
${LOGIN_BUTTON}    id:login
```

## Page / Keyword Rules

- Page or keyword files contain interactions, waits, and assertions.
- Use framework helper methods instead of low-level driver calls when helpers exist.
- One method should represent one user action or one assertion.
- Credentials must come from role-based helpers or environment-backed test data.

Example action:

```text
Login As Role
    [Arguments]    ${role}
    Input Text    ${USERNAME_INPUT}    ${USERNAME}
    Input Password    ${PASSWORD_INPUT}    ${PASSWORD}
    Click Button    ${LOGIN_BUTTON}
```

Example assertion:

```text
Page Should Contain Element    ${DASHBOARD_HEADING}
```

## Test / Spec / Feature Rules

- Test files orchestrate behavior only.
- Do not hardcode selectors in tests.
- Every automated case must include a TC-ID and suite marker/tag: `[Tags]    smoke    TC-XXX-NNN`.
- Use data-driven patterns for repeated flows.
- Keep tests independent and safe for parallel execution unless the framework requires serial execution.

Example:

```text
TC-LGN-001 Login With Valid Credentials
    [Tags]    smoke    TC-LGN-001
    Login As Role    Admin
    Dashboard Should Be Displayed
```

## Runtime Rules

Run command:

```bash
robot -i smoke tests
```

Do not write absolute local paths, prompt repository URLs, API tokens, GitHub tokens, or secrets into generated files.
