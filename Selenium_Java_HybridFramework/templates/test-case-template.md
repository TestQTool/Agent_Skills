# Test Case Template — HybridFramework

Every test case file follows this structure.
One `.md` file per feature. Each TC block is separated by `---`.

---

## TC Format

```
---
## TC-[PREFIX]-[NNN]: [Title — action verb + specific expected outcome]

**Type**         : Positive | Negative | Edge Case
**Priority**     : High | Medium | Low
**Suite**        : @sanity | @regression | @sanity @regression
**Role**         : Admin | (role from Config.properties)
**TestNG Group** : sanity | regression | smoke

### Steps
| # | Action | Data | Expected Result |
|---|--------|------|-----------------|
| 1 | [verb phrase] | [value or N/A] | [specific observable outcome] |

### Expected Final State
[One sentence — specific, observable. What does the screen show after all steps complete?]
---
```

---

## Module Prefix Reference

| Module | Prefix | Page Class | Test Class |
|--------|--------|------------|------------|
| Login / Logout | LGN | `LoginPage.java` | `LoginTC.java` |
| Registration | REG | `RegistrationPage.java` | `RegisterTC.java` |
| Dashboard | DSH | `HomePage.java` | `HomeTC.java` |
| Bill Payment | BPY | `BillPayPage.java` | `BillPaymentTC.java` |
| Fund Transfer | FTR | `FundTransferPage.java` | `FundsTransferTC.java` |
| Products | PRD | `ProductsPage.java` | `ProductsTC.java` |
| Checkout | CHK | `CheckoutPage.java` | `CheckoutTC.java` |
| User Management | USR | *(add)* | *(add)* |
| Settings | SET | *(add)* | *(add)* |
| Generic / Unknown | GEN | *(add)* | *(add)* |

---

## TestNG Method Name Mapping

| TC-ID | Java Method Name |
|-------|-----------------|
| TC-LGN-001 | `tc_LGN_001_verifyValidLogin()` |
| TC-LGN-002 | `tc_LGN_002_verifyInvalidCredentials()` |
| TC-FTR-001 | `tc_FTR_001_verifyFundTransferSuccess()` |

Pattern: `tc_[PREFIX]_[NNN]_[camelCaseDescription]()`

---

## Suite + Severity Mapping

| Type | Suite | TestNG `groups` | Allure `SeverityLevel` |
|------|-------|----------------|------------------------|
| High + Positive (core flow) | `@sanity @regression` | `sanity` | `BLOCKER` / `CRITICAL` |
| High + Negative | `@regression` | `regression` | `CRITICAL` |
| Medium + Positive | `@regression` | `regression` | `NORMAL` |
| Medium + Negative | `@regression` | `regression` | `MINOR` |
| Low + Edge Case | `@regression` | `regression` | `TRIVIAL` |

---

## Coverage Checklist per Feature

### Positive (min 3)
- [ ] Happy path — all required fields filled correctly → success outcome
- [ ] Each CRUD operation that exists (Create · Read · Update · Delete)
- [ ] Navigation to the feature from the main menu
- [ ] Role-based access — primary role can perform all actions

### Negative (min 3)
- [ ] Required field empty → validation message appears
- [ ] Invalid format (wrong email, negative number, past date)
- [ ] Wrong credentials (on auth flows)
- [ ] Duplicate entry where not allowed
- [ ] Form submitted with missing required fields

### Edge Cases (min 2)
- [ ] Maximum character length in text fields
- [ ] Special characters (`!@#$%^&*`) in text inputs
- [ ] Whitespace-only in required fields (should fail validation)
- [ ] Empty list / no results state
- [ ] Page refresh mid-form
- [ ] Direct URL access after logout (should redirect to login)

---

## Example

```
---
## TC-LGN-001: Verify successful login with valid Admin credentials

**Type**         : Positive
**Priority**     : High
**Suite**        : @sanity @regression
**Role**         : Admin
**TestNG Group** : sanity

### Steps
| # | Action | Data | Expected Result |
|---|--------|------|-----------------|
| 1 | Navigate to the application login page | App URL from Config | Login page loads with Username and Password fields |
| 2 | Enter valid username | Admin username (from Config) | Field accepts the input |
| 3 | Enter valid password | Admin password (from Config) | Field accepts the input (masked) |
| 4 | Click the Login button | N/A | User is redirected to the dashboard |
| 5 | Verify dashboard heading is visible | N/A | Dashboard heading or welcome message is displayed |

### Expected Final State
User is logged in and the dashboard page is displayed with the main navigation visible.
---

---
## TC-LGN-002: Verify error message on invalid credentials

**Type**         : Negative
**Priority**     : High
**Suite**        : @regression
**Role**         : Admin
**TestNG Group** : regression

### Steps
| # | Action | Data | Expected Result |
|---|--------|------|-----------------|
| 1 | Navigate to the application login page | App URL | Login page loads |
| 2 | Enter invalid username | "wronguser" | Field accepts the input |
| 3 | Enter invalid password | "wrongpass" | Field accepts the input |
| 4 | Click the Login button | N/A | Inline error message appears |
| 5 | Verify error message text | N/A | Message reads "Invalid credentials" |
| 6 | Verify user remains on login page | N/A | URL still points to the login page |

### Expected Final State
User remains on the login page with an inline error message displayed. No redirect occurs.
---
```
