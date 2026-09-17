/**
 * LUMÉRA BEAUTY — PRODUCT DATABASE
 * Complete realistic dataset of 50 beauty, cosmetics, skincare, haircare, and fragrance products.
 */

const products = [
  // --- MAKEUP (1-10) ---
  {
    id: 1,
    name: "Luminous Silk Liquid Foundation",
    category: "Makeup",
    subCategory: "Face Care",
    brand: "Luméra",
    price: 1499,
    oldPrice: 1999,
    discount: 25,
    rating: 4.9,
    reviews: 320,
    stock: 24,
    badge: "Best Seller",
    description: "A lightweight, medium-to-full buildable liquid foundation that delivers a radiant, second-skin satin finish with 16-hour hydration and weightless wear.",
    ingredients: "Aqua, Dimethicone, Hyaluronic Acid, Niacinamide, Camellia Sinensis Leaf Extract, Vitamin E, Titanium Dioxide, Iron Oxides.",
    benefits: "Hydrates skin, evens complexion, blurs pores, breathable 16-hour wear, resistant to humidity and creasing.",
    usage: "Shake well before use. Dispense 1-2 pumps onto the back of your hand. Blend seamlessly from the center of the face outward using a brush, sponge, or fingertips.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["01 Warm Ivory", "02 Natural Beige", "03 Honey Amber", "04 Deep Caramel"],
    sizes: ["30 ml", "50 ml"]
  },
  {
    id: 2,
    name: "Velvet Cloud Matte Lipstick",
    category: "Makeup",
    subCategory: "Lip Care",
    brand: "Luméra",
    price: 20,
    oldPrice: 999,
    discount: 20,
    rating: 4.8,
    reviews: 412,
    stock: 35,
    badge: "Trending",
    description: "An ultra-creamy, non-drying matte lipstick infused with jojoba oil and vitamin E for velvety, transfer-resistant color that feels feather-light.",
    ingredients: "Octyldodecanol, Candelilla Wax, Jojoba Seed Oil, Shea Butter, Vitamin E, Tocopheryl Acetate, Pigments.",
    benefits: "Rich pigmentation in a single swipe, intensely moisturizing matte formula, 8-hour wear without flaking.",
    usage: "Apply directly from the bullet to the center of your lips and blend outward. Layer for richer depth and intensity.",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Ruby Noir", "Rose Blush", "Petal Nude", "Berry Luxe", "Terracotta Gold"],
    sizes: ["3.8 g"]
  },
  {
    id: 3,
    name: "Celestial 18-Color Eyeshadow Palette",
    category: "Makeup",
    subCategory: "Eye Makeup",
    brand: "Luméra Luxe",
    price: 1899,
    oldPrice: 2499,
    discount: 24,
    rating: 4.9,
    reviews: 188,
    stock: 15,
    badge: "Best Seller",
    description: "Eighteen buttery, high-impact matte, shimmer, and multichrome pigments inspired by twilight galaxies and golden hour radiance.",
    ingredients: "Mica, Talc, Zinc Stearate, Squalane, Synthetic Fluorphlogopite, Dimethicone, Silica, Phenoxyethanol.",
    benefits: "Zero fallout, ultra-blendable velvety texture, intense color payoff with multi-dimensional shimmer.",
    usage: "Use a fluffy blending brush for soft transitional shades and a flat shader brush or finger for metallic foils.",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["22 g Palette"]
  },
  {
    id: 4,
    name: "Precision Waterproof Gel Eyeliner",
    category: "Makeup",
    subCategory: "Eye Makeup",
    brand: "Luméra",
    price: 499,
    oldPrice: 699,
    discount: 28,
    rating: 4.7,
    reviews: 156,
    stock: 40,
    badge: "Hot",
    description: "An ultra-pigmented, glide-on gel eyeliner pencil that locks in place for 24-hour smudge-proof, tear-proof definition.",
    ingredients: "Isododecane, Polyethylene, Cyclopentasiloxane, Carnauba Wax, Carbon Black, Iron Oxides.",
    benefits: "Waterproof, transfer-proof, ultra-smooth glide, ophthalmologist tested, safe for waterline.",
    usage: "Glide along the upper and lower lash lines. Smudge within 30 seconds for a smoky effect before it sets.",
    image: "https://images.unsplash.com/photo-1597225244660-1cd128c64284?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1597225244660-1cd128c64284?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Jet Black", "Espresso Brown", "Midnight Emerald", "Sapphire Blue"],
    sizes: ["1.2 g"]
  },
  {
    id: 5,
    name: "Volumizing Panoramic Lash Mascara",
    category: "Makeup",
    subCategory: "Eye Makeup",
    brand: "Luméra",
    price: 649,
    oldPrice: 849,
    discount: 23,
    rating: 4.8,
    reviews: 289,
    stock: 28,
    badge: "Top Rated",
    description: "Infused with peptides and panthenol, this hourglass curved brush amplifies lash volume by 300% without clumps or flaking.",
    ingredients: "Water, Beeswax, Acacia Senegal Gum, Stearic Acid, Palmitic Acid, Panthenol, Biotinoyl Tripeptide-1.",
    benefits: "Lifts, curls, and dramatically volumizes every single lash with deep carbon pigments.",
    usage: "Position wand horizontally at lash base and wiggle upward through tips. Repeat for false-lash drama.",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["10 ml"]
  },
  {
    id: 6,
    name: "Silk Feather Translucent Setting Powder",
    category: "Makeup",
    subCategory: "Face Care",
    brand: "Luméra Studio",
    price: 999,
    oldPrice: 1299,
    discount: 23,
    rating: 4.8,
    reviews: 142,
    stock: 20,
    badge: "Essential",
    description: "Micro-milled blurring setting powder that mattifies shine, diffuses fine lines, and extends makeup wear for 18 hours with zero flashback.",
    ingredients: "Talc-Free Cornstarch, Silica, Rice Starch, Silk Amino Acids, Vitamin C Ester.",
    benefits: "Invisible finish on all skin tones, photo-ready zero flashback, absorbs excess sebum all day.",
    usage: "Dust lightly over T-zone using a plush velour puff or fluffy powder brush to lock makeup in place.",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["20 g"]
  },
  {
    id: 7,
    name: "Glow Beam Liquid Highlighter Drops",
    category: "Makeup",
    subCategory: "Face Care",
    brand: "Luméra",
    price: 849,
    oldPrice: 1099,
    discount: 22,
    rating: 4.9,
    reviews: 210,
    stock: 22,
    badge: "Trending",
    description: "Concentrated illuminating elixirs with light-reflecting micro-pearls that deliver an ethereal glass-skin radiance without glitter chunks.",
    ingredients: "Isododecane, Mica, Jojoba Oil, Rosehip Seed Oil, Sunflower Seed Oil, Pearl Powder.",
    benefits: "Customizable dewy sheen, mixable with moisturizer or foundation, non-sticky and weightless.",
    usage: "Dot onto high points of cheekbones, brow bones, cupid's bow, or mix 2 drops into foundation.",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Champagne Quartz", "Rose Gold Elixir", "Golden Bronze"],
    sizes: ["15 ml"]
  },
  {
    id: 8,
    name: "Petal Soft Cream Blush Stick",
    category: "Makeup",
    subCategory: "Face Care",
    brand: "Luméra",
    price: 699,
    oldPrice: 899,
    discount: 22,
    rating: 4.7,
    reviews: 175,
    stock: 30,
    badge: "New",
    description: "A nourishing multi-use cream color stick that melts effortlessly into cheeks and lips for a fresh, lit-from-within flush.",
    ingredients: "Castor Seed Oil, Candelilla Wax, Mango Butter, Vitamin E, Sweet Almond Oil, Natural Mica.",
    benefits: "Hydrating dewy wash of color, blendable with fingers on the go, non-comedogenic.",
    usage: "Swipe directly onto cheek apples or lips and tap gently with fingertips to blend seamlessly.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Peach Sunrise", "Dusty Rose", "Spiced Terracotta", "Berry Velvet"],
    sizes: ["8 g"]
  },
  {
    id: 9,
    name: "Micro-Sculpt Dual Eyebrow Pencil",
    category: "Makeup",
    subCategory: "Eye Makeup",
    brand: "Luméra",
    price: 449,
    oldPrice: 599,
    discount: 25,
    rating: 4.6,
    reviews: 130,
    stock: 45,
    badge: "Popular",
    description: "Ultra-fine 1.5mm tip mimics natural hair strokes paired with a built-in spoolie brush for softly sculpted, natural arch definition.",
    ingredients: "Hydrogenated Soybean Oil, Carnauba Wax, Synthetic Wax, Zinc Stearate, Iron Oxides.",
    benefits: "Hair-like precise strokes, smudge-resistant wax formula, lasts all day.",
    usage: "Use short, upward strokes to fill sparse brow areas. Soften and blend using the custom spoolie end.",
    image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Soft Brown", "Dark Espresso", "Taupe Ash", "Natural Charcoal"],
    sizes: ["0.08 g"]
  },
  {
    id: 10,
    name: "Hydra-Gloss Plumping Lip Oil",
    category: "Makeup",
    subCategory: "Lip Care",
    brand: "Luméra",
    price: 599,
    oldPrice: 799,
    discount: 25,
    rating: 4.9,
    reviews: 380,
    stock: 50,
    badge: "Best Seller",
    description: "Richly glazed, non-sticky lip oil infused with peptide plumping spheres and botanical cherry seed extract for glassy mirror shine.",
    ingredients: "Polybutene, Cherry Seed Oil, Jojoba Oil, Tripeptide-1, Menthol, Vitamin E, Flavor.",
    benefits: "Instant volumizing plump effect, deeply conditions chapped lips, mirror-like glass shine.",
    usage: "Glide plush doe-foot applicator generously over bare lips or layer over lip liner or lipstick.",
    image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Cherry Glaze", "Honey Peach", "Clear Crystal", "Rosy Quartz"],
    sizes: ["6 ml"]
  },

  // --- SKINCARE (11-20) ---
  {
    id: 11,
    name: "Radiance Glow Vitamin C + Niacinamide Serum",
    category: "Skincare",
    subCategory: "Face Care",
    brand: "Luméra Derm",
    price: 899,
    oldPrice: 1299,
    discount: 30,
    rating: 4.9,
    reviews: 540,
    stock: 32,
    badge: "Best Seller",
    description: "A clinical-strength 15% Vitamin C (Ethyl Ascorbic Acid) + 5% Niacinamide serum that fades hyperpigmentation, restores luminosity, and firms skin.",
    ingredients: "Aqua, 3-O-Ethyl Ascorbic Acid, Niacinamide, Ferulic Acid, Hyaluronic Acid, Centella Asiatica, Allantoin.",
    benefits: "Fades dark spots in 14 days, protects against free radical damage, boosts collagen synthesis.",
    usage: "Apply 3-4 drops onto clean, dry face and neck every morning. Follow with moisturizer and sunscreen SPF 50.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608248597359-0098f98642aa?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["30 ml", "50 ml"]
  },
  {
    id: 12,
    name: "Multi-Molecular Hyaluronic Acid Hydrating Serum",
    category: "Skincare",
    subCategory: "Face Care",
    brand: "Luméra Derm",
    price: 749,
    oldPrice: 999,
    discount: 25,
    rating: 4.8,
    reviews: 310,
    stock: 25,
    badge: "Trending",
    description: "Contains 5 distinct molecular weights of Hyaluronic Acid + Provitamin B5 to penetrate all epidermis layers for 72-hour deep moisture plump.",
    ingredients: "Aqua, Sodium Hyaluronate Cross-Polymer, Hydrolyzed Hyaluronic Acid, Panthenol, Glycerin, Beta-Glucan.",
    benefits: "Intense 72-hour moisture reservoir, plumps fine dehydration lines, smooths skin elasticity.",
    usage: "Dispense 3 drops onto damp skin morning and night before applying creams or facial oils.",
    image: "https://images.unsplash.com/photo-1608248597359-0098f98642aa?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1608248597359-0098f98642aa?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["30 ml"]
  },
  {
    id: 13,
    name: "Ceramide Barrier Restorative Night Cream",
    category: "Skincare",
    subCategory: "Face Care",
    brand: "Luméra Derm",
    price: 1199,
    oldPrice: 1599,
    discount: 25,
    rating: 4.9,
    reviews: 265,
    stock: 18,
    badge: "Best Seller",
    description: "Rich, soothing overnight moisturizer formulated with 5 essential ceramides, squalane, and cica to repair damaged skin barriers while you sleep.",
    ingredients: "Water, Squalane, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Centella Asiatica, Shea Butter.",
    benefits: "Strengthens skin moisture barrier, prevents trans-epidermal water loss, calms redness and irritation.",
    usage: "Warm a dime-sized amount between clean fingertips and massage gently into face and neck every evening.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["50 g", "100 g"]
  },
  {
    id: 14,
    name: "Gentle Matcha Oat Balancing Cleanser",
    category: "Skincare",
    subCategory: "Face Care",
    brand: "Luméra Botanical",
    price: 549,
    oldPrice: 749,
    discount: 26,
    rating: 4.8,
    reviews: 198,
    stock: 40,
    badge: "Popular",
    description: "A pH 5.5 sulfate-free foaming jelly cleanser packed with Japanese green tea extract and colloidal oat to dissolve impurities without stripping.",
    ingredients: "Camellia Sinensis (Matcha) Leaf Water, Colloidal Oatmeal, Coco-Glucoside, Glycerin, Chamomile Extract.",
    benefits: "Gently removes makeup, dirt, and pollution while maintaining healthy skin microbiome balance.",
    usage: "Massage 1-2 pumps onto damp face in circular motions for 60 seconds. Rinse thoroughly with lukewarm water.",
    image: "https://images.unsplash.com/photo-1556228722-d9b3be35a926?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228722-d9b3be35a926?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["150 ml"]
  },
  {
    id: 15,
    name: "Pure Retinol 0.5% Night Renewal Elixir",
    category: "Skincare",
    subCategory: "Face Care",
    brand: "Luméra Derm",
    price: 1299,
    oldPrice: 1699,
    discount: 23,
    rating: 4.7,
    reviews: 215,
    stock: 20,
    badge: "Hot",
    description: "Micro-encapsulated pure retinol combined with peptide peptides and bakuchiol to stimulate cellular turnover, soften deep wrinkles, and refine pore texture.",
    ingredients: "Caprylic/Capric Triglyceride, Squalane, Retinol, Bakuchiol, Palmitoyl Tripeptide-38, Vitamin E, Bisabolol.",
    benefits: "Smooths fine lines, speeds skin renewal, refines texture without classic retinol redness or peeling.",
    usage: "Use 2-3 nights per week initially. Apply 2-3 drops at night to clean, dry skin. Follow with a rich barrier cream.",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["30 ml"]
  },
  {
    id: 16,
    name: "Ultra-Light Invisible Sunscreen Gel SPF 50+ PA++++",
    category: "Skincare",
    subCategory: "Face Care",
    brand: "Luméra Derm",
    price: 699,
    oldPrice: 899,
    discount: 22,
    rating: 4.9,
    reviews: 620,
    stock: 55,
    badge: "Best Seller",
    description: "Next-generation water-burst gel sunscreen that leaves zero white cast, zero grease, and shields against UVA, UVB, and blue light.",
    ingredients: "Aqua, Tinosorb S, Uvinul A Plus, Hyaluronic Acid, Cica Extract, Green Tea, Silica.",
    benefits: "Broad spectrum SPF 50+ PA++++, invisible finish, non-comedogenic, perfect makeup primer.",
    usage: "Apply generously as the final step of your morning skincare routine 15 minutes before sun exposure. Reapply every 2 hours.",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["50 g", "100 g"]
  },
  {
    id: 17,
    name: "AHA 7% + BHA 2% Peeling Glow Solution",
    category: "Skincare",
    subCategory: "Face Care",
    brand: "Luméra Derm",
    price: 649,
    oldPrice: 849,
    discount: 23,
    rating: 4.8,
    reviews: 310,
    stock: 28,
    badge: "Trending",
    description: "An exfoliating facial serum with Glycolic, Lactic, and Salicylic acids formulated with Tasmanian pepperberry to exfoliate pore congestion and unveil baby-soft glow.",
    ingredients: "Glycolic Acid, Aqua, Aloe Barbadensis Leaf Water, Salicylic Acid, Lactic Acid, Pepperberry Extract.",
    benefits: "Unclogs stubborn blackheads, clears dead skin flakes, promotes luminous uniform skin tone.",
    usage: "Apply evenly across face and neck using fingertips on clean, dry skin. Leave on for no more than 10 minutes. Rinse with warm water.",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["30 ml"]
  },
  {
    id: 18,
    name: "Caffeine 5% + Peptides Under-Eye Awakening Cream",
    category: "Skincare",
    subCategory: "Face Care",
    brand: "Luméra Derm",
    price: 799,
    oldPrice: 1099,
    discount: 27,
    rating: 4.8,
    reviews: 240,
    stock: 24,
    badge: "Hot",
    description: "A cooling depuffing eye cream with high-solubility caffeine, Matrixyl 3000, and green tea EGCG to visibly reduce morning puffiness and dark circles.",
    ingredients: "Aqua, Caffeine, Maltodextrin, Glycerin, Epigallocatechin Gallatyl Glucoside, Palmitoyl Oligopeptide.",
    benefits: "Depuffs tired under-eyes in 10 minutes, lightens stubborn genetic dark circles, cools with metal applicator.",
    usage: "Gently tap a rice-grain amount around eye contours morning and night using your ring finger.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["15 ml"]
  },
  {
    id: 19,
    name: "Damask Rose Hydrating Face Mist & Toner",
    category: "Skincare",
    subCategory: "Face Care",
    brand: "Luméra Botanical",
    price: 499,
    oldPrice: 699,
    discount: 28,
    rating: 4.7,
    reviews: 165,
    stock: 38,
    badge: "Pure",
    description: "100% steam-distilled pure organic Bulgarian Damask rose water with witch hazel and glycerin for instant refreshing hydration anytime.",
    ingredients: "Rosa Damascena Flower Distillate, Hamamelis Virginiana (Witch Hazel) Extract, Vegetable Glycerin, Sodium Benzoate.",
    benefits: "Balances skin pH, tightens appearance of pores, calms redness, provides dewy mid-day refresh.",
    usage: "Mist generously over face after cleansing or throughout the day over makeup to rehydrate.",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["100 ml", "200 ml"]
  },
  {
    id: 20,
    name: "Overnight Berry Lip Sleeping Butter Mask",
    category: "Skincare",
    subCategory: "Lip Care",
    brand: "Luméra",
    price: 449,
    oldPrice: 599,
    discount: 25,
    rating: 4.9,
    reviews: 430,
    stock: 45,
    badge: "Best Seller",
    description: "An intensive leave-on lip treatment that melts away dead flakes overnight with a blend of berry fruit extracts, murmuru butter, and vitamin C.",
    ingredients: "Diisostearyl Malate, Murumuru Seed Butter, Raspberry Extract, Strawberry Extract, Hyaluronic Acid, Vitamin C.",
    benefits: "Transforms dry, cracked lips into soft, pillow-plump lips overnight.",
    usage: "Before sleeping, apply an ample amount onto lips using the spatula. Gently wipe clean or let absorb by morning.",
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["20 g"]
  },

  // --- HAIRCARE (21-28) ---
  {
    id: 21,
    name: "Argan & Keratin Deep Repair Hair Mask",
    category: "Haircare",
    subCategory: "Hair Treatment",
    brand: "Luméra Hair Lab",
    price: 999,
    oldPrice: 1399,
    discount: 28,
    rating: 4.9,
    reviews: 310,
    stock: 22,
    badge: "Best Seller",
    description: "Intensive salon-grade restorative treatment enriched with cold-pressed Moroccan Argan Oil and hydrolyzed keratin to rebuild broken bonds.",
    ingredients: "Aqua, Argania Spinosa Kernel Oil, Hydrolyzed Keratin, Shea Butter, Cetearyl Alcohol, Behentrimonium Chloride, Panthenol.",
    benefits: "Repairs heat & chemical damage, eliminates frizz, delivers silk softness and glossy bounce.",
    usage: "After shampooing, apply generously from mid-lengths to ends. Leave for 7-10 minutes, then rinse thoroughly with cool water.",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["250 ml", "500 ml"]
  },
  {
    id: 22,
    name: "Rosemary & Biotin Scalp Growth Stimulating Oil",
    category: "Haircare",
    subCategory: "Scalp Care",
    brand: "Luméra Botanical",
    price: 699,
    oldPrice: 899,
    discount: 22,
    rating: 4.9,
    reviews: 580,
    stock: 35,
    badge: "Trending",
    description: "Pure rosemary essential oil infused with biotin, amla, and castor oil to awaken dormant hair follicles and drastically reduce hair fall.",
    ingredients: "Rosmarinus Officinalis Leaf Oil, Biotin, Castor Seed Oil, Amla Extract, Sweet Almond Oil, Jojoba Oil, Peppermint Oil.",
    benefits: "Accelerates hair growth, thickens thinning edges, soothes dry itchy scalp.",
    usage: "Part hair into sections and apply 3-5 drops directly to scalp. Massage gently for 5 minutes. Leave on for 2 hours or overnight.",
    image: "https://images.unsplash.com/photo-1608248597359-0098f98642aa?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1608248597359-0098f98642aa?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["50 ml", "100 ml"]
  },
  {
    id: 23,
    name: "Sulfate-Free Biotin Volume Shampoo",
    category: "Haircare",
    subCategory: "Shampoo",
    brand: "Luméra Hair Lab",
    price: 649,
    oldPrice: 849,
    discount: 23,
    rating: 4.7,
    reviews: 215,
    stock: 30,
    badge: "Popular",
    description: "Cleanses fine, limp hair without stripping natural oils, delivering instant root lift and lightweight volume with provitamin B5.",
    ingredients: "Water, Sodium Cocoyl Isethionate, Biotin, Hydrolyzed Wheat Protein, Aloe Vera Leaf Juice, Polyquaternium-10.",
    benefits: "Boosts volume by 40%, gentle on color-treated hair, promotes root density.",
    usage: "Massage into wet scalp to create a rich luxurious lather. Rinse thoroughly and follow with Volume Conditioner.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["300 ml"]
  },
  {
    id: 24,
    name: "Silk Protein Leave-In Smoothing Conditioner",
    category: "Haircare",
    subCategory: "Conditioner",
    brand: "Luméra Hair Lab",
    price: 599,
    oldPrice: 799,
    discount: 25,
    rating: 4.8,
    reviews: 180,
    stock: 25,
    badge: "Essential",
    description: "Weightless leave-in conditioner spray with silk amino acids and UV filters to detangle, smooth flyaways, and protect from 450°F heat.",
    ingredients: "Aqua, Hydrolyzed Silk, Amodimethicone, Panthenol, Cetrimonium Chloride, Argan Oil, Fragrance.",
    benefits: "Protects up to 450°F heat, instant detangler, prevents split ends and humidity frizz.",
    usage: "Spray evenly throughout damp hair prior to blow drying or heat styling. Do not rinse out.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["200 ml"]
  },
  {
    id: 25,
    name: "Glass Shine Finishing Hair Serum",
    category: "Haircare",
    subCategory: "Hair Serum",
    brand: "Luméra Hair Lab",
    price: 749,
    oldPrice: 999,
    discount: 25,
    rating: 4.9,
    reviews: 295,
    stock: 28,
    badge: "Best Seller",
    description: "Ultra-lightweight non-greasy hair polish infused with Camellia seed oil and liquid crystal polymers for mirror-finish salon gloss.",
    ingredients: "Cyclopentasiloxane, Dimethiconol, Camellia Japonica Seed Oil, Macadamia Nut Oil, Vitamin E.",
    benefits: "Gives luminous mirror gloss, tames stubborn static, seals cuticles without weighing hair down.",
    usage: "Rub 1-2 pumps between palms and stroke through dry hair from mid-lengths to ends.",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["50 ml"]
  },
  {
    id: 26,
    name: "Detoxifying Sea Salt Scalp Scrub",
    category: "Haircare",
    subCategory: "Scalp Care",
    brand: "Luméra Botanical",
    price: 849,
    oldPrice: 1099,
    discount: 22,
    rating: 4.7,
    reviews: 140,
    stock: 18,
    badge: "New",
    description: "Purifying pre-wash scalp exfoliator with mineral-rich Brittany sea salt, tea tree oil, and apple cider vinegar to sweep away product buildup.",
    ingredients: "Maris Sal (Sea Salt), Sodium Lauroyl Methyl Isethionate, Tea Tree Leaf Oil, Apple Cider Vinegar, Peppermint.",
    benefits: "Clears dandruff, cleanses stubborn dry shampoo buildup, revitalizes scalp oxygenation.",
    usage: "Apply a tablespoon to wet scalp once weekly. Massage gently with fingertips until salt crystals dissolve into foam, then rinse.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["200 g"]
  },
  {
    id: 27,
    name: "Curl Defining Hydration Cream",
    category: "Haircare",
    subCategory: "Styling",
    brand: "Luméra Hair Lab",
    price: 699,
    oldPrice: 899,
    discount: 22,
    rating: 4.8,
    reviews: 165,
    stock: 20,
    badge: "Trending",
    description: "Botanical flaxseed and coconut curl enhancer that locks in moisture, springs curls into definition, and provides touchable crunch-free hold.",
    ingredients: "Aqua, Linum Usitatissimum (Flaxseed) Extract, Coconut Oil, Shea Butter, Polyquaternium-37, Aloe Juice.",
    benefits: "Defines waves, curls, and coils; prevents shrinkage; locks in hydration for 48 hours.",
    usage: "Rake generously through soaking wet hair in sections, scrunch upward, and air dry or diffuse.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["200 ml"]
  },
  {
    id: 28,
    name: "Purple Brass-Busting Toning Shampoo",
    category: "Haircare",
    subCategory: "Shampoo",
    brand: "Luméra Hair Lab",
    price: 799,
    oldPrice: 999,
    discount: 20,
    rating: 4.8,
    reviews: 190,
    stock: 15,
    badge: "Hot",
    description: "Richly pigmented violet toning shampoo that neutralizes brassy yellow tones in blonde, silver, and highlighted hair.",
    ingredients: "Aqua, Sodium Laureth Sulfate, CI 60730 (Acid Violet 43), Hydrolyzed Keratin, Chamomile Extract.",
    benefits: "Maintains icy cool blonde tones, revitalizes highlights, enriches silver brilliance.",
    usage: "Lather into wet hair, leave on for 3-5 minutes depending on desired cool toning intensity, then rinse.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["250 ml"]
  },

  // --- FRAGRANCE (29-35) ---
  {
    id: 29,
    name: "Rose Oud Étoile Eau de Parfum",
    category: "Fragrance",
    subCategory: "Perfume",
    brand: "Luméra Haute Parfumerie",
    price: 2499,
    oldPrice: 3299,
    discount: 24,
    rating: 5.0,
    reviews: 210,
    stock: 12,
    badge: "Luxury",
    description: "A decadent, intoxicating symphony of Turkish damask rose, smoky Cambodian oud, golden amber resin, and velvety praline vanilla.",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Rosa Damascena, Aquilaria Agallocha (Oud) Oil, Benzyl Salicylate, Limonene.",
    benefits: "Long-lasting 12+ hour sillage, master perfumer crafted, unisex statement scent.",
    usage: "Spray on pulse points: wrists, inner elbows, base of the neck, and behind earlobes.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["50 ml", "100 ml"]
  },
  {
    id: 30,
    name: "Soleil Blanc Bergamot & Coconut Parfum",
    category: "Fragrance",
    subCategory: "Perfume",
    brand: "Luméra Haute Parfumerie",
    price: 2199,
    oldPrice: 2899,
    discount: 24,
    rating: 4.9,
    reviews: 175,
    stock: 16,
    badge: "Trending",
    description: "An addictive solar floral fragrance capturing the endless warmth of sunlit private Mediterranean beaches with bergamot, coconut milk, and ylang-ylang.",
    ingredients: "Alcohol Denat., Fragrance, Citrus Bergamia Peel Oil, Cananga Odorata, Coumarin, Linalool.",
    benefits: "Uplifting warm solar notes, all-day projection, evokes sun-drenched coastal luxury.",
    usage: "Spritz onto pulse points or mist into hair for a subtle, long-lasting aura.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["50 ml", "100 ml"]
  },
  {
    id: 31,
    name: "Santale Mystique Pure Extrait",
    category: "Fragrance",
    subCategory: "Perfume",
    brand: "Luméra Haute Parfumerie",
    price: 2799,
    oldPrice: 3499,
    discount: 20,
    rating: 4.9,
    reviews: 135,
    stock: 10,
    badge: "Exclusive",
    description: "Creamy Mysore sandalwood enveloped with cardamom spice, papyrus, violet accord, and warm leather.",
    ingredients: "Alcohol Denat., Santalum Album Wood Oil, Cardamom Oil, Iso E Super, Oakmoss Extract.",
    benefits: "High 30% pure perfume oil concentration for 24-hour persistence and magnetic sophistication.",
    usage: "Apply 2 sprays to collarbones and wrists for refined subtle presence.",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["50 ml"]
  },
  {
    id: 32,
    name: "Velvet Vanilla Gourmand Eau de Parfum",
    category: "Fragrance",
    subCategory: "Perfume",
    brand: "Luméra",
    price: 1699,
    oldPrice: 2199,
    discount: 22,
    rating: 4.8,
    reviews: 320,
    stock: 25,
    badge: "Best Seller",
    description: "Warm bourbon vanilla beans, caramelized sugar, spun marshmallow, and soft white musk in a dreamy comforting blend.",
    ingredients: "Alcohol Denat., Vanilla Planifolia Fruit Extract, Musk Ketone, Ethyl Maltol, Benzyl Benzoate.",
    benefits: "Deliciously cozy gourmand aroma that garners endless compliments throughout the day.",
    usage: "Spray onto clothing, neck, and behind knees for a warm, enveloping cloud.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["100 ml"]
  },
  {
    id: 33,
    name: "Fleur de Jasmin Shimmer Body & Hair Mist",
    category: "Fragrance",
    subCategory: "Body Mist",
    brand: "Luméra",
    price: 699,
    oldPrice: 899,
    discount: 22,
    rating: 4.7,
    reviews: 185,
    stock: 35,
    badge: "Trending",
    description: "A lightweight fine fragrance mist with crushed jasmine sambac, pear blossom, and micro-fine golden shimmer sparkles.",
    ingredients: "Aqua, Alcohol Denat., Jasminum Officinale Extract, Mica, Titanium Dioxide, Fragrance.",
    benefits: "Refreshes skin with sensual floral scent while leaving an ethereal sparkling glow.",
    usage: "Shake bottle well to suspend gold shimmer. Mist all over body, décolletage, and hair.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["150 ml"]
  },
  {
    id: 34,
    name: "Noir Vetiver & Cedarwood Cologne",
    category: "Fragrance",
    subCategory: "Men's Grooming",
    brand: "Luméra Men",
    price: 1899,
    oldPrice: 2499,
    discount: 24,
    rating: 4.9,
    reviews: 145,
    stock: 20,
    badge: "Hot",
    description: "Earthy Haitian vetiver, crisp Italian grapefruit, Atlas cedarwood, and spicy black pepper for modern masculine confidence.",
    ingredients: "Alcohol Denat., Vetiveria Zizanoides Root Oil, Cedrus Atlantica Bark Oil, Citrus Paradisi Peel Oil.",
    benefits: "Sophisticated crisp woodsy fragrance suited for boardroom and evening black-tie occasions.",
    usage: "Apply 2-3 sprays to warm chest and neck areas after grooming.",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["100 ml"]
  },
  {
    id: 35,
    name: "Citrus Blossom & Neroli Pocket Travel Spray",
    category: "Fragrance",
    subCategory: "Travel",
    brand: "Luméra",
    price: 499,
    oldPrice: 649,
    discount: 23,
    rating: 4.8,
    reviews: 110,
    stock: 45,
    badge: "Essential",
    description: "Energizing sparkling orange blossom, Mediterranean neroli, and white tea in a leak-proof gold travel atomizer.",
    ingredients: "Alcohol Denat., Citrus Aurantium Flower Oil, Camellia Sinensis Leaf Extract, Fragrance.",
    benefits: "TSA-approved pocket size, instant mood booster on busy commute or travel.",
    usage: "Spritz whenever you need an invigorating aromatic boost throughout the day.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["15 ml"]
  },

  // --- BODY CARE (36-40) ---
  {
    id: 36,
    name: "Whipped Golden Shea & Monoi Body Butter",
    category: "Body Care",
    subCategory: "Body Moisturizer",
    brand: "Luméra Body",
    price: 799,
    oldPrice: 1099,
    discount: 27,
    rating: 4.9,
    reviews: 290,
    stock: 30,
    badge: "Best Seller",
    description: "Fluffy, air-whipped organic raw shea butter infused with Polynesian Monoi flower oil and sweet almond butter for 48-hour velvety skin.",
    ingredients: "Butyrospermum Parkii (Shea) Butter, Gardenia Taitensis (Monoi) Flower Extract, Sweet Almond Oil, Cocoa Butter, Vitamin E.",
    benefits: "Heals extreme dry skin and cracked elbows, absorbs quickly with zero greasy film, leaves irresistible tropical aroma.",
    usage: "Massage generously over slightly damp body after shower or bath to lock in deep hydration.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["200 g", "400 g"]
  },
  {
    id: 37,
    name: "Himalayan Pink Salt & Coffee Glow Scrub",
    category: "Body Care",
    subCategory: "Body Exfoliator",
    brand: "Luméra Body",
    price: 649,
    oldPrice: 849,
    discount: 23,
    rating: 4.8,
    reviews: 215,
    stock: 25,
    badge: "Trending",
    description: "Finely ground Arabica coffee beans combined with mineral-rich Himalayan pink crystals and cold-pressed coconut oil to buff away dullness.",
    ingredients: "Coffea Arabica Seed Powder, Sodium Chloride (Pink Salt), Cocos Nucifera Oil, Vitamin E, Brown Sugar.",
    benefits: "Stimulates lymphatic drainage, diminishes the look of cellulite and strawberry legs, smooths keratosis pilaris.",
    usage: "In the shower, massage in circular motions onto wet skin, focusing on dry rough areas. Rinse thoroughly.",
    image: "https://images.unsplash.com/photo-1556228722-d9b3be35a926?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228722-d9b3be35a926?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["250 g"]
  },
  {
    id: 38,
    name: "Luxe Golden Shimmer Dry Body Oil",
    category: "Body Care",
    subCategory: "Body Oil",
    brand: "Luméra Body",
    price: 899,
    oldPrice: 1199,
    discount: 25,
    rating: 4.9,
    reviews: 340,
    stock: 28,
    badge: "Hot",
    description: "A fast-absorbing multi-usage dry oil infused with precious camellia, macadamia, and golden micro-pearls for sun-kissed satin glow.",
    ingredients: "Coco-Caprylate, Macadamia Integrifolia Seed Oil, Camellia Seed Oil, Synthetic Fluorphlogopite, Iron Oxides.",
    benefits: "Immediate radiant shimmer on collarbones, legs, and arms without staining clothing or feeling sticky.",
    usage: "Shake bottle well. Apply onto legs, arms, and décolleté for an irresistible goddess glow.",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["100 ml"]
  },
  {
    id: 39,
    name: "Rose & Niacinamide Brightening Body Wash",
    category: "Body Care",
    subCategory: "Body Wash",
    brand: "Luméra Body",
    price: 549,
    oldPrice: 699,
    discount: 21,
    rating: 4.7,
    reviews: 170,
    stock: 35,
    badge: "Essential",
    description: "Lathering gel cleanser with pure French rose extract, 2% Niacinamide, and vitamin B5 to brighten body discoloration and soften skin texture.",
    ingredients: "Aqua, Sodium Cocoyl Glycinate, Niacinamide, Rosa Centifolia Flower Water, Panthenol, Glycerin.",
    benefits: "Even tone across back and shoulders, clears body acne gently, deeply hydrates during cleanse.",
    usage: "Dispense onto loofah or washcloth, work into creamy lather, massage over body, and rinse.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["300 ml"]
  },
  {
    id: 40,
    name: "Ceramide Hand & Cuticle Recovery Balm",
    category: "Body Care",
    subCategory: "Nail Care",
    brand: "Luméra Body",
    price: 399,
    oldPrice: 499,
    discount: 20,
    rating: 4.8,
    reviews: 195,
    stock: 50,
    badge: "Popular",
    description: "Intensive repair hand treatment formulated with ceramides, colloidal oats, and lanolin to heal dry, washed hands and strengthen brittle cuticles.",
    ingredients: "Aqua, Ceramide NP, Colloidal Oat, Lanolin, Shea Butter, Sweet Almond Oil, Beeswax.",
    benefits: "Protects hands through 5 handwashes, non-greasy absorption, softens rough ragged cuticles.",
    usage: "Massage a pea-sized amount into hands, nails, and cuticles as often as needed throughout the day.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["75 ml"]
  },

  // --- LIP CARE (41-45) ---
  {
    id: 41,
    name: "Peptide Glaze Hydrating Lip Balm SPF 30",
    category: "Lip Care",
    subCategory: "Lip Balm",
    brand: "Luméra",
    price: 399,
    oldPrice: 499,
    discount: 20,
    rating: 4.9,
    reviews: 320,
    stock: 45,
    badge: "Best Seller",
    description: "Daily lip defense balm packed with tripeptides, cupuacu butter, and chemical UV filters to plump and shield lips from photo-aging.",
    ingredients: "Octyldodecanol, Theobroma Grandiflorum Butter, Palmitoyl Tripeptide-1, Homosalate, Avobenzone, Vitamin E.",
    benefits: "Broad spectrum SPF 30 lip protection, prevents sun-induced lip hyperpigmentation, high-gloss dewy glaze.",
    usage: "Apply liberally to lips 15 minutes before sun exposure and reapply every 2 hours or after eating.",
    image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Vanilla Glaze", "Watermelon Dew", "Salted Caramel"],
    sizes: ["10 ml"]
  },
  {
    id: 42,
    name: "Brown Sugar Lip Polish Exfoliator",
    category: "Lip Care",
    subCategory: "Lip Scrub",
    brand: "Luméra",
    price: 349,
    oldPrice: 449,
    discount: 22,
    rating: 4.7,
    reviews: 180,
    stock: 40,
    badge: "Essential",
    description: "Gentle edible brown sugar crystals blended with cold-pressed jojoba and meadowfoam seed oil to gently buff away chapped flakes.",
    ingredients: "Sucrose (Brown Sugar), Simmondsia Chinensis Seed Oil, Meadowfoam Seed Oil, Shea Butter, Vanilla Extract.",
    benefits: "Smooths dry chapped lips instantly for flawless lipstick application.",
    usage: "Gently massage a small amount onto damp lips in circular motions for 30 seconds. Wipe clean with a warm damp cloth.",
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["15 g"]
  },
  {
    id: 43,
    name: "Tinted Moisture Lip Tint Stain",
    category: "Lip Care",
    subCategory: "Lip Tint",
    brand: "Luméra",
    price: 499,
    oldPrice: 649,
    discount: 23,
    rating: 4.8,
    reviews: 260,
    stock: 38,
    badge: "Trending",
    description: "A water-gel lip stain that delivers juicy popsicle color that stains lips for up to 12 hours without transferring onto cups or masks.",
    ingredients: "Aqua, Glycerin, Hydroxyethyl Acrylate, Fragrance, Red 28, Red 33, Squalane.",
    benefits: "Mask-proof 12-hour stain, natural gradient look, moisturizing watery feel.",
    usage: "Dot onto the center of your lips and quickly blend outward with a fingertip for a youthful just-bitten popsicle stain.",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Cherry Pop", "Peach Sorbet", "Berry Bloom"],
    sizes: ["5 ml"]
  },
  {
    id: 44,
    name: "Collagen & Hyaluronic Volumizing Lip Plumper",
    category: "Lip Care",
    subCategory: "Lip Plumper",
    brand: "Luméra",
    price: 549,
    oldPrice: 749,
    discount: 26,
    rating: 4.7,
    reviews: 190,
    stock: 30,
    badge: "Hot",
    description: "Formulated with marine collagen microspheres and natural capsicum extract to visibly plump lips up to 25% within 5 minutes.",
    ingredients: "Polyisobutene, Marine Collagen, Capsicum Frutescens Fruit Extract, Ginger Root Oil, Hyaluronic Acid.",
    benefits: "Immediate volume enhancement, boosts natural lip pinkness, plumps vertical lip lines.",
    usage: "Apply sparingly to clean, dry lips. A warm tingling sensation is normal and indicates active plumping.",
    image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["6 ml"]
  },
  {
    id: 45,
    name: "Restorative Botanical Lip Rescue Serum",
    category: "Lip Care",
    subCategory: "Lip Serum",
    brand: "Luméra Botanical",
    price: 599,
    oldPrice: 799,
    discount: 25,
    rating: 4.8,
    reviews: 140,
    stock: 26,
    badge: "Pure",
    description: "Potent botanical elixir with organic sea buckthorn oil, squalane, and calendula to reverse chronic lip dryness and bleeding cracks.",
    ingredients: "Hippophae Rhamnoides (Sea Buckthorn) Fruit Oil, Squalane, Calendula Officinalis Extract, Bisabolol, Vitamin E.",
    benefits: "Accelerates tissue healing, reinforces delicate lip barrier, soothing anti-inflammatory action.",
    usage: "Dispense 1 drop onto clean lips morning and night before balms or lipsticks.",
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["10 ml"]
  },

  // --- BEAUTY TOOLS & GIFT SETS (46-50) ---
  {
    id: 46,
    name: "100% Natural Xiuyan Rose Quartz Facial Roller & Gua Sha Set",
    category: "Beauty Tools",
    subCategory: "Facial Sculpting",
    brand: "Luméra Rituals",
    price: 1299,
    oldPrice: 1799,
    discount: 28,
    rating: 4.9,
    reviews: 380,
    stock: 20,
    badge: "Best Seller",
    description: "Handcrafted authentic Grade-A Rose Quartz stone roller and heart-shaped gua sha tool to sculpt jawline, drain lymphatic fluid, and relieve tension.",
    ingredients: "100% Genuine Natural Rose Quartz Crystal, Zinc Alloy Frame.",
    benefits: "Contours face contours, relieves facial muscle stress, enhances absorption of serums and face oils.",
    usage: "Apply 4 drops of facial oil. Glide roller and Gua Sha tool in upward and outward strokes along cheeks, jaw, and neck.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["2-Piece Luxury Gift Box"]
  },
  {
    id: 47,
    name: "Professional 12-Piece Rose Gold Vegan Makeup Brush Set",
    category: "Beauty Tools",
    subCategory: "Makeup Brushes",
    brand: "Luméra Studio",
    price: 1999,
    oldPrice: 2799,
    discount: 29,
    rating: 5.0,
    reviews: 295,
    stock: 18,
    badge: "Best Seller",
    description: "Ultra-plush cruelty-free synthetic Taklon bristles engineered to pick up powder, cream, and liquid formulas with zero shedding.",
    ingredients: "Synthetic Taklon Fibers, Recycled Birchwood Handles, Rose Gold Copper Ferrules, Vegan Leather Travel Case.",
    benefits: "Airbrushed finish, hypoallergenic and antibacterial bristles, includes full face and eye brush collection with travel pouch.",
    usage: "Use specific brushes for foundation, powder, contour, blush, blending, and eyeliner precision.",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["12-Piece Set + Case"]
  },
  {
    id: 48,
    name: "Sonic Micro-Pulse Silicone Facial Cleansing Device",
    category: "Beauty Tools",
    subCategory: "Cleansing Device",
    brand: "Luméra Tech",
    price: 1699,
    oldPrice: 2299,
    discount: 26,
    rating: 4.8,
    reviews: 190,
    stock: 15,
    badge: "Trending",
    description: "IPX7 100% waterproof medical-grade silicone facial brush delivering 8,000 T-Sonic pulsations per minute to remove 99.5% of dirt, oil, and makeup.",
    ingredients: "FDA-Grade Antibacterial Silicone, Rechargeable Lithium Polymer Battery, Gold Plated Charging Base.",
    benefits: "Deep pore purification, gentle on sensitive skin, 300 uses per single USB charge.",
    usage: "Apply cleanser to wet face. Turn on device, select speed, and glide in circular motions for 1 minute.",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Blush Pink", "Lavender Frost", "Mint Emerald"],
    sizes: ["USB Device"]
  },
  {
    id: 49,
    name: "Luméra Golden Glow Bridal & Festive Gift Box",
    category: "Gift Sets",
    subCategory: "Gift Box",
    brand: "Luméra Luxe",
    price: 3499,
    oldPrice: 4999,
    discount: 30,
    rating: 5.0,
    reviews: 240,
    stock: 10,
    badge: "Exclusive",
    description: "An opulent gift collection featuring our iconic Radiance Glow Serum, Rose Oud Eau de Parfum (50ml), Rose Gold Liquid Highlighter, and Silk Sleep Mask.",
    ingredients: "Full-size products curated in a luxury gold-embossed keepsake magnetic box.",
    benefits: "The ultimate luxury present for weddings, anniversaries, birthdays, and festive celebrations.",
    usage: "Complete 4-step radiance ritual for day and evening glam.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["4-Piece Luxury Hamper"]
  },
  {
    id: 50,
    name: "Men's Charcoal & Sandalwood Grooming Essentials Kit",
    category: "Men's Grooming",
    subCategory: "Gift Set",
    brand: "Luméra Men",
    price: 1899,
    oldPrice: 2499,
    discount: 24,
    rating: 4.9,
    reviews: 175,
    stock: 22,
    badge: "Trending",
    description: "Complete 4-step men's grooming set containing Activated Charcoal Face Wash (100ml), Sandalwood Beard & Face Oil (50ml), Cedar Cologne (50ml), and Wooden Comb.",
    ingredients: "Activated Bamboo Charcoal, Sandalwood Oil, Jojoba Oil, Cedarwood Extract, Organic Aloe.",
    benefits: "Purifies skin, softens coarse beard hair, smells deeply woodsy and sophisticated.",
    usage: "Wash face morning and night, massage 4 drops of beard oil into facial hair, and finish with cologne.",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["4-Piece Kit"]
  }
];

// Helper functions to query products
function getAllProducts() {
  return products;
}

function getProductById(id) {
  return products.find(p => p.id === parseInt(id, 10));
}

function getProductsByCategory(categoryName) {
  return products.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
}

function getFeaturedProducts(limit = 8) {
  return products.slice(0, limit);
}

function getBestSellers(limit = 8) {
  return products.filter(p => p.badge === "Best Seller" || p.rating >= 4.9).slice(0, limit);
}

function getNewArrivals(limit = 8) {
  return products.filter(p => p.badge === "New" || p.badge === "Trending" || p.id > 35).slice(0, limit);
}

function getOfferProducts() {
  return products.filter(p => p.discount >= 24);
}
