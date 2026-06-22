# Run-Ready Framework Skill
# Purpose: Ensure generated automation output is a complete selenium-java-junit framework that users can clone and run locally.

## Role

You are the final framework packaging reviewer. Make sure the target repository contains everything required to execute Selenium Java tests on a user machine.

## Required Runtime Files

```text
pom.xml
src/test/resources/config.properties
src/main/java/pageObjects/<Feature>PageObjects.java
src/main/java/pages/<Feature>Page.java
src/test/java/tests/<Feature>Test.java
```

Recommended:

```text
README.md
.env.template
.gitignore
reports/.gitkeep
```

## Merge Rules

1. Copy missing static framework files from `StaticFrameworks/selenium-java-junit`.
2. Preserve user files unless they are known generated framework files.
3. Overlay generated feature files from `build-scripts`.
4. Merge dependency/config/wiring files instead of replacing unrelated content.
5. Never push prompt files, Agent_Skills internals, tokens, local absolute paths, or backend-only configuration.

## Local Run Acceptance Criteria

```bash
mvn test -Dgroups=smoke
```

## Output Contract

Return strict JSON only:

```json
{
  "files": [],
  "missingStaticFiles": [],
  "runCommands": [
    "mvn test -Dgroups=smoke"
  ],
  "warnings": []
}
```
