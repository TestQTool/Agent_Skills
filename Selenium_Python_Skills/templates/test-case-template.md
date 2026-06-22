# Test Case Template - Generic Web Application

Every generated manual test case should follow this structure unless a client-specific template overrides it.

---

## Test Case Format

```markdown
---
## TC-[MODULE_PREFIX]-[NUMBER]: [Test Title]

**Module**: [Module name]
**Feature**: [Specific feature or sub-section]
**Type**: Positive | Negative | Edge Case
**Priority**: High | Medium | Low
**Suite**: @smoke | @regression | @smoke @regression
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

### Test Data
| Field | Valid Value | Invalid Value | Edge Value |
|-------|-------------|---------------|------------|
| Example Field | valid value | invalid value | boundary value |

### Expected Final Result
[Clear final system state after all steps pass]

### Negative / Error Scenarios
| Input Condition | Expected Error Message / Behavior |
|----------------|-----------------------------------|
| Required field empty | Validation message appears near the field |

### Notes
- [Known application behavior]
- [Cross-browser considerations]
- [Data dependencies]
---
```

---

## Coverage Checklist Per Feature

Positive scenarios:
- Primary happy path with valid data
- Navigation into the feature
- Form submission or primary action with required data
- Search/filter with valid values where applicable
- CRUD operations where available

Negative scenarios:
- Required fields empty
- Invalid format input
- Duplicate data where duplicates are not allowed
- Unauthorized/permission-restricted action where roles differ
- Search/filter returning no results

Edge cases:
- Maximum length input
- Special characters in text fields
- Whitespace-only input
- Empty list/table state
- Refresh or back button behavior where relevant
- Direct URL access to protected pages where relevant

---

## CSV Format

```csv
TC-ID,Title,Module,Feature,Type,Priority,Suite,User Role,User Story,Acceptance Criteria,Description,Preconditions,Test Steps Summary,Test Data,Expected Final Result
```

Rules:
- One row per test case.
- Wrap every field in double quotes.
- Join multi-line steps with ` | `.
- Escape double quotes by doubling them.
