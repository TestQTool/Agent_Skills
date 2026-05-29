# OrangeHRM — Application Context

## Environments
| Name | URL |
|------|-----|
| QA / Demo | https://www.example.com |

## Authentication
- **Mechanism**: Standard HTML form login (NOT Auth0)
- **Login flow**:
  1. Navigate to `https://www.example.com`
  2. Enter username in the **Username** input field
  3. Enter password in the **Password** input field
  4. Click the **Login** button
  5. Verify landing page shows the OrangeHRM top navigation bar (Admin, PIM, Leave, etc.)

- **Default test credentials:**
  - Username: `adminhrqa`
  - Password: `Adminhrqa@321`
  - Store in `test-data/login.csv` under `RoleName = Admin`

## User Roles & Capabilities
| Role | Description |
|------|-------------|
| `Admin` | Full access — all modules, employee management, user management, system configuration |

> OrangeHRM also supports an **ESS (Employee Self Service)** role but the primary test role is Admin.

## Application Modules
| Module | Description | Nav Label | Test File |
|--------|-------------|-----------|-----------|
| Login | Standard form authentication | — | `Login.test.js` |
| Dashboard | Post-login landing page with quick launch and widgets | Dashboard | `Dashboard.test.js` |
| PIM | Employee records — add, search, edit, delete employees | PIM | `PIM.test.js` |
| Leave | Leave types, entitlements, leave list, leave calendar | Leave | `Leave.test.js` |
| Admin | System user management, job titles, pay grades, org structure | Admin | `AdminUsers.test.js` |
| Logout | Profile dropdown → Logout → redirect to login page | (profile icon) | `Login.test.js` |

## Top Navigation Bar (post-login)
After login the navigation contains:
`Admin | PIM | Leave | Time | Recruitment | My Info | Performance | Dashboard | Directory | Maintenance | Buzz`

## Known OrangeHRM-Specific Behaviors
- Login page URL: `/web/index.php/auth/login`
- Dashboard URL after login: `/web/index.php/dashboard/index`
- Invalid credentials show an inline error: `"Invalid credentials"`
- Empty required fields show orange validation text beneath the field
- OrangeHRM uses a Vue.js SPA — some elements may be dynamically rendered; use `waitForPageLoad()` after navigation
- Employee ID on Add Employee form is auto-generated (pre-filled, editable)
- Search in PIM Employee List requires clicking the Search button after entering criteria
- Logout is accessed via the profile avatar icon in the top-right corner → Logout menu item

## Known Edge Cases to Always Consider
- Empty states (employee list with no search results)
- Required field validation (First Name, Last Name on Add Employee)
- Invalid credential error handling on Login
- Session expiry — navigating to a protected URL after logout should redirect to login
- Back button after logout should NOT restore session
- Form fields with special characters (employee names)
- Duplicate usernames in Admin User Management
- Search returning zero results vs no search performed
- Cross-browser behavior differences (Chrome primary, Firefox secondary)

## CI/CD Context
- Run via `npx playwright test` locally
- HTML report: `npx playwright show-report`
- Allure + JUnit reporting when configured
