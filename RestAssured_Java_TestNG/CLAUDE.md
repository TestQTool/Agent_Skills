# QA Automation - RestAssured Java TestNG Framework Project Memory

## Goal

Generate a self-contained `restassured-java-testng` framework using Java and TestNG for API automation.

The final repository must not depend on Agent_Skills, prompt files, or StaticFrameworks at runtime.

## Runtime Layout

```text
restassured-java-testng/
  pom.xml
  testng.xml
  src/test/resources/api-config.properties
  src/main/java/endpoints/<Feature>Endpoints.java
  src/main/java/clients/<Feature>Client.java
  src/test/java/tests/<Feature>ApiTest.java
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
