# Application Context Template

This file is a generic placeholder. Backend project configuration or a client-specific app context should replace these values during generation.

---

## Environments

| Name | URL |
|------|-----|
| QA | ${BASE_URL} |

---

## Authentication

Describe the login mechanism for the target application.

Required fields:
- Login URL
- Username/email selector, if known
- Password selector, if known
- Submit button selector, if known
- Landing page verification selector or URL, if known
- Supported roles from `test-data/credentials.csv`

Do not store real passwords in prompt files. Use role names and environment/test-data references.

---

## User Roles

| Role | Description |
|------|-------------|
| Admin | Full application access, if available |

---

## Application Modules

| Module | Description | Nav Label | Test File |
|--------|-------------|-----------|-----------|
| Login | Authentication flow | Login | Login.test.js |

---

## Known Behaviors

List application-specific validation messages, redirects, modals, tables, workflows, and edge cases here.

Examples:
- Empty required fields show a validation message.
- Invalid credentials show an authentication error.
- Protected URLs redirect to login when unauthenticated.
- Search with no results shows an empty state.

---

## CI/CD And Local Run Context

Expected local run:

```bash
cd playwright-js
npm install
npx playwright install
npm test
```

Use environment variables for machine-specific values:

```text
BASE_URL=<application url>
HEADLESS=true
TEST_ROLE=Admin
```
