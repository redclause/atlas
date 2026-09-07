import fs from 'node:fs';
import path from 'node:path';

const dataPath = path.resolve('src/data.js');
const source = fs.readFileSync(dataPath, 'utf8');

// Extract IDs/names from the simple exported dataset without requiring a browser build.
const matches = [...source.matchAll(/id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'/g)];
const clean = (v) => v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const rows = matches.map(([_, id, name]) => ({
  id: `animal-${id}`,
  animalId: id,
  path: `/images/animals/${clean(id)}.webp`,
  alt: `${name} — animal guide image`,
  source: '', sourceUrl: '', author: '', license: '', attribution: '',
  verifiedAt: '', sha256: '', width: 0, height: 0, status: 'planned'
}));

fs.mkdirSync('public/images', { recursive: true });
fs.writeFileSync('public/images/manifest.json', JSON.stringify({ version: 1, generatedAt: new Date().toISOString(), items: rows }, null, 2) + '\n');
console.log(`Generated ${rows.length} image manifest entries.`);
