# Mission Surface dual-mode prototype starter

This starter contains one fixture-only live mobile example and one screenshot-delivered laptop example. Replace the sample content and all `replace-with-*` identities while preserving the root/child relationships.

From a PowerShell terminal at the repository root, run:

```powershell
.\prepare-and-validate.ps1
```

The script installs the locked `demo/` dependencies, captures screenshots, runs the repository-local manifest and screenshot validators, builds the live prototype, and finishes with `git status --short`. Review the resulting files before deliberately committing and pushing them. The script never commits, pushes, creates a repository, or changes Git remotes.

The public Vite bundle must import only live-mode code. Capture source and screenshot artifacts stay outside `demo/`. CI validates committed screenshots but never generates them.

Every child is a **Simulated experience** and must list its limitations. `approved` means the target UX is approved; it does not indicate production readiness, security approval, integration completeness or implementation approval.

See `AGENTS.md`, `schemas/` and `docs/demo-notes.md` before changing the contract.
