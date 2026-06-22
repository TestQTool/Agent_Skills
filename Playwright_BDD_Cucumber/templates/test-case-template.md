# Test Case Template - Generic Web Application

Every generated manual test case should follow this structure unless a client-specific template overrides it.

## Test Case Format

```markdown
---
## TC-[MODULE_PREFIX]-[NUMBER]: [Test Title]

**Module**: [Module name]
**Feature**: [Specific feature or sub-section]
**Type**: Positive | Negative | Edge Case
**Priority**: High | Medium | Low
**Suite**: @smoke | @regression
**User Role**: [Role name from project context]
**User Story**: [Requirement/work item ID or N/A]
**Acceptance Criteria**: [Acceptance criteria ID or description]

### Description
[One paragraph describing what this test validates and why it matters]

### Preconditions
- [ ] User has access to the target environment
- [ ] Required test data exists or can be created during the test
- [ ] Required role/permission is available

### Test Steps
| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1 | Navigate to the target page | BASE_URL | Page loads successfully |

### Expected Final Result
[Clear final system state after all steps pass]
---
```

## Coverage Checklist

Positive: happy path, navigation, submission, search/filter, CRUD.
Negative: required fields, invalid input, duplicates, unauthorized actions, no-result states.
Edge: max length, special characters, whitespace, empty tables, refresh/back behavior, protected direct URLs.
