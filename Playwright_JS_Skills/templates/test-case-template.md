# Test Case Template — WebApplication

Every test case generated for this project MUST follow this exact structure.
Do not deviate from the format. Each file should contain multiple test cases.

---

## Test Case Format

```
---
## TC-[MODULE_PREFIX]-[NUMBER]: [Test Title]

**Module**: [Module name from app-context.md]
**Feature**: [Specific feature or sub-section]
**Type**: Positive | Negative | Edge Case
**Priority**: High | Medium | Low
**Suite**: @smoke | @regression | @smoke @regression
**User Role**: Admin | ESS
**User Story**: [US-XXX from orangehrm.md or "N/A"]
**Acceptance Criteria**: [AC-XXX-X from orangehrm.md or description]

### Description
[One paragraph: what this test validates, why it matters to the business, what failure looks like]

### Preconditions
- [ ] User is on the OrangeHRM login page OR logged in as [Role]
- [ ] [Any required data state — e.g. "At least one employee exists in the system"]
- [ ] [Any required system state]

### Test Steps
| Step | Action | Test Data | Expected Result |
|------|--------|-----------|-----------------|
| 1    | Navigate to login URL | https://hr.quality-matrix.us/web/index.php/auth/login | Login page loads with Username and Password fields |
| 2    | Enter username | adminhrqa | Field accepts input |
| 3    | Enter password | Adminhrqa@321 | Field accepts input (masked) |
| 4    | Click Login button | | Dashboard loads with top navigation visible |

### Test Data
| Field | Valid Value | Invalid Value | Edge Value |
|-------|------------|---------------|------------|
| Username | adminhrqa | wronguser | [empty] |
| Password | Adminhrqa@321 | wrongpass | [empty] |

### Expected Final Result
[Clear, specific description of the system state after all steps complete successfully]

### Negative / Error Scenarios (for Negative type tests)
| Input Condition | Expected Error Message / Behavior |
|----------------|-----------------------------------|
| Wrong password | "Invalid credentials" message displayed below the form |
| Empty username | Orange validation text appears below the Username field |

### Notes
- [Any known OrangeHRM-specific behaviors]
- [Cross-browser considerations]
- [Data dependencies — e.g. test requires a specific employee to exist]

---
```

---

## Module Prefix Reference — Example & Should follow the same
| Module | Prefix |
|--------|--------|
| Login / Logout | `LGN` |
| Dashboard | `DSH` |
| PIM (Employee Management) | `PIM` |
| Leave | `LVE` |
| Admin Users | `ADM` |
| Time | `TIM` |
| Recruitment | `RCT` |
| Performance | `PRF` |
| Directory | `DIR` |

---

## Coverage Checklist per Feature

For every OrangeHRM feature, generate test cases covering ALL of the following:

### Positive Scenarios (Happy Path)
- [ ] Primary user action with valid data
- [ ] All CRUD operations that exist (Create, Read, Update, Delete)
- [ ] Navigation to the module from the top nav bar
- [ ] Search and filter with valid values (and verify results appear)
- [ ] Form submission with all required fields filled correctly
- [ ] Role-based access — Admin can perform full actions

### Negative Scenarios (Sad Path)
- [ ] Required field left empty (expect orange validation text in OrangeHRM)
- [ ] Invalid format input (wrong email format, invalid characters)
- [ ] Incorrect login credentials — expect "Invalid credentials" error
- [ ] Form submission with missing required fields
- [ ] Search returning zero results (not a crash — just empty state)
- [ ] Duplicate entry where not allowed (e.g., duplicate username)

### Edge Cases
- [ ] Maximum length input (long employee names, long usernames)
- [ ] Special characters in text fields (apostrophes, hyphens in names)
- [ ] Whitespace-only inputs (should fail validation)
- [ ] Empty state — no records exist yet
- [ ] Page refresh mid-form (data may be lost — document expected behavior)
- [ ] Back button after logout (session should NOT restore)
- [ ] Direct URL access to protected page after logout (should redirect to login)
