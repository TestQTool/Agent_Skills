# Selenium Java JUnit Framework Coding Standards

## File Outputs Per Feature

```text
src/main/java/pageObjects/<Feature>PageObjects.java
src/main/java/pages/<Feature>Page.java
src/test/java/tests/<Feature>Test.java
```

Framework wiring files:

```text
pom.xml
src/test/resources/config.properties
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
public static final By LOGIN_BUTTON = By.id("login");
```

## Page / Keyword Rules

- Page or keyword files contain interactions, waits, and assertions.
- Use framework helper methods instead of low-level driver calls when helpers exist.
- One method should represent one user action or one assertion.
- Credentials must come from role-based helpers or environment-backed test data.

Example action:

```text
public void clickLogin() { click(LOGIN_BUTTON); }
```

Example assertion:

```text
assertTrue(isDisplayed(DASHBOARD_HEADING), "Dashboard heading should be visible");
```

## Test / Spec / Feature Rules

- Test files orchestrate behavior only.
- Do not hardcode selectors in tests.
- Every automated case must include a TC-ID and suite marker/tag: `@Tag("smoke")`.
- Use data-driven patterns for repeated flows.
- Keep tests independent and safe for parallel execution unless the framework requires serial execution.

Example:

```text
@Test
@Tag("smoke")
void TC_LGN_001_loginWithValidCredentials() {
    loginPage.loginAs("Admin");
    loginPage.verifyDashboardDisplayed();
}
```

## Runtime Rules

Run command:

```bash
mvn test -Dgroups=smoke
```

Do not write absolute local paths, prompt repository URLs, API tokens, GitHub tokens, or secrets into generated files.
