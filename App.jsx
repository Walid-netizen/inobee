import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  Banknote,
  Sparkles,
  Star,
  Plus,
  Minus,
  Trash2,
  X,
  ArrowRight,
  ArrowUpRight,
  Check,
  Phone,
  MapPin,
  ChevronDown,
  Award,
  CheckCircle2,
  MessageCircle,
  Menu,
  Droplets,
  Tag,
  Loader2,
  Mountain,
  Flower2,
  Search,
  FlaskConical,
  QrCode,
  SlidersHorizontal,
  Eye,
  Zap,
  HeartPulse,
  Sun,
  FileCheck2,
  Clock,
  PackageCheck,
  Compass,
  Layers
} from 'lucide-react';

// ============================================================================
// INOBEE SARL — Haute Apiculture Marocaine & Apithérapie de Précision
// Flagship Luxury Storefront (Aesop / Apple Minimalist Aesthetic)
// Zero Emojis · 100% Vector Lucide Icons · 8 Grand Cru SKUs
// ============================================================================

const API_BASE =
  typeof window !== 'undefined' &&
  (window.location.port === '3000' || window.location.port === '5173')
    ? ''
    : typeof window !== 'undefined' && window.location.port === '5000'
    ? ''
    : 'http://localhost:5000';

// ============================================================================
// COMPOSANT LOGO OFFICIEL AVEC FALLBACK SVG GÉOMÉTRIQUE DORÉ
// ============================================================================
function BrandLogo({ className = 'h-11 w-auto object-contain', containerClassName = '' }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`inline-flex items-center justify-center ${containerClassName}`}
        title="Inobee SARL"
      >
        <svg
          viewBox="0 0 44 44"
          className="w-11 h-11 text-[#D97706]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="22,2 39,11.5 39,32.5 22,42 5,32.5 5,11.5"
            stroke="#D97706"
            strokeWidth="2"
            fill="#FAF7F2"
          />
          <polygon
            points="22,7 34,14.5 34,29.5 22,37 10,29.5 10,14.5"
            fill="#D97706"
            fillOpacity="0.14"
            stroke="#B45309"
            strokeWidth="1.2"
          />
          <circle cx="22" cy="22" r="5" fill="#D97706" />
          <path
            d="M15 17.5C15 15 18 13 22 13C26 13 29 15 29 17.5"
            stroke="#1A1008"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M16.5 26.5H27.5"
            stroke="#1A1008"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <img
      src="/assets/logo.png"
      alt="Inobee SARL"
      className={className}
      onError={() => setHasError(true)}
    />
  );
}

// ============================================================================
// PHOTOGRAPHIES STUDIO VÉRIFIÉES (LOCALES + FALLBACKS SÉCURISÉS)
// ============================================================================
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

// Profils sensoriels interactifs du Hero
const HERO_SENSORY_PROFILES = [
  {
    id: 'sidr',
    label: 'Sidr Royal',
    region: 'Vallées du Souss',
    sweetness: 68,
    intensity: 86,
    woodyAroma: 94,
    hmf: '5.2 mg/kg',
    note: 'Caramel boisé, écorce noble et finale veloutée persistante'
  },
  {
    id: 'daghmous',
    label: 'Daghmous Sauvage',
    region: 'Anti-Atlas (950m)',
    sweetness: 45,
    intensity: 95,
    woodyAroma: 90,
    hmf: '6.4 mg/kg',
    note: 'Attaque florale suivie d’une chaleur résineuse intense en gorge'
  },
  {
    id: 'thym',
    label: 'Thym Zâatar',
    region: 'Moyen Atlas (1 450m)',
    sweetness: 50,
    intensity: 90,
    woodyAroma: 88,
    hmf: '7.1 mg/kg',
    note: 'Bouquet aromatique puissant riche en thymol naturel d’altitude'
  }
];

// Catalogue Officiel des 8 Produits Inobee SARL
const DEFAULT_PRODUCTS = [
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
    image: HONEY_IMAGES.daghmous,
    fallbackImage: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80',
    description:
      "Récolté sur les versants minéraux de l'Anti-Atlas à partir d'Euphorbia resinifera endémique. Ce grand cru se distingue par son attaque veloutée suivie d'une sensation poivrée et chauffante unique au fond de la gorge.",
    benefits: [
      'Action chauffante ciblée sur la sphère ORL, la gorge et les bronches',
      'Haute concentration en composés phénoliques bioactifs',
      'Stimulant naturel de la vitalité et du tonus cardiovasculaire',
      'Extraction centrifuge à froid garantissant l’intégrité enzymatique'
    ],
    sensory: { sweetness: 45, intensity: 95, woodyAroma: 90 },
    posology:
      'Prendre 1 cuillère à café pure à jeun le matin ou le soir avant le coucher. Laisser fondre lentement au fond de la gorge sans mélanger à un liquide bouillant (max 38°C).',
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
    image: HONEY_IMAGES.thym,
    fallbackImage: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
    description:
      "Butiné sur le Thymus satureioides sauvage des plateaux calcaires de l'Atlas. Sa robe ambrée cuivrée révèle des notes aromatiques puissantes riches en thymol et carvacrol naturels.",
    benefits: [
      'Assainissement profond des voies respiratoires supérieures',
      'Soutien actif du confort digestif et de la flore intestinale',
      'Propriétés cicatrisantes et apaisantes sur les muqueuses irritées',
      'Richesse naturelle en oligo-éléments (cuivre, fer, bore)'
    ],
    sensory: { sweetness: 50, intensity: 90, woodyAroma: 88 },
    posology:
      '1 cuillère à café diluée dans une infusion tiède de plantes ou consommée pure 20 minutes avant le repas principal.',
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
    image: HONEY_IMAGES.sidr,
    fallbackImage: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80',
    description:
      "Joyau de la haute apiculture mondiale, récolté une seule fois par an sur les jujubiers sauvages. Sa texture soyeuse et ses notes de caramel boisé et de beurre salé en font le nectar le plus prisé des connaisseurs.",
    benefits: [
      'Revitalisant cellulaire d’exception pour la récupération physique',
      'Renforcement profond des défenses immunitaires naturelles',
      'Haute biodisponibilité minérale (magnésium, potassium, zinc)',
      'Cristallisation ultra-lente préservant une onctuosité remarquable'
    ],
    sensory: { sweetness: 68, intensity: 86, woodyAroma: 94 },
    posology:
      '1 cuillère en bois d’olivier chaque matin à jeun accompagnée d’un verre d’eau de source à température ambiante.',
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
    image: HONEY_IMAGES.oranger,
    fallbackImage: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
    description:
      "Issu de la floraison printanière des fleurs de néroli dans la vallée du Souss. Lumineux et délicatement parfumé, il offre une texture fondante idéale pour la table familiale et l'apaisement vespéral.",
    benefits: [
      'Propriétés calmantes favorisant l’endormissement serein',
      'Profil aromatique floral et fruité plébiscité au petit-déjeuner',
      'Alternative saine et enzymatique aux sucres raffinés',
      'Parfaitement adapté aux enfants (à partir de 12 mois)'
    ],
    sensory: { sweetness: 88, intensity: 52, woodyAroma: 35 },
    posology:
      'À déguster au petit-déjeuner sur pain au levain ou le soir dilué dans une tisane tiède pour favoriser la détente.',
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
    image: HONEY_IMAGES.caroubier,
    fallbackImage: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
    description:
      "Récolté en automne lors de la floraison des caroubiers sauvages. Ce miel sombre aux reflets d'ébène développe des notes chaudes de cacao torréfié, de malt et de figue sèche.",
    benefits: [
      'Protection remarquable de la sphère gastro-intestinale',
      'Concentration élevée en fer assimilable, calcium et polyphénols',
      'Soutien naturel contre la fatigue chronique et l’anémie',
      'Régulateur doux du transit digestif'
    ],
    sensory: { sweetness: 62, intensity: 82, woodyAroma: 92 },
    posology:
      '1 cuillère à café avant les principaux repas pour tapisser et apaiser la muqueuse gastrique.',
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
    image: HONEY_IMAGES.lavande,
    fallbackImage: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80',
    description:
      "Issu des lavandes sauvages d'altitude baignées par le soleil de l'Atlas. Sa texture fine et crémeuse dévoile un bouquet aromatique aérien, long en bouche et subtilement balsamique.",
    benefits: [
      'Action neuro-apaisante naturelle contre le stress et les tensions',
      'Apaise les maux de tête et favorise un sommeil réparateur',
      'Propriétés anti-inflammatoires douces sur les voies respiratoires',
      'Texture onctueuse d’une grande finesse gastronomique'
    ],
    sensory: { sweetness: 78, intensity: 68, woodyAroma: 58 },
    posology:
      '1 cuillère à café le soir après le dîner, pure ou accompagnée d’une infusion de verveine.',
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
    image: HONEY_IMAGES.complexe,
    fallbackImage: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
    description:
      "Formule magistrale d'apithérapie unissant notre miel de Thym du Moyen Atlas à la Gelée Royale fraîche (10-HDA garanti), l'extrait purifié de Propolis brune et le pollen polyfloral cryo-broyé.",
    benefits: [
      'Synergie 4-en-1 stimulant puissamment l’immunité cellulaire',
      'Réduction rapide de l’épuisement physique et intellectuel',
      'Bouclier hivernal complet riche en acides aminés et vitamines B',
      'Concentration optimale calibrée pour un protocole de 30 jours'
    ],
    sensory: { sweetness: 55, intensity: 92, woodyAroma: 85 },
    posology:
      'Cure de 30 jours : mélanger soigneusement avec une cuillère en bois et prendre 1 cuillère à café rase chaque matin à jeun sous la langue.',
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
    image: HONEY_IMAGES.coffret,
    fallbackImage: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80',
    description:
      "Écrin de haute dégustation réunissant nos trois crus emblématiques (Daghmous Sauvage, Thym de l'Atlas, Sidr Royal) accompagné d'une cuillère artisanale sculptée en bois d'olivier de l'Atlas.",
    benefits: [
      'Voyage sensoriel complet à travers 3 terroirs marocains certifiés',
      'Cuillère de service en bois d’olivier massif incluse dans le coffret',
      'Écrin rigide texturé doré à chaud prêt à offrir',
      'Certificat d’analyse physico-chimique individuel inclus'
    ],
    sensory: { sweetness: 68, intensity: 88, woodyAroma: 90 },
    posology:
      'Dégustation comparative : commencer par le cru le plus doux le matin et terminer par le Daghmous ou le Thym en soirée.',
    labData: {
      lot: 'LOT-TRIO-26',
      hmf: '5.8 mg/kg',
      moisture: '15.7%',
      pollenPurity: '95%',
      harvestDate: 'Septembre 2026'
    }
  }
];

// Lots de Traçabilité Laboratoire
const TRACEABILITY_LOTS = {
  'LOT-DAGH-26': {
    code: 'LOT-DAGH-26',
    productName: "Miel d'Euphorbe Sauvage (Daghmous)",
    origin: 'Anti-Atlas · Rucher de Guelmim-Oued Noun (950m)',
    harvestDate: '18 Juillet 2026',
    extractionMethod: 'Extraction centrifuge à froid (< 34°C) · Non pasteurisé',
    moisture: '15.8%',
    hmf: '6.4 mg/kg',
    floralPurity: '94%',
    sucrose: '< 1.2% (Zéro sucre ajouté)',
    status: 'Certifié Conforme Normes ONSSA'
  },
  'LOT-SIDR-26': {
    code: 'LOT-SIDR-26',
    productName: 'Miel de Sidr Royal (Jujubier Sauvage)',
    origin: 'Vallées Pré-Sahariennes & Souss (700m)',
    harvestDate: '04 Octobre 2026',
    extractionMethod: 'Extraction centrifuge à froid (< 33°C) · Brut de ruche',
    moisture: '15.2%',
    hmf: '5.2 mg/kg',
    floralPurity: '96%',
    sucrose: '< 0.9% (Zéro sucre ajouté)',
    status: 'Certifié Grand Cru Royal ONSSA'
  },
  'LOT-THYM-26': {
    code: 'LOT-THYM-26',
    productName: 'Miel de Thym Pur (Zâatar du Moyen Atlas)',
    origin: 'Moyen Atlas · Plateaux Calcaires d’Imouzzer (1 450m)',
    harvestDate: '22 Juin 2026',
    extractionMethod: 'Extraction centrifuge à froid · Filtration sur tamis inox',
    moisture: '16.0%',
    hmf: '7.1 mg/kg',
    floralPurity: '92%',
    sucrose: '< 1.4% (Zéro sucre ajouté)',
    status: 'Certifié Conforme Normes ONSSA'
  },
  'LOT-ELIX-26': {
    code: 'LOT-ELIX-26',
    productName: 'Complexe Royal Immunité 4-en-1',
    origin: 'Atelier Apicole Inobee SARL · Lot Synergique',
    harvestDate: '12 Août 2026',
    extractionMethod: 'Mélange à froid sous atmosphère contrôlée',
    moisture: '15.6%',
    hmf: '5.9 mg/kg',
    floralPurity: '98%',
    sucrose: '< 1.0% (10-HDA Certifié)',
    status: 'Qualité Pharmaceutique Apicole'
  }
};

const MOROCCAN_CITIES = [
  'Casablanca',
  'Rabat',
  'Marrakech',
  'Tanger',
  'Fès',
  'Agadir',
  'Meknès',
  'Oujda',
  'Kénitra',
  'Tétouan',
  'Salé',
  'Témara',
  'Mohammédia',
  'El Jadida',
  'Nador',
  'Béni Mellal',
  'Safi',
  'Guelmim',
  'Autre Ville (Maroc)'
];

const FAQS = [
  {
    q: 'Quels sont les délais et conditions de livraison au Maroc ?',
    a: 'Inobee SARL expédie chaque commande dans un emballage antichoc scellé. La livraison est assurée en 24h ouvrées sur Casablanca, Rabat et Marrakech, et en 24h à 48h dans toutes les autres villes du Royaume. Les frais de port sont intégralement offerts dès 400 MAD d’achat (35 MAD en dessous de ce seuil), avec paiement en espèces à la réception.'
  },
  {
    q: 'Pourquoi le miel brut cristallise-t-il naturellement avec le temps ?',
    a: 'La cristallisation est la preuve physico-chimique d’un miel vivant, non pasteurisé et exempt de tout sirop industriel. La vitesse de cristallisation dépend du ratio naturel fructose/glucose propre à chaque fleur. Pour restituer sa texture fluide sans altérer ses enzymes, placez le pot au bain-marie tiède sans jamais dépasser 38°C.'
  },
  {
    q: 'Que signifient l’indice HMF et le taux d’humidité sur vos certificats ?',
    a: 'L’HMF (Hydroxyméthylfurfural) mesure la fraîcheur biologique et l’absence de surchauffe du miel. Alors que la norme internationale autorise jusqu’à 40 mg/kg, tous les lots Inobee SARL affichent un HMF inférieur à 8 mg/kg et une humidité sous 16.5%, garantissant un miel mûr, dense et biologiquement actif.'
  },
  {
    q: 'Comment conserver idéalement vos miels et le Complexe Royal ?',
    a: 'Conservez vos pots en verre hermétiquement fermés à température ambiante (entre 18°C et 24°C), à l’abri de la lumière directe du soleil et de l’humidité. Utilisez exclusivement une cuillère en bois ou en céramique propre et sèche lors de chaque prélèvement.'
  }
];

export default function App() {
  // États Catalogue & Filtres
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeGoal, setActiveGoal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeights, setSelectedWeights] = useState({
    daghmous: 500,
    thym: 500,
    sidr: 500,
    oranger: 500,
    caroubier: 500,
    lavande: 500,
    'complexe-royal': 250,
    'coffret-prestige': 500
  });

  // État Hero Sensory Switcher
  const [heroProfileIndex, setHeroProfileIndex] = useState(0);
  const currentHeroProfile = HERO_SENSORY_PROFILES[heroProfileIndex];

  // États Traçabilité
  const [selectedLotKey, setSelectedLotKey] = useState('LOT-DAGH-26');
  const [customLotInput, setCustomLotInput] = useState('');
  const [lotSearchMessage, setLotSearchMessage] = useState('');

  // États Modale Produit & Posologie
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // États Panier & Checkout
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('inobee_aesop_cart_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [
      {
        id: 'daghmous-500',
        productId: 'daghmous',
        name: "Miel d'Euphorbe Sauvage (Daghmous)",
        weight: 500,
        price: 220,
        quantity: 1,
        image: HONEY_IMAGES.daghmous
      }
    ];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedFeedbackId, setAddedFeedbackId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Code Promo
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Formulaire Cash on Delivery
  const [checkoutData, setCheckoutData] = useState({
    fullName: '',
    phone: '',
    city: 'Casablanca',
    address: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Navigation Mobile & FAQ
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Synchronisation optionnelle avec le backend Express
  useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        if (res.ok) {
          const data = await res.json();
          if (
            data.success &&
            Array.isArray(data.products) &&
            data.products.length >= 8 &&
            isMounted
          ) {
            setProducts(data.products);
          }
        }
      } catch (err) {
        // Utilise DEFAULT_PRODUCTS hors-ligne
      }
    }
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sauvegarde locale du panier
  useEffect(() => {
    try {
      localStorage.setItem('inobee_aesop_cart_v2', JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Filtrage combiné : Catégorie + Guide Bienfaits + Recherche Live
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;

      const matchesGoal =
        !activeGoal ||
        (Array.isArray(product.goalTags) && product.goalTags.includes(activeGoal));

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.tagline.toLowerCase().includes(q) ||
        product.terroir.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        (Array.isArray(product.keywords) &&
          product.keywords.some((k) => k.toLowerCase().includes(q)));

      return matchesCategory && matchesGoal && matchesSearch;
    });
  }, [products, activeCategory, activeGoal, searchQuery]);

  // Calculs financiers du panier
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return Math.round((cartSubtotal * appliedDiscount) / 100);
  }, [cartSubtotal, appliedDiscount]);

  const shippingCost = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    return cartSubtotal >= 400 ? 0 : 35;
  }, [cartSubtotal]);

  const cartTotal = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    return Math.max(0, cartSubtotal - discountAmount + shippingCost);
  }, [cartSubtotal, discountAmount, shippingCost]);

  const totalItemCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const freeShippingRemaining = Math.max(0, 400 - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / 400) * 100));

  // Sélection de grammage
  const handleWeightChange = (productId, weight) => {
    setSelectedWeights((prev) => ({
      ...prev,
      [productId]: weight
    }));
  };

  // Ajout au panier
  const addToCart = (product, customWeight = null) => {
    const weight = customWeight || selectedWeights[product.id] || product.defaultWeight || 500;
    const price = product.prices[weight] || product.prices[product.defaultWeight];
    const cartItemId = `${product.id}-${weight}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          weight,
          price,
          quantity: 1,
          image: product.image
        }
      ];
    });

    setAddedFeedbackId(product.id);
    setTimeout(() => {
      setAddedFeedbackId(null);
    }, 1200);

    const formattedWeight = weight === 1000 ? '1kg' : `${weight}g`;
    showToast(`${product.name} (${formattedWeight}) ajouté à votre sélection`);
  };

  const updateCartQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Validation Code Promo
  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    setCouponMessage('');
    const clean = couponCode.trim().toUpperCase();
    if (!clean) {
      setCouponMessage('Veuillez saisir un code privilège.');
      return;
    }

    setIsApplyingCoupon(true);
    try {
      const res = await fetch(`${API_BASE}/api/promo/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: clean, subtotal: cartSubtotal })
      });
      const data = await res.json();
      if (data.success && data.valid) {
        setAppliedDiscount(data.discountPercent);
        setCouponMessage(`Code ${clean} activé (-${data.discountPercent}%)`);
        showToast(`Privilège -${data.discountPercent}% appliqué`);
      } else {
        setCouponMessage(data.message || 'Code privilège non valide.');
      }
    } catch (err) {
      if (clean === 'INOBEE10' || clean === 'BIENVENUE') {
        setAppliedDiscount(10);
        setCouponMessage('Code INOBEE10 activé (-10%)');
        showToast('Remise de -10% appliquée à votre panier');
      } else if (clean === 'ATLAS15' && cartSubtotal >= 500) {
        setAppliedDiscount(15);
        setCouponMessage('Code ATLAS15 activé (-15%)');
        showToast('Remise de -15% appliquée à votre panier');
      } else {
        setCouponMessage('Code privilège non reconnu (Essayez INOBEE10)');
      }
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  // Vérification formulaire COD
  const validateCheckoutForm = () => {
    const errors = {};
    if (!checkoutData.fullName.trim() || checkoutData.fullName.trim().length < 2) {
      errors.fullName = 'Nom complet requis';
    }
    const cleanPhone = checkoutData.phone.replace(/\s+/g, '');
    if (!cleanPhone) {
      errors.phone = 'Numéro de téléphone requis';
    } else if (
      !/^(0[567])[0-9]{8}$/.test(cleanPhone) &&
      !/^\+212[567][0-9]{8}$/.test(cleanPhone)
    ) {
      errors.phone = 'Format marocain requis (ex: 06 12 34 56 78)';
    }
    if (!checkoutData.address.trim() || checkoutData.address.trim().length < 5) {
      errors.address = 'Adresse précise requise pour le coursier';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Génération du lien WhatsApp direct
  const buildWhatsAppUrl = (customOrderId = null) => {
    const ref = customOrderId || `INB-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const lines = cart.map((item) => {
      const w = item.weight === 1000 ? '1kg' : `${item.weight}g`;
      return `- ${item.quantity}x ${item.name} (${w}) : ${item.price * item.quantity} MAD`;
    });

    const message = [
      `*COMMANDE OFFICIELLE INOBEE SARL*`,
      `Référence : ${ref}`,
      ``,
      `*Sélection :*`,
      ...lines,
      ``,
      `Sous-total : ${cartSubtotal} MAD`,
      discountAmount > 0 ? `Remise Privilège : -${discountAmount} MAD` : null,
      `Livraison : ${shippingCost === 0 ? 'Offerte (Franco 400 MAD)' : `${shippingCost} MAD`}`,
      `*TOTAL NET À RÉGLER À LA LIVRAISON : ${cartTotal} MAD*`,
      ``,
      `*Destinataire :*`,
      `Nom : ${checkoutData.fullName || 'Client Inobee'}`,
      `Tél : ${checkoutData.phone || 'À confirmer'}`,
      `Ville : ${checkoutData.city}`,
      `Adresse : ${checkoutData.address || 'À confirmer'}`
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/212600000000?text=${encodeURIComponent(message)}`;
  };

  // Validation finale Cash on Delivery
  const handleConfirmOrderCOD = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!validateCheckoutForm()) return;

    setIsSubmittingOrder(true);
    const payload = {
      customer: { ...checkoutData },
      items: cart.map((item) => ({
        productId: item.productId,
        name: item.name,
        weight: item.weight,
        quantity: item.quantity,
        price: item.price
      })),
      promoCode: appliedDiscount > 0 ? couponCode.trim().toUpperCase() || 'INOBEE10' : null
    };

    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.order) {
        setConfirmedOrder({
          orderId: data.orderId,
          customer: data.order.customer,
          items: [...cart],
          subtotal: cartSubtotal,
          discount: discountAmount,
          shipping: shippingCost,
          total: cartTotal,
          whatsappUrl: data.whatsappUrl || buildWhatsAppUrl(data.orderId)
        });
        setCart([]);
        setAppliedDiscount(0);
        setCouponCode('');
        return;
      }
    } catch (err) {
      // Fallback local autonome
    } finally {
      setIsSubmittingOrder(false);
    }

    const fallbackId = `INB-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrder({
      orderId: fallbackId,
      customer: { ...checkoutData },
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingCost,
      total: cartTotal,
      whatsappUrl: buildWhatsAppUrl(fallbackId)
    });
    setCart([]);
    setAppliedDiscount(0);
    setCouponCode('');
  };

  // Recherche manuelle de lot de traçabilité
  const handleCustomLotLookup = (e) => {
    e.preventDefault();
    const clean = customLotInput.trim().toUpperCase();
    if (!clean) return;
    if (TRACEABILITY_LOTS[clean]) {
      setSelectedLotKey(clean);
      setLotSearchMessage(`Certificat analytique ${clean} vérifié avec succès.`);
    } else {
      setLotSearchMessage(
        `Lot "${clean}" introuvable. Lots actifs : LOT-DAGH-26, LOT-SIDR-26, LOT-THYM-26, LOT-ELIX-26.`
      );
    }
  };

  // Action rapide "Guide Bienfaits"
  const handleSelectGoal = (goalKey) => {
    if (activeGoal === goalKey) {
      setActiveGoal(null);
    } else {
      setActiveGoal(goalKey);
      setActiveCategory('all');
    }
  };

  const currentLotData = TRACEABILITY_LOTS[selectedLotKey] || TRACEABILITY_LOTS['LOT-DAGH-26'];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1008] font-sans antialiased selection:bg-[#D97706]/20 selection:text-[#1A1008]">
      {/* ====================================================================
          1. BARRE D'ANNONCE ÉDITORIALE (OBSIDIAN ROAST)
          ==================================================================== */}
      <div className="bg-[#1A1008] text-[#FAF7F2] text-[11px] sm:text-xs tracking-[0.12em] uppercase py-2.5 px-4 border-b border-[#D97706]/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#166534] ring-4 ring-[#166534]/30"></span>
            <span className="font-medium text-[#FAF7F2]/90">
              Inobee SARL — Haute Apiculture Marocaine · Récoltes Brutes Non Pasteurisées
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[11px] text-[#FAF7F2]/75">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#D97706]" strokeWidth={1.6} />
              <span>Livraison Offerte dès 400 MAD</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-[#D97706]/40"></span>
            <span className="flex items-center gap-1.5">
              <Banknote className="w-3.5 h-3.5 text-[#D97706]" strokeWidth={1.6} />
              <span>Paiement à la Livraison</span>
            </span>
          </div>
        </div>
      </div>

      {/* ====================================================================
          2. NAVIGATION MINIMALISTE DE LUXE (STICKY GLASSMORPHISM)
          ==================================================================== */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-xl border-b border-[#D97706]/15 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Identité de Marque */}
          <a href="#" className="flex items-center gap-3.5 group">
            <BrandLogo className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl sm:text-[26px] font-bold tracking-tight text-[#1A1008] leading-none">
                  INOBEE
                </span>
                <span className="px-2 py-0.5 text-[9px] font-semibold tracking-[0.18em] uppercase bg-[#1A1008] text-[#FAF7F2] rounded-sm">
                  SARL
                </span>
              </div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#B45309] font-medium mt-1">
                Haute Apiculture de l’Atlas
              </span>
            </div>
          </a>

          {/* Liens de Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.14em] text-[#1A1008]/75">
            <a
              href="#collection"
              className="text-[#1A1008] hover:text-[#D97706] transition-colors py-1 border-b border-[#D97706]"
            >
              La Collection
            </a>
            <a
              href="#guide-bienfaits"
              className="hover:text-[#D97706] transition-colors py-1"
            >
              Guide Bienfaits
            </a>
            <a
              href="#tracabilite"
              className="hover:text-[#D97706] transition-colors py-1 flex items-center gap-1.5"
            >
              <QrCode className="w-3.5 h-3.5 text-[#D97706]" strokeWidth={1.6} />
              <span>Traçabilité Labo</span>
            </a>
            <a
              href="#savoir-faire"
              className="hover:text-[#D97706] transition-colors py-1"
            >
              Savoir-Faire
            </a>
            <a href="#faq" className="hover:text-[#D97706] transition-colors py-1">
              Questions Fréquentes
            </a>
          </nav>

          {/* Actions Droite : Traçabilité Rapide & Panier */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setConfirmedOrder(null);
                setIsCartOpen(true);
              }}
              className="flex items-center gap-3 bg-[#1A1008] hover:bg-[#2A1A0E] text-[#FAF7F2] px-4 sm:px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md group"
              aria-label="Ouvrir le panier"
            >
              <div className="relative flex items-center">
                <ShoppingBag
                  className="w-4 h-4 text-[#D97706] transition-transform group-hover:scale-110"
                  strokeWidth={1.7}
                />
                {totalItemCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 bg-[#D97706] text-white text-[10px] font-bold rounded-full leading-tight">
                    {totalItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-medium tracking-wider uppercase">
                Panier
              </span>
              <span className="text-xs font-semibold text-[#D97706] border-l border-[#FAF7F2]/20 pl-2.5">
                {cartTotal} MAD
              </span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full border border-[#D97706]/20 text-[#1A1008] hover:bg-white transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" strokeWidth={1.6} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.6} />
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-b border-[#D97706]/15 px-6 py-5 space-y-3">
            <a
              href="#collection"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1008] border-b border-[#D97706]/10"
            >
              <span>La Collection (8 Grands Crus)</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" strokeWidth={1.6} />
            </a>
            <a
              href="#guide-bienfaits"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1008] border-b border-[#D97706]/10"
            >
              <span>Guide Bienfaits & Posologie</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" strokeWidth={1.6} />
            </a>
            <a
              href="#tracabilite"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1008] border-b border-[#D97706]/10"
            >
              <span>Traçabilité & Certificats HMF</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" strokeWidth={1.6} />
            </a>
            <a
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1008]"
            >
              <span>Questions Fréquentes</span>
              <ArrowRight className="w-4 h-4 text-[#D97706]" strokeWidth={1.6} />
            </a>
          </div>
        )}
      </header>

      <main>
        {/* ====================================================================
            3. EXPLOSIVE LUXURY HERO SECTION (SPLIT-SCREEN HIGH IMPACT)
            ==================================================================== */}
        <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#D97706]/15 bg-gradient-to-b from-[#FAF7F2] via-[#FFFFFF] to-[#FAF7F2]">
          {/* Halo lumineux subtil */}
          <div className="pointer-events-none absolute top-0 right-1/4 w-[520px] h-[520px] rounded-full bg-[#D97706]/8 blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
              {/* COLONNE GAUCHE : ÉDITORIAL HAUTE COUTURE APICOLE */}
              <div className="lg:col-span-6 space-y-7 text-left">
                {/* Micro-badge avec point vert actif */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#D97706]/25 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#166534] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#166534]"></span>
                  </span>
                  <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#1A1008]">
                    RÉSERVE APICOLE DU MAROC • RÉCOLTE 2026
                  </span>
                </div>

                {/* Headline monumentale */}
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-normal text-[#1A1008] tracking-tight leading-[1.08]">
                  L’Or Brut de l’Atlas,{' '}
                  <span className="italic font-light text-[#B45309] block sm:inline">
                    Sublimé par la Science.
                  </span>
                </h1>

                {/* Description élégante */}
                <p className="text-base sm:text-lg text-[#1A1008]/75 max-w-xl leading-relaxed font-light">
                  Inobee SARL sélectionne et récolte des miels strictement bruts, non pasteurisés et
                  extraits à froid au cœur des terroirs préservés du Maroc. Zéro sucre ajouté,
                  traçabilité analytique par lot et pureté enzymatique intégrale.
                </p>

                {/* Groupe CTA */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
                  <a
                    href="#collection"
                    className="px-7 py-4 rounded-full bg-[#1A1008] hover:bg-[#D97706] text-[#FAF7F2] text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 shadow-lg flex items-center justify-center gap-3 group"
                  >
                    <span>Explorer la Boutique</span>
                    <ArrowRight
                      className="w-4 h-4 text-[#D97706] group-hover:text-white group-hover:translate-x-1 transition-all"
                      strokeWidth={1.8}
                    />
                  </a>
                  <a
                    href="#tracabilite"
                    className="px-7 py-4 rounded-full bg-white hover:bg-[#FAF7F2] text-[#1A1008] text-xs font-semibold uppercase tracking-[0.16em] border border-[#D97706]/25 shadow-sm transition-all flex items-center justify-center gap-2.5 group"
                  >
                    <FlaskConical
                      className="w-4 h-4 text-[#B45309] group-hover:scale-110 transition-transform"
                      strokeWidth={1.6}
                    />
                    <span>Vérifier un Lot (Traçabilité)</span>
                  </a>
                </div>

                {/* Barre de confiance 3 points */}
                <div className="pt-6 border-t border-[#D97706]/15 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#166534]/10 border border-[#166534]/20 flex items-center justify-center shrink-0">
                      <FlaskConical className="w-4 h-4 text-[#166534]" strokeWidth={1.6} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1A1008]">
                        Analysé en Laboratoire
                      </p>
                      <p className="text-[11px] text-[#1A1008]/60">Certifié HMF & ONSSA</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#D97706]/10 border border-[#D97706]/20 flex items-center justify-center shrink-0">
                      <Banknote className="w-4 h-4 text-[#B45309]" strokeWidth={1.6} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1A1008]">
                        Paiement à la Livraison
                      </p>
                      <p className="text-[11px] text-[#1A1008]/60">Vérification à réception</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#D97706]/10 border border-[#D97706]/20 flex items-center justify-center shrink-0">
                      <Truck className="w-4 h-4 text-[#B45309]" strokeWidth={1.6} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1A1008]">
                        Expédition Express 24h
                      </p>
                      <p className="text-[11px] text-[#1A1008]/60">Conditionnement antichoc</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* COLONNE DROITE : SHOWCASE CARD + TÉLÉMÉTRIE + PROFIL SENSORIEL INTERACTIF */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden bg-[#1A1008] border border-[#D97706]/25 shadow-xl">
                  {/* Image Studio du Pot de Miel */}
                  <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden">
                    <img
                      src={HONEY_IMAGES.hero}
                      alt="Grand Cru Inobee SARL — Miel Brut du Maroc"
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = HONEY_IMAGES.daghmous;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1008] via-[#1A1008]/20 to-transparent"></div>

                    {/* Badge Télémétrie Frosted-Glass 1 : HMF < 8 mg/kg */}
                    <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-[#1A1008]/75 backdrop-blur-md border border-[#D97706]/35 px-3.5 py-2 rounded-2xl shadow-lg flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#D97706]/20 flex items-center justify-center">
                        <FlaskConical className="w-3.5 h-3.5 text-[#D97706]" strokeWidth={1.8} />
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-[0.14em] text-[#FAF7F2]/65">
                          Indice de Fraîcheur
                        </span>
                        <span className="text-xs font-semibold text-[#FAF7F2]">
                          HMF &lt; 8 mg/kg
                        </span>
                      </div>
                    </div>

                    {/* Badge Télémétrie Frosted-Glass 2 : Pureté 100% Certifiée */}
                    <div className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-[#FAF7F2]/90 backdrop-blur-md border border-[#166534]/30 px-3.5 py-2 rounded-2xl shadow-lg flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#166534]" strokeWidth={1.8} />
                      <span className="text-xs font-semibold text-[#1A1008]">
                        Pureté 100% Certifiée
                      </span>
                    </div>
                  </div>

                  {/* Panneau Interactif de Profil Sensoriel & Gustatif */}
                  <div className="p-5 sm:p-6 bg-[#1A1008] text-[#FAF7F2] border-t border-[#D97706]/20">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#D97706] block">
                          Spectre Sensoriel Interactif
                        </span>
                        <h2 className="font-serif text-lg font-normal text-[#FAF7F2]">
                          {currentHeroProfile.label}{' '}
                          <span className="text-xs font-sans text-[#FAF7F2]/60 font-normal">
                            — {currentHeroProfile.region}
                          </span>
                        </h2>
                      </div>

                      {/* Sélecteur de Cru sur la carte Hero */}
                      <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-full border border-white/10 self-start">
                        {HERO_SENSORY_PROFILES.map((prof, idx) => (
                          <button
                            key={prof.id}
                            onClick={() => setHeroProfileIndex(idx)}
                            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                              heroProfileIndex === idx
                                ? 'bg-[#D97706] text-white shadow-sm'
                                : 'text-[#FAF7F2]/70 hover:text-white'
                            }`}
                          >
                            {prof.label.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 3 Barres de Profil Gustatif : Douceur, Intensité, Arôme boisé */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                      <div>
                        <div className="flex justify-between text-[11px] mb-1.5">
                          <span className="text-[#FAF7F2]/70 uppercase tracking-wider">
                            Douceur
                          </span>
                          <span className="font-semibold text-[#D97706]">
                            {currentHeroProfile.sweetness}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#D97706] rounded-full transition-all duration-500"
                            style={{ width: `${currentHeroProfile.sweetness}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] mb-1.5">
                          <span className="text-[#FAF7F2]/70 uppercase tracking-wider">
                            Intensité
                          </span>
                          <span className="font-semibold text-[#D97706]">
                            {currentHeroProfile.intensity}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#B45309] rounded-full transition-all duration-500"
                            style={{ width: `${currentHeroProfile.intensity}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] mb-1.5">
                          <span className="text-[#FAF7F2]/70 uppercase tracking-wider">
                            Arôme boisé
                          </span>
                          <span className="font-semibold text-[#D97706]">
                            {currentHeroProfile.woodyAroma}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#D97706] rounded-full transition-all duration-500"
                            style={{ width: `${currentHeroProfile.woodyAroma}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-[#FAF7F2]/65 mt-3.5 italic font-serif">
                      Note de dégustation : « {currentHeroProfile.note} »
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            4. INTERACTIVE "GUIDE BIENFAITS" (SMART RECOMMENDER)
            ==================================================================== */}
        <section
          id="guide-bienfaits"
          className="py-10 bg-white border-b border-[#D97706]/15"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#B45309] text-[11px] font-semibold uppercase tracking-[0.18em]">
                  <Sparkles className="w-3.5 h-3.5" strokeWidth={1.6} />
                  <span>Diagnostic Apithérapie Personnalisé</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1008]">
                  Quel nectar correspond à votre besoin ?
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleSelectGoal('energy')}
                  className={`px-5 py-3 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-2.5 border ${
                    activeGoal === 'energy'
                      ? 'bg-[#1A1008] text-[#FAF7F2] border-[#1A1008] shadow-md'
                      : 'bg-[#FAF7F2] text-[#1A1008] border-[#D97706]/20 hover:border-[#D97706]'
                  }`}
                >
                  <Zap
                    className={`w-4 h-4 ${
                      activeGoal === 'energy' ? 'text-[#D97706]' : 'text-[#B45309]'
                    }`}
                    strokeWidth={1.6}
                  />
                  <span>Je cherche de l’énergie</span>
                </button>

                <button
                  onClick={() => handleSelectGoal('throat')}
                  className={`px-5 py-3 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-2.5 border ${
                    activeGoal === 'throat'
                      ? 'bg-[#1A1008] text-[#FAF7F2] border-[#1A1008] shadow-md'
                      : 'bg-[#FAF7F2] text-[#1A1008] border-[#D97706]/20 hover:border-[#D97706]'
                  }`}
                >
                  <HeartPulse
                    className={`w-4 h-4 ${
                      activeGoal === 'throat' ? 'text-[#D97706]' : 'text-[#B45309]'
                    }`}
                    strokeWidth={1.6}
                  />
                  <span>Pour soulager ma gorge</span>
                </button>

                <button
                  onClick={() => handleSelectGoal('breakfast')}
                  className={`px-5 py-3 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-2.5 border ${
                    activeGoal === 'breakfast'
                      ? 'bg-[#1A1008] text-[#FAF7F2] border-[#1A1008] shadow-md'
                      : 'bg-[#FAF7F2] text-[#1A1008] border-[#D97706]/20 hover:border-[#D97706]'
                  }`}
                >
                  <Sun
                    className={`w-4 h-4 ${
                      activeGoal === 'breakfast' ? 'text-[#D97706]' : 'text-[#B45309]'
                    }`}
                    strokeWidth={1.6}
                  />
                  <span>Pour le petit-déjeuner</span>
                </button>

                {activeGoal && (
                  <button
                    onClick={() => setActiveGoal(null)}
                    className="px-4 py-3 rounded-full text-xs font-medium text-[#B45309] hover:text-[#1A1008] underline underline-offset-4"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            5. CATALOGUE ÉTENDU (8 PRODUITS DE LUXE + RECHERCHE LIVE & FILTRES)
            ==================================================================== */}
        <section id="collection" className="py-16 sm:py-24 bg-[#FAF7F2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* En-tête de section & Barre de recherche instantanée */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B45309] block mb-2">
                  Collection Permanente — 8 Références Certifiées
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1008] tracking-tight">
                  Grands Crus &amp; Formulations Apicoles
                </h2>
              </div>

              {/* Barre de recherche Live */}
              <div className="w-full lg:w-96 relative">
                <Search
                  className="w-4 h-4 text-[#1A1008]/45 absolute left-4 top-1/2 -translate-y-1/2"
                  strokeWidth={1.7}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher : gorge, thym, immunité, sidr..."
                  className="w-full pl-11 pr-10 py-3.5 rounded-full bg-white border border-[#D97706]/25 text-xs text-[#1A1008] placeholder-[#1A1008]/45 focus:outline-none focus:border-[#D97706] shadow-sm transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1A1008]/50 hover:text-[#1A1008]"
                    aria-label="Effacer la recherche"
                  >
                    <X className="w-4 h-4" strokeWidth={1.6} />
                  </button>
                )}
              </div>
            </div>

            {/* 4 Onglets de Catégories */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-[#D97706]/15">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'Tous' },
                  { id: 'rares', label: 'Miels Rares & Thérapeutiques' },
                  { id: 'doux', label: 'Miels Doux' },
                  { id: 'apitherapie', label: 'Apithérapie & Coffrets' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                      activeCategory === cat.id
                        ? 'bg-[#1A1008] text-[#FAF7F2] shadow-sm'
                        : 'bg-white text-[#1A1008]/75 border border-[#D97706]/15 hover:border-[#D97706]/40 hover:text-[#1A1008]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="text-xs text-[#1A1008]/60 font-medium">
                {filteredProducts.length}{' '}
                {filteredProducts.length > 1 ? 'références affichées' : 'référence affichée'}
              </div>
            </div>

            {/* Grille des 8 Produits */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#D97706]/15 p-12 text-center max-w-lg mx-auto">
                <FlaskConical
                  className="w-8 h-8 text-[#D97706] mx-auto mb-3"
                  strokeWidth={1.5}
                />
                <h3 className="font-serif text-xl text-[#1A1008] mb-2">
                  Aucun cru ne correspond à votre filtre
                </h3>
                <p className="text-xs text-[#1A1008]/65 mb-6">
                  Réinitialisez vos critères de recherche pour explorer l’intégralité de nos 8
                  récoltes.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveGoal(null);
                    setSearchQuery('');
                  }}
                  className="px-6 py-3 rounded-full bg-[#1A1008] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider"
                >
                  Afficher toute la collection
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-7">
                {filteredProducts.map((product) => {
                  const activeWeight =
                    selectedWeights[product.id] || product.defaultWeight || 500;
                  const activePrice =
                    product.prices[activeWeight] || product.prices[product.defaultWeight];
                  const isJustAdded = addedFeedbackId === product.id;

                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl border border-[#D97706]/15 hover:border-[#D97706]/45 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between overflow-hidden"
                    >
                      <div>
                        {/* Visuel du Pot */}
                        <div className="relative aspect-[4/3] bg-[#1A1008] overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                              if (
                                product.fallbackImage &&
                                e.currentTarget.src !== product.fallbackImage
                              ) {
                                e.currentTarget.src = product.fallbackImage;
                              }
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1008]/60 via-transparent to-transparent"></div>

                          {/* Badge Supérieur Gauche */}
                          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md ${
                                product.badge === 'Bio & Pur'
                                  ? 'bg-[#166534] text-white'
                                  : product.badge === 'Cure 30j'
                                  ? 'bg-[#D97706] text-white'
                                  : 'bg-[#1A1008]/90 text-[#FAF7F2] border border-[#D97706]/30'
                              }`}
                            >
                              {product.badge}
                            </span>
                          </div>

                          {/* Lot Traçabilité Supérieur Droit */}
                          <div className="absolute top-3.5 right-3.5">
                            <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#1A1008] text-[10px] font-mono font-semibold">
                              {product.lotNumber}
                            </span>
                          </div>

                          {/* Origine Terroir Bas */}
                          <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center gap-1.5 text-[11px] text-[#FAF7F2]/90 font-medium truncate">
                            <MapPin
                              className="w-3.5 h-3.5 text-[#D97706] shrink-0"
                              strokeWidth={1.8}
                            />
                            <span className="truncate">{product.terroir}</span>
                          </div>
                        </div>

                        {/* Corps de la Carte */}
                        <div className="p-5 space-y-4">
                          <div>
                            <h3 className="font-serif text-lg font-semibold text-[#1A1008] group-hover:text-[#B45309] transition-colors leading-snug line-clamp-2 min-h-[3.1rem]">
                              {product.name}
                            </h3>
                            <p className="text-xs text-[#1A1008]/65 mt-1 line-clamp-2 min-h-[2rem]">
                              {product.tagline}
                            </p>
                          </div>

                          {/* Sélecteur de Poids : 250g | 500g | 1kg */}
                          <div>
                            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-[#1A1008]/55 mb-1.5">
                              <span>Contenance</span>
                              <span>HMF {product.labData?.hmf}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-1.5 bg-[#FAF7F2] p-1 rounded-xl border border-[#D97706]/15">
                              {[250, 500, 1000].map((w) => {
                                const isSelected = activeWeight === w;
                                return (
                                  <button
                                    key={w}
                                    type="button"
                                    onClick={() => handleWeightChange(product.id, w)}
                                    className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                      isSelected
                                        ? 'bg-[#1A1008] text-[#FAF7F2] shadow-xs'
                                        : 'text-[#1A1008]/70 hover:text-[#1A1008]'
                                    }`}
                                  >
                                    {w === 1000 ? '1kg' : `${w}g`}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pied de Carte : Prix Dynamique + Aperçu & Posologie + Ajouter au Panier */}
                      <div className="px-5 pb-5 pt-2 border-t border-[#D97706]/10 space-y-3">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#1A1008]/50 block">
                              Tarif Certifié
                            </span>
                            <span className="font-serif text-2xl font-bold text-[#1A1008]">
                              {activePrice}{' '}
                              <span className="text-xs font-sans font-semibold text-[#B45309]">
                                MAD
                              </span>
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setQuickViewProduct(product)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B45309] hover:text-[#1A1008] transition-colors py-1"
                          >
                            <Eye className="w-3.5 h-3.5" strokeWidth={1.7} />
                            <span>Aperçu &amp; Posologie</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => addToCart(product, activeWeight)}
                          className={`w-full py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 flex items-center justify-center gap-2 ${
                            isJustAdded
                              ? 'bg-[#166534] text-white'
                              : 'bg-[#1A1008] hover:bg-[#D97706] text-[#FAF7F2]'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-4 h-4" strokeWidth={2} />
                              <span>Ajouté au Panier</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.7} />
                              <span>Ajouter au Panier</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ====================================================================
            6. TRAÇABILITÉ & VÉRIFICATION QR LABORATOIRE (OBSIDIAN ROAST)
            ==================================================================== */}
        <section
          id="tracabilite"
          className="py-20 sm:py-24 bg-[#1A1008] text-[#FAF7F2] border-y border-[#D97706]/25"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Colonne Gauche : Sélection de Lot & Recherche */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#D97706]/30 text-[#D97706] text-[11px] font-semibold uppercase tracking-[0.16em]">
                  <QrCode className="w-3.5 h-3.5" strokeWidth={1.7} />
                  <span>Transparence Physico-Chimique</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#FAF7F2] leading-tight">
                  Traçabilité par Lot &amp; Certificats d’Analyse.
                </h2>

                <p className="text-sm text-[#FAF7F2]/70 leading-relaxed font-light">
                  Chaque pot Inobee SARL porte un numéro de lot unique. Sélectionnez un lot témoin
                  ci-dessous ou saisissez le code figurant sous votre pot pour consulter son
                  bulletin d’analyse (humidité, indice HMF et pureté pollinique).
                </p>

                {/* Boutons de sélection rapide des lots */}
                <div className="space-y-2.5">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[#D97706] block">
                    Lots de Récolte Vérifiables :
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {Object.keys(TRACEABILITY_LOTS).map((lotKey) => (
                      <button
                        key={lotKey}
                        type="button"
                        onClick={() => {
                          setSelectedLotKey(lotKey);
                          setLotSearchMessage('');
                        }}
                        className={`px-4 py-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                          selectedLotKey === lotKey
                            ? 'bg-[#D97706] text-white border-[#D97706] shadow-md'
                            : 'bg-white/5 text-[#FAF7F2]/80 border-white/10 hover:border-[#D97706]/50'
                        }`}
                      >
                        <span className="font-mono text-xs font-bold">{lotKey}</span>
                        <FileCheck2 className="w-4 h-4 opacity-80" strokeWidth={1.6} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Saisie manuelle d'un code lot */}
                <form onSubmit={handleCustomLotLookup} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customLotInput}
                      onChange={(e) => setCustomLotInput(e.target.value)}
                      placeholder="Saisir un code lot (ex: LOT-DAGH-26)"
                      className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-xs text-[#FAF7F2] placeholder-[#FAF7F2]/40 focus:outline-none focus:border-[#D97706] font-mono uppercase"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3 rounded-xl bg-[#FAF7F2] hover:bg-[#D97706] text-[#1A1008] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Vérifier
                    </button>
                  </div>
                  {lotSearchMessage && (
                    <p className="text-xs text-[#D97706] mt-2">{lotSearchMessage}</p>
                  )}
                </form>
              </div>

              {/* Colonne Droite : Carte Certificat de Laboratoire en Temps Réel */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl bg-[#120B05] border border-[#D97706]/30 p-6 sm:p-8 shadow-2xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-1 rounded bg-[#166534]/25 border border-[#166534]/50 text-[#86EFAC] font-mono text-xs font-semibold">
                          {currentLotData.code}
                        </span>
                        <span className="text-xs text-[#FAF7F2]/60">
                          Récolte : {currentLotData.harvestDate}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl text-[#FAF7F2] mt-2">
                        {currentLotData.productName}
                      </h3>
                      <p className="text-xs text-[#D97706] mt-0.5">{currentLotData.origin}</p>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-2xl border border-white/10 self-start">
                      <QrCode className="w-8 h-8 text-[#D97706]" strokeWidth={1.4} />
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-[#FAF7F2]/50">
                          Statut Officiel
                        </span>
                        <span className="text-xs font-semibold text-[#86EFAC]">
                          {currentLotData.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3 Métriques Clés */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                      <span className="text-[11px] uppercase tracking-wider text-[#FAF7F2]/55 block">
                        Taux d’Humidité
                      </span>
                      <span className="font-serif text-2xl font-bold text-[#FAF7F2] mt-1 block">
                        {currentLotData.moisture}
                      </span>
                      <span className="text-[11px] text-[#86EFAC] mt-1 block">
                        Norme exigée &lt; 20%
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                      <span className="text-[11px] uppercase tracking-wider text-[#FAF7F2]/55 block">
                        Indice HMF (Fraîcheur)
                      </span>
                      <span className="font-serif text-2xl font-bold text-[#D97706] mt-1 block">
                        {currentLotData.hmf}
                      </span>
                      <span className="text-[11px] text-[#86EFAC] mt-1 block">
                        Non chauffé (Max 40)
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                      <span className="text-[11px] uppercase tracking-wider text-[#FAF7F2]/55 block">
                        Origine Florale
                      </span>
                      <span className="font-serif text-2xl font-bold text-[#FAF7F2] mt-1 block">
                        {currentLotData.floralPurity}
                      </span>
                      <span className="text-[11px] text-[#86EFAC] mt-1 block">
                        Spectre pollinique pur
                      </span>
                    </div>
                  </div>

                  {/* Détails complémentaires */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <span className="text-[#FAF7F2]/60">Procédé d’extraction :</span>
                      <span className="font-medium text-[#FAF7F2]">
                        {currentLotData.extractionMethod}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                      <span className="text-[#FAF7F2]/60">Taux de Saccharose :</span>
                      <span className="font-medium text-[#86EFAC]">{currentLotData.sucrose}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            7. NOTRE SAVOIR-FAIRE APICOLE (3 PILIERS D'EXCELLENCE)
            ==================================================================== */}
        <section id="savoir-faire" className="py-16 sm:py-20 bg-white border-b border-[#D97706]/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B45309] block mb-2">
                Protocole Inobee SARL
              </span>
              <h2 className="font-serif text-3xl text-[#1A1008]">
                L’Exigence du Miel Vivant Non Pasteurisé
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-7 rounded-2xl bg-[#FAF7F2] border border-[#D97706]/15 space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#1A1008] text-[#D97706] flex items-center justify-center">
                  <Compass className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <h3 className="font-serif text-xl text-[#1A1008]">
                  Transhumance en Haute Altitude
                </h3>
                <p className="text-xs text-[#1A1008]/70 leading-relaxed">
                  Nos ruchers suivent les floraisons sauvages loin de toute culture intensive, des
                  vallées présahariennes du Souss jusqu’aux sommets calcaires du Moyen et Haut-Atlas
                  à plus de 1 600 mètres.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#FAF7F2] border border-[#D97706]/15 space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#1A1008] text-[#D97706] flex items-center justify-center">
                  <Droplets className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <h3 className="font-serif text-xl text-[#1A1008]">
                  Extraction Centrifuge à Froid
                </h3>
                <p className="text-xs text-[#1A1008]/70 leading-relaxed">
                  Désoperculation manuelle et extraction mécanique à température de ruche (&lt;
                  35°C). Aucune pasteurisation thermique n’est appliquée afin de préserver les
                  diastases, inhibines et polyphénols.
                </p>
              </div>

              <div className="p-7 rounded-2xl bg-[#FAF7F2] border border-[#D97706]/15 space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#1A1008] text-[#D97706] flex items-center justify-center">
                  <Layers className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <h3 className="font-serif text-xl text-[#1A1008]">
                  Mise en Pot Verre &amp; Scellé de Garantie
                </h3>
                <p className="text-xs text-[#1A1008]/70 leading-relaxed">
                  Conditionné exclusivement en pots de verre alimentaire après maturation lente en
                  cuves inox, chaque lot est analysé avant expédition pour certifier l’absence
                  totale de sucres exogènes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            8. STRUCTURED ACCORDION FAQ (4 QUESTIONS ESSENTIELLES)
            ==================================================================== */}
        <section id="faq" className="py-16 sm:py-24 bg-[#FAF7F2]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B45309] block mb-2">
                Service Client &amp; Conseils Apicoles
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1008]">
                Questions Fréquentes
              </h2>
            </div>

            <div className="space-y-3.5">
              {FAQS.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white border border-[#D97706]/15 overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF7F2]/50 transition-colors"
                    >
                      <span className="font-serif text-base sm:text-lg font-medium text-[#1A1008]">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#B45309] shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        strokeWidth={1.6}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#1A1008]/75 leading-relaxed border-t border-[#D97706]/10">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================================
          9. FOOTER LUXE (OBSIDIAN ROAST)
          ==================================================================== */}
      <footer className="bg-[#1A1008] text-[#FAF7F2] border-t border-[#D97706]/25 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3.5">
                <BrandLogo className="h-11 w-auto object-contain" />
                <div>
                  <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F2] block leading-none">
                    INOBEE SARL
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#D97706] block mt-1">
                    Haute Apiculture Marocaine
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#FAF7F2]/65 max-w-sm leading-relaxed">
                Société marocaine spécialisée dans la récolte, l’analyse et le conditionnement de
                miels bruts d’exception et de complexes d’apithérapie100% naturels.
              </p>
            </div>

            <div className="md:col-span-3 space-y-2.5 text-xs">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D97706] block mb-3">
                Grands Crus
              </span>
              <ul className="space-y-2 text-[#FAF7F2]/70">
                <li>
                  <a href="#collection" className="hover:text-white transition-colors">
                    Miel d’Euphorbe (Daghmous)
                  </a>
                </li>
                <li>
                  <a href="#collection" className="hover:text-white transition-colors">
                    Miel de Sidr Royal
                  </a>
                </li>
                <li>
                  <a href="#collection" className="hover:text-white transition-colors">
                    Miel de Thym du Moyen Atlas
                  </a>
                </li>
                <li>
                  <a href="#collection" className="hover:text-white transition-colors">
                    Complexe Royal Immunité 30j
                  </a>
                </li>
                <li>
                  <a href="#collection" className="hover:text-white transition-colors">
                    Coffret Prestige Dégustation
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3 text-xs">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D97706] block mb-3">
                Expéditions &amp; Service Client
              </span>
              <p className="flex items-center gap-2.5 text-[#FAF7F2]/75">
                <MapPin className="w-4 h-4 text-[#D97706] shrink-0" strokeWidth={1.6} />
                <span>Atelier &amp; Distribution : Casablanca / Agadir, Royaume du Maroc</span>
              </p>
              <p className="flex items-center gap-2.5 text-[#FAF7F2]/75">
                <Truck className="w-4 h-4 text-[#D97706] shrink-0" strokeWidth={1.6} />
                <span>Livraison Express 24/48h — Franco dès 400 MAD</span>
              </p>
              <p className="flex items-center gap-2.5 text-[#FAF7F2]/75">
                <Banknote className="w-4 h-4 text-[#D97706] shrink-0" strokeWidth={1.6} />
                <span>Paiement en espèces à la livraison (Cash on Delivery)</span>
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#FAF7F2]/50">
            <p>© 2026 Inobee SARL. Tous droits réservés. Boutique Officielle Maroc.</p>
            <p>Miels Purs Non Pasteurisés • Contrôle HMF &amp; Traçabilité Garantie</p>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          10. MODALE "APERÇU & POSOLOGIE" (PROFIL SENSORIEL + CERTIFICAT)
          ==================================================================== */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1008]/75 backdrop-blur-sm">
          <div className="bg-[#FAF7F2] border border-[#D97706]/25 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative aspect-[16/9] bg-[#1A1008]">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  if (quickViewProduct.fallbackImage) {
                    e.currentTarget.src = quickViewProduct.fallbackImage;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1008] via-[#1A1008]/30 to-transparent"></div>

              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1A1008]/80 text-[#FAF7F2] hover:bg-[#D97706] flex items-center justify-center transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" strokeWidth={1.8} />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-[#FAF7F2]">
                <span className="px-2.5 py-0.5 rounded bg-[#D97706] text-white text-[10px] font-semibold uppercase tracking-wider">
                  {quickViewProduct.badge} • {quickViewProduct.lotNumber}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl mt-1.5">{quickViewProduct.name}</h3>
                <p className="text-xs text-[#FAF7F2]/75 mt-0.5">{quickViewProduct.terroir}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-xs sm:text-sm text-[#1A1008]/80 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Spectre Sensoriel */}
              {quickViewProduct.sensory && (
                <div className="p-4 rounded-2xl bg-white border border-[#D97706]/15 space-y-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B45309] block">
                    Profil Sensoriel &amp; Organoleptique
                  </span>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>Douceur</span>
                        <span className="font-semibold">{quickViewProduct.sensory.sweetness}%</span>
                      </div>
                      <div className="h-1.5 bg-[#FAF7F2] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#D97706]"
                          style={{ width: `${quickViewProduct.sensory.sweetness}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>Intensité</span>
                        <span className="font-semibold">{quickViewProduct.sensory.intensity}%</span>
                      </div>
                      <div className="h-1.5 bg-[#FAF7F2] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#B45309]"
                          style={{ width: `${quickViewProduct.sensory.intensity}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span>Arôme boisé</span>
                        <span className="font-semibold">
                          {quickViewProduct.sensory.woodyAroma}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-[#FAF7F2] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1A1008]"
                          style={{ width: `${quickViewProduct.sensory.woodyAroma}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bienfaits Thérapeutiques */}
              <div className="space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B45309] block">
                  Propriétés &amp; Bienfaits Reconnus
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quickViewProduct.benefits.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-[#1A1008]/80 bg-white p-2.5 rounded-xl border border-[#D97706]/10"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-[#166534] shrink-0 mt-0.5"
                        strokeWidth={1.7}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Posologie & Conseils d'utilisation */}
              <div className="p-4 rounded-2xl bg-[#1A1008] text-[#FAF7F2] space-y-1.5">
                <div className="flex items-center gap-2 text-[#D97706] text-[10px] font-semibold uppercase tracking-[0.18em]">
                  <Clock className="w-3.5 h-3.5" strokeWidth={1.7} />
                  <span>Protocole &amp; Posologie Recommandée</span>
                </div>
                <p className="text-xs text-[#FAF7F2]/85 leading-relaxed">
                  {quickViewProduct.posology}
                </p>
              </div>

              {/* Actions Modale */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#D97706]/15">
                <div className="text-xs text-[#1A1008]/65">
                  Indice HMF :{' '}
                  <strong className="text-[#1A1008]">{quickViewProduct.labData?.hmf}</strong> •
                  Humidité :{' '}
                  <strong className="text-[#1A1008]">{quickViewProduct.labData?.moisture}</strong>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setQuickViewProduct(null)}
                    className="px-5 py-3 rounded-xl border border-[#D97706]/25 text-xs font-semibold text-[#1A1008] hover:bg-white"
                  >
                    Fermer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-[#1A1008] hover:bg-[#D97706] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" strokeWidth={1.7} />
                    <span>Ajouter au Panier</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          11. SLIDE-OVER CART DRAWER & FORMULAIRE CASH ON DELIVERY MAROC
          ==================================================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#1A1008]/65 backdrop-blur-xs transition-opacity"
          ></div>

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl border-l border-[#D97706]/20 flex flex-col justify-between">
              {/* Header du Drawer */}
              <div className="p-6 bg-white border-b border-[#D97706]/15 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#B45309]" strokeWidth={1.7} />
                  <div>
                    <h2 className="font-serif text-xl text-[#1A1008]">Votre Sélection Apicole</h2>
                    <p className="text-[11px] text-[#1A1008]/55">
                      Paiement en espèces à la livraison (Maroc)
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-[#FAF7F2] text-[#1A1008]"
                  aria-label="Fermer le panier"
                >
                  <X className="w-5 h-5" strokeWidth={1.7} />
                </button>
              </div>

              {/* Contenu du Drawer */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {confirmedOrder ? (
                  /* REÇU DE COMMANDE INSTANTANÉ */
                  <div className="bg-white rounded-2xl border border-[#166534]/30 p-6 space-y-5 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-[#166534]/10 text-[#166534] flex items-center justify-center mx-auto">
                      <PackageCheck className="w-6 h-6" strokeWidth={1.7} />
                    </div>
                    <div className="text-center space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-[#FAF7F2] text-[#B45309] font-semibold">
                        Réf : {confirmedOrder.orderId}
                      </span>
                      <h3 className="font-serif text-2xl text-[#1A1008] pt-1">
                        Commande Confirmée
                      </h3>
                      <p className="text-xs text-[#1A1008]/65">
                        Merci <strong>{confirmedOrder.customer.fullName}</strong>. Votre sélection
                        est en cours de préparation à notre atelier.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF7F2] space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#1A1008]/60">Destinataire :</span>
                        <span className="font-semibold">{confirmedOrder.customer.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#1A1008]/60">Téléphone :</span>
                        <span className="font-semibold">{confirmedOrder.customer.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#1A1008]/60">Ville :</span>
                        <span className="font-semibold">{confirmedOrder.customer.city}</span>
                      </div>
                      <div className="flex justify-between border-t border-[#D97706]/15 pt-2 text-sm">
                        <span className="font-semibold">Net à régler au livreur :</span>
                        <span className="font-serif font-bold text-[#B45309]">
                          {confirmedOrder.total} MAD
                        </span>
                      </div>
                    </div>

                    <a
                      href={confirmedOrder.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 rounded-xl bg-[#166534] hover:bg-[#14532D] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" strokeWidth={1.7} />
                      <span>Recevoir le Suivi sur WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setConfirmedOrder(null);
                        setIsCartOpen(false);
                      }}
                      className="w-full py-3 rounded-xl border border-[#D97706]/25 text-xs font-semibold text-[#1A1008]"
                    >
                      Retourner à la boutique
                    </button>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <ShoppingBag
                      className="w-10 h-10 text-[#D97706]/50 mx-auto"
                      strokeWidth={1.4}
                    />
                    <p className="font-serif text-lg text-[#1A1008]">Votre panier est vide</p>
                    <p className="text-xs text-[#1A1008]/60 max-w-xs mx-auto">
                      Explorez nos 8 grands crus de l’Atlas et ajoutez vos pots favoris.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Jauge de Livraison Gratuite dès 400 MAD */}
                    <div className="p-4 rounded-2xl bg-white border border-[#D97706]/20 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        {freeShippingRemaining === 0 ? (
                          <span className="font-semibold text-[#166534] flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" strokeWidth={1.8} />
                            <span>Livraison Express Offerte débloquée</span>
                          </span>
                        ) : (
                          <span className="text-[#1A1008]/80">
                            Plus que <strong>{freeShippingRemaining} MAD</strong> pour la{' '}
                            <strong className="text-[#B45309]">livraison offerte</strong>
                          </span>
                        )}
                        <span className="font-mono text-[11px] font-semibold text-[#B45309]">
                          {freeShippingProgress}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-[#FAF7F2] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#D97706] transition-all duration-500"
                          style={{ width: `${freeShippingProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Liste des Articles */}
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-2xl bg-white border border-[#D97706]/15 flex items-center gap-3.5"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover bg-[#1A1008] shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-sm font-semibold text-[#1A1008] truncate">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-[#B45309] font-medium">
                              Format : {item.weight === 1000 ? '1kg' : `${item.weight}g`} •{' '}
                              {item.price} MAD
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="inline-flex items-center border border-[#D97706]/25 rounded-lg bg-[#FAF7F2]">
                                <button
                                  type="button"
                                  onClick={() => updateCartQuantity(item.id, -1)}
                                  className="p-1 text-[#1A1008] hover:text-[#D97706]"
                                  aria-label="Diminuer"
                                >
                                  <Minus className="w-3 h-3" strokeWidth={1.8} />
                                </button>
                                <span className="px-2.5 text-xs font-semibold">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateCartQuantity(item.id, 1)}
                                  className="p-1 text-[#1A1008] hover:text-[#D97706]"
                                  aria-label="Augmenter"
                                >
                                  <Plus className="w-3 h-3" strokeWidth={1.8} />
                                </button>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-[#1A1008]">
                                  {item.price * item.quantity} MAD
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-[#1A1008]/40 hover:text-red-600 p-1"
                                  aria-label="Retirer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" strokeWidth={1.6} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Code Promo (INOBEE10) */}
                    <form
                      onSubmit={handleApplyCoupon}
                      className="p-3.5 rounded-2xl bg-white border border-[#D97706]/15 space-y-2"
                    >
                      <label className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1A1008]/60 flex items-center gap-1.5">
                        <Tag className="w-3 h-3 text-[#D97706]" strokeWidth={1.7} />
                        <span>Code Privilège (Essayez INOBEE10 pour -10%)</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="INOBEE10"
                          className="flex-1 px-3 py-2 rounded-lg bg-[#FAF7F2] border border-[#D97706]/20 text-xs uppercase font-mono focus:outline-none focus:border-[#D97706]"
                        />
                        <button
                          type="submit"
                          disabled={isApplyingCoupon}
                          className="px-4 py-2 rounded-lg bg-[#1A1008] text-[#FAF7F2] text-xs font-semibold hover:bg-[#D97706] transition-colors"
                        >
                          Appliquer
                        </button>
                      </div>
                      {couponMessage && (
                        <p className="text-[11px] text-[#166534] font-medium">{couponMessage}</p>
                      )}
                    </form>

                    {/* Récapitulatif Financier */}
                    <div className="p-4 rounded-2xl bg-white border border-[#D97706]/15 space-y-2 text-xs">
                      <div className="flex justify-between text-[#1A1008]/70">
                        <span>Sous-total</span>
                        <span>{cartSubtotal} MAD</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-[#166534] font-medium">
                          <span>Remise privilège (-{appliedDiscount}%)</span>
                          <span>-{discountAmount} MAD</span>
                        </div>
                      )}
                      <div className="flex justify-between text-[#1A1008]/70">
                        <span>Livraison Express (24/48h)</span>
                        <span>{shippingCost === 0 ? 'Offerte' : `${shippingCost} MAD`}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-[#1A1008] pt-2 border-t border-[#D97706]/15">
                        <span>Total à régler à la livraison</span>
                        <span className="font-serif text-lg text-[#B45309]">{cartTotal} MAD</span>
                      </div>
                    </div>

                    {/* Formulaire Cash on Delivery Maroc */}
                    <form onSubmit={handleConfirmOrderCOD} className="space-y-3 pt-1">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B45309] block">
                        Coordonnées de Livraison (Paiement Cash)
                      </span>

                      <div>
                        <input
                          type="text"
                          placeholder="Nom et Prénom *"
                          value={checkoutData.fullName}
                          onChange={(e) =>
                            setCheckoutData({ ...checkoutData, fullName: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D97706]/25 text-xs focus:outline-none focus:border-[#D97706]"
                        />
                        {formErrors.fullName && (
                          <p className="text-[11px] text-red-600 mt-1">{formErrors.fullName}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <input
                            type="tel"
                            placeholder="Tél Maroc (06 / 07...) *"
                            value={checkoutData.phone}
                            onChange={(e) =>
                              setCheckoutData({ ...checkoutData, phone: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D97706]/25 text-xs focus:outline-none focus:border-[#D97706]"
                          />
                          {formErrors.phone && (
                            <p className="text-[11px] text-red-600 mt-1">{formErrors.phone}</p>
                          )}
                        </div>

                        <div>
                          <select
                            value={checkoutData.city}
                            onChange={(e) =>
                              setCheckoutData({ ...checkoutData, city: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D97706]/25 text-xs focus:outline-none focus:border-[#D97706]"
                          >
                            {MOROCCAN_CITIES.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Adresse complète (Quartier, Rue, N°) *"
                          value={checkoutData.address}
                          onChange={(e) =>
                            setCheckoutData({ ...checkoutData, address: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D97706]/25 text-xs focus:outline-none focus:border-[#D97706]"
                        />
                        {formErrors.address && (
                          <p className="text-[11px] text-red-600 mt-1">{formErrors.address}</p>
                        )}
                      </div>

                      {/* Double validation : Cash on Delivery + WhatsApp */}
                      <div className="space-y-2.5 pt-2">
                        <button
                          type="submit"
                          disabled={isSubmittingOrder}
                          className="w-full py-3.5 px-5 rounded-xl bg-[#1A1008] hover:bg-[#D97706] text-[#FAF7F2] text-xs font-semibold uppercase tracking-[0.14em] transition-colors flex items-center justify-center gap-2 shadow-md"
                        >
                          {isSubmittingOrder ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Validation en cours...</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4" strokeWidth={2} />
                              <span>Valider la Commande (Paiement Cash)</span>
                            </>
                          )}
                        </button>

                        <a
                          href={buildWhatsAppUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 px-5 rounded-xl bg-[#166534] hover:bg-[#14532D] text-white text-xs font-semibold uppercase tracking-[0.14em] transition-colors flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" strokeWidth={1.7} />
                          <span>Commander via WhatsApp</span>
                        </a>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          12. TOAST DE NOTIFICATION MINIMALISTE
          ==================================================================== */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1008] text-[#FAF7F2] border border-[#D97706]/40 px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" strokeWidth={1.8} />
          <span className="text-xs font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
