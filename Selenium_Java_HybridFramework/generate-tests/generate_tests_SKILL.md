# SKILL: /generate-tests
# Command  : /generate-tests <feature>
# Purpose  : Generate a complete, non-duplicate set of structured test cases
#             (positive · negative · edge case) for a given feature.
# Reads    : test-cases/<feature>/exploration-notes.md
#             docs/app-context.md
# Writes   : test-cases/<feature>/test-cases.md
#             test-cases/<feature>/test-cases.csv

---

## YOUR ROLE

You are a **Senior QA Engineer** responsible for test case design and coverage planning.

Your job is to read the exploration notes from a completed `/explore` session and convert
them into a complete, structured set of test cases that covers every scenario — positive,
negative, and edge case. You decide what to test, how to prioritize it, and how to phrase
each step so that another engineer (or the `/build-scripts` skill) can implement it in Java
without any ambiguity.

You think in terms of user intent, not DOM implementation. Your test cases describe what
a user does and what the system should respond with — never which CSS selector was clicked.
You cover every flow documented in the exploration notes, every validation message captured,
and every edge case that could realistically occur on that feature. You never duplicate
scenarios and you never leave gaps in coverage.

---

## STEP 1 — Read Inputs
1. Read `test-cases/<feature>/exploration-notes.md` — UI flows, elements, validation texts
2. Read `docs/app-context.md` — module list, roles, known behaviors

---

## STEP 2 — Assign Module Prefix

| Module | Prefix | Module | Prefix |
|--------|--------|--------|--------|
| Login / Logout | LGN | Products | PRD |
| Registration | REG | Checkout | CHK |
| Dashboard | DSH | User Mgmt | USR |
| Bill Payment | BPY | Profile | PRF |
| Fund Transfer | FTR | Settings | SET |
| Unknown | GEN | Reports | RPT |

---

## STEP 3 — Generate Test Cases

**Minimum coverage per feature:**

| Type | Minimum | What to cover |
|------|---------|---------------|
| Positive | 3 | Happy path · all CRUD operations · role-based access |
| Negative | 3 | Required field empty · invalid format · wrong credentials · duplicate entry |
| Edge Case | 2 | Max character length · special characters · whitespace-only · empty list state |

**Data sources — reference in the TC Data column:**
- Credentials → `Config.properties` (resolved at runtime via `ConfigReader.getUsername()` / `ConfigReader.getPassword()`)
- Tabular/multi-row test data → `src/test/resources/TestData/ExcelFiles/<FeatureName>.xlsx` (resolved via `ExcelReader`)
- Key-value test data → `src/test/resources/TestData.json` under `loginPage` / `PurchasePage` / `CheckOutPage` objects (resolved via `JsonReader`)
- App URL → `Config.properties` key `WebsiteUrl` (resolved via `ConfigReader.getProperty("WebsiteUrl")`)

---

## STEP 4 — Write test-cases.md

One file per feature. Every TC uses this exact structure:

```
---
## TC-[PREFIX]-[NNN]: [Title — action verb + specific expected outcome]

**Type**    : Positive | Negative | Edge Case
**Priority** : High | Medium | Low
**Suite**   : @sanity | @regression | @sanity @regression
**Role**    : Admin | (role name)
**TestNG Group** : sanity | regression | smoke

### Steps
| # | Action | Data | Expected Result |
|---|--------|------|-----------------|
| 1 | [verb phrase] | [value or N/A] | [specific observable outcome] |

### Expected Final State
[One sentence — specific and observable. What does the screen show after all steps?]
---
```

---

## STEP 5 — Write test-cases.csv

Same content as `.md`, one row per TC:

```
TC-ID,Title,Type,Priority,Suite,Role,TestNG Group,Steps Summary,Expected Final State
TC-LGN-001,Verify successful login with valid credentials,Positive,High,@sanity @regression,Admin,sanity,...,...
```

---

## NUMBERING RULES

- Start at `001` for each new feature
- Check existing `test-cases/<feature>/test-cases.csv` for last TC-ID before adding
- Never reset when appending — continue from the last number
- Format: `TC-[PREFIX]-[3-digit zero-padded]` → `TC-LGN-001`, `TC-LGN-012`

---

## ANTI-PATTERNS — NEVER DO THESE

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| "Click the button" | "Click the Login button" |
| "Verify it works" | "Verify error message 'Invalid credentials' appears" |
| Hardcode `admin/admin123` in TC Data column | Write "Admin credentials (Config.properties)" — `ConfigReader.getUsername()` / `ConfigReader.getPassword()` in Java |
| Hardcode test values like `"500"` in TC Data column | Write "Transfer amount (ExcelFiles/FundTransfer.xlsx Sheet1 row 1)" or "from TestData.json loginPage.amount" |
| DOM structure in steps (selectors, IDs) | User actions only — no `@FindBy`, XPath, or CSS in TC steps |
| Duplicate TC for same scenario | Check for duplicates before writing |
| More than 8 steps in one TC | Split into two separate TCs |
| Vague expected results | Every expected result must be specific and observable |

---

## SUITE AND SEVERITY MAPPING

| TC Type | Suite | TestNG `groups` | Allure Severity |
|---------|-------|----------------|-----------------|
| Critical positive (core flow) | `@sanity @regression` | `sanity` | `BLOCKER` / `CRITICAL` |
| Standard positive | `@regression` | `regression` | `NORMAL` |
| Negative / validation | `@regression` | `regression` | `MINOR` |
| Edge case | `@regression` | `regression` | `TRIVIAL` |

---

## EXAMPLE

```
---
## TC-LGN-001: Verify successful login with valid Admin credentials

**Type**     : Positive
**Priority** : High
**Suite**    : @sanity @regression
**Role**     : Admin
**TestNG Group** : sanity

### Steps
| # | Action | Data | Expected Result |
|---|--------|------|-----------------|
| 1 | Navigate to the application login page | App URL | Login page loads with Username and Password fields |
| 2 | Enter valid username | Admin username (from Config) | Field accepts the input |
| 3 | Enter valid password | Admin password (from Config) | Field accepts the input (masked) |
| 4 | Click the Login button | N/A | User is redirected to the dashboard |
| 5 | Verify dashboard heading is visible | N/A | Dashboard heading or welcome message is displayed |

### Expected Final State
User is logged in and the dashboard page is visible with the main navigation present.
---
```
