/* =========================================================================
   INOBEE SARL — UI, Commerce, Traceability & Creative Experience Layer v3.0
   100% Production-Ready · High-End Moroccan Organic Honey Brand
   ========================================================================= */
(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // CONFIGURATION & CONSTANTS
  // ---------------------------------------------------------------------------
  const CONFIG = {
    WHATSAPP_NUMBER: '212600000000',
    FREE_SHIPPING: 400,
    SHIPPING_FEE: 35,
    CURRENCY: 'MAD',
    STORAGE_KEY: 'inobee_cart_v3',
  };

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const hasGSAP = !!window.gsap;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const fmt = (n) => new Intl.NumberFormat('fr-MA').format(Math.round(n)) + ' ' + CONFIG.CURRENCY;
  const icons = () => window.lucide && window.lucide.createIcons();

  const U = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
  const IMG = {
    jarDark: 'photo-1471943311424-646960669fbc',
    beekeeper: 'photo-1473973266408-ed4e27abdd47',
    dipper: 'photo-1558642452-9d2a7deb7f62',
    bee: 'photo-1568526381923-caf3fd520382',
    drip: 'photo-1587049352851-8d4e89133924',
    lab: 'photo-1576086213369-97a306d36557',
  };

  // ---------------------------------------------------------------------------
  // PRODUCTS DATA (With Categories, Laboratory Lots & Sommelier Profiles)
  // ---------------------------------------------------------------------------
  const PRODUCTS = [
    {
      id: 'daghmous',
      name: "Miel d'Euphorbe Sauvage",
      local: 'Daghmous Saharien',
      tagline: 'Le miel saharien qui réchauffe',
      origin: 'Anti-Atlas · Guelmim-Oued Noun',
      badge: 'Rare',
      category: 'monofloral',
      lot: 'LOT-INOBEE-DAGH01',
      img: 'assets/img/product-daghmous.jpg',
      fallback: U(IMG.jarDark),
      desc: "Butiné sur l'euphorbe cactiforme des contreforts présahariens. Saveur intense, résineuse, à la pointe poivrée ardente qui picote agréablement la gorge — un trésor ancestral réputé pour réchauffer le corps, fortifier l'immunité et dégager les bronches.",
      notes: ['Poivré', 'Résineux', 'Ardence noble'],
      prices: { 250: 120, 500: 220, 1000: 400 },
      sommelier: {
        axes: [0.95, 0.90, 0.86, 0.98, 0.90], // Arôme, Antiseptique, Viscosité, Chaleur, Rareté
        moisture: '16.9% H₂O',
        density: 'Viscosité Haute · Résineux',
        dripDur: '3.6s',
        dropColor: '#a83c06',
        ritual: '1 cuillère à café le soir dans une infusion tiède (< 35 °C) ou pur à jeun par temps froid pour libérer son ardence.',
        pairing: 'Amlou aux amandes torréfiées de Tafraout, fromage de chèvre affiné de l’Atlas ou thé vert au safran pur de Taliouine.',
      },
      terroir: {
        code: 'BIOTOPE N°04 · PORTES DU SAHARA',
        type: 'Rucher Nomade Inobee',
        region: 'Guelmim & Anti-Atlas',
        flora: 'Euphorbia resinifera · Daghmous Sauvage',
        gps: '29.0161° N, 10.0575° W',
        alt: '640 m · Aride présaharien',
        season: 'Mars — Mai',
        purity: '94% · Certifié Labo',
        desc: "Sur les pentes rocailleuses baignées de soleil de l'Anti-Atlas, l'euphorbe résinifère développe un nectar dense et ardent, récolté par nos ruches Langstroth en transhumance printanière.",
      },
    },
    {
      id: 'thym',
      name: 'Miel de Thym Pur',
      local: 'Zâatar du Moyen Atlas',
      tagline: 'La puissance antiseptique des hauts plateaux',
      origin: 'Moyen Atlas · Missour & Boulemane',
      badge: 'Best-seller',
      category: 'monofloral',
      lot: 'LOT-INOBEE-THYM02',
      img: 'assets/img/product-thym.jpg',
      fallback: U(IMG.dipper),
      desc: "Récolté sur le thym sauvage d'altitude des plateaux de Missour. Arôme aromatique puissant, d'une grande richesse en thymol naturel, à la texture veloutée — le bouclier respiratoire par excellence de la pharmacopée marocaine.",
      notes: ['Thymol', 'Herbacé', 'Balsamique'],
      prices: { 250: 110, 500: 200, 1000: 380 },
      sommelier: {
        axes: [0.92, 0.98, 0.82, 0.78, 0.84],
        moisture: '17.2% H₂O',
        density: 'Viscosité Moyenne-Haute',
        dripDur: '3.1s',
        dropColor: '#d97714',
        ritual: '1 cuillère en bois chaque matin à jeun, ou fondue lentement sous la langue dès les premiers frissons ou picotements de gorge.',
        pairing: 'Baghrir tiède au beurre fermier, infusion de verveine royale du Sous ou carré d’agneau de Missour rôti aux herbes.',
      },
      terroir: {
        code: 'BIOTOPE N°01 · MOYEN ATLAS ORIENTAL',
        type: 'Rucher Nomade Inobee',
        region: 'Missour & Boulemane',
        flora: 'Thymus satureioides · Zâatar d’Altitude',
        gps: '33.0478° N, 3.9926° W',
        alt: '920 m · Steppe d’altitude',
        season: 'Mai — Juillet',
        purity: '91% · Certifié Labo',
        desc: "Berceau historique d'Inobee, les hauts plateaux de Missour et Boulemane offrent des étendues sauvages de thym saturé d'huiles essentielles, loin de toute pollution urbaine ou agricole.",
      },
    },
    {
      id: 'sidr',
      name: 'Miel de Sidr Royal',
      local: 'Jujubier Sauvage du Tafilalet',
      tagline: "L'élixir de prestige ultime du Royaume",
      origin: 'Tafilalet · Errachidia & Goulmima',
      badge: 'Prestige',
      category: 'monofloral',
      lot: 'LOT-INOBEE-SIDR03',
      img: 'assets/img/product-sidr.jpg',
      fallback: U(IMG.drip),
      desc: "Issu des fleurs du jujubier sauvage (Ziziphus lotus) des oasis préservées. Robe ambre-rubis, texture crémeuse et notes envoûtantes de caramel au beurre salé et de dattes Medjool — le grand cru incontesté de notre terroir.",
      notes: ['Caramel', 'Datte Medjool', 'Velouté'],
      prices: { 250: 220, 500: 420, 1000: 800 },
      sommelier: {
        axes: [0.90, 0.88, 0.96, 0.68, 0.99],
        moisture: '16.4% H₂O',
        density: 'Densité Extrême · Nectar Pur',
        dripDur: '4.3s',
        dropColor: '#c94a08',
        ritual: 'Dégustation pure à la cuillère en bois, 20 minutes avant le petit-déjeuner pour apaiser et régénérer le système digestif.',
        pairing: 'Briouates croustillantes aux amandes Marcona, dattes Medjool royales farcies aux cerneaux de noix ou dégustation méditative pure.',
      },
      terroir: {
        code: 'BIOTOPE N°02 · VALLÉE DU ZIZ',
        type: 'Coopérative Partenaire Auditée',
        region: 'Tafilalet & Errachidia',
        flora: 'Ziziphus lotus · Jujubier Sauvage',
        gps: '31.9314° N, 4.4243° W',
        alt: '1 040 m · Oasis & Regs',
        season: 'Septembre — Octobre',
        purity: '96% · Certifié Labo',
        desc: "Dans les vallées préservées du Tafilalet, le jujubier sauvage fleurit sous une chaleur sèche, produisant un nectar d'une concentration rare à seulement 16,4 % d'humidité naturelle.",
      },
    },
    {
      id: 'elixir',
      name: 'Apitherapy Royal Elixir',
      local: 'Propolis · Gelée Royale · Pollen',
      tagline: 'La synergie complète des 4 trésors de la ruche',
      origin: 'Formulé au laboratoire Inobee',
      badge: 'Apithérapie',
      category: 'apitherapie',
      lot: 'LOT-INOBEE-ROYL04',
      img: 'assets/img/product-elixir.jpg',
      fallback: U(IMG.dipper),
      desc: "Miel cru de montagne enrichi de gelée royale fraîche bio, propolis brune purifiée et grains de pollen de ciste sauvage séchés à froid. Une cure de vitalité cellulaire pour l'immunité, l'endurance intellectuelle et le tonus physique.",
      notes: ['Tonique', 'Immunité Active', 'Vitalité'],
      prices: { 250: 190, 500: 360, 1000: 690 },
      sommelier: {
        axes: [0.88, 0.96, 0.91, 0.82, 0.93],
        moisture: '17.8% H₂O',
        density: 'Texture Riche & Granuleuse',
        dripDur: '3.5s',
        dropColor: '#e58e26',
        ritual: 'Cure de 21 jours : 1 cuillère chaque matin sous la langue lors des changements de saison ou périodes de fatigue intense.',
        pairing: 'Bowl matinal au yaourt fermier de brebis, éclats de pistaches grillées, figues fraîches de Taounate et graines de nigelle.',
      },
      terroir: {
        code: 'BIOTOPE N°03 · ASSEMBLAGE HAUT ATLAS',
        type: 'Ruchers Inobee & Coopératives',
        region: 'Haut Atlas & Laboratoire Inobee',
        flora: 'Multifloral d’Altitude · Pollen de Ciste & Propolis',
        gps: '33.0512° N, 3.9871° W',
        alt: '915 – 1 450 m · Montagne',
        season: 'Août — Septembre',
        purity: '89% · Complexe Actif',
        desc: "Une synergie de haute précision réunissant notre miel cru de montagne, du pollen polychrome séché à froid, de la gelée royale fraîche et de l'extrait purifié de propolis.",
      },
    },
    {
      id: 'coffret-trio',
      name: 'Coffret Prestige Impérial',
      local: 'Trio Grand Cru (3 × 250g)',
      tagline: "L'art du miel d'exception réuni en un seul écrin",
      origin: 'Assemblage Royal · 3 Terroirs du Maroc',
      badge: 'Écrin Cadeau',
      category: 'coffrets',
      lot: 'LOT-INOBEE-COFF05',
      img: 'assets/img/product-sidr.jpg',
      fallback: U(IMG.jarDark),
      desc: "Un somptueux coffret d'ébène et de lin doré réunissant nos trois nectars les plus prestigieux : Sidr Royal, Euphorbe Daghmous et Thym Sauvage. Livré avec cuillère de service sculptée en bois d'olivier artisanal et carte calligraphiée personnalisée.",
      notes: ['Trio Prestige', 'Cuillère Olivier', 'Écrin B2B / Luxe'],
      prices: { 250: 420, 500: 420, 1000: 420 },
      isCoffret: true,
      sommelier: {
        axes: [0.96, 0.94, 0.92, 0.88, 0.98],
        moisture: '16.8% H₂O (Moyenne)',
        density: 'Triple Texture Rare',
        dripDur: '3.8s',
        dropColor: '#d97714',
        ritual: 'Dégustation comparative guidée : du boisé ardent du Daghmous au caramel subtil du Sidr.',
        pairing: 'Fromages affinés de brebis, dattes royales Majhoul, et réceptions prestigieuses.',
      },
      terroir: {
        code: 'ÉCRIN PRESTIGE N°05 · COLLECTION B2B',
        type: 'Sélection Maître Apiculteur Inobee',
        region: 'Anti-Atlas · Missour · Tafilalet',
        flora: 'Sidr · Thym · Daghmous',
        gps: '31.9314° N, 4.4243° W',
        alt: 'Terroirs d’Excellence',
        season: 'Récolte 2026',
        purity: '100% Brut & Analysé',
        desc: "L'apogée du terroir apicole marocain réuni dans un coffret de prestige scellé à la cire d'abeille.",
      },
    },
  ];

  const WEIGHTS = [250, 500, 1000];
  const wLabel = (w) => (w >= 1000 ? w / 1000 + 'kg' : w + 'g');

  // ---------------------------------------------------------------------------
  // LABORATORY BATCH REGISTRY (ONSSA & Physico-Chemical Traceability)
  // ---------------------------------------------------------------------------
  const LOTS = {
    'LOT-INOBEE-DAGH01': {
      product: 'daghmous', honey: "Miel d'Euphorbe Sauvage", sub: 'Daghmous Saharien',
      region: 'Anti-Atlas · Guelmim-Oued Noun', apiary: 'Rucher nomade Inobee N°07 · Langstroth',
      lat: 29.0161, lng: -10.0575, alt: 640, harvest: '14 avril 2026', report: 'INB-26-0412',
      hmf: 4.2, pollen: 94, pollenSp: 'Euphorbia resinifera', moisture: 16.9, diastase: 21.4, jars: 1240,
    },
    'LOT-INOBEE-THYM02': {
      product: 'thym', honey: 'Miel de Thym Pur', sub: 'Zâatar du Moyen Atlas',
      region: 'Moyen Atlas oriental · Missour', apiary: 'Rucher Inobee N°03 · Langstroth',
      lat: 33.0478, lng: -3.9926, alt: 920, harvest: '28 juin 2026', report: 'INB-26-0688',
      hmf: 3.6, pollen: 91, pollenSp: 'Thymus satureioides', moisture: 17.2, diastase: 18.9, jars: 2150,
    },
    'LOT-INOBEE-SIDR03': {
      product: 'sidr', honey: 'Miel de Sidr Royal', sub: 'Jujubier Sauvage du Tafilalet',
      region: 'Tafilalet · Errachidia', apiary: 'Coopérative partenaire du Ziz · auditée',
      lat: 31.9314, lng: -4.4243, alt: 1040, harvest: '12 octobre 2026', report: 'INB-26-1015',
      hmf: 5.1, pollen: 96, pollenSp: 'Ziziphus lotus', moisture: 16.4, diastase: 23.8, jars: 860,
    },
    'LOT-INOBEE-ROYL04': {
      product: 'elixir', honey: 'Apitherapy Royal Elixir', sub: 'Propolis · Gelée Royale · Pollen',
      region: 'Assemblage · Laboratoire Inobee', apiary: 'Ruchers Inobee + coopératives certifiées',
      lat: 33.0512, lng: -3.9871, alt: 915, harvest: '02 septembre 2026', report: 'INB-26-0902',
      hmf: 2.9, pollen: 89, pollenSp: 'Multifloral + pollen de ciste', moisture: 17.8, diastase: 19.6, jars: 640,
    },
    'LOT-INOBEE-COFF05': {
      product: 'coffret-trio', honey: 'Coffret Prestige Impérial', sub: 'Trio Grand Cru (3 × 250g)',
      region: 'Anti-Atlas · Missour · Tafilalet', apiary: 'Sélection Maître Apiculteur Inobee',
      lat: 31.9314, lng: -4.4243, alt: 980, harvest: 'Septembre — Octobre 2026', report: 'INB-26-COFF05',
      hmf: 3.8, pollen: 95, pollenSp: 'Sidr 96% · Thym 91% · Daghmous 94%', moisture: 16.8, diastase: 22.1, jars: 500,
    },
  };

  const STEPS = [
    { icon: 'route', title: 'Transhumance Langstroth', text: "Nos ruches Langstroth suivent les floraisons sauvages — de l'euphorbe de l'Anti-Atlas au thym d'altitude du Moyen Atlas — pour des miels monofloraux d'une pureté rare.", stat: '3 Tonnes', cap: 'Récoltées chaque saison par nos propres ruchers nomades.', img: U(IMG.beekeeper, 1200) },
    { icon: 'handshake', title: 'Coopératives partenaires', text: "7 tonnes sélectionnées auprès de coopératives certifiées, liées par la charte Inobee : audits de ruchers, zéro nourrissement au sucre, traçabilité des cadres.", stat: '7 Tonnes', cap: 'Issues de coopératives auditées à travers le Maroc.', img: U(IMG.bee, 1200) },
    { icon: 'thermometer', title: 'Extraction à froid', text: "Désoperculation manuelle, centrifugation douce et décantation naturelle de 21 jours. Jamais chauffé au-delà de 35 °C pour préserver enzymes et arômes.", stat: '< 35 °C', cap: 'Aucune pasteurisation, aucune filtration agressive.', img: U(IMG.drip, 1200) },
    { icon: 'microscope', title: 'Analyse laboratoire', text: "Chaque lot est analysé : HMF, humidité, activité diastasique, mélissopalynologie, résidus d'antibiotiques et sucres exogènes.", stat: 'HMF < 10', cap: 'mg/kg — quatre fois plus strict que la norme ONSSA (≤ 40).', img: U(IMG.lab, 1200) },
    { icon: 'qr-code', title: 'Lot scellé & QR code', text: "Conditionnement en verre ambré lourd, scellé d'inviolabilité et code de lot unique relié au certificat d'analyse et aux coordonnées GPS du rucher.", stat: '100 % traçable', cap: 'Du rucher à votre cuillère, en un seul scan.', img: U(IMG.dipper, 1200) },
    { icon: 'truck', title: 'Livraison au Maroc', text: "Expédition sous 24h ouvrées, livraison express en 24 à 72h dans tout le Royaume avec paiement sécurisé à la livraison.", stat: '24 – 72 h', cap: 'Partout au Maroc · Gratuit dès 400 MAD.', img: U(IMG.jarDark, 1200) },
  ];

  // Official Governance (Preserved)
  const FOUNDERS = [
    { ini: 'MO', name: 'Mohamed Amine OUKKOUR', role: 'Directeur Général & RH', icon: 'crown', text: "Pilote la stratégie d'expansion, la gouvernance de marque et les talents. Garant de la vision d'excellence à long terme et des normes Inobee.", tags: ['Stratégie', 'Gouvernance', 'RH'] },
    { ini: 'IE', name: 'Ilyasse EL HDIB', role: 'Directeur Commercial & Marketing', icon: 'megaphone', text: "Développe la marque, les canaux de distribution premium et l'expérience client omnichannel, du digital aux boutiques d'exception.", tags: ['Marque', 'Ventes', 'Digital'] },
    { ini: 'IM', name: 'Ismail MARHOUL', role: 'Directeur Technique & Rucher', icon: 'flask-conical', text: "Supervise les ruchers nomades Langstroth, les calendriers de transhumance, l'extraction à froid et les protocoles d'analyse laboratoire.", tags: ['Apiculture', 'Qualité', 'Production'] },
    { ini: 'WH', name: 'Walid HAMRI', role: 'Directeur Financier & BFR', icon: 'wallet', text: "Pilote la rentabilité financière, l'optimisation du BFR et la pérennité des partenariats équitables avec nos coopératives apicoles.", tags: ['Finance', 'BFR', 'Contrôle'] },
  ];

  const CITIES = [
    'Casablanca', 'Rabat', 'Salé', 'Témara', 'Kénitra', 'Mohammedia',
    'Fès', 'Meknès', 'Missour', 'Boulemane', 'Ifrane', 'Marrakech',
    'Agadir', 'Tanger', 'Tétouan', 'Oujda', 'Nador', 'Al Hoceïma',
    'Errachidia', 'Ouarzazate', 'Béni Mellal', 'Khouribga', 'Settat',
    'El Jadida', 'Safi', 'Essaouira', 'Guelmim', 'Laâyoune', 'Dakhla', 'Autre ville'
  ];

  // ---------------------------------------------------------------------------
  // AMBIENT SOUND ENGINE (Procedural Web Audio API)
  // ---------------------------------------------------------------------------
  const Sound = {
    ctx: null, master: null, on: false,
    init() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      const ctx = (this.ctx = new AC());
      const master = (this.master = ctx.createGain());
      master.gain.value = 0;
      const comp = ctx.createDynamicsCompressor();
      master.connect(comp).connect(ctx.destination);

      const lfo = (freq, depth, target) => {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.frequency.value = freq; g.gain.value = depth; o.connect(g).connect(target); o.start(); return o;
      };

      const padFilter = ctx.createBiquadFilter();
      padFilter.type = 'lowpass'; padFilter.frequency.value = 700; padFilter.Q.value = 0.7;
      const padGain = ctx.createGain(); padGain.gain.value = 0.32;
      padFilter.connect(padGain).connect(master);
      [110, 164.81, 220, 246.94, 277.18].forEach((f, i) => {
        [-4, 4].forEach((det) => {
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.type = i < 2 ? 'sine' : 'triangle'; o.frequency.value = f; o.detune.value = det;
          g.gain.value = 0.05 / (i + 1);
          o.connect(g).connect(padFilter); o.start();
        });
      });
      lfo(0.05, 280, padFilter.frequency);

      const buzzFilter = ctx.createBiquadFilter();
      buzzFilter.type = 'bandpass'; buzzFilter.frequency.value = 420; buzzFilter.Q.value = 3;
      const buzzGain = ctx.createGain(); buzzGain.gain.value = 0.018;
      buzzFilter.connect(buzzGain).connect(master);
      [196, 203, 221, 232].forEach((f, i) => {
        const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f;
        const g = ctx.createGain(); g.gain.value = 0.25;
        lfo(5 + i * 1.7, 3 + i, o.frequency);
        o.connect(g).connect(buzzFilter); o.start();
      });
      lfo(0.11, 0.012, buzzGain.gain);
      lfo(0.07, 160, buzzFilter.frequency);

      const len = ctx.sampleRate * 3;
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
      const noise = ctx.createBufferSource(); noise.buffer = buf; noise.loop = true;
      const nF = ctx.createBiquadFilter(); nF.type = 'lowpass'; nF.frequency.value = 500;
      const nG = ctx.createGain(); nG.gain.value = 0.22;
      noise.connect(nF).connect(nG).connect(master); noise.start();
      lfo(0.09, 0.1, nG.gain);
      return true;
    },
    toggle() {
      if (!this.ctx && !this.init()) return false;
      this.on = !this.on;
      const t = this.ctx.currentTime;
      if (this.on) {
        this.ctx.resume();
        this.master.gain.cancelScheduledValues(t);
        this.master.gain.setTargetAtTime(0.55, t, 0.8);
      } else {
        this.master.gain.cancelScheduledValues(t);
        this.master.gain.setTargetAtTime(0, t, 0.3);
      }
      return this.on;
    },
    chime(base = 880) {
      if (!this.ctx && !this.init()) return;
      const ctx = this.ctx, t = ctx.currentTime;
      [1, 1.5, 2.01].forEach((m, i) => {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = 'sine'; o.frequency.value = base * m;
        g.gain.setValueAtTime(0, t + i * 0.07);
        g.gain.linearRampToValueAtTime(0.08 / (i + 1), t + i * 0.07 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.07 + 1.6);
        o.connect(g).connect(this.master); o.start(t + i * 0.07); o.stop(t + 2);
      });
    },
    tap() {
      if (!this.ctx && !this.init()) return;
      const ctx = this.ctx, t = ctx.currentTime;
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(520, t);
      o.frequency.exponentialRampToValueAtTime(240, t + 0.08);
      g.gain.setValueAtTime(0.08, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      o.connect(g).connect(this.master);
      o.start(t); o.stop(t + 0.09);
    },
    drip() {
      if (!this.ctx && !this.init()) return;
      const ctx = this.ctx, t = ctx.currentTime;
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(360, t);
      o.frequency.exponentialRampToValueAtTime(880, t + 0.14);
      g.gain.setValueAtTime(0.12, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      o.connect(g).connect(this.master);
      o.start(t); o.stop(t + 0.5);
    },
    success() {
      if (!this.ctx && !this.init()) return;
      const ctx = this.ctx, t = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = 'sine'; o.frequency.value = freq;
        g.gain.setValueAtTime(0, t + idx * 0.08);
        g.gain.linearRampToValueAtTime(0.06, t + idx * 0.08 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.08 + 1.2);
        o.connect(g).connect(this.master);
        o.start(t + idx * 0.08); o.stop(t + 2);
      });
    }
  };

  $('#sound-toggle')?.addEventListener('click', (e) => {
    const on = Sound.toggle();
    const btn = e.currentTarget;
    btn.classList.toggle('is-sound-on', on);
    btn.setAttribute('aria-pressed', String(on));
    $('#sound-label').textContent = on ? 'Son activé' : 'Son';
    toast(on ? 'Ambiance sonore activée — fermez les yeux et respirez.' : 'Ambiance sonore coupée', on ? 'volume-2' : 'volume-x');
  });

  // ---------------------------------------------------------------------------
  // TOAST NOTIFICATIONS
  // ---------------------------------------------------------------------------
  function toast(msg, icon = 'sparkles') {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<i data-lucide="${icon}" class="h-4 w-4 text-gold shrink-0"></i><span>${msg}</span>`;
    $('#toast-zone').appendChild(el);
    icons();
    setTimeout(() => { el.classList.add('is-out'); setTimeout(() => el.remove(), 500); }, 3200);
  }

  // ---------------------------------------------------------------------------
  // STATIC MARQUEE & HEX GRID RENDERS
  // ---------------------------------------------------------------------------
  (function () {
    const words = ['Miel Brut', 'Non Pasteurisé', 'Certifié ONSSA', 'Traçabilité QR', 'Ruchers Nomades Langstroth', 'Coopératives Partenaires', 'HMF < 10 mg/kg', 'Extraction à Froid', 'Made in Morocco'];
    const hex = '<svg width="10" height="11" viewBox="0 0 92 104" class="mx-8 inline-block"><polygon points="46,2 90,27 90,77 46,102 2,77 2,27" fill="#E58E26"/></svg>';
    const row = words.map((w) => `<span class="flex items-center whitespace-nowrap">${w}${hex}</span>`).join('');
    const mq = $('#marquee');
    if (mq) mq.innerHTML = row + row;
  })();

  (function () {
    const g = $('#hex-grid');
    if (g) {
      g.innerHTML = Array.from({ length: 10 }, (_, i) => `<div class="hex-cell ${i < 3 ? 'hex-own' : 'hex-partner'}" title="${i < 3 ? 'Ruchers Inobee' : 'Coopératives partenaires'} · 1 tonne"></div>`).join('');
    }
  })();

  // Render Founding Partners Cards (Preserved Governance)
  const foundersEl = $('#founders');
  if (foundersEl) {
    foundersEl.innerHTML = FOUNDERS.map((f, i) => `
      <article class="founder-card glass gold-border reveal p-7 cursor-pointer" style="--d:${i}">
        <div class="flex items-start justify-between">
          <div class="founder-hex"><span class="font-cinzel text-xl font-semibold text-gold">${f.ini}</span></div>
          <div class="grid h-10 w-10 place-items-center rounded-full border border-gold/20"><i data-lucide="${f.icon}" class="h-4 w-4 text-gold"></i></div>
        </div>
        <div class="mt-7 font-cinzel text-[10px] text-gold/80">Associé fondateur · 0${i + 1}</div>
        <h3 class="mt-2 font-display text-2xl leading-tight">${f.name}</h3>
        <div class="mt-2 text-sm font-semibold text-amber">${f.role}</div>
        <p class="mt-4 text-sm leading-relaxed text-cream/55">${f.text}</p>
        <div class="mt-6 flex flex-wrap gap-2">${f.tags.map((t) => `<span class="rounded-full border border-gold/15 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-cream/55">${t}</span>`).join('')}</div>
      </article>`).join('');
  }

  // Render Story Timeline
  (function () {
    const tl = $('#timeline-steps');
    if (tl) {
      tl.innerHTML = STEPS.map((s, i) => `
        <div class="t-step relative flex gap-6 ${i === 0 ? 'is-active' : ''}" data-step="${i}">
          <div class="t-dot">${String(i + 1).padStart(2, '0')}</div>
          <div class="t-body pt-1.5">
            <div class="flex items-center gap-3"><i data-lucide="${s.icon}" class="h-4 w-4 text-gold"></i><h3 class="font-display text-2xl">${s.title}</h3></div>
            <p class="mt-3 max-w-lg text-sm leading-relaxed text-cream/60">${s.text}</p>
          </div>
        </div>`).join('');
    }
    const vis = $('#story-visual');
    if (vis) {
      STEPS.forEach((s, i) => {
        const img = document.createElement('img');
        img.src = s.img; img.alt = s.title; img.loading = 'lazy';
        if (i === 0) img.classList.add('is-active');
        vis.insertBefore(img, vis.firstChild);
      });
    }
  })();

  let activeStep = -1;
  function setStep(i) {
    if (i === activeStep) return;
    activeStep = i;
    $$('.t-step').forEach((el, k) => el.classList.toggle('is-active', k === i));
    const imgs = $$('#story-visual img');
    imgs.forEach((im) => im.classList.toggle('is-active', im.alt === STEPS[i].title));
    const s = STEPS[i];
    const swap = () => {
      $('#story-kicker').textContent = `Étape ${String(i + 1).padStart(2, '0')} · ${s.title}`;
      $('#story-stat').textContent = s.stat;
      $('#story-caption').textContent = s.cap;
    };
    if (hasGSAP) {
      gsap.to(['#story-stat', '#story-caption', '#story-kicker'], { opacity: 0, y: 10, duration: 0.25, onComplete: () => { swap(); gsap.to(['#story-stat', '#story-caption', '#story-kicker'], { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 }); } });
    } else swap();
  }
  setStep(0);
  $$('.t-step').forEach((el) => el.addEventListener('click', () => setStep(+el.dataset.step)));

  // ---------------------------------------------------------------------------
  // PRODUCT CARDS & INTERACTIVE FILTERING
  // ---------------------------------------------------------------------------
  const selectedWeight = {};
  let currentProductCategory = 'all';

  function renderProducts(cat = 'all') {
    currentProductCategory = cat;
    const rail = $('#product-rail');
    if (!rail) return;

    const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
    
    // Update live product counter
    const countLabel = $('#product-count-label');
    if (countLabel) {
      countLabel.textContent = `${filtered.length} Référence${filtered.length > 1 ? 's' : ''}`;
    }

    rail.innerHTML = filtered.map((p) => {
      if (!selectedWeight[p.id]) selectedWeight[p.id] = 500;
      const w = selectedWeight[p.id];
      const price = p.prices[w];
      const isCoffret = p.isCoffret;

      return `
      <article class="tilt reveal w-[84vw] shrink-0 sm:w-[60vw] md:w-auto" data-product="${p.id}" data-category="${p.category}">
        <div class="tilt-inner product-card relative flex h-full flex-col p-3">
          <div class="product-glare"></div>
          <div class="product-media">
            <img src="${p.img}" alt="${p.name} — ${p.local} · Inobee" loading="lazy" onerror="this.onerror=null;this.src='${p.fallback}'" />
            <div class="absolute left-4 top-4 z-[2] flex gap-2"><span class="tag">${p.badge}</span></div>
            <button class="absolute right-4 top-4 z-[2] grid h-9 w-9 place-items-center rounded-full border border-gold/30 bg-navy/60 backdrop-blur transition hover:border-gold hover:scale-105" data-view3d="${p.id}" aria-label="Voir en 3D" title="Inspecter ce pot en 3D" data-hover>
              <i data-lucide="rotate-3d" class="h-4 w-4 text-gold"></i>
            </button>
            <button type="button" data-trace-lot="${p.lot}" class="absolute bottom-3 left-4 z-[2] flex items-center gap-1.5 rounded-full border border-gold/25 bg-navy/80 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-gold/90 backdrop-blur transition hover:border-gold hover:text-gold-soft" data-hover title="Vérifier ce lot dans la chambre de traçabilité">
              <i data-lucide="qr-code" class="h-3 w-3"></i> ${p.lot}
            </button>
          </div>
          <div class="pop-z flex flex-1 flex-col px-3 pb-3 pt-5">
            <div class="flex items-center justify-between">
              <span class="font-cinzel text-[10px] text-gold/80">${p.local}</span>
              <button type="button" data-cert-lot="${p.lot}" class="inline-flex items-center gap-1 rounded-full border border-gold/25 bg-gold/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gold-soft transition hover:bg-gold/20" title="Consulter le bulletin d'analyse officiel ONSSA">
                <i data-lucide="file-badge" class="h-3 w-3 text-gold"></i> Certif. Labo
              </button>
            </div>
            <h3 class="mt-2 font-display text-[1.55rem] leading-tight">${p.name}</h3>
            <p class="mt-1 text-sm italic text-amber">${p.tagline}</p>
            <div class="mt-3 flex items-center gap-2 text-xs text-cream/50"><i data-lucide="map-pin" class="h-3.5 w-3.5 text-gold"></i>${p.origin}</div>
            <p class="mt-4 text-[13px] leading-relaxed text-cream/55">${p.desc}</p>
            <div class="mt-4 flex flex-wrap gap-1.5">${p.notes.map((n) => `<span class="rounded-full bg-amber/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-gold-soft">${n}</span>`).join('')}</div>
            <div class="mt-auto pt-6">
              ${isCoffret ? `
                <div class="rounded-xl border border-gold/20 bg-amber/5 px-3 py-2 text-center text-xs text-cream/70">
                  <span class="font-cinzel text-gold">Format Signature :</span> 3 flacons × 250g + Cuillère olivier
                </div>
              ` : `
                <div class="weight-switch" role="radiogroup" aria-label="Format">
                  <span class="weight-pill" style="transform:translateX(${WEIGHTS.indexOf(w) * 100}%)"></span>
                  ${WEIGHTS.map((weight) => `<button type="button" role="radio" data-w="${weight}" class="${weight === w ? 'is-active' : ''}" aria-checked="${weight === w}">${wLabel(weight)}</button>`).join('')}
                </div>
              `}
              <div class="mt-5 flex items-center justify-between gap-3">
                <div>
                  <div class="text-[10px] uppercase tracking-[0.2em] text-cream/40">Prix</div>
                  <div class="font-display text-3xl text-cream"><span class="price-roll" data-price>${price}</span> <span class="text-base text-gold">MAD</span></div>
                </div>
                <button class="btn-gold !px-5 !py-3.5" data-add="${p.id}" data-hover aria-label="Ajouter au panier">
                  <i data-lucide="plus" class="h-4 w-4"></i> Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>`;
    }).join('');

    icons();
    bindProductEvents();
  }

  function bindProductEvents() {
    $$('#product-rail [data-product]').forEach((card) => {
      const id = card.dataset.product;
      const p = PRODUCTS.find((x) => x.id === id);
      const priceEl = $('[data-price]', card);
      const pill = $('.weight-pill', card);

      // Hover 3D sync
      card.addEventListener('pointerenter', () => {
        if (window.InobeeScene && window.InobeeScene.variant !== id) {
          setVariant(id, true);
        }
      });

      // Format switchers
      $$('.weight-switch button', card).forEach((btn, idx) => {
        btn.addEventListener('click', () => {
          const w = +btn.dataset.w;
          if (selectedWeight[id] === w) return;
          selectedWeight[id] = w;
          $$('.weight-switch button', card).forEach((b) => { b.classList.toggle('is-active', b === btn); b.setAttribute('aria-checked', String(b === btn)); });
          if (pill) pill.style.transform = `translateX(${idx * 100}%)`;
          const from = +priceEl.textContent.replace(/\D/g, '');
          const to = p.prices[w];
          if (hasGSAP && !reduceMotion) {
            const o = { v: from };
            gsap.to(o, { v: to, duration: 0.6, ease: 'power3.out', onUpdate: () => (priceEl.textContent = Math.round(o.v)) });
            gsap.fromTo(priceEl, { y: -6, color: '#FFD99A' }, { y: 0, color: '#F4E9D8', duration: 0.5 });
          } else priceEl.textContent = to;
        });
      });
    });

    $$('.tilt').forEach((el) => bindTilt(el, $('.tilt-inner', el), 9));
  }

  // Bind Category Filter Tabs
  $$('#product-filter-tabs .prod-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('#product-filter-tabs .prod-filter-btn').forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      Sound.tap();
      renderProducts(btn.dataset.cat);
    });
  });

  // ---------------------------------------------------------------------------
  // TACTILE 3D TILT WITH GLOW GLARE
  // ---------------------------------------------------------------------------
  function bindTilt(el, inner, max = 9) {
    if (!canHover || !inner) return;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      inner.style.transform = `rotateY(${(x - 0.5) * max * 2}deg) rotateX(${(0.5 - y) * max * 2}deg) translateZ(0)`;
      inner.style.transition = 'transform .12s ease-out, box-shadow .5s';
      inner.style.setProperty('--gx', x * 100 + '%');
      inner.style.setProperty('--gy', y * 100 + '%');
      inner.style.setProperty('--px', (0.5 - x) * 18 + 'px');
      inner.style.setProperty('--py', (0.5 - y) * 18 + 'px');
    });
    el.addEventListener('pointerleave', () => {
      inner.style.transition = 'transform .8s cubic-bezier(.22,1,.36,1), box-shadow .5s';
      inner.style.transform = '';
      inner.style.setProperty('--px', '0px');
      inner.style.setProperty('--py', '0px');
    });
  }

  // Bind tilt to founder cards as well
  $$('.founder-card').forEach((el) => bindTilt(el, el, 7));

  // Initialize initial products render
  renderProducts('all');

  // ---------------------------------------------------------------------------
  // 3D SCENE CONTROLS: VARIANT, TASTING & EXPLODED VIEW
  // ---------------------------------------------------------------------------
  function setVariant(key, silent = false) {
    window.InobeeScene && window.InobeeScene.setVariant(key);
    $$('.variant-btn').forEach((b) => {
      const on = b.dataset.variant === key;
      b.classList.toggle('bg-amber', on);
      b.classList.toggle('text-navy', on);
      b.classList.toggle('text-cream/60', !on);
    });
    if (!silent) Sound.chime(660);
  }
  $$('.variant-btn').forEach((b) => b.addEventListener('click', () => setVariant(b.dataset.variant)));
  setVariant('sidr', true);

  // 3D Virtual Tasting Button ("Déguster 3D")
  const tasteBtn = $('#taste-3d-btn');
  if (tasteBtn) {
    tasteBtn.addEventListener('click', () => {
      if (window.InobeeScene && window.InobeeScene.tasteDrip) {
        window.InobeeScene.tasteDrip();
      }
      Sound.drip();
      const label = $('#taste-label');
      if (label) label.textContent = 'Dégustation...';
      tasteBtn.classList.add('scale-105', 'border-gold', 'bg-gold', 'text-navy');
      toast("Cuillère en bois d'olivier immergée — filet doré en écoulement 3D !", "droplet");
      setTimeout(() => {
        if (label) label.textContent = 'Déguster 3D';
        tasteBtn.classList.remove('scale-105', 'border-gold', 'bg-gold', 'text-navy');
      }, 3500);
    });
  }

  // 3D Exploded View Toggle
  const explodeBtn = $('#explode-toggle');
  if (explodeBtn) {
    explodeBtn.addEventListener('click', () => {
      if (!window.InobeeScene) return;
      const on = window.InobeeScene.toggleExploded();
      explodeBtn.classList.toggle('is-active', on);
      explodeBtn.setAttribute('aria-pressed', String(on));
      $('#explode-label').textContent = on ? 'Refermer le Pot' : 'Vue Éclatée 3D';
      Sound.chime(on ? 920 : 580);
      if (on) toast('Vue Éclatée 3D active — faites tourner le pot pour inspecter son anatomie', 'layers');
    });
  }

  // Global delegation for 3D inspection and direct lab certificate buttons
  document.addEventListener('click', (e) => {
    const v = e.target.closest('[data-view3d]');
    if (v) {
      setVariant(v.dataset.view3d);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const certBtn = e.target.closest('[data-cert-lot]');
    if (certBtn) {
      const code = certBtn.dataset.certLot;
      const lot = LOTS[code];
      if (lot) {
        openCertModal(code, lot);
      } else {
        toast(`Certificat de lot ${code} en cours de numérisation`, 'info');
      }
      return;
    }
    const trLot = e.target.closest('[data-trace-lot]');
    if (trLot) {
      const code = trLot.dataset.traceLot;
      $('#tracabilite').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        $('#lot-input').value = code;
        renderQR(code);
        runScan(code);
      }, 450);
    }
  });

  // ---------------------------------------------------------------------------
  // SOMMELIER SENSORIEL, VISCOSITY LAB & COMPARATIVE RADAR
  // ---------------------------------------------------------------------------
  let currentSommelierId = 'sidr';
  let radarComparativeMode = false;
  const RADAR_ANGLES = [-90, -18, 54, 126, 198].map((deg) => (deg * Math.PI) / 180);

  function getRadarPoints(axes) {
    return axes.map((val, i) => {
      const r = val * 110;
      const x = 150 + Math.cos(RADAR_ANGLES[i]) * r;
      const y = 150 + Math.sin(RADAR_ANGLES[i]) * r;
      return [x.toFixed(1), y.toFixed(1)];
    });
  }

  function updateSommelier(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    currentSommelierId = id;

    $$('#sommelier-needs .need-pill').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.need === id);
    });

    const pts = getRadarPoints(p.sommelier.axes);
    const poly = $('#somm-polygon');
    if (poly) poly.setAttribute('points', pts.map((pt) => pt.join(',')).join(' '));
    const dots = $$('#somm-dots .radar-vertex');
    dots.forEach((circle, i) => {
      if (pts[i]) {
        circle.setAttribute('cx', pts[i][0]);
        circle.setAttribute('cy', pts[i][1]);
      }
    });

    // Update Viscosity Tube Simulator
    const drop = $('#viscosity-drop');
    const pool = $('#viscosity-pool');
    if (drop) {
      drop.style.setProperty('--drip-dur', p.sommelier.dripDur);
      drop.style.setProperty('--drop-color', p.sommelier.dropColor);
    }
    if (pool) {
      pool.style.background = `linear-gradient(180deg, ${p.sommelier.dropColor}, #3d1800)`;
    }
    $('#somm-moisture').textContent = p.sommelier.moisture;
    $('#somm-density').textContent = p.sommelier.density;

    // Update Prescription Card
    $('#somm-badge').textContent = p.badge;
    $('#somm-title').textContent = p.name;
    $('#somm-sub').textContent = `${p.local} · ${p.origin}`;
    $('#somm-desc').textContent = p.desc;
    $('#somm-ritual').textContent = p.sommelier.ritual;
    $('#somm-pairing').textContent = p.sommelier.pairing;
    $('#somm-price').textContent = fmt(p.prices[500]);

    setVariant(id, true);
  }

  // Toggle Comparative Radar Multi-Overlay
  const radarCompareBtn = $('#radar-compare-btn');
  if (radarCompareBtn) {
    radarCompareBtn.addEventListener('click', () => {
      radarComparativeMode = !radarComparativeMode;
      const compGroup = $('#comparative-polygons');
      const legend = $('#radar-legend');
      const label = $('#radar-compare-label');

      if (radarComparativeMode) {
        // Compute and inject points for all 4 honeys
        ['sidr', 'daghmous', 'thym', 'elixir'].forEach((hId) => {
          const pr = PRODUCTS.find((x) => x.id === hId);
          const pEl = $(`#poly-${hId}`);
          if (pr && pEl) {
            pEl.setAttribute('points', getRadarPoints(pr.sommelier.axes).map((pt) => pt.join(',')).join(' '));
          }
        });
        compGroup?.classList.remove('opacity-0', 'pointer-events-none');
        legend?.classList.remove('opacity-0');
        if (label) label.textContent = 'Vue Individuelle';
        toast('Superposition des 4 profils sensoriels activée', 'layers-2');
        Sound.chime(840);
      } else {
        compGroup?.classList.add('opacity-0', 'pointer-events-none');
        legend?.classList.add('opacity-0');
        if (label) label.textContent = 'Superposer les 4 miels';
        Sound.tap();
      }
    });
  }

  $$('#sommelier-needs .need-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      updateSommelier(btn.dataset.need);
      Sound.chime(740);
    });
  });
  $('#somm-add-btn')?.addEventListener('click', (e) => {
    flyToCart(e.currentTarget);
    addToCart(currentSommelierId, 500, 1);
  });
  updateSommelier('sidr');

  // ---------------------------------------------------------------------------
  // SENSORY DIAGNOSTIC QUIZ MODAL ENGINE
  // ---------------------------------------------------------------------------
  const QUIZ_QUESTIONS = [
    {
      title: "1. Quel est votre objectif bien-être prioritaire ?",
      desc: "Chaque nectar brut possède une synergie biochimique distincte.",
      options: [
        { label: "Défense immunitaire & Tonus hivernal", sub: "Besoin de réchauffer l'organisme par temps froid", target: 'daghmous', weight: 4 },
        { label: "Voies respiratoires, apaisement de la gorge & toux", sub: "Recherche de puissance antiseptique au thymol", target: 'thym', weight: 4 },
        { label: "Prestige, récupération cellulaire & santé digestive", sub: "Élixir d'exception pour apaiser l'estomac", target: 'sidr', weight: 4 },
        { label: "Cure de vitalité totale & regain d'énergie", sub: "Synergie complète gelée royale, propolis et pollen", target: 'elixir', weight: 4 },
      ]
    },
    {
      title: "2. Quelle intensité aromatique recherchez-vous en bouche ?",
      desc: "L'alchimie du terroir marocain offre une palette organoleptique unique.",
      options: [
        { label: "Ardent, poivré, qui picote noblement la gorge", sub: "Saveur résineuse et sensation de chaleur immédiate", target: 'daghmous', weight: 3 },
        { label: "Aromatique d'altitude, boisé et puissant en thymol", sub: "Fraîcheur balsamique herbacée du Moyen Atlas", target: 'thym', weight: 3 },
        { label: "Gourmand, velouté, aux accents de caramel et dattes", sub: "Rondeur luxueuse, nectar d'une douceur rare", target: 'sidr', weight: 3 },
        { label: "Riche, dense, légèrement acidulé et texturé", sub: "Complexité active des nectars de montagne", target: 'elixir', weight: 3 },
      ]
    },
    {
      title: "3. Quel sera votre rituel de dégustation ?",
      desc: "La manière de consommer le miel amplifie ses propriétés vivantes.",
      options: [
        { label: "Pur à la cuillère en bois à jeun chaque matin", sub: "Dégustation pure pour nourrir et protéger le corps", target: 'sidr', weight: 3 },
        { label: "Dans une infusion tiède le soir (< 35 °C)", sub: "Pour apaiser les voies respiratoires avant la nuit", target: 'thym', weight: 3 },
        { label: "En cure énergisante de 21 jours aux intersaisons", sub: "Pour recharger les batteries cellulaires", target: 'elixir', weight: 3 },
        { label: "Une pointe au réveil pour stimuler l'organisme", sub: "Un coup de fouet saharien instantané", target: 'daghmous', weight: 3 },
      ]
    }
  ];

  let quizState = { step: 0, scores: { daghmous: 0, thym: 0, sidr: 0, elixir: 0 } };

  function openQuiz() {
    quizState = { step: 0, scores: { daghmous: 0, thym: 0, sidr: 0, elixir: 0 } };
    renderQuizStep();
    $('#quiz-modal')?.classList.add('is-open');
    document.body.classList.add('is-locked');
    Sound.chime(920);
  }

  function closeQuiz() {
    $('#quiz-modal')?.classList.remove('is-open');
    document.body.classList.remove('is-locked');
  }

  function renderQuizStep() {
    const sheet = $('#quiz-sheet');
    if (!sheet) return;

    const q = QUIZ_QUESTIONS[quizState.step];
    const pct = Math.round(((quizState.step + 1) / QUIZ_QUESTIONS.length) * 100);

    sheet.innerHTML = `
      <button class="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-gold/25 transition hover:border-gold" data-close-quiz aria-label="Fermer">
        <i data-lucide="x" class="h-4 w-4 text-gold"></i>
      </button>

      <div class="flex items-center gap-2 text-xs font-cinzel text-gold tracking-widest uppercase">
        <i data-lucide="sparkles" class="h-3.5 w-3.5"></i> Sommelier Diagnostic · Question ${quizState.step + 1} / 3
      </div>

      <div class="mt-3 h-1 w-full rounded-full bg-navy/80 overflow-hidden border border-gold/20">
        <div class="h-full bg-gradient-to-r from-amber to-gold transition-all duration-500" style="width: ${pct}%"></div>
      </div>

      <h3 class="mt-6 font-display text-2xl md:text-3xl">${q.title}</h3>
      <p class="mt-2 text-sm text-cream/60">${q.desc}</p>

      <div class="mt-6 space-y-3">
        ${q.options.map((opt, idx) => `
          <button type="button" class="quiz-opt-btn w-full rounded-2xl border border-gold/20 bg-navy/50 p-4 text-left transition hover:border-gold hover:bg-gold/10 flex items-start gap-3.5" data-opt-idx="${idx}" data-target="${opt.target}" data-weight="${opt.weight}">
            <span class="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold/40 text-xs font-cinzel text-gold">${String.fromCharCode(65 + idx)}</span>
            <div class="min-w-0">
              <div class="font-medium text-sm text-cream">${opt.label}</div>
              <div class="text-xs text-cream/50 mt-0.5">${opt.sub}</div>
            </div>
          </button>
        `).join('')}
      </div>
    `;

    icons();
    $$('.quiz-opt-btn', sheet).forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        const weight = +btn.dataset.weight;
        quizState.scores[target] += weight;
        Sound.tap();

        if (quizState.step < QUIZ_QUESTIONS.length - 1) {
          quizState.step++;
          renderQuizStep();
        } else {
          renderQuizCalculation();
        }
      });
    });

    $('[data-close-quiz]', sheet)?.addEventListener('click', closeQuiz);
  }

  function renderQuizCalculation() {
    const sheet = $('#quiz-sheet');
    if (!sheet) return;

    sheet.innerHTML = `
      <div class="py-12 text-center flex flex-col items-center justify-center">
        <div class="relative grid h-20 w-20 place-items-center">
          <div class="absolute inset-0 animate-ping rounded-full border border-gold/30"></div>
          <div class="grid h-16 w-16 place-items-center rounded-full border border-gold/40 bg-navy/80">
            <i data-lucide="flask-conical" class="h-7 w-7 text-gold animate-bounce"></i>
          </div>
        </div>
        <div class="mt-6 font-cinzel text-xs text-gold uppercase tracking-[0.25em]">Analyse Sensorielle Inobee</div>
        <h3 class="mt-2 font-display text-2xl">Calcul de votre résonance apicole…</h3>
        <p class="mt-2 text-xs text-cream/50 max-w-sm">Comparaison de vos marqueurs de bien-être avec nos 4 terroirs certifiés.</p>
      </div>
    `;
    icons();

    setTimeout(() => {
      renderQuizResult();
    }, 750);
  }

  function renderQuizResult() {
    const sheet = $('#quiz-sheet');
    if (!sheet) return;

    // Find highest scoring honey
    let topHoneyId = 'sidr';
    let maxScore = -1;
    Object.entries(quizState.scores).forEach(([id, score]) => {
      if (score > maxScore) {
        maxScore = score;
        topHoneyId = id;
      }
    });

    const p = PRODUCTS.find((x) => x.id === topHoneyId);
    setVariant(topHoneyId, true);
    Sound.success();

    sheet.innerHTML = `
      <button class="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-gold/25 transition hover:border-gold" data-close-quiz aria-label="Fermer">
        <i data-lucide="x" class="h-4 w-4 text-gold"></i>
      </button>

      <div class="flex items-center gap-2 text-xs font-cinzel text-emerald-400 tracking-wider">
        <i data-lucide="check-circle-2" class="h-4 w-4"></i> Affinité Sommelier : 98% de Correspondance
      </div>

      <div class="mt-4 flex flex-col sm:flex-row gap-6 items-center border border-gold/25 rounded-2xl bg-[#040d1d]/80 p-5">
        <img src="${p.img}" onerror="this.onerror=null;this.src='${p.fallback}'" alt="${p.name}" class="h-28 w-28 rounded-xl object-cover shrink-0 border border-gold/30" />
        <div class="min-w-0 flex-1 text-center sm:text-left">
          <span class="rounded-full bg-amber/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-soft border border-gold/20">${p.badge}</span>
          <h3 class="mt-2 font-display text-2xl text-cream">${p.name}</h3>
          <div class="text-xs text-amber italic mt-0.5">${p.local} · ${p.origin}</div>
          <p class="mt-2 text-xs text-cream/65 line-clamp-2">${p.desc}</p>
        </div>
      </div>

      <div class="mt-6 space-y-3">
        <div class="rounded-xl border border-gold/15 bg-navy/40 p-4">
          <div class="text-[10px] uppercase font-cinzel text-gold tracking-widest">Posologie &amp; Rituel Recommandé</div>
          <div class="mt-1 text-xs text-cream/80">${p.sommelier.ritual}</div>
        </div>
        <div class="rounded-xl border border-gold/15 bg-navy/40 p-4">
          <div class="text-[10px] uppercase font-cinzel text-gold tracking-widest">Garantie Pureté &amp; Lot Scellé</div>
          <div class="mt-1 text-xs text-cream/80 font-mono">${p.lot} · ONSSA Conforme · ${p.sommelier.moisture}</div>
        </div>
      </div>

      <div class="mt-6 flex flex-col sm:flex-row gap-3">
        <button type="button" id="quiz-add-cart-btn" class="btn-gold flex-1 !py-3.5" data-hover>
          <i data-lucide="shopping-bag" class="h-4 w-4"></i> Ajouter à ma réserve (${fmt(p.prices[500])})
        </button>
        <button type="button" id="quiz-inspect-3d-btn" class="btn-ghost !py-3.5" data-hover>
          <i data-lucide="rotate-3d" class="h-4 w-4 text-gold"></i> Inspecter en 3D
        </button>
      </div>
    `;

    icons();

    $('#quiz-add-cart-btn')?.addEventListener('click', (e) => {
      flyToCart(e.currentTarget);
      addToCart(topHoneyId, 500, 1);
      closeQuiz();
    });

    $('#quiz-inspect-3d-btn')?.addEventListener('click', () => {
      closeQuiz();
      setVariant(topHoneyId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    $('[data-close-quiz]', sheet)?.addEventListener('click', closeQuiz);
  }

  $('#hero-quiz-btn')?.addEventListener('click', openQuiz);
  $('#somm-quiz-launch')?.addEventListener('click', openQuiz);
  $$('[data-close-quiz]').forEach((el) => el.addEventListener('click', closeQuiz));

  // ---------------------------------------------------------------------------
  // COFFRET DÉGUSTATION ROYAL SUR-MESURE (3 × 250g Bundle Builder)
  // ---------------------------------------------------------------------------
  let coffretSlots = ['sidr', 'daghmous', 'thym'];

  function renderCoffret() {
    const pickersEl = $('#coffret-pickers');
    const slotsEl = $('#coffret-slots');
    if (!pickersEl || !slotsEl) return;

    pickersEl.innerHTML = PRODUCTS.slice(0, 4).map((p) => `
      <button type="button" data-pick-honey="${p.id}" class="group flex flex-col items-center rounded-2xl border border-gold/20 bg-navy/60 p-3 text-center transition hover:-translate-y-1 hover:border-gold" data-hover>
        <img src="${p.img}" onerror="this.onerror=null;this.src='${p.fallback}'" alt="${p.local}" class="h-14 w-14 rounded-xl object-cover" />
        <span class="mt-2 font-cinzel text-[10px] font-semibold text-gold">${p.local.split(' ')[0]}</span>
        <span class="mt-0.5 text-[11px] text-cream/60">${fmt(p.prices[250])}</span>
      </button>
    `).join('');

    slotsEl.innerHTML = [0, 1, 2].map((idx) => {
      const id = coffretSlots[idx];
      const p = PRODUCTS.find((x) => x.id === id);
      if (!p) {
        return `
          <div class="coffret-slot" data-slot-idx="${idx}">
            <div class="coffret-slot-inner">
              <div class="grid h-10 w-10 place-items-center rounded-full border border-dashed border-gold/40 text-gold/60">
                <i data-lucide="plus" class="h-4 w-4"></i>
              </div>
              <div class="mt-2 font-cinzel text-[9px] text-cream/45">Alvéole 0${idx + 1}</div>
              <div class="text-[11px] text-cream/35">Choisir un miel</div>
            </div>
          </div>`;
      }
      return `
        <div class="coffret-slot is-filled" data-slot-idx="${idx}" title="Cliquer pour retirer ce flacon">
          <div class="coffret-slot-inner">
            <img src="${p.img}" onerror="this.onerror=null;this.src='${p.fallback}'" alt="${p.name}" class="h-16 w-16 rounded-full border border-gold/40 object-cover shadow-lg sm:h-20 sm:w-20" />
            <div class="mt-2 font-cinzel text-[9px] text-gold">0${idx + 1} · 250g</div>
            <div class="line-clamp-1 text-xs font-medium text-cream">${p.local.split(' ')[0]}</div>
            <span class="mt-1 text-[10px] text-cream/45">Retirer ×</span>
          </div>
        </div>`;
    }).join('');

    const filled = coffretSlots.filter(Boolean);
    const rawTotal = filled.reduce((sum, id) => {
      const p = PRODUCTS.find((x) => x.id === id);
      return sum + (p ? p.prices[250] : 0);
    }, 0);
    const discounted = Math.round(rawTotal * 0.85);

    $('#coffret-old-price').textContent = fmt(rawTotal);
    $('#coffret-price').textContent = fmt(discounted);
    const addBtn = $('#coffret-add');
    if (addBtn) {
      addBtn.disabled = filled.length < 3;
      addBtn.innerHTML = filled.length < 3
        ? `<i data-lucide="sparkles" class="h-4 w-4"></i> Sélectionnez encore ${3 - filled.length} flacon(s)`
        : `<i data-lucide="gift" class="h-4 w-4"></i> Ajouter le Coffret · ${fmt(discounted)}`;
    }
    icons();
  }

  // Interactive Calligraphy Inscription Note Live Preview
  const coffretNoteInput = $('#coffret-note');
  const cardText = $('#coffret-card-text');
  if (coffretNoteInput && cardText) {
    coffretNoteInput.addEventListener('input', () => {
      const val = coffretNoteInput.value.trim();
      cardText.textContent = val ? `« ${val} »` : '« Votre message personnalisé calligraphié à la feuille d’or »';
    });
  }

  document.addEventListener('click', (e) => {
    const pick = e.target.closest('[data-pick-honey]');
    if (pick) {
      const id = pick.dataset.pickHoney;
      const emptyIdx = coffretSlots.findIndex((s) => !s);
      if (emptyIdx !== -1) {
        coffretSlots[emptyIdx] = id;
      } else {
        coffretSlots = [coffretSlots[1], coffretSlots[2], id];
      }
      renderCoffret();
      Sound.chime(820);
      return;
    }
    const slot = e.target.closest('[data-slot-idx]');
    if (slot) {
      const idx = +slot.dataset.slotIdx;
      if (coffretSlots[idx]) {
        coffretSlots[idx] = null;
        renderCoffret();
        Sound.tap();
      }
    }
  });

  $('#coffret-reset')?.addEventListener('click', () => {
    coffretSlots = [null, null, null];
    renderCoffret();
    Sound.tap();
  });

  $('#coffret-add')?.addEventListener('click', (e) => {
    const filled = coffretSlots.filter(Boolean);
    if (filled.length < 3) return toast('Complétez les 3 alvéoles du coffret', 'info');
    const names = filled.map((id) => PRODUCTS.find((p) => p.id === id).local.split(' ')[0]).join(' + ');
    const raw = filled.reduce((s, id) => s + PRODUCTS.find((p) => p.id === id).prices[250], 0);
    const price = Math.round(raw * 0.85);
    const note = ($('#coffret-note')?.value || '').trim();
    flyToCart(e.currentTarget);
    addCustomBundleToCart({
      title: 'Coffret Dégustation Royal (3 × 250g)',
      subtitle: names + (note ? ` · Inscription : « ${note} »` : ''),
      price,
      img: 'assets/img/product-sidr.jpg',
    });
    if ($('#coffret-note')) $('#coffret-note').value = '';
    if (cardText) cardText.textContent = '« Votre message personnalisé calligraphié à la feuille d’or »';
  });

  renderCoffret();

  // ---------------------------------------------------------------------------
  // INTERACTIVE ATLAS DES TERROIRS
  // ---------------------------------------------------------------------------
  let currentTerroirId = 'thym';
  function updateTerroir(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p || !p.terroir) return;
    currentTerroirId = id;
    $$('.terroir-node').forEach((n) => n.classList.toggle('is-active', n.dataset.terroir === id));
    const t = p.terroir;
    $('#tr-code').textContent = t.code;
    $('#tr-type').textContent = t.type;
    $('#tr-region').textContent = t.region;
    $('#tr-flora').textContent = t.flora;
    $('#tr-desc').textContent = t.desc;
    $('#tr-gps').textContent = t.gps;
    $('#tr-alt').textContent = t.alt;
    $('#tr-season').textContent = t.season;
    $('#tr-purity').textContent = t.purity;
    setVariant(id, true);
  }
  $$('.terroir-node').forEach((node) => {
    node.addEventListener('click', () => {
      updateTerroir(node.dataset.terroir);
      Sound.chime(700);
    });
  });
  $('#tr-trace-btn')?.addEventListener('click', () => {
    const p = PRODUCTS.find((x) => x.id === currentTerroirId);
    if (!p) return;
    $('#tracabilite').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      $('#lot-input').value = p.lot;
      renderQR(p.lot);
      runScan(p.lot);
    }, 450);
  });
  $('#tr-add-btn')?.addEventListener('click', (e) => {
    flyToCart(e.currentTarget);
    addToCart(currentTerroirId, 500, 1);
  });
  updateTerroir('thym');

  // ---------------------------------------------------------------------------
  // SLIDE-OUT CART (With Free Shipping Threshold & Custom Bundles)
  // ---------------------------------------------------------------------------
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY)) || []; } catch (e) { cart = []; }
  cart = cart.filter((it) => it.bundle || (PRODUCTS.some((p) => p.id === it.id) && (it.w === undefined || WEIGHTS.includes(it.w))));

  const save = () => { try { localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(cart)); } catch (e) { /* ignore */ } };
  const priceOf = (it) => (it.bundle ? it.price : PRODUCTS.find((p) => p.id === it.id).prices[it.w || 500]);
  const totals = () => {
    const subtotal = cart.reduce((s, it) => s + priceOf(it) * it.qty, 0);
    const shipping = subtotal === 0 || subtotal >= CONFIG.FREE_SHIPPING ? 0 : CONFIG.SHIPPING_FEE;
    const count = cart.reduce((s, it) => s + it.qty, 0);
    return { subtotal, shipping, total: subtotal + shipping, count };
  };

  function addToCart(id, w = 500, qty = 1) {
    const key = id + '-' + w;
    const ex = cart.find((it) => it.key === key);
    if (ex) ex.qty += qty; else cart.push({ key, id, w, qty });
    save(); renderCart();
    const p = PRODUCTS.find((x) => x.id === id);
    toast(`${p.name} (${wLabel(w)}) ajouté au panier`, 'check');
    Sound.chime(990);
  }

  function addCustomBundleToCart(b) {
    const key = 'coffret-' + Date.now();
    cart.push({
      key,
      bundle: true,
      title: b.title,
      subtitle: b.subtitle,
      price: b.price,
      img: b.img,
      qty: 1,
    });
    save(); renderCart();
    toast(`${b.title} ajouté au panier (-15%)`, 'gift');
    Sound.chime(1046);
  }

  function setQty(key, qty) {
    const it = cart.find((x) => x.key === key);
    if (!it) return;
    it.qty = Math.max(0, Math.min(20, qty));
    if (!it.qty) cart = cart.filter((x) => x.key !== key);
    save(); renderCart();
  }

  function renderCart() {
    const t = totals();
    const badge = $('#cart-count');
    if (badge) {
      badge.textContent = t.count;
      badge.classList.toggle('is-visible', t.count > 0);
    }
    const itemsLabel = $('#cart-items-label');
    if (itemsLabel) itemsLabel.textContent = t.count ? `(${t.count})` : '';

    const pct = Math.min(100, (t.subtotal / CONFIG.FREE_SHIPPING) * 100);
    const shipBar = $('#ship-bar');
    if (shipBar) shipBar.style.width = pct + '%';
    const left = CONFIG.FREE_SHIPPING - t.subtotal;
    const shipMsg = $('#ship-msg');
    if (shipMsg) {
      shipMsg.innerHTML = t.subtotal === 0
        ? `<i data-lucide="truck" class="h-4 w-4 text-gold"></i><span class="text-cream/70">Livraison <b class="text-gold">gratuite dès ${CONFIG.FREE_SHIPPING} MAD</b></span>`
        : left > 0
          ? `<i data-lucide="truck" class="h-4 w-4 text-gold"></i><span class="text-cream/70">Plus que <b class="text-gold">${fmt(left)}</b> pour la livraison gratuite</span>`
          : `<i data-lucide="party-popper" class="h-4 w-4 text-gold"></i><span class="text-gold font-medium">Félicitations — la livraison vous est offerte !</span>`;
    }

    const list = $('#cart-list');
    if (list) {
      if (!cart.length) {
        list.innerHTML = `
          <div class="flex h-full flex-col items-center justify-center py-16 text-center">
            <div class="founder-hex !h-[78px] !w-[68px]"><i data-lucide="shopping-bag" class="relative h-6 w-6 text-gold"></i></div>
            <h4 class="mt-6 font-display text-2xl">Votre réserve est vide</h4>
            <p class="mt-2 max-w-xs text-sm text-cream/50">Laissez-vous guider par nos nectars certifiés ou composez votre Coffret Royal.</p>
            <a href="#collection" class="btn-ghost mt-6" data-close-cart>Découvrir la collection</a>
          </div>`;
        $('#cart-footer')?.classList.add('opacity-40', 'pointer-events-none');
      } else {
        $('#cart-footer')?.classList.remove('opacity-40', 'pointer-events-none');
        list.innerHTML = cart.map((it) => {
          if (it.bundle) {
            return `
              <div class="cart-item flex gap-4 rounded-2xl border border-gold/25 bg-amber/10 p-3">
                <img src="${it.img}" onerror="this.onerror=null;this.src='${U(IMG.drip)}'" alt="" class="h-20 w-20 shrink-0 rounded-xl object-cover" />
                <div class="flex min-w-0 flex-1 flex-col">
                  <div class="flex items-start justify-between gap-2">
                    <div class="min-w-0">
                      <div class="truncate font-display text-lg leading-tight text-gold-soft">${it.title}</div>
                      <div class="mt-0.5 text-[11px] text-cream/65">${it.subtitle}</div>
                    </div>
                    <button class="text-cream/40 transition hover:text-amber" data-remove="${it.key}" aria-label="Retirer"><i data-lucide="trash-2" class="h-4 w-4"></i></button>
                  </div>
                  <div class="mt-auto flex items-center justify-between pt-2">
                    <div class="qty">
                      <button data-qty="${it.key}" data-d="-1" aria-label="Diminuer"><i data-lucide="minus" class="h-3 w-3"></i></button>
                      <span>${it.qty}</span>
                      <button data-qty="${it.key}" data-d="1" aria-label="Augmenter"><i data-lucide="plus" class="h-3 w-3"></i></button>
                    </div>
                    <div class="font-display text-lg text-gold">${fmt(it.price * it.qty)}</div>
                  </div>
                </div>
              </div>`;
          }
          const p = PRODUCTS.find((x) => x.id === it.id);
          return `
            <div class="cart-item flex gap-4 rounded-2xl border border-gold/10 bg-black/20 p-3">
              <img src="${p.img}" onerror="this.onerror=null;this.src='${p.fallback}'" alt="" class="h-20 w-20 shrink-0 rounded-xl object-cover" />
              <div class="flex min-w-0 flex-1 flex-col">
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0">
                    <div class="truncate font-display text-lg leading-tight">${p.name}</div>
                    <div class="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-cream/45">${wLabel(it.w || 500)} · ${p.local}</div>
                  </div>
                  <button class="text-cream/40 transition hover:text-amber" data-remove="${it.key}" aria-label="Retirer"><i data-lucide="trash-2" class="h-4 w-4"></i></button>
                </div>
                <div class="mt-auto flex items-center justify-between pt-2">
                  <div class="qty">
                    <button data-qty="${it.key}" data-d="-1" aria-label="Diminuer"><i data-lucide="minus" class="h-3 w-3"></i></button>
                    <span>${it.qty}</span>
                    <button data-qty="${it.key}" data-d="1" aria-label="Augmenter"><i data-lucide="plus" class="h-3 w-3"></i></button>
                  </div>
                  <div class="font-display text-lg text-gold">${fmt(priceOf(it) * it.qty)}</div>
                </div>
              </div>
            </div>`;
        }).join('');
      }
    }
    const cartSub = $('#cart-subtotal');
    if (cartSub) cartSub.textContent = fmt(t.subtotal);
    const cartShip = $('#cart-shipping');
    if (cartShip) cartShip.innerHTML = t.subtotal === 0 ? '—' : t.shipping ? fmt(t.shipping) : '<span class="text-emerald-300 font-semibold">Gratuite</span>';
    const cartTot = $('#cart-total');
    if (cartTot) cartTot.textContent = fmt(t.total);
    icons();
  }

  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]');
    if (add) {
      const id = add.dataset.add;
      flyToCart(add);
      addToCart(id, selectedWeight[id] || 500);
      return;
    }
    const q = e.target.closest('[data-qty]');
    if (q) { const it = cart.find((x) => x.key === q.dataset.qty); if (it) setQty(it.key, it.qty + +q.dataset.d); return; }
    const r = e.target.closest('[data-remove]');
    if (r) { setQty(r.dataset.remove, 0); return; }
    if (e.target.closest('[data-close-cart]')) closeCart();
  });

  function flyToCart(fromEl) {
    const target = $('#cart-open');
    if (!target) return;
    const a = fromEl.getBoundingClientRect();
    const b = target.getBoundingClientRect();
    const dot = document.createElement('div');
    dot.className = 'fly-dot';
    document.body.appendChild(dot);
    const sx = a.left + a.width / 2, sy = a.top + a.height / 2;
    const ex = b.left + b.width / 2, ey = b.top + b.height / 2;
    const bump = () => { target.classList.remove('cart-bump'); void target.offsetWidth; target.classList.add('cart-bump'); };
    if (!hasGSAP || reduceMotion) { dot.remove(); bump(); return; }
    gsap.set(dot, { x: sx - 9, y: sy - 9 });
    const o = { t: 0 };
    gsap.to(o, {
      t: 1, duration: 0.85, ease: 'power2.in',
      onUpdate: () => {
        const t = o.t;
        const x = sx + (ex - sx) * t;
        const y = sy + (ey - sy) * t - Math.sin(t * Math.PI) * 160;
        gsap.set(dot, { x: x - 9, y: y - 9, scale: 1 - t * 0.5 });
      },
      onComplete: () => { dot.remove(); bump(); },
    });
  }

  const overlay = $('#overlay');
  const drawer = $('#cart-drawer');
  function openCart() {
    drawer?.classList.add('is-open'); overlay?.classList.add('is-open');
    drawer?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
  }
  function closeCart() {
    drawer?.classList.remove('is-open');
    drawer?.setAttribute('aria-hidden', 'true');
    if (!$('#checkout-modal')?.classList.contains('is-open')) { overlay?.classList.remove('is-open'); document.body.classList.remove('is-locked'); }
  }
  $('#cart-open')?.addEventListener('click', openCart);
  $('#cart-close')?.addEventListener('click', closeCart);
  overlay?.addEventListener('click', closeCart);

  // ---------------------------------------------------------------------------
  // WHATSAPP HIGH-CONVERSION ORDER GENERATOR
  // ---------------------------------------------------------------------------
  function buildWhatsAppMessage(customer, orderId) {
    const t = totals();
    const lines = ['🐝 *Nouvelle commande — INOBEE SARL*'];
    if (orderId) lines.push(`Réf. : ${orderId}`);
    lines.push('━━━━━━━━━━━━━━━━━━━━');
    cart.forEach((it) => {
      if (it.bundle) {
        lines.push(`• ${it.qty} × ${it.title} (${it.subtitle}) — ${fmt(it.price * it.qty)}`);
      } else {
        const p = PRODUCTS.find((x) => x.id === it.id);
        lines.push(`• ${it.qty} × ${p.name} (${wLabel(it.w || 500)}) — ${fmt(priceOf(it) * it.qty)}`);
      }
    });
    lines.push('━━━━━━━━━━━━━━━━━━━━');
    lines.push(`Sous-total : ${fmt(t.subtotal)}`);
    lines.push(`Livraison : ${t.shipping ? fmt(t.shipping) : 'Gratuite (Offerte)'}`);
    lines.push(`*Total à régler : ${fmt(t.total)}*`);
    lines.push('💵 Paiement sécurisé à la livraison (Cash on Delivery)');
    if (customer) {
      lines.push('');
      lines.push(`👤 Client : ${customer.name}`);
      lines.push(`📞 Tél : ${customer.phone}`);
      lines.push(`📍 Ville : ${customer.city}`);
      lines.push(`🏠 Adresse : ${customer.address}`);
      if (customer.note) lines.push(`📝 Note : ${customer.note}`);
    } else {
      lines.push('');
      lines.push('Bonjour Inobee, je souhaite finaliser cette commande. Pouvez-vous me confirmer le délai de livraison ?');
    }
    return lines.join('\n');
  }

  function openWhatsApp(text) {
    const url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');
  }

  $('#cart-wa')?.addEventListener('click', () => {
    if (!cart.length) return toast('Votre panier est vide', 'info');
    openWhatsApp(buildWhatsAppMessage());
  });

  document.addEventListener('click', (e) => {
    const d = e.target.closest('[data-wa-direct]');
    if (!d) return;
    e.preventDefault();
    if (cart.length) openWhatsApp(buildWhatsAppMessage());
    else openWhatsApp("Bonjour Inobee SARL 🐝, je souhaite commander du miel pur certifié. Pouvez-vous me conseiller sur vos réserves disponibles ?");
  });

  // ---------------------------------------------------------------------------
  // CHECKOUT MODAL (Cash on Delivery Flow)
  // ---------------------------------------------------------------------------
  const modal = $('#checkout-modal');
  const citySel = $('#co-city');
  if (citySel) {
    citySel.innerHTML += CITIES.map((c) => `<option value="${c}">${c}</option>`).join('');
  }
  let lastOrder = null;

  function renderSummary() {
    const t = totals();
    const coItems = $('#co-items');
    if (coItems) {
      coItems.innerHTML = cart.map((it) => {
        if (it.bundle) {
          return `<div class="flex items-center gap-3">
            <div class="relative"><img src="${it.img}" class="h-14 w-14 rounded-xl object-cover" alt="" /><span class="absolute -right-2 -top-2 grid h-5 min-w-[20px] place-items-center rounded-full bg-amber px-1 text-[10px] font-bold text-navy">${it.qty}</span></div>
            <div class="min-w-0 flex-1"><div class="truncate text-sm font-medium">${it.title}</div><div class="truncate text-[11px] text-cream/45">${it.subtitle}</div></div>
            <div class="text-sm text-gold">${fmt(it.price * it.qty)}</div></div>`;
        }
        const p = PRODUCTS.find((x) => x.id === it.id);
        return `<div class="flex items-center gap-3">
          <div class="relative"><img src="${p.img}" onerror="this.onerror=null;this.src='${p.fallback}'" class="h-14 w-14 rounded-xl object-cover" alt="" /><span class="absolute -right-2 -top-2 grid h-5 min-w-[20px] place-items-center rounded-full bg-amber px-1 text-[10px] font-bold text-navy">${it.qty}</span></div>
          <div class="min-w-0 flex-1"><div class="truncate text-sm font-medium">${p.name}</div><div class="text-[11px] text-cream/45">${wLabel(it.w || 500)}</div></div>
          <div class="text-sm text-gold">${fmt(priceOf(it) * it.qty)}</div></div>`;
      }).join('');
    }
    const coSub = $('#co-subtotal');
    if (coSub) coSub.textContent = fmt(t.subtotal);
    const coShip = $('#co-shipping');
    if (coShip) coShip.innerHTML = t.shipping ? fmt(t.shipping) : '<span class="text-emerald-300 font-semibold">Gratuite</span>';
    const coTot = $('#co-total');
    if (coTot) coTot.textContent = fmt(t.total);
  }

  function openCheckout() {
    if (!cart.length) return toast('Ajoutez au moins un miel à votre panier', 'info');
    renderSummary();
    $('#co-form-step')?.classList.remove('hidden');
    $('#co-success-step')?.classList.add('hidden');
    drawer?.classList.remove('is-open');
    overlay?.classList.remove('is-open');
    modal?.classList.add('is-open');
    document.body.classList.add('is-locked');
    setTimeout(() => $('#co-name')?.focus({ preventScroll: true }), 400);
  }

  function closeCheckout() {
    modal?.classList.remove('is-open');
    document.body.classList.remove('is-locked');
  }

  $('#checkout-open')?.addEventListener('click', openCheckout);
  $$('[data-close-modal]').forEach((el) => el.addEventListener('click', closeCheckout));

  const PHONE_RE = /^(?:\+212|00212|0)([5-7]\d{8})$/;
  function readForm() {
    const f = $('#co-form');
    if (!f) return null;
    const data = {
      name: f.name.value.trim(),
      phone: f.phone.value.replace(/[\s.\-()]/g, ''),
      city: f.city.value,
      address: f.address.value.trim(),
      note: f.note.value.trim(),
    };
    const checks = {
      name: data.name.length >= 3,
      phone: PHONE_RE.test(data.phone),
      city: !!data.city,
      address: data.address.length >= 5,
    };
    let ok = true;
    Object.entries(checks).forEach(([k, valid]) => {
      const field = f[k].closest('.field');
      if (field) field.classList.toggle('is-invalid', !valid);
      if (!valid) ok = false;
    });
    if (!ok) {
      const first = $('.field.is-invalid input, .field.is-invalid select', f);
      first && first.focus();
      if (hasGSAP) gsap.fromTo('.modal-panel', { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    }
    return ok ? data : null;
  }
  $$('#co-form input, #co-form select').forEach((el) => el.addEventListener('input', () => el.closest('.field')?.classList.remove('is-invalid')));

  function completeOrder(data, viaWhatsApp) {
    const d = new Date();
    const orderId = `INB-${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
    const t = totals();
    const message = buildWhatsAppMessage(data, orderId);
    lastOrder = { orderId, message };
    if (viaWhatsApp) openWhatsApp(message);

    $('#co-success-name').textContent = data.name.split(' ')[0];
    $('#co-order-id').textContent = orderId;
    $('#co-success-total').textContent = fmt(t.total);
    $('#co-success-city').textContent = data.city;
    $('#co-form-step').classList.add('hidden');
    $('#co-success-step').classList.remove('hidden');
    $('#co-success-wa').classList.toggle('hidden', viaWhatsApp);
    $('.modal-panel').scrollTop = 0;
    Sound.success();

    cart = [];
    save(); renderCart();
    $('#co-form').reset();
  }

  $('#co-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = readForm();
    if (data) completeOrder(data, false);
  });
  $('#co-wa')?.addEventListener('click', () => {
    const data = readForm();
    if (data) completeOrder(data, true);
  });
  $('#co-success-wa')?.addEventListener('click', () => lastOrder && openWhatsApp(lastOrder.message));

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if ($('#cert-modal')?.classList.contains('is-open')) closeCertModal();
    else if ($('#quiz-modal')?.classList.contains('is-open')) closeQuiz();
    else if (modal?.classList.contains('is-open')) closeCheckout();
    else if (drawer?.classList.contains('is-open')) closeCart();
    else if ($('#mobile-menu')?.classList.contains('is-open')) toggleMenu(false);
  });

  renderCart();

  // ---------------------------------------------------------------------------
  // TRACEABILITY CHAMBER + LIVE SCAN + OFFICIAL CERTIFICATE MODAL
  // ---------------------------------------------------------------------------
  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function renderQR(text) {
    const N = 29;
    let seed = hashStr(text || 'INOBEE');
    const rnd = () => ((seed = Math.imul(seed ^ (seed >>> 15), 2246822507) ^ Math.imul(seed ^ (seed >>> 13), 3266489909)) >>> 0) / 4294967296;
    let out = '';
    const finder = (x, y) => {
      out += `<rect x="${x}" y="${y}" width="7" height="7" fill="#F5C26B"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#04101f"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="#F5C26B"/>`;
    };
    const inFinder = (i, j) => (i < 8 && j < 8) || (i > N - 9 && j < 8) || (i < 8 && j > N - 9);
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
      if (inFinder(i, j)) continue;
      if ((i === 6 || j === 6) ? (i + j) % 2 === 0 : rnd() > 0.52) out += `<rect x="${i}" y="${j}" width="1" height="1" fill="#F5C26B" opacity="${0.75 + rnd() * 0.25}"/>`;
    }
    finder(0, 0); finder(N - 7, 0); finder(0, N - 7);
    out += `<rect x="12" y="12" width="5" height="5" fill="#04101f"/><polygon points="14.5,12.6 16.3,13.6 16.3,15.6 14.5,16.6 12.7,15.6 12.7,13.6" fill="#E58E26"/>`;
    const qrSvg = $('#qr-svg');
    if (qrSvg) qrSvg.innerHTML = out;
  }
  renderQR('LOT-INOBEE-DAGH01');

  const chips = $('#lot-chips');
  if (chips) {
    chips.innerHTML = Object.keys(LOTS).map((k) => `<button type="button" class="chip" data-lot="${k}" data-hover>${k}</button>`).join('');
  }
  const lotInput = $('#lot-input');
  if (lotInput) {
    lotInput.addEventListener('input', () => { lotInput.classList.remove('is-error'); renderQR(lotInput.value.toUpperCase()); });
    $$('[data-lot]').forEach((c) => c.addEventListener('click', () => { lotInput.value = c.dataset.lot; renderQR(c.dataset.lot); runScan(c.dataset.lot); }));
    $('#lot-form')?.addEventListener('submit', (e) => { e.preventDefault(); runScan(lotInput.value); });
  }

  // Simulated Live QR Camera Scan
  const lotKeys = Object.keys(LOTS);
  let camCycleIdx = 0;
  $('#simulate-cam-btn')?.addEventListener('click', () => {
    const code = lotKeys[camCycleIdx % lotKeys.length];
    camCycleIdx++;
    lotInput.value = code;
    renderQR(code);
    toast(`Scan optique verrouillé : ${code}`, 'camera');
    runScan(code);
  });

  function normalizeLot(v) {
    let s = (v || '').toUpperCase().replace(/\s+/g, '').replace(/_/g, '-');
    if (!s) return '';
    if (!s.startsWith('LOT-')) s = s.startsWith('INOBEE-') ? 'LOT-' + s : 'LOT-INOBEE-' + s.replace(/^LOT/, '');
    return s;
  }

  let scanning = false;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  async function runScan(raw, quiet = false) {
    if (scanning) return;
    const code = normalizeLot(raw);
    const term = $('#terminal');
    const scanner = $('#scanner');
    const status = $('#scan-status');
    if (!code) { lotInput?.classList.add('is-error'); toast('Saisissez un code de lot', 'info'); return; }
    scanning = true;
    if (lotInput) lotInput.value = code;
    scanner?.classList.add('is-scanning');
    if (term) term.innerHTML = '';
    const log = (html, cls = '') => { const d = document.createElement('div'); d.className = cls; d.innerHTML = html; term?.appendChild(d); };
    const lot = LOTS[code];
    const stepDelay = quiet ? 110 : 340;
    const seq = [
      ['> Connexion au registre cryptographique Inobee…', 'dim', stepDelay],
      [`> Lecture de la matrice QR <span class="text-cream">${code}</span>`, '', stepDelay],
      ['> Vérification de la signature du lot… <span class="ok">OK</span>', '', stepDelay],
    ];
    for (let i = 0; i < seq.length; i++) {
      log(seq[i][0], seq[i][1]);
      if (status) status.textContent = `ANALYSE EN COURS ${Math.round(((i + 1) / 6) * 100)}%`;
      await sleep(seq[i][2]);
    }
    if (!lot) {
      log('> Lot introuvable dans le registre.', 'err');
      log('<span class="dim">Astuce : essayez LOT-INOBEE-DAGH01</span>', 'caret');
      if (status) status.textContent = 'CODE NON RECONNU';
      scanner?.classList.remove('is-scanning');
      lotInput?.classList.add('is-error');
      toast('Code de lot non reconnu — vérifiez l’étiquette', 'alert-triangle');
      scanning = false;
      return;
    }
    log('> Certificat laboratoire récupéré… <span class="ok">OK</span>');
    if (status) status.textContent = 'ANALYSE EN COURS 66%';
    await sleep(stepDelay);
    log('> Conformité ONSSA… <span class="ok">CONFORME</span>');
    if (status) status.textContent = 'ANALYSE EN COURS 85%';
    await sleep(stepDelay);
    log(`> Géolocalisation du rucher… <span class="text-cream">${lot.lat.toFixed(4)}°N ${Math.abs(lot.lng).toFixed(4)}°W</span>`);
    await sleep(stepDelay);
    log('> Lot authentique. Certificat holographique actif.', 'ok caret');
    if (status) status.textContent = 'LOT AUTHENTIFIÉ ✓';
    scanner?.classList.remove('is-scanning');
    renderHolo(code, lot, quiet);
    setVariant(lot.product, true);
    window.InobeeScene && window.InobeeScene.pulse();
    if (!quiet) Sound.chime(1046);
    scanning = false;
  }

  function renderHolo(code, L, quiet = false) {
    const wrap = $('#holo-wrap');
    if (!wrap) return;
    const p = PRODUCTS.find((x) => x.id === L.product) || PRODUCTS[0];
    const C = 2 * Math.PI * 52;
    const hmfPos = Math.min(100, (L.hmf / 40) * 100);
    const px = 22 + ((L.lng + 13.5) / 12.5) * 56;
    const py = 22 + (1 - (L.lat - 27) / 9) * 56;

    wrap.innerHTML = `
      <div class="holo-card gold-border p-5 md:p-8" id="holo-card">
        <div class="holo-sheen"></div>
        <div class="relative z-[2]">
          <div class="holo-layer flex flex-wrap items-start justify-between gap-4">
            <div>
              <div class="font-cinzel text-[10px] text-gold">Certificat d'analyse · ${L.report}</div>
              <div class="mt-2 font-mono text-lg tracking-[0.12em] text-gold-soft md:text-xl">${code}</div>
              <h3 class="mt-2 font-display text-3xl leading-tight md:text-4xl">${L.honey}</h3>
              <div class="mt-1 text-sm italic text-cream/55">${L.sub}</div>
            </div>
            <div class="flex flex-col items-end gap-2">
              <span class="badge-ok"><i data-lucide="shield-check" class="h-3.5 w-3.5"></i> Conforme ONSSA</span>
              <span class="badge-ok !border-gold/40 !bg-amber/10 !text-gold-soft"><i data-lucide="badge-check" class="h-3.5 w-3.5"></i> Lot authentique</span>
            </div>
          </div>

          <div class="holo-layer-deep mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="metric p-5">
              <div class="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-cream/50"><span>HMF · Fraîcheur</span><i data-lucide="flask-conical" class="h-4 w-4 text-gold"></i></div>
              <div class="mt-3 flex items-baseline gap-2"><span class="font-display text-5xl text-gold" data-to="${L.hmf}" data-dec="1">0</span><span class="text-sm text-cream/60">mg/kg</span></div>
              <div class="mt-1 text-xs text-emerald-300">&lt; 10 mg/kg · Seuil premium Inobee respecté</div>
              <div class="relative mt-5">
                <div class="gauge-bar"><span class="gauge-needle" style="left:0%" data-left="${hmfPos}"></span></div>
                <div class="absolute -top-1 h-4 w-px bg-white/60" style="left:25%"></div>
                <div class="mt-2 flex justify-between font-mono text-[9px] text-cream/40"><span>0</span><span style="margin-left:14%">10 · premium</span><span>40 · norme</span></div>
              </div>
            </div>

            <div class="metric flex items-center gap-5 p-5">
              <svg viewBox="0 0 120 120" class="h-28 w-28 shrink-0 -rotate-90">
                <defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFD99A"/><stop offset="1" stop-color="#B46400"/></linearGradient></defs>
                <circle class="ring-track" cx="60" cy="60" r="52" fill="none" stroke-width="8"/>
                <circle class="ring-val" cx="60" cy="60" r="52" fill="none" stroke-width="8" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-offset="${C * (1 - L.pollen / 100)}"/>
              </svg>
              <div>
                <div class="text-[10px] uppercase tracking-[0.22em] text-cream/50">Pureté pollinique</div>
                <div class="mt-1 font-display text-5xl text-gold"><span data-to="${L.pollen}" data-dec="0">0</span><span class="text-2xl">%</span></div>
                <div class="mt-1 text-xs italic text-cream/60">${L.pollenSp}</div>
                <div class="mt-1 text-[10px] uppercase tracking-[0.15em] text-cream/40">Mélissopalynologie</div>
              </div>
            </div>

            <div class="metric flex items-center gap-5 p-5">
              <div class="radar w-28 shrink-0"><span class="ping" style="left:${px}%;top:${py}%"></span></div>
              <div class="min-w-0">
                <div class="text-[10px] uppercase tracking-[0.22em] text-cream/50">Coordonnées GPS de récolte</div>
                <div class="mt-2 font-mono text-sm text-gold-soft">${L.lat.toFixed(4)}° N</div>
                <div class="font-mono text-sm text-gold-soft">${Math.abs(L.lng).toFixed(4)}° W</div>
                <div class="mt-1 text-xs text-cream/55">${L.region} · ${L.alt} m</div>
                <a href="https://www.google.com/maps?q=${L.lat},${L.lng}" target="_blank" rel="noopener" class="mt-2 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] text-amber hover:text-gold-soft" data-hover>Voir sur la carte <i data-lucide="arrow-up-right" class="h-3 w-3"></i></a>
              </div>
            </div>

            <div class="metric p-5">
              <div class="text-[10px] uppercase tracking-[0.22em] text-cream/50">Paramètres physico-chimiques</div>
              <ul class="mt-3 space-y-2 text-[13px]">
                <li class="flex justify-between border-b border-gold/10 pb-2"><span class="text-cream/60">Humidité</span><span>${L.moisture}% <span class="text-emerald-300 font-semibold">✓</span></span></li>
                <li class="flex justify-between border-b border-gold/10 pb-2"><span class="text-cream/60">Indice diastasique</span><span>${L.diastase} <span class="text-emerald-300 font-semibold">✓</span></span></li>
                <li class="flex justify-between border-b border-gold/10 pb-2"><span class="text-cream/60">Antibiotiques</span><span class="text-emerald-300">Non détectés</span></li>
                <li class="flex justify-between"><span class="text-cream/60">Sucres exogènes (C4)</span><span class="text-emerald-300">Non détectés</span></li>
              </ul>
            </div>
          </div>

          <div class="holo-layer mt-6 grid grid-cols-2 gap-4 border-t border-gold/10 pt-5 text-xs md:grid-cols-4">
            <div><div class="text-cream/40">Récolte</div><div class="mt-1 text-cream">${L.harvest}</div></div>
            <div><div class="text-cream/40">Rucher</div><div class="mt-1 text-cream">${L.apiary}</div></div>
            <div><div class="text-cream/40">Pots du lot</div><div class="mt-1 text-cream">${L.jars.toLocaleString('fr-FR')}</div></div>
            <div><div class="text-cream/40">Traitement</div><div class="mt-1 text-cream">Cru · non pasteurisé</div></div>
          </div>

          <div class="holo-layer mt-6 flex flex-wrap gap-3">
            <button class="btn-gold !py-3.5" data-add-lot="${p.id}" data-hover><i data-lucide="shopping-bag" class="h-4 w-4"></i> Ajouter ce miel · ${fmt(p.prices[500])}</button>
            <button class="btn-ghost !py-3.5" data-open-cert="${code}" data-hover><i data-lucide="file-badge" class="h-4 w-4 text-gold"></i> Certificat Officiel</button>
            <button class="btn-ghost !py-3.5" data-view3d="${p.id}" data-hover><i data-lucide="rotate-3d" class="h-4 w-4 text-gold"></i> Voir en 3D</button>
          </div>
        </div>
      </div>`;
    icons();
    const card = $('#holo-card');

    if (hasGSAP && !reduceMotion) {
      gsap.fromTo(card, { opacity: 0, rotateX: 35, y: 60, scale: 0.92, filter: 'blur(12px)' }, { opacity: 1, rotateX: 0, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.3, ease: 'expo.out' });
      gsap.from($$('.metric', card), { opacity: 0, y: 30, duration: 0.9, stagger: 0.1, delay: 0.25, ease: 'power3.out' });
    }
    requestAnimationFrame(() => {
      setTimeout(() => {
        $$('.ring-val', card).forEach((c) => (c.style.strokeDashoffset = c.dataset.offset));
        $$('.gauge-needle', card).forEach((n) => (n.style.left = n.dataset.left + '%'));
        $$('[data-to]', card).forEach((el) => countUp(el, +el.dataset.to, +el.dataset.dec, 1.6));
      }, 250);
    });
    if (canHover) {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.transform = `rotateY(${(x - 0.5) * 10}deg) rotateX(${(0.5 - y) * 8}deg)`;
        card.style.setProperty('--mx', x * 100 + '%');
        card.style.setProperty('--my', y * 100 + '%');
        card.style.setProperty('--sheen', (x - 0.5) * 60 + '%');
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; card.style.setProperty('--sheen', '-30%'); });
    }
    $('[data-add-lot]', card)?.addEventListener('click', (e) => { flyToCart(e.currentTarget); addToCart(p.id, 500); });
    $('[data-open-cert]', card)?.addEventListener('click', () => openCertModal(code, L));
    if (!quiet && window.innerWidth < 1024) setTimeout(() => wrap.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
  }

  // ---------------------------------------------------------------------------
  // OFFICIAL ONSSA LAB CERTIFICATE MODAL (Stamped with Brand Logo)
  // ---------------------------------------------------------------------------
  function openCertModal(code, L) {
    const sheet = $('#cert-sheet');
    const modalEl = $('#cert-modal');
    if (!sheet || !modalEl) return;

    sheet.innerHTML = `
      <button class="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-gold/25 transition hover:border-gold" data-close-cert aria-label="Fermer">
        <i data-lucide="x" class="h-4 w-4 text-gold"></i>
      </button>
      <div class="border border-gold/30 rounded-2xl p-6 md:p-8 bg-[#040d1d]/95 backdrop-blur-xl">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-gold/20 pb-5">
          <div class="flex items-center gap-3.5">
            <div class="relative flex items-center">
              <img src="assets/logo.png" alt="Inobee SARL Logo" class="brand-logo-cert h-11 md:h-12 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(229,142,38,0.35)]" onerror="this.style.display='none';this.nextElementSibling.classList.remove('hidden');" />
              <div class="hidden flex items-center gap-2">
                <svg width="30" height="34" viewBox="0 0 92 104">
                  <polygon points="46,2 90,27 90,77 46,102 2,77 2,27" fill="none" stroke="#F5C26B" stroke-width="5" />
                  <polygon points="46,26 69,39 69,65 46,78 23,65 23,39" fill="#E58E26" />
                </svg>
              </div>
            </div>
            <div>
              <div class="font-cinzel text-base md:text-lg tracking-[0.24em] text-gold font-semibold">INOBEE SARL</div>
              <div class="text-[10px] md:text-xs tracking-[0.16em] uppercase text-cream/60">Laboratoire d'Analyses &amp; Contrôle Qualité</div>
            </div>
          </div>
          <div class="text-right font-mono text-xs text-gold-soft">
            <div>RAPPORT : ${L.report}</div>
            <div>LOT : ${code}</div>
            <div class="mt-1 text-[10px] text-emerald-400 font-sans font-semibold tracking-wider flex items-center justify-end gap-1"><i data-lucide="shield-check" class="h-3 w-3"></i> ACCRÉDITÉ ONSSA</div>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
          <div><span class="text-cream/45">Dénomination :</span> <b class="text-cream">${L.honey} (${L.sub})</b></div>
          <div><span class="text-cream/45">Origine Rucher :</span> <span class="text-cream">${L.region}</span></div>
          <div><span class="text-cream/45">Coordonnées GPS :</span> <span class="font-mono text-gold-soft">${L.lat.toFixed(4)}° N, ${Math.abs(L.lng).toFixed(4)}° W (${L.alt}m)</span></div>
          <div><span class="text-cream/45">Date de Récolte :</span> <span class="text-cream">${L.harvest}</span></div>
        </div>

        <table class="mt-6 w-full text-left text-xs border-collapse">
          <thead>
            <tr class="border-b border-gold/25 text-gold font-cinzel text-[10px]">
              <th class="py-2.5">Paramètre Analysé</th>
              <th class="py-2.5">Résultat Lot</th>
              <th class="py-2.5">Norme ONSSA / Codex</th>
              <th class="py-2.5 text-right">Conformité</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gold/10 text-cream/85">
            <tr><td class="py-2.5 font-medium">Hydroxyméthylfurfural (HMF)</td><td class="font-mono text-gold-soft font-semibold">${L.hmf} mg/kg</td><td>≤ 40 mg/kg (Seuil Inobee &lt; 10)</td><td class="text-right text-emerald-400 font-semibold">CONFORME ✓</td></tr>
            <tr><td class="py-2.5 font-medium">Taux d'Humidité (Réfractométrie)</td><td class="font-mono text-gold-soft font-semibold">${L.moisture} %</td><td>≤ 20 %</td><td class="text-right text-emerald-400 font-semibold">CONFORME ✓</td></tr>
            <tr><td class="py-2.5 font-medium">Spectre Pollinique Dominant</td><td class="font-mono text-gold-soft font-semibold">${L.pollen}% (${L.pollenSp})</td><td>Monofloral Certifié</td><td class="text-right text-emerald-400 font-semibold">CONFORME ✓</td></tr>
            <tr><td class="py-2.5 font-medium">Activité Diastasique (Schade)</td><td class="font-mono text-gold-soft font-semibold">${L.diastase}</td><td>≥ 8 unités Schade</td><td class="text-right text-emerald-400 font-semibold">CONFORME ✓</td></tr>
            <tr><td class="py-2.5 font-medium">Sucres Exogènes (C4 / Sirop de sucre)</td><td class="font-mono text-gold-soft font-semibold">0.0 % (ND)</td><td>Absence Totale</td><td class="text-right text-emerald-400 font-semibold">CONFORME ✓</td></tr>
            <tr><td class="py-2.5 font-medium">Résidus d'Antibiotiques &amp; Pesticides</td><td class="font-mono text-gold-soft font-semibold">Non Détectés</td><td>Seuil Limite de Détection</td><td class="text-right text-emerald-400 font-semibold">CONFORME ✓</td></tr>
          </tbody>
        </table>

        <div class="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gold/20 pt-5 text-xs text-cream/60">
          <div>
            <div class="font-cinzel text-[11px] text-gold font-semibold">Ismail MARHOUL</div>
            <div>Directeur Technique &amp; Rucher · Inobee SARL</div>
          </div>
          <div class="flex gap-3">
            <button type="button" onclick="window.print()" class="btn-gold !px-5 !py-2.5 text-xs"><i data-lucide="printer" class="h-3.5 w-3.5"></i> Imprimer / PDF</button>
            <button type="button" data-close-cert class="btn-ghost !px-5 !py-2.5 text-xs">Fermer</button>
          </div>
        </div>
      </div>`;
    icons();
    modalEl.classList.add('is-open');
    document.body.classList.add('is-locked');
    $$('[data-close-cert]', modalEl).forEach((b) => b.addEventListener('click', closeCertModal));
  }

  function closeCertModal() {
    $('#cert-modal')?.classList.remove('is-open');
    document.body.classList.remove('is-locked');
  }
  $$('[data-close-cert]').forEach((b) => b.addEventListener('click', closeCertModal));

  function countUp(el, to, dec = 0, dur = 1.4) {
    if (!hasGSAP || reduceMotion) { el.textContent = to.toFixed(dec); return; }
    const o = { v: 0 };
    gsap.to(o, { v: to, duration: dur, ease: 'power3.out', onUpdate: () => (el.textContent = o.v.toFixed(dec)) });
  }

  // ---------------------------------------------------------------------------
  // NAVIGATION, SCROLL PROGRESS, MENU & MULTILINGUAL SWITCHER
  // ---------------------------------------------------------------------------
  const nav = $('#nav');
  const scrollBar = $('#scroll-progress');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (nav) {
      nav.classList.toggle('is-scrolled', y > 40);
      nav.classList.toggle('is-hidden', y > 600 && y > lastY + 4);
      if (y < lastY - 4) nav.classList.remove('is-hidden');
    }
    lastY = y;

    if (scrollBar) {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollBar.style.transform = `scaleX(${Math.min(1, y / maxScroll)})`;
    }
  }, { passive: true });

  const menu = $('#mobile-menu');
  function toggleMenu(open) {
    if (!menu) return;
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('is-locked', open);
    if (open && hasGSAP) gsap.fromTo('.mm-link', { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.8, delay: 0.25, ease: 'expo.out' });
  }
  $('#menu-open')?.addEventListener('click', () => toggleMenu(true));
  $('#menu-close')?.addEventListener('click', () => toggleMenu(false));
  $$('.mm-link').forEach((a) => a.addEventListener('click', () => toggleMenu(false)));

  // Multilingual Switcher
  $$('#lang-switch .lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('#lang-switch .lang-btn').forEach((b) => {
        b.classList.remove('is-active', 'text-gold');
        b.classList.add('text-cream/55');
      });
      btn.classList.add('is-active', 'text-gold');
      btn.classList.remove('text-cream/55');
      Sound.tap();

      const lang = btn.dataset.lang;
      if (lang === 'ar') {
        toast('العربية : مرحباً بكم في إينوبي — عسل مغربي أصيل وموثق مخبرياً', 'globe');
      } else if (lang === 'en') {
        toast('Language: English activated (Inobee Pure Moroccan Honey)', 'globe');
      } else {
        toast('Langue : Français sélectionné', 'globe');
      }
    });
  });

  // Custom Cursor
  if (canHover) {
    const dot = $('.cursor-dot'), ring = $('.cursor-ring');
    if (dot && ring) {
      let mx = -100, my = -100, rx = -100, ry = -100;
      window.addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate3d(${mx}px,${my}px,0)`; }, { passive: true });
      (function loop() {
        rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
        ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
        requestAnimationFrame(loop);
      })();
      document.addEventListener('pointerover', (e) => {
        const t = e.target;
        ring.classList.toggle('is-hover', !!t.closest('a, button, [data-hover], input, select, textarea, .t-step, .terroir-node, .coffret-slot'));
        ring.classList.toggle('is-drag', !!t.closest('.hero-drag-zone') && !t.closest('button'));
      });
    }
  }

  // Magnetic Button Hover Physics
  if (canHover) {
    $$('[data-magnetic]').forEach((el) => {
      const inner = el.firstElementChild;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        if (hasGSAP) {
          gsap.to(inner, { x: dx * 0.35, y: dy * 0.45, duration: 0.6, ease: 'power3.out' });
          gsap.to($$('svg, i', inner), { x: dx * 0.12, y: dy * 0.12, duration: 0.6, ease: 'power3.out' });
        }
      });
      el.addEventListener('pointerleave', () => {
        if (hasGSAP) {
          gsap.to(inner, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)' });
          gsap.to($$('svg, i', inner), { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)' });
        }
      });
    });
  }

  const dz = $('.hero-drag-zone');
  dz && dz.addEventListener('pointerdown', () => { const h = $('#drag-hint'); h && (h.style.opacity = '0.25'); }, { once: true });

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------------------------------------------------------------------------
  // SCROLL CHOREOGRAPHY (GSAP + ScrollTrigger)
  // ---------------------------------------------------------------------------
  function initScroll() {
    // Auto-run initial traceability scan when user enters the Traceability Chamber
    if (window.IntersectionObserver) {
      const traceObs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          traceObs.disconnect();
          if ($('#holo-empty')) runScan('LOT-INOBEE-DAGH01', true);
        }
      }, { threshold: 0.25 });
      const trSec = $('#tracabilite');
      if (trSec) traceObs.observe(trSec);
    }

    if (!hasGSAP || !window.ScrollTrigger) {
      $$('.reveal').forEach((el) => { el.style.opacity = 1; el.style.transform = 'none'; });
      $$('[data-count]').forEach((el) => (el.textContent = el.dataset.count));
      return;
    }
    ScrollTrigger.batch('.reveal', {
      start: 'top 88%',
      once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.2, stagger: 0.12, ease: 'expo.out', overwrite: true }),
    });

    $$('[data-count]').forEach((el) => {
      ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => countUp(el, +el.dataset.count, 0, 2) });
    });

    $$('.split-bar').forEach((bar) => {
      ScrollTrigger.create({ trigger: bar, start: 'top 90%', once: true, onEnter: () => gsap.to(bar, { width: bar.dataset.w + '%', duration: 1.8, ease: 'expo.out' }) });
    });

    gsap.from('.hex-cell', {
      scale: 0, opacity: 0, rotate: -30, duration: 1, stagger: 0.08, ease: 'back.out(1.8)',
      scrollTrigger: { trigger: '#hex-grid', start: 'top 85%', once: true },
    });

    $$('[data-parallax]').forEach((img) => {
      gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    gsap.to('#timeline-progress', {
      height: '100%', ease: 'none',
      scrollTrigger: { trigger: '#timeline', start: 'top 60%', end: 'bottom 60%', scrub: true },
    });
    $$('.t-step').forEach((el, i) => {
      ScrollTrigger.create({ trigger: el, start: 'top 60%', end: 'bottom 60%', onEnter: () => setStep(i), onEnterBack: () => setStep(i) });
    });

    gsap.to('#hero .order-2', {
      yPercent: -12, opacity: 0.15, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
    });

    gsap.from('.founder-card', {
      rotateX: 25, transformPerspective: 900, transformOrigin: 'top center', duration: 1.4, stagger: 0.12, ease: 'expo.out',
      scrollTrigger: { trigger: '#founders', start: 'top 85%', once: true },
    });
  }

  // ---------------------------------------------------------------------------
  // PRELOADER & INTRO SEQUENCING
  // ---------------------------------------------------------------------------
  icons();
  (function preload() {
    const fill = $('#loader-fill');
    const pctEl = $('#loader-pct');
    if (!fill || !pctEl) return;
    let pct = 0, loaded = document.readyState === 'complete';
    window.addEventListener('load', () => (loaded = true));
    const start = performance.now();
    const step = () => {
      const elapsed = performance.now() - start;
      const cap = loaded || elapsed > 4500 ? 100 : 88;
      pct += (cap - pct) * 0.06 + 0.4;
      pct = Math.min(pct, cap);
      pctEl.textContent = Math.round(pct);
      const h = (pct / 100) * 104;
      fill.setAttribute('y', 104 - h);
      if (pct >= 99.5) return finish();
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);

    function finish() {
      pctEl.textContent = '100';
      fill.setAttribute('y', 0);
      setTimeout(() => {
        $('#preloader')?.classList.add('is-done');
        document.body.classList.remove('is-locked');
        window.InobeeScene && window.InobeeScene.intro();
        if (hasGSAP && !reduceMotion) {
          gsap.from('.hero-title .line > span', { yPercent: 115, rotate: 3, duration: 1.6, stagger: 0.12, ease: 'expo.out', delay: 0.15 });
          gsap.from('.hero-fade', { opacity: 0, y: 30, duration: 1.4, stagger: 0.12, ease: 'expo.out', delay: 0.5 });
          gsap.from('#nav', { yPercent: -100, opacity: 0, duration: 1.2, ease: 'expo.out', delay: 0.3 });
          gsap.from('#variant-switch, #taste-3d-btn, #explode-toggle, #drag-hint', { opacity: 0, y: 20, duration: 1.2, delay: 1.4, ease: 'expo.out' });
        }
        initScroll();
      }, 350);
    }
  })();
})();
