import { ElementType } from 'react'
import { GiCandleLight } from 'react-icons/gi'
import { MdBed, MdOutlineCoffee } from 'react-icons/md'
import { PiFlower } from 'react-icons/pi'

// ─── Types ────────────────────────────────────────────────────────────────────

export type Category = 'Beddings' | 'Home Décor' | 'Candles' | 'Crockery'

export type ProductColor = { name: string; hex: string }

export type Product = {
    id: number
    slug: string
    name: string
    category: Category
    price: number
    originalPrice?: number
    rating: number
    reviews: number
    tag?: 'Best Seller' | 'Top Rated' | 'New In' | 'Fan Favourite'
    description: string
    details: string[]
    careInstructions: string
    sizes?: string[]
    colors?: ProductColor[]
    bgFrom: string
    bgTo: string
    accentColor: string
    // FIX: `icon` removed from Product — functions can't be serialized across
    //      the Server → Client Component boundary (causes Next.js 500 error).
    //      Resolve the icon client-side via CATEGORY_ICONS[product.category].
    isBestSeller?: boolean
}

// ─── Icon Map ─────────────────────────────────────────────────────────────────
// Import this in CLIENT components only, never pass it through server props.

export const CATEGORY_ICONS: Record<Category, ElementType> = {
    Beddings: MdBed,
    'Home Décor': PiFlower,
    Candles: GiCandleLight,
    Crockery: MdOutlineCoffee,
}

// ─── All Products ─────────────────────────────────────────────────────────────

export const products: Product[] = [
    // ── BEDDINGS ──────────────────────────────────────────────────────────────
    {
        id: 1,
        slug: 'ivory-cloud-duvet-set',
        name: 'Ivory Cloud Duvet Set',
        category: 'Beddings',
        price: 4800,
        originalPrice: 6200,
        rating: 4.9,
        reviews: 234,
        tag: 'Best Seller',
        isBestSeller: true,
        description:
        'Sink into unmatched softness with our Ivory Cloud Duvet Set, crafted from 300-thread-count Egyptian cotton. The breathable weave regulates temperature through every season, while the subtle ivory tone brings a timeless elegance to any bedroom. Each set includes a duvet cover and two matching pillowcases.',
        details: [
        '300-thread-count Egyptian cotton',
        'Breathable & temperature-regulating',
        'Hidden button closure',
        'Machine washable at 40°C',
        'Available in Twin, Queen, and King',
        'OEKO-TEX certified fabric',
        'Includes 1 duvet cover + 2 pillowcases',
        ],
        careInstructions:
        'Machine wash cold with like colors. Tumble dry low. Do not bleach. Iron on medium heat if needed. Avoid fabric softeners to preserve the natural fiber quality.',
        sizes: ['Twin (152×218 cm)', 'Queen (200×218 cm)', 'King (230×218 cm)'],
        colors: [
        { name: 'Ivory', hex: '#F5EFE2' },
        { name: 'Linen', hex: '#D4C0A0' },
        { name: 'Slate', hex: '#8A9BA8' },
        ],
        bgFrom: '#D4C0A0',
        bgTo: '#BFA882',
        accentColor: '#C9A86C',
    },
    {
        id: 2,
        slug: 'linen-dream-pillowcase-pair',
        name: 'Linen Dream Pillowcase Pair',
        category: 'Beddings',
        price: 1800,
        rating: 4.7,
        reviews: 187,
        description:
        'Pure stonewashed linen pillowcases that get softer with every wash. The relaxed, lived-in texture of French linen adds artisanal charm to your bedscape while remaining cool to the touch through warm nights. Sold as a pair.',
        details: [
        '100% French stonewashed linen',
        'Envelope closure — no zips or buttons',
        'Pre-washed for softness',
        'Gets softer with each wash',
        'Naturally hypoallergenic',
        'Fits standard 50×75 cm pillows',
        ],
        careInstructions:
        'Machine wash at 40°C. Tumble dry low. Iron slightly damp on linen setting. The natural wrinkles are part of the character — embrace them.',
        sizes: ['Standard (50×75 cm)', 'King (50×90 cm)'],
        colors: [
        { name: 'Oat', hex: '#D8CCBA' },
        { name: 'Dusty Rose', hex: '#C9A08A' },
        { name: 'Charcoal', hex: '#4A4A4A' },
        ],
        bgFrom: '#C8B89A',
        bgTo: '#B8A880',
        accentColor: '#8B7355',
    },
    {
        id: 3,
        slug: 'bamboo-silk-flat-sheet',
        name: 'Bamboo Silk Flat Sheet',
        category: 'Beddings',
        price: 3200,
        originalPrice: 3900,
        rating: 4.8,
        reviews: 145,
        tag: 'New In',
        description:
        'A fusion of bamboo and mulberry silk, this flat sheet feels impossibly smooth against the skin. Naturally antibacterial, moisture-wicking, and temperature-smart, it transforms a simple bedtime into a luxury experience. The subtle sheen catches the light beautifully.',
        details: [
        '70% Bamboo, 30% Mulberry Silk blend',
        'Naturally antibacterial',
        'Moisture-wicking and breathable',
        'Ideal for sensitive skin',
        'Deep hem with fine stitching',
        'Comes in a reusable cotton bag',
        ],
        careInstructions:
        'Hand wash or gentle machine cycle at 30°C. Do not tumble dry. Lay flat or hang to dry. Iron on low heat inside out.',
        sizes: ['Single (175×260 cm)', 'Double (230×260 cm)', 'King (270×260 cm)'],
        colors: [
        { name: 'Champagne', hex: '#F0E0C0' },
        { name: 'Sage', hex: '#A8C0A0' },
        ],
        bgFrom: '#B8A070',
        bgTo: '#A08A5A',
        accentColor: '#F7F2E9',
    },
    {
        id: 4,
        slug: 'cloud-nine-pillow-set',
        name: 'Cloud Nine Pillow Set (2)',
        category: 'Beddings',
        price: 2600,
        rating: 4.6,
        reviews: 98,
        description:
        'Hotel-grade microfiber pillows that support while they pamper. The medium-firm fill strikes the perfect balance for all sleep positions, while the soft cover prevents bunching. These pillows are built to hold their shape night after night.',
        details: [
        'Hotel-grade microfiber fill',
        'Medium-firm support — suits all sleep positions',
        'Anti-mite & hypoallergenic',
        'Soft 200TC cover',
        'Size: 50×75 cm each',
        'Set of 2 pillows',
        ],
        careInstructions:
        'Machine wash on gentle at 40°C. Tumble dry low with a couple of clean tennis balls to restore loft. Air out monthly.',
        bgFrom: '#CFC0A8',
        bgTo: '#BAA888',
        accentColor: '#7A6B52',
    },

    // ── HOME DÉCOR ────────────────────────────────────────────────────────────
    {
        id: 5,
        slug: 'terracotta-vase-trio',
        name: 'Terracotta Vase Trio',
        category: 'Home Décor',
        price: 3400,
        originalPrice: 4100,
        rating: 4.8,
        reviews: 156,
        tag: 'New In',
        isBestSeller: true,
        description:
        'Three hand-thrown terracotta vases in graduating heights, each unique from the potter\'s wheel. Their warm rust tones and organic imperfections make them a striking statement on any shelf, mantelpiece, or dining table — with or without florals. A trio that feels like it belongs to every aesthetic.',
        details: [
        'Hand-thrown on a potter\'s wheel',
        'Heights: 12 cm, 18 cm, 24 cm',
        'Unglazed interior — for dry arrangements only',
        'Each piece is one-of-a-kind',
        'Made by artisans in Khurja, UP',
        'Set of 3 vases',
        ],
        careInstructions:
        'Wipe clean with a dry or slightly damp cloth. Do not submerge in water. Not suitable for water-filled flower arrangements unless lined.',
        colors: [
        { name: 'Terracotta', hex: '#B85C38' },
        { name: 'Sandstone', hex: '#D4A878' },
        { name: 'Raw Clay', hex: '#C4A060' },
        ],
        bgFrom: '#B85C38',
        bgTo: '#A04E2E',
        accentColor: '#F7F2E9',
    },
    {
        id: 6,
        slug: 'woven-macrame-wall-art',
        name: 'Woven Macramé Wall Art',
        category: 'Home Décor',
        price: 2900,
        rating: 4.7,
        reviews: 203,
        tag: 'Best Seller',
        isBestSeller: true,
        description:
        'Handcrafted from unbleached cotton rope, this macramé wall hanging brings natural texture and artisanal warmth to any wall. Each piece is knotted by hand, making no two exactly alike. The dowel and hanging cord are included — simply hang and transform your space.',
        details: [
        '100% unbleached natural cotton rope',
        'Handknotted — no two are identical',
        'Width: ~65 cm | Drop: ~90 cm',
        'Includes driftwood dowel & jute cord',
        'Ready to hang',
        'Handmade in Rajasthan',
        ],
        careInstructions:
        'Spot clean only with a dry cloth. Avoid direct sunlight to prevent fading. Gently fluff and reshape fringe periodically.',
        bgFrom: '#C4946A',
        bgTo: '#A87850',
        accentColor: '#F7F2E9',
    },
    {
        id: 7,
        slug: 'rattan-oval-mirror',
        name: 'Rattan Oval Mirror',
        category: 'Home Décor',
        price: 5500,
        originalPrice: 6800,
        rating: 4.9,
        reviews: 89,
        tag: 'Top Rated',
        description:
        'A statement piece that doubles as art. This oval mirror is hand-wrapped in natural rattan, creating a warm, organic frame that complements bohemian, coastal, and Japandi interiors alike. The mirror itself is distortion-free beveled glass for a crisp, clear reflection.',
        details: [
        'Frame: Natural hand-wrapped rattan',
        'Distortion-free beveled mirror glass',
        'Dimensions: 55 cm × 75 cm',
        'Includes wall-mounting hardware',
        'Suitable for bedroom, hallway, or living room',
        'Weight: 2.8 kg',
        ],
        careInstructions:
        'Wipe mirror with a glass cleaner and soft cloth. Dust rattan frame with a dry brush. Avoid humid environments like bathrooms.',
        bgFrom: '#8B7355',
        bgTo: '#6B5538',
        accentColor: '#C9A86C',
    },
    {
        id: 8,
        slug: 'handwoven-jute-basket-set',
        name: 'Handwoven Jute Basket Set',
        category: 'Home Décor',
        price: 1900,
        rating: 4.5,
        reviews: 312,
        description:
        'A set of three handwoven jute baskets in nesting sizes, perfect for storing throws, toys, magazines, or plants. Their natural texture adds earthy warmth to any corner, while the sturdy weave ensures they hold their shape through years of daily use.',
        details: [
        '100% natural jute',
        'Handwoven with reinforced base',
        'Sizes: S (20×18 cm), M (28×24 cm), L (36×30 cm)',
        'Set of 3 nesting baskets',
        'Multi-purpose: storage, planter, display',
        'Made in West Bengal',
        ],
        careInstructions:
        'Wipe clean with a barely damp cloth. Allow to dry completely in open air. Avoid prolonged exposure to water or moisture.',
        bgFrom: '#B8946A',
        bgTo: '#9A7A50',
        accentColor: '#F7F2E9',
    },

    // ── CANDLES ───────────────────────────────────────────────────────────────
    {
        id: 9,
        slug: 'sandalwood-amber-pillar-candle',
        name: 'Sandalwood & Amber Pillar Candle',
        category: 'Candles',
        price: 1250,
        originalPrice: 1600,
        rating: 5.0,
        reviews: 189,
        tag: 'Top Rated',
        isBestSeller: true,
        description:
        'Hand-poured in small batches using 100% natural soy wax, this pillar candle carries the grounding warmth of aged sandalwood and amber resin. Its slow, clean burn fills your space with a rich, woody fragrance that lingers long after the flame is extinguished. A perfect centrepiece for any living space or a cherished gift.',
        details: [
        'Burn time: 50–60 hours',
        '100% natural soy wax',
        'Lead-free cotton wick',
        'Diameter: 8 cm | Height: 14 cm',
        'Hand-poured in Lucknow, India',
        'Phthalate-free fragrance blend',
        ],
        careInstructions:
        'Keep away from drafts and flammable materials. Trim wick to 5mm before each use. Never leave a burning candle unattended. Keep out of reach of children and pets.',
        sizes: ['Small (6 cm)', 'Medium (8 cm)', 'Large (10 cm)'],
        colors: [
        { name: 'Ivory', hex: '#F5EFE2' },
        { name: 'Rust', hex: '#B85C38' },
        { name: 'Ebony', hex: '#2C1A0E' },
        ],
        bgFrom: '#2C1A0E',
        bgTo: '#3D2412',
        accentColor: '#C9A86C',
    },
    {
        id: 10,
        slug: 'rose-oud-jar-candle',
        name: 'Rose & Oud Jar Candle',
        category: 'Candles',
        price: 980,
        rating: 4.8,
        reviews: 267,
        description:
        'A luxurious fusion of Bulgarian rose absolute and dark, smoky oud wood — poured into a reusable frosted amber glass jar. This candle transports you to an eastern bazaar with every breath. The jar makes a beautiful vase or storage vessel once the candle has burned through.',
        details: [
        'Burn time: 40–45 hours',
        'Soy-coconut wax blend',
        'Bulgarian rose & oud wood fragrance',
        'Reusable frosted amber glass jar',
        'Diameter: 7.5 cm | Height: 9 cm',
        'Lead-free wick',
        ],
        careInstructions:
        'For first burn, allow wax to melt to edge of jar to prevent tunneling. Trim wick before each use. Discontinue use when 1 cm of wax remains.',
        sizes: ['Small (180g)', 'Large (320g)'],
        colors: [
        { name: 'Amber', hex: '#C9853A' },
        { name: 'Smoke', hex: '#4A3530' },
        ],
        bgFrom: '#6B3A2A',
        bgTo: '#4A2218',
        accentColor: '#C9A86C',
    },
    {
        id: 11,
        slug: 'eucalyptus-soy-tealights',
        name: 'Eucalyptus Soy Tealights (12)',
        category: 'Candles',
        price: 750,
        originalPrice: 900,
        rating: 4.7,
        reviews: 421,
        tag: 'Best Seller',
        isBestSeller: true,
        description:
        'Crisp, fresh eucalyptus woven with a whisper of mint — twelve tealights that turn any dinner table, bathroom ledge, or windowsill into an aromatic ritual. Made with natural soy wax and unbleached cotton wicks, they burn clean and true for up to 4 hours each.',
        details: [
        'Pack of 12 tealights',
        'Burn time: ~4 hours each',
        '100% natural soy wax',
        'Unbleached cotton wicks',
        'Eucalyptus & mint fragrance',
        'Reusable aluminum cups',
        ],
        careInstructions:
        'Place on a heat-resistant surface. Keep away from drafts. Do not move while burning. Allow wax to solidify before replacing.',
        bgFrom: '#4A6B4A',
        bgTo: '#3A5A3A',
        accentColor: '#C9A86C',
    },
    {
        id: 12,
        slug: 'vanilla-amber-wax-melt-set',
        name: 'Vanilla Amber Wax Melt Set',
        category: 'Candles',
        price: 650,
        rating: 4.6,
        reviews: 188,
        description:
        'Six luscious wax melts in a warm vanilla-amber blend — designed for use with any electric or tealight wax warmer. Each melt fills the room with a cosy, bakery-like warmth that lingers for hours. Gifted in a beautiful kraft box, they make the perfect housewarming present.',
        details: [
        'Set of 6 clamshell wax melts',
        'Each melt: ~8 hrs of fragrance',
        'Soy-paraffin blend',
        'Compatible with all wax warmers',
        'Vanilla, tonka bean & amber fragrance',
        'Gifted in kraft box with ribbon',
        ],
        careInstructions:
        'Use in a wax warmer only — never apply direct flame to melts. Keep children and pets away from warmer. Replace melt when fragrance fades.',
        bgFrom: '#5A3A1A',
        bgTo: '#3D2510',
        accentColor: '#D4A87C',
    },

    // ── CROCKERY ──────────────────────────────────────────────────────────────
    {
        id: 13,
        slug: 'hand-thrown-mug-set',
        name: 'Hand-thrown Mug Set (4)',
        category: 'Crockery',
        price: 2100,
        rating: 4.7,
        reviews: 312,
        tag: 'Fan Favourite',
        isBestSeller: true,
        description:
        'Four hand-thrown mugs, each with its own subtle personality — slight variations in glaze and form that make mornings feel a little more intentional. The thick walls retain heat beautifully, and the generous handle fits comfortably in any hand. Dishwasher and microwave safe.',
        details: [
        'Set of 4 hand-thrown ceramic mugs',
        'Capacity: ~300ml each',
        'High-fire stoneware',
        'Food-safe reactive glaze',
        'Dishwasher & microwave safe',
        'Made by studio potters in Jaipur',
        ],
        careInstructions:
        'Dishwasher safe on the top rack. Avoid thermal shock — do not move from freezer to microwave directly. Crazing is a natural characteristic, not a defect.',
        colors: [
        { name: 'Forest', hex: '#6B7F65' },
        { name: 'Sand', hex: '#C4A878' },
        { name: 'Slate', hex: '#7A8090' },
        { name: 'Rust', hex: '#B85C38' },
        ],
        bgFrom: '#6B7F65',
        bgTo: '#526148',
        accentColor: '#D4C0A0',
    },
    {
        id: 14,
        slug: 'speckled-dinner-plate-set',
        name: 'Speckled Dinner Plate Set (4)',
        category: 'Crockery',
        price: 4200,
        originalPrice: 5100,
        rating: 4.8,
        reviews: 145,
        tag: 'New In',
        description:
        'Wide, flat dinner plates with a speckled reactive glaze that pools differently on every piece. The neutral stone tone complements any food and makes plating feel effortless — whether it\'s a weeknight pasta or a Sunday dinner party. Set of four, each uniquely marked.',
        details: [
        'Set of 4 dinner plates',
        'Diameter: 27 cm',
        'Stoneware with reactive speckle glaze',
        'Dishwasher, microwave & oven safe (up to 200°C)',
        'Stackable & chip-resistant rim',
        'Made in Khurja, UP',
        ],
        careInstructions:
        'Dishwasher safe. Oven safe up to 200°C. Avoid broiler or open flame. Stacking pads recommended to protect glaze.',
        colors: [
        { name: 'Stone', hex: '#B0A898' },
        { name: 'Charcoal', hex: '#4A4848' },
        ],
        bgFrom: '#5A5A6A',
        bgTo: '#3A3A4A',
        accentColor: '#C0BCA8',
    },
    {
        id: 15,
        slug: 'artisan-bowl-collection',
        name: 'Artisan Bowl Collection (3)',
        category: 'Crockery',
        price: 1800,
        rating: 4.6,
        reviews: 221,
        description:
        'Three mismatched-but-matching bowls that tell a story of the craft. Graduating in size from a small dipping bowl to a wide ramen-style bowl, each carries the same earthy glaze in a slightly different shade. Beautiful as a set, equally versatile used individually.',
        details: [
        'Set of 3 graduating bowls',
        'Sizes: 12 cm, 16 cm, 22 cm diameter',
        'High-fire stoneware, food-safe glaze',
        'Dishwasher & microwave safe',
        'Suitable for hot and cold foods',
        'Handmade — minor variations in glaze',
        ],
        careInstructions:
        'Dishwasher safe on the top rack. Suitable for microwave. Not recommended for direct oven use.',
        colors: [
        { name: 'Mocha', hex: '#7A6050' },
        { name: 'Cream', hex: '#E8D8C0' },
        ],
        bgFrom: '#7A6050',
        bgTo: '#5A4838',
        accentColor: '#D4C0A0',
    },
    {
        id: 16,
        slug: 'matte-serving-platter-duo',
        name: 'Matte Serving Platter Duo',
        category: 'Crockery',
        price: 2800,
        rating: 4.7,
        reviews: 98,
        description:
        'Two matte-finish serving platters — one oval, one rectangular — designed for the table you want to show off. The unglazed matte exterior feels extraordinary in the hand and contrasts beautifully against vibrant food. Host with quiet confidence.',
        details: [
        'Set of 2 platters (1 oval + 1 rectangular)',
        'Oval: 32×22 cm | Rectangular: 35×18 cm',
        'Matte exterior, food-safe satin interior glaze',
        'Oven safe up to 180°C',
        'Dishwasher safe',
        'Made in studio kilns in Bengaluru',
        ],
        careInstructions:
        'Dishwasher safe. Oven safe up to 180°C — preheat gradually. Avoid stacking heavy items on the matte exterior to prevent scuffs.',
        colors: [
        { name: 'Fog', hex: '#C0C4C8' },
        { name: 'Espresso', hex: '#3A2A20' },
        ],
        bgFrom: '#6A5A4A',
        bgTo: '#4A3A2A',
        accentColor: '#C8B898',
    },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const getProductById = (id: number): Product | undefined => products.find((p) => p.id === id)

export const getProductBySlug = (slug: string): Product | undefined => products.find((p) => p.slug === slug)

export const getProductsByCategory = (category: Category): Product[] => products.filter((p) => p.category === category)

export const getBestSellers = (): Product[] => products.filter((p) => p.isBestSeller)

export const CATEGORIES: Category[] = ['Beddings', 'Home Décor', 'Candles', 'Crockery']