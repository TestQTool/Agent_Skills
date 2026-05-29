SKILL: /build-scripts
# Command  : /build-scripts <feature>
# Purpose  : Convert approved test cases into production-ready Java files —
#             one Page class and one Test class per feature.
#             Output must compile and run with mvn clean test without modification.
# Reads    : test-cases/<feature>/test-cases.md  (TC titles, steps, expected results)
#             test-cases/<feature>/exploration-notes.md  (@FindBy annotations)
#             docs/app-context.md  (URL, module, credentials)
#             CLAUDE.md  (framework rules, auto-loaded)
# Writes   : src/test/java/pages/<Feature>Page.java
#             src/test/java/testcases/<Feature>TC.java

---

## OUTPUT — TWO FILES PER FEATURE

---

### FILE 1: src/test/java/pages/<Feature>Page.java

```java
package pages;

import managers.WebActions;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import utilities.ConfigReader;
import utilities.ExtentReportManager;

public class <Feature>Page extends BasePage {

    private final Logger logger = LogManager.getLogger(this.getClass());

    public <Feature>Page(WebDriver driver) {
        super(driver);
    }

    // ── Locators ──────────────────────────────────────────────────────────────
    // Paste @FindBy annotations from exploration-notes.md
    // Group by section with comments

    @FindBy(id = "field-id")
    private WebElement fieldElement;

    // ── Actions ───────────────────────────────────────────────────────────────
    // One method = one meaningful user action
    // Use webActions.* for everything — never driver.findElement() here

    public void enterField(String value) {
        webActions.sendKeys(fieldElement, value, "Field Name");
        logger.info("Entered value: " + value);
        ExtentReportManager.logInfo("Entered value in Field Name");
    }

    // ── Assertions ────────────────────────────────────────────────────────────
    // verify* methods only — use webActions.assertEquals / verifyElementPresence

    public void verifyFieldValue(String expected) {
        webActions.assertEquals(fieldElement, expected, "Field value mismatch");
        ExtentReportManager.logInfo("Verified field value: " + expected);
    }
}
```

---

### FILE 2: src/test/java/testcases/<Feature>TC.java

```java
package testcases;

import io.qameta.allure.*;
import managers.WebDriversFactory;
import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import pages.<Feature>Page;
import utilities.ExtentReportManager;

@Listeners(listeners.Listeners.class)
public class <Feature>TC extends WebDriversFactory {

    @Test(groups = "regression", description = "TC-XXX-001: [Exact title from test-cases.md]")
    @Description("TC-XXX-001: [Exact title from test-cases.md]")
    @Epic("EPIC001")
    @Feature("Feature: <FeatureName>")
    @Story("Story: <FlowName>")
    @Severity(SeverityLevel.NORMAL)
    public void tc_XXX_001_methodName() {
        <Feature>Page featurePage = new <Feature>Page(WebDriversFactory.getWebDriver());

        ExtentReportManager.logInfo("Step 1: description");
        featurePage.enterField("value");
        ExtentReportManager.attachScreenshot(WebDriversFactory.getWebDriver());

        featurePage.verifyFieldValue("expected");
        ExtentReportManager.logPass("TC-XXX-001 passed");
    }
}
```

---

## PAGE CLASS RULES

| Rule | Detail |
|------|--------|
| Package | `pages` |
| Extends | `BasePage` |
| Constructor | `super(driver)` only — nothing else |
| Locators | `private WebElement` + `@FindBy` — no exceptions |
| Interactions | `webActions.*` only |
| Logging | `logger.info(...)` on every step |
| Raw driver allowed | `driver.getTitle()` and `driver.getCurrentUrl()` only |

### @FindBy Priority
`id` → `name` → `css` → `linkText` → `partialLinkText` → `xpath` (last resort, keep short)

---

## TEST CLASS RULES

| Rule | Detail |
|------|--------|
| Package | `testcases` |
| Extends | `WebDriversFactory` |
| Listener | `@Listeners(listeners.Listeners.class)` on class — mandatory |
| Driver | `WebDriversFactory.getWebDriver()` only |
| Page objects | Instantiate **inside** each `@Test` method — not as class fields |
| Method name | `tc_[PREFIX]_[NNN]_[camelCaseDescription]()` |
| Allure | `@Description` `@Epic` `@Feature` `@Story` `@Severity` on every test |
| Assertions | `Assert.*` from TestNG |
| Groups | Match suite from `test-cases.md` → `sanity` / `regression` / `smoke` |

---

## WEBACTIONS METHOD REFERENCE

```java
// Clicks
webActions.click(element, "Name");
webActions.javaScriptExecutorClick(element, "Name");
webActions.doubleClick(element);

// Input
webActions.sendKeys(element, text, "Name");
webActions.getText(element, "Name");                         // → String

// HTML <select> dropdowns
webActions.selectByText(element, "Visible Text");
webActions.selectByIndex(element, 0);
webActions.selectByValue(element, "value");

// Custom dropdowns (div / ul / li)
webActions.multipleSelectByChoice(triggerEl, By.xpath("//li"), "Option1");

// Assertions
webActions.assertEquals(element, "expected", "message");
webActions.verifyElementPresence(element, "Name");

// Explicit waits
webActions.waitVisibilityOfElementLocated(By.id("id"));
webActions.waitElementToBeClickable(By.xpath("//btn"));      // waits AND clicks
webActions.waitPresenceOfElementLocated(By.cssSelector(".c"));
webActions.waitVisibilityOfAllElementsLocated(By.xpath("//li"));
webActions.waitAlertIsPresent();

// Alerts
webActions.alertAccept();   webActions.alertDismiss();
webActions.alertSendKeys("text");   webActions.alertGetText();

// Mouse
webActions.moveToElement(el);   webActions.dragAndDrop(src, tgt);

// Scroll / JS
webActions.scrollToElement(el);   webActions.scrollBy(0, 500);
webActions.setAttribute(el, "value", "text");

// Frames
webActions.switchToFrame(el);   webActions.switchToFrameById("id");
webActions.switchToFrameByIndex(0);   webActions.switchToDefaultContent();

// Robot
webActions.pressEnter();   webActions.pressTab();   webActions.pressEscape();
```

---

## DATA ACCESS

```java
// Config
ConfigReader.getUsername()   ConfigReader.getPassword()   ConfigReader.getProperty("key")

// Excel
ExcelReader excel = new ExcelReader(ExcelFiles + "File.xlsx");
excel.getCellData("Sheet1", rowIndex, colIndex);   // rowIndex starts at 1

// JSON
JsonReader.getLoginElement("key")   JsonReader.getHomeElement("key")
```

---

## ALLURE SEVERITY MAPPING

| Scenario | SeverityLevel |
|----------|---------------|
| Blocks all testing | `BLOCKER` |
| Core functionality | `CRITICAL` |
| Standard positive | `NORMAL` |
| Minor negative / validation | `MINOR` |
| Edge case | `TRIVIAL` |

---

## FORBIDDEN PATTERNS

| ❌ Never generate | Reason |
|------------------|--------|
| `@BeforeMethod` / `@AfterMethod` in test class | Already in `WebDriversFactory` |
| `Thread.sleep(n)` | Use `webActions.wait*` |
| `driver.findElement(...)` in page methods | Use `@FindBy` + `webActions` |
| Hardcoded URL / credentials / timeouts | Use `ConfigReader` |
| New utility classes duplicating existing | Use `ExcelReader`, `JsonReader`, `ConfigReader` |
| `ExtentReportManager.initializeReport(...)` | Handled by `Listeners.java` |
| Mobile / Appium imports in web files | Web = web only |

---

## LOCATORS UNKNOWN?
If exploration notes don't have locators for a specific element:
1. Use the most generic stable pattern for the element type
2. Add comment: `// TODO: verify locator against live app`
3. Group all unverified locators at the bottom under:
   `// ── UNVERIFIED — update after /explore session ──`
