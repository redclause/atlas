# discover.pet image library

This directory is the canonical first-party media root for animal imagery.

Expected structure:

- `public/images/animals/<category>/<slug>.webp` — primary profile image
- `public/images/animals/<category>/<slug>-01.webp` … `-05.webp` — gallery variants
- `public/images/animals/<category>/<slug>-01.avif` … — optional AVIF derivatives

The application references stable `/images/...` paths rather than external image URLs.

## Import contract

Every imported image should have a manifest record containing:

- stable `id`
- `animalId`
- `path`
- `alt`
- `source`
- `sourceUrl`
- `author`
- `license`
- `attribution`
- `verifiedAt`
- `sha256`
- `width`
- `height`
- `status`

Do not publish an image until its license/attribution has been verified. Wikimedia Commons may be used as an acquisition source, but it should not be a runtime dependency.
