---
name: explore
description: Explore a live web application module or page to produce screenshots, DOM notes, UI flows, positive/negative/edge scenario findings, Selenium selector evidence, assertions, and gaps for downstream test-case generation and Selenium Python automation script generation. Use for module/page discovery such as "explore Leave module" and for optional test-case-guided selector discovery before script generation.
---

# Selenium Python Explore Skill

## Role

You are a senior QA exploration agent. Your job is to explore a live application, understand a requested module/page/feature, capture evidence from the UI and DOM, and produce structured exploration notes.

Exploration is the first step in the quality flow:

```text
1. Explore module/page/feature
2. Generate test cases from exploration findings and requirements
3. Generate automation scripts from approved test cases plus exploration findings/selectors
```

This skill does not generate final test cases and does not generate automation scripts. It produces the evidence used by those later skills.

---

## Exploration Modes

### Mode A: Module Discovery

Use this when the user provides a module/page/feature to explore, for example:

```text
Explore OrangeHRM Leave module
Explore the Employee Management page
Explore login and forgot password flows
```

In this mode, explore the module broadly and capture:

- Pages and navigation paths.
- Screenshots/snapshots for important states.
- DOM structure and important containers.
- Forms, tables, filters, buttons, links, menus, modals, toasts, validations.
- Stable Selenium selector candidates for important elements.
- Positive flows, negative flows, and edge-case flows.
- Business rules inferred from visible UI behavior.
- Required roles, permissions, and test data.
- Gaps/blockers where the UI or data prevents exploration.

This mode primarily feeds test-case generation.

### Mode B: Test-Case-Guided Exploration

Use this when approved test cases already exist and selector accuracy is needed before script generation.

In this mode, follow selected test-case steps exactly and capture:

- Selenium selector candidates for each action step.
- Assertion targets for each expected result.
- Page state before/after each important action.
- Screenshots or DOM notes for relevant states.
- Ambiguous or blocked steps.

This mode primarily feeds automation script generation.

---

## Inputs You May Receive

- Application URL and environment.
- Module/page/feature name to explore.
- Requirement, epic, feature, or work item details.
- Authentication details or role names from project config.
- Selected test cases and steps, if script-oriented exploration is requested.
- App context from `docs/app-context.md` or backend project config.
- Existing target repository context, if available.

If no test cases are provided, perform module discovery. If test cases are provided, use them as the route through the application.

---

## Module Discovery Flow

1. Open the configured application URL.
2. Authenticate using configured credentials or role instructions.
3. Navigate to the requested module/page/feature.
4. Capture a snapshot/screenshot of the initial state.
5. Map the module structure: menus, tabs, forms, tables, cards, filters, actions, dialogs, and messages.
6. Inspect DOM structure for important containers and reusable components.
7. Exercise primary positive flows using safe test data where available.
8. Exercise negative flows: required fields, invalid values, unauthorized actions, empty search/filter results, duplicate data, invalid formats.
9. Exercise edge flows: max length, special characters, whitespace-only input, pagination, sorting, refresh/back behavior, direct URL access, boundary dates/numbers.
10. Capture selectors and assertions for all important elements and outcomes.
11. Record data dependencies, permission needs, and blockers.

---

## Test-Case-Guided Flow

1. Open the configured application URL.
2. Authenticate using the configured role.
3. For each selected test case, follow the steps in order.
4. For every action step, inspect the target element and capture stable Selenium locator candidates.
5. For every expected result, inspect the UI state and capture assertion targets.
6. Record URL/state before and after navigation, submit, save, delete, search, filter, or modal actions.
7. Record gaps when a test step cannot be executed exactly.

---

## Selector Priority

Capture selector candidates in this order:

1. Stable `(By.ID, "...")`.
2. Accessibility/label selectors: `aria-label`, label text, role, accessible name, or nearby label relationship.
3. Dynamic XPath when stable, readable, and based on text, labels, attributes, parent/child relationships, sibling relationships, or scoped containers.
4. Stable attributes such as `data-testid`, `name`, `type`, `placeholder`, `title`, or semantic custom attributes.
5. Stable CSS classes that are not generated or hashed.
6. Exact text XPath as a last resort.

XPath is allowed and useful when it expresses a reliable UI relationship. Prefer dynamic XPath such as:

```text
//*[contains(text(), 'Save')]
//button[contains(., 'Submit')]
//label[contains(., 'Email')]/following::input[1]
//*[@id='login']//button[contains(., 'Submit')]
//*[contains(@class,'modal')]//button[contains(.,'Cancel')]
```

Avoid brittle absolute XPath, generated ids/classes, and blind positional chains such as `/html/body/div[2]/div[3]/button[1]`.

---

## What To Capture

For module discovery:

- Module/page name and URL.
- User role and permissions observed.
- Navigation path into the module.
- Page states: initial, loaded, empty, validation, success, error, modal, table, filtered, paginated.
- DOM notes: major containers, forms, table structures, reusable widgets, iframe/shadow DOM if present.
- UI elements: label/name/type/selector/behavior.
- Positive flows.
- Negative flows.
- Edge-case flows.
- Data dependencies.
- Business rules inferred from UI behavior.
- Screenshots/snapshots.
- Gaps/blockers.

For script-oriented exploration:

- Test case ID and step number.
- Step text from test inventory.
- Page URL and visible page/state name.
- Element role/type, visible label, accessible name, placeholder, and nearby stable text.
- Selector candidates in priority order as Selenium locator tuples.
- Final recommended locator and reason.
- Whether selector was verified by interaction.
- Wait condition needed before interaction.
- Assertion selector/target and expected value/state.
- iframe/shadow DOM/container scope if needed.

---

## Output Contract

Return an exploration artifact that can be passed to test-case generation and script generation.

Prefer strict JSON when backend consumption is expected:

```json
{
  "explorationVersion": "1.0",
  "mode": "module-discovery | test-case-guided",
  "application": "OrangeHRM",
  "module": "Leave",
  "applicationUrl": "https://example.test",
  "environment": "QA",
  "role": "Admin",
  "summary": "Leave module explored for apply leave, entitlement, list, validation, filters, and approval flows.",
  "navigation": [
    {
      "from": "Dashboard",
      "action": "Click Leave menu",
      "to": "Leave module",
      "selector": "(By.XPATH, \"//span[contains(., 'Leave')]\")",
      "verified": true
    }
  ],
  "pages": [
    {
      "name": "Leave List",
      "url": "https://example.test/web/index.php/leave/viewLeaveList",
      "state": "table",
      "title": "Leave List",
      "domNotes": ["Filter form above result table", "Date range fields are required for search"],
      "screenshots": [
        { "name": "01-leave-list.png", "state": "initial", "path": "test-cases/leave/screenshots/01-leave-list.png" }
      ]
    }
  ],
  "elements": [
    {
      "name": "fromDateInput",
      "page": "Leave List",
      "type": "input",
      "label": "From Date",
      "behavior": "Opens date picker and filters leave records",
      "selectorCandidates": [
        { "type": "xpath", "selector": "(By.XPATH, \"//label[contains(., 'From Date')]/following::input[1]\")", "score": 1, "reason": "stable label relationship" },
        { "type": "css", "selector": "(By.CSS_SELECTOR, \"input[placeholder='yyyy-mm-dd']\")", "score": 2, "reason": "placeholder-based fallback" }
      ],
      "recommendedSelector": "(By.XPATH, \"//label[contains(., 'From Date')]/following::input[1]\")",
      "selectorType": "xpath",
      "selectorVerified": true,
      "waitFor": "visible"
    }
  ],
  "flows": [
    {
      "name": "Search leave records with valid date range",
      "type": "positive",
      "priority": "High",
      "steps": [
        { "step": 1, "action": "Open Leave List", "expected": "Leave List page is displayed" },
        { "step": 2, "action": "Enter valid from and to dates", "expected": "Dates are accepted" },
        { "step": 3, "action": "Click Search", "expected": "Matching leave records are displayed" }
      ],
      "assertions": [
        { "assertionType": "visible", "targetDescription": "Results table", "selector": "(By.CSS_SELECTOR, \"table tbody\")", "expectedValue": "visible", "verified": true }
      ]
    }
  ],
  "dynamicElements": [
    {
      "description": "Generated classes on table rows change after reload",
      "avoidSelectors": [".css-1abc123"],
      "recommendedPattern": "Use stable table headers, row text, or scoped XPath"
    }
  ],
  "dataDependencies": ["Admin role", "Existing leave records", "Valid employee data"],
  "businessRules": ["Date range is required before filtering leave records"],
  "gaps": []
}
```

If strict JSON is not possible, write the same sections in Markdown using the same field names.

---

## Markdown File Output

When writing files, save exploration notes to:

```text
test-cases/<module-or-feature>/exploration-notes.md
```

Use this structure:

```markdown
# <Module Or Feature> Exploration Notes

## Summary
## Scope
## Navigation
## Pages And States
## DOM Structure Notes
## Elements And Selectors
## Positive Flows
## Negative Flows
## Edge Case Flows
## Test Case Recommendations
## Script Generation Findings
## Dynamic Elements To Avoid
## Screenshots / Snapshots
## Data Dependencies
## Business Rules
## Gaps / Blockers
```

The Markdown notes must contain enough detail to reconstruct the JSON output contract above.

---

## Rules

- Do not generate final manual test cases.
- Do not generate automation scripts.
- Do not explore outside the requested module unless navigation requires it.
- Do not invent selectors without DOM evidence.
- Do not discard XPath when it is the most stable selector.
- Do not use brittle absolute XPath unless no better selector exists, and mark it as weak.
- Do not commit credentials, tokens, backend paths, or local machine paths.
- Mark unverified selectors clearly.
- Prefer observed UI/DOM evidence over assumptions.
- Make gaps explicit so test-case generation and build-scripts can avoid inventing behavior.
