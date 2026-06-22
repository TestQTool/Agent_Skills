# Mobile Test Case Template

## Test Case Format

```markdown
---
## TC-MOB-[NUMBER]: [Test Title]

**Module**: [Module]
**Platforms**: Android, iOS, or platform-specific
**Type**: Positive | Negative | Edge | Permission | Interruption | Security | Performance
**Priority**: High | Medium | Low
**Suite**: @smoke | @regression
**Role**: [Role]

### Preconditions
- App installed or app artifact available.
- Device/simulator is available.
- Required permissions and test data are configured.

### Test Steps
| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Launch the app | App opens on selected platform |

### Platform Notes
- Android:
- iOS:
---
```
