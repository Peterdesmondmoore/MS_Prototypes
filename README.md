# Mission Surface dual-mode prototype starter

This starter contains one fixture-only live mobile example and one screenshot-delivered laptop example. Keep these baseline samples intact; add product prototypes with new identities while preserving the root/child relationships.

The included `mobile-sample` and `laptop-sample` prototypes are protected **Mission Surface baseline samples**, identified by `isSample: true` in both the root catalogue and child manifests. Mission Surface must classify them as samples, not product prototypes. Do not modify or regenerate these baselines during unrelated prototype work; create a new prototype key and directory instead. A baseline may change only when that baseline change is explicitly requested.

From a PowerShell terminal at the repository root, run:

```powershell
.\prepare-images.ps1
```

The script installs the locked `demo/` dependencies, captures screenshots, runs the repository-local manifest and screenshot validators, builds the live prototype, and finishes with `git status --short`. Review the resulting files before deliberately committing and pushing them. The script never commits, pushes, creates a repository, or changes Git remotes.

The public Vite bundle must import only live-mode code. Capture source and screenshot artifacts stay outside `demo/`. CI validates committed screenshots but never generates them.

Every child is a **Simulated experience** and must list its limitations. `approved` means the target UX is approved; it does not indicate production readiness, security approval, integration completeness or implementation approval.

See `AGENTS.md` and `schemas/` before changing the contract. Explain annotation coordinates identify pointer anchors; Mission Surface renders their fixed callouts and interactive hotspots consistently across all prototypes.
