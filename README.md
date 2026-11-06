# INOBEE SARL — Boutique E-Commerce Full-Stack (Miels Purs du Maroc)

Application web e-commerce de luxe pour **Inobee SARL**, maison apicole marocaine de haute précision.

Architecture Full-Stack :
- **Backend :** Node.js + Express REST API (`server.js`)
- **Frontend :** React 19 + Tailwind CSS + Lucide Icons (`App.jsx`, `main.jsx`)
- **Build & Dev Tooling :** Vite

---

## 🍯 Palette & Identité Visuelle
- **Beeswax Ivory / Blanc Cire :** `#FAF7F2`, `#FFFFFF`
- **Roasted Umber / Terre d'Ombre :** `#1E130A`
- **Warm Amber / Ambre Pur :** `#D97706`
- **Honey Gold / Nectar Doré :** `#F59E0B`
- **Botanical Green / Vert Certifié :** `#15803D`

---

## 🚀 Guide de Démarrage Rapide

### 1. Installation des Dépendances
Dans le répertoire du projet :
```bash
npm install
```

### 2. Lancement en Mode Développement (Recommandé)

Ouvrez deux terminaux ou lancez les commandes suivantes :

**Terminal 1 — API Backend Express (Port 5000) :**
```bash
node server.js
# ou
npm run server
```

**Terminal 2 — Frontend React Vite avec Hot-Reload (Port 3000) :**
```bash
npm run dev
```
Rendez-vous ensuite sur `http://localhost:3000`. Les requêtes vers `/api/*` sont automatiquement redirigées vers le serveur Express (`http://localhost:5000`).

---

### 3. Lancement en Mode Production Autonome (Tout-en-un sur le Port 5000)
Vous pouvez builder le frontend et laisser Express servir à la fois l'API et la SPA React :
```bash
npm run build
npm start
```
L'application complète sera accessible directement sur `http://localhost:5000`.

---

## 📡 Endpoints de l'API REST (`server.js`)

| Méthode | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Vérification de l'état du serveur et uptime |
| `GET` | `/api/products` | Récupère le catalogue des 5 miels avec formats (`250g`, `500g`, `1kg`), tarifs MAD et stocks |
| `GET` | `/api/products/:id` | Détail d'un produit spécifique et données de laboratoire (HMF, humidité, pureté) |
| `POST` | `/api/promo/validate` | Valide un code promo (`INOBEE10` pour -10%, `ATLAS15`) |
| `POST` | `/api/orders` | Enregistre une commande Cash on Delivery, recalcule les totaux côté serveur, génère le reçu `CMD-INB-2026-XXXXXX` et l'URL WhatsApp officielle |
| `GET` | `/api/orders/:orderId` | Consultation du statut de préparation d'une commande |

---

## 📦 Structure du Projet

```
inobee site/
├── assets/
│   ├── logo.png                     # Logo officiel de la marque Inobee SARL
│   └── img/
│       ├── product-daghmous.jpg     # Miel d'Euphorbe Sauvage
│       ├── product-thym.jpg         # Miel de Thym Pur (Zâatar)
│       ├── product-sidr.jpg         # Miel de Jujubier (Sidr Royal)
│       ├── product-oranger.jpg      # Miel d'Oranger du Souss
│       └── product-pack.jpg         # Pack Découverte Terroir (Trio)
├── App.jsx                          # Composant React principal (Storefront + Panier + Checkout)
├── main.jsx                         # Point d'entrée de montage React
├── index.html                       # HTML Template Vite avec Tailwind & Typographies
├── server.js                        # Serveur Node.js / Express REST API
├── vite.config.mjs                  # Configuration Vite avec proxy d'API
├── package.json                     # Dépendances et scripts de démarrage
└── orders.json                      # Stockage persistant des commandes passées
```

---

## 🛡️ Fonctionnalités E-Commerce Incluses
1. **Zéro Rupture Visuelle :** Fallback SVG automatique pour le logo officiel et photos de secours Unsplash haute définition sur toutes les cartes.
2. **Sélecteur de Poids Dynamique :** Choix direct `250g | 500g | 1kg` recalculant le prix instantanément.
3. **Seuil Franco de Port 400 MAD :** Jauge animée calculant le restant pour la livraison gratuite (sinon 35 MAD fixes).
4. **Validation Marocaine Stricte :** Vérification du format de numéro de mobile (`06... / 07... / 05...`) et sélection des villes marocaines.
5. **Double Action de Commande :**
   - Confirmation Cash on Delivery avec bon de commande numéroté officiel.
   - Bouton WhatsApp générant le message pré-rempli complet avec coordonnées et articles.

