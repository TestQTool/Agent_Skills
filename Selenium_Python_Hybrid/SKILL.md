---
name: Selenium_Python_Hybrid
description: Generate Selenium Python Hybridframework automation from explicitly selected, approved test cases. Use for Qentrix automation-script generation against the matching static framework; never use this skill to create test cases or invent business scenarios.
---

# Selenium Python Hybridframework Script Generation

Generate runnable, framework-compatible automation for the existing `Selenium_Python_Hybrid` stack. Treat selected approved test cases as the only behavioral source of truth.

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

This skill folder is Selenium_Python_Hybrid for Selenium / Python / Hybrid. Use updateagentskill/playwright/javascript/hybrid as a quality reference only; preserve this skill's own tool, language, framework type, folder name, and output conventions.

- Generate automation only from explicitly selected approved input.
- Do not create or change business test cases.
- Do not invoke TestCaseGeneration-Skills.
- Do not output local paths under D:\skills, D:\frameworks, Agent_Skills, StaticFrameworks, updateagentskill, or Web Automation.
- Keep generated output inside the selected client framework root.
- Do not hardcode runtime URLs, credentials, tokens, or copied secrets in generated source files.
- Ensure every generated test has the page, object, fixture, step, helper, and test-data dependencies it imports or calls.

## Matching Static Framework Contract

Mapped updated static framework: D:\frameworks\StaticFrameworks\Web Automation\selenium\python\hybrid

- Run command: pytest
- Test pattern: tests/test_*.py
- Generated output must follow this mapped framework structure and file zones.
- Use Playwright JavaScript Hybrid as quality reference only; this mapped framework is the source of truth for paths, runner commands, dependencies, and language syntax.
- Do not generate files for another framework path unless the user explicitly changes the selected tool/language/framework combination.

## Consolidated Legacy Generation Notes

These points were retained from older support folders before those folders were removed. Treat them as supporting guidance under the main skill contract above.

From build-scripts\SKILL.md:
- # Selenium Python Build Scripts Skill
- # Purpose: Convert approved test cases into runnable Selenium Python Hybrid Framework files.
- ## Role
- Generate production-ready automation for a user-owned repository. The output must plug into the static `selenium-python-hybrid` framework and run on the user's machine.
- ## Inputs You May Receive
- - Selected feature or requirement name
- - Approved manual test cases and steps
- - Application context
- - Framework memory from `CLAUDE.md`
- - Coding standards from `standards/selenium-python-hybrid-standards.md`
- - Static framework context from `StaticFrameworks/selenium-python-hybrid`
- - Existing target repository files
- - Exploration notes/selectors, if available
- ## Output Contract

From docs\app-context.md:
- # Application Context Template
- ## Environments
- ## Authentication
- ## User Roles
- ## Application Modules
- ## Known Behaviors
- ## Expected Local Run

From docs\onboarding-guide.md:
- # Selenium Python Hybrid Framework Agent Skills - Onboarding Guide
- ## Skill Set
- ## Recommended Read Order
- 1. `CLAUDE.md`
- 2. `docs/onboarding-guide.md`
- 3. `docs/app-context.md`
- 4. `standards/selenium-python-hybrid-standards.md`
- 5. `build-scripts/SKILL.md`
- 6. `run-ready-framework/SKILL.md`
- 7. GitHub workflow skill, when repository operations are required
- 8. Static framework files from `StaticFrameworks/selenium-python-hybrid`
- 9. Approved test cases, exploration findings, and existing target repo files
- ## Expected User Outcome
- ## Repository Split

From explore\SKILL.md:
- # Selenium Python Explore Skill
- ## Role
- ## Modes
- ### Module Discovery
- Use when a user asks to explore a module broadly. Capture navigation, pages/states, forms, tables, filters, buttons, dialogs, messages, selector candidates, positive/negative/ed...
- ### Test-Case-Guided Exploration
- Use when approved test cases already exist and selector accuracy is needed. Follow selected test-case steps exactly and capture selectors for each action plus assertion targets ...
- ## Selector Priority
- 1. Stable ids.
- 2. Accessibility labels, roles, names, and visible labels.
- 3. Stable semantic attributes such as data-testid, name, type, placeholder, title.
- 4. Readable dynamic XPath based on labels, text, stable attributes, parent/child, or sibling relationships.
- 5. Stable CSS classes.
- 6. Exact text or positional selectors only as last resort.

From generate-tests\SKILL.md:
- # SKILL: generate-tests
- # Purpose: Generate exactly 30 structured, non-duplicate manual test cases for ADO and Jira requirements.
- ## YOUR ROLE
- ## STRICT RULES
- 1. Generate EXACTLY 30 test cases.
- 2. Every title starts with `Verify that ...`.
- 3. Every test case contains TYPE, PRIORITY, TAGS, TESTCASE, and 4 to 5 STEPS.
- 4. Allowed TYPE values: FUNCTIONAL_POSITIVE, FUNCTIONAL_NEGATIVE, FUNCTIONAL_EDGE, FUNCTIONAL_API, NON_FUNCTIONAL_PERFORMANCE, NON_FUNCTIONAL_SECURITY.
- 5. Allowed PRIORITY values: High, Medium, Low.
- 6. Allowed TAGS values: Smoke, Regression, API, Security, Performance.
- 7. STEP FORMAT: `STEP: action -> expected result`.
- 8. Do not use Markdown in generated test-case output.
- 9. Output plain text only.
- 10. Do not include selectors, DOM structure, automation APIs, backend classes, database details, or tool internals.

From run-ready-framework\SKILL.md:
- # Run-Ready Framework Skill
- # Purpose: Ensure generated automation output is a complete selenium-python-hybrid framework that users can clone and run locally.
- ## Role
- ## Required Runtime Files
- ## Merge Rules
- 1. Copy missing static framework files from `StaticFrameworks/selenium-python-hybrid`.
- 2. Preserve user files unless they are known generated framework files.
- 3. Overlay generated feature files from `build-scripts`.
- 4. Merge dependency/config/wiring files instead of replacing unrelated content.
- 5. Never push prompt files, Agent_Skills internals, tokens, local absolute paths, or backend-only configuration.
- ## Local Run Acceptance Criteria
- ## Output Contract
- Return strict JSON only:

From standards\selenium-python-hybrid-standards.md:
- # Selenium Python Hybrid Framework Coding Standards
- ## File Outputs Per Feature
- ## Locator / Selector Rules
- - Locator files contain selectors only.
- - Do not place WebDriver/browser calls, assertions, waits, or business logic in locator files.
- - Group selectors by page area: headings, inputs, buttons, messages, tables, modals, navigation.
- - Prefer stable ids, accessibility labels, names, test ids, semantic attributes, readable dynamic XPath, then stable CSS.
- - Avoid absolute XPath, generated class names, blind positional selectors, and brittle text-only selectors unless no alternative exists.
- - Mark inferred selectors with `TODO: verify selector against live app`.
- ## Page / Keyword Rules
- - Page or keyword files contain interactions, waits, and assertions.
- - Use framework helper methods instead of low-level driver calls when helpers exist.
- - One method should represent one user action or one assertion.
- - Credentials must come from role-based helpers or environment-backed test data.

From templates\test-case-template.md:
- # Test Case Template - Generic Web Application
- ## Test Case Format
- ## TC-[MODULE_PREFIX]-[NUMBER]: [Test Title]
- ### Description
- ### Preconditions
- - [ ] User has access to the target environment
- - [ ] Required test data exists or can be created during the test
- - [ ] Required role/permission is available
- ### Test Steps
- ### Expected Final Result
- ## Coverage Checklist

From CLAUDE.md:
- # QA Automation - Selenium Python Hybrid Framework Project Memory
- ## Goal
- Generate a self-contained `selenium-python-hybrid` web automation framework that a user can clone, install, configure, and run locally or in CI.
- ## Runtime Layout
- ## Framework Architecture
- ## Generated Files Per Feature
- - `page_objects/<feature>_page_objects.py`: locators/selectors only.
- - `pages/<feature>_page.py`: page actions, waits, data helpers, and assertions.
- - `tests/test_<feature>.py`: test orchestration only.
- - Framework wiring files are updated only when needed and must preserve existing content.
- ## Coding Standards
- - Keep locators/selectors out of tests.
- - Keep assertions out of BDD step definitions when this stack uses BDD.
- - Use role-based credentials and environment-driven configuration.



