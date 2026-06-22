# Playwright Java TestNG Framework Standards

## File Outputs

```text
src/main/java/pageobjects/<Feature>PageObjects.java
src/main/java/pages/<Feature>Page.java
src/test/java/tests/<Feature>Test.java
testng.xml
```

## Selector / Endpoint Rules

- Object/endpoint files contain selectors or endpoint constants only.
- No driver calls, assertions, waits, or business logic in object/endpoint files.
- Mark inferred selectors/endpoints with TODO when not verified.

Example:

```java
public static final String LOGIN_BUTTON = "#login";
```

## Page / Screen / Client Rules

- Action/client classes own interactions, request construction, waits, and assertions.
- Tests call meaningful methods only.
- Credentials and environment data come from config or role helpers.

## TestNG Rules

- Every test has a TC-ID in method name, description, or annotation.
- Every test is grouped as smoke, regression, api, mobile, or platform-specific where appropriate.
- Use DataProvider for data variants.
- Use TestNG listeners for evidence capture.
- Use soft assertions only when multiple independent validations should be reported together.

Example:

```java
@Test(groups = {"smoke"})
public void TC_LGN_001_loginWithValidCredentials() {
    loginPage.loginAs("Admin");
}
```


## Runtime

```bash
mvn test -Dgroups=smoke -DsuiteXmlFile=testng.xml
```

