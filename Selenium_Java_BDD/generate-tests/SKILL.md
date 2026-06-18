# Skill: Generate Tests — Convert Work Items to BDD Scripts

## When to use this skill
When the user provides ADO/Jira work items (Epic, Feature, User Story, Test Cases)
and asks to generate automation scripts.

---

## Input the Agent Expects

The user will provide ONE or MORE of:
- ADO Test Case(s) with title, steps, expected results
- User Story with acceptance criteria
- Manual test case document
- Feature name + list of scenarios to automate

---

## Generation Process (follow in order)

### Step 1 — Read standards
Read `standards/bdd-standards.md` before writing any code.

### Step 2 — Read app context
Read `app-context.md` to understand the module being automated.

### Step 3 — Read template files from static framework
Read these files from the cloned static framework:
- `pageObjects/_TemplatePageObjects.java`
- `pages/_TemplatePage.java`
- `src/test/java/stepDefinitions/_TemplateSteps.java`
- `src/test/java/features/_template.feature`

These are your generation contract. Follow the same structure exactly.

### Step 4 — Read templates/test-case-template.md
Map the incoming work item to Gherkin using the template.

### Step 5 — Determine what already exists
Check `src/test/java/features/` — does a `.feature` file already exist for this module?
- YES → add new scenarios to the existing file, check if steps already exist
- NO  → generate all 4 files fresh

### Step 6 — Generate in this order (always)

#### 6a. Feature File — `src/test/java/features/<Feature>.feature`
- One Feature block per file
- Background for shared login/navigation
- Each ADO test case = one Scenario or Scenario Outline
- Tags: `@smoke`/`@regression` + `@<featureName>` + `@TC-XXX-NNN`
- Business language only — no technical details

#### 6b. PageObjects — `src/main/java/com/qualitymatrix/pageObjects/<Feature>PageObjects.java`
- Only `public static final By` fields
- Only import: `import org.openqa.selenium.By;`
- Stub selectors in UNVERIFIED section if not yet explored
- Mirror exact section structure from `_TemplatePageObjects.java`

#### 6c. Page Class — `src/main/java/com/qualitymatrix/pages/<Feature>Page.java`
- Extends `BasePage`
- Constructor: `public <Feature>Page(WebDriver driver) { super(driver); }`
- Imports locators from `<Feature>PageObjects` only
- Methods for every When/Then step in the feature file
- Navigation, Actions, Assertions sections
- Assertions use AssertJ

#### 6d. Step Definitions — `src/test/java/stepDefinitions/<Feature>Steps.java`
- PicoContainer constructor injection of page + ScenarioContext
- One `@Given`/`@When`/`@Then` per unique step in the feature file
- Each step body = one page method call
- Data sharing via `ctx.set("key", value)` / `ctx.get("key")`
- Reuse existing common steps if already defined

### Step 7 — Output format

Output each file in full with this header:

```
===== src/test/java/features/<Feature>.feature =====
<full file content>

===== src/main/java/com/qualitymatrix/pageObjects/<Feature>PageObjects.java =====
<full file content>

===== src/main/java/com/qualitymatrix/pages/<Feature>Page.java =====
<full file content>

===== src/test/java/stepDefinitions/<Feature>Steps.java =====
<full file content>
```

### Step 8 — Post-generation checklist

Before outputting, verify:
- [ ] Every `@When`/`@Then` in feature file has a matching method in step definitions
- [ ] Every step definition method calls exactly one page method
- [ ] Every page method uses only locators from `<Feature>PageObjects`
- [ ] No hardcoded credentials — uses `getLoginDataByRole()`
- [ ] No `new ChromeDriver()` — uses `DriverFactory.getDriver()`
- [ ] All scenarios tagged with `@smoke`/`@regression` + `@TC-XXX-NNN`
- [ ] Gherkin is in business language (no technical selectors)
- [ ] AssertJ used for all assertions in page class
- [ ] UNVERIFIED section in PageObjects for any stub selectors

---

## Common Step Patterns (reuse these)

```java
// Login step (reuse across features — in CommonSteps.java if it exists)
@Given("the {string} is logged in with role {string}")
public void loginAs(String role) {
    loginPage.loginAs(role);
}

// Navigation step
@Given("the admin is on the {string} page")
public void navigateTo(String pageName) {
    <feature>Page.navigate();
}

// Data entry step
@When("the admin enters {string} as {string}")
public void enterField(String field, String value) {
    <feature>Page.enterField(field, value);
}

// Assertion step
@Then("the {string} is displayed successfully")
public void verifySuccessMessage(String message) {
    <feature>Page.verifySuccessMessage(message);
}
```

---

## ScenarioContext Usage

Pass data between steps using ScenarioContext (injected via PicoContainer):

```java
// In a @When step — save value for later
ctx.set("createdRecordId", recordId);

// In a @Then step — retrieve it
String id = (String) ctx.get("createdRecordId");
```

Never use instance variables in step definition classes for cross-step data.
