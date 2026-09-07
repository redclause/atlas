export const countries = [
  {
    id: 'france',
    name: 'France',
    flag: '🇫🇷',
    intro: 'A rich guide to breeds and animals developed, standardized or historically associated with France and its regions.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/French%20Bulldog%20%28cropped%29.jpg',
    recordIds: ['french-bulldog','poodle','bichon-frise','maltese'],
    regions: ['Brittany','Normandy','Bordeaux','Pyrenees','Gascony'],
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    flag: '🇬🇧',
    intro: 'Explore companion and working breeds shaped by the history, landscapes and working traditions of Britain.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Golden%20Retriever%20puppy%20%28cropped%29.jpg',
    recordIds: ['cavalier-king-charles-spaniel','corgi'],
    regions: ['Wales','Scotland','England'],
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    intro: 'Discover German-origin working, hunting and companion breeds and the traditions behind them.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/German%20Shepherd%20Dog%20%28cropped%29.jpg',
    recordIds: ['german-shepherd','rottweiler'],
    regions: ['Bavaria','Württemberg','Thuringia'],
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    intro: 'Learn about animals and breeds connected with Australia, from companion birds to working-dog traditions.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Budgerigar%20%28Melopsittacus%20undulatus%29.jpg',
    recordIds: ['budgerigar'],
    regions: ['New South Wales','Queensland','Western Australia'],
  },
  {
    id: 'united-states',
    name: 'United States',
    flag: '🇺🇸',
    intro: 'Explore breeds developed or standardized in the United States and the cultural history around them.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Maine%20Coon%20cat%20by%20Pet%20Portraits.jpg',
    recordIds: ['maine-coon'],
    regions: ['Maine','New England'],
  },
];

export const getCountry = (id) => countries.find((country) => country.id === id);
export const getCountryRecords = (country, records) => country ? records.filter((record) => country.recordIds.includes(record.id)) : [];
