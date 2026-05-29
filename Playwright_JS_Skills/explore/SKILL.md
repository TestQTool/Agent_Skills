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

### Step 1 — Navigate and Screenshot
1. Open the app URL from app-context.md
2. Screenshot the page: save to `test-cases/<feature>/screenshots/01-<page-name>.png`
3. Note: page title, URL path, main visible components

### Step 2 — Inspect Each Interactive Element
For every input, button, link, dropdown, table:
- Record: element type, label/placeholder, selector, behavior on interaction
- Test: click, hover, focus states
- Note: any dynamic behavior (show/hide, validation on blur, etc.)

### Step 3 — Map User Flows
Document every path through the feature:
- Happy path (valid inputs → success)
- Error path (invalid/empty inputs → validation)
- Navigation flow (breadcrumbs, back buttons, redirects)

### Step 4 — Write Exploration Notes
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
- [field]: [trigger] → [message shown] → [selector of message]

## Dynamic Elements (avoid these as selectors)
- [description of any auto-generated or unstable classes]

## Screenshots
- 01-login-page.png — initial state
- 02-error-state.png — after failed submit
```

---

## SELECTOR CAPTURE RULES
- Prefer: `input[name]`, `button[type]`, `[data-testid]`, `[aria-label]`
- Test stability: would this selector survive a CSS refactor? If no → find a better one
- Document both the selector AND why it's stable
