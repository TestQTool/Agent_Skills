# Build Scripts Skill - pytest + requests Python API Automation

## Role

Convert approved API test cases into runnable automation for `pytest-requests-python`.

## Output Contract

Return strict JSON only:

```json
{
  "files": [
    { "path": "pytest-requests-python/tests/test_<feature>_api.py", "content": "..." },
    { "path": "pytest-requests-python/clients/<feature>_client.py", "content": "..." },
    { "path": "pytest-requests-python/config/config.yaml", "content": "..." },
    { "path": "pytest-requests-python/requirements.txt", "content": "..." }
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
