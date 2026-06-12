# SKILL: explore
# Loaded by: Claude Code (manual) or future ExplorationAgent
# Purpose: Browse a live web app and document UI flows, selectors, and behaviors.

---

## YOUR ROLE
You are a QA analyst exploring a web application for the first time.
You navigate to each page, inspect the DOM, capture stable selectors, and write exploration notes.
Output is used as input for generate-tests and build-scripts skills.

---

## EXPLORATION STEPS

### Step 1 Ã¢â‚¬â€ Navigate and Screenshot
1. Open the app URL from app-context.md
2. Screenshot the page: save to `test-cases/<feature>/screenshots/01-<page-name>.png`
3. Note: page title, URL path, main visible components

### Step 2 Ã¢â‚¬â€ Inspect Each Interactive Element
For every input, button, link, dropdown, table:
- Record: element type, label/placeholder, selector, behavior on interaction
- Test: click, hover, focus states
- Note: any dynamic behavior (show/hide, validation on blur, etc.)

### Step 3 Ã¢â‚¬â€ Map User Flows
Document every path through the feature:
- Happy path (valid inputs Ã¢â€ â€™ success)
- Error path (invalid/empty inputs Ã¢â€ â€™ validation)
- Navigation flow (breadcrumbs, back buttons, redirects)

### Step 4 Ã¢â‚¬â€ Write Exploration Notes
Save to: `test-cases/<feature>/exploration-notes.md`

```markdown
# <Feature> Exploration Notes

## URL: <full URL>
## Date: <date>

## Page Elements
| Element | Type | Selector | Behavior |
|---------|------|----------|----------|
| Username field | input | input[name="username"] | Required. Shows "Required" on blur if empty |

## User Flows Discovered
### Flow 1: [name]
1. [step]
2. [step]

## Validation Behaviors
- [field]: [trigger] Ã¢â€ â€™ [message shown] Ã¢â€ â€™ [selector of message]

## Dynamic Elements (avoid these as selectors)
- [description of any auto-generated or unstable classes]

## Screenshots
- 01-login-page.png Ã¢â‚¬â€ initial state
- 02-error-state.png Ã¢â‚¬â€ after failed submit
```

---

## SELECTOR CAPTURE RULES

Selector priority:
1. Stable `id` selector.
2. Role/accessibility-based selector: role, accessible name, aria-label, or label text.
3. Dynamic XPath when it is stable, readable, and based on durable text, attributes, parent/child relationships, or sibling relationships.
4. Stable attributes such as data-testid, name, type, placeholder, title.
5. Stable CSS classes that are not generated.
6. Exact text selector as a last resort.

Use XPath when it helps express the real UI relationship, for example label-to-input, button text inside a container, parent/child, child-to-parent, or sibling navigation. Avoid only brittle absolute XPath and blind positional selectors unless no better selector exists.

## TEST-CASE-GUIDED EXPLORATION

When test cases are available from test inventory, do not explore randomly. Follow the selected test cases step by step:

- Map every test case step to one or more page interactions.
- Capture the selector used for each interaction.
- Capture assertion selectors for each expected result.
- Record any missing or ambiguous step so build-scripts can avoid inventing behavior.
- Save findings to `test-cases/<feature>/exploration-notes.md` or return them to the backend as structured exploration context.

