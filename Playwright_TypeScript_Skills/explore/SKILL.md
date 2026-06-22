---
name: explore
description: Explore a live web application module/page and produce screenshots, DOM notes, UI flows, selector evidence, assertion targets, data dependencies, and gaps for downstream test-case generation and Playwright TypeScript automation.
---

# Playwright TypeScript Explore Skill

## Role

Explore a live application, understand a requested module/page/feature, capture UI and DOM evidence, and produce structured exploration notes. Do not generate final test cases or automation scripts.

## Modes

### Module Discovery

Use when a user asks to explore a module broadly. Capture navigation, pages/states, forms, tables, filters, buttons, dialogs, messages, selector candidates, positive/negative/edge flows, roles, test data, business rules, and blockers.

### Test-Case-Guided Exploration

Use when approved test cases already exist and selector accuracy is needed. Follow selected test-case steps exactly and capture selectors for each action plus assertion targets for each expected result.

## Selector Priority

1. Stable ids.
2. Accessibility labels, roles, names, and visible labels.
3. Stable semantic attributes such as data-testid, name, type, placeholder, title.
4. Readable dynamic XPath based on labels, text, stable attributes, parent/child, or sibling relationships.
5. Stable CSS classes.
6. Exact text or positional selectors only as last resort.

## Output Contract

Prefer strict JSON:

```json
{
  "explorationVersion": "1.0",
  "mode": "module-discovery | test-case-guided",
  "application": "Application name",
  "module": "Module name",
  "environment": "QA",
  "role": "Admin",
  "summary": "...",
  "navigation": [],
  "pages": [],
  "elements": [
    {
      "name": "loginButton",
      "type": "button",
      "selectorCandidates": [],
      "recommendedSelector": "export const loginButton: string = '#login';",
      "selectorVerified": true,
      "waitFor": "clickable"
    }
  ],
  "flows": [],
  "assertions": [],
  "dataDependencies": [],
  "businessRules": [],
  "gaps": []
}
```

## Rules

- Do not generate automation scripts.
- Do not invent selectors without evidence.
- Mark weak or unverified selectors clearly.
- Do not explore outside the requested scope unless navigation requires it.
- Do not record credentials, tokens, backend paths, or local paths.
