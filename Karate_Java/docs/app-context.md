# API Application Context Template

## Environments

| Name | Base URL | Notes |
|------|----------|-------|
| QA | ${BASE_URL} | API test environment |

## Authentication

Document auth type: bearer token, basic auth, OAuth2, API key, session cookie, mTLS, or no auth. Do not store real secrets.

## API Modules

| Module | Base Path | Test File |
|--------|-----------|-----------|
| Users | /users | src/test/java/features/<feature>.feature |

## Known Contracts

Record status codes, error format, pagination, rate limits, required headers, idempotency behavior, schema versions, and test-data dependencies.
