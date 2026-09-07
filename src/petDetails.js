const habitatByType = {
  dogs: 'Dogs generally need a predictable home routine, safe places to rest, daily movement and regular opportunities to interact with people and explore their surroundings.',
  cats: 'Cats benefit from a calm home with safe hiding places, elevated viewpoints, scratching surfaces, play opportunities and resources that can be used without competition.',
  birds: 'Companion birds need secure, species-appropriate housing, clean water, enrichment, suitable perches and daily opportunities for movement. Wild birds belong in their natural habitats.',
  'small-animals': 'Small companion animals need secure housing, appropriate bedding or flooring, hiding places, clean water, enrichment and enough room for natural movement.',
  'fish-aquatic': 'Aquatic animals depend on a stable, properly maintained environment. Water quality, temperature, filtration, stocking and compatible tank mates matter as much as the animal itself.',
  reptiles: 'Reptiles require carefully controlled housing that matches their species, including suitable temperature gradients, humidity, lighting, substrate and secure shelter.'
};

const choosingByType = {
  dogs: 'Before choosing this dog, consider the time available for exercise, training, social contact and routine care rather than choosing by appearance alone.',
  cats: 'Before choosing this cat, consider its activity level, grooming needs, social style and the amount of enrichment your home can provide.',
  birds: 'Before choosing a companion bird, consider its lifespan, noise, social needs, enrichment requirements and the space needed for safe movement.',
  'small-animals': 'Before choosing a small animal, remember that a small body does not mean a small care commitment. Housing, diet, enrichment and cleaning still require consistent attention.',
  'fish-aquatic': 'Before choosing an aquatic animal, establish the appropriate aquarium environment first. The habitat should be ready before the animal arrives.',
  reptiles: 'Before choosing a reptile, learn its adult size and environmental requirements first. Correct husbandry is essential and cannot be replaced by a decorative enclosure.'
};

const imageAliases = {
  'french-bulldog': ['French Bulldog'],
  'german-shepherd': ['German Shepherd'],
  'corgi': ['Pembroke Welsh Corgi', 'Corgi'],
  'australian-shepherd': ['Australian Shepherd'],
  'green-cheek-conure': ['Green-cheeked parakeet', 'Green-cheeked Conure'],
  'african-grey': ['African grey parrot', 'African Grey Parrot'],
  'pigeon': ['Domestic pigeon', 'Pigeon'],
  'dove': ['Domestic dove', 'Dove'],
  'holland-lop': ['Holland Lop'],
  'netherland-dwarf': ['Netherland Dwarf rabbit', 'Netherland Dwarf'],
  'guinea-pig': ['Guinea pig'],
  'syrian-hamster': ['Golden hamster', 'Syrian hamster'],
  'dwarf-hamster': ['Dwarf hamster'],
  'fancy-rat': ['Fancy rat', 'Rat'],
  'mongolian-gerbil': ['Mongolian gerbil', 'Gerbil'],
  'african-pygmy-hedgehog': ['Four-toed hedgehog', 'African pygmy hedgehog'],
  'betta': ['Siamese fighting fish', 'Betta'],
  'neon-tetra': ['Neon tetra'],
  'corydoras': ['Corydoras', 'Corydoras catfish'],
  'bristlenose-pleco': ['Bristlenose catfish', 'Bristlenose pleco'],
  'leopard-gecko': ['Leopard gecko'],
  'crested-gecko': ['Crested gecko'],
  'bearded-dragon': ['Bearded dragon'],
  'corn-snake': ['Corn snake'],
  'red-eared-slider': ['Red-eared slider'],
  'swallow': ['Swallow', 'Swallows'],
  'birdwatching': ['Birdwatching']
};

export const getImageTitles = (record) => imageAliases[record.id] || [record.name];

export function enrichRecord(record) {
  const habitat = habitatByType[record.type] || 'Every animal benefits from a safe environment, appropriate resources, predictable routines and opportunities to express natural behaviors.';
  const choosing = choosingByType[record.type] || 'Learn the species-specific requirements before making a care decision.';
  const isWildlife = record.id === 'swallow' || record.id === 'birdwatching';
  return {
    ...record,
    overview: `${record.description} A useful way to understand this profile is to look beyond appearance and consider how the animal behaves, what it needs each day and how its natural tendencies fit into a responsible home or observation setting.`,
    behaviorGuide: `${record.habits} Individual animals vary, so behavior should be interpreted in context rather than treated as a guarantee of personality.`,
    careGuide: `${record.dailyCare} Good care is consistent rather than occasional: observe the animal, keep its environment clean and safe, provide appropriate enrichment and respond to changes in behavior with professional advice when needed.`,
    habitatGuide: habitat,
    choosingGuide: isWildlife ? 'This profile is for learning and respectful observation, not household ownership. Protect habitat and avoid disturbing nests or wild animals.' : choosing,
    facts: record.tags.map((tag) => `A key profile trait is ${tag.toLowerCase()}.`),
    searchText: [record.description, record.habits, record.dailyCare, record.note, habitat, choosing, ...record.tags].join(' ')
  };
}
