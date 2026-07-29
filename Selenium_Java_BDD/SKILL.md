---
name: Selenium_Java_BDD
description: Generate Selenium Java BDD automation from explicitly selected, approved test cases. Use for Qentrix automation-script generation against the matching static framework; never use this skill to create test cases or invent business scenarios.
---

# Selenium Java BDD Script Generation

Generate runnable, framework-compatible automation for the existing `Selenium_Java_BDD` stack. Treat selected approved test cases as the only behavioral source of truth.

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

This skill folder is Selenium_Java_BDD for Selenium / Java / BDD Cucumber. Use updateagentskill/playwright/javascript/hybrid as a quality reference only; preserve this skill's own tool, language, framework type, folder name, and output conventions.

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
- # Skill: Build Scripts Ã¢â‚¬â€ Run Tests and Interpret Results
- ## When to use this skill
- ## Run Commands
- # Install (first time or after pom.xml changes)
- # Run all tests
- # Run smoke suite
- # Run regression suite
- # Run by tag
- # Run on specific browser
- # Run with specific environment
- # Generate Allure report
- ## CI Overrides (ADO Pipeline / GitHub Actions)
- # azure-pipelines.yml example task
- - task: Maven@3

From explore\SKILL.md:
- # Skill: Explore Ã¢â‚¬â€ Discover Locators and Map App Structure
- ## When to use this skill
- ## Goal
- ## Step-by-Step Process
- ### Step 1 Ã¢â‚¬â€ Read app context
- ### Step 2 Ã¢â‚¬â€ Navigate and inspect
- 1. `By.id("...")` Ã¢â‚¬â€ most stable, prefer always
- 2. `By.cssSelector("[data-testid='...']")` Ã¢â‚¬â€ second best
- 3. `By.cssSelector("[name='...']")` Ã¢â‚¬â€ for form inputs
- 4. `By.cssSelector("[aria-label='...']")` Ã¢â‚¬â€ for accessibility-labeled elements
- 5. `By.cssSelector(".class-name")` Ã¢â‚¬â€ only if class is stable (not generated)
- 6. `By.xpath("//tag[@attr='val']")` Ã¢â‚¬â€ last resort
- 7. NEVER: `By.xpath("/html/body/div[3]/div[2]/...")` Ã¢â‚¬â€ absolute XPath is forbidden
- ### Step 3 Ã¢â‚¬â€ Group locators by UI section

From generate-tests\SKILL.md:
- # Skill: Generate Tests Ã¢â‚¬â€ Convert Work Items to BDD Scripts
- ## When to use this skill
- ## Input the Agent Expects
- - ADO Test Case(s) with title, steps, expected results
- - User Story with acceptance criteria
- - Manual test case document
- - Feature name + list of scenarios to automate
- ## Generation Process (follow in order)
- ### Step 1 Ã¢â‚¬â€ Read standards
- ### Step 2 Ã¢â‚¬â€ Read app context
- ### Step 3 Ã¢â‚¬â€ Read template files from static framework
- - `pageObjects/_TemplatePageObjects.java`
- - `pages/_TemplatePage.java`
- - `src/test/java/stepDefinitions/_TemplateSteps.java`

From review\SKILL.md:
- # Skill: Review Ã¢â‚¬â€ PR Review for BDD Layer Compliance
- ## When to use this skill
- ## Review Checklist
- ### Layer 1 Ã¢â‚¬â€ pageObjects/\<Feature\>PageObjects.java
- - [ ] Only `public static final By` fields Ã¢â‚¬â€ no methods, no logic
- - [ ] Only import is `import org.openqa.selenium.By;`
- - [ ] All constants are `UPPER_SNAKE_CASE`
- - [ ] Sections present: Page Heading, Form Inputs, Buttons, Messages, Table, Modal
- - [ ] UNVERIFIED section at bottom for unconfirmed locators
- - [ ] No absolute XPath (`/html/body/div[3]/...`)
- - [ ] No generated class names (`.css-xk3d2f`) without `// Ã¢Å¡Â  UNSTABLE` comment
- ### Layer 2 Ã¢â‚¬â€ pages/\<Feature\>Page.java
- - [ ] Extends `BasePage`
- - [ ] Constructor takes `WebDriver driver` only

From standards\bdd-standards.md:
- # BDD Standards Ã¢â‚¬â€ Selenium Java BDD
- must be followed during generation (generate-tests/SKILL.md).
- ## Layer Rules (strict Ã¢â‚¬â€ violations block PR merge)
- ### Layer 1 Ã¢â‚¬â€ pageObjects/\<Feature\>PageObjects.java
- - ONLY `public static final By` fields
- - ONLY import: `import org.openqa.selenium.By;`
- - Zero methods. Zero constructors. Zero logic.
- - Grouped by section comments:
- - UNVERIFIED section at the bottom for AI-generated stubs not yet verified on live app
- ### Layer 2 Ã¢â‚¬â€ pages/\<Feature\>Page.java
- - Extends `BasePage`
- - Imports locators from `<Feature>PageObjects` ONLY
- - Constructor: `public <Feature>Page(WebDriver driver) { super(driver); }`
- - Methods grouped:

From templates\test-case-template.md:
- # Test Case Ã¢â€ â€™ Gherkin Mapping Template
- Use this template when converting ADO/Jira test cases into BDD scenarios.
- ## ADO Test Case Structure Ã¢â€ â€™ Gherkin Mapping
- ## Template: Single Happy Path Scenario
- ## Template: Negative / Validation Scenario
- ## Template: Data-Driven Scenario Outline
- ## Template: Feature with Background
- ## Step Naming Conventions

From app-context.md:
- # App Context Ã¢â‚¬â€ Client Application
- ## Application Details
- ## Roles and Credentials
- Use `getLoginDataByRole("Admin")` Ã¢â‚¬â€ never hardcode.
- ## Key Modules / Feature Areas
- ## Known Quirks
- - Document any dynamic class names, random IDs, or timing issues here
- - Note any pages that need `waitForNetworkIdle()` instead of `waitForPageLoad()`
- - Note any modules with iFrame wrappers

From CLAUDE.md:
- # Selenium Java BDD Ã¢â‚¬â€ Agent Entry Point
- ## What You Do
- 1. `pageObjects/<Feature>PageObjects.java`  Ã¢â‚¬â€ Selenium By locators only
- 2. `pages/<Feature>Page.java`              Ã¢â‚¬â€ Actions + Assertions (extends BasePage)
- 3. `stepDefinitions/<Feature>Steps.java`   Ã¢â‚¬â€ Given/When/Then (thin, calls page methods)
- 4. `features/<Feature>.feature`            Ã¢â‚¬â€ Gherkin scenarios (business language)
- ## Skill Router
- Always read the relevant skill BEFORE writing any code.
- ## Non-Negotiable Rules (memorize these)
- 1. Locators live ONLY in `pageObjects/` Ã¢â‚¬â€ never inline in steps or page classes
- 2. Assertions live ONLY in `pages/` Ã¢â‚¬â€ never in step definitions
- 3. Step definitions are THIN Ã¢â‚¬â€ one page method call per step
- 4. Gherkin uses BUSINESS LANGUAGE Ã¢â‚¬â€ no technical details like "click button#submit"
- 5. Every scenario tagged with `@smoke` OR `@regression` AND `@TC-XXX-NNN`

From onboarding-guide.md:
- # Onboarding Guide Ã¢â‚¬â€ Selenium Java BDD
- ## Prerequisites
- ## Step 1 Ã¢â‚¬â€ Clone the Static Framework into Client Repo
- # Clone StaticFrameworks
- # Copy the BDD framework to your client project
- ## Step 2 Ã¢â‚¬â€ Configure
- # Copy env template
- # Edit config
- ## Step 3 Ã¢â‚¬â€ Install
- ## Step 4 Ã¢â‚¬â€ Run
- # All tests
- # Smoke only
- # Regression only
- # Specific feature tag


## Consolidated Root Legacy Notes

These root-level legacy notes were retained before old helper files were removed.

From app-context.md:
- # App Context Ã¢â‚¬â€ Client Application
- ## Application Details
- ## Roles and Credentials
- Use `getLoginDataByRole("Admin")` Ã¢â‚¬â€ never hardcode.
- ## Key Modules / Feature Areas
- ## Known Quirks
- - Document any dynamic class names, random IDs, or timing issues here
- - Note any pages that need `waitForNetworkIdle()` instead of `waitForPageLoad()`
- - Note any modules with iFrame wrappers

From claude.json:
- Legacy file reviewed; no concise rule lines were found to preserve.

From onboarding-guide.md:
- # Onboarding Guide Ã¢â‚¬â€ Selenium Java BDD
- ## Prerequisites
- ## Step 1 Ã¢â‚¬â€ Clone the Static Framework into Client Repo
- # Clone StaticFrameworks
- # Copy the BDD framework to your client project
- ## Step 2 Ã¢â‚¬â€ Configure
- # Copy env template
- # Edit config
- ## Step 3 Ã¢â‚¬â€ Install
- ## Step 4 Ã¢â‚¬â€ Run
- # All tests
- # Smoke only
- # Regression only
- # Specific feature tag


