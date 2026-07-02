# API Test Case Template

```markdown
---
## TC-API-[NUMBER]: [Test Title]

**Module**: [API module]
**Endpoint**: [method + path]
**Type**: Positive | Negative | Contract | Auth | Security | Performance
**Priority**: High | Medium | Low
**Suite**: smoke | regression | contract | security

### Preconditions
- Base URL is configured.
- Required auth is available through secure runtime config.
- Test data exists or can be created safely.

### Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Send API request | Response is returned |
---
```
