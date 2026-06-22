# Heal Skill - Playwright Java TestNG

Diagnose broken selectors, endpoints, or platform locators and return only the precise fix.

## Output Format

```json
{
  "file": "src/main/java/pageobjects/<Feature>PageObjects.java",
  "line": "<original line>",
  "replacement": "<new line>",
  "reason": "<one sentence>"
}
```

Do not rewrite tests, change TestNG groups, add sleeps, or move selectors into test files.

