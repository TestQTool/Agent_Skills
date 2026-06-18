# App Context — Client Application

> Fill this file when onboarding a new client.
> The agent reads this before explore or generate tasks.

---

## Application Details

| Field              | Value                        |
|--------------------|------------------------------|
| App Name           |  (e.g. OrangeHRM)            |
| Base URL (QA)      |  (e.g. https://qa.app.com)   |
| Base URL (Dev)     |                              |
| Authentication     |  (e.g. Form login, SSO, API) |
| Tech Stack (FE)    |  (e.g. React, Angular)       |
| Dynamic IDs        |  Yes / No                    |
| iFrames present    |  Yes / No                    |
| Shadow DOM         |  Yes / No                    |

---

## Roles and Credentials

Roles are defined in `test-data/credentials.csv`.
Use `getLoginDataByRole("Admin")` — never hardcode.

| RoleName  | Description             |
|-----------|-------------------------|
| Admin     | Full system access       |
| Manager   | Department-level access  |
| Employee  | Self-service only        |

---

## Key Modules / Feature Areas

List the main feature areas the agent will automate.
Add a row per feature when a new module is onboarded.

| Feature Area     | URL Path          | Status         |
|------------------|-------------------|----------------|
| Login            | /login            | Template ready |
| Dashboard        | /dashboard        |                |
| Leave Management | /leave            |                |
| Employee List    | /viewEmployeeList |                |

---

## Known Quirks

- Document any dynamic class names, random IDs, or timing issues here
- Note any pages that need `waitForNetworkIdle()` instead of `waitForPageLoad()`
- Note any modules with iFrame wrappers
