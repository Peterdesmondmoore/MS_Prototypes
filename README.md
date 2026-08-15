# Mission Surface dual-mode prototype starter

This starter contains one fixture-only live mobile example and one screenshot-delivered laptop example. Replace the sample content and all `replace-with-*` identities while preserving the root/child relationships.

From `demo/` run:

```bash
npm install
npm run capture:screenshots
npm run validate
npm run validate:screenshots
npm run build
```

The public Vite bundle must import only live-mode code. Capture source and screenshot artifacts stay outside `demo/`. CI validates committed screenshots but never generates them.

Every child is a **Simulated experience** and must list its limitations. `approved` means the target UX is approved; it does not indicate production readiness, security approval, integration completeness or implementation approval.

See `AGENTS.md`, `schemas/` and `docs/demo-notes.md` before changing the contract.
