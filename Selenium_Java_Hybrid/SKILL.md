---
name: Selenium_Java_Hybrid
description: Generate Selenium Java Hybridframework automation from explicitly selected, approved test cases. Use for Qentrix automation-script generation against the matching static framework; never use this skill to create test cases or invent business scenarios.
---

# Selenium Java Hybridframework Script Generation

Generate runnable, framework-compatible automation for the existing `Selenium_Java_Hybrid` stack. Treat selected approved test cases as the only behavioral source of truth.

## Run Automation Healing

For run-failure repair, use the sibling `HEALING.md` file in this directory. Keep generation rules in this `SKILL.md`; keep runtime repair, failure classification, rerun, and push-after-pass policy in `HEALING.md`.

## Required Input

Require:

- Framework version and existing target-repository files.
- Selected approved test cases containing `id`, `title`, ordered `steps`, and optional approved `tags`, `preconditions`, and `dataReferences`.
- Every step containing `number`, `action`, and `expected`.
- Application routes, endpoint details, device/browser target, and safe runtime data references required by those steps.
- Selector, element, API schema, or mobile object evidence when production-ready output is requested.

Use only data present in the selected approved test cases. Do not invent URLs, users, passwords, roles, tags, devices, endpoints, assertions, or business scenarios.

## Target Output Contract

The static framework path is reference context only. Do not output paths beginning with `Agent_Skills/`, `StaticFrameworks/`, `Web Automation/`, `updateagentskill/`, or `Web Automation/`.

Generated files must target the selected client framework root from the request, or paths relative to that selected root.

Allowed generated/updated areas for this stack:

- `src/test/java/**/*`
- `src/test/resources/**/*`
- `src/main/java/**/*`
- `test-data/**/*`
- `pom.xml`

Return strict JSON only:

```json
{
  "status": "ready | needs_exploration | blocked",
  "tool": "Selenium",
  "language": "Java",
  "frameworkType": "Hybridframework",
  "testCaseIds": ["TC-001"],
  "operations": [],
  "coverage": [],
  "warnings": []
}
```

For every selected runnable test case, the response must include all files needed for a runnable implementation in this stack. Do not return only metadata, only data files, only placeholders, or an empty operations list when selected testcase steps are present.

## Hard Dependency Contract

- If a generated test imports or calls a local helper, page, screen, keyword, fixture, step definition, request client, data file, or configuration file, that dependency must already exist in the selected branch or be returned in the same response.
- Never generate tests that call missing methods, missing keywords, missing fixtures, missing page/screen classes, missing request clients, or missing data keys.
- If a generated test references runtime data, the exact object path, CSV header, property, or environment variable must exist after applying operations.
- Update only generator-owned feature files or narrowly scoped framework extension points. Do not rewrite framework-owned bootstrap, drivers, runners, reporters, lockfiles, or global configuration unless the user explicitly asks.

## Workflow

1. Validate selected IDs and required step fields.
2. Inspect existing target-repository files before generating operations.
3. Reuse matching feature/module files when selected testcase intent belongs there.
4. Replace only the selected testcase block when the same testcase ID already exists.
5. Create a new module only when no existing module reasonably matches.
6. Map every approved action to an implementation method/keyword/request/action.
7. Map every approved expected result to a retrying assertion/check supported by `Selenium`.
8. Use selector/API/mobile evidence as the primary source. If evidence is incomplete, produce runnable best-effort output and mark `needs_exploration`.
9. Preserve approved tags exactly; do not invent tags from title, priority, type, category, or status.
10. Return deterministic JSON operations and complete step coverage.

## Runtime Data And Security

- Put base URLs, valid/default runtime credentials, device names, and environment-level settings in environment/config files supported by the framework.
- Put invalid credentials, alternate users, form values, request bodies, expected messages, product names, search text, and testcase-specific data in framework test-data files.
- Generated executable code must not contain literal secrets, tokens, cookies, private keys, production credentials, or platform credentials.
- Do not use literal fallback secrets such as `process.env.PASSWORD || 'demo'` or equivalent in any language.
- Test titles, step titles, logs, comments, and report labels must not expose hidden runtime values.

## Quality Rules

- Follow the selected static framework's existing lifecycle, fixtures, hooks, drivers, clients, runners, listeners, and reporting utilities.
- Do not duplicate browser, driver, API client, mobile session, or report setup inside each generated test when the framework already provides it.
- Prefer stable selectors/object locators/schema fields from evidence over guessed wording.
- Do not use fixed sleeps when the framework provides retrying waits/assertions.
- Keep generated code deterministic, minimal, and scoped to selected testcase IDs.

## Completion Gates

Return `ready` only when:

1. Every requested ID exists in approved input.
2. Exactly one generated runnable test/scenario/spec maps to each selected ID.
3. Every action is implemented and every expected result has an assertion/check.
4. All imports, method calls, fixtures, keywords, request clients, and data references resolve.
5. Generated paths remain inside the selected client framework root.
6. No secrets or literal runtime credentials are exposed in executable files.
7. The framework's list/compile/smoke command can run after applying operations.

Return `needs_exploration` when behavior is complete but selectors, mobile elements, API examples, or assertion states are unverified. Return `blocked` only when required approved steps, expectations, routes, safe data references, or framework files are missing so badly that runnable feature files cannot be produced.

## Qentrix Standard Generation Contract

This skill folder is Selenium_Java_Hybrid for Selenium / Java / Hybrid. Use updateagentskill/playwright/javascript/hybrid as a quality reference only; preserve this skill's own tool, language, framework type, folder name, and output conventions.

- Generate automation only from explicitly selected approved input.
- Do not create or change business test cases.
- Do not invoke TestCaseGeneration-Skills.
- Do not output local paths under D:\skills, D:\frameworks, Agent_Skills, StaticFrameworks, updateagentskill, or Web Automation.
- Keep generated output inside the selected client framework root.
- Do not hardcode runtime URLs, credentials, tokens, or copied secrets in generated source files.
- Ensure every generated test has the page, object, fixture, step, helper, and test-data dependencies it imports or calls.

## Matching Static Framework Contract

Mapped updated static framework: D:\frameworks\StaticFrameworks\Web Automation\selenium\java\hybrid

- Run command: mvn test
- Test pattern: src/test/java/tests/**/*Test.java
- Generated output must follow this mapped framework structure and file zones.
- Use Playwright JavaScript Hybrid as quality reference only; this mapped framework is the source of truth for paths, runner commands, dependencies, and language syntax.
- Do not generate files for another framework path unless the user explicitly changes the selected tool/language/framework combination.

## Consolidated Legacy Generation Notes

These points were retained from older support folders before those folders were removed. Treat them as supporting guidance under the main skill contract above.

From explore\explore_SKILL.md:
- # SKILL: /explore
- # Command  : /explore <feature>
- # Purpose  : Browse the live application using Playwright MCP, capture all UI elements
- #             with Selenium-compatible locators, map user flows, and produce exploration
- #             notes that feed directly into /generate-tests and /build-scripts.
- # Reads    : docs/app-context.md (URL, credentials, module list)
- # Writes   : test-cases/<feature>/exploration-notes.md
- ## YOUR ROLE
- ## STEP 1 Ã¢â‚¬â€ Read App Context
- - Application URL
- - Login credentials
- - Target feature URL path and description
- ## STEP 2 Ã¢â‚¬â€ Open App and Log In
- 1. Launch browser via Playwright MCP Ã¢â€ â€™ navigate to `WebsiteUrl` from `Config.properties`

From generate-tests\generate_tests_SKILL.md:
- # SKILL: /generate-tests
- # Command  : /generate-tests <feature>
- # Purpose  : Generate a complete, non-duplicate set of structured test cases
- #             (positive Ã‚Â· negative Ã‚Â· edge case) for a given feature.
- # Reads    : test-cases/<feature>/exploration-notes.md
- #             docs/app-context.md
- # Writes   : test-cases/<feature>/test-cases.md
- #             test-cases/<feature>/test-cases.csv
- ## YOUR ROLE
- ## STEP 1 Ã¢â‚¬â€ Read Inputs
- 1. Read `test-cases/<feature>/exploration-notes.md` Ã¢â‚¬â€ UI flows, elements, validation texts
- 2. Read `docs/app-context.md` Ã¢â‚¬â€ module list, roles, known behaviors
- ## STEP 2 Ã¢â‚¬â€ Assign Module Prefix
- ## STEP 3 Ã¢â‚¬â€ Generate Test Cases

From review\review_SKILL.md:
- # SKILL: /review
- # Command  : /review <feature>
- # Purpose  : Audit generated Java Page and Test class files against HybridFramework
- #             coding standards. Report violations, flag risks, and produce a corrected
- #             version of any file that fails.
- # Reads    : src/test/java/pages/<Feature>Page.java
- #             src/test/java/testcases/<Feature>TC.java
- #             CLAUDE.md  (standards reference, auto-loaded)
- # Writes   : test-cases/<feature>/review-report.md
- #             Corrected .java files (only if violations found)
- ## YOUR ROLE
- ## STEP 1 Ã¢â‚¬â€ Load Files
- - `src/test/java/pages/<Feature>Page.java`
- - `src/test/java/testcases/<Feature>TC.java`

From standards\standards_SKILL.md:
- # HybridFramework Ã¢â‚¬â€ Java Automation Coding Standards
- must match these patterns exactly. Read `CLAUDE.md` for the full architecture context.
- ## 1. Project Structure
- ### InitializationClass Path Constants
- Use them directly Ã¢â‚¬â€ do not hardcode paths:
- ## 3. Test Class Standard
- ## 4. @FindBy Locator Priority
- - Use attribute predicates: `[@id='x']` not `[3]`
- - Keep short: `//button[@type='submit']` not `//div/form/div[2]/button`
- - Never use: auto-generated class names, positional `[n]` selectors
- ## 5. WebActions Ã¢â‚¬â€ Complete Method Reference
- ## 6. Config & Data Access
- ## 7. Reporting
- ## 8. TestNG Annotations

From templates\test-case-template.md:
- # Test Case Template Ã¢â‚¬â€ HybridFramework
- ## TC Format
- ## TC-[PREFIX]-[NNN]: [Title Ã¢â‚¬â€ action verb + specific expected outcome]
- ### Steps
- ### Expected Final State
- ## Module Prefix Reference
- ## TestNG Method Name Mapping
- ## Suite + Severity Mapping
- ## Coverage Checklist per Feature
- ### Positive (min 3)
- - [ ] Happy path Ã¢â‚¬â€ all required fields filled correctly Ã¢â€ â€™ success outcome
- - [ ] Each CRUD operation that exists (Create Ã‚Â· Read Ã‚Â· Update Ã‚Â· Delete)
- - [ ] Navigation to the feature from the main menu
- - [ ] Role-based access Ã¢â‚¬â€ primary role can perform all actions

From app-context.md:
- # Application Context
- # Ã¢Å“ÂÃ¯Â¸Â  FILL IN THIS FILE before running any skill command.
- # This file is read by: /explore Ã‚Â· /generate-tests Ã‚Â· /build-scripts
- ## Environments
- ## Authentication
- - **Mechanism**: Standard HTML form login
- - **Login flow**:
- 1. Navigate to `{{APP_URL}}`
- 2. Enter username in the **Username** field
- 3. Enter password in the **Password** field
- 4. Click the **Login** button
- 5. Verify landing page loads
- - **Credentials**:
- - Username: `{{APP_USERNAME}}`

From CLAUDE.md:
- # HybridFramework Ã¢â‚¬â€ Claude Code Project Memory
- # This file is auto-loaded at the start of every Claude Code session.
- # Fill in Section 0 before running any skill command.
- ## SECTION 0 Ã¢â‚¬â€ Application Under Test  Ã¢Å“ÂÃ¯Â¸Â FILL IN BEFORE USE
- ## SECTION 1 Ã¢â‚¬â€ Framework Overview
- ### Inheritance Chain
- ### Files Generated per Feature
- ## SECTION 2 Ã¢â‚¬â€ Page Class Rules (pages/<Feature>Page.java)
- - `package pages;`  |  `extends BasePage`  |  `constructor Ã¢â€ â€™ super(driver)`
- - Locators: `private WebElement` + `@FindBy` only
- - Interactions: `webActions.*` only Ã¢â‚¬â€ **no** `driver.findElement()` inside page methods
- - Logging: `logger.info(...)` on every step
- - Allowed raw driver calls: `driver.getTitle()` and `driver.getCurrentUrl()` only
- ## SECTION 3 Ã¢â‚¬â€ Test Class Rules (testcases/<Feature>TC.java)

From onboarding-guide.md:
- # HybridFramework Ã¢â‚¬â€ Onboarding & Extension Guide
- ## Step 0 Ã¢â‚¬â€ Fill In Your App Details (DO THIS FIRST)
- ## Step 1 Ã¢â‚¬â€ Install Playwright MCP (one time, for /explore)
- # Should show: playwright
- ## Step 2 Ã¢â‚¬â€ Copy Scaffold Files into Repo
- ## Step 3 Ã¢â‚¬â€ Run the Automation Workflow
- # 1. Start a Claude Code session
- # 2. Explore the feature (browse live app, capture locators)
- # 3. Generate test cases from exploration notes
- # Ã¢Ëœâ€¦ REVIEW test-cases/login/test-cases.md before proceeding
- # 4. Build Java scripts from approved test cases
- # 5. Review generated files for standards compliance
- ## Recommended Module Order
- ## Adding a New Feature


## Consolidated Root Legacy Notes

These root-level legacy notes were retained before old helper files were removed.

From app-context.md:
- # Application Context
- # Ã¢Å“ÂÃ¯Â¸Â  FILL IN THIS FILE before running any skill command.
- # This file is read by: /explore Ã‚Â· /generate-tests Ã‚Â· /build-scripts
- ## Environments
- ## Authentication
- - **Mechanism**: Standard HTML form login
- - **Login flow**:
- 1. Navigate to `{{APP_URL}}`
- 2. Enter username in the **Username** field
- 3. Enter password in the **Password** field
- 4. Click the **Login** button
- 5. Verify landing page loads
- - **Credentials**:
- - Username: `{{APP_USERNAME}}`

From claude.json:
- Legacy file reviewed; no concise rule lines were found to preserve.

From onboarding-guide.md:
- # HybridFramework Ã¢â‚¬â€ Onboarding & Extension Guide
- ## Step 0 Ã¢â‚¬â€ Fill In Your App Details (DO THIS FIRST)
- ## Step 1 Ã¢â‚¬â€ Install Playwright MCP (one time, for /explore)
- # Should show: playwright
- ## Step 2 Ã¢â‚¬â€ Copy Scaffold Files into Repo
- ## Step 3 Ã¢â‚¬â€ Run the Automation Workflow
- # 1. Start a Claude Code session
- # 2. Explore the feature (browse live app, capture locators)
- # 3. Generate test cases from exploration notes
- # Ã¢Ëœâ€¦ REVIEW test-cases/login/test-cases.md before proceeding
- # 4. Build Java scripts from approved test cases
- # 5. Review generated files for standards compliance
- ## Recommended Module Order
- ## Adding a New Feature



