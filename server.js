// ============================================================================
// INOBEE SARL — Serveur Backend Node.js / Express API (Full-Stack)
// Maison Apicole Marocaine d'Exception · Miels Bruts & Apithérapie
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

// Journalisation simple des accès
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// ----------------------------------------------------------------------------
// BASE DE DONNÉES EN MÉMOIRE : CATALOGUE OFFICIEL DES PRODUITS
// ----------------------------------------------------------------------------
const PRODUCTS = [
  {
    id: 'daghmous',
    name: "Miel d'Euphorbe Sauvage (Daghmous)",
    category: 'rares',
    tagline: 'Tonus, gorge et voies respiratoires',
    terroir: 'Anti-Atlas · Terroir de Guelmim-Oued Noun',
    badge: 'Rare & Ardent',
    isRare: true,
    prices: { 250: 120, 500: 220, 1000: 400 },
    defaultWeight: 500,
    inventory: { inStock: true, stockUnits: 64 },
    image: 'assets/img/product-daghmous.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80',
    description: "Récolté sur les versants arides de l'Anti-Atlas, le miel de Daghmous se distingue par sa douce saveur initiale suivie d'une sensation de chaleur vive et stimulante au fond de la gorge.",
    benefits: [
      'Puissant tonifiant naturel pour les voies respiratoires et la gorge',
      'Action chauffante traditionnellement reconnue contre les refroidissements',
      'Riche en polyphénols antioxydants spécifiques des euphorbes marocaines',
      'Soutien naturel du tonus en période hivernale'
    ],
    sensory: { intensity: 95, sweetness: 45, floralNotes: 70, persistence: 90 },
    usage: '1 cuillère à café le matin à jeun. Avaler lentement pour laisser la chaleur bienfaisante enrober la gorge. Ne pas chauffer au-dessus de 40°C.',
    labData: { hmf: '6.4 mg/kg (Norme ONSSA < 40)', moisture: '15.8% (Pureté brute)', purity: '100% sans sucre ajouté' }
  },
  {
    id: 'thym',
    name: 'Miel de Thym Pur (Zâatar)',
    category: 'rares',
    tagline: 'Antiseptique naturel et digestion',
    terroir: 'Haut-Atlas · Plateaux d’Imouzzer (1 400m)',
    badge: 'Haut-Plateau',
    isRare: true,
    prices: { 250: 130, 500: 240, 1000: 450 },
    defaultWeight: 500,
    inventory: { inStock: true, stockUnits: 48 },
    image: 'assets/img/product-thym.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=900&q=80',
    description: "Issu du thym sauvage butiné en haute altitude sur les versants rocheux de l'Atlas. Sa robe ambrée foncée et ses arômes boisés puissants en font le joyau de l'apithérapie marocaine.",
    benefits: [
      'Remarquables propriétés antiseptiques et antibactériennes',
      'Favorise le confort digestif et l’apaisement gastrique',
      'Soutien respiratoire exceptionnel en cas d’irritation',
      'Favorise la cicatrisation naturelle des muqueuses'
    ],
    sensory: { intensity: 90, sweetness: 50, floralNotes: 85, persistence: 88 },
    usage: '1 cuillère à café diluée dans une infusion tiède ou prise pure au réveil avec un grand verre d’eau tiède.',
    labData: { hmf: '7.1 mg/kg', moisture: '16.1%', purity: '100% pur non pasteurisé' }
  },
  {
    id: 'sidr',
    name: 'Miel de Sidr Royal (Jujubier)',
    category: 'rares',
    tagline: 'Énergie, vitalité et prestige',
    terroir: 'Vallées préservées du Souss & Pré-Sahara',
    badge: 'Réserve Prestige',
    isRare: true,
    prices: { 250: 190, 500: 350, 1000: 650 },
    defaultWeight: 500,
    inventory: { inStock: true, stockUnits: 32 },
    image: 'assets/img/product-sidr.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=900&q=80',
    description: "Le Miel de Sidr (Jujubier sauvage) est l'un des nectars les plus recherchés au monde. Saveur riche aux notes de caramel boisé et de noisette, réputé pour sa densité minérale.",
    benefits: [
      'Grand tonifiant physique, hépatique et métabolique',
      'Riche en minéraux essentiels, calcium, fer et magnésium',
      'Propriétés réparatrices et renfort profond de l’immunité',
      'Cristallisation très lente préservant sa texture soyeuse'
    ],
    sensory: { intensity: 85, sweetness: 65, floralNotes: 80, persistence: 95 },
    usage: 'Une cuillère en bois le matin à jeun pour une énergie durable sans pic glycémique artificiel.',
    labData: { hmf: '5.2 mg/kg', moisture: '15.4%', purity: '100% Récolte Sauvage' }
  },
  {
    id: 'oranger',
    name: "Miel d'Oranger & Fleurs Sauvages",
    category: 'doux',
    tagline: 'Douceur quotidienne pour toute la famille',
    terroir: 'Plaines fertiles de Taroudant & Vergers du Souss',
    badge: 'Douceur Solaire',
    isRare: false,
    prices: { 250: 65, 500: 110, 1000: 200 },
    defaultWeight: 500,
    inventory: { inStock: true, stockUnits: 90 },
    image: 'assets/img/product-oranger.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=80',
    description: "Récolté lors de la floraison printanière des agrumes du Souss. Ce miel lumineux séduit petits et grands par son parfum frais de fleur d'oranger et sa douceur apaisante.",
    benefits: [
      'Idéal pour calmer l’agitation et préparer un sommeil serein',
      'Arôme floral délicat apprécié des enfants et bébés (dès 12 mois)',
      'Substitut sain et naturel au sucre blanc pour les boissons',
      'Effet relaxant naturel sur le système nerveux'
    ],
    sensory: { intensity: 60, sweetness: 85, floralNotes: 95, persistence: 65 },
    usage: 'Parfait le soir dans un verre de lait tiède ou au petit-déjeuner sur du pain complet.',
    labData: { hmf: '4.8 mg/kg', moisture: '16.5%', purity: '100% Floraison Souss' }
  },
  {
    id: 'pack-terroir',
    name: 'Pack Découverte Terroir (Trio 3 x 250g)',
    category: 'packs',
    tagline: 'Coffret dégustation idéal pour offrir ou s’initier',
    terroir: 'Sélection Tri-Régionale : Anti-Atlas, Haut-Atlas & Souss',
    badge: 'Édition Spéciale',
    isPack: true,
    prices: { 750: 320 },
    originalPrice: 370,
    defaultWeight: 750,
    inventory: { inStock: true, stockUnits: 25 },
    image: 'assets/img/product-pack.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=900&q=80',
    description: "Le coffret prestige réunissant les 3 trésors de l'apiculture marocaine : 1 pot de Daghmous (250g), 1 pot de Thym sauvage (250g), et 1 pot d'Oranger (250g). Livré avec une cuillère artisanale en bois d’oranger.",
    benefits: [
      '3 profils aromatiques et thérapeutiques complémentaires',
      'Économie immédiate de 50 MAD sur le tarif au détail',
      'Cuillère en bois d’oranger offerte dans chaque coffret',
      'Présentation soignée sous étui kraft rigide recyclable'
    ],
    sensory: { intensity: 85, sweetness: 65, floralNotes: 90, persistence: 85 },
    usage: 'Dégustation comparative ou cure apicole complète selon les besoins de la journée.',
    labData: { hmf: 'Conforme normes ONSSA', moisture: '< 17%', purity: 'Coffret 3x250g scellé' }
  }
];

// Codes Promo valides
const PROMO_CODES = {
  'INOBEE10': { discountPercent: 10, description: 'Remise de Bienvenue -10%' },
  'BIENVENUE': { discountPercent: 10, description: 'Offre Découverte -10%' },
  'ATLAS15': { discountPercent: 15, minOrder: 500, description: 'Privilège Atlas -15% dès 500 MAD' }
};

// Villes marocaines autorisées pour la livraison
const MOROCCAN_CITIES = [
  'Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Agadir', 
  'Meknès', 'Oujda', 'Kénitra', 'Tétouan', 'Salé', 'Témara', 
  'Mohammédia', 'El Jadida', 'Nador', 'Béni Mellal', 'Safi', 
  'Guelmim', 'Autre Ville (Maroc)'
];

// Stockage persistant des commandes en fichier JSON local
const ORDERS_FILE = path.join(__dirname, 'orders.json');
let ordersDatabase = [];

try {
  if (fs.existsSync(ORDERS_FILE)) {
    ordersDatabase = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
  }
} catch (err) {
  console.error("Initialisation base de commandes locale:", err.message);
  ordersDatabase = [];
}

const saveOrdersToFile = () => {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(ordersDatabase, null, 2), 'utf8');
  } catch (err) {
    console.error("Erreur lors de la sauvegarde des commandes:", err.message);
  }
};

// ----------------------------------------------------------------------------
// ENDPOINTS API REST
// ----------------------------------------------------------------------------

// 1. GET /api/health — Statut de l'API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Inobee SARL',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 2. GET /api/products — Liste des miels avec formats et tarifs MAD
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

// 3. GET /api/products/:id — Détail d'un produit spécifique
app.get('/api/products/:id', (req, res) => {
  const product = PRODUCTS.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Produit introuvable' });
  }
  res.json({ success: true, product });
});

// 4. POST /api/promo/validate — Validation des codes promo
app.post('/api/promo/validate', (req, res) => {
  const { code, subtotal = 0 } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, message: 'Veuillez saisir un code promo' });
  }

  const cleanCode = code.trim().toUpperCase();
  const promo = PROMO_CODES[cleanCode];

  if (!promo) {
    return res.status(404).json({
      success: false,
      valid: false,
      message: 'Code promo invalide ou expiré'
    });
  }

  if (promo.minOrder && subtotal < promo.minOrder) {
    return res.status(400).json({
      success: false,
      valid: false,
      message: `Ce code nécessite un panier minimum de ${promo.minOrder} MAD`
    });
  }

  const discountAmount = Math.round((subtotal * promo.discountPercent) / 100);

  res.json({
    success: true,
    valid: true,
    code: cleanCode,
    discountPercent: promo.discountPercent,
    discountAmount: discountAmount,
    description: promo.description,
    message: `Code appliqué : -${promo.discountPercent}% sur votre commande !`
  });
});

// 5. POST /api/orders — Création et validation d'une commande Cash on Delivery
app.post('/api/orders', (req, res) => {
  const { customer, items, promoCode } = req.body;

  if (!customer) {
    return res.status(400).json({ success: false, message: 'Données client manquantes' });
  }

  const { fullName, phone, city, address, notes } = customer;

  if (!fullName || fullName.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Nom et prénom requis (min. 2 caractères)' });
  }

  const cleanPhone = (phone || '').replace(/\s+/g, '');
  const isValidMoroccanPhone = /^(0[567])[0-9]{8}$/.test(cleanPhone) || /^\+212[567][0-9]{8}$/.test(cleanPhone);
  if (!isValidMoroccanPhone) {
    return res.status(400).json({ 
      success: false, 
      message: 'Numéro de téléphone marocain invalide (ex: 06 12 34 56 78)' 
    });
  }

  if (!city || !MOROCCAN_CITIES.includes(city)) {
    return res.status(400).json({ success: false, message: 'Ville de livraison non reconnue' });
  }

  if (!address || address.trim().length < 5) {
    return res.status(400).json({ success: false, message: 'Adresse complète requise pour le transporteur' });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Le panier ne peut pas être vide' });
  }

  // Recalcul sécurisé côté serveur pour éviter les fraudes tarifaires
  let computedSubtotal = 0;
  const verifiedItems = [];

  for (const item of items) {
    const product = PRODUCTS.find(p => p.id === item.productId || p.id === item.id);
    if (!product) {
      return res.status(400).json({ success: false, message: `Produit invalide: ${item.name || item.id}` });
    }

    const weight = item.weight || product.defaultWeight;
    const unitPrice = product.prices[weight];
    if (!unitPrice) {
      return res.status(400).json({ success: false, message: `Format ${weight}g indisponible pour ${product.name}` });
    }

    const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);
    const lineTotal = unitPrice * quantity;
    computedSubtotal += lineTotal;

    verifiedItems.push({
      productId: product.id,
      name: product.name,
      weight: weight,
      isPack: product.isPack || false,
      unitPrice: unitPrice,
      quantity: quantity,
      lineTotal: lineTotal
    });
  }

  // Application de la remise promo
  let discountAmount = 0;
  let appliedPromo = null;
  if (promoCode) {
    const cleanCode = promoCode.trim().toUpperCase();
    const promo = PROMO_CODES[cleanCode];
    if (promo && (!promo.minOrder || computedSubtotal >= promo.minOrder)) {
      discountAmount = Math.round((computedSubtotal * promo.discountPercent) / 100);
      appliedPromo = { code: cleanCode, discountPercent: promo.discountPercent, amount: discountAmount };
    }
  }

  // Calcul Franco de port dès 400 MAD
  const deliveryFee = computedSubtotal >= 400 ? 0 : 35;
  const finalTotal = Math.max(0, computedSubtotal - discountAmount + deliveryFee);

  // Génération de la référence officielle de suivi
  const orderRef = `CMD-INB-2026-${Math.floor(100000 + Math.random() * 900000)}`;

  const newOrder = {
    orderId: orderRef,
    date: new Date().toISOString(),
    status: 'en_attente_preparation',
    paymentMethod: 'Cash on Delivery (Espèces à la livraison)',
    customer: {
      fullName: fullName.trim(),
      phone: cleanPhone,
      city: city,
      address: address.trim(),
      notes: (notes || '').trim()
    },
    items: verifiedItems,
    totals: {
      subtotal: computedSubtotal,
      discount: discountAmount,
      promo: appliedPromo,
      deliveryFee: deliveryFee,
      total: finalTotal,
      currency: 'MAD'
    }
  };

  ordersDatabase.unshift(newOrder);
  saveOrdersToFile();

  // Lien WhatsApp officiel pré-formaté
  const whatsappNumber = '212600000000';
  let waMessage = `*COMMANDE OFFICIELLE INOBEE SARL*\n`;
  waMessage += `Réf : ${orderRef}\n\n`;
  waMessage += `*Articles Commandés :*\n`;
  verifiedItems.forEach(it => {
    const formatLabel = it.isPack ? 'Coffret 3×250g' : `${it.weight}g`;
    waMessage += `• ${it.quantity}x ${it.name} (${formatLabel}) = ${it.lineTotal} MAD\n`;
  });
  waMessage += `\nSous-total : ${computedSubtotal} MAD`;
  if (discountAmount > 0) waMessage += `\nRemise Code : -${discountAmount} MAD`;
  waMessage += `\nLivraison : ${deliveryFee === 0 ? 'Gratuite (Franco 400 MAD)' : '35 MAD'}`;
  waMessage += `\n*TOTAL NET À RÉGLER AU LIVREUR : ${finalTotal} MAD*\n\n`;
  waMessage += `*Destinataire :*\n`;
  waMessage += `Nom : ${fullName}\n`;
  waMessage += `Tél : ${cleanPhone}\n`;
  waMessage += `Ville : ${city}\n`;
  waMessage += `Adresse : ${address}\n`;
  if (notes) waMessage += `Instructions : ${notes}\n`;
  waMessage += `\nMode de paiement : Espèces à la livraison.`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

  res.status(201).json({
    success: true,
    orderId: orderRef,
    message: 'Votre commande a été confirmée avec succès. Préparation en cours au rucher.',
    order: newOrder,
    whatsappUrl: whatsappUrl
  });
});

// 6. GET /api/orders/:orderId — Consultation du statut d'une commande
app.get('/api/orders/:orderId', (req, res) => {
  const order = ordersDatabase.find(o => o.orderId === req.params.orderId);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Numéro de commande introuvable' });
  }
  res.json({ success: true, order });
});

// ----------------------------------------------------------------------------
// SERVEUR STATIQUE POUR LA PRODUCTION (SPA REACT BUILDÉE DANS DIST)
// ----------------------------------------------------------------------------
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

// Gestion 404 pour les routes API
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route introuvable' });
});

// ----------------------------------------------------------------------------
// DÉMARRAGE DU SERVEUR
// ----------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  INOBEE SARL — Serveur Full-Stack Express API`);
  console.log(`  Statut : Prêt sur http://localhost:${PORT}`);
  console.log(`  Endpoints :`);
  console.log(`   - GET  /api/products`);
  console.log(`   - POST /api/orders`);
  console.log(`   - POST /api/promo/validate`);
  console.log(`   - GET  /api/health`);
  console.log(`====================================================`);
});
