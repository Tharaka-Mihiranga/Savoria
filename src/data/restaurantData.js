export const RESTAURANT_INFO = {
  name: 'Savoria',
  tagline: 'Artisanal Bistro & Fine Dining Sanctuary',
  foundedYear: 2012,
  address: '428 Heritage Boulevard, Culinary District, Metropolis',
  phone: '+1 (555) 234-7890',
  reservationPhone: '+1 (555) 234-7899',
  email: 'concierge@savoriabistro.com',
  cateringEmail: 'events@savoriabistro.com',
  hours: [
    { days: 'Monday – Thursday', lunch: '11:30 AM – 2:30 PM', dinner: '5:00 PM – 10:00 PM' },
    { days: 'Friday – Saturday', lunch: '11:30 AM – 3:00 PM', dinner: '5:00 PM – 11:30 PM' },
    { days: 'Sunday Brunch & Dinner', lunch: '10:30 AM – 3:30 PM', dinner: '5:00 PM – 9:30 PM' },
  ],
  deliveryInfo: {
    minimumOrder: 25,
    standardDeliveryFee: 4.50,
    freeDeliveryThreshold: 75,
    estimatedTime: '30 - 45 mins',
    zones: ['Downtown & Financial District', 'Old Quarter', 'West Marina', 'Highland Park', 'Oakridge Terrace'],
  }
};

export const CHEF_DATA = {
  headChef: {
    name: 'Antoine Laurent',
    title: 'Executive Chef & Co-Founder',
    experience: '22 Years of Haute Cuisine',
    origin: 'Lyon, France',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80',
    bio: 'Born in Lyon, the gastronomic capital of France, Chef Antoine trained under multiple Michelin-starred masters at L’Auberge du Pont de Collonges and Le Meurice. In 2012, he relocated to establish Savoria, uniting classical French precision with contemporary farm-to-table culinary innovation.',
    quote: 'Cooking is the alchemy of memory and reverence for the soil. Every plate must tell the story of the artisans who cultivated its ingredients.',
    accolades: [
      'James Beard Award Nominee — Best Chef (2021, 2024)',
      'Michelin Guide Sommelier & Gastronomy Commendation (2022)',
      'Ordre du Mérite Agricole for Sustainable Sourcing (2023)',
      '3x National Culinary Gold Medallion'
    ]
  },
  team: [
    {
      name: 'Éléonore Vance',
      role: 'Master Pastry Chef',
      origin: 'Bordeaux, France',
      image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=700&q=80',
      description: 'Grand Diplôme from Le Cordon Bleu Paris. Éléonore reimagines classical patisserie with floral infusions and single-estate chocolates.'
    },
    {
      name: 'Mateo Rossi',
      role: 'Head Sommelier & Beverage Director',
      origin: 'Tuscany, Italy',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
      description: 'Master Court of Sommeliers certified. Mateo curates our subterranean 1,400-bottle cellar featuring biodynamic and rare vintage vintages.'
    },
    {
      name: 'Kaito Tanaka',
      role: 'Chef de Cuisine',
      origin: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=700&q=80',
      description: 'Bringing pristine knife technique and umami balance from Kaiseki kitchens, Kaito oversees daily kitchen operations and seafood mastery.'
    }
  ],
  historyMilestones: [
    {
      year: '2012',
      title: 'The Seed is Planted',
      description: 'Chef Antoine and his partner founded Savoria as an intimate 12-table bistro dedicated to showcasing hyper-local seasonal ingredients.'
    },
    {
      year: '2015',
      title: 'First Major Recognition',
      description: 'Named "Best New Restaurant of the Decade" by Epicurean Magazine, sparking reservations weeks in advance.'
    },
    {
      year: '2018',
      title: 'Direct Farm Partnership',
      description: 'Established the 15-acre Savoria Bio-Farm in the surrounding valley, yielding heirloom vegetables, stone fruits, and edible botanicals exclusively for our guests.'
    },
    {
      year: '2021',
      title: 'Architectural Expansion & Wine Alcove',
      description: 'Restored the 19th-century exposed brick cellar into our sommelier tasting room and added an open-concept kitchen hearth.'
    },
    {
      year: '2024',
      title: 'Pinnacle of Sustainable Dining',
      description: 'Awarded the Green Culinary Emblem for 100% zero-waste composting and ethical heritage livestock stewardship.'
    }
  ]
};

export const FOOD_ITEMS = [
  {
    id: 'food-1',
    name: 'Seared Hokkaido Scallops with Saffron Cream',
    category: 'starters',
    price: 24,
    shortDescription: 'Pan-seared jumbo diver scallops atop saffron emulsion with crispy serrano ham and pea tendrils.',
    longDescription: 'Diver-caught Japanese Hokkaido scallops seared to golden caramelization. Served alongside an airy saffron-scented velouté, dehydrated Serrano ham crisp, micro herbs from our greenhouse, and smoked sea salt crystals.',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    reviewCount: 142,
    calories: 380,
    prepTime: '15 mins',
    tags: ["Chef's Choice", 'Gluten-Free'],
    ingredients: ['Hokkaido Diver Scallops', 'Spanish Saffron', 'Shallots', 'White Wine Reduction', 'Grass-Fed Butter', 'Micro Peashoots', 'Crispy Serrano'],
    allergens: ['Shellfish', 'Dairy'],
    nutritionalInfo: { protein: '28g', carbs: '9g', fats: '18g' },
    customizationOptions: {
      sides: ['Warm Brioche Roll', 'Arugula Fennel Salad', 'Roasted Baby Carrots'],
      spiceLevels: ['Gentle Herbaceous', 'Mild Pimentón', 'Spicy Espelette']
    },
    reviews: [
      { id: 'r1', author: 'Catherine M.', rating: 5, date: '3 days ago', comment: 'Absolute perfection. The sear on the scallops was like butter and the saffron sauce was divine.' },
      { id: 'r2', author: 'David L.', rating: 5, date: '1 week ago', comment: 'Hands down the best starter on the menu. Pairs magnificently with their dry Riesling.' }
    ],
    isFeatured: true
  },
  {
    id: 'food-2',
    name: 'Artisanal Burrata di Puglia',
    category: 'starters',
    price: 19,
    shortDescription: 'Creamy heirloom burrata with roasted mission figs, aged Modena balsamic, and grilled sourdough.',
    longDescription: 'Imported pugliese burrata cheese filled with rich stracciatella, surrounded by honey-caramelized mission figs, toasted Sicilian pine nuts, freshly plucked basil, and a 25-year reserve balsamic drizzle.',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
    reviewCount: 98,
    calories: 460,
    prepTime: '12 mins',
    tags: ['Vegetarian', 'Organic'],
    ingredients: ['Apulian Burrata', 'Heirloom Mission Figs', 'Pine Nuts', 'Wild Basil', 'Aged Balsamic Glaze', 'Charcoal Sourdough Toast'],
    allergens: ['Dairy', 'Gluten', 'Tree Nuts'],
    nutritionalInfo: { protein: '18g', carbs: '24g', fats: '32g' },
    customizationOptions: {
      sides: ['Gluten-Free Seed Bread', 'Extra Fig Chutney', 'Prosciutto di Parma add-on'],
      spiceLevels: ['Original Subtle', 'Cracked Pink Peppercorn']
    },
    reviews: [
      { id: 'r3', author: 'Julian B.', rating: 5, date: '2 weeks ago', comment: 'The creaminess of the burrata balanced with the roasted sweet figs is pure culinary poetry.' }
    ],
    isFeatured: false
  },
  {
    id: 'food-3',
    name: 'Prime Black Angus Filet Mignon',
    category: 'mains',
    price: 48,
    shortDescription: 'Grass-fed center-cut tenderloin with pomme purée, charred broccolini, and black truffle demi-glace.',
    longDescription: '28-day dry-aged center-cut Black Angus beef tenderloin cooked to exact temperature over white oak embers. Accompanied by Robuchon-style butter potato purée, glazed baby spring onions, and a 48-hour bone marrow demi-glace.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80',
    rating: 5.0,
    reviewCount: 230,
    calories: 680,
    prepTime: '25 mins',
    tags: ["Chef's Choice", 'Gluten-Free'],
    ingredients: ['28-Day Aged Beef Filet', 'Yukon Gold Potatoes', 'Normandy Butter', 'Black Winter Truffle', 'Veal Bone Reduction', 'Charred Broccolini'],
    allergens: ['Dairy'],
    nutritionalInfo: { protein: '52g', carbs: '22g', fats: '38g' },
    customizationOptions: {
      sides: ['Truffle Pomme Frites', 'Charred Asparagus with Hollandaise', 'Sautéed Wild Chanterelles'],
      spiceLevels: ['Classic Coarse Salt & Pepper', 'Smoked Bourbon Peppercorn Crust']
    },
    reviews: [
      { id: 'r4', author: 'Mark Sterling', rating: 5, date: 'Yesterday', comment: 'Cooked medium-rare to absolute flawlessness. The truffle reduction elevates this into an unforgettable dish.' },
      { id: 'r5', author: 'Sophie K.', rating: 5, date: '4 days ago', comment: 'The pomme purée alone is worth traveling across the city for. Highly recommended.' }
    ],
    isFeatured: true
  },
  {
    id: 'food-4',
    name: 'Chilean Sea Bass en Papillote',
    category: 'mains',
    price: 44,
    shortDescription: 'Wild sea bass baked with lemongrass, fennel confit, baby bok choy, and dashi citrus broth.',
    longDescription: 'Sustainably caught Chilean sea bass steamed in parchment with kaffir lime leaves, thinly shaved baby fennel, ginger batons, and shiitake mushrooms. Finished tableside with an aromatic lemongrass dashi bouillon.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    reviewCount: 114,
    calories: 520,
    prepTime: '22 mins',
    tags: ['Gluten-Free', 'Organic'],
    ingredients: ['Wild Chilean Sea Bass', 'Lemongrass', 'Fennel Bulb', 'Shiitake Caps', 'Ginger', 'Dashi Broth', 'Sesame Oil'],
    allergens: ['Fish', 'Sesame'],
    nutritionalInfo: { protein: '42g', carbs: '12g', fats: '24g' },
    customizationOptions: {
      sides: ['Fragrant Jasmine Rice', 'Steamed Organic Edamame', 'Chili Crunch Bok Choy'],
      spiceLevels: ['Aromatic Gentle', 'Ginger Citrus Kick', 'Sichuan Red Pepper Infused']
    },
    reviews: [
      { id: 'r6', author: 'Dr. Evelyn Reed', rating: 5, date: '5 days ago', comment: 'Flaky, buttery fish with an intoxicating citrus aroma when the wrapper opens. Extraordinary!' }
    ],
    isFeatured: true
  },
  {
    id: 'food-5',
    name: 'Handcrafted Truffle & Ricotta Ravioli',
    category: 'pasta',
    price: 32,
    shortDescription: 'Fresh egg pasta pockets filled with buffalo ricotta, sage brown butter, and shaved Norcia black truffles.',
    longDescription: 'Extruded daily using organic semolina and pasture-raised egg yolks. Plump pockets stuffed with artisanal buffalo ricotta, Parmigiano-Reggiano Vacche Rosse, and folded gently into foaming sage butter with shaved Italian truffles.',
    image: 'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    reviewCount: 184,
    calories: 590,
    prepTime: '18 mins',
    tags: ['Vegetarian', "Chef's Choice"],
    ingredients: ['Semolina Egg Pasta', 'Fresh Buffalo Ricotta', 'Norcia Black Truffle', 'Aged Parmigiano', 'Alpine Brown Butter', 'Crispy Garden Sage'],
    allergens: ['Gluten', 'Eggs', 'Dairy'],
    nutritionalInfo: { protein: '22g', carbs: '64g', fats: '28g' },
    customizationOptions: {
      sides: ['Garlic Herb Ciabatta', 'Baby Spinach Salad', 'Extra Shaved Truffle (+ $6)'],
      spiceLevels: ['Gentle Nutty', 'Cracked Black Pepper']
    },
    reviews: [
      { id: 'r7', author: 'Gianna R.', rating: 5, date: '1 week ago', comment: 'Reminded me of the best trattorias in Florence. Rich, decadent, and deeply comforting.' }
    ],
    isFeatured: true
  },
  {
    id: 'food-6',
    name: 'Wild Mushroom & Saffron Risotto',
    category: 'pasta',
    price: 29,
    shortDescription: 'Acquerello carnaroli rice simmered with chanterelles, porcini, Spanish saffron, and mascarpone.',
    longDescription: 'Aged Carnaroli rice slowly coaxed with roasted mushroom stock, generous threads of Kashmiri saffron, and finished with mascarpone, thyme flowers, and crispy trumpet mushroom chips.',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
    reviewCount: 89,
    calories: 540,
    prepTime: '20 mins',
    tags: ['Vegetarian', 'Gluten-Free', 'Organic'],
    ingredients: ['Carnaroli Rice', 'Wild Porcini & Chanterelles', 'Saffron Stigmas', 'Mascarpone', 'Shallots', 'White Truffle Essence'],
    allergens: ['Dairy'],
    nutritionalInfo: { protein: '14g', carbs: '68g', fats: '22g' },
    customizationOptions: {
      sides: ['Focaccia with Rosemary', 'Warm Olive Tapenade', 'Side of Burrata (+ $5)'],
      spiceLevels: ['Earthy Classic', 'Touch of Chili Oil']
    },
    reviews: [
      { id: 'r8', author: 'Liam W.', rating: 5, date: '3 weeks ago', comment: 'The rice had that perfect al dente wave and the saffron aroma fills the entire table.' }
    ],
    isFeatured: false
  },
  {
    id: 'food-7',
    name: 'Valrhona Dark Chocolate Lava Tart',
    category: 'desserts',
    price: 16,
    shortDescription: 'Warm 72% Guanaja molten core with Madagascar vanilla bean gelato and gold leaf garnish.',
    longDescription: 'Single-origin French Valrhona chocolate sculpted in a crisp sablé crust. Breaks open to reveal a cascading molten ganache, paired with hand-churned vanilla bean ice cream and tart raspberry reduction.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
    rating: 5.0,
    reviewCount: 310,
    calories: 490,
    prepTime: '14 mins',
    tags: ['Vegetarian', "Chef's Choice"],
    ingredients: ['Valrhona 72% Chocolate', 'Bourbon Vanilla Bean', 'Normandy Cream', 'Pasture Eggs', 'Raspberry Coulis', 'Edible 24k Leaf'],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    nutritionalInfo: { protein: '9g', carbs: '54g', fats: '30g' },
    customizationOptions: {
      sides: ['Double Scoop Gelato', 'Salted Caramel Drizzle', 'Espresso Shot Affogato Style'],
      spiceLevels: ['Sweet & Decadent', 'Sea Salt Flake Sprinkle']
    },
    reviews: [
      { id: 'r9', author: 'Amelia T.', rating: 5, date: '2 days ago', comment: 'The undisputed showstopper. The contrast between warm molten chocolate and cold vanilla gelato is heavenly.' }
    ],
    isFeatured: true
  },
  {
    id: 'food-8',
    name: 'Bourbon Vanilla Bean Crème Brûlée',
    category: 'desserts',
    price: 14,
    shortDescription: 'Silky baked custard infused with Tahitian vanilla beans under an amber torched caramel crust.',
    longDescription: 'Traditional French egg custard enriched with heavy cream and flecks of whole Tahitian vanilla bean pods. Torched to order for an audible, glass-like sugar crackle, served with seasonal blackberries.',
    image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
    reviewCount: 165,
    calories: 420,
    prepTime: '10 mins',
    tags: ['Vegetarian', 'Gluten-Free'],
    ingredients: ['Tahitian Vanilla Pods', 'Heavy Organic Cream', 'Egg Yolks', 'Cane Sugar Crust', 'Fresh Blackberries'],
    allergens: ['Dairy', 'Eggs'],
    nutritionalInfo: { protein: '7g', carbs: '38g', fats: '26g' },
    customizationOptions: {
      sides: ['Almond Biscotti', 'Berry Medley', 'Lemon Thyme Sorbet'],
      spiceLevels: ['Pure Vanilla Sweetness']
    },
    reviews: [
      { id: 'r10', author: 'Nathan P.', rating: 5, date: '1 month ago', comment: 'Textbook crack on the top crust and the custard is silk-smooth without being heavy.' }
    ],
    isFeatured: false
  },
  {
    id: 'food-9',
    name: 'Smoked Rosemary Fig Elixir',
    category: 'beverages',
    price: 13,
    shortDescription: 'Charred mission fig reduction, clarified apple, smoked rosemary sprig, and sparkling botanicals.',
    longDescription: 'Our signature zero-proof cocktail. Handcrafted reduction of roasted black figs and Madagascar cinnamon, shaken with clarified mountain apple cider and poured over crystalline ice, garnished with a smoking rosemary spear.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    reviewCount: 77,
    calories: 110,
    prepTime: '5 mins',
    tags: ['Vegan', 'Gluten-Free', 'Organic'],
    ingredients: ['Roasted Fig Cordial', 'Clarified Fuji Apple', 'Organic Rosemary', 'Meyer Lemon', 'Artisan Tonic Water'],
    allergens: [],
    nutritionalInfo: { protein: '1g', carbs: '26g', fats: '0g' },
    customizationOptions: {
      sides: ['Candied Citrus Wheel', 'Sparkling Mineral Water Side'],
      spiceLevels: ['Standard Smokiness', 'Extra Torched Botanical Fragrance']
    },
    reviews: [
      { id: 'r11', author: 'Vanessa G.', rating: 5, date: '1 week ago', comment: 'Incredible depth! You do not miss alcohol at all when a drink is crafted with this level of nuance.' }
    ],
    isFeatured: false
  },
  {
    id: 'food-10',
    name: 'Blood Orange Hibiscus Spritz',
    category: 'beverages',
    price: 12,
    shortDescription: 'Sicilian blood orange juice, steeped wild hibiscus petals, elderflower, and bubbling soda.',
    longDescription: 'Pressed Sicilian blood oranges married with slow-steeped Egyptian hibiscus flowers and French elderflower essence. Vibrant crimson hue, effervescent, and refreshing with crushed mint.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80',
    rating: 4.7,
    reviewCount: 92,
    calories: 95,
    prepTime: '5 mins',
    tags: ['Vegan', 'Gluten-Free'],
    ingredients: ['Moro Blood Orange', 'Hibiscus Tea', 'Elderflower Extract', 'Club Soda', 'Spearmint'],
    allergens: [],
    nutritionalInfo: { protein: '0g', carbs: '22g', fats: '0g' },
    customizationOptions: {
      sides: ['Dehydrated Blood Orange Wheel', 'Fresh Mint Leaves'],
      spiceLevels: ['Crisp & Refreshing']
    },
    reviews: [
      { id: 'r12', author: 'Lucas M.', rating: 5, date: '2 weeks ago', comment: 'Gorgeous color and delightfully crisp on a warm afternoon.' }
    ],
    isFeatured: false
  },
  {
    id: 'food-11',
    name: 'Spicy Calabrian Chili Tiger Prawns',
    category: 'starters',
    price: 26,
    shortDescription: 'Wood-fired wild prawns in garlic-infused Calabrian chili oil with grilled sea salt focaccia.',
    longDescription: 'Sustainably farmed colossal tiger prawns sizzled in extra virgin olive oil steeped with fiery crushed Calabrian chilies, sweet garlic cloves, and fresh flat-leaf parsley. Served with toasted focaccia for dipping.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=80',
    rating: 4.8,
    reviewCount: 135,
    calories: 420,
    prepTime: '15 mins',
    tags: ['Spicy', "Chef's Choice"],
    ingredients: ['Wild Black Tiger Prawns', 'Calabrian Chili Oil', 'Roasted Garlic', 'Flat Parsley', 'Sea Salt Focaccia'],
    allergens: ['Shellfish', 'Gluten'],
    nutritionalInfo: { protein: '34g', carbs: '18g', fats: '22g' },
    customizationOptions: {
      sides: ['Extra Dipping Focaccia', 'Chilled Cucumber Ribbon Salad', 'Lemon Aioli'],
      spiceLevels: ['Medium Zest (Standard)', 'Fiery Calabrian Inferno', 'Mild Fragrant Garlic']
    },
    reviews: [
      { id: 'r13', author: 'Dante F.', rating: 5, date: '4 days ago', comment: 'The spice level has real punch without drowning out the sweetness of the prawns. Outstanding dip.' }
    ],
    isFeatured: false
  },
  {
    id: 'food-12',
    name: 'Pan-Roasted Duck Breast with Cherry Port Glaze',
    category: 'mains',
    price: 42,
    shortDescription: 'Hudson Valley duck breast with parsnip silk, glazed baby heirloom carrots, and spiced cherry port jus.',
    longDescription: 'Tender Hudson Valley duck breast scored and crisped to amber rendering. Accompanied by creamy parsnip velvet, baby carrots caramelized in duck fat, and a reduction of ruby port with tart Bing cherries and star anise.',
    image: 'https://images.unsplash.com/photo-1514944298352-bf1f12463e2d?auto=format&fit=crop&w=900&q=80',
    rating: 4.9,
    reviewCount: 156,
    calories: 640,
    prepTime: '24 mins',
    tags: ["Chef's Choice", 'Gluten-Free'],
    ingredients: ['Hudson Valley Duck Breast', 'Bing Cherries', 'Ruby Port Wine', 'Parsnips', 'Duck Confit Jus', 'Star Anise'],
    allergens: ['Dairy'],
    nutritionalInfo: { protein: '46g', carbs: '28g', fats: '34g' },
    customizationOptions: {
      sides: ['Crispy Duck Fat Potatoes', 'Braised Red Cabbage', 'Wild Rice Pilaf'],
      spiceLevels: ['Classic Sweet & Savory', 'Black Pepper & Allspice Glaze']
    },
    reviews: [
      { id: 'r14', author: 'Helena S.', rating: 5, date: '2 weeks ago', comment: 'The crisp skin with that succulent pink duck meat and cherry glaze is culinary perfection.' }
    ],
    isFeatured: true
  }
];

export const TESTIMONIALS = [
  {
    quote: "Savoria is a rare beacon of gastronomic authenticity. Chef Antoine’s duck breast and scallop creations exist in a realm of their own.",
    author: "Jonathan Gold Award Critic",
    outlet: "The Metropolitan Gourmet"
  },
  {
    quote: "From the seamless online ordering to their candlelit private alcoves, Savoria elevates every single touchpoint into pure luxury.",
    author: "Clara Hemingway",
    outlet: "Epicure & Travel Magazine"
  },
  {
    quote: "A masterclass in sustainable culinary art. The flavors are vivid, unmasked, and deeply evocative of the French countryside.",
    author: "Marcello Vivanti",
    outlet: "International Dining Review"
  }
];
