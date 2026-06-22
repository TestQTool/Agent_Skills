# QA Automation - Playwright Java TestNG Framework Project Memory

## Goal

Generate a self-contained `playwright-java-testng` framework using Java and TestNG for web UI automation.

The final repository must not depend on Agent_Skills, prompt files, or StaticFrameworks at runtime.

## Runtime Layout

```text
playwright-java-testng/
  pom.xml
  testng.xml
  src/test/resources/config.properties
  src/main/java/pageobjects/<Feature>PageObjects.java
  src/main/java/pages/<Feature>Page.java
  src/test/java/tests/<Feature>Test.java
```


## TestNG Rules

- Use `@Test(groups = {"smoke"})` and `@Test(groups = {"regression"})` for suite selection.
- Use `@BeforeMethod` / `@AfterMethod` for test lifecycle unless the static framework has a base class.
- Use `@DataProvider` for data-driven tests.
- Use listeners for screenshots/logging/reporting, not test-body try/catch clutter.
- Keep dependencies and plugin configuration in `pom.xml`.
- Keep suite composition in `testng.xml`.

## Runtime Command

```bash
mvn test -Dgroups=smoke -DsuiteXmlFile=testng.xml
```

