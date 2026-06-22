# Mobile Application Context Template

## Applications

| Platform | App Identifier | Launch Info |
|----------|----------------|-------------|
| Android | appPackage / appActivity | Fill from project config |
| iOS | bundleId | Fill from project config |

## Environments

| Name | API/Base URL | Notes |
|------|--------------|-------|
| QA | ${BASE_URL} | Mobile backend environment |

## Devices

| Platform | Device | Version | Execution |
|----------|--------|---------|-----------|
| Android | Emulator/real device | configured | local/cloud |
| iOS | Simulator/real device | configured | local/cloud |

## Authentication

Record login flow, supported roles, biometric/OTP handling, deep links, and any test-data setup needs. Do not store real secrets.

## Modules

| Module | Description | Test File |
|--------|-------------|-----------|
| Login | Mobile authentication flow | tests/test_<feature>_mobile.py |

## Known Mobile Behaviors

Document permissions, alerts, keyboard behavior, scrolling containers, webviews, deep links, app resets, offline behavior, and platform-specific UI differences.
