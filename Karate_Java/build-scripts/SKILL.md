# Build Scripts Skill - Karate Java API Automation

## Role

Convert approved API test cases into runnable automation for `karate-java`.

## Output Contract

Return strict JSON only:

```json
{
  "files": [
    { "path": "karate-java/src/test/java/features/<feature>.feature", "content": "..." },
    { "path": "karate-java/src/test/java/helpers/<Feature>Helper.java", "content": "..." },
    { "path": "karate-java/src/test/java/karate-config.js", "content": "..." },
    { "path": "karate-java/pom.xml", "content": "..." }
  ],
  "notes": []
}
```

## Rules

- JSON only.
- Preserve existing files when supplied.
- Do not hardcode secrets or base URLs.
- Add schema fixtures and payload files when needed.
- Include positive, negative, contract, auth, and permission assertions.
- Every generated test must have a TC-ID and suite tag/marker.
