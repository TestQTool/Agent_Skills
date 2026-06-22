# Application Context Template

## Domain

web UI automation


## Environments

| Name | URL |
|------|-----|
| QA | ${BASE_URL} |

## Authentication

Record supported roles, auth flow, tokens/session handling, and test-data setup. Do not store real secrets.

## Modules

| Module | Description | Test File |
|--------|-------------|-----------|
| Login | Authentication flow | src/test/java/stepDefinitions/<Feature>Steps.java |

## Known Behaviors

Document validations, permissions, redirects, API schemas, mobile permissions, modals, retries, and data dependencies.
