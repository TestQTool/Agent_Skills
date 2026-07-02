# Run-Ready API Framework Skill

Verify the generated `karate-java` framework is cloneable and runnable.

## Required Files

```text
pom.xml
src/test/java/karate-config.js
src/test/java/features/<feature>.feature
src/test/java/helpers/<Feature>Helper.java
schemas/
test-data/
```

## Checks

- Dependencies are declared.
- Base URL and auth are environment-driven.
- Smoke tests can run without real secrets committed.
- Reports are generated.
- Destructive tests are tagged and opt-in.

## Output Contract

```json
{
  "files": [],
  "missingStaticFiles": [],
  "runCommands": ["mvn test", "mvn test -Dkarate.options=\"--tags @smoke\""],
  "warnings": []
}
```
