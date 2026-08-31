export const CATEGORIES = [
  { id: "grocery-staples", name: "Grocery & Staples", icon: "🛒", slug: "grocery-staples", tint: "mint" },
  { id: "fruits-vegetables", name: "Fruits & Vegetables", icon: "🥦", slug: "fruits-vegetables", tint: "leaf" },
  { id: "dairy-bread-eggs", name: "Dairy, Bread & Eggs", icon: "🥛", slug: "dairy-bread-eggs", tint: "sage" },
  { id: "snacks-beverages", name: "Snacks & Beverages", icon: "🥤", slug: "snacks-beverages", tint: "lime" },
  { id: "electronics", name: "Electronics", icon: "💻", slug: "electronics", tint: "forest" },
  { id: "mobiles-tablets", name: "Mobiles & Tablets", icon: "📱", slug: "mobiles-tablets", tint: "emerald" },
  { id: "home-kitchen", name: "Home & Kitchen", icon: "🍳", slug: "home-kitchen", tint: "moss" },
  { id: "large-appliances", name: "Large Appliances", icon: "🔌", slug: "large-appliances", tint: "forest" },
  { id: "fashion", name: "Fashion", icon: "👕", slug: "fashion", tint: "leaf" },
  { id: "footwear", name: "Footwear", icon: "👟", slug: "footwear", tint: "mint" },
  { id: "beauty-personal-care", name: "Beauty & Personal Care", icon: "💄", slug: "beauty-personal-care", tint: "sage" },
  { id: "health-wellness", name: "Health & Wellness", icon: "💊", slug: "health-wellness", tint: "emerald" },
  { id: "sports-fitness", name: "Sports & Fitness", icon: "🏏", slug: "sports-fitness", tint: "lime" },
  { id: "toys-baby", name: "Toys & Baby", icon: "🧸", slug: "toys-baby", tint: "leaf" },
  { id: "books", name: "Books", icon: "📚", slug: "books", tint: "moss" },
  { id: "stationery-office", name: "Stationery & Office", icon: "✏️", slug: "stationery-office", tint: "sage" },
  { id: "pet-supplies", name: "Pet Supplies", icon: "🐶", slug: "pet-supplies", tint: "mint" },
];

export const TINT_GRADIENTS = {
  mint: { start: "#065f46", end: "#10b981", accent: "#a7f3d0" },
  leaf: { start: "#14532d", end: "#22c55e", accent: "#bbf7d0" },
  sage: { start: "#164e63", end: "#0d9488", accent: "#99f6e4" },
  lime: { start: "#3f6212", end: "#84cc16", accent: "#d9f99d" },
  forest: { start: "#022c22", end: "#059669", accent: "#6ee7b7" },
  emerald: { start: "#064e3b", end: "#10b981", accent: "#6ee7b7" },
  moss: { start: "#1c3d25", end: "#34d399", accent: "#a7f3d0" },
};

export const CATEGORY_ARTWORK = {
  "electronics": {
    strokes: ["M9 12 h30 v20 h-30 z", "M5 36 h38 l-3 5 h-32 z"],
    fills: ["M13 16 h22 v12 h-22 z"],
  },
  "mobiles-tablets": {
    strokes: ["M15 5 h18 a4 4 0 0 1 4 4 v30 a4 4 0 0 1 -4 4 h-18 a4 4 0 0 1 -4 -4 v-30 a4 4 0 0 1 4 -4 z", "M20 10 h8"],
    fills: ["M15 14 h18 v20 h-18 z"],
  },
  "fashion": {
    strokes: ["M18 6 L7 12 l4 8 4 -2 v18 h18 V18 l4 2 4 -8 -11 -6 c-1 4 -11 4 -12 0 z"],
    fills: [],
  },
  "footwear": {
    strokes: ["M7 20 v12", "M7 32 h9 l7 4 h13 c4 0 6 2 6 5 H7 z"],
    fills: [],
  },
  "home-kitchen": {
    strokes: ["M9 18 h23 v9 a9 9 0 0 1 -9 9 h-5 a9 9 0 0 1 -9 -9 z", "M32 22 h10"],
    fills: [],
  },
  "large-appliances": {
    strokes: ["M5 11 h38 v26 h-38 z", "M9 16 h21 v16 h-21 z", "M36 18 v2", "M36 25 v2"],
    fills: [],
  },
  "grocery-staples": {
    strokes: ["M11 16 h26 l3 26 h-32 z", "M18 16 a6 6 0 0 1 12 0"],
    fills: [],
  },
  "fruits-vegetables": {
    strokes: ["M24 16 c-8 -6 -16 1 -16 10 c0 10 8 18 16 18 s16 -8 16 -18 c0 -9 -8 -16 -16 -10 z", "M24 16 c1 -6 7 -9 11 -9 c0 6 -5 10 -11 9 z"],
    fills: [],
  },
  "dairy-bread-eggs": {
    strokes: ["M16 13 l8 -7 8 7 v29 h-16 z", "M16 20 h16"],
    fills: [],
  },
  "snacks-beverages": {
    strokes: ["M12 14 h24 l-3 27 h-18 z", "M23 14 l5 -10"],
    fills: ["M13 21 h22 l-1.6 14 h-19 z"],
  },
  "beauty-personal-care": {
    strokes: ["M17 21 h13 v21 h-13 z", "M20 8 l7 3 v10 h-7 z"],
    fills: ["M20 8 l7 3 v10 h-7 z"],
  },
  "health-wellness": {
    strokes: ["M13 26 l13 -13 a9 9 0 0 1 13 13 l-13 13 a9 9 0 0 1 -13 -13 z", "M19 20 l13 13"],
    fills: [],
  },
  "sports-fitness": {
    strokes: ["M13 20 h22 v8 h-22 z", "M6 17 h6 v14 h-6 z", "M36 17 h6 v14 h-6 z"],
    fills: ["M6 17 h6 v14 h-6 z", "M36 17 h6 v14 h-6 z"],
  },
  "toys-baby": {
    strokes: ["M15 7 h17 v14 h-17 z", "M8 25 h16 v16 h-16 z", "M27 25 h13 v16 h-13 z"],
    fills: ["M15 7 h17 v14 h-17 z"],
  },
  "books": {
    strokes: ["M24 13 c-4 -4 -10 -5 -17 -5 v28 c7 0 13 1 17 5 z", "M24 13 c4 -4 10 -5 17 -5 v28 c-7 0 -13 1 -17 5 z"],
    fills: [],
  },
  "stationery-office": {
    strokes: ["M10 39 l3 -10 19 -19 7 7 -19 19 z", "M29 12 l7 7", "M10 39 l6 -2"],
    fills: [],
  },
  "pet-supplies": {
    strokes: ["M24 24 c6 0 11 5 11 10 c0 4 -4 6 -11 6 s-11 -2 -11 -6 c0 -5 5 -10 11 -10 z"],
    fills: ["M13 15 a4 5 0 1 0 .1 0 z", "M35 15 a4 5 0 1 0 .1 0 z", "M20 9 a4 5 0 1 0 .1 0 z", "M28 9 a4 5 0 1 0 .1 0 z"],
  },
};

export const PRODUCTS = [
  // Grocery & Staples
  {
    id: 1,
    name: "Basmati Rice 5kg",
    category: "grocery-staples",
    price: 649,
    mrp: 799,
    stock: 55,
    rating: 4.8,
    reviews: 142,
    badge: "Bestseller",
    description: "Aged long-grain basmati that cooks fluffy and separate. Perfect for biryani, pulao, and daily meals. Comes in a resealable zip-lock pack.",
    tags: ["rice", "grain", "staple", "biryani", "pulao"]
  },
  {
    id: 2,
    name: "Whole Wheat Atta 5kg",
    category: "grocery-staples",
    price: 289,
    mrp: 350,
    stock: 60,
    rating: 4.7,
    reviews: 98,
    badge: "Under ₹500",
    description: "Chakki-fresh atta milled from 100% whole wheat with zero maida added. Yields ultra-soft, golden rotis every time.",
    tags: ["atta", "flour", "wheat", "roti"]
  },
  {
    id: 3,
    name: "Toor Dal 1kg",
    category: "grocery-staples",
    price: 179,
    mrp: 220,
    stock: 70,
    rating: 4.6,
    reviews: 84,
    badge: "Under ₹500",
    description: "Unpolished split pigeon peas, cleaned, machine sorted and packed fresh for maximum protein and natural aroma.",
    tags: ["dal", "pulses", "protein", "curry"]
  },
  {
    id: 4,
    name: "Cold Pressed Groundnut Oil 1L",
    category: "grocery-staples",
    price: 329,
    mrp: 410,
    stock: 45,
    rating: 4.9,
    reviews: 110,
    badge: "Organic",
    description: "Traditional wood-pressed (Kachi Ghani) unrefined groundnut oil. High smoke point and rich nutty flavor.",
    tags: ["oil", "cooking", "cold-pressed"]
  },
  {
    id: 5,
    name: "Pink Rock Salt 1kg",
    category: "grocery-staples",
    price: 99,
    mrp: 140,
    stock: 80,
    rating: 4.8,
    reviews: 65,
    badge: "Under ₹500",
    description: "Naturally mined Himalayan pink rock salt, coarse ground for everyday cooking and seasoning.",
    tags: ["salt", "himalayan", "mineral"]
  },
  {
    id: 6,
    name: "Pure Cane Sugar 1kg",
    category: "grocery-staples",
    price: 55,
    mrp: 70,
    stock: 90,
    rating: 4.5,
    reviews: 54,
    badge: "Under ₹500",
    description: "Fine-grain refined cane sugar, double filtered and sulphur-free. Dissolves cleanly without impurities.",
    tags: ["sugar", "sweet", "baking"]
  },

  // Fruits & Vegetables
  {
    id: 7,
    name: "Robusta Bananas (1 dozen)",
    category: "fruits-vegetables",
    price: 59,
    mrp: 80,
    stock: 100,
    rating: 4.7,
    reviews: 180,
    badge: "Farm Fresh",
    description: "Ripe robusta bananas, hand-picked from organic orchards and delivered on the same day.",
    tags: ["banana", "fruit", "potassium", "fresh"]
  },
  {
    id: 8,
    name: "Local Hybrid Tomatoes 1kg",
    category: "fruits-vegetables",
    price: 39,
    mrp: 60,
    stock: 90,
    rating: 4.6,
    reviews: 112,
    badge: "Under ₹500",
    description: "Firm local farm tomatoes, juicy and balanced acidity, ideal for daily curries, rasam, and fresh salads.",
    tags: ["tomato", "veggies", "fresh"]
  },
  {
    id: 9,
    name: "Nashik Red Onions 2kg",
    category: "fruits-vegetables",
    price: 78,
    mrp: 110,
    stock: 85,
    rating: 4.5,
    reviews: 95,
    badge: "Under ₹500",
    description: "Premium Nashik red onions, medium sized, sun cured for longer storage and punchy pungency.",
    tags: ["onion", "veggies", "staple"]
  },
  {
    id: 10,
    name: "Hydroponic Baby Spinach 250g",
    category: "fruits-vegetables",
    price: 45,
    mrp: 65,
    stock: 60,
    rating: 4.9,
    reviews: 73,
    badge: "Organic",
    description: "Tender washed baby spinach leaves, hydroponically grown without chemical pesticides.",
    tags: ["spinach", "palak", "greens", "iron"]
  },
  {
    id: 11,
    name: "Ratnagiri Alphonso Mangoes 1kg",
    category: "fruits-vegetables",
    price: 449,
    mrp: 599,
    stock: 25,
    rating: 4.9,
    reviews: 210,
    badge: "Premium",
    description: "Authentic GI-tagged Ratnagiri Alphonso mangoes, naturally ripened with sweet aromatic pulp.",
    tags: ["mango", "alphonso", "fruit", "seasonal"]
  },

  // Dairy, Bread & Eggs
  {
    id: 12,
    name: "Pasteurised Toned Milk 1L",
    category: "dairy-bread-eggs",
    price: 66,
    mrp: 72,
    stock: 120,
    rating: 4.8,
    reviews: 310,
    badge: "Daily Essential",
    description: "Homogenised toned milk, 3% fat, pasteurised and delivered chilled in sterile packaging.",
    tags: ["milk", "dairy", "calcium"]
  },
  {
    id: 13,
    name: "Whole Wheat Brown Bread 400g",
    category: "dairy-bread-eggs",
    price: 49,
    mrp: 60,
    stock: 70,
    rating: 4.6,
    reviews: 88,
    badge: "Baked Today",
    description: "Soft whole-wheat artisan loaf baked fresh this morning, zero added maida or chemical preservatives.",
    tags: ["bread", "bakery", "wheat", "breakfast"]
  },
  {
    id: 14,
    name: "Cage-Free Farm Eggs (6 pack)",
    category: "dairy-bread-eggs",
    price: 72,
    mrp: 90,
    stock: 80,
    rating: 4.8,
    reviews: 140,
    badge: "High Protein",
    description: "Antibiotic-free eggs from free-range hens, packed in a shock-proof biodegradable tray.",
    tags: ["eggs", "protein", "breakfast"]
  },
  {
    id: 15,
    name: "Fresh Cow Paneer 200g",
    category: "dairy-bread-eggs",
    price: 95,
    mrp: 120,
    stock: 50,
    rating: 4.7,
    reviews: 115,
    badge: "Under ₹500",
    description: "Fresh cow-milk paneer, soft-set and vacuum packed on the day of make for melt-in-the-mouth texture.",
    tags: ["paneer", "dairy", "cheese", "protein"]
  },

  // Snacks & Beverages
  {
    id: 16,
    name: "Kettle Masala Chips 150g",
    category: "snacks-beverages",
    price: 60,
    mrp: 75,
    stock: 100,
    rating: 4.6,
    reviews: 160,
    badge: "Crunchy",
    description: "Kettle-cooked golden potato chips tossed in a zesty Indian chaat masala blend.",
    tags: ["chips", "snacks", "masala"]
  },
  {
    id: 17,
    name: "Single Origin Dark Chocolate 55% 100g",
    category: "snacks-beverages",
    price: 199,
    mrp: 260,
    stock: 55,
    rating: 4.8,
    reviews: 92,
    badge: "Under ₹500",
    description: "Artisanal South Indian cocoa with a crisp snap, rich fruit notes and zero artificial flavouring.",
    tags: ["chocolate", "sweet", "cocoa"]
  },
  {
    id: 18,
    name: "Freeze-Dried Arabica Coffee 100g",
    category: "snacks-beverages",
    price: 385,
    mrp: 480,
    stock: 38,
    rating: 4.9,
    reviews: 134,
    badge: "Under ₹500",
    description: "100% Chikmagalur Arabica granules freeze-dried to lock in rich aroma and smooth body.",
    tags: ["coffee", "arabica", "beverage"]
  },
  {
    id: 19,
    name: "Whole Leaf Green Tea Bags (25)",
    category: "snacks-beverages",
    price: 249,
    mrp: 320,
    stock: 42,
    rating: 4.7,
    reviews: 80,
    badge: "Under ₹500",
    description: "Darjeeling whole-leaf green tea in pyramid mesh bags, individually foil wrapped for freshness.",
    tags: ["tea", "green-tea", "antioxidant"]
  },

  // Electronics
  {
    id: 20,
    name: "Wireless ANC Headphones",
    category: "electronics",
    price: 2499,
    mrp: 4999,
    stock: 25,
    rating: 4.7,
    reviews: 320,
    badge: "50% OFF",
    description: "Over-ear Bluetooth 5.3 headphones with 35dB active noise cancellation, deep bass mode and 30-hour battery life.",
    tags: ["headphones", "bluetooth", "audio", "anc"]
  },
  {
    id: 21,
    name: "Mechanical Keyboard 75%",
    category: "electronics",
    price: 3799,
    mrp: 5499,
    stock: 14,
    rating: 4.9,
    reviews: 195,
    badge: "Top Rated",
    description: "Hot-swappable 75% mechanical keyboard with tactile brown switches, pre-lubed stabilizers, and per-key RGB backlighting.",
    tags: ["keyboard", "gaming", "mechanical", "rgb"]
  },
  {
    id: 22,
    name: "7-in-1 USB-C Hub Adapter",
    category: "electronics",
    price: 1599,
    mrp: 2499,
    stock: 40,
    rating: 4.6,
    reviews: 110,
    badge: "Must Have",
    description: "Aluminum multiport hub with 4K HDMI, 100W Power Delivery pass-through, dual USB 3.0 ports, and SD/TF card slots.",
    tags: ["hub", "usb-c", "accessories", "laptop"]
  },
  {
    id: 23,
    name: "Smart AMOLED Fitness Band",
    category: "electronics",
    price: 1899,
    mrp: 2999,
    stock: 30,
    rating: 4.5,
    reviews: 240,
    badge: "Trending",
    description: "1.47-inch AMOLED curved touch display, continuous SpO2 and 24/7 heart-rate monitoring, 14-day battery and 5ATM water resistance.",
    tags: ["smartband", "fitness", "watch", "health"]
  },
  {
    id: 24,
    name: "Portable NVMe SSD 1TB",
    category: "electronics",
    price: 6499,
    mrp: 9999,
    stock: 12,
    rating: 4.9,
    reviews: 86,
    badge: "Lightning Fast",
    description: "Pocket-sized rugged external SSD with up to 1050 MB/s read/write speeds, drop resistance, and 256-bit AES hardware encryption.",
    tags: ["ssd", "storage", "fast", "backup"]
  },

  // Mobiles & Tablets
  {
    id: 25,
    name: "Smartphone 5G 128GB",
    category: "mobiles-tablets",
    price: 18999,
    mrp: 22999,
    stock: 15,
    rating: 4.8,
    reviews: 430,
    badge: "New 5G",
    description: "6.7-inch 120Hz FHD+ AMOLED screen, 50MP Sony OIS triple camera, Octa-Core 5G chipset, 5000mAh battery with 45W turbo charging.",
    tags: ["phone", "5g", "smartphone", "camera"]
  },
  {
    id: 26,
    name: "20000mAh Dual-Port Power Bank",
    category: "mobiles-tablets",
    price: 1899,
    mrp: 2799,
    stock: 35,
    rating: 4.7,
    reviews: 290,
    badge: "Fast Charge",
    description: "Dual output 22.5W two-way fast charging with digital LED power percentage display and multi-protection circuitry.",
    tags: ["powerbank", "charger", "battery"]
  },
  {
    id: 27,
    name: "9H Tempered Glass Guard (Pack of 2)",
    category: "mobiles-tablets",
    price: 249,
    mrp: 499,
    stock: 90,
    rating: 4.6,
    reviews: 175,
    badge: "Under ₹500",
    description: "Ultra-clear 9H hardness tempered screen protector with oleophobic smudge resistance and auto-alignment tray.",
    tags: ["screen-guard", "protection", "glass"]
  },

  // Home & Kitchen
  {
    id: 28,
    name: "Handcrafted Ceramic Mug 350ml",
    category: "home-kitchen",
    price: 399,
    mrp: 599,
    stock: 60,
    rating: 4.8,
    reviews: 95,
    badge: "Under ₹500",
    description: "Stoneware coffee mug with soothing matte reactive glaze. Microwave, oven and dishwasher safe.",
    tags: ["mug", "ceramic", "coffee", "kitchen"]
  },
  {
    id: 29,
    name: "Borosilicate French Press 600ml",
    category: "home-kitchen",
    price: 1249,
    mrp: 1799,
    stock: 18,
    rating: 4.7,
    reviews: 62,
    badge: "Coffee Lover",
    description: "Heat-resistant borosilicate glass carafe with a 4-level stainless steel mesh plunger for sediment-free brewing.",
    tags: ["coffee-maker", "french-press", "kitchen"]
  },
  {
    id: 30,
    name: "Insulated Steel Flask 1L",
    category: "home-kitchen",
    price: 899,
    mrp: 1299,
    stock: 40,
    rating: 4.8,
    reviews: 154,
    badge: "24h Cold",
    description: "Triple-walled 304 food-grade stainless steel flask that retains beverages icy cold for 24 hours or piping hot for 14 hours.",
    tags: ["bottle", "flask", "steel", "hydration"]
  },

  // Large Appliances
  {
    id: 31,
    name: "Digital Air Fryer 4L",
    category: "large-appliances",
    price: 5499,
    mrp: 8999,
    stock: 14,
    rating: 4.8,
    reviews: 210,
    badge: "Healthy Cook",
    description: "Rapid 360° air circulation technology for 90% less oil frying. Touch LED screen with 8 one-touch preset cooking modes.",
    tags: ["air-fryer", "cooking", "appliance"]
  },
  {
    id: 32,
    name: "Heavy Duty Mixer Grinder 750W",
    category: "large-appliances",
    price: 3299,
    mrp: 4999,
    stock: 16,
    rating: 4.6,
    reviews: 180,
    badge: "5-Yr Warranty",
    description: "Copper wound motor with 3 stainless steel jars, pulse speed control, overload protection and anti-skid rubber feet.",
    tags: ["mixer", "grinder", "kitchen-appliance"]
  },

  // Fashion & Footwear
  {
    id: 33,
    name: "Combed Cotton Crew T-Shirt",
    category: "fashion",
    price: 699,
    mrp: 999,
    stock: 80,
    rating: 4.7,
    reviews: 160,
    badge: "100% Cotton",
    description: "220 GSM breathable combed cotton tee with reinforced ribbed neckband and pre-shrunk bio-wash fabric.",
    tags: ["tshirt", "fashion", "clothing"]
  },
  {
    id: 34,
    name: "Lightweight Breathable Running Shoes",
    category: "footwear",
    price: 2999,
    mrp: 4499,
    stock: 24,
    rating: 4.8,
    reviews: 135,
    badge: "Comfort Fit",
    description: "Engineered mesh upper with responsive EVA midsole cushioning and high-abrasion rubber outsole.",
    tags: ["shoes", "running", "footwear", "sports"]
  },

  // Beauty & Health
  {
    id: 35,
    name: "Vitamin C Radiance Face Serum 30ml",
    category: "beauty-personal-care",
    price: 649,
    mrp: 899,
    stock: 40,
    rating: 4.9,
    reviews: 220,
    badge: "Dermatologist Tested",
    description: "10% stabilized ethyl ascorbic acid with multi-molecular hyaluronic acid and ferulic acid for radiant, clear skin.",
    tags: ["skincare", "serum", "beauty", "vitamin-c"]
  },
  {
    id: 36,
    name: "100% Pure Whey Protein Isolate 1kg",
    category: "health-wellness",
    price: 2899,
    mrp: 3899,
    stock: 18,
    rating: 4.9,
    reviews: 310,
    badge: "24g Protein/Scoop",
    description: "Fast-absorbing micro-filtered whey protein isolate enriched with digestive DigeZyme enzymes. Rich Belgian chocolate flavour.",
    tags: ["protein", "whey", "fitness", "health"]
  },

  // Books & Stationery
  {
    id: 37,
    name: "Atomic Habits by James Clear",
    category: "books",
    price: 599,
    mrp: 799,
    stock: 35,
    rating: 4.9,
    reviews: 580,
    badge: "#1 International Bestseller",
    description: "An easy and proven framework for improving every day, breaking bad habits, and mastering tiny behaviors that lead to remarkable results.",
    tags: ["book", "self-help", "reading"]
  },
  {
    id: 38,
    name: "A5 Hardcover Dotted Journal",
    category: "stationery-office",
    price: 399,
    mrp: 599,
    stock: 45,
    rating: 4.8,
    reviews: 112,
    badge: "Under ₹500",
    description: "160 GSM thick bleed-proof bamboo paper, 192 numbered pages, lay-flat 180° Smyth-sewn binding with dual ribbon bookmarks.",
    tags: ["notebook", "journal", "stationery"]
  },

  // Sports & Pet
  {
    id: 39,
    name: "High Density Eco Yoga Mat 6mm",
    category: "sports-fitness",
    price: 1199,
    mrp: 1899,
    stock: 28,
    rating: 4.8,
    reviews: 94,
    badge: "Non-Slip",
    description: "Dual-layer eco-friendly TPE yoga mat with laser-etched body alignment lines and complimentary cotton carry strap.",
    tags: ["yoga", "fitness", "workout"]
  },
  {
    id: 40,
    name: "Nutritious Dog Food 3kg",
    category: "pet-supplies",
    price: 1249,
    mrp: 1599,
    stock: 20,
    rating: 4.7,
    reviews: 78,
    badge: "Vet Approved",
    description: "Real chicken and brown rice formula enriched with Omega 3 & 6 fatty acids for healthy digestion and glossy coat.",
    tags: ["pet", "dog", "food"]
  }
];
