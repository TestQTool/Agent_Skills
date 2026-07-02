# Karate Java API Automation Standards

## File Outputs

```text
src/test/java/features/<feature>.feature
src/test/java/helpers/<Feature>Helper.java
src/test/java/karate-config.js
src/test/java/runners/<Feature>Runner.java
```

## API Automation Rules

- Use environment-driven `baseUrl` / `BASE_URL`.
- Keep request builders/clients reusable and thin.
- Keep assertions close to tests unless a shared contract helper is appropriate.
- Validate status code, response fields, schema, headers, and error response shape.
- Use unique test data or cleanup hooks for write operations.
- Tag/mark every test with TC-ID and suite: smoke, regression, contract, security, or performance.

## Example

```text
Feature: User API
  @smoke @TC-API-001
  Scenario: Get user details
    Given url baseUrl
    And path '/users/1'
    When method get
    Then status 200
```

## Runtime

```bash
mvn test -Dkarate.options="--tags @smoke"
```
