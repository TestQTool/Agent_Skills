# HybridFramework — Claude Code Project Memory
# This file is auto-loaded at the start of every Claude Code session.
# Fill in Section 0 before running any skill command.

---

## SECTION 0 — Application Under Test  ✏️ FILL IN BEFORE USE

| Key | Value |
|-----|-------|
| App URL | `{{APP_URL}}` |
| Username | `{{APP_USERNAME}}` |
| Password | `{{APP_PASSWORD}}` |
| Environment | `{{APP_ENVIRONMENT}}` — QA / DEV / STAGING / PRODUCTION |

**Also update** `src/test/resources/Config.properties` with the same values.
**Also update** `docs/app-context.md` with module details for this application.

---

## SECTION 1 — Framework Overview

**Stack:** Java 11+ · Selenium 4 · TestNG · Allure · Extent Reports · Apache POI · Log4j2
**Build:** Maven · `mvn clean test`

### Inheritance Chain
```
InitializationClass          ← static shared state: driver, wait, paths, config values
    ├── WebDriversFactory    ← @BeforeMethod (driver init) / @AfterMethod (driver quit)
    │       └── TestClass    ← every test class extends WebDriversFactory
    └── BasePage             ← PageFactory.initElements + WebActions(10s) + wait
            └── PageClass    ← every page class extends BasePage
```

### Files Generated per Feature
```
src/test/java/pages/<Feature>Page.java      ← @FindBy locators + webActions methods
src/test/java/testcases/<Feature>TC.java    ← @Test methods + Allure + ExtentReport
```

---

## SECTION 2 — Page Class Rules (pages/<Feature>Page.java)

- `package pages;`  |  `extends BasePage`  |  `constructor → super(driver)`
- Locators: `private WebElement` + `@FindBy` only
- Interactions: `webActions.*` only — **no** `driver.findElement()` inside page methods
- Logging: `logger.info(...)` on every step
- Allowed raw driver calls: `driver.getTitle()` and `driver.getCurrentUrl()` only

```java
package pages;
import managers.WebActions;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import utilities.ExtentReportManager;

public class <Feature>Page extends BasePage {
    private final Logger logger = LogManager.getLogger(this.getClass());
    public <Feature>Page(WebDriver driver) { super(driver); }

    @FindBy(id = "element-id")
    private WebElement element;

    public void doAction(String value) {
        webActions.sendKeys(element, value, "Field Name");
        logger.info("Entered: " + value);
    }
    public void verifyState(String expected) {
        webActions.assertEquals(element, expected, "State mismatch");
    }
}
```

---

## SECTION 3 — Test Class Rules (testcases/<Feature>TC.java)

- `package testcases;`  |  `extends WebDriversFactory`
- `@Listeners(listeners.Listeners.class)` on class — mandatory
- Driver: `WebDriversFactory.getWebDriver()` — never instantiate manually
- Page objects: instantiated **inside** each `@Test` method — not as class fields
- Allure: `@Description` `@Epic` `@Feature` `@Story` `@Severity` on every test
- Assertions: `Assert.*` (TestNG)

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

    @Test(groups = "regression", description = "TC-XXX-001: description")
    @Description("TC-XXX-001: description")
    @Epic("EPIC001") @Feature("Feature: X") @Story("Story: Y") @Severity(SeverityLevel.NORMAL)
    public void tc_XXX_001_methodName() {
        <Feature>Page page = new <Feature>Page(WebDriversFactory.getWebDriver());
        ExtentReportManager.logInfo("Step description");
        page.doAction("value");
        ExtentReportManager.attachScreenshot(WebDriversFactory.getWebDriver());
        Assert.assertTrue(true, "Assertion message");
        ExtentReportManager.logPass("Verification passed");
    }
}
```

---

## SECTION 4 — WebActions Quick Reference

| Category | Method |
|----------|--------|
| Click | `webActions.click(el, "name")` · `webActions.javaScriptExecutorClick(el, "name")` |
| Input | `webActions.sendKeys(el, text, "name")` · `webActions.getText(el, "name")` |
| Dropdown | `webActions.selectByText(el, "text")` · `selectByIndex(el, n)` · `selectByValue(el, "v")` |
| Custom dropdown | `webActions.multipleSelectByChoice(el, By.xpath("//li"), "Opt1")` |
| Assert | `webActions.assertEquals(el, "expected", "msg")` · `verifyElementPresence(el, "name")` |
| Wait | `webActions.waitVisibilityOfElementLocated(By.id("x"))` · `waitElementToBeClickable(By.xpath("//btn"))` |
| Alert | `webActions.alertAccept()` · `alertDismiss()` · `alertGetText()` |
| Mouse | `webActions.moveToElement(el)` · `dragAndDrop(src, tgt)` |
| Scroll | `webActions.scrollToElement(el)` · `scrollBy(0, 500)` |
| Frame | `webActions.switchToFrame(el)` · `switchToFrameById("id")` · `switchToDefaultContent()` |
| Robot | `webActions.pressEnter()` · `pressTab()` · `pressEscape()` |
| Util | `webActions.generateRandomName()` → String |

---

## SECTION 5 — Data Access

```java
// Config
ConfigReader.getProperty("WebsiteUrl")  |  ConfigReader.getUsername()  |  ConfigReader.getPassword()
ConfigReader.getExplicitWait()           |  ConfigReader.getImplicitWait()

// Excel  (ExcelFiles = "./src/test/resources/TestData/ExcelFiles/")
ExcelReader excel = new ExcelReader(ExcelFiles + "File.xlsx");
excel.getCellData("Sheet1", rowIndex, colIndex);   // rowIndex starts at 1
excel.getRowCount("Sheet1");

// JSON
JsonReader.getLoginElement("key")   // under "loginPage"
JsonReader.getHomeElement("key")    // under "PurchasePage"
JsonReader.getCheckOutPage("key")   // under "CheckOutPage"
```

---

## SECTION 6 — Reporting

```java
ExtentReportManager.logInfo("description");
ExtentReportManager.logPass("what passed");
ExtentReportManager.logFail("what failed");
ExtentReportManager.attachScreenshot(WebDriversFactory.getWebDriver());
```
Listeners auto-handle: `onStart` · `onTestSuccess` · `onTestFailure` · `onTestSkipped` · `onFinish`

---

## SECTION 7 — @FindBy Locator Priority

`id` → `name` → `css` → `linkText` → `partialLinkText` → `xpath` (last resort, keep short)

---

## SECTION 8 — Skill Commands

| Command | Skill File | What it does |
|---------|------------|--------------|
| `/explore <feature>` | `explore/SKILL.md` | Browse live app with Playwright MCP, capture locators, write exploration notes |
| `/generate-tests <feature>` | `generate-tests/SKILL.md` | Generate structured test cases (MD + CSV) from exploration notes |
| `/build-scripts <feature>` | `build-scripts/SKILL.md` | Convert approved test cases into Page + TC Java files |
| `/review <feature>` | `review/SKILL.md` | Audit generated Java files against framework standards |
| `/heal <feature>` | `heal/SKILL.md` | Fix broken `@FindBy` locators in existing Page classes |

---

## SECTION 9 — Module Prefix Table

| Module | Prefix | Page Class | Test Class |
|--------|--------|------------|------------|
| Login / Logout | LGN | `LoginPage.java` | `LoginTC.java` |
| Registration | REG | `RegistrationPage.java` | `RegisterTC.java` |
| Dashboard | DSH | `HomePage.java` | `HomeTC.java` |
| Bill Payment | BPY | `BillPayPage.java` | `BillPaymentTC.java` |
| Fund Transfer | FTR | `FundTransferPage.java` | `FundsTransferTC.java` |
| Products | PRD | `ProductsPage.java` | `ProductsTC.java` |
| Checkout | CHK | `CheckoutPage.java` | `CheckoutTC.java` |

---

## SECTION 10 — Hard Rules (never break these)

| ❌ Never | ✅ Always |
|---------|----------|
| `@BeforeMethod` / `@AfterMethod` in test class | Handled by `WebDriversFactory` |
| `Thread.sleep(n)` | `webActions.wait*` methods |
| `driver.findElement(...)` in page methods | `@FindBy` + `webActions.*` |
| Hardcode URL / credentials / timeouts | `ConfigReader.*` |
| New util classes duplicating existing | Use `ExcelReader` / `JsonReader` / `ConfigReader` |
| Mobile imports in web files | Web = web only |
| `ExtentReportManager.initializeReport(...)` | Handled by `Listeners.java` |
| Page objects as class-level fields in test | Instantiate inside `@Test` method |
