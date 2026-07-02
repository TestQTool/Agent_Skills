# QA Automation - Karate Java API Automation Project Memory

## Goal

Generate a self-contained `karate-java` API automation framework that users can clone, configure, and run locally or in CI.

## Runtime Layout

```text
karate-java/
  pom.xml
  src/test/java/karate-config.js
  src/test/java/features/<feature>.feature
  src/test/java/helpers/<Feature>Helper.java
  src/test/java/runners/<Feature>Runner.java
  test-data/
  schemas/
  reports/
```

## Architecture

- Config owns base URLs, environment names, auth mode, and timeouts.
- Clients/helpers own request construction and reusable API calls.
- Tests/features own scenario orchestration and assertions.
- Schemas own JSON schema validation contracts.
- Test data owns payloads and environment-safe sample values.

## Non-Negotiable Rules

- Never commit real tokens, passwords, cookies, client secrets, or API keys.
- Use env vars or secure runtime config for auth.
- Validate status code, response body, schema, headers, and important business fields.
- Cover positive, negative, edge, auth, permission, contract, and performance-relevant cases when applicable.
- Make tests independent and safe for parallel CI execution.

## Runtime Command

```bash
mvn test -Dkarate.options="--tags @smoke"
```
