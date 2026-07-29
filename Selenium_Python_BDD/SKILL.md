---
name: Selenium_Python_BDD
description: Generate Selenium Python BDD automation from explicitly selected, approved test cases. Use for Qentrix automation-script generation against the matching static framework; never use this skill to create test cases or invent business scenarios.
---

# Selenium Python BDD Script Generation

Generate runnable, framework-compatible automation for the existing `Selenium_Python_BDD` stack. Treat selected approved test cases as the only behavioral source of truth.

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

- `tests/**/*`
- `features/**/*`
- `steps/**/*`
- `pages/**/*`
- `page_objects/**/*`
- `test-data/**/*`
- `requirements.txt`

Return strict JSON only:

```json
{
  "status": "ready | needs_exploration | blocked",
  "tool": "Selenium",
  "language": "Python",
  "frameworkType": "BDD",
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

This skill folder is Selenium_Python_BDD for Selenium / Python / BDD Cucumber. Use updateagentskill/playwright/javascript/hybrid as a quality reference only; preserve this skill's own tool, language, framework type, folder name, and output conventions.

- Generate automation only from explicitly selected approved input.
- Do not create or change business test cases.
- Do not invoke TestCaseGeneration-Skills.
- Do not output local paths under D:\skills, D:\frameworks, Agent_Skills, StaticFrameworks, updateagentskill, or Web Automation.
- Keep generated output inside the selected client framework root.
- Do not hardcode runtime URLs, credentials, tokens, or copied secrets in generated source files.
- Ensure every generated test has the page, object, fixture, step, helper, and test-data dependencies it imports or calls.

## Matching Static Framework Contract

Mapped updated static framework: D:\frameworks\StaticFrameworks\Web Automation\selenium\python\bdd

- Run command: pytest
- Test pattern: tests/test_*.py
- Generated output must follow this mapped framework structure and file zones.
- Use Playwright JavaScript Hybrid as quality reference only; this mapped framework is the source of truth for paths, runner commands, dependencies, and language syntax.
- Do not generate files for another framework path unless the user explicitly changes the selected tool/language/framework combination.

## Consolidated Legacy Generation Notes

These points were retained from older support folders before those folders were removed. Treat them as supporting guidance under the main skill contract above.

From build-scripts\SKILL.md:
- # Skill: Build Scripts - Run Tests and Interpret Results
- ## When to use this skill
- Use when the user asks to install dependencies, run tests, check results, troubleshoot runs, or configure CI for Selenium Python BDD.
- ## Run Commands
- ## CI Overrides
- Use `behave -D key=value` or environment variables for CI-specific values:
- - script: |
- ## Interpreting Results
- ### Exit codes
- - `0` = all selected scenarios passed
- - Non-zero = one or more scenarios failed, were undefined, or the test runner crashed
- ### Reports location after run
- ### Common failures and fixes
- ## Parallel Execution

From explore\SKILL.md:
- # Skill: Explore - Discover Locators and Map App Structure
- ## When to use this skill
- Use before generating scripts for a new feature/module, or when the user asks to explore a page, find locators, map a form, inspect a table, or verify selectors.
- ## Goal
- ## Step-by-Step Process
- ### Step 1 - Read app context
- ### Step 2 - Navigate and inspect
- 1. `(By.ID, "...")` - most stable when IDs are not dynamic
- 2. `(By.CSS_SELECTOR, "[data-testid='...']")`
- 3. `(By.NAME, "...")` - form inputs
- 4. `(By.CSS_SELECTOR, "[aria-label='...']")`
- 5. `(By.CSS_SELECTOR, ".stable-class")` - only when class is stable and meaningful
- 6. `(By.XPATH, "//tag[@attr='value']")` - last resort
- 7. Never use absolute XPath such as `/html/body/div[3]/div[2]`

From generate-tests\SKILL.md:
- # Skill: Generate Tests - Convert Work Items to BDD Scripts
- ## When to use this skill
- Use when the user provides ADO/Jira work items, user stories, acceptance criteria, manual test cases, or scenario lists and asks to generate Selenium Python BDD automation.
- ## Input the Agent Expects
- - ADO/Jira test cases with title, steps, and expected results
- - User story with acceptance criteria
- - Manual test case document
- - Feature name plus scenarios to automate
- ## Generation Process
- ### Step 1 - Read standards
- ### Step 2 - Read app context
- ### Step 3 - Read static framework templates
- - `page_objects/_template_page_objects.py`
- - `pages/_template_page.py`

From review\SKILL.md:
- # Skill: Review - PR Review for BDD Layer Compliance
- ## When to use this skill
- Use when reviewing a PR that adds or modifies Selenium Python BDD automation scripts.
- ## Review Checklist
- ### Layer 1 - `page_objects/<feature>_page_objects.py`
- - [ ] Contains locator tuple constants only; no WebDriver calls, methods, assertions, or logic.
- - [ ] Imports only `By` unless local template requires otherwise.
- - [ ] Constants are `UPPER_SNAKE_CASE`.
- - [ ] Sections present: Page Heading, Form Inputs, Buttons, Messages, Table, Modal, UNVERIFIED.
- - [ ] No absolute XPath.
- - [ ] No generated class names without an `UNSTABLE` comment.
- ### Layer 2 - `pages/<feature>_page.py`
- - [ ] Extends `BasePage` or the framework page base class.
- - [ ] Does not instantiate WebDriver.

From standards\bdd-standards.md:
- # BDD Standards - Selenium Python BDD
- ## Layer Rules
- ### Layer 1 - `page_objects/<feature>_page_objects.py`
- - Contains only Selenium locator tuple constants.
- - Uses `from selenium.webdriver.common.by import By`.
- - No methods, constructors, driver usage, assertions, waits, or logic.
- - Group constants by section:
- # Page Heading
- # Form Inputs
- # Buttons
- # Dropdowns
- # Messages
- # Table
- # Modal

From templates\test-case-template.md:
- # Test Case to Gherkin Mapping Template
- Use this template when converting ADO/Jira test cases into BDD scenarios.
- ## ADO/Jira to Gherkin Mapping
- ## Single Happy Path Scenario
- ## Negative / Validation Scenario
- ## Data-Driven Scenario Outline
- ## Feature with Background
- ## Step Naming Conventions

From app-context.md:
- # App Context - Client Application
- ## Application Details
- ## Roles and Credentials
- ## Key Modules / Feature Areas
- ## Known Quirks
- - Document dynamic class names, random IDs, timing issues, and animation delays here.
- - Note pages that need network-idle waits, explicit spinner waits, or JavaScript click fallbacks.
- - Note modules with iframe wrappers or Shadow DOM.

From CLAUDE.md:
- # Selenium Python BDD - Agent Entry Point
- ## What You Do
- 1. `page_objects/<feature>_page_objects.py` - Selenium locator tuples only
- 2. `pages/<feature>_page.py` - Actions and assertions; extends `BasePage`
- 3. `features/steps/<feature>_steps.py` - Given/When/Then step functions; thin wrappers around page methods
- 4. `features/<feature>.feature` - Gherkin scenarios in business language
- ## Skill Router
- Always read the relevant skill before writing any code.
- ## Non-Negotiable Rules
- 1. Locators live only in `page_objects/`; never inline in steps or page classes.
- 2. Assertions live only in `pages/`; never in step definitions.
- 3. Step definitions are thin; one page method call per step whenever possible.
- 4. Gherkin uses business language; no selectors, DOM terms, or click-by-id wording.
- 5. Every scenario has `@smoke` or `@regression`, plus `@TC-XXX-NNN` and a feature tag.

From onboarding-guide.md:
- # Onboarding Guide - Selenium Python BDD
- ## Prerequisites
- ## Step 1 - Clone the Static Framework into Client Repo
- ## Step 2 - Create Virtual Environment
- ## Step 3 - Install Dependencies
- ## Step 4 - Configure
- ## Step 5 - Run
- ## Step 6 - View Reports
- ## Folder Map - What the Agent Generates vs What Exists


## Consolidated Root Legacy Notes

These root-level legacy notes were retained before old helper files were removed.

From app-context.md:
- # App Context - Client Application
- ## Application Details
- ## Roles and Credentials
- ## Key Modules / Feature Areas
- ## Known Quirks
- - Document dynamic class names, random IDs, timing issues, and animation delays here.
- - Note pages that need network-idle waits, explicit spinner waits, or JavaScript click fallbacks.
- - Note modules with iframe wrappers or Shadow DOM.

From claude.json:
- Legacy file reviewed; no concise rule lines were found to preserve.

From onboarding-guide.md:
- # Onboarding Guide - Selenium Python BDD
- ## Prerequisites
- ## Step 1 - Clone the Static Framework into Client Repo
- ## Step 2 - Create Virtual Environment
- ## Step 3 - Install Dependencies
- ## Step 4 - Configure
- ## Step 5 - Run
- ## Step 6 - View Reports
- ## Folder Map - What the Agent Generates vs What Exists


