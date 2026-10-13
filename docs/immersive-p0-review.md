# Immersive P0 — review, not production

## Scope and design

Five connected acts are implemented in the existing HTML/CSS/JavaScript site: automatic drawn calligraphy with a replay control; scroll-directed snake contour study and pink flower fill; moonlit plum garden with four silhouette-masked photographs; one bounded sticky photographic stack on desktop; the preserved artist, service finder and GlossGenius booking path. On small screens, without JavaScript, or with reduced motion, the photobook is a regular sequence of photos.

The visual direction is **moonlit ink garden**. Book-page-flip and full-screen video alternatives were considered and rejected because independent illustration/photograph layers fit the source material and native scrolling better. Original photo pixels and media archive files remain unchanged. No new raster AI imagery was needed.

## Live resource provenance

Read the current StarrTree Motherboard's Start Here, Resources, Inspiration Board, GitHub Deep Dives and Design Language Matrix tabs on October 13, 2026.

| Reference | Transferred principle | Implementation |
| --- | --- | --- |
| [Blueprint Ink Reveal — Kedhareswer Naidu](https://21st.dev/@kedhareswer/components/blueprint-ink-reveal) | ink gradually replaces an outlined treatment | Independently authored SVG calligraphy with staggered stroke reveal, two restrained drops, replay; no source code copied |
| [Portfolio Scroll Grid — Ruixen](https://21st.dev/@ruixen.ui/components/portfolio-scroll-grid) | stable editorial typography against moving photography | Sticky desktop photobook text and layered photographs; native static gallery follows |
| [Choreographed Grid Gallery — Brik Team](https://brik.space/toolviewer?slug=choreographed-grid-gallery-ms2ycukb) | intentional sequence, offset and tilt | Three ordered photo pages, limited perspective rotation, no wheel interception |

These are reconstructed combinations, not claims that the source components were installed or tested in this stack. Resource metadata and documentation were reviewed; interactive demo behavior was not verified in-browser. The Matrix's Living Ink Editorial combination was marked untested, so this implementation still needs its own visual review.

## Motion architecture

GSAP ScrollTrigger was evaluated against native scroll plus CSS sticky. The existing dependency-free site only needs a few normalized progress values, so `app.js` uses one requestAnimationFrame controller, passive scroll/resize listeners, SVG dash offsets, fill opacity and compositor-friendly transforms. No framework, shader library, font service or animation dependency was added. IntersectionObserver is retained for local gallery arrival effects.

The photobook alone is sticky (desktop only, bounded 250svh section). Covered pages are inert and removed from the accessibility tree; every image remains available in the following gallery or as a static photobook page. Native scrolling is never intercepted. The main booking action remains in the sticky header, with a mobile booking bar and preserved service finder. Motion pauses for background tabs. System reduced motion and the explicit motion button both settle illustrations and expand the photobook into ordinary document flow.

## Verification completed

- `python scripts/check-site.py`: passed IDs, in-page links, local files, gallery sources, JS targets, SVG XML and reduced-motion rule checks.
- `node --check app.js`: passed syntax validation.
- Original files compared byte-for-byte with the baseline: no media archive changes.
- Baseline desktop screenshot captured from the live GitHub Pages site: `evidence/before-desktop.jpg`.
- Corrected a visually verified pre-existing caption error: `pixel-cat.jpeg` contains a skeleton tattoo, not a cat. Kept the original filename; changed only the displayed title, category and alt text.

## Required before approval

Browser after screenshots, desktop/tablet/mobile interaction checks, touch behavior, keyboard focus testing, reduced-motion switching, mask/hair edge inspection and real performance measurement are **not yet verified**. Local file navigation is disallowed in the cloud browser. A preview deployment to the existing StarrTree Vercel `jz` project was blocked by automatic approval review because sending source and images to Vercel lacked explicit destination authorization. No preview deployment was created by this turn, and no production deployment was requested.

Authorize a **Vercel Preview** for this branch, then test the opening at 390/768/desktop widths, scroll the trace and flower fill, inspect the night cutouts on plum, verify all three book pages, exercise gallery filters/lightbox arrows/Escape/focus return, change session options, and verify external booking destinations without making a reservation. Capture before/after evidence at matching dimensions. Use real touch only if a touch surface is available; otherwise report simulated narrow viewport checks honestly.

Do not merge this branch or promote a production deployment until the preview is approved. The implementation is a concrete review candidate, not a completed acceptance gate.
