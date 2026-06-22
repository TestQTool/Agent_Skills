# TestNG Test Case Template

## Test Case Format

```markdown
---
## TC-[MODULE]-[NUMBER]: [Test Title]

**Type**: Positive | Negative | Edge | API | Mobile | Security | Performance
**Priority**: High | Medium | Low
**Groups**: smoke | regression | api | mobile
**Role**: [Role]

### Preconditions
- Test environment is available.
- Required data exists or can be created safely.

### Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open or call the target feature | Target feature responds successfully |
---
```
