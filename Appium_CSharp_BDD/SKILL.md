---
name: Appium_CSharp_BDD
description: Generate Appium C# BDD automation from explicitly selected, approved test cases. Use for Qentrix automation-script generation against the matching static framework; never use this skill to create test cases or invent business scenarios.
---

# Appium C# BDD Script Generation

Generate runnable, framework-compatible automation for the existing `Appium_CSharp_BDD` stack. Treat selected approved test cases as the only behavioral source of truth.

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
- `test-data/**/*`
- `config/**/*`

Return strict JSON only:

```json
{
  "status": "ready | needs_exploration | blocked",
  "tool": "Appium",
  "language": "C#",
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
7. Map every approved expected result to a retrying assertion/check supported by `Appium`.
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

This skill folder is Appium_CSharp_BDD for Appium / C# / BDD Cucumber. Use updateagentskill/playwright/javascript/hybrid as a quality reference only; preserve this skill's own tool, language, framework type, folder name, and output conventions.

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
- # Appium C# Mobile Build Scripts Skill
- ## Role
- ## Inputs
- - Approved mobile test cases
- - App context with Android appPackage/appActivity and iOS bundleId
- - Device/capability config
- - Exploration findings with Android/iOS selectors, if available
- - Existing target repository files
- ## Output Contract
- Return strict JSON only:
- ## Generation Rules
- - Generate Android and iOS capabilities/config entries.
- - Generate platform-aware locators when selectors differ.
- - Use accessibility ids first.

From docs\app-context.md:
- # Mobile Application Context Template
- ## Applications
- ## Environments
- ## Devices
- ## Authentication
- ## Modules
- ## Known Mobile Behaviors

From docs\onboarding-guide.md:
- # Appium C# BDD Framework Mobile Onboarding Guide
- ## Skill Set
- ## Required Mobile Setup
- - Appium server available locally or in CI/cloud.
- - Android SDK/emulator or connected Android device.
- - Xcode/iOS simulator or connected iOS device for iOS execution.
- - App artifacts or installed-app identifiers configured without hardcoded local paths.
- ## Expected Commands
- ## Safety Rules
- - Use environment variables for app paths, cloud credentials, device ids, and server URL.
- - Keep platform capabilities in config files.
- - Keep locators platform-aware.
- - Capture permission alerts and native/webview context switching rules in app context.

From explore\SKILL.md:
- # Mobile Explore Skill
- ## Modes
- 1. Module discovery: map screens, navigation, gestures, permissions, validations, offline states, and platform differences.
- 2. Test-case-guided exploration: follow selected test cases and capture verified Android/iOS locators and assertions per step.
- ## Capture
- - Platform, device, OS version, app identifier, app state.
- - Android selectors: accessibility id, resource-id, UiAutomator, XPath fallback.
- - iOS selectors: accessibility id/name, predicate, class chain, XPath fallback.
- - Gestures: tap, long press, swipe, scroll, drag/drop, hide keyboard.
- - Native alerts, permission dialogs, webview/native context switches.
- - Screenshots and gaps.
- ## Output
- Return JSON with pages, elements, Android/iOS selector candidates, recommended selector, wait condition, gesture needed, assertions, business rules, data dependencies, and block...

From generate-tests\SKILL.md:
- # SKILL: generate-tests
- # Purpose: Generate exactly 30 structured, non-duplicate mobile test cases.
- ## YOUR ROLE
- Generate EXACTLY 30 unique mobile test cases for Android and iOS coverage where applicable. Cover positive, negative, edge, interruption, permission, offline, orientation, acces...
- ## STRICT RULES
- 1. Generate EXACTLY 30 test cases.
- 2. Every title starts with `Verify that ...`.
- 3. Every test case contains TYPE, PRIORITY, TAGS, TESTCASE, and 4 to 5 STEPS.
- 4. Allowed TYPE values: FUNCTIONAL_POSITIVE, FUNCTIONAL_NEGATIVE, FUNCTIONAL_EDGE, MOBILE_PERMISSION, MOBILE_INTERRUPTION, NON_FUNCTIONAL_PERFORMANCE, NON_FUNCTIONAL_SECURITY.
- 5. Allowed PRIORITY values: High, Medium, Low.
- 6. Allowed TAGS values: Smoke, Regression, Android, iOS, Security, Performance.
- 7. STEP FORMAT: `STEP: action -> expected result`.
- 8. Output plain text only.
- 9. Do not include locators, automation APIs, DOM hierarchy, device UDIDs, app paths, or secrets.

From run-ready-framework\SKILL.md:
- # Run-Ready Mobile Framework Skill
- ## Role
- ## Required Runtime Files
- ## Verification
- - Android capabilities are present and environment-driven.
- - iOS capabilities are present and environment-driven.
- - Appium server URL is configurable.
- - Device identifiers, app paths, and cloud credentials are not committed.
- - Tests can select platform from CLI/env/config.
- - Reports/screenshots/logs are written to a reports folder.
- ## Acceptance Commands
- ## Output Contract
- Return strict JSON only:

From standards\appium-csharp-bdd-standards.md:
- # Appium C# BDD Framework Mobile Standards
- ## File Outputs Per Feature
- ## Locator Rules
- - Locator files contain selectors only.
- - Store Android and iOS locators separately when they differ.
- - Prefer accessibility id/content-desc/name on both platforms.
- - Android fallback priority: accessibility id, resource-id, UiAutomator text/description, XPath last.
- - iOS fallback priority: accessibility id/name, iOS predicate, iOS class chain, XPath last.
- - Never use brittle absolute XPath or coordinate-only locators as the default.
- ## Screen/Page Rules
- - Screen files contain actions, waits, gestures, assertions, and platform locator resolution.
- - Use helper methods for tap, type, swipe, scroll, long press, hide keyboard, context switch, permission handling, and app reset.
- - Assertions must wait for stable mobile state before reading text or visibility.
- ## Test Rules

From templates\test-case-template.md:
- # Mobile Test Case Template
- ## Test Case Format
- ## TC-MOB-[NUMBER]: [Test Title]
- ### Preconditions
- - App installed or app artifact available.
- - Device/simulator is available.
- - Required permissions and test data are configured.
- ### Test Steps
- ### Platform Notes
- - Android:
- - iOS:

From CLAUDE.md:
- # Mobile Automation - Appium C# BDD Framework Project Memory
- ## Goal
- Generate a self-contained `appium-csharp-bdd` mobile automation framework that supports both Android and iOS.
- ## Runtime Layout
- ## Android And iOS Requirements
- - Android capabilities must support `platformName=Android`, `automationName=UiAutomator2`, `appPackage`, `appActivity`, `deviceName`, and app path or installed app mode.
- - iOS capabilities must support `platformName=iOS`, `automationName=XCUITest`, `bundleId`, `udid/deviceName`, `platformVersion`, and app path or installed app mode.
- - Tests must allow platform selection by CLI/env/config.
- - Locators must be platform-aware when Android and iOS accessibility trees differ.
- - Prefer accessibility ids on both platforms. Use Android UIAutomator and iOS predicate/class chain only when accessibility ids are unavailable.
- - Mobile gestures must be helper methods: tap, long press, swipe, scroll, hide keyboard, context switch, wait for app state.
- ## Generated Files Per Feature
- - `PageObjects/<Feature>MobileObjects.cs`: Android and iOS locators/selectors only.
- - `Screens/<Feature>Screen.cs`: screen actions, waits, gestures, and assertions.


