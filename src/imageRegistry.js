// First-party image contract for discover.pet.
// Runtime pages should reference these stable site paths. The source metadata is
// retained so imported media can be audited for licensing and attribution.
const clean = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const imageFor = (record) => {
  if (!record) return null;
  const slug = clean(record.name);
  return {
    id: `animal-${record.id}`,
    path: `/images/animals/${record.type}/${slug}.webp`,
    alt: `${record.name} — animal guide image`,
    source: 'Wikimedia Commons import candidate',
    license: 'Verify license and attribution before publication',
  };
};

export const imageManifestEntry = (record) => ({
  ...imageFor(record),
  animalId: record.id,
  status: 'planned',
});

export const imageManifest = (records) => records.map(imageManifestEntry);
