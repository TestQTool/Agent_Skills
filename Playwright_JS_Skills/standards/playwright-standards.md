# Playwright Coding Standards — Framework Structure

All generated Playwright scripts MUST match the existing codebase patterns exactly.
Read `CLAUDE.md` for the full architecture. This file is the coding spec.

---

## File Outputs per Feature

When generating scripts for feature `<feature>`, always create THREE files:

```
pageObjects/<feature>Page.js     ← Locators ONLY
pages/<feature>Page.js           ← Page class with methods
tests/<Feature>.test.js          ← Spec file with test cases
```

---

## 1. pageObjects/<feature>Page.js — Locators File

**Rules:**
- Named exports ONLY
- CSS selectors preferred → `data-testid` → ARIA → text-based
- Zero logic, zero methods, zero imports (except type hints if needed)
- Group related locators with inline comments

```javascript
// pageObjects/dashboardPage.js

// Navigation
export const homeNavLink         = '[data-testid="nav-home"]';
export const dashboardNavLink    = '[data-testid="nav-dashboard"]';

// Dashboard header
export const pageTitle           = 'h1.dashboard-title';
export const lastUpdatedLabel    = '.last-updated-text';

// Filters
export const dateRangeDropdown   = '[data-testid="date-range-filter"]';
export const applyFiltersBtn     = '[data-testid="apply-filters"]';
export const resetFiltersBtn     = '[data-testid="reset-filters"]';

// Data table
export const dataTable           = '[data-testid="results-table"]';
export const tableRows           = '[data-testid="results-table"] tbody tr';
export const noResultsMessage    = '[data-testid="no-results-message"]';

// Validation / Error
export const errorToast          = '.toast-error';
export const successToast        = '.toast-success';
```

---

## 2. pages/<feature>Page.js — Page Class

**Rules:**
- Extends `BasePage`
- Constructor calls `super(page)`
- Import all locators from `../pageObjects/<feature>Page`
- Import `{ expect }` from `@playwright/test`
- Method = one meaningful user action OR one meaningful assertion
- Navigation methods return `await super.waitForPageLoad()`
- Assertion methods use `await this.wait()` before asserting
- Use `this.testData.<key>` for expected values (not hardcoded strings)
- Use `this.getLoginDataByRole('RoleName')` for credentials

```javascript
// pages/dashboardPage.js
import BasePage from './basePage';
import { expect } from '@playwright/test';
import {
    homeNavLink,
    pageTitle,
    dateRangeDropdown,
    applyFiltersBtn,
    dataTable,
    tableRows,
    noResultsMessage,
    errorToast,
    successToast
} from '../pageObjects/dashboardPage';

class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
    }

    // --- Navigation ---
    async navigateToDashboard() {
        await this.waitAndClick(homeNavLink);
        return await super.waitForPageLoad();
    }

    // --- Actions ---
    async applyDateFilter(dateRange) {
        await this.selectDropdown(dateRangeDropdown, dateRange);
        await this.waitAndClick(applyFiltersBtn);
        return await super.waitforNetworkIdle();
    }

    async resetFilters() {
        await this.waitAndClick(resetFiltersBtn);
        return await super.waitForPageLoad();
    }

    // --- Assertions ---
    async verifyDashboardLoaded() {
        await this.wait();
        await this.isElementVisible(pageTitle, this.testData.notVisibleText);
        expect(await this.getUrl()).toContain('/dashboard');
    }

    async verifyDataTableVisible() {
        await this.wait();
        await this.isElementVisible(dataTable, this.testData.notVisibleText);
    }

    async verifyNoResultsState() {
        await this.wait();
        await this.isElementVisible(noResultsMessage, this.testData.notVisibleText);
    }

    async verifyRowCount(expectedCount) {
        const count = await this.getCount(tableRows);
        expect(count).toBe(expectedCount);
    }

    async verifySuccessToast() {
        await this.isElementVisible(successToast, this.testData.notVisibleText);
    }

    async verifyErrorToast() {
        await this.isElementVisible(errorToast, this.testData.notVisibleText);
    }
}

export default DashboardPage;
```

---

## 3. tests/<Feature>.test.js — Spec File

**Rules:**
- Import from `'../testFixtures/fixture'` — NOT from `@playwright/test`
- Every test tagged with `@smoke` and/or `@regression`
- Every action inside `test.step()`
- `test.describe.parallel()` for independent tests
- `test.describe.serial()` ONLY when tests have strict order dependency
- Test name format: `@regression @smoke [What is being verified] for [condition]`
- Data-driven tests use `for...of` loops over parsed CSV data (see Login.test.js pattern)

```javascript
// tests/Dashboard.test.js
import test from '../testFixtures/fixture';

test.describe.parallel('@Dashboard: Verify dashboard functionality', () => {

    test('@regression @smoke Verify dashboard loads for Admin user', async ({ loginPage, dashboardPage }) => {
        await test.step('Open the application', async () => {
            await loginPage.openApp();
        });
        await test.step('Login with Auth0 as Admin', async () => {
            await loginPage.auth0Login();
            await loginPage.LoginWithValidCredentials(
                dashboardPage.getLoginDataByRole('Admin').Email,
                dashboardPage.getLoginDataByRole('Admin').Password
            );
        });
        await test.step('Verify landing page after login', async () => {
            await loginPage.verifyLandingPage();
        });
        await test.step('Navigate to Dashboard', async () => {
            await dashboardPage.navigateToDashboard();
        });
        await test.step('Verify dashboard is loaded', async () => {
            await dashboardPage.verifyDashboardLoaded();
        });
    });

    test('@regression Verify no results state when no data matches filter', async ({ loginPage, dashboardPage }) => {
        await test.step('Open and login', async () => {
            await loginPage.openApp();
            await loginPage.auth0Login();
            await loginPage.LoginWithAnalystCredentials();
        });
        await test.step('Apply a filter that returns no results', async () => {
            await dashboardPage.applyDateFilter('Custom - No Data Range');
        });
        await test.step('Verify empty state is displayed', async () => {
            await dashboardPage.verifyNoResultsState();
        });
    });

});
```

---

## 4. testFixtures/fixture.js — Wiring New Pages

When you add a new page class, add it to the fixture file:

```javascript
// In testFixtures/fixture.js — ADD your new page:
import DashboardPage from '../pages/dashboardPage';

const test = base.extend({
    // ... existing fixtures ...

    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
});
```

---

## 5. Selector Priority

1. `[data-testid="..."]` — most stable, always prefer
2. ARIA roles: `page.getByRole('button', { name: 'Submit' })`
3. Labels: `page.getByLabel('Email')`
4. CSS class (only stable, non-dynamic classes)
5. **Never**: XPath, positional (`:nth-child`), or auto-generated class names

---

## 6. Common Patterns

### Login before every test (preferred pattern)
```javascript
// In pages — use role-specific login methods:
await loginPage.LoginWithStewardCredentials();
await loginPage.LoginWithAnalystCredentials();
await loginPage.LoginWithBusinessUserCredentials();
// Or for any role from CSV:
await loginPage.LoginWithValidCredentials(email, password);
```

### Wait patterns
```javascript
await this.waitForPageLoad();     // DOM content loaded
await this.waitforNetworkIdle();  // All network requests settled
await this.wait();                // Default framework wait before assertions
```

### Iframe interactions
```javascript
// Always pass iframeSelector as last argument to any CommonAction method
await this.waitAndClick(selector, iframeSelector);
await this.waitAndFill(selector, text, 'first', iframeSelector);
await this.isElementVisible(selector, errorMsg, iframeSelector);
```

### API testing pattern
```javascript
// Use validateApiWithToken from CommonActions
await this.validateApiWithToken(endpoint, process.env.ADP_API_TOKEN, true);
```

---

## 7. npm Script Naming (for new modules)

When adding a new module called `NewModule`, add to `package.json`:
```json
"test:NewModule-Smoke-Chrome":      "PLAYWRIGHT_SUITE=smoke npx playwright test tests/NewModule.test.js --grep @smoke --project=Chrome",
"test:NewModule-Regression-Chrome": "PLAYWRIGHT_SUITE=regression npx playwright test tests/NewModule.test.js --grep @regression --project=Chrome"
```
