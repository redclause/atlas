# Atlas

**A map of everything worth discovering.**

Atlas is an all-in-one discovery platform for companies, brands, tools, software, places, topics and resources. The product is designed around connected discovery rather than a collection of disconnected directory pages.

## Product direction

- Global search across every entity type
- Browse by category and topic
- Structured entity profiles
- Related discoveries and knowledge-graph relationships
- Saved discoveries stored locally in the browser
- Editorial Atlas Journal
- SEO-friendly, indexable public pages as the data layer grows
- Future-ready monetization: featured listings, claimed profiles, affiliates and data/API products

## Current MVP

The repository currently contains a polished client-side Vite + React experience with seeded discovery data. Search, category filtering, saved discoveries, responsive navigation and entity detail views are functional without a backend.

## Next architecture

The recommended production evolution is:

`React/Vite UI → API → relational entity database → search index → editorial CMS → ingestion/review pipeline`

Core entity types should remain small and composable: **Organizations, Brands, Products/Tools, Places, People, Topics and Resources**. Relationships between them should power generated discovery pages.

## Development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Content principles

Atlas should favor structured, useful, verifiable information. AI may assist with research and drafting, but publication should have a review/verification step. Imported records should preserve source provenance and timestamps.

## Repository boundary

Atlas is an independent project. It does not share source code or configuration with `redclause/ambobs` or `redclause/RCmusic`.
