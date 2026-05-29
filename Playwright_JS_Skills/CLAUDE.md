# QA Automation — Claude Code Project Memory
# Auto-loaded every session | Do NOT delete

---

## Application Under Test

| Environment | URL |
|-------------|-----|
| QA / Demo   | https://www.example.com |

**Platform:** OrangeHRM OS 5.7 (self-hosted on Hostinger)
**Auth type:** Standard HTML form login — NO Auth0, NO SSO, NO "Show more options"

### Login Flow
1. Navigate to `https://www.example.com`
2. Fill **Username** field → `input[name="username"]`
3. Fill **Password** field → `input[name="password"]`
4. Click **Login** button → `button[type="submit"]`
5. Verify redirect to `/web/index.php/dashboard/index`

### Test Credentials (from `test-data/login.csv`)
| RoleName | Username | Password |
|----------|----------|----------|
| Admin | adminhrqa | Adminhrqa@321 |

---

## Framework Architecture

**Inheritance chain:**
```
CommonActions (utils/WebActions.js)
    └── BasePage (pages/basePage.js)       ← loads testdata.json + login.csv
            └── FeaturePage (pages/)        ← imports locators from pageObjects/
```

**Three files per feature:**
```
pageObjects/<feature>Page.js    ← Locator constants ONLY (no logic)
pages/<feature>Page.js          ← Page class extending BasePage
tests/<Feature>.test.js         ← Spec file using testFixtures/fixture
```

---

## Coding Standards

### pageObjects/<feature>Page.js
- Named exports only — zero logic, zero imports, zero methods
- Group with inline comments
- OrangeHRM stable selectors use `input[name="..."]`, `button[type="submit"]`, `.oxd-*` classes

```javascript
// Navigation
export const usernameInput  = 'input[name="username"]';
export const loginBtn       = 'button[type="submit"]';
export const errorAlert     = '.oxd-alert-content-text';
```

### pages/<feature>Page.js
- `class FeaturePage extends BasePage`
- `constructor(page) { super(page); }`
- Import locators from `../pageObjects/<feature>Page`
- Import `{ expect }` from `@playwright/test`
- Navigation methods → return `await super.waitForPageLoad()`
- Assertion methods → call `await this.wait()` first
- Credentials → `this.getLoginDataByRole('Admin')` — NEVER hardcode

### tests/<Feature>.test.js
- Import from `'../testFixtures/fixture'` — NOT from `@playwright/test`
- Tags: `@smoke` and/or `@regression` on EVERY test
- Every action wrapped in `test.step()`
- `test.describe.parallel()` for independent tests

---

## CommonActions Methods (from utils/WebActions.js)

| Method | Purpose |
|--------|---------|
| `open(url)` | Navigate to URL |
| `waitAndClick(selector)` | Click element |
| `waitAndFill(selector, text)` | Fill input field |
| `waitAndClear(selector)` | Clear input field |
| `waitForPageLoad()` | Wait for DOM content loaded |
| `waitforNetworkIdle()` | Wait for network idle |
| `isElementVisible(selector, errorMsg?)` | Assert element is visible |
| `verifyElementText(selector, text)` | Assert exact text content |
| `verifyElementContainsText(selector, text)` | Assert partial text |
| `getElementText(selector)` | Get text content |
| `getAllElementsText(selector)` | Get all matching elements' text |
| `getTitle()` | Get page title |
| `getUrl()` | Get current URL |
| `getCount(selector)` | Count matching elements |
| `keyPress(selector, key)` | Press key on element |
| `wait()` | Default framework wait |
| `refresh()` | Reload page |
| `isFieldEditable(locator)` | Check if field is editable |
| `checkOption(selector)` | Check checkbox/radio |
| `generateAlphaNumeric(length)` | Generate random string |

---

## Test Data

- **Credentials:** `test-data/login.csv` → columns: `RoleName, Username, Password, Full_Name`
- **Static data:** `utils/testdata.json` → titles, messages, expected values
- **Use:** `this.getLoginDataByRole('Admin')` → returns `{ Username, Password, Full_Name }`

---

## OrangeHRM Selector Reference

```javascript
// Login page
input[name="username"]           // Username input
input[name="password"]           // Password input
button[type="submit"]            // Login button
.oxd-alert-content-text          // "Invalid credentials" error
span:has-text("Required")        // Empty field validation

// Post-login
nav[aria-label="Sidepanel"]      // Left sidebar navigation
.oxd-userdropdown-tab            // Profile icon (top-right)
li[role="menuitem"]:has-text("Logout")  // Logout menu item

// General OrangeHRM patterns
.oxd-main-menu-item              // Sidebar nav items
.oxd-table-body .oxd-table-row   // Table rows
button.oxd-button--secondary     // Secondary action buttons (Add, Search)
```

---

## Skill Commands

| Command | What it does |
|---------|-------------|
| `/explore <feature>` | Browse app with Playwright MCP, document all UI flows |
| `/generate-tests <feature>` | Generate structured test cases (MD + CSV) from exploration |
| `/build-scripts <feature>` | Convert approved test cases to Playwright JS files |
| `/heal <feature>` | Fix broken selectors in existing tests |

---

## File Naming Conventions

| Artifact | Pattern | Example |
|----------|---------|---------|
| Test spec | `<Module>.test.js` | `Login.test.js` |
| Page class | `<feature>Page.js` | `loginPage.js` |
| Page object | `<feature>Page.js` | `loginPage.js` |
| Test cases (MD) | `test-cases/<feature>/test-cases.md` | |
| Test cases (CSV) | `test-cases/<feature>/test-cases.csv` | |
| Exploration notes | `test-cases/<feature>/exploration-notes.md` | |

---

## Module Prefixes

| Module | Prefix | Test File |
|--------|--------|-----------|
| Login / Logout | LGN | `Login.test.js` |
| Dashboard | DSH | `Dashboard.test.js` |
| PIM | PIM | `PIM.test.js` |
| Leave | LVE | `Leave.test.js` |
| Admin Users | ADM | `AdminUsers.test.js` |
