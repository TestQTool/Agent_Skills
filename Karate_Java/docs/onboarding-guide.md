# Karate Java API Automation Onboarding Guide

## Skill Set

| Skill | Purpose |
|-------|---------|
| `generate-tests` | Generate exactly 30 API test cases |
| `build-scripts` | Convert approved cases into runnable API automation |
| `explore` | Discover endpoints, auth, schemas, and sample responses |
| `heal` | Repair broken endpoints, assertions, or schema expectations |
| `run-ready-framework` | Verify clone-and-run readiness |

## Expected Run

```bash
mvn test -Dkarate.options="--tags @smoke"
```

## Safety

- Keep secrets in environment variables or CI secret stores.
- Do not store real production data in test-data files.
- Mark destructive tests and require explicit opt-in.
- Separate smoke, regression, contract, security, and performance tags/markers.
