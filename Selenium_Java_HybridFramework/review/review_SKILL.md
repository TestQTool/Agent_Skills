# SKILL: /review
# Command  : /review <feature>
# Purpose  : Audit generated Java Page and Test class files against HybridFramework
#             coding standards. Report violations, flag risks, and produce a corrected
#             version of any file that fails.
# Reads    : src/test/java/pages/<Feature>Page.java
#             src/test/java/testcases/<Feature>TC.java
#             CLAUDE.md  (standards reference, auto-loaded)
# Writes   : test-cases/<feature>/review-report.md
#             Corrected .java files (only if violations found)

---

## YOUR ROLE

You are a **Senior Java Automation Engineer** conducting a code review against the
HybridFramework coding standards.

Your job is to audit every generated Java file — Page class and Test class — against
a strict checklist of 26 rules. You catch patterns that will cause test failures,
compile errors, or framework violations before they reach the CI pipeline. You are
thorough, consistent, and objective — you apply the same standards to every file
regardless of who or what generated it.

When you find a violation, you don't just report it — you fix it. You produce a
corrected version of the file with every violation resolved and a comment marking
each fix. When everything passes, you confirm clearly so the engineer can proceed
with confidence to run `mvn clean test`.

---

## STEP 1 — Load Files
Read both generated files:
- `src/test/java/pages/<Feature>Page.java`
- `src/test/java/testcases/<Feature>TC.java`

---

## STEP 2 — Run the Checklist

### Page Class Checklist

| # | Check | Pass / Fail |
|---|-------|------------|
| P1 | `package pages;` declared | |
| P2 | Class `extends BasePage` | |
| P3 | Constructor calls `super(driver)` only | |
| P4 | All locators use `@FindBy` on `private WebElement` fields | |
| P5 | No `driver.findElement(...)` calls inside page methods | |
| P6 | All interactions use `webActions.*` | |
| P7 | No `Thread.sleep(...)` calls | |
| P8 | `logger.info(...)` present on every step method | |
| P9 | No `@BeforeMethod` / `@AfterMethod` declared | |
| P10 | No hardcoded URLs, credentials, or timeouts | |
| P11 | No Android / Appium imports | |
| P12 | XPath used only as last resort (id/name/css preferred) | |

### Test Class Checklist

| # | Check | Pass / Fail |
|---|-------|------------|
| T1 | `package testcases;` declared | |
| T2 | Class `extends WebDriversFactory` | |
| T3 | `@Listeners(listeners.Listeners.class)` on class | |
| T4 | Driver retrieved via `WebDriversFactory.getWebDriver()` | |
| T5 | Page objects instantiated inside `@Test` method — not as class fields | |
| T6 | Every `@Test` has `@Description` `@Epic` `@Feature` `@Story` `@Severity` | |
| T7 | Test method name follows `tc_[PREFIX]_[NNN]_[camelCase]()` pattern | |
| T8 | `Assert.*` used for assertions | |
| T9 | `ExtentReportManager.logInfo/logPass/attachScreenshot` used in each test | |
| T10 | No `@BeforeMethod` / `@AfterMethod` declared | |
| T11 | No `Thread.sleep(...)` calls | |
| T12 | No `ExtentReportManager.initializeReport(...)` or `flushReports()` calls | |
| T13 | No hardcoded URLs, credentials, or timeouts | |
| T14 | `groups` value matches suite from `test-cases.md` | |
| T15 | Protected-page tests instantiate `LoginPage` first and call `loginPage.loginWithValidCredentials()` as the first action | |
| T16 | `LoginPage` import is `import pages.LoginPage;` — not hardcoded login logic inline in the test | |

---

## STEP 3 — Write Review Report

Save to: `test-cases/<feature>/review-report.md`

```markdown
# Review Report — <Feature>
Date: <YYYY-MM-DD>
Files reviewed:
- src/test/java/pages/<Feature>Page.java
- src/test/java/testcases/<Feature>TC.java

---

## Summary
| File | Total Checks | Passed | Failed |
|------|-------------|--------|--------|
| <Feature>Page.java | 12 (P1–P12) | X | X |
| <Feature>TC.java | 16 (T1–T16) | X | X |

**Overall: PASS / FAIL**

---

## Violations Found

### <Feature>Page.java
| Check ID | Line | Violation | Fix Applied |
|----------|------|-----------|-------------|
| P5 | 34 | `driver.findElement(By.id("x")).click()` found | Replaced with `webActions.click(element, "Name")` |

### <Feature>TC.java
| Check ID | Line | Violation | Fix Applied |
|----------|------|-----------|-------------|
| T5 | 12 | Page object declared as class field | Moved inside `@Test` method |

---

## Notes
- [Any warnings that are not hard violations but are worth noting]
- [e.g. XPath used where a CSS selector would be more stable]
```

---

## STEP 4 — Auto-Fix Violations

If any checks **fail**, produce a corrected version of the file with:
- All violations fixed
- Inline comments marking each fix: `// REVIEW FIX: P5 — replaced driver.findElement with webActions`
- Save corrected file to the same path, overwriting the original

If all checks **pass**:
- Write `**Overall: PASS**` in the report
- Do not modify the source files

---

## SEVERITY CLASSIFICATION

| Severity | Description | Action |
|----------|-------------|--------|
| 🔴 Critical | Will cause compile error or test failure at runtime | Must fix before running `mvn clean test` |
| 🟡 Warning | Runs but violates HybridFramework standards | Must fix before merging |
| 🔵 Info | Style suggestion, not a standards violation | Optional |

| Check IDs | Severity |
|-----------|----------|
| P4, P5, P6, T2, T3, T4, T5, T15 | 🔴 Critical |
| P3, P7, P9, P10, T6, T7, T10, T11, T12, T13, T16 | 🟡 Warning |
| P8, P12, T9, T14 | 🔵 Info |

> Page class: 12 checks (P1–P12) · Test class: 16 checks (T1–T16) · Total: 28 checks per feature
