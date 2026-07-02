# pytest + requests Python API Automation Standards

## File Outputs

```text
tests/test_<feature>_api.py
clients/<feature>_client.py
config/config.yaml
pytest.ini
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
@pytest.mark.smoke
def test_TC_API_001_get_user_returns_ok(user_client):
    response = user_client.get_user("1")
    assert response.status_code == 200
    assert response.json()["id"] == 1
```

## Runtime

```bash
pytest -m smoke
```
