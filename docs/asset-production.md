# Media inventory and production plan

52 original uploads → 44 byte-unique images. Eight repeated uploads are represented in `originalUploads` in the manifest; no source upload was deleted. Organized copies preserve the original bytes. Categories separate artist portraits, cutout candidates, tattoo portfolio and a reference screenshot. New IMG_1610–1613 attachments are conversation-status screenshots, not portfolio assets, and are excluded.

Only `jz-cauldron-transparent.png` has an alpha channel in the original 52 uploads. The other files are RGB JPEGs, including many images that visually look like cutouts against white. Renaming a JPEG to PNG cannot create transparency.

## Planned derivatives (not yet generated)

| Priority | Source asset ID | Output / treatment | Use |
|---|---|---|---|
| P0 | jz-golden-hour | transparent portrait, retaining hair detail and all original pixels inside the silhouette | Preferred soft romantic hero |
| P0 | centipede-arm | transparent body cutout; retain true skin/ink colors | Upper-right portfolio edge |
| P0 | lilies-arm | transparent cutout; mask only surrounding background | Lower-left paper gallery |
| P0 | stars-foot | transparent cutout, ankle cropped outside section | Horizontal right-edge composition |
| P1 | branching-neck-shoulder | transparent cutout with hair edges preserved | Botanical transition near Meet JZ |
| P1 | faded-back-linework | preserve deliberate fading; test original on paper before deciding if alpha extraction helps | Quiet background ornament, not a retouched tattoo example |
| P1 | jz-candle | transparent silhouette only if selected for a dark cinematic section | Beyond Ink alternate |

Do not generate replacement people, skin, tattoo lines or missing body parts. Prefer the original transparent export if available; otherwise extract only the background and verify against the source at 100%. White clothing, pale skin, fine tattoo lines and hair make indiscriminate white-color removal unsafe. No derivatives have been generated at this checkpoint.

## New decorative art specification

Create one coherent lily family rather than many unrelated graphics: a large three-quarter lily underlay behind the hero shoulder, a finer foreground branch that crosses the silhouette below the face, and two small branching connectors for gallery edges. Fine charcoal outlines, imperfect hand-drawn rhythm, sparse berry stippling and translucent blush wash. Keep flower centers and leaf structure botanically plausible; avoid copying or redrawing actual tattoos as if they were new portfolio work.

Use SVG for the separate line paths that must draw on scroll; use a transparent PNG/WebP only for soft watercolor wash if needed. Layer order: background wash → rear flower → untouched portrait → restrained foreground branch → typography. Do not flatten the hero into a single raster image: independent layers are required for responsive cropping and modest depth movement.

Generated raster prompt if a wash is needed: “Decorative botanical blush watercolor wash for a romantic tattoo artist's sketchbook website; softly feathered dusty pink petals and berry ink speckles, sparse and airy, no person, no skin, no lettering, no frame, no photographic tattoo; true transparent background; generous negative space.” This is a proposed StarrTree prompt, not a generated asset.

## Production controls

Keep `media/` as originals. Put derivatives in `public/media/` later, with source IDs and edit history. Export responsive WebP/AVIF for ordinary photographs; preserve alpha where needed. Do not load all originals on initial page view. Maintain a full, undistorted portfolio viewing option. Instagram screenshots are reference material: prefer corresponding clean originals for the site, and do not publish app chrome as portfolio design.

Photography and tattoo artwork remain owned by their respective owners. Confirm public client/photographer usage and attribution with JZ before website launch; technical upload authorization does not establish authorship or broader licensing.
