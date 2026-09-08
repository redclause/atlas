// Media management contract for the future 10,000+ image library.
// The public site consumes stable media IDs; storage can later be swapped
// between local files, Vercel Blob, or another object store without changing content records.

export const MEDIA_STATUSES = ['planned', 'pending-review', 'approved', 'published', 'rejected', 'archived'];
export const MEDIA_ROLES = ['cover', 'gallery', 'inline', 'thumbnail'];

export const emptyMediaAsset = ({ id, animalId = '', role = 'gallery' } = {}) => ({
  id: id || `media-${crypto?.randomUUID?.() || Date.now()}`,
  animalId,
  role,
  path: '',
  alt: '',
  caption: '',
  width: 0,
  height: 0,
  mimeType: '',
  bytes: 0,
  sha256: '',
  source: '',
  sourceUrl: '',
  author: '',
  license: '',
  attribution: '',
  verifiedAt: '',
  status: 'planned',
  createdAt: new Date().toISOString(),
});

export const mediaPath = ({ category, animalSlug, filename }) =>
  `/images/animals/${category}/${animalSlug}/${filename}`;

export const mediaBatchSchema = {
  version: 1,
  batchId: 'batch-YYYY-MM-DD-NNN',
  items: [],
  createdAt: '',
  importedAt: '',
  status: 'pending-review',
};
