# Appium Java TestNG Framework Standards

## File Outputs

```text
src/main/java/pageObjects/<Feature>MobileObjects.java
src/main/java/screens/<Feature>Screen.java
src/test/java/tests/<Feature>MobileTest.java
testng.xml
```

## Selector / Endpoint Rules

- Object/endpoint files contain selectors or endpoint constants only.
- No driver calls, assertions, waits, or business logic in object/endpoint files.
- Mark inferred selectors/endpoints with TODO when not verified.

Example:

```java
public static final By LOGIN_BUTTON_ANDROID = AppiumBy.accessibilityId("login");
public static final By LOGIN_BUTTON_IOS = AppiumBy.iOSNsPredicateString("name == \"login\"");
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
public void TC_MOB_001_loginOnMobile() {
    loginScreen.loginAs("Admin");
}
```


## Android/iOS Rules

- Keep Android and iOS locators separate when they differ.
- Prefer accessibility IDs. Use UiAutomator for Android and iOS predicate/class chain for iOS when needed.
- Do not use coordinate taps unless no semantic selector exists and the limitation is documented.

## Runtime

```bash
mvn test -Dgroups=smoke -DplatformName=Android
```
