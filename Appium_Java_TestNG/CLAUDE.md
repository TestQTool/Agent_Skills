# QA Automation - Appium Java TestNG Framework Project Memory

## Goal

Generate a self-contained `appium-java-testng` framework using Java and TestNG for mobile automation for Android and iOS.

The final repository must not depend on Agent_Skills, prompt files, or StaticFrameworks at runtime.

## Runtime Layout

```text
appium-java-testng/
  pom.xml
  testng.xml
  src/test/resources/mobile-config.properties
  src/main/java/pageObjects/<Feature>MobileObjects.java
  src/main/java/screens/<Feature>Screen.java
  src/test/java/tests/<Feature>MobileTest.java
```


## Mobile Platform Requirements

- Android runs must support `platformName=Android` and `automationName=UiAutomator2`.
- iOS runs must support `platformName=iOS` and `automationName=XCUITest`.
- Device names, UDIDs, app paths, app package/activity, and bundle IDs must come from env/config.

## TestNG Rules

- Use `@Test(groups = {"smoke"})` and `@Test(groups = {"regression"})` for suite selection.
- Use `@BeforeMethod` / `@AfterMethod` for test lifecycle unless the static framework has a base class.
- Use `@DataProvider` for data-driven tests.
- Use listeners for screenshots/logging/reporting, not test-body try/catch clutter.
- Keep dependencies and plugin configuration in `pom.xml`.
- Keep suite composition in `testng.xml`.

## Runtime Command

```bash
mvn test -Dgroups=smoke -DplatformName=Android
```
