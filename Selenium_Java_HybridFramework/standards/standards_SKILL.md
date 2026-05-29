# HybridFramework — Java Automation Coding Standards

This is the authoritative coding specification. All generated and hand-written Java files
must match these patterns exactly. Read `CLAUDE.md` for the full architecture context.

---

## 1. Project Structure

```
src/test/java/
    managers/
        InitializationClass.java   ← shared static state (DO NOT MODIFY)
        WebDriversFactory.java     ← @BeforeMethod / @AfterMethod (DO NOT MODIFY)
        WebActions.java            ← all Selenium interactions (DO NOT MODIFY)
        WebAction.java             ← single-action helper (DO NOT MODIFY)
    pages/
        BasePage.java              ← parent of all page classes (DO NOT MODIFY)
        LoginPage.java             ← example existing page
        <Feature>Page.java         ← generated here ✓
    testcases/
        <Feature>TC.java           ← generated here ✓
    utilities/
        ConfigReader.java          ← (DO NOT MODIFY OR DUPLICATE)
        ExcelReader.java           ← (DO NOT MODIFY OR DUPLICATE)
        JsonReader.java            ← (DO NOT MODIFY OR DUPLICATE)
        ExtentReportManager.java   ← (DO NOT MODIFY OR DUPLICATE)
    listeners/
        Listeners.java             ← ITestListener + IRetryAnalyzer (DO NOT MODIFY)

src/test/resources/
    Config.properties              ← UPDATE with your app values
    TestData.json                  ← ADD keys as needed
    TestData/ExcelFiles/           ← ADD .xlsx files as needed
```

### InitializationClass Path Constants
These static constants are inherited from `InitializationClass` and available in every Page class and Test class:

```java
ExcelFiles   // = "./src/test/resources/TestData/ExcelFiles/"
TestData     // = "./src/test/resources/TestData.json"
Reports      // = "./Reports/"
```

Use them directly — do not hardcode paths:
```java
// ✅ Correct
ExcelReader excel = new ExcelReader(ExcelFiles + "FundTransfer.xlsx");

// ❌ Wrong
ExcelReader excel = new ExcelReader("./src/test/resources/TestData/ExcelFiles/FundTransfer.xlsx");
```

> Canonical example: `LoginPage.java` — the most referenced existing page in the framework.
> All new page classes follow this exact pattern.

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

public class LoginPage extends BasePage {
    // BasePage calls PageFactory.initElements(driver, this) in its constructor,
    // which wires all @FindBy fields to live WebElements automatically.

    private final Logger logger = LogManager.getLogger(this.getClass());

    // ── Constructor ───────────────────────────────────────────────────────────

    public LoginPage(WebDriver driver) {
        super(driver);   // triggers PageFactory.initElements — nothing else needed here
    }

    // ── Locators ──────────────────────────────────────────────────────────────
    // Priority: id > name > css > linkText > partialLinkText > xpath

    @FindBy(id = "username")
    private WebElement usernameField;

    @FindBy(name = "password")
    private WebElement passwordField;

    @FindBy(css = "button[type='submit']")
    private WebElement loginButton;

    @FindBy(css = ".error-message")
    private WebElement errorMessage;

    // ── Actions ───────────────────────────────────────────────────────────────

    public void enterUsername(String username) {
        webActions.sendKeys(usernameField, username, "Username Field");
        logger.info("Entered username: " + username);
    }

    public void enterPassword(String password) {
        webActions.sendKeys(passwordField, password, "Password Field");
        logger.info("Entered password");
    }

    public void clickLoginButton() {
        webActions.click(loginButton, "Login Button");
        logger.info("Clicked Login button");
    }

    // Composite action — used by every protected-page test as the first step
    public void loginWithValidCredentials() {
        enterUsername(ConfigReader.getUsername());    // reads Config.properties → username
        enterPassword(ConfigReader.getPassword());    // reads Config.properties → password
        clickLoginButton();
        ExtentReportManager.logInfo("Logged in with valid credentials");
    }

    // ── Assertions ────────────────────────────────────────────────────────────

    public void verifyErrorMessage(String expectedText) {
        webActions.waitVisibilityOfElementLocated(By.cssSelector(".error-message"));
        webActions.assertEquals(errorMessage, expectedText, "Error message mismatch");
        ExtentReportManager.logInfo("Verified error message: " + expectedText);
    }
}
```

---

## 3. Test Class Standard

> Canonical example: `LoginTC.java` — the foundation test class every other module references for pattern.

```java
package testcases;

import io.qameta.allure.*;
import managers.WebDriversFactory;
import org.testng.Assert;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import pages.LoginPage;
import utilities.ExtentReportManager;

@Listeners(listeners.Listeners.class)
public class LoginTC extends WebDriversFactory {

    @Test(groups = "sanity", description = "TC-LGN-001: Verify successful login with valid credentials")
    @Description("TC-LGN-001: Verify successful login with valid credentials")
    @Epic("EPIC001")
    @Feature("Feature: Login")
    @Story("Story: Valid Login Flow")
    @Severity(SeverityLevel.BLOCKER)
    public void tc_LGN_001_verifyValidLogin() {
        // Page objects always instantiated inside @Test — never as class fields
        LoginPage loginPage = new LoginPage(WebDriversFactory.getWebDriver());

        ExtentReportManager.logInfo("TC-LGN-001: Step 1 - Navigate and log in");
        loginPage.loginWithValidCredentials();
        ExtentReportManager.attachScreenshot(WebDriversFactory.getWebDriver());

        Assert.assertTrue(
            WebDriversFactory.getWebDriver().getCurrentUrl().contains("dashboard"),
            "Expected redirect to dashboard after login"
        );
        ExtentReportManager.logPass("TC-LGN-001: Login verified successfully");
    }
}
```

---

## 4. @FindBy Locator Priority

| Priority | Strategy | Example |
|----------|----------|---------|
| 1 — Best | `id` | `@FindBy(id = "submit-btn")` |
| 2 | `name` | `@FindBy(name = "username")` |
| 3 | `css` | `@FindBy(css = "input[type='email']")` |
| 4 | `linkText` | `@FindBy(linkText = "Forgot Password")` |
| 5 | `partialLinkText` | `@FindBy(partialLinkText = "Forgot")` |
| 6 — Last | `xpath` | `@FindBy(xpath = "//button[@type='submit']")` |

**XPath rules (when required):**
- Use attribute predicates: `[@id='x']` not `[3]`
- Keep short: `//button[@type='submit']` not `//div/form/div[2]/button`
- Never use: auto-generated class names, positional `[n]` selectors

---

## 5. WebActions — Complete Method Reference

```java
// ── Clicks ────────────────────────────────────────────────────────────────
webActions.click(element, "Button Name");
webActions.javaScriptExecutorClick(element, "Button Name");
webActions.doubleClick(element);
webActions.contextClick(element);

// ── Input / Text ──────────────────────────────────────────────────────────
webActions.sendKeys(element, text, "Field Name");
webActions.setValueUsingJavaScript(element, value);
webActions.getText(element, "Element Name");               // → String

// ── HTML <select> Dropdowns ───────────────────────────────────────────────
webActions.selectByText(element, "Visible Text");
webActions.selectByIndex(element, 0);
webActions.selectByValue(element, "value");
webActions.deSelectByText(element, "text");
webActions.deSelectByIndex(element, 0);
webActions.deSelectByValue(element, "value");

// ── Custom Dropdowns (div / ul / li) ──────────────────────────────────────
webActions.multipleSelectByChoice(triggerEl, By.xpath("//li"), "Opt1", "Opt2");

// ── Assertions ────────────────────────────────────────────────────────────
webActions.assertEquals(element, "expected", "message");
webActions.verifyElementPresence(element, "Name");

// ── Explicit Waits ────────────────────────────────────────────────────────
webActions.waitVisibilityOfElementLocated(By.id("id"));
webActions.waitElementToBeClickable(By.xpath("//btn"));    // waits AND clicks
webActions.waitPresenceOfElementLocated(By.cssSelector(".c"));
webActions.waitVisibilityOfAllElementsLocated(By.xpath("//li"));
webActions.waitAlertIsPresent();

// ── Alerts ────────────────────────────────────────────────────────────────
webActions.alertAccept();
webActions.alertDismiss();
webActions.alertSendKeys("text");
webActions.alertGetText();                                 // → String

// ── Mouse Actions ─────────────────────────────────────────────────────────
webActions.moveToElement(element);
webActions.dragAndDrop(source, target);
webActions.clickAndHold(element);
webActions.sendKeysToElement(element, Keys.ENTER);

// ── JavaScript / Scroll ───────────────────────────────────────────────────
webActions.scrollToElement(element);
webActions.scrollBy(0, 500);
webActions.executeJavaScript("window.scrollTo(0,0)");
webActions.setAttribute(element, "value", "text");
webActions.drawBorderByJs(element, "red");                 // debug highlight only

// ── Frames ────────────────────────────────────────────────────────────────
webActions.switchToFrame(element);
webActions.switchToFrameById("frameId");
webActions.switchToFrameByIndex(0);
webActions.switchToFrameByName("name");
webActions.switchToDefaultContent();

// ── Robot (OS keyboard) ───────────────────────────────────────────────────
webActions.pressEnter();
webActions.pressTab();
webActions.pressEscape();
webActions.pressKey(KeyEvent.VK_F5);

// ── Utilities ─────────────────────────────────────────────────────────────
webActions.generateRandomName();                           // → 8-char random String
WebActions.getGeneratedName();                             // → last generated name
```

---

## 6. Config & Data Access

```java
// ── Config.properties ─────────────────────────────────────────────────────
ConfigReader.getProperty("WebsiteUrl")
ConfigReader.getUsername()
ConfigReader.getPassword()
ConfigReader.getExplicitWait()     // → int
ConfigReader.getImplicitWait()     // → Duration
ConfigReader.pageLoadTimeout()     // → Duration

// ── Excel (Apache POI) ────────────────────────────────────────────────────
// ExcelFiles = "./src/test/resources/TestData/ExcelFiles/"
ExcelReader excel = new ExcelReader(ExcelFiles + "FileName.xlsx");
excel.getCellData("Sheet1", rowIndex, colIndex);  // rowIndex starts at 1
excel.getRowCount("Sheet1");
excel.getCellCount("Sheet1", rowIndex);

// ── JSON ──────────────────────────────────────────────────────────────────
JsonReader.getKey("topLevelKey");
JsonReader.getLoginElement("key");    // under "loginPage"
JsonReader.getHomeElement("key");     // under "PurchasePage"
JsonReader.getCheckOutPage("key");    // under "CheckOutPage"
```

---

## 7. Reporting

```java
ExtentReportManager.logInfo("Step description");
ExtentReportManager.logPass("What was verified");
ExtentReportManager.logFail("What failed");
ExtentReportManager.attachScreenshot(WebDriversFactory.getWebDriver());
```

Handled automatically by Listeners: `onStart` · `onTestSuccess` · `onTestFailure` ·
`onTestSkipped` · `onFinish`

---

## 8. TestNG Annotations

| Annotation | Usage |
|------------|-------|
| `@Test(groups = "sanity")` | Critical path — fast, core flows |
| `@Test(groups = "regression")` | Full feature coverage |
| `@Test(groups = "smoke")` | Quick environment health check |
| `@Test(description = "TC-XXX: ...")` | TC-ID + plain English description |
| `@Test(retryAnalyzer = listeners.Listeners.class)` | Adds 1 automatic retry on failure |
| `@Test(dataProvider = "TestData")` | Data-driven — use `ExcelReader` as source |

---

## 9. Allure Severity

| Scenario | SeverityLevel |
|----------|---------------|
| Blocks all testing | `BLOCKER` |
| Core functionality | `CRITICAL` |
| Standard positive | `NORMAL` |
| Minor negative / validation | `MINOR` |
| Edge case | `TRIVIAL` |

---

## 10. Hard Rules — Never Break

| ❌ Never | ✅ Always |
|---------|----------|
| `@BeforeMethod` / `@AfterMethod` in test class | `WebDriversFactory` handles this |
| `Thread.sleep(n)` | `webActions.wait*` |
| `driver.findElement(...)` in page methods | `@FindBy` + `webActions.*` |
| Hardcode URL / credentials / timeouts | `ConfigReader.*` |
| New util classes duplicating existing | Use `ExcelReader` / `JsonReader` / `ConfigReader` |
| `ExtentReportManager.initializeReport(...)` | `Listeners.java` handles this |
| Mobile / Appium imports in web files | Web = web only |
| Page objects as class-level fields | Instantiate inside `@Test` method |
