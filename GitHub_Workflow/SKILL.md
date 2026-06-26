---
name: github-workflow
description: Common GitHub branch, commit, pull/latest-code sync, pull request, merge-readiness, and repository publishing skill for all generated automation frameworks. Use when pushing generated files, preparing commits, pulling the latest selected branch before generation, creating PRs, validating PR readiness, resolving merge risk, or deciding whether a branch can be merged.
---

# GitHub Workflow Skill

This skill is shared by all frameworks: Playwright JS, Selenium Java, RestAssured, Appium, and future automation frameworks.

The goal is to publish generated automation safely into a user's repository while preserving their existing work and producing a clean, reviewable branch or pull request.

---

## Core Responsibilities

Use this skill for:

- Creating or selecting the target branch for generated automation files.
- Pulling/syncing the latest code from the user's selected branch before script generation.
- Building clear commit messages.
- Pushing generated framework files and scripts.
- Creating pull requests.
- Updating existing pull requests.
- Checking merge readiness.
- Handling merge conflicts safely.
- Protecting user code from accidental overwrite.
- Reporting exactly what was pushed and how users can run it.

Specialized PR skills:

- Use `../GitHub_PR_Raise_Review/SKILL.md` when the user clicks Raise PR, Review PR, or Raise/Review PR.
- Use `../GitHub_PR_Merge/SKILL.md` when the user clicks Merge Request.

---

## Inputs You May Receive

- Target GitHub repository or saved GitHub config id.
- Source branch / target branch.
- Saved GitHub config `selectedBranch` from the UI.
- Generated files from a framework skill.
- Static framework files to bootstrap into the target repository.
- Existing target repository files from the pulled branch.
- Requirement IDs, test case IDs, work item IDs, or feature names.
- User preference: direct commit, branch only, pull request, or merge.
- CI/CD status if available.

---

## Branch Rules

Follow the backend's current branch naming convention for automation script generation, while preserving the user's UI-selected branch whenever they provide one.

Branch source precedence:

1. User-provided `targetBranch` / `branch` from the generation or push request.
2. Saved GitHub config `selectedBranch` chosen by the user in the UI.
3. Backend-generated automation branch.
4. Backend fallback branch when a PR source branch equals its base branch.

Default generated branch format from `AutomationScriptGenerationService.resolveAutomationBranch`:

```text
feature/<username>/gen-ts/<work-items>
```

Examples:

```text
feature/kishore/gen-ts/ADO-1234
feature/qa-user/gen-ts/101-102-103
feature/jane.doe/gen-ts/selected
```

Rules:

- If the user explicitly provides `targetBranch` / `branch`, use that branch after trimming and validation.
- If no request branch is provided but the GitHub config has `selectedBranch`, use that selected branch for repository reads, pull/sync, and push base decisions.
- If no branch is provided and no selected branch is available, build the generated branch from the caller username/full name/email and selected work item IDs.
- Use `selected` when no work item IDs are available.
- Normalize branch path segments before using them.
- Do not invent an unrelated branch convention such as `automation/<framework>/<feature>` unless backend code is intentionally changed to that convention.
- Never commit generated automation directly to `main`, `master`, or `production` unless the user explicitly requests it and repository policy allows it.
- Prefer a dedicated generated feature branch and PR.
- If the requested branch already exists, update it only after reading existing files and preserving unrelated changes.
- If creating a PR and the source branch equals the base branch, backend currently creates a fallback branch using `qentrix/workflow-builder-<n>` via `GitHubService.nextWorkflowBuilderBranchName`.
- Use the configured target/base branch when provided; otherwise prefer the repository default branch.

Known backend conventions to preserve until code is changed:

```text
Automation scripts default: feature/<username>/gen-ts/<work-items>
Selected branch override: request targetBranch/branch, then GitHub config selectedBranch
PR same-branch fallback: qentrix/workflow-builder-<n>
RestAssured generated branch helper: qentrix/restassured-agent-<n>
```

---

## Pull / Sync Rules

When the user clicks the repository sync button, pull the latest code from the exact branch selected in the GitHub UI.

Backend behavior to preserve:

- `GitHubConfig.selectedBranch` is the user's UI-selected branch.
- Repository sync must use `selectedBranch` when present; otherwise use the repository default branch or `main` fallback.
- For an existing local working copy, sync should run equivalent to:

```bash
git fetch origin <selectedBranch>
git checkout <selectedBranch>
git pull --ff-only origin <selectedBranch>
```

- If no local working copy exists yet, create/initialize the local working copy for the selected branch first, then treat future refreshes as pulls/syncs.

Generation rules:

- Before generation that depends on target repository contents, static framework merge state, existing fixtures, package files, or previous generated files, pull/sync the latest selected branch first.
- If sync is `PENDING`, `PULLING`, or otherwise in progress, return a pending/retryable response or wait according to backend workflow; do not generate from stale repository context.
- If sync is `FAILED`, block generation and surface the sync error.
- If sync is complete, use the synced repository path as the repository context for file discovery and merge decisions.
- Do not silently replace the UI-selected branch with a generated branch.
- Do not generate scripts against one branch and push them to another branch unless the response clearly reports both the source branch and target branch.
- If generation is intentionally using only test inventory plus static framework context and not local repo contents, report that repository sync context was not used.

---

## Commit Message Rules

Commit messages must be deterministic, concise, and tied to the generated work.

Recommended format:

```text
feat(<framework>): add automation scripts for <feature-or-workitem>
```

Examples:

```text
feat(playwright): add automation scripts for login
feat(playwright): add automation scripts for ADO-1234
fix(playwright): update fixture wiring for generated tests
chore(playwright): bootstrap static framework files
```

Rules:

- Do not use vague messages like `update`, `changes`, `generated files`, or `automation`.
- Include requirement IDs or test case IDs when available.
- Use `feat` for new generated automation, `fix` for correction/healing, `chore` for framework bootstrap/config-only changes.
- Do not hardcode one global commit message in backend code; build it from framework, feature, requirement/test case IDs, and operation type.

---

## File Merge Rules

Before pushing files:

1. Read existing target files when they exist.
2. Preserve unrelated user changes.
3. Copy missing static framework files only when absent or when explicitly requested to refresh framework files.
4. Overlay generated feature files from the framework agent.
5. Merge wiring files instead of replacing them blindly:
   - `package.json`
   - `pom.xml`
   - `testFixtures/fixture.js`
   - config files
   - CI workflow files
6. Never push Agent_Skills prompt files to the user repo.
7. Never push backend-only local paths, tokens, PATs, API keys, secrets, or machine-specific config.
8. Keep generated paths inside the selected framework root.

Framework root examples:

```text
playwright-js/
selenium-java/
RestAssured_java/
appium/
```

---

## Pull Request Rules

When creating a PR:

- Title must describe the automation change clearly.
- Description must list generated/updated framework areas.
- Include run commands for the user's machine.
- Include linked requirement IDs, test case IDs, or work item IDs when available.
- Include warnings if selectors were generated without exploration.
- Include whether static framework files were bootstrapped.

PR title format:

```text
Add <framework> automation for <feature-or-workitem>
```

PR description template:

    ## Summary
    Adds generated <framework> automation for <feature-or-workitem>.

    ## Generated Files
    - <path>
    - <path>

    ## Framework Bootstrap
    - Static framework files copied: Yes/No
    - Wiring files updated: package/config/fixture/etc.

    ## Source Inputs
    - Requirements: <ids or None>
    - Test cases: <ids or None>
    - Repository sync context: Used/Not used
    - Exploration context: Present/Not present

    ## Local Run
    ```bash
    <commands>
    ```

    ## Validation
    - Backend validation: Passed/Failed/Not run
    - CI status: Passing/Failing/Pending/Unknown

    ## Notes
    <any warnings or follow-up actions>

---

## Merge Readiness Checks

A branch or PR is ready to merge only when:

- Latest selected branch was pulled/synced before generation when repository context was needed.
- No unresolved merge conflicts exist.
- Generated files stay inside the expected framework root.
- No secrets or credentials are committed.
- Static framework bootstrap is complete when the repo did not already contain the framework.
- Wiring files are merged correctly.
- Local run commands are provided.
- CI is passing, or CI is unavailable and the PR states that validation was not run.
- Human approval exists for protected branches or production targets.

Block merge when:

- Conflicts are unresolved.
- CI is failing.
- Generated output overwrites unrelated user code.
- Secrets are present.
- Branch targets `main`, `master`, or `production` without explicit approval.
- Framework runtime files are missing and the user expects one-click local execution.

---

## Merge Conflict Handling

When a conflict is detected:

1. Do not force-push over user changes.
2. Identify conflicted files and classify them:
   - generated feature file
   - framework wiring file
   - static framework file
   - user-owned custom file
3. Preserve user-owned content by default.
4. For generated feature files, prefer the latest generated content only if the file is clearly generated.
5. For wiring files, merge both sides carefully.
6. If conflict intent is ambiguous, return a conflict report instead of guessing.

Backend AI-resolution flow:

1. Confirm Git is executable on the runtime host. If a configured absolute Git path is invalid for the OS, use `git` from `PATH`.
2. Fetch source and target branches from origin.
3. Checkout/reset local source branch to `origin/<sourceBranch>`.
4. Attempt a normal merge from `origin/<targetBranch>` into the source branch.
5. If conflict files exist, resolve only those conflicted files with AI.
6. AI receives the complete conflicted file content with markers and must output complete resolved file content only.
7. Backend validates that conflict markers are gone before staging.
8. Backend commits with a deterministic conflict-resolution message and pushes the source branch.
9. Backend rechecks PR mergeability before allowing merge.

Do not use `-X ours` or `-X theirs` as the default merge conflict strategy. Those options may discard user or target branch changes. Use them only if a future explicit policy says a file category is safely generated-only and disposable.

AI conflict resolution must preserve:

- user-owned custom code by default
- target branch updates that do not conflict with generated automation changes
- latest generated tests/pages/steps when the file is clearly generated
- framework wiring from both sides for `pom.xml`, `package.json`, suite XML, config files, fixtures, listeners, and CI files

AI conflict resolution must reject:

- output containing conflict markers
- blank output
- secrets, tokens, API keys, local machine paths, backend paths, or prompt/skill files
- unrelated files outside the selected framework root

If AI cannot safely resolve a file, return `merge_blocked` with a conflict report. Never report a merge success unless GitHub confirms the merge.

Conflict report format:

```json
{
  "status": "conflict_requires_attention",
  "conflicts": [
    {
      "path": "playwright-js/package.json",
      "type": "wiring_file",
      "recommendedAction": "merge scripts and preserve existing dependencies"
    }
  ]
}
```

---

## Output Contract

Return structured output whenever possible:

```json
{
  "status": "branch_prepared | pr_created | pr_updated | merge_ready | merge_blocked",
  "repository": "owner/repo",
  "branch": "feature/kishore/gen-ts/ADO-1234",
  "baseBranch": "develop",
  "selectedBranch": "develop",
  "branchSource": "request | selectedBranch | generated | fallback",
  "syncStatus": "not_used | pending | pulling | synced | failed",
  "syncPath": "C:/path/to/synced/repo",
  "commitMessage": "feat(playwright): add automation scripts for login",
  "pullRequestUrl": "https://github.com/owner/repo/pull/123",
  "filesChanged": ["playwright-js/tests/Login.test.js"],
  "runCommands": ["cd playwright-js", "npm install", "npx playwright install", "npm test"],
  "warnings": [],
  "mergeDecision": "ready | blocked | human_approval_required"
}
```

---

## Hard Rules

- Never overwrite unrelated user files.
- Never commit secrets.
- Never silently merge conflicts.
- Never report stale PRs as the current run when the current push produced zero files.
- Never mark conflict review/merge as successful unless the PR is actually clean or GitHub merge API confirms success.
- Never direct-merge to protected or production branches without approval.
- Never rely on hardcoded backend commit messages when context is available.
- Always report what changed, which branch was used, whether pull/sync context was used, and how to run it.
- Always prefer branch plus PR for generated automation.
