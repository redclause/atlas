export const categories = [
  { id: 'companies', label: 'Companies', text: 'Organizations, startups and institutions.' },
  { id: 'brands', label: 'Brands', text: 'Brands across fashion, beauty, food, tech and more.' },
  { id: 'tools', label: 'Tools & software', text: 'Useful apps, platforms and digital tools.' },
  { id: 'places', label: 'Places', text: 'Cities, destinations, museums and places worth knowing.' },
  { id: 'topics', label: 'Topics', text: 'Ideas, disciplines and subjects to explore.' },
  { id: 'resources', label: 'Resources', text: 'Courses, publications, books and useful websites.' },
];

const item = (id, type, name, meta, description, tags, related = [], featured = false) => ({ id, type, name, meta, description, tags, related, featured });

export const records = [
  item('openai','companies','OpenAI','Artificial intelligence · United States','AI research and technology organization building general-purpose AI systems and products.',['AI','Research','Software'],['chatgpt','astronomy','mdn'],true),
  item('mistral','companies','Mistral AI','Artificial intelligence · France','European AI company focused on efficient foundation models and developer products.',['AI','Models','Europe'],['openai','paris','huggingface'],true),
  item('stripe','companies','Stripe','Financial technology · Ireland / United States','Technology infrastructure for businesses that accept payments and operate online.',['Fintech','Payments','Software'],['notion','shopify','ecommerce']),
  item('anthropic','companies','Anthropic','Artificial intelligence · United States','AI company focused on reliable, interpretable and useful AI systems.',['AI','Safety','Research'],['openai','claude','artificial-intelligence']),
  item('google','companies','Google','Technology · United States','Technology company spanning search, cloud, software, hardware and AI research.',['Search','Cloud','AI'],['gemini','urbanism','artificial-intelligence']),
  item('microsoft','companies','Microsoft','Technology · United States','Software and cloud company spanning operating systems, productivity, developer tools and AI.',['Cloud','Software','AI'],['github','vscode','openai']),
  item('shopify','companies','Shopify','Commerce technology · Canada','Commerce platform providing tools for merchants to build, manage and grow online businesses.',['Commerce','Ecommerce','Entrepreneurship'],['stripe','ecommerce','design']),
  item('github','companies','GitHub','Developer platform · United States','Platform for hosting, collaborating on and reviewing software projects.',['Development','Open source','Collaboration'],['microsoft','mdn','vscode']),
  item('adobe','companies','Adobe','Creative software · United States','Creative software company behind tools for design, photography, video, documents and digital experiences.',['Creative tools','Design','Software'],['figma','design','canva']),
  item('nasa','companies','NASA','Space agency · United States','Civil space agency conducting science, exploration, aeronautics and Earth observation programs.',['Space','Science','Exploration'],['astronomy','james-webb','space-exploration']),
  item('nvidia','companies','NVIDIA','Semiconductors · United States','Computing company known for accelerated hardware and software used in graphics, simulation and AI.',['Computing','AI','Hardware'],['artificial-intelligence','machine-learning','research']),
  item('airbus','companies','Airbus','Aerospace · Europe','Aerospace company developing commercial aircraft, helicopters, defense systems and space technologies.',['Aerospace','Engineering','Europe'],['aviation','space-exploration','paris']),

  item('apple','brands','Apple','Technology · United States','Technology brand known for personal devices, operating systems and digital services.',['Hardware','Software','Design'],['figma','design','technology'],true),
  item('patagonia','brands','Patagonia','Outdoor · United States','Outdoor clothing and equipment brand with a strong focus on durability and environmental responsibility.',['Outdoor','Clothing','Sustainability'],['sustainability','urbanism','climate']),
  item('nike','brands','Nike','Sportswear · United States','Global sportswear brand spanning footwear, apparel, equipment and athlete-focused design.',['Sportswear','Design','Retail'],['adidas','design','cities']),
  item('adidas','brands','Adidas','Sportswear · Germany','Sportswear brand known for footwear, apparel and collaborations across sport and culture.',['Sportswear','Germany','Design'],['nike','berlin','design']),
  item('loreal','brands','L’Oréal','Beauty · France','Global beauty company spanning skincare, haircare, makeup and professional beauty.',['Beauty','Skincare','France'],['paris','beauty','research']),
  item('chanel','brands','Chanel','Luxury · France','French luxury house associated with fashion, fragrance, beauty and timeless design.',['Luxury','Fashion','France'],['paris','design','beauty']),
  item('hermes','brands','Hermès','Luxury · France','French luxury house known for leather goods, silk, fashion, watches and craftsmanship.',['Luxury','Craftsmanship','France'],['paris','fashion','craft']),
  item('lego','brands','LEGO','Toys · Denmark','Danish toy brand built around interlocking construction elements and creative play.',['Toys','Design','Learning'],['design','education','creativity']),
  item('ikea','brands','IKEA','Home · Sweden','Swedish-founded home furnishing brand focused on accessible design and modular living.',['Home','Design','Sweden'],['urbanism','architecture','sustainability']),
  item('airbnb','brands','Airbnb','Travel · Global','Platform connecting travelers with homes, rooms and experiences in destinations around the world.',['Travel','Hospitality','Cities'],['lisbon','paris','travel']),
  item('muji','brands','MUJI','Lifestyle · Japan','Japanese lifestyle brand recognized for restrained product design, household goods, stationery and clothing.',['Lifestyle','Design','Japan'],['tokyo','design','minimalism']),
  item('decathlon','brands','Decathlon','Sport · France','French sporting-goods brand offering equipment, apparel and products across many activities.',['Sport','Retail','France'],['paris','outdoor','design']),
  item('dyson','brands','Dyson','Technology · United Kingdom','Engineering-led consumer technology brand developing appliances around airflow, filtration and household performance.',['Engineering','Home','Technology'],['london','design','research']),

  item('figma','tools','Figma','Design software · Web','Collaborative interface design and prototyping platform used by product teams.',['Design','Collaboration','UI'],['adobe','notion','design'],true),
  item('notion','tools','Notion','Productivity · Web / Desktop / Mobile','Flexible workspace for notes, documents, databases and team knowledge.',['Productivity','Notes','Teams'],['figma','obsidian','knowledge-management']),
  item('vscode','tools','Visual Studio Code','Developer tool · Desktop','Extensible source-code editor with a large ecosystem of developer tooling.',['Code','Development','Editor'],['github','mdn','javascript']),
  item('chatgpt','tools','ChatGPT','AI assistant · Web / Mobile / Desktop','Conversational AI application for writing, analysis, learning, coding and exploration.',['AI','Assistant','Productivity'],['openai','claude','artificial-intelligence']),
  item('claude','tools','Claude','AI assistant · Web / API','AI assistant designed for analysis, writing, coding and other knowledge work.',['AI','Assistant','Analysis'],['anthropic','chatgpt','artificial-intelligence']),
  item('gemini','tools','Gemini','AI assistant · Web / Mobile','Google’s AI assistant experience connected to a broad ecosystem of products and services.',['AI','Assistant','Google'],['google','chatgpt','artificial-intelligence']),
  item('obsidian','tools','Obsidian','Knowledge management · Desktop / Mobile','Markdown-based knowledge-management application built around linked notes.',['Notes','Knowledge graph','Markdown'],['notion','knowledge-management','markdown']),
  item('canva','tools','Canva','Design software · Web / Mobile','Visual communication platform for presentations, graphics, documents and social content.',['Design','Templates','Visuals'],['figma','adobe','design']),
  item('docker','tools','Docker','Developer infrastructure · Desktop / Cloud','Container platform used to package and run applications consistently across environments.',['Containers','DevOps','Infrastructure'],['github','vscode','cloud']),
  item('postman','tools','Postman','API platform · Web / Desktop','Toolset for designing, testing, documenting and collaborating around APIs.',['APIs','Development','Testing'],['github','vscode','web']),
  item('linear','tools','Linear','Project management · Web','Issue tracking and project management software designed for product and engineering teams.',['Productivity','Projects','Software'],['github','notion','remote-work']),
  item('slack','tools','Slack','Team communication · Web / Desktop / Mobile','Work communication platform organized around channels, conversations and integrations.',['Communication','Teams','Productivity'],['notion','github','remote-work']),
  item('vercel','tools','Vercel','Web platform · Cloud','Platform for deploying and scaling modern web applications with integrated developer workflows.',['Web','Cloud','Development'],['nextjs','github','javascript']),
  item('nextjs','tools','Next.js','Web framework · Open source','React framework for building full-stack web applications with routing, rendering and server capabilities.',['React','Web','Development'],['vercel','javascript','mdn']),

  item('paris','places','Paris','France · Europe','Capital city known for architecture, museums, design, food and a dense cultural landscape.',['City','Culture','Architecture'],['chanel','louvre','urbanism'],true),
  item('lisbon','places','Lisbon','Portugal · Europe','Atlantic capital combining historic neighborhoods, contemporary culture and a distinctive urban landscape.',['City','Travel','Culture'],['airbnb','urbanism','travel']),
  item('london','places','London','United Kingdom · Europe','Large global city with deep connections to finance, culture, design, technology and history.',['City','Culture','Technology'],['urbanism','british-museum','travel']),
  item('new-york','places','New York City','United States · North America','Major global city known for finance, media, architecture, arts, food and diverse neighborhoods.',['City','Culture','Architecture'],['urbanism','design','startups']),
  item('tokyo','places','Tokyo','Japan · Asia','Dense metropolitan capital blending advanced infrastructure, traditional culture and contemporary design.',['City','Japan','Technology'],['urbanism','design','technology']),
  item('barcelona','places','Barcelona','Spain · Europe','Mediterranean city recognized for architecture, public space, design and cultural life.',['City','Architecture','Design'],['urbanism','design','travel']),
  item('berlin','places','Berlin','Germany · Europe','Capital with a strong contemporary culture, creative scene, technology community and layered history.',['City','Culture','Design'],['adidas','urbanism','startups']),
  item('georgia','places','Georgia','Country · Caucasus','Country at the crossroads of Europe and Asia known for mountains, food, wine, cities and cultural heritage.',['Caucasus','Travel','Culture'],['tbilisi','mountains','food']),
  item('tbilisi','places','Tbilisi','Georgia · Caucasus','Georgia’s capital, known for historic districts, contemporary creative culture and a distinctive urban landscape.',['City','Caucasus','Culture'],['georgia','urbanism','architecture']),
  item('louvre','places','Louvre Museum','Paris · France','Major museum and cultural institution with collections spanning many periods and regions of art history.',['Museum','Art','Paris'],['paris','art-history','culture']),
  item('stockholm','places','Stockholm','Sweden · Europe','Swedish capital spread across islands, with strong design, technology and cultural traditions.',['City','Design','Sweden'],['spotify','ikea','urbanism']),
  item('copenhagen','places','Copenhagen','Denmark · Europe','Danish capital associated with cycling, design, public space and human-scale urban planning.',['City','Design','Urbanism'],['lego','urbanism','sustainability']),
  item('singapore','places','Singapore','City-state · Southeast Asia','Highly urbanized city-state known for infrastructure, architecture, commerce and tropical landscape design.',['City','Architecture','Technology'],['urbanism','sustainability','design']),
  item('seoul','places','Seoul','South Korea · Asia','Large metropolitan capital blending technology, contemporary culture, dense urbanism and historic districts.',['City','Technology','Culture'],['urbanism','design','technology']),

  item('astronomy','topics','Astronomy','Science · Space','Study of celestial objects, cosmic systems and the physical processes shaping the universe.',['Science','Space','Physics'],['nasa','james-webb','space-exploration'],true),
  item('urbanism','topics','Urbanism','Cities · Architecture · Planning','Study and practice of shaping cities, neighborhoods, public space and urban systems.',['Cities','Planning','Design'],['paris','tbilisi','architecture']),
  item('artificial-intelligence','topics','Artificial intelligence','Computing · Research','Field concerned with building systems that perform tasks associated with perception, reasoning, generation and decision-making.',['AI','Computing','Research'],['openai','mistral','chatgpt']),
  item('machine-learning','topics','Machine learning','Computing · Statistics','Approach to computing in which models learn patterns from data to make predictions or generate outputs.',['AI','Statistics','Data'],['artificial-intelligence','python','research']),
  item('design','topics','Design','Creative practice · Product','Practice of shaping products, services, interfaces and experiences around human needs and constraints.',['Design','Creativity','Products'],['figma','adobe','architecture']),
  item('architecture','topics','Architecture','Built environment · Design','Discipline concerned with designing buildings, spaces and relationships between people and the built environment.',['Buildings','Design','Cities'],['urbanism','paris','louvre']),
  item('sustainability','topics','Sustainability','Environment · Society','Framework for considering environmental, social and economic systems across long-term decisions.',['Environment','Systems','Climate'],['patagonia','urbanism','climate']),
  item('space-exploration','topics','Space exploration','Science · Engineering','Human and robotic exploration of the Solar System and beyond using spacecraft, instruments and scientific missions.',['Space','Engineering','Science'],['nasa','astronomy','james-webb']),
  item('knowledge-management','topics','Knowledge management','Information · Work','Methods for capturing, organizing, connecting and retrieving knowledge within personal or organizational systems.',['Knowledge','Productivity','Information'],['notion','obsidian','mdn']),
  item('ecommerce','topics','Ecommerce','Commerce · Technology','Buying and selling goods or services through digital channels and supporting technology.',['Commerce','Retail','Technology'],['shopify','stripe','airbnb']),
  item('cybersecurity','topics','Cybersecurity','Computing · Security','Practice of protecting systems, networks, applications and information from misuse and disruption.',['Security','Computing','Privacy'],['github','docker','technology']),
  item('productivity','topics','Productivity','Work · Organization','Methods and systems for directing attention, time and resources toward meaningful outcomes.',['Work','Planning','Focus'],['notion','linear','knowledge-management']),
  item('remote-work','topics','Remote work','Work · Technology','Ways of organizing distributed work using digital communication, collaboration and documentation systems.',['Work','Teams','Technology'],['slack','notion','productivity']),
  item('mobility','topics','Urban mobility','Cities · Transport','Study of how people and goods move through urban areas and how transport shapes city life.',['Transport','Cities','Planning'],['urbanism','copenhagen','sustainability']),

  item('mdn','resources','MDN Web Docs','Developer resource · Web','Reference and learning material for web standards, APIs, HTML, CSS and JavaScript.',['Web','Documentation','Development'],['github','vscode','javascript']),
  item('wikipedia','resources','Wikipedia','Reference · Global','Collaborative encyclopedia providing broad reference coverage across many subjects.',['Reference','Knowledge','Education'],['knowledge-management','astronomy','history']),
  item('github-docs','resources','GitHub Docs','Developer resource · Web','Documentation for GitHub features, workflows, repositories, collaboration and developer tooling.',['GitHub','Documentation','Development'],['github','vscode','open-source']),
  item('python','resources','Python','Programming language · Open source','General-purpose programming language widely used in automation, data work, web development and scientific computing.',['Programming','Data','Open source'],['machine-learning','github','research']),
  item('javascript','resources','JavaScript','Programming language · Web','Programming language that powers interactive behavior across the modern web and many server-side environments.',['Web','Programming','Frontend'],['mdn','vscode','web']),
  item('huggingface','resources','Hugging Face','AI platform · Open source','Community and platform for sharing models, datasets, demos and tools for machine learning.',['AI','Open source','Models'],['mistral','machine-learning','research']),
  item('james-webb','resources','James Webb Space Telescope','Space science · NASA / ESA / CSA','Space observatory designed for infrared astronomy and the study of distant and nearby cosmic systems.',['Astronomy','Space','Science'],['astronomy','nasa','space-exploration']),
  item('british-museum','resources','British Museum','Museum · London','Museum with collections covering human history, art and material culture across many regions and eras.',['Museum','History','London'],['london','art-history','culture']),
  item('art-history','resources','Art history','Humanities · Visual culture','Study of artworks, visual traditions, artists, contexts and the changing ways cultures represent ideas.',['Art','History','Culture'],['louvre','british-museum','design']),
  item('climate','resources','Climate resources','Science · Environment','Starting points for understanding climate systems, evidence, impacts, adaptation and mitigation.',['Climate','Science','Environment'],['sustainability','nasa','research']),
  item('web-standards','resources','Web standards','Technology · Web','Standards and specifications that define interoperable behavior for browsers, web applications and related technologies.',['Web','Standards','Development'],['mdn','javascript','accessibility']),
  item('open-source','resources','Open source','Software · Community','A development model centered on software whose source code can be inspected, modified and shared under its license.',['Software','Community','Development'],['github','python','docker']),
  item('research','resources','Research methods','Science · Knowledge','Approaches for asking questions, evaluating evidence, analyzing information and communicating defensible conclusions.',['Research','Evidence','Learning'],['astronomy','machine-learning','knowledge-management']),
  item('education','resources','Learning resources','Education · Knowledge','A broad starting point for structured learning, reference material and skill development across disciplines.',['Education','Learning','Knowledge'],['wikipedia','mdn','research']),
];

export const journalEntries = [
  { id: 'knowledge-graph', title: 'How discovery becomes a knowledge graph', text: 'Why connected information is more useful than isolated lists.' },
  { id: 'great-directory', title: 'What makes a great directory?', text: 'The difference between collecting links and creating useful context.' },
  { id: 'search-exploration', title: 'From search to exploration', text: 'Designing interfaces that encourage curiosity without getting in the way.' },
  { id: 'entity-pages', title: 'Why entity pages matter', text: 'A strong directory page can become a durable destination rather than a thin index.' },
  { id: 'structured-discovery', title: 'Structure before scale', text: 'Good metadata and relationships make a large discovery system easier to navigate.' },
  { id: 'editorial-layer', title: 'The editorial layer of Atlas', text: 'How concise explanations can turn raw records into useful knowledge.' },
];

export const typeLabel = Object.fromEntries(categories.map((category) => [category.id, category.label]));

export function getRecord(id) {
  return records.find((record) => record.id === id) || null;
}

export function getCategory(id) {
  return categories.find((category) => category.id === id) || null;
}

export function getRelated(record, limit = 6) {
  if (!record) return [];
  const explicit = (record.related || []).map(getRecord).filter(Boolean);
  const byTag = records.filter((candidate) => candidate.id !== record.id && candidate.tags.some((tag) => record.tags.includes(tag)));
  return [...new Map([...explicit, ...byTag].map((entry) => [entry.id, entry])).values()].slice(0, limit);
}
