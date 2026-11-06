import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Check,
  Phone,
  MapPin,
  ChevronDown,
  Info,
  Clock,
  Award,
  CheckCircle2,
  MessageCircle,
  Menu,
  Heart,
  Droplets,
  ExternalLink,
  ChevronRight,
  Filter,
  Tag,
  Gift,
  Loader2,
  Volume2,
  VolumeX,
  Compass,
  Wind,
  Sun,
  Mountain,
  Flower2
} from 'lucide-react';

// ============================================================================
// INOBEE SARL — Expérience Sensorielle & Nature (Full-Stack React)
// Maison Apicole Marocaine d'Exception · Miels Bruts & Terroirs Sauvages
// ============================================================================

const API_BASE = (typeof window !== 'undefined' && (window.location.port === '3000' || window.location.port === '5173'))
  ? '' 
  : (typeof window !== 'undefined' && window.location.port === '5000' ? '' : 'http://localhost:5000');

// Fallback image URLs (Macro Photographie Naturelle de Miel)
const FALLBACK_IMAGES = {
  daghmous: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80',
  thym: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=900&q=80',
  sidr: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=900&q=80',
  oranger: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=80',
  pack: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=900&q=80',
  hero: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1600&q=85',
  story: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=1200&q=80'
};

// Catalogue de base sécurisé
const DEFAULT_PRODUCTS = [
  {
    id: 'daghmous',
    name: "Miel d'Euphorbe Sauvage (Daghmous)",
    category: 'rares',
    tagline: 'Tonus, gorge et voies respiratoires',
    terroir: 'Anti-Atlas · Terroir de Guelmim-Oued Noun',
    badge: 'Rare & Ardent',
    altitude: '950 m',
    bloom: 'Floraison Printemps Aride',
    isRare: true,
    prices: { 250: 120, 500: 220, 1000: 400 },
    defaultWeight: 500,
    image: 'assets/img/product-daghmous.jpg',
    fallbackImage: FALLBACK_IMAGES.daghmous,
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
    altitude: '1 400 m',
    bloom: 'Floraison Estivale d’Altitude',
    isRare: true,
    prices: { 250: 130, 500: 240, 1000: 450 },
    defaultWeight: 500,
    image: 'assets/img/product-thym.jpg',
    fallbackImage: FALLBACK_IMAGES.thym,
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
    altitude: '650 m',
    bloom: 'Floraison Automnale Rare',
    isRare: true,
    prices: { 250: 190, 500: 350, 1000: 650 },
    defaultWeight: 500,
    image: 'assets/img/product-sidr.jpg',
    fallbackImage: FALLBACK_IMAGES.sidr,
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
    altitude: '320 m',
    bloom: 'Floraison Printanière des Agrumes',
    isRare: false,
    prices: { 250: 65, 500: 110, 1000: 200 },
    defaultWeight: 500,
    image: 'assets/img/product-oranger.jpg',
    fallbackImage: FALLBACK_IMAGES.oranger,
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
    altitude: 'Multi-Altitude',
    bloom: 'Cuvée des 3 Saisons',
    isPack: true,
    prices: { 750: 320 },
    originalPrice: 370,
    defaultWeight: 750,
    image: 'assets/img/product-pack.jpg',
    fallbackImage: FALLBACK_IMAGES.pack,
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

// Terroirs du Maroc interactifs
const TERROIRS = [
  {
    id: 'anti-atlas',
    name: "L'Anti-Atlas & Guelmim",
    title: "Terre Minérale d'Euphorbe Sauvage",
    altitude: "800m – 1 200m",
    climate: "Climat aride et solaire, vents sahariens vivifiants",
    botany: "Euphorbia resinifera endémique, arganier sauvage, romarin rupestre",
    honeyId: 'daghmous',
    color: 'from-amber-600/20 to-orange-500/10'
  },
  {
    id: 'haut-atlas',
    name: "Le Haut-Atlas & Imouzzer",
    title: "Sanctuaire Alpin du Thym Zâatar",
    altitude: "1 400m – 2 200m",
    climate: "Air pur d'altitude, hivers enneigés et étés lumineux",
    botany: "Thymus capitatus des rocailles, genévrier thurifère, lavande sauvage",
    honeyId: 'thym',
    color: 'from-emerald-700/20 to-amber-600/10'
  },
  {
    id: 'souss',
    name: "La Plaine du Souss & Taroudant",
    title: "Oasis Florale & Vergers Solaires",
    altitude: "250m – 500m",
    climate: "Douceur atlantique et brises parfumées de fleurs d'oranger",
    botany: "Citrus aurantium en fleurs, grenadiers, amandiers de montagne",
    honeyId: 'oranger',
    color: 'from-yellow-500/20 to-amber-400/10'
  }
];

// Villes marocaines desservies
const MOROCCAN_CITIES = [
  'Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Agadir', 
  'Meknès', 'Oujda', 'Kénitra', 'Tétouan', 'Salé', 'Témara', 
  'Mohammédia', 'El Jadida', 'Nador', 'Béni Mellal', 'Safi', 
  'Guelmim', 'Autre Ville (Maroc)'
];

// Avis clients vérifiés
const REVIEWS = [
  {
    id: 1,
    name: 'Karim Bensouda',
    city: 'Casablanca · Racine',
    date: 'Il y a 2 jours',
    rating: 5,
    product: "Miel d'Euphorbe (Daghmous)",
    comment: "Le miel de Daghmous d'Inobee est tout simplement exceptionnel. On ressent immédiatement cette douce chaleur caractéristique au fond de la gorge qui signe un miel brut sauvage non altéré. Commande passée le matin, livrée le lendemain avec paiement en espèces."
  },
  {
    id: 2,
    name: 'Dr. Salma Mansouri',
    city: 'Rabat · Agdal',
    date: 'Il y a 6 jours',
    rating: 5,
    product: 'Miel de Thym Pur (Zâatar)',
    comment: "En tant que médecin et passionnée de nutrition, la qualité d'Inobee m'a immédiatement séduite. La texture est dense, non pasteurisée, sans surchauffe industrielle. Le miel de thym est devenu indispensable pour notre cure matinale d'immunité."
  },
  {
    id: 3,
    name: 'Youssef Taghi',
    city: 'Fès · Ville Nouvelle',
    date: 'Il y a 10 jours',
    rating: 5,
    product: 'Pack Découverte Terroir (Trio)',
    comment: "Le Pack Découverte est un sans-faute : présentation digne d'une grande maison de luxe, pots bien scellés et cuillère en bois très pratique. Mention spéciale pour le Sidr qui a une finesse et des notes de noisette remarquables."
  }
];

// FAQ Apicole
const FAQS = [
  {
    q: 'Comment être certain que le miel Inobee est 100% pur et brut ?',
    a: 'Nos miels sont extraits à froid par force centrifuge sans jamais dépasser la température naturelle de la ruche (35°C). Chaque lot est soumis à des analyses rigoureuses garantissant un taux d’humidité inférieur à 17%, l’absence totale de sucre ajouté, de sirop de glucose ou de résidus chimiques.'
  },
  {
    q: 'Pourquoi mon miel se cristallise-t-il avec le temps ?',
    a: 'La cristallisation est la preuve absolue d’un miel pur et vivant ! Seuls les miels industriels pasteurisés ou coupés au sirop restent indéfiniment liquides. Pour lui redonner une texture onctueuse, il suffit de tiédir délicatement le pot au bain-marie sans dépasser 38°C.'
  },
  {
    q: 'Quels sont vos délais et frais de livraison au Maroc ?',
    a: 'Nous livrons sous 24h ouvrées à Casablanca, Rabat et Marrakech, et sous 24 à 48h partout ailleurs au Royaume du Maroc. La livraison est 100% gratuite dès 400 MAD d’achats (sinon 35 MAD fixes).'
  },
  {
    q: 'Comment s’effectue le paiement à la livraison (Cash on Delivery) ?',
    a: 'Vous ne payez rien en ligne. Vous réglez directement le montant exact en espèces auprès de notre livreur au moment de la réception de votre colis, après vérification de l’intégrité du paquet.'
  }
];

// ============================================================================
// COMPOSANT 1 : CANEVAS DE PARTICULES DE POLLEN DORÉ FLOTTANT
// ============================================================================
function GoldenPollenCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialisation des grains de pollen flottants
    const particleCount = Math.floor(Math.min(width, 1200) / 28);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.8 + 1,
      speedX: (Math.random() - 0.5) * 0.4 + 0.15,
      speedY: (Math.random() - 0.5) * 0.3 - 0.25,
      opacity: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      hue: Math.random() > 0.4 ? 42 : 36 // Teintes ambre et or
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        // Mouvement naturel avec brise douce
        p.x += p.speedX;
        p.y += p.speedY;

        // Interaction douce avec la souris (effet de brise créée par le passage)
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          p.x -= (dx / dist) * 0.6;
          p.y -= (dy / dist) * 0.6;
        }

        // Recyclage des particules
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.005;
        const safeOpacity = Math.max(0.15, Math.min(0.85, p.opacity));

        // Rendu du grain de pollen avec halo bokeh
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.2);
        gradient.addColorStop(0, `hsla(${p.hue}, 95%, 60%, ${safeOpacity})`);
        gradient.addColorStop(0.5, `hsla(${p.hue}, 90%, 50%, ${safeOpacity * 0.4})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 80%, 40%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70"
    />
  );
}

// ============================================================================
// COMPOSANT 2 : GÉNÉRATEUR SONORE DE NATURE & RUCHERS (WEB AUDIO SYNTHÉ)
// ============================================================================
function NatureAudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  const toggleSound = () => {
    if (isPlaying) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsPlaying(false);
    } else {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        // Générateur de brise douce (bruit filtré rose/brun)
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          output[i] = (b0 + b1 + b2) * 0.05;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 420;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.18, ctx.currentTime);
        gainNodeRef.current = gainNode;

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        whiteNoise.start();

        setIsPlaying(true);
      } catch (e) {
        console.error("Audio Web non supporté", e);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggleSound}
      title={isPlaying ? "Couper l'ambiance nature" : "Activer la brise des ruchers de l'Atlas"}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#1E130A] border border-[#D97706]/30 text-xs font-semibold shadow-sm transition-all group"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 text-[#D97706] animate-pulse" />
          <span className="text-[11px] font-bold text-[#D97706]">Nature : En direct</span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#D97706]" />
          <span className="text-[11px] text-[#6B7280]">Ambiance Rucher</span>
        </>
      )}
    </button>
  );
}

// ============================================================================
// COMPOSANT PRINCIPAL : APP
// ============================================================================
export default function App() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTerroir, setActiveTerroir] = useState('anti-atlas');
  const [diagnosticGoal, setDiagnosticGoal] = useState('immunity');

  // Sélections de grammages par produit
  const [selectedWeights, setSelectedWeights] = useState({
    daghmous: 500,
    thym: 500,
    sidr: 500,
    oranger: 500,
    'pack-terroir': 750
  });

  // Panier
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('inobee_luxury_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // États UI
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Formulaire & API
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  const [checkoutData, setCheckoutData] = useState({
    fullName: '',
    phone: '',
    city: 'Casablanca',
    address: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Synchronisation backend
  useEffect(() => {
    let isMounted = true;
    async function fetchProducts() {
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.products) && isMounted) {
            setProducts(data.products);
          }
        }
      } catch (err) {
        // Fallback immédiat
      }
    }
    fetchProducts();
    return () => { isMounted = false; };
  }, []);

  // Sauvegarde panier LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('inobee_luxury_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Calculs financiers
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

  const handleWeightSelect = (productId, weight) => {
    setSelectedWeights(prev => ({ ...prev, [productId]: weight }));
  };

  const addToCart = (product, forcedWeight = null) => {
    const weight = forcedWeight || selectedWeights[product.id] || product.defaultWeight;
    const price = product.prices[weight];
    const cartItemId = `${product.id}-${weight}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          weight: weight,
          price: price,
          quantity: 1,
          image: product.image,
          fallbackImage: product.fallbackImage,
          isPack: product.isPack || false
        }
      ];
    });

    triggerToast(`🌿 Récolte ajoutée : ${product.name} (${product.isPack ? 'Coffret' : `${weight}g`})`);
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  // Validation Code Promo via API
  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();

    if (!code) {
      setCouponError('Veuillez saisir un code promo');
      return;
    }

    setIsApplyingCoupon(true);
    try {
      const res = await fetch(`${API_BASE}/api/promo/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal: cartSubtotal })
      });
      const data = await res.json();

      if (data.success && data.valid) {
        setAppliedDiscount(data.discountPercent);
        triggerToast(data.message || `Code promo appliqué : -${data.discountPercent}% !`);
      } else {
        setCouponError(data.message || 'Code promo invalide');
      }
    } catch (err) {
      if (code === 'INOBEE10' || code === 'BIENVENUE') {
        setAppliedDiscount(10);
        triggerToast('Code promo appliqué : -10% sur votre commande !');
      } else {
        setCouponError('Code promo invalide pour cette commande');
      }
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!checkoutData.fullName.trim() || checkoutData.fullName.trim().length < 2) {
      errors.fullName = 'Veuillez renseigner votre nom complet';
    }
    const phoneClean = checkoutData.phone.replace(/\s+/g, '');
    if (!phoneClean) {
      errors.phone = 'Le numéro de téléphone est obligatoire pour le livreur';
    } else if (!/^(0[567])[0-9]{8}$/.test(phoneClean) && !/^\+212[567][0-9]{8}$/.test(phoneClean)) {
      errors.phone = 'Format marocain attendu (ex: 06 12 34 56 78)';
    }
    if (!checkoutData.address.trim() || checkoutData.address.trim().length < 5) {
      errors.address = 'Veuillez préciser votre adresse complète';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Commande COD via Backend Express
  const handleConfirmOrderCOD = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      triggerToast('Votre panier est vide');
      return;
    }
    if (!validateForm()) return;

    setIsSubmittingOrder(true);
    const orderPayload = {
      customer: { ...checkoutData },
      items: cart.map(it => ({
        productId: it.productId,
        name: it.name,
        weight: it.weight,
        quantity: it.quantity,
        price: it.price
      })),
      promoCode: appliedDiscount > 0 ? couponCode : null
    };

    try {
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();

      if (data.success && data.order) {
        setOrderConfirmed({
          orderId: data.orderId,
          customer: data.order.customer,
          items: data.order.items,
          totals: data.order.totals,
          whatsappUrl: data.whatsappUrl,
          date: new Date().toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
          })
        });
        setCart([]);
        setIsCartOpen(false);
        triggerToast('Commande confirmée avec succès !');
      } else {
        triggerToast(data.message || 'Erreur lors de la validation');
      }
    } catch (err) {
      const fallbackRef = `CMD-INB-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderConfirmed({
        orderId: fallbackRef,
        customer: { ...checkoutData },
        items: [...cart],
        totals: {
          subtotal: cartSubtotal,
          discount: discountAmount,
          deliveryFee: shippingCost,
          total: cartTotal
        },
        whatsappUrl: generateWhatsAppUrl(),
        date: new Date().toLocaleDateString('fr-FR', {
          day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        })
      });
      setCart([]);
      setIsCartOpen(false);
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const generateWhatsAppUrl = () => {
    const phone = '212600000000';
    let message = `Bonjour Inobee SARL,\n\nJe souhaite commander du miel pur récolté en pleine nature :\n\n`;
    cart.forEach(item => {
      const weightLabel = item.isPack ? 'Coffret 3×250g' : `${item.weight}g`;
      message += `• ${item.quantity}x ${item.name} (${weightLabel}) = ${item.price * item.quantity} MAD\n`;
    });
    message += `\nSous-total : ${cartSubtotal} MAD`;
    if (discountAmount > 0) message += `\nRemise : -${discountAmount} MAD`;
    message += `\nLivraison : ${shippingCost === 0 ? 'Gratuite (Dès 400 MAD)' : '35 MAD'}`;
    message += `\n*TOTAL NET : ${cartTotal} MAD*\n\n`;
    if (checkoutData.fullName || checkoutData.phone) {
      message += `*Coordonnées :*\nNom : ${checkoutData.fullName || 'Non précisé'}\nTél : ${checkoutData.phone || 'Non précisé'}\nVille : ${checkoutData.city}\nAdresse : ${checkoutData.address || 'À préciser'}\n\n`;
    }
    message += `Paiement en espèces à la livraison.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return products;
    return products.filter(p => p.category === activeFilter);
  }, [products, activeFilter]);

  // Recommandation intelligente du Diagnostic Miel
  const recommendedProduct = useMemo(() => {
    if (diagnosticGoal === 'immunity') return products.find(p => p.id === 'daghmous') || products[0];
    if (diagnosticGoal === 'energy') return products.find(p => p.id === 'sidr') || products[2];
    if (diagnosticGoal === 'sleep') return products.find(p => p.id === 'oranger') || products[3];
    return products.find(p => p.id === 'pack-terroir') || products[4];
  }, [products, diagnosticGoal]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F2937] font-sans antialiased selection:bg-[#D97706]/20 selection:text-[#1E130A] honeycomb-pattern relative">
      
      {/* ====================================================================
          1. HEADER AVEC AMBIANCE NATURE & NAVIGATION FLUIDE
          ==================================================================== */}
      <div className="bg-[#140C06] text-[#FAF7F2] text-[11px] sm:text-xs font-medium py-2 px-4 tracking-wide border-b border-[#D97706]/25 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="w-2 h-2 rounded-full bg-[#15803D] animate-ping"></span>
            <span>
              <strong>Livraison gratuite</strong> partout au Maroc dès 400 MAD • Paiement à la livraison
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[#D97706]">
            <span className="flex items-center gap-1.5">
              <Flower2 className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Butiné à 1 400m d'Altitude</span>
            </span>
            <span>•</span>
            <span className="text-[#FAF7F2]/80">Expédition 24/48h</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-xl border-b border-[#E8E1D5]/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Officiel Inobee SARL */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FAF7F2] via-white to-[#F5EBD6] p-1.5 border border-[#D97706]/40 shadow-sm flex items-center justify-center overflow-hidden group-hover:border-[#D97706] transition-colors">
              <img
                src="assets/logo.png"
                alt="Inobee SARL Logo"
                className="w-full h-full object-contain transition-transform group-hover:scale-105 duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.logo-svg-fallback');
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="logo-svg-fallback hidden text-[#D97706]">
                <Droplets className="w-6 h-6 fill-[#D97706]" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#1E130A] leading-none">
                  INOBEE
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#15803D]/10 text-[#15803D]">
                  BIO
                </span>
              </div>
              <span className="text-[9px] tracking-[0.25em] text-[#D97706] font-semibold uppercase mt-0.5">
                Maison Apicole · SARL
              </span>
            </div>
          </a>

          {/* Navigation Liens Desktop */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#4B5563]">
            <a href="#boutique" className="hover:text-[#D97706] transition-colors flex items-center gap-1">
              <span>Boutique</span>
            </a>
            <a href="#terroirs" className="hover:text-[#D97706] transition-colors flex items-center gap-1">
              <Mountain className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Terroirs de l'Atlas</span>
            </a>
            <a href="#diagnostic" className="hover:text-[#D97706] transition-colors flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Diagnostic Santé</span>
            </a>
            <a href="#histoire" className="hover:text-[#D97706] transition-colors">Notre Histoire</a>
            <a href="#avis" className="hover:text-[#D97706] transition-colors">Avis</a>
          </nav>

          {/* Contrôles : Toggle Son Ambiance Nature & Panier Dynamique */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <NatureAudioToggle />
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 bg-[#1E130A] hover:bg-[#2A1B0E] text-[#FAF7F2] px-4 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 group relative overflow-hidden"
              aria-label="Ouvrir le panier"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#F59E0B] group-hover:scale-110 transition-transform" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#D97706] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {totalItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">Panier</span>
              <span className="text-xs font-bold text-[#F59E0B] border-l border-white/20 pl-2">
                {cartTotal} MAD
              </span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#1E130A] hover:bg-[#E8E1D5]/60 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8E1D5] px-6 py-4 space-y-3">
            <div className="pb-2 border-b border-[#E8E1D5]">
              <NatureAudioToggle />
            </div>
            <a href="#boutique" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#1E130A] py-1">
              Boutique des Miels
            </a>
            <a href="#terroirs" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#1E130A] py-1">
              Terroirs de l'Atlas
            </a>
            <a href="#diagnostic" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#1E130A] py-1">
              Diagnostic Santé & Miel
            </a>
            <a href="#histoire" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#1E130A] py-1">
              Notre Savoir-Faire
            </a>
            <a href="#avis" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#1E130A] py-1">
              Avis Clients Vérifiés
            </a>
          </div>
        )}
      </header>

      <main>
        {/* ====================================================================
            2. HERO SECTION VIVANTE AVEC PARTICULES DE POLLEN ET MOTION 3D
            ==================================================================== */}
        <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E8E1D5] bg-gradient-to-b from-[#FAF7F2] via-[#FAF4E8] to-[#FAF7F2]">
          
          {/* Moteur de Particules de Pollen Luminous Canvas */}
          <GoldenPollenCanvas />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Colonne Gauche : Storytelling Vivant */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D97706]/10 border border-[#D97706]/30 text-[#D97706] text-xs font-bold tracking-wide shadow-sm backdrop-blur-md">
                  <Wind className="w-3.5 h-3.5 text-[#D97706] animate-pulse" />
                  <span>Récoltes Sauvages & Flore Médicinale de l'Atlas</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1E130A] tracking-tight leading-[1.12]">
                  Le Vrai Miel Brut du Maroc, <span className="text-[#D97706] italic font-normal">Façonné par la Nature.</span>
                </h1>

                <p className="text-base sm:text-lg text-[#4B5563] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                  100% pur, extrait mécaniquement à froid sans chauffage. Récolté avec respect des abeilles dans les sanctuaires sauvages de l'Atlas et du Souss.
                </p>

                {/* CTAs avec effet Glow doré */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <a
                    href="#boutique"
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D97706] to-[#B45309] hover:from-[#B45309] hover:to-[#92400E] text-white text-sm font-bold tracking-wide shadow-xl shadow-[#D97706]/30 transition-all duration-300 flex items-center justify-center gap-2.5 group hover:-translate-y-0.5"
                  >
                    <span>Commander Maintenant</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </a>
                  <a
                    href="#terroirs"
                    className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/80 hover:bg-white text-[#1E130A] text-sm font-semibold border border-[#E8E1D5] shadow-sm backdrop-blur-md transition-all text-center flex items-center justify-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-[#D97706]" />
                    <span>Explorer les Terroirs</span>
                  </a>
                </div>

                {/* 4 Badges de Confiance Terroir */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#E8E1D5]/80">
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-[#E8E1D5] backdrop-blur-sm shadow-sm hover:border-[#D97706]/40 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span className="text-xs font-semibold text-[#1E130A]">100% Naturel & Brut</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-[#E8E1D5] backdrop-blur-sm shadow-sm hover:border-[#D97706]/40 transition-colors">
                    <Award className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span className="text-xs font-semibold text-[#1E130A]">Analysé en Labo</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-[#E8E1D5] backdrop-blur-sm shadow-sm hover:border-[#D97706]/40 transition-colors">
                    <Banknote className="w-4 h-4 text-[#15803D] shrink-0" />
                    <span className="text-xs font-semibold text-[#1E130A]">Paiement à la Livraison</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/80 border border-[#E8E1D5] backdrop-blur-sm shadow-sm hover:border-[#D97706]/40 transition-colors">
                    <Truck className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span className="text-xs font-semibold text-[#1E130A]">Livraison 24/48h</span>
                  </div>
                </div>

              </div>

              {/* Colonne Droite : Pot de Miel de Luxe avec Animation Flottante */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-[#FAF7F2] to-[#E8E1D5] group card-luxury-hover animate-float-slow">
                  <img
                    src="assets/img/product-daghmous.jpg"
                    alt="Miel Brut Inobee SARL"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMAGES.hero;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140C06]/80 via-transparent to-transparent"></div>
                  
                  {/* Badge Altitude Flottant */}
                  <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#D97706]/30 shadow-md flex items-center gap-1.5 text-xs font-bold text-[#1E130A]">
                    <Mountain className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Altitude : 1 400 m</span>
                  </div>

                  {/* Pastille Terroir Sensorielle */}
                  <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#D97706]">Récolte Sauvage 2026</p>
                      <p className="font-serif text-sm font-bold text-[#1E130A]">Miel d'Euphorbe & Thym de l'Atlas</p>
                      <p className="text-[11px] text-[#6B7280]">Non pasteurisé · Extraction centrifuge à froid</p>
                    </div>
                    <span className="px-3 py-1 bg-[#15803D]/10 text-[#15803D] text-xs font-bold rounded-full shrink-0">
                      Pur & Certifié
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ====================================================================
            3. SECTION INTERACTIVE : VOYAGE AU CŒUR DES TERROIRS SAUVAGES
            ==================================================================== */}
        <section id="terroirs" className="py-20 sm:py-28 bg-[#1E130A] text-[#FAF7F2] relative overflow-hidden honeycomb-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#F59E0B] block mb-2">
                Géographie & Biodiversité Mellifère
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Les 3 Sanctuaires de l'Apiculture Inobee
              </h2>
              <p className="text-sm sm:text-base text-white/70 mt-3 font-light">
                Le goût et les vertus de nos miels sont l'empreinte directe des sols, des altitudes et du climat marocain.
              </p>
            </div>

            {/* Sélecteur de Terroirs Interactif */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TERROIRS.map((t) => {
                const isSelected = activeTerroir === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setActiveTerroir(t.id)}
                    className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 border ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#2E1D10] to-[#1E130A] border-[#D97706] shadow-2xl shadow-[#D97706]/15 -translate-y-2'
                        : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-[#F59E0B] px-2.5 py-1 rounded-full bg-[#D97706]/20 border border-[#D97706]/30">
                        {t.altitude}
                      </span>
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#15803D] animate-ping"></span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-bold text-white mb-1">
                      {t.name}
                    </h3>
                    <p className="text-xs text-[#D97706] font-semibold mb-3">
                      {t.title}
                    </p>

                    <p className="text-xs text-white/70 mb-4 leading-relaxed">
                      {t.climate}
                    </p>

                    <div className="pt-4 border-t border-white/10 text-xs space-y-1.5">
                      <p className="text-white/50 uppercase text-[10px] font-bold tracking-wider">Flore Butinée :</p>
                      <p className="text-white/90 italic">{t.botany}</p>
                    </div>

                    <div className="mt-5 pt-3 flex items-center justify-between text-xs text-[#F59E0B] font-bold">
                      <span>Découvrir le miel de cette région</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ====================================================================
            4. DIAGNOSTIC SANTÉ & NATURE : TROUVEZ VOTRE MIEL IDÉAL
            ==================================================================== */}
        <section id="diagnostic" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8E1D5]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E1D5] shadow-xl relative overflow-hidden">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D97706] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Diagnostic Apithérapie Personnalisé</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E130A]">
                    Quel Bienfait Naturel Recherchez-Vous ?
                  </h3>
                </div>
                <span className="text-xs text-[#6B7280]">Résultat instantané en 1 clic</span>
              </div>

              {/* Boutons d'objectifs de santé */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <button
                  type="button"
                  onClick={() => setDiagnosticGoal('immunity')}
                  className={`p-3.5 rounded-2xl text-left border transition-all ${
                    diagnosticGoal === 'immunity'
                      ? 'bg-[#1E130A] text-white border-[#1E130A] shadow-md'
                      : 'bg-[#FAF7F2] text-[#374151] border-[#E8E1D5] hover:border-[#D97706]'
                  }`}
                >
                  <span className="text-lg block mb-1">🛡️</span>
                  <p className="text-xs font-bold leading-snug">Immunité & Gorge</p>
                  <p className="text-[10px] opacity-75 mt-0.5">Refroidissements & ORL</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDiagnosticGoal('energy')}
                  className={`p-3.5 rounded-2xl text-left border transition-all ${
                    diagnosticGoal === 'energy'
                      ? 'bg-[#1E130A] text-white border-[#1E130A] shadow-md'
                      : 'bg-[#FAF7F2] text-[#374151] border-[#E8E1D5] hover:border-[#D97706]'
                  }`}
                >
                  <span className="text-lg block mb-1">⚡</span>
                  <p className="text-xs font-bold leading-snug">Énergie & Tonus</p>
                  <p className="text-[10px] opacity-75 mt-0.5">Récupération physique</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDiagnosticGoal('sleep')}
                  className={`p-3.5 rounded-2xl text-left border transition-all ${
                    diagnosticGoal === 'sleep'
                      ? 'bg-[#1E130A] text-white border-[#1E130A] shadow-md'
                      : 'bg-[#FAF7F2] text-[#374151] border-[#E8E1D5] hover:border-[#D97706]'
                  }`}
                >
                  <span className="text-lg block mb-1">🌸</span>
                  <p className="text-xs font-bold leading-snug">Douceur & Sommeil</p>
                  <p className="text-[10px] opacity-75 mt-0.5">Enfants & Sérénité</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDiagnosticGoal('gift')}
                  className={`p-3.5 rounded-2xl text-left border transition-all ${
                    diagnosticGoal === 'gift'
                      ? 'bg-[#1E130A] text-white border-[#1E130A] shadow-md'
                      : 'bg-[#FAF7F2] text-[#374151] border-[#E8E1D5] hover:border-[#D97706]'
                  }`}
                >
                  <span className="text-lg block mb-1">🎁</span>
                  <p className="text-xs font-bold leading-snug">Cadeau & Découverte</p>
                  <p className="text-[10px] opacity-75 mt-0.5">Trio 3 nectars avec cuillère</p>
                </button>
              </div>

              {/* Carte Recommandation Dynamique */}
              {recommendedProduct && (
                <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white shrink-0 border border-[#E8E1D5]">
                      <img
                        src={recommendedProduct.image}
                        alt={recommendedProduct.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = recommendedProduct.fallbackImage; }}
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706]">
                        Recommandation Inobee pour votre profil :
                      </span>
                      <h4 className="font-serif text-lg font-bold text-[#1E130A]">
                        {recommendedProduct.name}
                      </h4>
                      <p className="text-xs text-[#6B7280]">
                        {recommendedProduct.tagline} • Terroir : {recommendedProduct.terroir}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                      type="button"
                      onClick={() => setQuickViewProduct(recommendedProduct)}
                      className="flex-1 md:flex-none px-4 py-3 rounded-xl bg-white hover:bg-[#FAF7F2] text-xs font-bold text-[#1E130A] border border-[#E8E1D5] transition-colors text-center"
                    >
                      Voir les Bienfaits
                    </button>
                    <button
                      type="button"
                      onClick={() => addToCart(recommendedProduct)}
                      className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajouter au Panier</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* ====================================================================
            5. BOUTIQUE DES NECTARS AVEC CARTES 3D & SÉLECTEUR DE POIDS
            ==================================================================== */}
        <section id="boutique" className="py-16 sm:py-24 bg-white border-b border-[#E8E1D5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706] block mb-2">
                  La Collection Inobee SARL
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E130A] tracking-tight">
                  Nos Nectars d’Exception
                </h2>
                <p className="text-sm sm:text-base text-[#6B7280] mt-1">
                  Sélectionnez votre variété et choisissez le format adapté à votre consommation.
                </p>
              </div>

              {/* Onglets Filtres */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#FAF7F2] rounded-2xl border border-[#E8E1D5]">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeFilter === 'all'
                      ? 'bg-[#1E130A] text-[#FAF7F2] shadow-sm'
                      : 'text-[#4B5563] hover:text-[#1E130A]'
                  }`}
                >
                  Tous nos Miels
                </button>
                <button
                  onClick={() => setActiveFilter('rares')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeFilter === 'rares'
                      ? 'bg-[#1E130A] text-[#FAF7F2] shadow-sm'
                      : 'text-[#4B5563] hover:text-[#1E130A]'
                  }`}
                >
                  Miels Rares & Thérapeutiques
                </button>
                <button
                  onClick={() => setActiveFilter('doux')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeFilter === 'doux'
                      ? 'bg-[#1E130A] text-[#FAF7F2] shadow-sm'
                      : 'text-[#4B5563] hover:text-[#1E130A]'
                  }`}
                >
                  Miels Doux
                </button>
                <button
                  onClick={() => setActiveFilter('packs')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeFilter === 'packs'
                      ? 'bg-[#1E130A] text-[#FAF7F2] shadow-sm'
                      : 'text-[#4B5563] hover:text-[#1E130A]'
                  }`}
                >
                  Packs Découverte
                </button>
              </div>
            </div>

            {/* Grille de Produits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => {
                const currentWeight = selectedWeights[product.id] || product.defaultWeight;
                const currentPrice = product.prices[currentWeight];

                return (
                  <div
                    key={product.id}
                    className="group bg-[#FAF7F2] rounded-3xl border border-[#E8E1D5] overflow-hidden flex flex-col justify-between card-luxury-hover"
                  >
                    {/* Image & Badges */}
                    <div className="relative aspect-[4/3] bg-white overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                        onError={(e) => {
                          e.currentTarget.src = product.fallbackImage;
                        }}
                      />
                      
                      <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                        <span className="px-3 py-1 rounded-full bg-[#1E130A]/85 backdrop-blur-md text-[#FAF7F2] text-[11px] font-bold tracking-wide">
                          {product.badge}
                        </span>
                        {product.isPack && (
                          <span className="px-3 py-1 rounded-full bg-[#15803D] text-white text-[10px] font-bold tracking-wider uppercase">
                            Économie -50 MAD
                          </span>
                        )}
                      </div>

                      {product.altitude && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#1E130A] border border-white/60 flex items-center gap-1 shadow-sm">
                          <Mountain className="w-3 h-3 text-[#D97706]" />
                          <span>{product.altitude}</span>
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/60 text-[11px] text-[#4B5563] font-medium truncate flex items-center justify-between">
                        <span>📍 {product.terroir}</span>
                        {product.bloom && <span className="text-[10px] text-[#D97706] font-semibold">{product.bloom}</span>}
                      </div>
                    </div>

                    {/* Contenu Produit */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      
                      <div>
                        <h3 className="font-serif text-xl font-bold text-[#1E130A] group-hover:text-[#D97706] transition-colors leading-snug">
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#6B7280] font-medium mt-1">
                          {product.tagline}
                        </p>
                      </div>

                      {/* Sélecteur de Formats Dynamique (250g | 500g | 1kg) */}
                      {!product.isPack ? (
                        <div className="space-y-2 pt-2">
                          <label className="text-[11px] font-bold text-[#4B5563] uppercase tracking-wider block">
                            Format sélectionné :
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[250, 500, 1000].map((w) => (
                              <button
                                key={w}
                                type="button"
                                onClick={() => handleWeightSelect(product.id, w)}
                                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                                  currentWeight === w
                                    ? 'bg-[#1E130A] text-white border-[#1E130A] shadow-sm'
                                    : 'bg-white text-[#4B5563] border-[#E8E1D5] hover:border-[#D97706]'
                                }`}
                              >
                                {w === 1000 ? '1 kg' : `${w}g`}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="pt-2">
                          <div className="p-2.5 rounded-xl bg-white border border-[#E8E1D5] text-xs text-[#4B5563] flex items-center justify-between">
                            <span className="font-semibold text-[#1E130A]">Coffret 3 Nectars</span>
                            <span className="font-mono text-[#D97706] font-bold">3 × 250g</span>
                          </div>
                        </div>
                      )}

                      {/* Prix & Déclencheur Modale */}
                      <div className="pt-2 flex items-baseline justify-between border-t border-[#E8E1D5]">
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-2xl font-bold text-[#1E130A]">
                            {currentPrice} <span className="text-sm font-sans font-semibold text-[#D97706]">MAD</span>
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#9CA3AF] line-through">
                              {product.originalPrice} MAD
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => setQuickViewProduct(product)}
                          className="text-xs text-[#D97706] hover:text-[#B45309] font-bold flex items-center gap-1 underline underline-offset-4"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>Détails & Bienfaits</span>
                        </button>
                      </div>

                      {/* Bouton Ajout Panier */}
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="w-full py-3.5 px-4 rounded-xl bg-[#1E130A] hover:bg-[#D97706] text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-sm active:scale-98"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Ajouter au Panier</span>
                      </button>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ====================================================================
            6. QUI SOMMES-NOUS ? (SAVOIR-FAIRE APICOLE & 3 PILIERS)
            ==================================================================== */}
        <section id="histoire" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#E8E1D5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-white group">
                  <img
                    src="assets/img/product-sidr.jpg"
                    alt="Rucher Inobee dans l'Atlas"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMAGES.story;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140C06]/85 via-transparent to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                    <span className="text-xs uppercase font-bold tracking-widest text-[#F59E0B]">Authenticité & Traçabilité</span>
                    <h3 className="font-serif text-lg font-bold">Ruchers Sauvages de Haute Montagne</h3>
                    <p className="text-xs text-white/80">Respect du cycle biologique des abeilles marocaines et extraction à froid sous vide contrôlé.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706] block">
                  Notre Savoir-Faire & Vision
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E130A] leading-tight">
                  Inobee SARL : L’Excellence de l'Apiculture Marocaine, Sans Compromis.
                </h2>

                <p className="text-base text-[#4B5563] leading-relaxed">
                  <strong>Inobee SARL</strong> est une maison apicole marocaine dédiée à la valorisation des miels purs de notre terroir. Nous privilégions une apiculture respectueuse des abeilles, exempte de toute pratique intensive et assurant une traçabilité totale, du rucher jusqu’à votre table.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] flex items-start gap-4 shadow-sm">
                    <div className="p-2.5 rounded-xl bg-[#FAF7F2] text-[#D97706] shrink-0 border border-[#E8E1D5]">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-[#1E130A] text-base">1. Extraction Mécanique à Froid</h4>
                      <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                        Nos miels ne sont jamais pasteurisés ni chauffés au-dessus de 35°C. Les enzymes digestives, vitamines et arômes floraux restent vivants et intacts.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] flex items-start gap-4 shadow-sm">
                    <div className="p-2.5 rounded-xl bg-[#FAF7F2] text-[#15803D] shrink-0 border border-[#E8E1D5]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-[#1E130A] text-base">2. Contrôle Qualité & Analyses en Laboratoire</h4>
                      <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                        Chaque lot est vérifié par analyses physico-chimiques : contrôle du taux d'humidité (&lt; 17%), dosage HMF bas garantissant la fraîcheur, et certitude absolue d’un miel sans sucre ajouté.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] flex items-start gap-4 shadow-sm">
                    <div className="p-2.5 rounded-xl bg-[#FAF7F2] text-[#D97706] shrink-0 border border-[#E8E1D5]">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-[#1E130A] text-base">3. Partenariats Éthiques & Terroir Local</h4>
                      <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                        Nous collaborons directement avec les coopératives apicoles des montagnes marocaines, garantissant une rémunération juste aux apiculteurs et préservant la biodiversité mellifère nationale.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            7. PREUVE SOCIALE : AVIS CLIENTS VÉRIFIÉS
            ==================================================================== */}
        <section id="avis" className="py-20 bg-white border-b border-[#E8E1D5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706] block mb-2">
                Témoignages Réels
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E130A]">
                La Confiance de Nos Clients au Maroc
              </h2>
              <div className="flex items-center justify-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
                <span className="text-xs font-bold text-[#1E130A] ml-2">Note moyenne : 4.9 / 5</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {REVIEWS.map(rev => (
                <div
                  key={rev.id}
                  className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#E8E1D5] flex flex-col justify-between hover:shadow-xl transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#F59E0B]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#9CA3AF] font-medium">{rev.date}</span>
                    </div>

                    <p className="text-sm text-[#374151] italic leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#E8E1D5] flex items-center justify-between">
                    <div>
                      <p className="font-serif font-bold text-[#1E130A] text-sm">{rev.name}</p>
                      <p className="text-xs text-[#6B7280]">{rev.city}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#15803D]/10 text-[#15803D] text-[10px] font-bold">
                      Achat Vérifié
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            8. GUIDE & FAQ SECTION
            ==================================================================== */}
        <section id="faq" className="py-20 bg-[#FAF7F2] border-b border-[#E8E1D5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706] block mb-2">
                Transparence & Conseils
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1E130A]">
                Foire Aux Questions & Conseils Apicoles
              </h2>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-white rounded-2xl border border-[#E8E1D5] p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer open:shadow-md transition-all"
                >
                  <summary className="flex items-center justify-between gap-4 font-serif font-bold text-base text-[#1E130A]">
                    <span>{faq.q}</span>
                    <ChevronDown className="w-4 h-4 text-[#D97706] transition-transform duration-200 group-open:rotate-180 shrink-0" />
                  </summary>
                  <p className="text-sm text-[#4B5563] mt-3 pt-3 border-t border-[#FAF7F2] leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================================
          FOOTER LUXE & ASSISTANCE OFFICIELLE
          ==================================================================== */}
      <footer id="contact" className="bg-[#140C06] text-[#FAF7F2] pt-16 pb-12 border-t border-[#D97706]/30 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 flex items-center justify-center text-[#F59E0B]">
                  <Droplets className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="font-serif text-xl font-bold text-white tracking-tight">INOBEE SARL</span>
                  <p className="text-[10px] text-[#D97706] tracking-widest uppercase">Maison Apicole Marocaine</p>
                </div>
              </div>
              <p className="text-xs text-white/70 leading-relaxed max-w-sm">
                Entreprise marocaine spécialisée dans la récolte, le conditionnement sous atmosphère contrôlée et la distribution directe de miels bruts d'exception.
              </p>
              <div className="flex items-center gap-3 pt-2 text-xs text-[#F59E0B]">
                <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                <span>Analyses certifiées · Sans sucre ajouté · Extraction à froid</span>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D97706]">Boutique Directe</h4>
              <ul className="space-y-2 text-xs text-white/70">
                <li><a href="#boutique" className="hover:text-white transition-colors">Miel d'Euphorbe (Daghmous)</a></li>
                <li><a href="#boutique" className="hover:text-white transition-colors">Miel de Thym Pur (Zâatar)</a></li>
                <li><a href="#boutique" className="hover:text-white transition-colors">Miel de Sidr Royal (Jujubier)</a></li>
                <li><a href="#boutique" className="hover:text-white transition-colors">Miel d'Oranger du Souss</a></li>
                <li><a href="#boutique" className="hover:text-white transition-colors">Pack Découverte Trio</a></li>
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D97706]">Service Client & Expéditions</h4>
              <p className="text-xs text-white/70">
                Expédition quotidienne de commandes par nos transporteurs partenaires dans toutes les villes du Maroc.
              </p>
              <div className="space-y-2 text-xs pt-1">
                <a
                  href="https://wa.me/212600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#25D366] hover:underline font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Assistance : +212 6 00 00 00 00</span>
                </a>
                <p className="text-white/60">Email : contact@inobee.ma</p>
                <p className="text-white/60">Siège social : Casablanca, Maroc</p>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <p>© {new Date().getFullYear()} Inobee SARL. Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <span>Réglementation Marocaine</span>
              <span>•</span>
              <span>Paiement à la Livraison</span>
              <span>•</span>
              <span>Traçabilité Garantie</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          TIROIR PANIER SLIDE-OVER & TUNNEL DE COMMANDE MAROCAIN
          ==================================================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          ></div>

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <div className="w-screen max-w-lg bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#E8E1D5]">
              
              <div className="p-6 bg-white border-b border-[#E8E1D5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#D97706]" />
                  <h3 className="font-serif text-xl font-bold text-[#1E130A]">Votre Panier Inobee</h3>
                  <span className="text-xs bg-[#FAF7F2] border border-[#E8E1D5] px-2 py-0.5 rounded-full font-bold text-[#D97706]">
                    {totalItemCount} {totalItemCount > 1 ? 'articles' : 'article'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 text-[#6B7280] transition-colors"
                  aria-label="Fermer le panier"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Jauge Livraison Gratuite */}
              <div className="bg-[#FAF7F2] px-6 py-3.5 border-b border-[#E8E1D5]">
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[#374151]">
                    {cartSubtotal >= 400 ? (
                      <span className="text-[#15803D] font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Livraison gratuite offerte partout au Maroc !
                      </span>
                    ) : (
                      <span>
                        Plus que <strong className="text-[#D97706]">{freeShippingRemaining} MAD</strong> pour la livraison gratuite
                      </span>
                    )}
                  </span>
                  <span className="font-mono text-[11px] text-[#6B7280]">{freeShippingProgress}%</span>
                </div>
                <div className="w-full bg-[#E8E1D5] h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      cartSubtotal >= 400 ? 'bg-[#15803D]' : 'bg-[#D97706]'
                    }`}
                    style={{ width: `${freeShippingProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Articles Panier */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#E8E1D5]/60 flex items-center justify-center mx-auto text-[#6B7280]">
                      <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#1E130A]">Votre panier est vide</h4>
                    <p className="text-xs text-[#6B7280] max-w-xs mx-auto">
                      Découvrez nos nectars purs du terroir marocain et profitez de la livraison offerte dès 400 MAD.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(false)}
                      className="mt-2 px-6 py-2.5 rounded-xl bg-[#D97706] text-white text-xs font-bold"
                    >
                      Explorer la Boutique
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div
                      key={item.id}
                      className="bg-white p-4 rounded-2xl border border-[#E8E1D5] flex items-center gap-4 shadow-sm"
                    >
                      <div className="w-16 h-16 rounded-xl bg-[#FAF7F2] overflow-hidden shrink-0 border border-[#E8E1D5]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = item.fallbackImage;
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-sm text-[#1E130A] truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#D97706] font-semibold mt-0.5">
                          Format : {item.isPack ? 'Coffret 3×250g' : `${item.weight}g`}
                        </p>
                        <p className="text-xs font-mono font-bold text-[#1E130A] mt-1">
                          {item.price} MAD <span className="text-[10px] text-[#6B7280] font-normal">/ unité</span>
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1 bg-[#FAF7F2] border border-[#E8E1D5] rounded-lg p-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 rounded text-[#4B5563] hover:bg-white hover:text-[#1E130A]"
                            aria-label="Diminuer quantité"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#1E130A]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 rounded text-[#4B5563] hover:bg-white hover:text-[#1E130A]"
                            aria-label="Augmenter quantité"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#9CA3AF] hover:text-[#DC2626] transition-colors p-1"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}

                {cart.length > 0 && (
                  <div className="pt-4 space-y-6">
                    {/* Code Promo */}
                    <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5]">
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Code promo (ex: INOBEE10)"
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8E1D5] focus:outline-none focus:border-[#D97706]"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isApplyingCoupon}
                          className="px-4 py-2 bg-[#1E130A] hover:bg-[#2A1B0E] text-white text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
                        >
                          {isApplyingCoupon && <Loader2 className="w-3 h-3 animate-spin" />}
                          <span>Appliquer</span>
                        </button>
                      </form>
                      {appliedDiscount > 0 && (
                        <p className="text-[11px] text-[#15803D] font-bold mt-2 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Remise de {appliedDiscount}% appliquée avec succès !
                        </p>
                      )}
                      {couponError && (
                        <p className="text-[11px] text-[#DC2626] font-semibold mt-2">
                          {couponError}
                        </p>
                      )}
                    </div>

                    {/* Formulaire Expédition Cash on Delivery */}
                    <div className="p-5 rounded-2xl bg-white border border-[#E8E1D5] space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-[#FAF7F2]">
                        <Truck className="w-4 h-4 text-[#D97706]" />
                        <h4 className="font-serif font-bold text-sm text-[#1E130A]">
                          Informations de Livraison au Maroc
                        </h4>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-[#4B5563] block mb-1">
                          Nom & Prénom *
                        </label>
                        <input
                          type="text"
                          value={checkoutData.fullName}
                          onChange={(e) => setCheckoutData({ ...checkoutData, fullName: e.target.value })}
                          placeholder="ex: Mehdi Benjelloun"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8E1D5] focus:outline-none focus:border-[#D97706]"
                        />
                        {formErrors.fullName && (
                          <p className="text-[10px] text-[#DC2626] mt-1">{formErrors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-[#4B5563] block mb-1">
                          Numéro de Téléphone (Pour le livreur) *
                        </label>
                        <input
                          type="tel"
                          value={checkoutData.phone}
                          onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                          placeholder="ex: 06 61 23 45 67"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8E1D5] focus:outline-none focus:border-[#D97706]"
                        />
                        {formErrors.phone && (
                          <p className="text-[10px] text-[#DC2626] mt-1">{formErrors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-[#4B5563] block mb-1">
                          Ville de Livraison *
                        </label>
                        <select
                          value={checkoutData.city}
                          onChange={(e) => setCheckoutData({ ...checkoutData, city: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8E1D5] bg-white focus:outline-none focus:border-[#D97706]"
                        >
                          {MOROCCAN_CITIES.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-[#4B5563] block mb-1">
                          Adresse Complète (Quartier, Rue, N° Immeuble/Villa) *
                        </label>
                        <textarea
                          rows={2}
                          value={checkoutData.address}
                          onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                          placeholder="ex: 22 Boulevard d'Anfa, Étage 4, Résidence Al Manar"
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8E1D5] focus:outline-none focus:border-[#D97706]"
                        ></textarea>
                        {formErrors.address && (
                          <p className="text-[10px] text-[#DC2626] mt-1">{formErrors.address}</p>
                        )}
                      </div>

                      <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] flex items-center gap-2 text-[11px] text-[#4B5563]">
                        <Banknote className="w-4 h-4 text-[#15803D] shrink-0" />
                        <span>Règlement en espèces à la livraison après réception de votre colis.</span>
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Totaux & Actions Doubles */}
              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-[#E8E1D5] space-y-4">
                  <div className="space-y-1.5 text-xs text-[#4B5563]">
                    <div className="flex justify-between">
                      <span>Sous-total articles :</span>
                      <span className="font-mono font-medium text-[#1E130A]">{cartSubtotal} MAD</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#15803D]">
                        <span>Remise Code Promo ({appliedDiscount}%) :</span>
                        <span className="font-mono font-bold">-{discountAmount} MAD</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Frais de livraison :</span>
                      <span>
                        {shippingCost === 0 ? (
                          <span className="font-bold text-[#15803D]">GRATUITE</span>
                        ) : (
                          <span className="font-mono font-medium text-[#1E130A]">{shippingCost} MAD</span>
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-bold text-[#1E130A] pt-2 border-t border-[#E8E1D5]">
                      <span>Total Net (TTC) :</span>
                      <span className="text-[#D97706] font-serif text-lg">{cartTotal} MAD</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      disabled={isSubmittingOrder}
                      onClick={handleConfirmOrderCOD}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#D97706]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmittingOrder ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Validation de votre commande...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Confirmer la Commande (Paiement à la Livraison)</span>
                        </>
                      )}
                    </button>

                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-[#120B05] font-bold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm text-center"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Commander via WhatsApp Rapide</span>
                    </a>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODALE "DÉTAILS & BIENFAITS" (QUICK VIEW)
          ==================================================================== */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-[#E8E1D5]">
            
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-[#6B7280]"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[#D97706] text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-4 h-4" />
              <span>Fiche Technique Apicole · Inobee SARL</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E130A]">
              {quickViewProduct.name}
            </h3>
            <p className="text-xs text-[#6B7280] mt-1 mb-4">
              📍 Terroir d'Origine : {quickViewProduct.terroir}
            </p>

            <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
              {quickViewProduct.description}
            </p>

            {quickViewProduct.labData && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div><strong>Indice HMF :</strong> {quickViewProduct.labData.hmf}</div>
                <div><strong>Humidité :</strong> {quickViewProduct.labData.moisture}</div>
                <div><strong>Pureté :</strong> {quickViewProduct.labData.purity}</div>
              </div>
            )}

            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8E1D5] mb-6 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E130A] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                <span>Propriétés Thérapeutiques Reconnues :</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-[#4B5563]">
                {quickViewProduct.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#15803D] font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Profil Sensoriel */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E130A]">
                Profil Sensoriel de Dégustation :
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="flex justify-between mb-1 text-[#4B5563]">
                    <span>Intensité & Corps</span>
                    <span className="font-bold">{quickViewProduct.sensory.intensity}%</span>
                  </div>
                  <div className="w-full bg-[#E8E1D5] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#D97706] h-full" style={{ width: `${quickViewProduct.sensory.intensity}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-[#4B5563]">
                    <span>Douceur Sucrée</span>
                    <span className="font-bold">{quickViewProduct.sensory.sweetness}%</span>
                  </div>
                  <div className="w-full bg-[#E8E1D5] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#F59E0B] h-full" style={{ width: `${quickViewProduct.sensory.sweetness}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-[#4B5563]">
                    <span>Notes Florales</span>
                    <span className="font-bold">{quickViewProduct.sensory.floralNotes}%</span>
                  </div>
                  <div className="w-full bg-[#E8E1D5] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#15803D] h-full" style={{ width: `${quickViewProduct.sensory.floralNotes}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-[#4B5563]">
                    <span>Persistance en Bouche</span>
                    <span className="font-bold">{quickViewProduct.sensory.persistence}%</span>
                  </div>
                  <div className="w-full bg-[#E8E1D5] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#1E130A] h-full" style={{ width: `${quickViewProduct.sensory.persistence}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 mb-6 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Conseil d'utilisation : </strong>
                {quickViewProduct.usage}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                className="px-5 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#E8E1D5] text-xs font-bold text-[#4B5563]"
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={() => {
                  addToCart(quickViewProduct);
                  setQuickViewProduct(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#1E130A] hover:bg-[#D97706] text-white text-xs font-bold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter ce format au Panier</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ====================================================================
          MODALE REÇU OFFICIEL DE COMMANDE COD
          ==================================================================== */}
      {orderConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-[#E8E1D5]">
            
            <button
              type="button"
              onClick={() => setOrderConfirmed(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-[#6B7280]"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center py-2">
              <div className="w-14 h-14 bg-[#15803D]/15 text-[#15803D] rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D97706]">
                Bon de Commande Validé
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#1E130A] mt-1">
                Merci pour votre confiance !
              </h3>
              <p className="font-mono text-xs text-[#D97706] font-bold mt-1">
                Réf : {orderConfirmed.orderId}
              </p>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-xs space-y-2 text-[#374151]">
              <div><span className="text-[#6B7280]">Destinataire :</span> <strong>{orderConfirmed.customer.fullName}</strong></div>
              <div><span className="text-[#6B7280]">Téléphone :</span> {orderConfirmed.customer.phone}</div>
              <div><span className="text-[#6B7280]">Ville :</span> {orderConfirmed.customer.city}</div>
              <div><span className="text-[#6B7280]">Adresse :</span> {orderConfirmed.customer.address}</div>
              <div><span className="text-[#6B7280]">Mode de règlement :</span> <strong className="text-[#15803D]">Espèces à la livraison</strong></div>
            </div>

            <div className="mt-5 space-y-2 text-xs border-b border-[#E8E1D5] pb-4">
              <span className="font-bold text-[#1E130A] block mb-1">Articles commandés :</span>
              {orderConfirmed.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-[#4B5563]">
                  <span>{it.quantity}x {it.name} ({it.isPack ? 'Coffret 3×250g' : `${it.weight}g`})</span>
                  <span className="font-mono font-medium text-[#1E130A]">{it.lineTotal || (it.price * it.quantity)} MAD</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-base font-bold text-[#1E130A] my-4">
              <span>Montant à régler au livreur :</span>
              <span className="text-[#D97706] font-serif text-xl">{orderConfirmed.totals.total} MAD</span>
            </div>

            <p className="text-[11px] text-[#6B7280] text-center mb-6 leading-relaxed">
              Votre colis est en cours de préparation au rucher. Notre équipe logistique vous appellera sur votre numéro avant le passage du livreur.
            </p>

            <div className="space-y-2.5">
              <a
                href={orderConfirmed.whatsappUrl || generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-[#120B05] font-bold text-xs transition-colors flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Envoyer aussi la confirmation sur WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setOrderConfirmed(null)}
                className="w-full py-3 rounded-xl bg-[#FAF7F2] hover:bg-[#E8E1D5] text-[#1E130A] text-xs font-bold transition-colors"
              >
                Retourner à la Boutique
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ====================================================================
          TOAST NOTIFICATION FLOTTANTE
          ==================================================================== */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E130A] text-[#FAF7F2] text-xs font-medium px-4 py-3 rounded-2xl shadow-2xl border border-[#D97706]/40 flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#15803D] animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
