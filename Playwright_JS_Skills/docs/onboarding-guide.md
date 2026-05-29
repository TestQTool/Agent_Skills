# QA Workspace — OrangeHRM Onboarding & Extension Guide

## Quick Start

### 1. Install Playwright MCP (one time)
```bash
cd Playwright/    # your existing repo root
claude mcp add playwright npx @playwright/mcp@latest
```

Verify inside Claude Code:
```
/mcp
# Should show: playwright (with browser_navigate, browser_click, etc.)
```

### 2. Copy the scaffold files into your repo
```
Playwright/
├── CLAUDE.md                   ← Copy to repo root
├── .claude/
│   └── skills/                 ← Copy the full skills/ folder
├── prompts/                    ← Copy the full prompts/ folder
│   └── user-stories/
│       └── orangehrm.md        ← OrangeHRM user stories (already provided)
└── test-cases/                 ← Copy (empty is fine, content is generated)
```

### 3. Set up login credentials file
Create `test-data/login.csv` in your Playwright folder:
```csv
RoleName,Username,Password,Full_Name
Admin,adminhrqa,Adminhrqa@321,Admin HrQA
```

> ⚠️ OrangeHRM uses a **standard HTML form login** — NOT Auth0.
> The login workflow is: fill Username → fill Password → click Login.
> There is no "Show more options" or Auth0 provider selection.

### 4. Run your first workflow
```bash
cd Playwright/
claude     # start Claude Code session

# Inside the session:
> use playwright mcp to open https://hr.quality-matrix.us/web/index.php/auth/login
> /explore login
# → Generates test-cases/login/exploration-notes.md

> /generate-tests login
# → Generates test-cases/login/test-cases.md
# → REVIEW THIS FILE before the next step

> /build-scripts login
# → Generates pageObjects/loginPage.js, pages/loginPage.js, tests/Login.test.js
```

---

## Module Exploration Order (recommended)

| Step | Feature | Command | Why |
|------|---------|---------|-----|
| 1 | Login + Logout | `/explore login` | Foundation — blocks everything else |
| 2 | Dashboard | `/explore dashboard` | Verifies post-login state and nav |
| 3 | Employee Management | `/explore pim` | Core HR function — most complex |
| 4 | Leave Management | `/explore leave` | Common HR workflow |
| 5 | Admin Users | `/explore admin-users` | User management coverage |

---

## How to Add a New Feature Module

### Step 1: Create a feature context file (optional but recommended)
```
test-cases/<feature>/CLAUDE.md
```
Document known locators, existing methods, and what's already automated.
This file is auto-loaded by Claude Code when it accesses that directory.

### Step 2: Run the workflow
```
/explore <feature>
# Review: test-cases/<feature>/exploration-notes.md

/generate-tests <feature>
# ★ REVIEW test-cases/<feature>/test-cases.md before proceeding

/build-scripts <feature>
# Review generated code then update testFixtures/fixture.js
```

---

## How to Pass the App URL

### Method 1: In CLAUDE.md (already set up)
`CLAUDE.md` already contains the OrangeHRM QA URL. Claude reads it every session.

### Method 2: Tell Claude directly in the session
```
> Target the OrangeHRM app at https://hr.quality-matrix.us/web/index.php/auth/login
> /explore pim
```

---

## How Credentials Are Managed

**In `test-data/login.csv`** (for automated scripts):
```csv
RoleName,Username,Password,Full_Name
Admin,adminhrqa,Adminhrqa@321,Admin HrQA
```

**In page classes** — always use:
```javascript
const creds = this.getLoginDataByRole('Admin');
await this.loginWithCredentials(creds.Username, creds.Password);
```

**For Playwright MCP browsing sessions** — Claude uses the credentials directly
when you say "log in with adminhrqa / Adminhrqa@321". The browser session
stays authenticated while Claude continues exploring.

**Never hardcode credentials in page files or test files.**

---

## Important: OrangeHRM Login is NOT Auth0

When generating scripts or giving Claude instructions, always be explicit:

✅ Correct prompt:
```
use playwright mcp to navigate to https://hr.quality-matrix.us/web/index.php/auth/login,
enter username adminhrqa and password Adminhrqa@321, then click Login
```

❌ Wrong — do NOT say:
```
click "Show more options" or "Login with Axis Auth0 Dev"
```
(Those are for the Helix Analytics project, not OrangeHRM)

---

## Folder Structure After Setup

```
Playwright/
├── CLAUDE.md                              ← OrangeHRM project memory
├── .claude/
│   └── skills/
│       ├── explore/SKILL.md               ← /explore <feature>
│       ├── generate-tests/SKILL.md        ← /generate-tests <feature>
│       ├── build-scripts/SKILL.md         ← /build-scripts <feature>
│       └── heal/SKILL.md                  ← /heal <feature>
├── prompts/
│   ├── app-context.md                     ← OrangeHRM URLs, modules, behaviors
│   ├── test-case-template.md              ← Test case format + coverage checklist
│   ├── playwright-standards.md            ← Coding standards (unchanged)
│   └── user-stories/
│       └── orangehrm.md                   ← US-001 to US-006 + acceptance criteria
├── test-cases/
│   └── <feature>/
│       ├── CLAUDE.md                      ← (Optional) Feature-specific context
│       ├── exploration-notes.md           ← Generated by /explore
│       └── test-cases.md                  ← Generated by /generate-tests (REVIEW)
├── test-data/
│   └── login.csv                          ← Admin credentials for OrangeHRM
├── pageObjects/                           ← Locator files (generated)
├── pages/                                 ← Page classes (generated)
├── tests/                                 ← Spec files (generated)
├── testFixtures/fixture.js                ← Update manually after /build-scripts
└── utils/
    ├── WebActions.js                      ← CommonActions — DO NOT MODIFY
    ├── config.js                          ← baseUrl config
    └── testdata.json                      ← Static expected values
```

---

## Weekly Workflow

```
Each feature takes 30–60 minutes:

1. Start session          → claude
2. Verify MCP works       → /mcp (should show playwright)
3. Explore feature        → /explore <feature>
4. Review notes           → Open test-cases/<feature>/exploration-notes.md
5. Generate test cases    → /generate-tests <feature>
6. ★ Review test cases    → Open test-cases/<feature>/test-cases.md — YOUR REVIEW
7. Build scripts          → /build-scripts <feature>
8. Update fixture         → Edit testFixtures/fixture.js manually (2 min)
9. Run tests              → npx playwright test tests/<Feature>.test.js --project=Chrome
10. View report           → npx playwright show-report
```

---

## Common Issues & Fixes

| Problem | Fix |
|---------|-----|
| `claude` command not found | Close terminal, open new one in VS Code |
| Playwright MCP not in `/mcp` | Run `claude mcp add playwright npx @playwright/mcp@latest` from `Playwright/` folder |
| Claude tries to use Auth0 flow | Remind Claude: "OrangeHRM uses standard form login, not Auth0" |
| Browser doesn't open | Run `npx playwright install` to install browser binaries |
| Tests fail after UI change | Run `/heal <feature>` to fix broken selectors |
| Login redirects unexpectedly | Check the app is accessible at `https://hr.quality-matrix.us/` |
