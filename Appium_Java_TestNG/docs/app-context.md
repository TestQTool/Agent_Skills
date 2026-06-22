# Application Context Template

## Domain

mobile automation for Android and iOS


## Mobile Apps

| Platform | Identifier | Notes |
|----------|------------|-------|
| Android | appPackage/appActivity | Configure externally |
| iOS | bundleId | Configure externally |

## Environments

| Name | URL |
|------|-----|
| QA | ${BASE_URL} |

## Authentication

Record supported roles, auth flow, tokens/session handling, and test-data setup. Do not store real secrets.

## Modules

| Module | Description | Test File |
|--------|-------------|-----------|
| Login | Authentication flow | src/test/java/tests/<Feature>MobileTest.java |

## Known Behaviors

Document validations, permissions, redirects, API schemas, mobile permissions, modals, retries, and data dependencies.
