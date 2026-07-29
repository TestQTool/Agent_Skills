---
name: Karate_Java_Standard
description: Generate Karate Java Standard automation from explicitly selected, approved test cases. Use for Qentrix automation-script generation against the matching static framework; never use this skill to create test cases or invent business scenarios.
---

# Karate Java Standard Script Generation

Generate runnable, framework-compatible automation for the existing `Karate_Java_Standard` stack. Treat selected approved test cases as the only behavioral source of truth.

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
  "tool": "Karate",
  "language": "Java",
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
7. Map every approved expected result to a retrying assertion/check supported by `Karate`.
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

This skill folder is Karate_Java_Standard for Karate / Java / Standard. Use updateagentskill/playwright/javascript/hybrid as a quality reference only; preserve this skill's own tool, language, framework type, folder name, and output conventions.

- Generate automation only from explicitly selected approved input.
- Do not create or change business test cases.
- Do not invoke TestCaseGeneration-Skills.
- Do not output local paths under D:\skills, D:\frameworks, Agent_Skills, StaticFrameworks, updateagentskill, or Web Automation.
- Keep generated output inside the selected client framework root.
- Do not hardcode runtime URLs, credentials, tokens, or copied secrets in generated source files.
- Ensure every generated test has the page, object, fixture, step, helper, and test-data dependencies it imports or calls.

## Consolidated Legacy Generation Notes

These points were retained from older support folders before those folders were removed. Treat them as supporting guidance under the main skill contract above.

From build-scripts\SKILL.md:
- # Build Scripts Skill - Karate Java API Automation
- ## Role
- ## Output Contract
- Return strict JSON only:
- ## Rules
- - JSON only.
- - Preserve existing files when supplied.
- - Do not hardcode secrets or base URLs.
- - Add schema fixtures and payload files when needed.
- - Include positive, negative, contract, auth, and permission assertions.
- - Every generated test must have a TC-ID and suite tag/marker.

From docs\app-context.md:
- # API Application Context Template
- ## Environments
- ## Authentication
- ## API Modules
- ## Known Contracts

From docs\onboarding-guide.md:
- # Karate Java API Automation Onboarding Guide
- ## Skill Set
- ## Expected Run
- ## Safety
- - Keep secrets in environment variables or CI secret stores.
- - Do not store real production data in test-data files.
- - Mark destructive tests and require explicit opt-in.
- - Separate smoke, regression, contract, security, and performance tags/markers.

From explore\SKILL.md:
- # API Explore Skill
- ## Capture
- - Base URL and environment.
- - Endpoint paths, methods, required headers, query/path params.
- - Auth requirements and token flow without recording secrets.
- - Request payload examples and response samples.
- - Status code matrix for positive and negative cases.
- - JSON schemas and business field assertions.
- - Pagination, sorting, filtering, rate limits, idempotency, retries.
- - Gaps and blockers.
- ## Output
- Return JSON with endpoints, examples, schemas, authNotes, testCaseRecommendations, and gaps.

From generate-tests\SKILL.md:
- # SKILL: generate-tests
- Generate EXACTLY 30 structured, non-duplicate API test cases. Output plain text only.
- ## Rules
- 1. Every title starts with `Verify that ...`.
- 2. Include TYPE, PRIORITY, TAGS, TESTCASE, and 4 to 5 STEPS.
- 3. Allowed TYPE values: API_POSITIVE, API_NEGATIVE, API_EDGE, CONTRACT, AUTHORIZATION, SECURITY, PERFORMANCE.
- 4. Allowed PRIORITY values: High, Medium, Low.
- 5. Allowed TAGS values: Smoke, Regression, API, Contract, Security, Performance.
- 6. STEP FORMAT: `STEP: action -> expected result`.
- 7. Do not include tokens, real credentials, database internals, or implementation classes.
- 8. Cover status codes, schemas, auth, invalid payloads, missing fields, permission checks, and rate/timeout behavior where relevant.
- ## Output Example

From run-ready-framework\SKILL.md:
- # Run-Ready API Framework Skill
- ## Required Files
- ## Checks
- - Dependencies are declared.
- - Base URL and auth are environment-driven.
- - Smoke tests can run without real secrets committed.
- - Reports are generated.
- - Destructive tests are tagged and opt-in.
- ## Output Contract

From standards\karate-java-standards.md:
- # Karate Java API Automation Standards
- ## File Outputs
- ## API Automation Rules
- - Use environment-driven `baseUrl` / `BASE_URL`.
- - Keep request builders/clients reusable and thin.
- - Keep assertions close to tests unless a shared contract helper is appropriate.
- - Validate status code, response fields, schema, headers, and error response shape.
- - Use unique test data or cleanup hooks for write operations.
- - Tag/mark every test with TC-ID and suite: smoke, regression, contract, security, or performance.
- ## Example
- ## Runtime

From templates\test-case-template.md:
- # API Test Case Template
- ## TC-API-[NUMBER]: [Test Title]
- ### Preconditions
- - Base URL is configured.
- - Required auth is available through secure runtime config.
- - Test data exists or can be created safely.
- ### Steps

From CLAUDE.md:
- # QA Automation - Karate Java API Automation Project Memory
- ## Goal
- Generate a self-contained `karate-java` API automation framework that users can clone, configure, and run locally or in CI.
- ## Runtime Layout
- ## Architecture
- - Config owns base URLs, environment names, auth mode, and timeouts.
- - Clients/helpers own request construction and reusable API calls.
- - Tests/features own scenario orchestration and assertions.
- - Schemas own JSON schema validation contracts.
- - Test data owns payloads and environment-safe sample values.
- ## Non-Negotiable Rules
- - Never commit real tokens, passwords, cookies, client secrets, or API keys.
- - Use env vars or secure runtime config for auth.
- - Validate status code, response body, schema, headers, and important business fields.



