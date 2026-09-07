import { records } from './data';

// A scalable knowledge layer: one animal can power many distinct intent-focused
// knowledge entries without creating duplicate animal profiles.
const intents = [
  ['overview','What is {name}?','A concise introduction to {name}, including its classification, typical role and the traits that make it distinctive.'],
  ['habitat','Where does {name} live?','Learn about the natural or domestic environment associated with {name} and the conditions that support normal behavior.'],
  ['behavior','How does {name} behave?','Understand common behavior patterns, communication, activity rhythms and social tendencies associated with {name}.'],
  ['daily-care','What daily care does {name} need?','A practical overview of routine care, enrichment, cleanliness, exercise or environmental needs for {name}.'],
  ['social','Are {name} social animals?','Explore how {name} typically interacts with members of its own species, people or other compatible animals.'],
  ['enrichment','How can you enrich a {name} environment?','Ideas for safe, species-appropriate enrichment that encourages natural exploration, movement and problem-solving.'],
  ['environment','What environment suits {name}?','Key environmental considerations for housing or observing {name}, with an emphasis on safety and natural behavior.'],
  ['feeding','What should you know about feeding {name}?','General feeding principles for {name}, emphasizing an appropriate species-specific diet and fresh water.'],
  ['grooming','What grooming does {name} need?','An overview of coat, skin, feather, claw or other routine maintenance relevant to {name}.'],
  ['activity','How active is {name}?','Learn about typical activity patterns and the kinds of movement or stimulation that can support normal behavior.'],
  ['communication','How does {name} communicate?','Explore body language, calls, posture, scent, movement or other communication methods used by {name}.'],
  ['sleep','When does {name} rest?','Understand typical rest patterns and why an appropriate quiet area matters for {name}.'],
  ['family','What should families know about {name}?','A practical starting point for understanding whether the general care profile of {name} fits a household.'],
  ['space','How much space does {name} need?','Learn why enclosure, room, territory or exercise-space requirements should be considered before choosing {name}.'],
  ['responsibility','What does responsible care for {name} mean?','Responsible care starts with understanding normal behavior, meeting basic needs and planning for the animal over time.'],
  ['mistakes','What common care mistakes affect {name}?','Common preventable problems include unsuitable environments, insufficient enrichment, poor routines and misunderstanding normal behavior.'],
  ['seasonal','How can seasons affect {name}?','Explore how temperature, daylight, migration, shedding or seasonal behavior can influence {name}.'],
  ['origin','Where did {name} originate?','Learn how geography, domestication, selective breeding or natural history shaped the story of {name}.'],
  ['comparison','What makes {name} different?','A comparison-oriented guide to the traits, behavior and care considerations that distinguish {name} from related animals.'],
  ['questions','Questions to ask before choosing {name}','Before bringing an animal home, consider time, space, enrichment, diet, social needs, lifespan and long-term responsibility.'],
];

const slug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const knowledgeEntries = records.flatMap((record) => intents.map(([intent, title, summary]) => ({
  id: `${record.id}-${intent}`,
  type: 'knowledge',
  intent,
  animalId: record.id,
  title: title.replaceAll('{name}', record.name),
  summary: summary.replaceAll('{name}', record.name),
  slug: `/knowledge/${slug(record.name)}/${intent}`,
  tags: [...record.tags, intent],
  related: record.related,
})));

// Additional question-led entries are generated from the existing structured
// facts. This keeps the knowledge graph expandable while preserving one source
// of truth for each animal.
export const questionEntries = records.flatMap((record) => [
  `What are the main habits of ${record.name}?`,
  `What is the daily care routine for ${record.name}?`,
  `What should you know before choosing ${record.name}?`,
  `What kind of environment suits ${record.name}?`,
  `How can you understand ${record.name} behavior?`,
  `What makes ${record.name} distinctive?`,
].map((title, index) => ({
  id: `${record.id}-question-${index + 1}`,
  type: 'question',
  animalId: record.id,
  title,
  answer: index === 0 ? record.habits : index === 1 ? record.dailyCare : record.description,
  tags: [...record.tags, 'question'],
})));

export const contentScale = {
  animalProfiles: records.length,
  knowledgeEntries: knowledgeEntries.length,
  questionEntries: questionEntries.length,
  totalIndexedItems: records.length + knowledgeEntries.length + questionEntries.length,
};

export const getKnowledgeForAnimal = (animalId) => knowledgeEntries.filter((entry) => entry.animalId === animalId);
