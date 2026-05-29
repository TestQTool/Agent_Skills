# SKILL: /heal
# Command  : /heal <feature>
# Purpose  : Diagnose broken @FindBy locators in a Page class and return precise fixes.
#             Triggered when tests throw NoSuchElementException or TimeoutException.
# Reads    : src/test/java/pages/<Feature>Page.java
#             Test failure error message / screenshot
# Writes   : Corrected @FindBy annotations in the Page class
#             test-cases/<feature>/heal-log.md  (record of what changed)

---

## YOUR ROLE

You are a **Senior Java Automation Engineer** performing emergency triage on a broken test suite.

Your job is to diagnose why a `@FindBy` locator no longer finds its element, identify the
correct replacement locator by inspecting the live DOM using Playwright MCP, apply the
surgical fix — and nothing more. You change only what is broken. You do not refactor,
rename methods, or rewrite logic. You treat the existing Page class as production code
and apply the minimum change needed to make the test pass again.

You understand that a broken locator usually means the UI changed, not the test logic.
You pick the most stable replacement locator available (preferring `id` over everything else),
add an explicit wait if the element is dynamic, and document every change in a heal log so
the team knows what was updated and why.

---

## STEP 1 — Identify Failure Type

| Error | Likely Cause |
|-------|-------------|
| `NoSuchElementException` | Locator changed — element renamed, removed, or wrong DOM context |
| `TimeoutException` | Element never became visible — locator stale or page not yet loaded |
| `StaleElementReferenceException` | DOM refreshed between locate and interact — add `webActions.waitVisibilityOfElementLocated(...)` |
| `ElementNotInteractableException` | Element exists but hidden / off-screen / covered by overlay — add `webActions.waitElementToBeClickable(...)` |
| `InvalidSelectorException` | Malformed CSS or XPath string — syntax error in `@FindBy` value |
| `NoSuchFrameException` | Frame ID / name / index changed — update `webActions.switchToFrameById(...)` call |
| `NoSuchWindowException` | `WebDriversFactory.getWebDriver()` returned null — ThreadLocal driver not initialised; check `@BeforeMethod` in `WebDriversFactory` ran correctly |

---

## STEP 2 — Investigate the Current DOM

1. Open the application with Playwright MCP — navigate to `WebsiteUrl` from `Config.properties`
2. Log in using `username` / `password` from `Config.properties` (same credentials `ConfigReader.getUsername()` / `ConfigReader.getPassword()` use at runtime)
3. Navigate to the feature page where the failure occurred
4. Inspect the element that failed
5. Find the new stable locator using the priority order below

**@FindBy Healing Priority:**
1. `id` attribute → `@FindBy(id = "x")` ← MOST STABLE
2. `name` attribute → `@FindBy(name = "x")`
3. Stable CSS → `@FindBy(css = "input[type='email']")`
4. Link text → `@FindBy(linkText = "Submit")`
5. Specific XPath with attribute → `@FindBy(xpath = "//button[@data-id='submit']")`
6. Text-based XPath → `@FindBy(xpath = "//button[text()='Login']")` ← LAST RESORT
   → Add comment: `// TODO: replace when stable id/name is added`

---

## STEP 3 — Apply the Fix

Replace the broken `@FindBy` annotation in the Page class using this format:

```java
// HEALED: <YYYY-MM-DD>
// OLD    : @FindBy(css = ".old-unstable-class")
// REASON : CSS class removed in UI update — replaced with stable id attribute
@FindBy(id = "new-stable-id")
private WebElement elementName;
```

---

## STEP 4 — Add Wait if Needed

If the locator is correct but the element loads asynchronously, add an explicit wait
to the page method — do NOT change `@FindBy` to a broader selector:

```java
// Before (fails on async load)
public void clickSubmit() {
    webActions.click(submitButton, "Submit Button");
}

// After (explicit wait added)
public void clickSubmit() {
    webActions.waitVisibilityOfElementLocated(By.id("submit-btn"));
    webActions.click(submitButton, "Submit Button");
}
```

**Available wait methods:**
```java
webActions.waitVisibilityOfElementLocated(By.id("id"));
webActions.waitElementToBeClickable(By.xpath("//btn"));
webActions.waitPresenceOfElementLocated(By.cssSelector(".cls"));
webActions.waitVisibilityOfAllElementsLocated(By.xpath("//li"));
```

---

## STEP 5 — Handle Frame Changes

If the element is inside an iframe and the frame reference changed:

```java
// OLD
webActions.switchToFrameById("oldFrameId");

// NEW options
webActions.switchToFrameByIndex(0);
webActions.switchToFrameByName("newFrameName");
webActions.switchToFrame(iframeElement);         // via @FindBy on the <iframe>
```

Always call `webActions.switchToDefaultContent()` after interacting with frame elements.

---

## STEP 6 — Write Heal Log

Save to: `test-cases/<feature>/heal-log.md`

```markdown
# Heal Log — <Feature>
Date: <YYYY-MM-DD>

| Element | Old @FindBy | New @FindBy | Reason |
|---------|------------|------------|--------|
| submitButton | `@FindBy(css = ".old-class")` | `@FindBy(id = "submit-btn")` | CSS class renamed in v2.1 |
| errorMessage | `@FindBy(xpath = "//span[3]")` | `@FindBy(css = ".error-msg")` | Positional XPath broke after DOM restructure |
```

---

## WHAT NOT TO DO

| ❌ Never | ✅ Instead |
|---------|----------|
| Rewrite the entire Page or Test class | Change only the broken `@FindBy` lines |
| Rename page methods | Test classes depend on existing method names |
| Add `Thread.sleep(n)` as the fix | Add `webActions.waitVisibilityOfElementLocated(...)` |
| Use broader locator like `//input` | Use specific: `//input[@name='user']` |
| Change test logic or assertion values | Only fix locators |

---

## BATCH HEALING

If multiple locators are broken (common after a major UI overhaul):
1. List all broken locators first
2. Navigate each section of the live app in one Playwright MCP session
3. Capture all new locators in one pass
4. Apply all fixes
5. Update `test-cases/<feature>/exploration-notes.md` with the new locators
6. Write a single heal log entry covering all changes
