# App Context - Client Application

Fill this file when onboarding a new client. Read it before explore or generate tasks.

---

## Application Details

| Field | Value |
|-------|-------|
| App Name |  (e.g. OrangeHRM) |
| Base URL (QA) |  (e.g. https://qa.app.com) |
| Base URL (Dev) |  |
| Authentication |  (e.g. Form login, SSO, API) |
| Tech Stack (FE) |  (e.g. React, Angular) |
| Dynamic IDs | Yes / No |
| iFrames present | Yes / No |
| Shadow DOM | Yes / No |

---

## Roles and Credentials

Roles are defined in `test_data/credentials.csv` or the framework's configured credential provider. Use role-based helpers such as `get_login_data_by_role("Admin")`; never hardcode credentials.

| RoleName | Description |
|----------|-------------|
| Admin | Full system access |
| Manager | Department-level access |
| Employee | Self-service only |

---

## Key Modules / Feature Areas

| Feature Area | URL Path | Status |
|--------------|----------|--------|
| Login | /login | Template ready |
| Dashboard | /dashboard |  |
| Leave Management | /leave |  |
| Employee List | /viewEmployeeList |  |

---

## Known Quirks

- Document dynamic class names, random IDs, timing issues, and animation delays here.
- Note pages that need network-idle waits, explicit spinner waits, or JavaScript click fallbacks.
- Note modules with iframe wrappers or Shadow DOM.
