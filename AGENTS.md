# Mission Surface prototype standards

These instructions apply to every prototype, capture source and public demo in this repository.

## Product boundary

- Build disposable, fixture-only experience-validation prototypes. Do not add authentication, production APIs, analytics, databases, credentials or enterprise data.
- Mission Surface is the catalogue and review surface. It reads this repository through a read-only GitHub App and never clones, builds, deploys or writes to it.
- Every child manifest declares exactly one `deliveryMode`: `live` or `screenshots`. A repository may mix modes.
- Every child declares `schemaVersion: 1`, `fidelity: simulated` and a non-empty `limitations` list. Display these limits wherever the prototype is reviewed.
- `approved` means: “The demonstrated experience has been approved as the target UX. It does not indicate production readiness, security approval, integration completeness or implementation approval.” Never imply otherwise.

## Shared metadata contract

- Store the root catalogue at `prototype.json` and each child at `prototypes/<prototype-key>/prototype.json`.
- Preserve stable `productKey`, `prototypeKey`, `repositoryKey` and manifest-path relationships.
- Root entries mirror each child’s `deliveryMode` and `formFactor`.
- Child pages are stable, case-sensitive review identifiers. Comments and live page events must use an exact `pages[]` value.
- Define optional page-specific Explain annotations as numbered percentage coordinates and plain-text content. Keep notes evaluative, toggleable and non-blocking.
- Validate with `npm run validate` from `demo/` before completion.

## Live / Public prototypes

- Use React, TypeScript and Vite unless an existing live prototype has another static-web stack.
- Keep `demoPath`, `entryRoute`, `pages` and `integration: { protocol: "mission-surface-prototype", version: 1 }` accurate.
- Use local fixture data only. Treat every Pages asset and route as publicly reachable.
- Use hash routing, a restrictive CSP and the parent-provided bridge channel. Post only the protocol, version, channel, prototype key, event type and an exact declared page.
- The public Pages output may contain live-mode application code only. Do not import screenshot-mode capture source or screenshot artifacts into `demo/`.
- The generated `mission-surface-deployment.json` must contain the GitHub build revision, Pages origin, protocol version, CSP and exact live prototype keys.

## Private / Images prototypes

- Declare exactly one screenshot descriptor for every page, in page order. Reject missing, duplicate and additional mappings.
- Keep artifacts within `prototypes/<prototype-key>/screenshots/`. Allow static PNG, JPEG and WebP only; never SVG, GIF or animation.
- Generate artifacts locally with `npm run capture:screenshots`. CI validates committed images and must not generate or modify them.
- Individual files are limited to 5 MiB, all repository screenshots to 25 MiB, dimensions to 4096 × 4096 and decoded pixels to 16,777,216.
- Capture tooling and source stay outside `demo/` and are never part of the public Pages bundle.

## Journey and review quality

- Provide a clear start, meaningful transitions and observable end state. Make every demonstrated primary action work.
- Optimise mobile prototypes for 320–430 px and laptop screenshots for a 1280–1440 px workspace.
- Mission Surface owns fullscreen, Explain, navigation overlays, comments and Product Hub request submission for both modes. Child demos must not collect or receive tenant, user, feedback, authentication or production data.

## Completion checks

- Run `npm run validate`, `npm run validate:screenshots` and `npm run build` from `demo/`.
- Confirm the public build contains only live-mode code and the starter ZIP matches `starter-template/`.
- Confirm all manifests, deployment metadata, routes, bridge pages, screenshots, annotations, fidelity disclosures and limitations are current.
