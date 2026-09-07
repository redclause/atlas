export const categories = [
  { id: 'companies', label: 'Companies', text: 'Organizations, startups and institutions.' },
  { id: 'brands', label: 'Brands', text: 'Brands across fashion, beauty, food, tech and more.' },
  { id: 'tools', label: 'Tools & software', text: 'Useful apps, platforms and digital tools.' },
  { id: 'places', label: 'Places', text: 'Cities, destinations, museums and places worth knowing.' },
  { id: 'topics', label: 'Topics', text: 'Ideas, disciplines and subjects to explore.' },
  { id: 'resources', label: 'Resources', text: 'Courses, publications, books and useful websites.' },
];

export const records = [
  { id: 'openai', type: 'companies', name: 'OpenAI', meta: 'Artificial intelligence · United States', description: 'AI research and technology organization building models and products for general-purpose intelligence.', tags: ['AI', 'Research', 'Software'], featured: true },
  { id: 'mistral', type: 'companies', name: 'Mistral AI', meta: 'Artificial intelligence · France', description: 'European AI company focused on efficient, capable foundation models and developer products.', tags: ['AI', 'Models', 'Europe'] },
  { id: 'stripe', type: 'companies', name: 'Stripe', meta: 'Financial technology · Ireland / United States', description: 'Technology infrastructure for businesses that accept payments and operate online.', tags: ['Fintech', 'Payments', 'Software'] },
  { id: 'apple', type: 'brands', name: 'Apple', meta: 'Technology · United States', description: 'Technology brand known for personal devices, operating systems and digital services.', tags: ['Hardware', 'Software', 'Design'], featured: true },
  { id: 'patagonia', type: 'brands', name: 'Patagonia', meta: 'Outdoor · United States', description: 'Outdoor clothing and equipment brand with a strong focus on product durability and environmental responsibility.', tags: ['Outdoor', 'Clothing', 'Sustainability'] },
  { id: 'figma', type: 'tools', name: 'Figma', meta: 'Design software · Web', description: 'Collaborative interface design and prototyping platform used by product teams.', tags: ['Design', 'Collaboration', 'UI'] },
  { id: 'notion', type: 'tools', name: 'Notion', meta: 'Productivity · Web / Desktop / Mobile', description: 'Flexible workspace for notes, documents, databases and team knowledge.', tags: ['Productivity', 'Notes', 'Teams'] },
  { id: 'paris', type: 'places', name: 'Paris', meta: 'France · Europe', description: 'Capital city known for architecture, museums, design, food and a dense cultural landscape.', tags: ['City', 'Culture', 'Architecture'], featured: true },
  { id: 'lisbon', type: 'places', name: 'Lisbon', meta: 'Portugal · Europe', description: 'Atlantic capital combining historic neighborhoods, contemporary culture and a distinctive urban landscape.', tags: ['City', 'Travel', 'Culture'] },
  { id: 'astronomy', type: 'topics', name: 'Astronomy', meta: 'Science · Space', description: 'The study of celestial objects, cosmic systems and the physical processes shaping the universe.', tags: ['Science', 'Space', 'Physics'] },
  { id: 'urbanism', type: 'topics', name: 'Urbanism', meta: 'Cities · Architecture · Planning', description: 'The study and practice of shaping cities, neighborhoods, public space and urban systems.', tags: ['Cities', 'Planning', 'Design'] },
  { id: 'mdn', type: 'resources', name: 'MDN Web Docs', meta: 'Developer resource · Web', description: 'Reference and learning material for web standards, APIs, HTML, CSS and JavaScript.', tags: ['Web', 'Documentation', 'Development'] },
];

export const journalEntries = [
  { id: 'knowledge-graph', title: 'How discovery becomes a knowledge graph', text: 'Why connected information is more useful than isolated lists.' },
  { id: 'great-directory', title: 'What makes a great directory?', text: 'The difference between collecting links and creating useful context.' },
  { id: 'search-exploration', title: 'From search to exploration', text: 'Designing interfaces that encourage curiosity without getting in the way.' },
];

export const typeLabel = Object.fromEntries(categories.map((category) => [category.id, category.label]));

export function getRecord(id) {
  return records.find((record) => record.id === id) || null;
}

export function getCategory(id) {
  return categories.find((category) => category.id === id) || null;
}
