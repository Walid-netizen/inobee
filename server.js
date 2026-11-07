// ============================================================================
// INOBEE SARL — Serveur Backend Node.js / Express API (Full-Stack Luxury Store)
// Haute Apiculture Marocaine · Miels Bruts & Apithérapie de Précision
// ============================================================================

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// ----------------------------------------------------------------------------
// MIDDLEWARES DE SÉCURITÉ & ANALYSE DE REQUÊTES
// ----------------------------------------------------------------------------
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serveur d'assets statiques (images produits, logos)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Journalisation des requêtes
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// ----------------------------------------------------------------------------
// BASE DE DONNÉES EN MÉMOIRE : CATALOGUE OFFICIEL DES 8 PRODUITS
// ----------------------------------------------------------------------------
const HONEY_IMAGES = {
  hero: '/assets/img/hero-honey.jpg',
  daghmous: '/assets/img/product-daghmous.jpg',
  thym: '/assets/img/product-thym.jpg',
  sidr: '/assets/img/product-sidr.jpg',
  oranger: '/assets/img/product-oranger-citrus.jpg',
  caroubier: '/assets/img/product-caroubier.jpg',
  lavande: '/assets/img/product-oranger.jpg',
  complexe: '/assets/img/product-elixir.jpg',
  coffret: '/assets/img/product-pack-trio.jpg'
};

const PRODUCTS = [
  {
    id: 'daghmous',
    name: "Miel d'Euphorbe Sauvage (Daghmous)",
    category: 'rares',
    tagline: 'Gorge, voies respiratoires et chaleur corporelle',
    terroir: 'Anti-Atlas · Guelmim-Oued Noun (950m)',
    badge: 'Grand Cru',
    lotNumber: 'LOT-DAGH-26',
    goalTags: ['throat', 'energy'],
    keywords: ['gorge', 'respiratoire', 'daghmous', 'euphorbe', 'chaleur', 'tonus', 'toux', 'immunité'],
    prices: { 250: 120, 500: 220, 1000: 400 },
    defaultWeight: 500,
    inventory: { inStock: true, stockUnits: 42 },
    image: HONEY_IMAGES.daghmous,
    fallbackImage: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80',
    description: "Récolté sur les versants minéraux de l'Anti-Atlas à partir d'Euphorbia resinifera endémique. Ce grand cru se distingue par son attaque veloutée suivie d'une sensation poivrée et chauffante unique au fond de la gorge.",
    benefits: [
      'Action chauffante ciblée sur la sphère ORL, la gorge et les bronches',
      'Haute concentration en composés phénoliques bioactifs',
      'Stimulant naturel de la vitalité et du tonus cardiovasculaire',
      'Extraction centrifuge à froid garantissant l’intégrité enzymatique'
    ],
    sensory: { sweetness: 45, intensity: 95, woodyAroma: 90 },
    posology: 'Prendre 1 cuillère à café pure à jeun le matin ou le soir avant le coucher. Laisser fondre lentement au fond de la gorge sans mélanger à un liquide bouillant (max 38°C).',
    labData: {
      lot: 'LOT-DAGH-26',
      hmf: '6.4 mg/kg',
      moisture: '15.8%',
      pollenPurity: '94%',
      harvestDate: 'Juillet 2026'
    }
  },
  {
    id: 'thym',
    name: 'Miel de Thym Pur (Zâatar du Moyen Atlas)',
    category: 'rares',
    tagline: 'Antiseptique pulmonaire et digestion',
    terroir: 'Moyen & Haut-Atlas · Plateaux d’Imouzzer (1 450m)',
    badge: 'Grand Cru',
    lotNumber: 'LOT-THYM-26',
    goalTags: ['throat', 'energy'],
    keywords: ['thym', 'zaatar', 'pulmonaire', 'antiseptique', 'digestion', 'gorge', 'bronches', 'hiver'],
    prices: { 250: 130, 500: 240, 1000: 450 },
    defaultWeight: 500,
    inventory: { inStock: true, stockUnits: 38 },
    image: HONEY_IMAGES.thym,
    fallbackImage: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
    description: "Butiné sur le Thymus satureioides sauvage des plateaux calcaires de l'Atlas. Sa robe ambrée cuivrée révèle des notes aromatiques puissantes riches en thymol et carvacrol naturels.",
    benefits: [
      'Assainissement profond des voies respiratoires supérieures',
      'Soutien actif du confort digestif et de la flore intestinale',
      'Propriétés cicatrisantes et apaisantes sur les muqueuses irritées',
      'Richesse naturelle en oligo-éléments (cuivre, fer, bore)'
    ],
    sensory: { sweetness: 50, intensity: 90, woodyAroma: 88 },
    posology: '1 cuillère à café diluée dans une infusion tiède de plantes ou consommée pure 20 minutes avant le repas principal.',
    labData: {
      lot: 'LOT-THYM-26',
      hmf: '7.1 mg/kg',
      moisture: '16.0%',
      pollenPurity: '92%',
      harvestDate: 'Juin 2026'
    }
  },
  {
    id: 'sidr',
    name: 'Miel de Sidr Royal (Jujubier Sauvage)',
    category: 'rares',
    tagline: 'Grand cru d’exception, énergie et système immunitaire',
    terroir: 'Vallées Pré-Sahariennes & Souss (700m)',
    badge: 'Grand Cru',
    lotNumber: 'LOT-SIDR-26',
    goalTags: ['energy', 'throat'],
    keywords: ['sidr', 'jujubier', 'royal', 'énergie', 'immunitaire', 'immunité', 'vitalité', 'prestige'],
    prices: { 250: 190, 500: 350, 1000: 650 },
    defaultWeight: 500,
    inventory: { inStock: true, stockUnits: 19 },
    image: HONEY_IMAGES.sidr,
    fallbackImage: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80',
    description: "Joyau de la haute apiculture mondiale, récolté une seule fois par an sur les jujubiers sauvages. Sa texture soyeuse et ses notes de caramel boisé et de beurre salé en font le nectar le plus prisé des connaisseurs.",
    benefits: [
      'Revitalisant cellulaire d’exception pour la récupération physique',
      'Renforcement profond des défenses immunitaires naturelles',
      'Haute biodisponibilité minérale (magnésium, potassium, zinc)',
      'Cristallisation ultra-lente préservant une onctuosité remarquable'
    ],
    sensory: { sweetness: 68, intensity: 86, woodyAroma: 94 },
    posology: '1 cuillère en bois d’olivier chaque matin à jeun accompagnée d’un verre d’eau de source à température ambiante.',
    labData: {
      lot: 'LOT-SIDR-26',
      hmf: '5.2 mg/kg',
      moisture: '15.2%',
      pollenPurity: '96%',
      harvestDate: 'Octobre 2026'
    }
  },
  {
    id: 'oranger',
    name: "Miel d'Oranger & Fleurs Sauvages",
    category: 'doux',
    tagline: 'Douceur fruitée, relaxant naturel pour toute la famille',
    terroir: 'Vergers Ancestraux de Taroudant & Souss (320m)',
    badge: 'Bio & Pur',
    lotNumber: 'LOT-ORAN-26',
    goalTags: ['breakfast'],
    keywords: ['oranger', 'fleurs', 'doux', 'famille', 'petit-déjeuner', 'sommeil', 'relaxant', 'enfants'],
    prices: { 250: 65, 500: 110, 1000: 200 },
    defaultWeight: 500,
    inventory: { inStock: true, stockUnits: 85 },
    image: HONEY_IMAGES.oranger,
    fallbackImage: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80',
    description: "Issu de la floraison printanière des fleurs de néroli dans la vallée du Souss. Lumineux et délicatement parfumé, il offre une texture fondante idéale pour la table familiale et l'apaisement vespéral.",
    benefits: [
      'Propriétés calmantes favorisant l’endormissement serein',
      'Profil aromatique floral et fruité plébiscité au petit-déjeuner',
      'Alternative saine et enzymatique aux sucres raffinés',
      'Parfaitement adapté aux enfants (à partir de 12 mois)'
    ],
    sensory: { sweetness: 88, intensity: 52, woodyAroma: 35 },
    posology: 'À déguster au petit-déjeuner sur pain au levain ou le soir dilué dans une tisane tiède pour favoriser la détente.',
    labData: {
      lot: 'LOT-ORAN-26',
      hmf: '4.8 mg/kg',
      moisture: '16.4%',
      pollenPurity: '91%',
      harvestDate: 'Avril 2026'
    }
  },
  {
    id: 'caroubier',
    name: 'Miel de Caroubier (Kharroub)',
    category: 'rares',
    tagline: 'Riche en oligo-éléments et protecteur digestif',
    terroir: 'Contreforts de Béni Mellal & Moyen Atlas (850m)',
    badge: 'Bio & Pur',
    lotNumber: 'LOT-KHAR-26',
    goalTags: ['energy', 'breakfast'],
    keywords: ['caroubier', 'kharroub', 'digestif', 'estomac', 'fer', 'oligo-éléments', 'chocolaté'],
    prices: { 250: 100, 500: 180, 1000: 330 },
    defaultWeight: 500,
    inventory: { inStock: true, stockUnits: 34 },
    image: HONEY_IMAGES.caroubier,
    fallbackImage: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
    description: "Récolté en automne lors de la floraison des caroubiers sauvages. Ce miel sombre aux reflets d'ébène développe des notes chaudes de cacao torréfié, de malt et de figue sèche.",
    benefits: [
      'Protection remarquable de la sphère gastro-intestinale',
      'Concentration élevée en fer assimilable, calcium et polyphénols',
      'Soutien naturel contre la fatigue chronique et l’anémie',
      'Régulateur doux du transit digestif'
    ],
    sensory: { sweetness: 62, intensity: 82, woodyAroma: 92 },
    posology: '1 cuillère à café avant les principaux repas pour tapisser et apaiser la muqueuse gastrique.',
    labData: {
      lot: 'LOT-KHAR-26',
      hmf: '6.0 mg/kg',
      moisture: '15.9%',
      pollenPurity: '93%',
      harvestDate: 'Septembre 2026'
    }
  },
  {
    id: 'lavande',
    name: 'Miel de Lavande Sauvage',
    category: 'doux',
    tagline: 'Notes florales délicates, apaisant et anti-stress',
    terroir: 'Vallées d’Altitude du Haut-Atlas Central (1 600m)',
    badge: 'Bio & Pur',
    lotNumber: 'LOT-LAVA-26',
    goalTags: ['breakfast', 'throat'],
    keywords: ['lavande', 'stress', 'apaisant', 'sommeil', 'floral', 'doux', 'migraine', 'calme'],
    prices: { 250: 115, 500: 210, 1000: 390 },
    defaultWeight: 500,
    inventory: { inStock: true, stockUnits: 29 },
    image: HONEY_IMAGES.lavande,
    fallbackImage: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80',
    description: "Issu des lavandes sauvages d'altitude baignées par le soleil de l'Atlas. Sa texture fine et crémeuse dévoile un bouquet aromatique aérien, long en bouche et subtilement balsamique.",
    benefits: [
      'Action neuro-apaisante naturelle contre le stress et les tensions',
      'Apaise les maux de tête et favorise un sommeil réparateur',
      'Propriétés anti-inflammatoires douces sur les voies respiratoires',
      'Texture onctueuse d’une grande finesse gastronomique'
    ],
    sensory: { sweetness: 78, intensity: 68, woodyAroma: 58 },
    posology: '1 cuillère à café le soir après le dîner, pure ou accompagnée d’une infusion de verveine.',
    labData: {
      lot: 'LOT-LAVA-26',
      hmf: '5.5 mg/kg',
      moisture: '16.1%',
      pollenPurity: '90%',
      harvestDate: 'Juillet 2026'
    }
  },
  {
    id: 'complexe-royal',
    name: 'Complexe Royal Immunité (Miel, Gelée Royale, Propolis & Pollen)',
    category: 'apitherapie',
    tagline: 'Cure intensive d’apithérapie 30 jours',
    terroir: 'Formulation Synergique · Atelier Apicole Inobee',
    badge: 'Cure 30j',
    lotNumber: 'LOT-ELIX-26',
    goalTags: ['energy', 'throat'],
    keywords: ['complexe', 'gelée royale', 'propolis', 'pollen', 'immunité', 'cure', 'apithérapie', 'énergie'],
    prices: { 250: 290, 500: 540, 1000: 980 },
    defaultWeight: 250,
    inventory: { inStock: true, stockUnits: 24 },
    image: HONEY_IMAGES.complexe,
    fallbackImage: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
    description: "Formule magistrale d'apithérapie unissant notre miel de Thym du Moyen Atlas à la Gelée Royale fraîche (10-HDA garanti), l'extrait purifié de Propolis brune et le pollen polyfloral cryo-broyé.",
    benefits: [
      'Synergie 4-en-1 stimulant puissamment l’immunité cellulaire',
      'Réduction rapide de l’épuisement physique et intellectuel',
      'Bouclier hivernal complet riche en acides aminés et vitamines B',
      'Concentration optimale calibrée pour un protocole de 30 jours'
    ],
    sensory: { sweetness: 55, intensity: 92, woodyAroma: 85 },
    posology: 'Cure de 30 jours : mélanger soigneusement avec une cuillère en bois et prendre 1 cuillère à café rase chaque matin à jeun sous la langue.',
    labData: {
      lot: 'LOT-ELIX-26',
      hmf: '5.9 mg/kg',
      moisture: '15.6%',
      pollenPurity: '98%',
      harvestDate: 'Août 2026'
    }
  },
  {
    id: 'coffret-prestige',
    name: 'Coffret Prestige Dégustation (Trio 3 x 250g)',
    category: 'apitherapie',
    tagline: 'Coffret cadeau luxe avec cuillère en bois d’olivier',
    terroir: 'Collection Tri-Régionale · Anti-Atlas, Moyen Atlas & Souss',
    badge: 'Grand Cru',
    lotNumber: 'LOT-TRIO-26',
    goalTags: ['energy', 'throat', 'breakfast'],
    keywords: ['coffret', 'prestige', 'cadeau', 'trio', 'dégustation', 'pack', 'olivier'],
    prices: { 250: 220, 500: 380, 1000: 690 },
    defaultWeight: 500,
    inventory: { inStock: true, stockUnits: 31 },
    image: HONEY_IMAGES.coffret,
    fallbackImage: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80',
    description: "Écrin de haute dégustation réunissant nos trois crus emblématiques (Daghmous Sauvage, Thym de l'Atlas, Sidr Royal) accompagné d'une cuillère artisanale sculptée en bois d'olivier de l'Atlas.",
    benefits: [
      'Voyage sensoriel complet à travers 3 terroirs marocains certifiés',
      'Cuillère de service en bois d’olivier massif incluse dans le coffret',
      'Écrin rigide texturé doré à chaud prêt à offrir',
      'Certificat d’analyse physico-chimique individuel inclus'
    ],
    sensory: { sweetness: 68, intensity: 88, woodyAroma: 90 },
    posology: 'Dégustation comparative : commencer par le cru le plus doux le matin et terminer par le Daghmous ou le Thym en soirée.',
    labData: {
      lot: 'LOT-TRIO-26',
      hmf: '5.8 mg/kg',
      moisture: '15.7%',
      pollenPurity: '95%',
      harvestDate: 'Septembre 2026'
    }
  }
];

const PROMO_CODES = {
  'INOBEE10': { discountPercent: 10, description: 'Privilège Maison Inobee -10%' },
  'BIENVENUE': { discountPercent: 10, description: 'Offre Première Commande -10%' },
  'ATLAS15': { discountPercent: 15, minOrder: 500, description: 'Réserve Atlas -15% dès 500 MAD' }
};

const MOROCCAN_CITIES = [
  'Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Agadir',
  'Meknès', 'Oujda', 'Kénitra', 'Tétouan', 'Salé', 'Témara',
  'Mohammédia', 'El Jadida', 'Nador', 'Béni Mellal', 'Safi',
  'Guelmim', 'Autre Ville (Maroc)'
];

const ORDERS_FILE = path.join(__dirname, 'orders.json');
let ordersDatabase = [];

try {
  if (fs.existsSync(ORDERS_FILE)) {
    ordersDatabase = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
  }
} catch (err) {
  ordersDatabase = [];
}

const saveOrdersToFile = () => {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(ordersDatabase, null, 2), 'utf8');
  } catch (err) {
    console.error('Erreur sauvegarde commandes:', err.message);
  }
};

// ----------------------------------------------------------------------------
// ENDPOINTS API REST
// ----------------------------------------------------------------------------

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Inobee SARL',
    skuCount: PRODUCTS.length,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/products', (req, res) => {
  const { category } = req.query;
  let result = PRODUCTS;

  if (category && category !== 'all') {
    result = PRODUCTS.filter(p => p.category === category);
  }

  res.json({
    success: true,
    count: result.length,
    products: result
  });
});

app.get('/api/products/:id', (req, res) => {
  const product = PRODUCTS.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Produit introuvable' });
  }
  res.json({ success: true, product });
});

app.post('/api/promo/validate', (req, res) => {
  const { code, subtotal = 0 } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, valid: false, message: 'Veuillez saisir un code privilège' });
  }

  const cleanCode = code.trim().toUpperCase();
  const promo = PROMO_CODES[cleanCode];

  if (!promo) {
    return res.status(404).json({
      success: false,
      valid: false,
      message: 'Code privilège non reconnu ou expiré'
    });
  }

  if (promo.minOrder && subtotal < promo.minOrder) {
    return res.status(400).json({
      success: false,
      valid: false,
      message: `Ce code requiert un panier minimum de ${promo.minOrder} MAD`
    });
  }

  const discountAmount = Math.round((subtotal * promo.discountPercent) / 100);

  res.json({
    success: true,
    valid: true,
    code: cleanCode,
    discountPercent: promo.discountPercent,
    discountAmount,
    description: promo.description,
    message: `Remise de -${promo.discountPercent}% appliquée à votre sélection.`
  });
});

app.post('/api/orders', (req, res) => {
  const { customer, items, promoCode } = req.body;

  if (!customer) {
    return res.status(400).json({ success: false, message: 'Coordonnées client requises' });
  }

  const { fullName, phone, city, address, notes } = customer;

  if (!fullName || fullName.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Veuillez indiquer votre nom complet' });
  }

  const cleanPhone = (phone || '').replace(/\s+/g, '');
  const isValidMoroccanPhone = /^(0[567])[0-9]{8}$/.test(cleanPhone) || /^\+212[567][0-9]{8}$/.test(cleanPhone);
  if (!isValidMoroccanPhone) {
    return res.status(400).json({
      success: false,
      message: 'Format de numéro marocain attendu (ex: 06 12 34 56 78)'
    });
  }

  if (!city) {
    return res.status(400).json({ success: false, message: 'Veuillez sélectionner votre ville de livraison' });
  }

  if (!address || address.trim().length < 5) {
    return res.status(400).json({ success: false, message: 'Veuillez préciser votre adresse de livraison' });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Votre sélection est vide' });
  }

  let computedSubtotal = 0;
  const verifiedItems = [];

  for (const item of items) {
    const product = PRODUCTS.find(p => p.id === item.productId || p.id === item.id);
    const weight = Number(item.weight) || (product ? product.defaultWeight : 500);
    const unitPrice = product && product.prices[weight] ? product.prices[weight] : Number(item.price) || 200;
    const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
    const lineTotal = unitPrice * qty;

    computedSubtotal += lineTotal;
    verifiedItems.push({
      productId: product ? product.id : item.productId,
      name: product ? product.name : item.name,
      weight,
      unitPrice,
      quantity: qty,
      lineTotal
    });
  }

  let discountAmount = 0;
  let appliedPromo = null;

  if (promoCode) {
    const cleanCode = promoCode.trim().toUpperCase();
    const promo = PROMO_CODES[cleanCode];
    if (promo && (!promo.minOrder || computedSubtotal >= promo.minOrder)) {
      discountAmount = Math.round((computedSubtotal * promo.discountPercent) / 100);
      appliedPromo = { code: cleanCode, discountPercent: promo.discountPercent, discountAmount };
    }
  }

  const deliveryFee = computedSubtotal >= 400 ? 0 : 35;
  const finalTotal = Math.max(0, computedSubtotal - discountAmount + deliveryFee);

  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  const orderId = `INB-2026-${randomDigits}`;

  const newOrder = {
    orderId,
    date: new Date().toISOString(),
    status: 'confirmee_expedition',
    paymentMethod: 'Paiement en Espèces à la Livraison (Cash on Delivery)',
    customer: {
      fullName: fullName.trim(),
      phone: cleanPhone,
      city,
      address: address.trim(),
      notes: notes ? notes.trim() : ''
    },
    items: verifiedItems,
    totals: {
      subtotal: computedSubtotal,
      discount: discountAmount,
      promo: appliedPromo,
      deliveryFee,
      total: finalTotal,
      currency: 'MAD'
    }
  };

  ordersDatabase.unshift(newOrder);
  saveOrdersToFile();

  const itemsText = verifiedItems
    .map(i => `- ${i.quantity}x ${i.name} (${i.weight === 1000 ? '1kg' : i.weight + 'g'}) : ${i.lineTotal} MAD`)
    .join('\n');

  const whatsappMessage = [
    `*COMMANDE OFFICIELLE INOBEE SARL*`,
    `Référence : ${orderId}`,
    ``,
    `*Sélection :*`,
    itemsText,
    ``,
    `Sous-total : ${computedSubtotal} MAD`,
    discountAmount > 0 ? `Remise Privilège : -${discountAmount} MAD` : null,
    `Livraison : ${deliveryFee === 0 ? 'Offerte (Franco 400 MAD)' : deliveryFee + ' MAD'}`,
    `*TOTAL NET À RÉGLER À LA LIVRAISON : ${finalTotal} MAD*`,
    ``,
    `*Coordonnées de Livraison :*`,
    `Client : ${newOrder.customer.fullName}`,
    `Tél : ${newOrder.customer.phone}`,
    `Ville : ${newOrder.customer.city}`,
    `Adresse : ${newOrder.customer.address}`
  ].filter(Boolean).join('\n');

  const whatsappUrl = `https://wa.me/212600000000?text=${encodeURIComponent(whatsappMessage)}`;

  res.status(201).json({
    success: true,
    orderId,
    message: 'Commande enregistrée avec succès. Préparation en cours à notre atelier apicole.',
    order: newOrder,
    whatsappUrl
  });
});

// Serveur statique de production
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.url.startsWith('/api') && !req.url.startsWith('/assets')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route introuvable' });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  INOBEE SARL — Serveur Full-Stack Express API`);
  console.log(`  Statut : Prêt sur http://localhost:${PORT}`);
  console.log(`====================================================`);
});
