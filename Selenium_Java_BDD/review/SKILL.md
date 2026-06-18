# Skill: Review — PR Review for BDD Layer Compliance

## When to use this skill
When reviewing a PR that adds or modifies BDD automation scripts.
Run this checklist before approving any PR.

---

## Review Checklist

### Layer 1 — pageObjects/\<Feature\>PageObjects.java
- [ ] Only `public static final By` fields — no methods, no logic
- [ ] Only import is `import org.openqa.selenium.By;`
- [ ] All constants are `UPPER_SNAKE_CASE`
- [ ] Sections present: Page Heading, Form Inputs, Buttons, Messages, Table, Modal
- [ ] UNVERIFIED section at bottom for unconfirmed locators
- [ ] No absolute XPath (`/html/body/div[3]/...`)
- [ ] No generated class names (`.css-xk3d2f`) without `// ⚠ UNSTABLE` comment

### Layer 2 — pages/\<Feature\>Page.java
- [ ] Extends `BasePage`
- [ ] Constructor takes `WebDriver driver` only
- [ ] No `By` locators defined here — all imported from `<Feature>PageObjects`
- [ ] Sections present: Navigation, Actions, Assertions
- [ ] All assertions use AssertJ (`assertThat(...).as("...").isEqualTo(...)`)
- [ ] No Cucumber annotations (`@Given`, `@When`, `@Then`)
- [ ] No `DriverFactory.initDriver()` or `new ChromeDriver()` calls
- [ ] No hardcoded credentials

### Layer 3 — stepDefinitions/\<Feature\>Steps.java
- [ ] PicoContainer constructor injection (not `@Autowired`, not field injection)
- [ ] Each step body = exactly one page method call (no logic blocks)
- [ ] No `By` locators or `WebDriver` references
- [ ] No `assertThat()` / `assertEquals()` in step definitions
- [ ] Cross-step data uses `ScenarioContext` (not instance variables)
- [ ] Step text matches Gherkin in `.feature` file exactly

### Layer 4 — features/\<Feature\>.feature
- [ ] Feature description present (As a / I want / So that)
- [ ] Background contains only shared preconditions (login + navigation)
- [ ] Every scenario tagged: `@smoke`/`@regression` + `@<featureName>` + `@TC-XXX-NNN`
- [ ] Business language only — no XPath, no element IDs, no CSS selectors in steps
- [ ] Max 7 steps per scenario
- [ ] Scenario Outline used when same flow has 3+ data variations
- [ ] Each scenario is independent (doesn't rely on previous scenario state)

### Framework Files (must NOT be modified)
- [ ] `BasePage.java` NOT modified
- [ ] `WebActions.java` NOT modified
- [ ] `DriverFactory.java` NOT modified
- [ ] `Hooks.java` NOT modified
- [ ] Any Runner file NOT modified
- [ ] `ScenarioContext.java` NOT modified

### Build Verification
- [ ] `mvn test -P smoke` passes with no compilation errors
- [ ] All new scenarios have a green run on at least one browser
- [ ] No new failures introduced in existing scenarios

---

## Scoring (use for PR comment)

Count violations and score:

| Violations | Score | Decision          |
|------------|-------|-------------------|
| 0          | 100   | ✅ Approve         |
| 1–2        | 85+   | ✅ Approve + note  |
| 3–5        | 70+   | ⚠ Request changes  |
| 6+         | <70   | ❌ Block PR         |

---

## PR Comment Template

```
## BDD Automation Review — Quality Matrix

**Score: XX/100**

### ✅ Passed
- Layer separation correct
- Gherkin in business language
- Tags present on all scenarios

### ⚠ Issues Found

**[LAYER-2 | MEDIUM]** `LeaveManagementPage.java` line 47:
Locator hardcoded in page class instead of importing from PageObjects.
→ Move `By.id("submitBtn")` to `LeaveManagementPageObjects.java`

**[LAYER-3 | HIGH]** `LeaveManagementSteps.java` line 32:
Assertion found in step definition.
→ Move `assertThat(message).isEqualTo("Success")` to `LeaveManagementPage.verifySuccessMessage()`

### Decision: Request Changes
```
