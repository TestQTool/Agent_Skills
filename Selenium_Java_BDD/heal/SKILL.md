# Skill: Heal — Fix Failing Tests and Broken Locators

## When to use this skill
When tests are failing after:
- App UI changes (locators broke)
- Feature file / step definition mismatch
- Framework upgrade
- New environment with different selectors

---

## Triage Process

### Step 1 — Read the failure
Get the exact error from:
```
target/cucumber-reports/index.html    (best — shows step + screenshot)
target/cucumber-reports/report.json   (machine-readable)
allure-results/                        (run `mvn allure:serve` for visual view)
```

Identify: which scenario, which step, which exception.

### Step 2 — Classify the failure

| Exception                            | Root Cause Category        |
|--------------------------------------|----------------------------|
| `NoSuchElementException`             | Locator broken             |
| `TimeoutException` (findElement)     | Locator broken or timing   |
| `StaleElementReferenceException`     | Timing / page reload       |
| `AssertionError`                     | Expected value changed     |
| `No step definition found`           | Step text mismatch         |
| `Ambiguous step definitions`         | Duplicate step text        |
| `PicoContainerException`             | Constructor injection fail |
| `NullPointerException` in page class | Page method called before init |

### Step 3 — Heal by category

#### Locator broken (NoSuchElementException / TimeoutException)
1. Navigate to the URL in the failing step
2. Re-inspect the element using browser DevTools
3. Find a new stable locator using the priority from `explore/SKILL.md`
4. Update the locator in `pageObjects/<Feature>PageObjects.java` ONLY
5. Add a comment: `// ✅ Updated <DATE> — previous: By.id("old-id")`
6. Do NOT change the page class or step definitions

#### Step text mismatch
1. Find the failing step text in the `.feature` file
2. Find the closest `@Given`/`@When`/`@Then` in step definition files
3. Either: fix the feature file step to match the existing regex
   OR: update the step definition regex to match the feature file step
4. Choose whichever preserves the business language better

#### AssertionError (expected value changed)
1. Identify what the assertion is checking (`assertText`, `assertUrl`, etc.)
2. Check if the app's expected text/URL actually changed (new release?)
3. If yes — update `utils/testdata.json` or the page method's expected value
4. Never change expected values without confirming with the team

#### Timing issue (StaleElementReferenceException)
In the page method, add explicit wait before the interaction:
```java
// Before:
click(SUBMIT_BTN);

// After:
waitForElementClickable(SUBMIT_BTN, 20);
click(SUBMIT_BTN);
```

#### PicoContainerException
Verify the step definition constructor matches exactly:
```java
public <Feature>Steps(<Feature>Page <feature>Page, ScenarioContext ctx) {
    this.<feature>Page = <feature>Page;
    this.ctx = ctx;
}
```
PicoContainer requires that every constructor parameter has a registered binding.
`<Feature>Page` must extend `BasePage` and `BasePage` must extend `WebActions` which
takes `WebDriver` — PicoContainer traces this chain automatically via Hooks.java.

---

## Self-Healing Locator Strategy

When a locator breaks frequently, upgrade it to a resilient fallback chain.
Add a method in the page class:

```java
private By resolveElement(By primary, By fallback) {
    try {
        waitForElement(primary, 5);
        return primary;
    } catch (TimeoutException e) {
        log.warn("Primary locator failed, using fallback");
        return fallback;
    }
}
```

Then update the PageObjects file with both locators:
```java
// ── Primary (stable) ───────────────────────────────────────────────────────
public static final By SUBMIT_BTN           = By.id("submitBtn");
// ── Fallback (if primary breaks) ───────────────────────────────────────────
public static final By SUBMIT_BTN_FALLBACK  = By.cssSelector("button[type='submit']");
```

---

## Post-Heal Checklist

After fixing:
- [ ] Run the specific failing scenario: `mvn test -Dcucumber.filter.tags="@TC-XXX-NNN"`
- [ ] Verify it passes 3 consecutive times (to rule out flakiness)
- [ ] Run the full feature: `mvn test -Dcucumber.filter.tags="@<featureName>"`
- [ ] Commit with message: `fix: heal locator for <Feature> - <element name>`
- [ ] Note the fix in the UNVERIFIED section of PageObjects or remove the UNVERIFIED comment
