---
name: Selenium_Java_TestNG_Cucumber
description: Generate Selenium Java TestNG Cucumber automation from explicitly selected, approved test cases. Use for Qentrix automation-script generation against the matching static framework; never use this skill to create test cases or invent business scenarios.
---

# Selenium Java TestNG Cucumber Script Generation

Generate runnable, framework-compatible automation for the existing `Selenium_Java_TestNG_Cucumber` stack. Treat selected approved test cases as the only behavioral source of truth.

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
  "frameworkType": "TestNG Cucumber",
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

This skill folder is Selenium_Java_TestNG_Cucumber for Selenium / Java / TestNG. Use updateagentskill/playwright/javascript/hybrid as a quality reference only; preserve this skill's own tool, language, framework type, folder name, and output conventions.

- Generate automation only from explicitly selected approved input.
- Do not create or change business test cases.
- Do not invoke TestCaseGeneration-Skills.
- Do not output local paths under D:\skills, D:\frameworks, Agent_Skills, StaticFrameworks, updateagentskill, or Web Automation.
- Keep generated output inside the selected client framework root.
- Do not hardcode runtime URLs, credentials, tokens, or copied secrets in generated source files.
- Ensure every generated test has the page, object, fixture, step, helper, and test-data dependencies it imports or calls.

## Matching Static Framework Contract

Mapped updated static framework: D:\frameworks\StaticFrameworks\Web Automation\selenium\java\bdd

- Run command: mvn test
- Test pattern: src/test/java/features/**/*.feature
- Generated output must follow this mapped framework structure and file zones.
- Use Playwright JavaScript Hybrid as quality reference only; this mapped framework is the source of truth for paths, runner commands, dependencies, and language syntax.
- Do not generate files for another framework path unless the user explicitly changes the selected tool/language/framework combination.

## Consolidated Legacy Generation Notes

These points were retained from older support folders before those folders were removed. Treat them as supporting guidance under the main skill contract above.

From build-scripts\SKILL.md:
- # Build Scripts Skill - Selenium Java TestNG + Cucumber BDD
- ## Role
- ## Output Contract
- Return strict JSON only:
- ## Rules
- - JSON only.
- - Preserve existing files when supplied.
- - Add TestNG groups and DataProviders without removing existing coverage.
- - Do not hardcode credentials, tokens, local paths, device IDs, or app paths.
- - Do not put selectors/endpoints inside TestNG test classes.
- - Every test method must include TC-ID and a TestNG group.

From docs\app-context.md:
- # Application Context Template
- ## Domain
- ## Environments
- ## Authentication
- ## Modules
- ## Known Behaviors

From docs\onboarding-guide.md:
- # Selenium Java TestNG + Cucumber BDD Onboarding Guide
- ## Skill Set
- ## Expected Command
- ## Safety
- - Do not hardcode credentials, tokens, device IDs, app paths, or local absolute paths.
- - Preserve existing `pom.xml`, `testng.xml`, listeners, and framework base classes.
- - Add TestNG groups and DataProviders without removing existing tests.

From explore\SKILL.md:
- # Explore Skill
- ## Capture
- - Feature/module scope.
- - Selectors, endpoints, or mobile locators.
- - Positive/negative/edge flows.
- - Assertion targets and expected states.
- - Test data dependencies.
- - Platform-specific details when mobile.
- - Gaps and blockers.
- ## Output
- Prefer strict JSON with summary, elements/endpoints, flows, assertions, dataDependencies, and gaps.

From generate-tests\SKILL.md:
- # SKILL: generate-tests
- Generate EXACTLY 30 structured, non-duplicate test cases. Output plain text only.
- ## Rules
- 1. Every title starts with `Verify that ...`.
- 2. Include TYPE, PRIORITY, TAGS, TESTCASE, and 4 to 5 STEPS.
- 3. Allowed TYPE values: FUNCTIONAL_POSITIVE, FUNCTIONAL_NEGATIVE, FUNCTIONAL_EDGE, API, SECURITY, PERFORMANCE, MOBILE_PERMISSION, MOBILE_INTERRUPTION.
- 4. Allowed PRIORITY values: High, Medium, Low.
- 5. Allowed TAGS values: Smoke, Regression, API, Security, Performance, Android, iOS.
- 6. STEP FORMAT: `STEP: action -> expected result`.
- 7. Do not include selectors, source code, backend internals, device IDs, tokens, or local paths.
- ## Output Example

From run-ready-framework\SKILL.md:
- # Run-Ready TestNG Framework Skill
- ## Required Files
- ## Checks
- - `pom.xml` includes TestNG and stack dependencies.
- - `testng.xml` or runner config includes generated tests/groups.
- - Smoke/regression groups can be selected from CLI.
- - Reports/listeners are configured.
- - No secrets, local paths, tokens, device IDs, or app paths are committed.
- ## Output Contract

From standards\selenium-java-testng-cucumber-standards.md:
- # Selenium Java TestNG + Cucumber BDD Standards
- ## File Outputs
- ## Selector / Endpoint Rules
- - Object/endpoint files contain selectors or endpoint constants only.
- - No driver calls, assertions, waits, or business logic in object/endpoint files.
- - Mark inferred selectors/endpoints with TODO when not verified.
- ## Page / Screen / Client Rules
- - Action/client classes own interactions, request construction, waits, and assertions.
- - Tests call meaningful methods only.
- - Credentials and environment data come from config or role helpers.
- ## TestNG Rules
- - Every test has a TC-ID in method name, description, or annotation.
- - Every test is grouped as smoke, regression, api, mobile, or platform-specific where appropriate.
- - Use DataProvider for data variants.

From templates\test-case-template.md:
- # TestNG Test Case Template
- ## Test Case Format
- ## TC-[MODULE]-[NUMBER]: [Test Title]
- ### Preconditions
- - Test environment is available.
- - Required data exists or can be created safely.
- ### Steps

From CLAUDE.md:
- # QA Automation - Selenium Java TestNG + Cucumber BDD Project Memory
- ## Goal
- Generate a self-contained `selenium-java-testng-cucumber` framework using Java and TestNG for web UI automation.
- ## Runtime Layout
- ## TestNG Rules
- - Use `@Test(groups = {"smoke"})` and `@Test(groups = {"regression"})` for suite selection.
- - Use `@BeforeMethod` / `@AfterMethod` for test lifecycle unless the static framework has a base class.
- - Use `@DataProvider` for data-driven tests.
- - Use listeners for screenshots/logging/reporting, not test-body try/catch clutter.
- - Keep dependencies and plugin configuration in `pom.xml`.
- - Keep suite composition in `testng.xml`.
- ## Runtime Command


