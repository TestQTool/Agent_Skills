# Application Context
# ✏️  FILL IN THIS FILE before running any skill command.
# This file is read by: /explore · /generate-tests · /build-scripts

---

## Environments

| Name | URL |
|------|-----|
| QA | `{{APP_URL}}` |
| DEV | *(optional)* |
| STAGING | *(optional)* |

---

## Authentication

- **Mechanism**: Standard HTML form login
- **Login flow**:
  1. Navigate to `{{APP_URL}}`
  2. Enter username in the **Username** field
  3. Enter password in the **Password** field
  4. Click the **Login** button
  5. Verify landing page loads

- **Credentials**:
  - Username: `{{APP_USERNAME}}`
  - Password: `{{APP_PASSWORD}}`

> Also set these in `src/test/resources/Config.properties`:
> ```
> WebsiteUrl={{APP_URL}}
> username={{APP_USERNAME}}
> password={{APP_PASSWORD}}
> appEnvironment={{APP_ENVIRONMENT}}
> ```

---

## User Roles

| Role | Description |
|------|-------------|
| Admin | Full access — primary test role |
| *(add roles)* | |

---

## Application Modules

| Module | Description | URL Path | Page Class | Test Class |
|--------|-------------|----------|------------|------------|
| Login | Form authentication | `/login` | `LoginPage.java` | `LoginTC.java` |
| *(add module)* | | | | |

---

## Post-Login Navigation

*After login the navigation contains:*
`[Fill in menu / sidebar items here after first /explore session]`

---

## Known Application Behaviors

*(Fill in after first /explore session)*
- e.g. App uses SPA (React/Vue/Angular) — use explicit waits after navigation
- e.g. Search requires clicking a Search button after entering criteria
- e.g. IDs are auto-generated on Add forms

---

## Known Edge Cases

- Empty states (lists with no records)
- Required field validation messages
- Invalid credential error handling
- Session expiry — protected URL after logout should redirect to login
- Back button after logout should NOT restore session
- Duplicate entries where not allowed

---

## Run Commands

```bash
# Run all tests
mvn clean test

# Run specific test class
mvn clean test -Dtest=<Feature>TC

# Run by group
mvn clean test -Dgroups=sanity
mvn clean test -Dgroups=regression

# View Allure report
allure serve allure-results/

# View Extent report
open Reports/ExtentReport.html
```
