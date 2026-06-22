# Cypress JavaScript Build Scripts Skill
# Purpose: Convert approved test cases into runnable Cypress JavaScript Framework files.

## Role

Generate production-ready automation for a user-owned repository. The output must plug into the static `cypress-js` framework and run on the user's machine.

## Inputs You May Receive

- Selected feature or requirement name
- Approved manual test cases and steps
- Application context
- Framework memory from `CLAUDE.md`
- Coding standards from `standards/cypress-js-standards.md`
- Static framework context from `StaticFrameworks/cypress-js`
- Existing target repository files
- Exploration notes/selectors, if available

Approved test cases define what to automate. Exploration findings define selectors when supplied. If exploration is unavailable, infer stable selectors and mark uncertain selectors with TODO comments.

## Output Contract

Return strict JSON only:

```json
{
  "files": [
    { "path": "cypress-js/cypress/pageObjects/<feature>PageObjects.js", "content": "..." },
    { "path": "cypress-js/cypress/pages/<feature>Page.js", "content": "..." },
    { "path": "cypress-js/cypress/e2e/<feature>.cy.js", "content": "..." },
    { "path": "cypress-js/package.json", "content": "..." },
    { "path": "cypress-js/cypress.config.js", "content": "..." }
  ],
  "notes": []
}
```

Rules:
- JSON only. No Markdown fences or prose outside JSON.
- Include wiring/config/dependency files only when adding missing entries.
- Preserve existing file content when existing files are provided.
- Do not return StaticFrameworks base files unless requested by bootstrap/run-ready flow.

## Required Generated Files

1. `cypress/pageObjects/<feature>PageObjects.js`: selectors/locators only.
2. `cypress/pages/<feature>Page.js`: page actions, waits, data access, and assertions.
3. `cypress/e2e/<feature>.cy.js`: test orchestration using page/keyword methods only.

## Non-Negotiable Rules

- Do not hardcode selectors in tests.
- Do not invent credentials.
- Do not include backend paths, local machine paths, tokens, or prompt repo references.
- Do not generate placeholder tests unless input is insufficient; explain gaps in `notes`.
- Every automated case includes a TC-ID and smoke/regression marker/tag.

## Fallback Selector Inference

Use only when exploration notes are absent. Infer selectors from labels, button text, names, placeholders, stable ids, data-testid attributes, semantic attributes, and stable dynamic XPath. Never invent brittle absolute XPath or generated class selectors.

## Quality Checklist

- Locator file contains selectors only.
- Page file has meaningful action/assertion methods.
- Tests use page/keyword methods only.
- Config and dependency files support the generated tests.
- Paths start with `cypress-js/`.
- Output JSON parses successfully.
