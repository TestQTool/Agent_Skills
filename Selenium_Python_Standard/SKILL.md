---
name: Selenium_Python_Standard
description: Generate Selenium Python Standard automation from explicitly selected, approved test cases. Use for Qentrix automation-script generation against the matching static framework; never use this skill to create test cases or invent business scenarios.
---

# Selenium Python Standard Script Generation

Generate runnable, framework-compatible automation for the existing `Selenium_Python_Standard` stack. Treat selected approved test cases as the only behavioral source of truth.

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
  "frameworkType": "Standard",
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

This skill folder is Selenium_Python_Standard for Selenium / Python / Standard. Use updateagentskill/playwright/javascript/hybrid as a quality reference only; preserve this skill's own tool, language, framework type, folder name, and output conventions.

- Generate automation only from explicitly selected approved input.
- Do not create or change business test cases.
- Do not invoke TestCaseGeneration-Skills.
- Do not output local paths under D:\skills, D:\frameworks, Agent_Skills, StaticFrameworks, updateagentskill, or Web Automation.
- Keep generated output inside the selected client framework root.
- Do not hardcode runtime URLs, credentials, tokens, or copied secrets in generated source files.
- Ensure every generated test has the page, object, fixture, step, helper, and test-data dependencies it imports or calls.

## Matching Static Framework Contract

Mapped updated static framework: D:\frameworks\StaticFrameworks\Web Automation\selenium\python\pytest

- Run command: pytest
- Test pattern: tests/test_*.py
- Generated output must follow this mapped framework structure and file zones.
- Use Playwright JavaScript Hybrid as quality reference only; this mapped framework is the source of truth for paths, runner commands, dependencies, and language syntax.
- Do not generate files for another framework path unless the user explicitly changes the selected tool/language/framework combination.

## Consolidated Legacy Generation Notes

These points were retained from older support folders before those folders were removed. Treat them as supporting guidance under the main skill contract above.

From build-scripts\SKILL.md:
- # Selenium Python Build Scripts Skill
- # Purpose: Convert approved test cases into runnable Selenium Python Hybrid/POM files.
- ## Role
- ## Inputs You May Receive
- - Selected feature or requirement name
- - Approved manual test cases and steps
- - Application context from `docs/app-context.md` or backend project config
- - Framework memory from `CLAUDE.md`
- - Coding standards from `standards/selenium-python-standards.md`
- - Static framework context from `StaticFrameworks/selenium-python`
- - Existing target repository files, if present
- - Exploration notes/selectors captured by following the selected test-case steps in the live application, if available
- ## Output Contract
- Return strict JSON only:

From docs\app-context.md:
- # Application Context Template
- ## Environments
- ## Authentication
- Required fields:
- - Login URL
- - Username/email selector, if known
- - Password selector, if known
- - Submit button selector, if known
- - Landing page verification selector or URL, if known
- - Supported roles from `test_data/credentials.csv`
- Do not store real passwords in prompt files. Use role names and environment/test-data references.
- ## User Roles
- ## Application Modules
- ## Known Behaviors

From docs\onboarding-guide.md:
- # Selenium Python Agent Skills - Onboarding Guide
- ## Skill Set
- ## Recommended Backend Read Order For Automation Script Generation
- 1. `CLAUDE.md` - project memory, final framework goal, runtime structure, and global rules.
- 2. `docs/onboarding-guide.md` - skill orchestration, repository split, and end-to-end generation flow.
- 3. `docs/app-context.md` or client/project-specific app context - application URL, auth, roles, modules, and known behavior.
- 4. `standards/selenium-python-standards.md` - code structure, selector priority, fixture rules, pytest markers, and runtime rules.
- 5. `build-scripts/SKILL.md` - convert approved test inventory cases plus any supplied exploration findings into Selenium Python files.
- 6. `run-ready-framework/SKILL.md` - verify/correct final framework packaging before push.
- 7. `../GitHub_Workflow/SKILL.md` - branch, pull/sync, commit, PR, merge-readiness, and conflict rules.
- 8. Static framework files from `StaticFrameworks/selenium-python` - runnable base files that must be copied into the target repo.
- 9. Selected test cases from test inventory, supplied exploration findings, and existing target repo files - behavior source, selector context, and merge context.
- Use `explore/SKILL.md` only in a separate exploration workflow that produces notes/selectors before script generation. Do not load it by default for automation script generation.
- Use `heal/SKILL.md` only after execution failures or known UI selector breakage. It is not part of the normal first-time script generation read order.

From explore\SKILL.md:
- # Selenium Python Explore Skill
- ## Role
- 1. Explore module/page/feature
- 2. Generate test cases from exploration findings and requirements
- 3. Generate automation scripts from approved test cases plus exploration findings/selectors
- ## Exploration Modes
- ### Mode A: Module Discovery
- Use this when the user provides a module/page/feature to explore, for example:
- - Pages and navigation paths.
- - Screenshots/snapshots for important states.
- - DOM structure and important containers.
- - Forms, tables, filters, buttons, links, menus, modals, toasts, validations.
- - Stable Selenium selector candidates for important elements.
- - Positive flows, negative flows, and edge-case flows.

From generate-tests\SKILL.md:
- # SKILL: generate-tests
- # Loaded by: TestCaseGenerationAgent (NextGenAI backend)
- # Purpose: Generate exactly 30 structured, non-duplicate test cases for ADO and Jira requirements.
- ## YOUR ROLE
- ## INPUT
- - websiteUrl
- - applicationContext
- - additionalContext
- - applicationConfiguration with configured URL, username, and password
- ## STRICT RULES
- 1. Generate EXACTLY 30 test cases.
- 2. Every test case must be unique.
- 3. Every testcase title MUST start with:
- 4. Every testcase must contain:

From run-ready-framework\SKILL.md:
- # Run-Ready Framework Skill
- # Purpose: Ensure generated automation output is a complete Selenium Python framework that users can clone and run locally.
- ## Role
- ## Inputs You May Receive
- - Static framework file list from `StaticFrameworks/selenium-python`
- - Generated files from `build-scripts`
- - Existing target repository files
- - Selected features/modules
- - Target branch and repository path
- ## Required Runtime Files
- ## Merge Rules
- 1. Copy missing static framework files from StaticFrameworks.
- 2. Preserve user files already present in the target repository unless they are known generated framework files.
- 3. Overlay generated feature files from `build-scripts`.

From standards\selenium-python-standards.md:
- # Selenium Python Coding Standards - Hybrid/POM Framework Structure
- ## File Outputs Per Feature
- ## page_objects Rules
- - File path: `selenium-python/page_objects/<feature>_page_objects.py`.
- - Import only `By` from `selenium.webdriver.common.by`.
- - Define one PageObjects class named `<Feature>PageObjects`.
- - Locators are uppercase class constants as Selenium tuples, for example `LOGIN_BUTTON = (By.ID, "login-button")`.
- - No WebDriver calls, functions, waits, assertions, conditional logic, or runtime code.
- - Group locators by section.
- - Use clear names ending in element type where useful: `LOGIN_BUTTON`, `EMAIL_INPUT`, `STATUS_DROPDOWN`, `RESULTS_TABLE`.
- 1. Stable `By.ID` when the id is not generated.
- 2. Accessibility and label-based selectors, including `aria-label`, label text, role, and accessible name relationships.
- 3. Dynamic XPath when stable, readable, and tied to durable text, attributes, parent/child relationships, or sibling relationships.
- 4. Stable attributes such as `data-testid`, `name`, `type`, `placeholder`, or `title`.

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
- ### Test Data
- ### Expected Final Result
- ### Negative / Error Scenarios
- ### Notes
- - [Known application behavior]

From calude.json:
- Legacy file reviewed; no concise rule lines were found to preserve.

From CLAUDE.md:
- # QA Automation - Selenium Python Project Memory
- # Loaded for script generation. Keep this domain-neutral; app-specific details come from docs/app-context.md or backend project config.
- ## Goal
- Generate a self-contained Selenium Python Hybrid/POM automation framework that a user can clone and run on their own machine.
- ## Runtime Layout
- ## Framework Architecture
- - `page_objects/<feature>_page_objects.py` contains Selenium locator tuples only.
- - `pages/<feature>_page.py` contains page actions and assertions.
- - `tests/test_<feature>.py` contains test orchestration using pytest steps/logging or Allure steps when configured.
- - `conftest.py` wires WebDriver, browser options, config, and page fixtures.
- ## Generated Files Per Feature
- ## Coding Standards
- ### page_objects/<feature>_page_objects.py
- - Class constants only.



