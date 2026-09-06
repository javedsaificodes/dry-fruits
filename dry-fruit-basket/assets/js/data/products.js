/**
 * Product catalog for Dry Fruit Basket.
 *
 * This is the single source of truth for every product shown on the site
 * (home page, shop page, search results and the cart). Every page renders
 * its product cards from this array instead of hard-coded markup, so
 * updating a price or adding a product only needs to happen here.
 *
 * image paths are relative to the SITE ROOT (no leading "../"). Use
 * Utils.asset(path) when rendering an <img src> so it resolves correctly
 * whether the current page lives at the root or inside /pages/.
 */
const PRODUCTS = [
  {
    id: "kaju-w320",
    name: "Premium Cashews (Kaju W320)",
    category: "dry-fruits",
    image: "assets/img/dry-fruits/kaju.png",
    description: "Whole, hand-sorted W320 grade cashews with a rich, buttery flavour. Roasted lightly and packed fresh.",
    rating: 4.6,
    reviews: 214,
    badge: "Bestseller",
    tags: ["cashew", "kaju", "nuts"],
    variants: [
      { weight: "100 g", price: 179, mrp: 220 },
      { weight: "250 g", price: 399, mrp: 499 },
      { weight: "500 g", price: 749, mrp: 899 }
    ]
  },
  {
    id: "almonds-california",
    name: "California Almonds",
    category: "dry-fruits",
    image: "assets/img/dry-fruits/almonds.png",
    description: "Premium quality California almonds, rich in protein and healthy fats. Perfect for daily snacking.",
    rating: 4.7,
    reviews: 302,
    badge: "Bestseller",
    tags: ["almond", "badam", "nuts"],
    variants: [
      { weight: "100 g", price: 149, mrp: 189 },
      { weight: "250 g", price: 349, mrp: 429 },
      { weight: "500 g", price: 649, mrp: 799 }
    ]
  },
  {
    id: "walnuts-kashmiri",
    name: "Kashmiri Walnuts (Akhrot)",
    category: "dry-fruits",
    image: "assets/img/dry-fruits/akhrot.png",
    description: "Light-coloured, premium walnut kernels sourced from Kashmir. Great source of Omega-3.",
    rating: 4.5,
    reviews: 156,
    tags: ["walnut", "akhrot", "nuts"],
    variants: [
      { weight: "100 g", price: 199, mrp: 249 },
      { weight: "250 g", price: 549, mrp: 699 },
      { weight: "500 g", price: 999, mrp: 1249 }
    ]
  },
  {
    id: "pista-turkish",
    name: "Turkish Pistachios (Pista)",
    category: "dry-fruits",
    image: "assets/img/dry-fruits/pista.png",
    description: "Roasted and lightly salted pistachios, imported from Turkey. Crunchy and flavourful.",
    rating: 4.6,
    reviews: 121,
    badge: "New",
    tags: ["pista", "pistachio", "nuts"],
    variants: [
      { weight: "100 g", price: 249, mrp: 299 },
      { weight: "250 g", price: 699, mrp: 899 }
    ]
  },
  {
    id: "kismish-golden",
    name: "Golden Raisins (Kismish)",
    category: "dry-fruits",
    image: "assets/img/dry-fruits/kismish.png",
    description: "Naturally sweet, seedless golden raisins. A wholesome addition to desserts and cereals.",
    rating: 4.4,
    reviews: 98,
    tags: ["raisin", "kismish", "kishmish"],
    variants: [
      { weight: "100 g", price: 89, mrp: 110 },
      { weight: "250 g", price: 199, mrp: 249 },
      { weight: "500 g", price: 369, mrp: 449 }
    ]
  },
  {
    id: "anjir-afghani",
    name: "Afghani Anjir (Dried Figs)",
    category: "dry-fruits",
    image: "assets/img/dry-fruits/anjir.png",
    description: "Soft, naturally sweet dried figs imported from Afghanistan. Rich in fibre.",
    rating: 4.5,
    reviews: 87,
    tags: ["fig", "anjir"],
    variants: [
      { weight: "100 g", price: 259, mrp: 319 },
      { weight: "250 g", price: 649, mrp: 799 }
    ]
  },
  {
    id: "mix-dryfruits",
    name: "Mixed Dry Fruits",
    category: "dry-fruits",
    image: "assets/img/dry-fruits/mix-dryfruits.png",
    description: "A hand-picked blend of almonds, cashews, walnuts, pistachios and raisins.",
    rating: 4.7,
    reviews: 176,
    badge: "Bestseller",
    tags: ["mix", "combo", "assorted"],
    variants: [
      { weight: "250 g", price: 449, mrp: 549 },
      { weight: "500 g", price: 799, mrp: 999 },
      { weight: "1 kg", price: 1499, mrp: 1849 }
    ]
  },
  {
    id: "dryfruit-gift-combo",
    name: "Dry Fruit Gift Combo",
    category: "dry-fruits",
    image: "assets/img/dry-fruits/dryFruit-combo.png",
    description: "An elegantly packed festive gift box with a curated selection of premium dry fruits.",
    rating: 4.8,
    reviews: 64,
    badge: "New",
    tags: ["gift", "combo", "hamper"],
    variants: [
      { weight: "500 g", price: 899, mrp: 1099 },
      { weight: "1 kg", price: 1599, mrp: 1949 }
    ]
  },
  {
    id: "trail-mix",
    name: "Premium Trail Mix",
    category: "dry-fruits",
    image: "assets/img/dry-fruits/trail.jpg",
    description: "A crunchy mix of roasted nuts, seeds and dried berries — a healthy on-the-go snack.",
    rating: 4.3,
    reviews: 55,
    tags: ["trail mix", "snack"],
    variants: [
      { weight: "200 g", price: 299, mrp: 349 },
      { weight: "400 g", price: 549, mrp: 649 }
    ]
  },
  {
    id: "gift-potlis",
    name: "Assorted Gift Potlis (Set of 5)",
    category: "dry-fruits",
    image: "assets/img/dry-fruits/potlis.png",
    description: "Five decorative potlis filled with assorted dry fruits — ideal for festive gifting.",
    rating: 4.6,
    reviews: 39,
    tags: ["gift", "potli", "festive"],
    variants: [
      { weight: "Set of 5", price: 999, mrp: 1199 }
    ]
  },
  {
    id: "kesar-saffron",
    name: "Pure Kesar (Saffron)",
    category: "dry-fruits",
    image: "assets/img/dry-fruits/kesar.png",
    description: "Hand-picked, deep red Kashmiri kesar strands with an intense aroma.",
    rating: 4.9,
    reviews: 41,
    tags: ["saffron", "kesar", "spice"],
    variants: [
      { weight: "1 g", price: 349, mrp: 399 },
      { weight: "2 g", price: 649, mrp: 749 }
    ]
  },
  {
    id: "elaichi-cardamom",
    name: "Green Cardamom (Elaichi)",
    category: "dry-fruits",
    image: "assets/img/dry-fruits/elaichi.png",
    description: "Aromatic, bold green cardamom pods — perfect for tea, desserts and everyday cooking.",
    rating: 4.5,
    reviews: 33,
    tags: ["cardamom", "elaichi", "spice"],
    variants: [
      { weight: "100 g", price: 249, mrp: 299 },
      { weight: "250 g", price: 549, mrp: 649 }
    ]
  },
  {
    id: "pumpkin-seeds",
    name: "Pumpkin Seeds",
    category: "seeds",
    image: "assets/img/seed1.jpg",
    description: "Raw, unsalted pumpkin seeds, a great source of magnesium and zinc.",
    rating: 4.4,
    reviews: 72,
    tags: ["pumpkin seed", "seeds"],
    variants: [
      { weight: "100 g", price: 99, mrp: 129 },
      { weight: "250 g", price: 249, mrp: 299 }
    ]
  },
  {
    id: "sunflower-seeds",
    name: "Sunflower Seeds",
    category: "seeds",
    image: "assets/img/seed2.jpg",
    description: "Lightly roasted sunflower seeds, rich in vitamin E.",
    rating: 4.3,
    reviews: 58,
    tags: ["sunflower seed", "seeds"],
    variants: [
      { weight: "100 g", price: 79, mrp: 99 },
      { weight: "250 g", price: 199, mrp: 249 }
    ]
  },
  {
    id: "chia-seeds",
    name: "Chia Seeds",
    category: "seeds",
    image: "assets/img/seed3.jpg",
    description: "Premium quality chia seeds, packed with fibre and Omega-3 fatty acids.",
    rating: 4.6,
    reviews: 91,
    badge: "Bestseller",
    tags: ["chia", "seeds"],
    variants: [
      { weight: "100 g", price: 129, mrp: 159 },
      { weight: "200 g", price: 229, mrp: 279 }
    ]
  },
  {
    id: "flax-seeds",
    name: "Flax Seeds",
    category: "seeds",
    image: "assets/img/seed4.jpg",
    description: "Roasted flax seeds (alsi) — a fibre-rich addition to smoothies and salads.",
    rating: 4.2,
    reviews: 47,
    tags: ["flax", "alsi", "seeds"],
    variants: [
      { weight: "100 g", price: 79, mrp: 99 },
      { weight: "200 g", price: 149, mrp: 179 }
    ]
  },
  {
    id: "dates-medjool",
    name: "Medjool Dates",
    category: "dates",
    image: "assets/img/dates1.jpg",
    description: "Large, soft and caramel-sweet Medjool dates — often called the 'king of dates'.",
    rating: 4.8,
    reviews: 189,
    badge: "Bestseller",
    tags: ["dates", "medjool", "khajur"],
    variants: [
      { weight: "250 g", price: 349, mrp: 429 },
      { weight: "500 g", price: 599, mrp: 749 }
    ]
  },
  {
    id: "dates-ajwa",
    name: "Ajwa Dates",
    category: "dates",
    image: "assets/img/dates2.jpg",
    description: "Premium Ajwa dates from Madinah, soft-textured with a rich, distinctive flavour.",
    rating: 4.7,
    reviews: 112,
    tags: ["dates", "ajwa", "khajur"],
    variants: [
      { weight: "250 g", price: 449, mrp: 549 },
      { weight: "500 g", price: 899, mrp: 1099 }
    ]
  },
  {
    id: "dates-kimia",
    name: "Kimia Dates",
    category: "dates",
    image: "assets/img/dates3.jpg",
    description: "Soft, glossy Kimia dates from Iran with a naturally rich sweetness.",
    rating: 4.5,
    reviews: 64,
    tags: ["dates", "kimia", "khajur"],
    variants: [
      { weight: "250 g", price: 249, mrp: 309 },
      { weight: "500 g", price: 449, mrp: 549 }
    ]
  },
  {
    id: "dates-safawi",
    name: "Safawi Dates",
    category: "dates",
    image: "assets/img/dates4.jpg",
    description: "Dark, soft Safawi dates from Madinah with a deep, molasses-like sweetness.",
    rating: 4.6,
    reviews: 53,
    tags: ["dates", "safawi", "khajur"],
    variants: [
      { weight: "250 g", price: 299, mrp: 369 },
      { weight: "500 g", price: 549, mrp: 649 }
    ]
  },
  {
    id: "nuts-berries-mix",
    name: "Mixed Nuts & Berries",
    category: "nuts-berries",
    image: "assets/img/nuts-and-berries1.jpg",
    description: "A vibrant mix of roasted nuts and dried berries — sweet, tart and crunchy.",
    rating: 4.5,
    reviews: 84,
    badge: "New",
    tags: ["nuts", "berries", "mix"],
    variants: [
      { weight: "200 g", price: 349, mrp: 429 },
      { weight: "400 g", price: 649, mrp: 799 }
    ]
  },
  {
    id: "cranberries-dried",
    name: "Dried Cranberries",
    category: "nuts-berries",
    image: "assets/img/cranberry.avif",
    description: "Tangy-sweet dried cranberries — great in salads, trail mixes and baking.",
    rating: 4.4,
    reviews: 69,
    tags: ["cranberry", "berries"],
    variants: [
      { weight: "200 g", price: 299, mrp: 359 },
      { weight: "400 g", price: 549, mrp: 649 }
    ]
  },
  {
    id: "blueberries-dried",
    name: "Dried Blueberries",
    category: "nuts-berries",
    image: "assets/img/blue-barry.avif",
    description: "Naturally sweet dried blueberries, packed with antioxidants.",
    rating: 4.6,
    reviews: 45,
    tags: ["blueberry", "berries"],
    variants: [
      { weight: "150 g", price: 399, mrp: 479 },
      { weight: "300 g", price: 729, mrp: 869 }
    ]
  },
  {
    id: "black-currants-dried",
    name: "Dried Black Currants",
    category: "nuts-berries",
    image: "assets/img/black-currant.avif",
    description: "Small, dark and richly flavoured dried black currants.",
    rating: 4.3,
    reviews: 28,
    tags: ["black currant", "berries"],
    variants: [
      { weight: "200 g", price: 349, mrp: 419 },
      { weight: "400 g", price: 629, mrp: 749 }
    ]
  }
];

/** Category metadata used to build nav links, tabs and shop filters. */
const CATEGORIES = [
  { slug: "dry-fruits", label: "Dry Fruits", icon: "assets/img/s1.svg" },
  { slug: "seeds", label: "Seeds", icon: "assets/img/s2.svg" },
  { slug: "dates", label: "Dates", icon: "assets/img/s3.svg" },
  { slug: "nuts-berries", label: "Nuts & Berries", icon: "assets/img/s4.svg" }
];

function getProductById(id) {
  return PRODUCTS.find(function (p) { return p.id === id; });
}

function getProductsByCategory(slug) {
  return PRODUCTS.filter(function (p) { return p.category === slug; });
}
