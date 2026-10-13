# JZ INKZ — The Living Sketchbook

Status: selected art direction; implementation handoff, not a deployed website. Prepared 2026-10-13.

## Approved hierarchy

The user's direction replaces the previous equal-weight concept synthesis: “Primary inspiration: Concept 2” and “Real photography blending into animated tattoo-style illustrations.” No further image mockups are requested.

Concept 2 owns the romantic editorial identity: warm ivory paper, dusty pink, delicate black botanical linework, oversized flowers and a portrait becoming part of the drawing. Concept 1 contributes the composition system: real tattooed limbs entering from viewport edges, strong hierarchy and section structure. Do not turn this into an all-black gothic template or pastel salon.

Audience: prospective tattoo clients and people discovering JZ's broader art. Primary conversion: booking through GlossGenius. Booking URL shown in supplied screenshots is https://jzinkz.glossgenius.com/ ; verify it before shipping. Artist biography, location, service prices and availability are not supplied and must not be invented. Tattoos visible on JZ's own body are not automatically work she created.

## Composition and movement — StarrTree synthesis

| Section | Photography and composition | Proposed interaction | Static / mobile behavior |
|---|---|---|---|
| Hero | Golden-hour portrait, with candle portrait as an alternate. Plum-black atmosphere; blush editorial title; large lily behind shoulder and a few fine lines in front. Keep face and visible tattoo details untouched. | First reveal: portrait opacity 0→1 in 600ms; flower line drawing 900ms. On hero scroll, portrait translates at most 20px, decorative flower 36px. No face warping or pixel displacement. | Full composition visible with reduced motion; no sticky hero on short screens. Text and booking remain outside photo overlap. |
| Living paper gallery | Ivory; centipede enters from upper right, lilies from lower left, stars foot from right with ankle beyond crop. Standard full photos remain available for close inspection. | Entering limbs travel at most 32px and rotate at most 2°. Gallery entries reveal once in reading order, 60ms stagger capped at 240ms. | Single/dual column at narrow widths; no lateral overflow or scroll locking. All tattoos available without animation. |
| Meet JZ | Mosaic or golden-hour portrait; handwritten annotation as accent, readable body text separately. Branching neck photograph can bridge into nearby decorative lines. | One botanical line draws outward when section is 25% visible; portrait stays legible and still. | No animation dependency. Original photo preserved in gallery where appropriate. |
| Services / booking | Simple ivory cards, berry buttons, real content only. | Small underline/focus transition, 150ms. | Conventional tap targets and keyboard behavior. |
| Beyond Ink | Purple cauldron portrait and candle image; short cinematic dark interval. | Gentle opacity transition only until actual video/music is supplied. | Do not autoplay sound, fabricate media or give this greater prominence than booking. |

Palette proposal: paper #F6F0E7; blush #E8BACB; rose #BB7D94; berry #793650; ink #211B20; plum #261A26. These are art-direction tokens, not a tested contrast system. Body text uses ink on paper; never pink-on-pink for important text.

## Context cluster from the live UI Motherboard

The canonical [StarrTree AI Resource Motherboard](https://docs.google.com/spreadsheets/d/1ljrT6D9KpRr_KS5Eque_W9T88H4tqOjvUUiXWEubDeQ/edit) was read live during this task on 2026-10-13: Start Here, Inspiration Board, Resources and GitHub Deep Dives. The Sheet was not edited. These are implementation precedents proposed within the already selected identity, not new competing website concepts. Descriptions below are paraphrases, not original creator prompts.

| Precedent / stable identity | Source row | Evidence and role |
|---|---|---|
| [Blueprint Ink Reveal — Kedhareswer Naidu](https://21st.dev/@kedhareswer/components/blueprint-ink-reveal) | [Inspiration Board row 5](https://docs.google.com/spreadsheets/d/1ljrT6D9KpRr_KS5Eque_W9T88H4tqOjvUUiXWEubDeQ/edit#gid=1332265912&range=A5:W5) | Outline-to-solid typography with organic reveal. Official page retrieved; lists MIT. Full component source not retrieved. Use its ink-reveal idea for one short heading, not page-wide cursor effects. |
| [Portfolio Scroll Grid — Ruixen](https://21st.dev/@ruixen.ui/components/portfolio-scroll-grid) | [Inspiration Board row 12](https://docs.google.com/spreadsheets/d/1ljrT6D9KpRr_KS5Eque_W9T88H4tqOjvUUiXWEubDeQ/edit#gid=1332265912&range=A12:W12) | Sheet records CSS-sticky center and staggered gallery columns. Current public page retrieval failed. Treat as composition lead, not verified reusable code or license. Reimplement the simple layout natively. |
| [Choreographed Grid Gallery — Brik](https://brik.space/toolviewer?slug=choreographed-grid-gallery-ms2ycukb) | [Inspiration Board row 17](https://docs.google.com/spreadsheets/d/1ljrT6D9KpRr_KS5Eque_W9T88H4tqOjvUUiXWEubDeQ/edit#gid=1332265912&range=A17:W17) | Sheet records stagger, tilt and directional gallery entry. Demo/source not independently inspected. Inspiration only: use reading-order reveals, not randomized movement. |

## Code scouting and combination decision

**Chosen baseline:** semantic HTML, CSS sticky/grid/masks, custom SVG botanical paths, IntersectionObserver and a single requestAnimationFrame scroll coordinator. No framework dependency is required for these mechanics. If the later site uses React, keep DOM ownership inside React and clean up observers/listeners on unmount. No third-party effect code is copied in this checkpoint.

**Optional candidate, not installed:** [Paper Shaders](https://github.com/paper-design/shaders), from Resources row 8 and GitHub Deep Dives row 6. Official [docs](https://shaders.paper.design/), README, LICENSE, React package manifest and paper-texture shader source were retrieved on 2026-10-13. React wrapper observed at 0.0.81, peer React ^18 or ^19; matching core dependency 0.0.81. License file is Apache-2.0. Pin versions if installed and retain required notices. Shader source uses GLSL 300 es, requiring WebGL2. Source inspection is not a runtime compatibility test.

Use Paper Texture only as a quiet decorative background if native texture proves insufficient. Never apply its image distortion to JZ or the tattoo portfolio. At most one canvas/context, cap device pixel ratio at 1.5, pause offscreen and while document is hidden, and fall back to a static ivory texture. iOS Safari and low-power behavior remain untested.

Three complementary treatments considered: (1) ink-drawn typography as a brief accent; (2) native sticky paper gallery as the main experience; (3) shader-washed paper as an optional enhancement. Choose 1+2 first, defer 3 until measured. These preserve the chosen concept rather than restarting concept selection.

Not selected: liquid-glass effects (wrong material language and extra capture/rendering cost); a full liquid-logo showcase application (unnecessary application footprint and different license constraints in Motherboard notes); React Three Fiber or full fluid simulation (no genuine 3D need). These rejections are project judgments, not fresh audits of every repository.

## Acceptance criteria and proposed budgets

- Photos and original tattoo linework remain unchanged; no invented portfolio work, biography, prices, location or testimonials.
- Every hard body crop meets a section/viewport boundary. No disembodied flat-cut limbs floating mid-page.
- Booking is visible in the hero and navigation, keyboard reachable and never occluded by artwork.
- Reduced motion disables parallax, drawing and tilt; never leaves content hidden. Touch does not require hover. No custom cursor is necessary.
- Normal page scrolling remains native. Tab order follows reading order; photo enlargement has a labelled close control, Escape behavior and focus restoration.
- Test at 390px, 768px and 1440px; actual iOS Safari required before release. No horizontal overflow, touch trap, text/image collision or focus obstruction.
- Proposed production budgets, not measurements: initial transfer under 1.5MB, hero derivative under 350KB, lazy gallery images, width/height on all images, no WebGL in baseline. Aim for LCP under 2.5s and CLS under 0.1, then measure on a deployed build.

## Build sequence

1. Preserve originals and manifest; audit true alpha and photo roles.
2. Produce only the needed transparent derivatives and decorative flower layers; review over both paper and plum.
3. Build static hero, gallery, Meet JZ and booking journey using authentic assets.
4. Add native line drawing, bounded edge movement and gallery reveals.
5. Test keyboard, reduced motion, mobile crops and performance; only then evaluate a decorative shader.

## Portable build prompt — StarrTree reconstructed prompt

Implement JZ INKZ's Living Sketchbook from this repository. Concept 2 is primary: ivory sketchbook paper, girly blush and dusty rose, fine black botanical illustrations, elegant editorial typography, and JZ's real portrait transitioning into oversized lilies. Borrow Concept 1's tattoo-photo edge compositions only. Use media/manifest.json and docs/asset-production.md. Preserve all original photographs and recognizable tattoos; work only in separate derivatives. Preserve the deliberately faded back-linework asset. Do not mistake white JPEG backgrounds for transparency. Make the hero selectively dark, the gallery mostly warm paper, Meet JZ personal, booking clear, and Beyond Ink secondary. Implement the bounded motion table above with static and reduced-motion fallbacks. Prefer native CSS/SVG and one animation coordinator; do not install entire showcase apps or multiple rendering engines. Treat the three listed precedents as inspiration, not code permission. Do not invent client content. Verify the GlossGenius destination before shipping. Deliver an actual mobile-tested implementation, record measured results separately from targets, and do not describe a repository commit as a deployed website.

Pattern status: unverified_candidate. Human direction approved; implementation, runtime performance and final visual approval pending. No Proven Pattern or new Motherboard record is claimed.
