# Application Context Template

This file is a generic placeholder. Backend project configuration or a client-specific app context should replace these values during generation.

## Environments

| Name | URL |
|------|-----|
| QA | ${BASE_URL} |

## Authentication

Capture login URL, username selector, password selector, submit selector, landing-page verification, and supported roles. Do not store real passwords in prompt files.

## User Roles

| Role | Description |
|------|-------------|
| Admin | Full application access, if available |

## Application Modules

| Module | Description | Nav Label | Test File |
|--------|-------------|-----------|-----------|
| Login | Authentication flow | Login | step-definitions/<feature>Steps.ts |

## Known Behaviors

Record validation messages, redirects, modals, tables, workflows, role restrictions, data dependencies, and edge cases.

## Expected Local Run

```bash
npx cucumber-js --tags @smoke
```
