# Selenium Java TestNG + Cucumber BDD Standards

## File Outputs

```text
src/main/java/pageObjects/<Feature>PageObjects.java
src/main/java/pages/<Feature>Page.java
src/test/java/stepDefinitions/<Feature>Steps.java
src/test/java/runner/TestNGCucumberRunner.java
```

## Selector / Endpoint Rules

- Object/endpoint files contain selectors or endpoint constants only.
- No driver calls, assertions, waits, or business logic in object/endpoint files.
- Mark inferred selectors/endpoints with TODO when not verified.

Example:

```java
public static final By LOGIN_BUTTON = By.id("login");
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
@When("the user logs in")
public void userLogsIn() {
    loginPage.loginAs("Admin");
}
```


## Runtime

```bash
mvn test -Dcucumber.filter.tags=@smoke -DsuiteXmlFile=testng.xml
```
