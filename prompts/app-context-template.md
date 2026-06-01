# Client Application Context Template

## Application
- Name: [Application name]
- Domain: [Application domain, e.g. HR, finance, retail]
- Base URL: [https://example.com]
- Login URL: [https://example.com/login]

## Primary Roles
- [Admin]
- [User]
- [Manager]

## Key Modules
- [Login / Logout]
- [Dashboard]
- [Employee Management]
- [Leave / Time]
- [Admin Users]

## Login Flow
- Standard HTML form login
- Username field selector: `input[name="username"]`
- Password field selector: `input[name="password"]`
- Submit button selector: `button[type="submit"]`
- Notes: [e.g. no SSO / no Auth0 / special login behavior]

## Known Behaviors
- After login, the dashboard shows: [sidebar / top navigation / user menu]
- Search flow requires: [click search button / auto-search on enter]
- Page updates are dynamic / SPA-like / require waiting for XHR
- Stable selector recommendations: 'id' first priority, [input[name="..."] / button[type="..."] / .app-* classes]

## Authentication
- Example test role: [Admin]
- Admin login: [admin@example.com]
- Admin password: [Admin@123]
- Notes: [Only Admin can access user management / some flows require elevated role]

## Data rules
- IDs: [format rules, e.g. ORD-XXXX, EMP-XXXX]
- Field validation: [email format, required fields, numeric patterns]
- Business constraints: [unique username, non-empty name, date ranges]

## Important constraints
- Do not generate test cases for features not in the provided user stories.
- Only include modules that exist in the current application.
- Prefer stable (id) selectors over fragile CSS paths.

## Suggested scope for generation
- Critical smoke paths
- CRUD operations for key modules
- Invalid form validation and error flows
- Role-based access and authorization checks

## Additional notes
- [Any platform-specific browser notes]
- [Known performance or timing concerns]
- [Any special element selection guidance]
