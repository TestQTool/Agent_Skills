# Build Scripts Skill - Appium Java TestNG Framework

## Role

Convert approved test cases into runnable Java TestNG automation for `appium-java-testng`.

## Output Contract

Return strict JSON only:

```json
{
  "files": [
    { "path": "appium-java-testng/src/main/java/pageObjects/<Feature>MobileObjects.java", "content": "..." },
    { "path": "appium-java-testng/src/main/java/screens/<Feature>Screen.java", "content": "..." },
    { "path": "appium-java-testng/src/test/java/tests/<Feature>MobileTest.java", "content": "..." },
    { "path": "appium-java-testng/testng.xml", "content": "..." },
    { "path": "appium-java-testng/pom.xml", "content": "..." }
  ],
  "notes": []
}
```

## Rules

- JSON only.
- Preserve existing files when supplied.
- Add TestNG groups and DataProviders without removing existing coverage.
- Do not hardcode credentials, tokens, local paths, device IDs, or app paths.
- Do not put selectors/endpoints inside TestNG test classes.
- Every test method must include TC-ID and a TestNG group.

Run:

```bash
mvn test -Dgroups=smoke -DplatformName=Android
```

iOS run:

```bash
mvn test -Dgroups=smoke -DplatformName=iOS
```
