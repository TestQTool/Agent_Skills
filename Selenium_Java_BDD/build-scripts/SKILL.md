# Skill: Build Scripts — Run Tests and Interpret Results

## When to use this skill
When the user asks to run tests, check results, or configure CI pipelines.

---

## Run Commands

```bash
# Install (first time or after pom.xml changes)
mvn install -DskipTests

# Run all tests
mvn test

# Run smoke suite
mvn test -P smoke

# Run regression suite
mvn test -P regression

# Run by tag
mvn test -Dcucumber.filter.tags="@leaveManagement"
mvn test -Dcucumber.filter.tags="@TC-LM-001"
mvn test -Dcucumber.filter.tags="@smoke and @leaveManagement"

# Run on specific browser
mvn test -Dbrowser=firefox
mvn test -Dbrowser=edge
mvn test -Dbrowser=chrome -Dheadless=true

# Run with specific environment
mvn test -Denvironment=staging -DBASE_URL=https://staging.app.com

# Generate Allure report
mvn allure:serve
mvn allure:report   # generates without opening browser
```

---

## CI Overrides (ADO Pipeline / GitHub Actions)

All config.properties values can be overridden via -D flags:

```yaml
# azure-pipelines.yml example task
- task: Maven@3
  inputs:
    mavenPomFile: 'pom.xml'
    goals: 'test'
    options: >
      -P smoke
      -DBASE_URL=$(BASE_URL)
      -Dbrowser=chrome
      -Dheadless=true
      -DCI=true
```

---

## Interpreting Results

### Exit codes
- `0` = all tests passed
- `1` = one or more tests failed (check reports)

### Reports location after run
```
target/cucumber-reports/index.html    ← Cucumber HTML (open in browser)
target/cucumber-reports/report.json   ← For Qentrix result ingestion
target/cucumber-reports/results.xml   ← JUnit XML for ADO/GitHub test publishing
allure-results/                        ← Run `mvn allure:serve` to view
reports/extent-report-<timestamp>.html ← ExtentReports HTML
```

### Common failures and fixes

| Error                                    | Cause                               | Fix                                            |
|------------------------------------------|-------------------------------------|------------------------------------------------|
| `No step definitions found`              | Step text doesn't match             | Check step text vs `@Given`/`@When` regex      |
| `Element not found`                      | Locator wrong or element not loaded | Run explore skill to re-verify locator         |
| `StaleElementReferenceException`         | Page reloaded after element found   | Use `waitForElement()` before interaction      |
| `TimeoutException`                       | Page load too slow                  | Increase EXPLICIT_WAIT in config.properties    |
| `PicoContainerException`                 | Constructor injection mismatch      | Verify page class has correct constructor      |
| `Ambiguous step definitions`             | Same step text in 2 step files      | Rename one step to be more specific            |
| `WebDriverException: session deleted`    | Driver quit before test ended       | Check Hooks.java @After order                  |
| `BUILD FAILURE — No tests were executed` | Tags don't match any scenario       | Check feature file tags vs runner filter tag   |

---

## Parallel Execution

Parallel is enabled by default (configured in pom.xml via Surefire plugin).
Thread count is read from `settings.local.json` → `parallelThreads`.
Each thread gets its own WebDriver via `DriverFactory` ThreadLocal.

If tests interfere with each other:
- Check test data is not shared between scenarios (each creates its own)
- Check `ScenarioContext` is per-scenario (PicoContainer creates new instance per scenario)

---

## Adding New Tag-Based Run Targets

To add a new runner (e.g. `SanityRunner`):

1. Copy `src/test/java/runner/SmokeRunner.java`
2. Rename to `SanityRunner.java`
3. Change the tag filter:
   ```java
   @ConfigurationParameter(key = FILTER_TAGS_PROPERTY_NAME, value = "@sanity")
   ```
4. Add a Maven profile in `pom.xml`:
   ```xml
   <profile>
     <id>sanity</id>
     <properties>
       <include>**/SanityRunner.java</include>
     </properties>
   </profile>
   ```
5. Run with: `mvn test -P sanity`
