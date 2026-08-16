# Explain annotation interaction standard

Mission Surface owns the rendering and interaction of Explain annotations for both live and screenshot prototypes. Prototype manifests provide content and an anchor point; they do not implement their own annotation UI.

## Manifest meaning

Each annotation item contains:

- `number`: the visible callout identifier, unique within the page.
- `x` and `y`: the pointer anchor as percentages of the reviewed page, not the position of the text box.
- `content`: plain-text evaluative guidance shown inside the callout.

The `page` value must exactly match a value in the child manifest's `pages` array.

## Required rendering

- Render the annotation content in a fixed callout box outside the scrolling prototype content, with a leader or thought-bubble pointer aimed at `(x, y)`.
- Keep the callout box stable while the embedded prototype scrolls. Recalculate only the pointer endpoint so it continues to identify the page location when that location is visible.
- Automatically place the box to avoid covering its anchor, clipping at the review viewport edge or unnecessarily obscuring primary content.
- If an anchor scrolls outside the visible prototype viewport, hide or edge-clamp its pointer rather than moving the callout with the prototype content.
- Treat callouts as review overlays. They must not change prototype layout or be included in screenshot artifacts.

## Explain selected

- Show all callout boxes for the current page and their pointers.
- Keep callouts readable without requiring hover.
- Allow a reviewer to dismiss or collapse an individual callout without changing the manifest.

## Explain not selected

- Do not show callout boxes by default.
- Retain an invisible interactive hotspot at each anchor.
- Shade the hotspot on pointer hover or keyboard focus so it becomes discoverable.
- Reveal the associated callout on hover, focus or activation.
- Make hotspots keyboard-focusable and expose an accessible name containing the annotation number. Do not require hover as the only way to reveal content.
- Dismiss a transient callout when focus or hover leaves it, on Escape, or when the reviewer activates the hotspot again.

## Ownership boundary

This repository validates and publishes annotation metadata. The Mission Surface catalogue/review application must implement the callout boxes, pointers, hotspots, collision handling, keyboard behavior and accessibility semantics consistently for every prototype.
