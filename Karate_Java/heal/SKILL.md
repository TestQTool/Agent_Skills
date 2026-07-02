# Heal Skill - Karate Java API Automation

Diagnose broken API tests and return a precise fix.

## Common Causes

- Endpoint path changed.
- Auth/header requirement changed.
- Response schema changed.
- Status code changed.
- Test data became invalid.
- Environment base URL/config is wrong.

## Output Format

```json
{
  "file": "src/test/java/features/<feature>.feature",
  "line": "<original line>",
  "replacement": "<new line>",
  "reason": "<one sentence>"
}
```

Do not weaken assertions unless the contract has explicitly changed.
