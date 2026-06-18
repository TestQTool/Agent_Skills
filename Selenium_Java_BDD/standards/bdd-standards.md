# BDD Standards — Selenium Java BDD

These rules are enforced during code review (review/SKILL.md) and
must be followed during generation (generate-tests/SKILL.md).

---

## Layer Rules (strict — violations block PR merge)

### Layer 1 — pageObjects/\<Feature\>PageObjects.java
- ONLY `public static final By` fields
- ONLY import: `import org.openqa.selenium.By;`
- Zero methods. Zero constructors. Zero logic.
- Grouped by section comments:
  ```java
  // ── Page Heading ──
  // ── Form Inputs ──
  // ── Buttons ──
  // ── Dropdowns ──
  // ── Messages ──
  // ── Table ──
  // ── Modal ──
  // ── UNVERIFIED — update after exploration ──
  ```
- UNVERIFIED section at the bottom for AI-generated stubs not yet verified on live app

### Layer 2 — pages/\<Feature\>Page.java
- Extends `BasePage`
- Imports locators from `<Feature>PageObjects` ONLY
- Constructor: `public <Feature>Page(WebDriver driver) { super(driver); }`
- Methods grouped:
  ```java
  // ── Navigation ──
  // ── Actions ──
  // ── Assertions ──
  ```
- ALL assertions use AssertJ:
  `assertThat(actual).as("descriptive message").isEqualTo(expected);`
- No Cucumber annotations in this class
- No `By` selectors defined here — all come from Layer 1

### Layer 3 — stepDefinitions/\<Feature\>Steps.java
- ONLY `@Given`, `@When`, `@Then`, `@And` annotations
- Page injected via PicoContainer constructor:
  ```java
  public <Feature>Steps(<Feature>Page <feature>Page, ScenarioContext ctx) {
      this.<feature>Page = <feature>Page;
      this.ctx = ctx;
  }
  ```
- Each step = one page method call. No logic in steps.
- Data passed between steps via `ScenarioContext`, not instance variables
- No assertions in step definitions

### Layer 4 — features/\<Feature\>.feature
- Pure Gherkin. Business language only.
- NO technical details: no "click button#id", no "find element by xpath"
- GOOD: `When the admin submits the leave request`
- BAD:  `When user clicks the button with id "submitBtn"`
- Background for shared preconditions (login, navigation)
- Scenario Outline + Examples for data-driven cases

---

## Naming Conventions

| Artifact                    | Convention                        | Example                            |
|-----------------------------|-----------------------------------|------------------------------------|
| Feature file                | `<Feature>.feature`               | `LeaveManagement.feature`          |
| Page class                  | `<Feature>Page.java`              | `LeaveManagementPage.java`         |
| PageObjects class           | `<Feature>PageObjects.java`       | `LeaveManagementPageObjects.java`  |
| Step definitions class      | `<Feature>Steps.java`             | `LeaveManagementSteps.java`        |
| Scenario tag (test case ID) | `@TC-<MODULE>-<NNN>`              | `@TC-LM-001`                       |
| Feature tag                 | `@<featureName>`                  | `@leaveManagement`                 |
| Suite tags                  | `@smoke` or `@regression`         |                                    |

---

## Gherkin Writing Rules

1. Feature name = module name (matches ADO Epic or Feature title)
2. Scenario name = test case title from ADO/Jira (verbatim if possible)
3. Background = login + navigation shared by all scenarios in that feature
4. Given = precondition / state
5. When  = user action
6. Then  = expected outcome / assertion
7. And   = continuation of the previous Given/When/Then
8. Maximum 7 steps per scenario (split if more needed)
9. Scenario Outline when the same flow runs with multiple data sets (3+ rows)
10. No scenario should depend on another scenario's state (each is independent)

---

## Tag Rules

Every scenario MUST have:
- `@smoke` OR `@regression` (not both)
- `@TC-XXX-NNN` (maps to ADO test case ID)
- `@<featureName>` (for selective feature runs)

Optional:
- `@wip` — in progress, excluded from CI
- `@skip` — known broken, excluded from all runs
- `@api` — for scenarios that make API calls

---

## What The Agent Must Never Do

- Add `By` locators inside a page class or step definition
- Add assertions inside a step definition
- Add Cucumber annotations to a page class
- Use `new ChromeDriver()` anywhere (always `DriverFactory.getDriver()`)
- Hardcode credentials (always `getLoginDataByRole()`)
- Create a new Runner file (use existing ones)
- Modify any framework-level file
- Write Gherkin with technical implementation details
