'use client'

import ProductCard from '@/components/ProductCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { Product } from '@/lib/products'
import { getProductsByCategory } from '@/lib/products'
import { gsap } from 'gsap'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
    FiChevronDown,
    FiHeart,
    FiMinus,
    FiPackage,
    FiPlus,
    FiRefreshCw,
    FiShare2,
    FiShield,
    FiShoppingBag,
    FiStar
} from 'react-icons/fi'

// ─── Accordion ────────────────────────────────────────────────────────────────

type AccordionItemProps = {
    title: string
    children: React.ReactNode
    defaultOpen?: boolean
}

function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
    const [open, setOpen] = useState(defaultOpen)
    const bodyRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!bodyRef.current) return
        gsap.to(bodyRef.current, {
        height: open ? 'auto' : 0,
        duration: 0.4,
        ease: 'power2.inOut',
        })
    }, [open])

    return (
        <div className="border-b border-[#E2D7C8]">
        <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-full py-4 text-left"
        >
            <span
            className="text-[#1E130C] text-[11px] font-medium tracking-[0.18em] uppercase"
            style={{ fontFamily: "'Jost', sans-serif" }}
            >
            {title}
            </span>
            <FiChevronDown
            size={15}
            className={`text-[#B85C38] transition-transform duration-300 flex-shrink-0 ${
                open ? 'rotate-180' : ''
            }`}
            />
        </button>
        <div ref={bodyRef} className="overflow-hidden h-0">
            <div
            className="pb-5 text-[#5A4438] text-sm leading-relaxed"
            style={{ fontFamily: "'Jost', sans-serif" }}
            >
            {children}
            </div>
        </div>
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProductInfoPage({ product }: { product: Product }) {
    const pageRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const infoRef = useRef<HTMLDivElement>(null)
    const relatedRef = useRef<HTMLDivElement>(null)

    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] ?? '')
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name ?? '')
    const [wishlisted, setWishlisted] = useState(false)
    const [addedToCart, setAddedToCart] = useState(false)

    const Icon = product.icon

    const relatedProducts = getProductsByCategory(product.category)
        .filter((p) => p.id !== product.id)
        .slice(0, 4)

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0

    // ── Entry animation ─────────────────────────────────────────────────────
    useEffect(() => {
        const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.1 })
        tl.from(imageRef.current, {
            x: -40,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
        }).from(
            infoRef.current?.children ?? [],
            {
            x: 30,
            opacity: 0,
            duration: 0.65,
            stagger: 0.07,
            ease: 'power3.out',
            },
            '-=0.55'
        )

        // Related products
        gsap.from(relatedRef.current?.children ?? [], {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
            trigger: relatedRef.current,
            start: 'top 85%',
            },
        })
        }, pageRef)

        return () => ctx.revert()
    }, [product.id])

    const handleAddToCart = () => {
        setAddedToCart(true)
        gsap.fromTo(
        '.cart-btn-info',
        { scale: 0.97 },
        { scale: 1, duration: 0.28, ease: 'back.out(2)' }
        )
        setTimeout(() => setAddedToCart(false), 2200)
    }

    return (
        <div ref={pageRef} className="min-h-screen bg-[#F7F2E9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 pt-28 pb-6">

            {/* ── Breadcrumb ───────────────────────────────────────────── */}
            <nav className="flex items-center gap-2 mb-8 text-[11px] text-[#8A7060]" style={{ fontFamily: "'Jost', sans-serif" }}>
            <Link href="/" className="hover:text-[#B85C38] transition-colors">Home</Link>
            <span className="text-[#C0B8A8]">/</span>
            <Link href="/products" className="hover:text-[#B85C38] transition-colors">Products</Link>
            <span className="text-[#C0B8A8]">/</span>
            <span className="text-[#1E130C] font-medium">{product.name}</span>
            </nav>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-14 pb-12">
            <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">

            {/* ── Left — Image ────────────────────────────────────────── */}
            <div ref={imageRef}>
                {/* Main image */}
                <div
                className="relative rounded-sm overflow-hidden h-[460px] lg:h-[540px] flex items-center justify-center mb-4"
                style={{ background: `linear-gradient(145deg, ${product.bgFrom}, ${product.bgTo})` }}
                >
                {/* Grain overlay */}
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                    }}
                />
                {/* Halo ring */}
                <div
                    className="absolute h-64 w-64 rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)' }}
                />

                <Icon
                    size={110}
                    style={{ color: product.accentColor }}
                    className="relative z-10 drop-shadow-lg"
                />

                {/* Tag */}
                {product.tag && (
                    <Badge
                    className="absolute top-5 left-5 rounded-none text-[9px] tracking-[0.18em] uppercase px-3 py-1 border-0 bg-[#B85C38] text-[#F7F2E9]"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                    {product.tag}
                    </Badge>
                )}

                {/* Discount pill */}
                {discount > 0 && (
                    <div className="absolute top-5 right-5 h-12 w-12 rounded-full bg-[#C9A86C] flex flex-col items-center justify-center">
                    <span className="text-[#1E130C] font-bold text-[13px] leading-none" style={{ fontFamily: "'Jost', sans-serif" }}>
                        {discount}%
                    </span>
                    <span className="text-[#1E130C]/60 text-[8px] leading-none" style={{ fontFamily: "'Jost', sans-serif" }}>
                        OFF
                    </span>
                    </div>
                )}

                {/* Share */}
                <div className="absolute bottom-5 right-5 flex gap-2">
                    <button className="h-9 w-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
                    <FiShare2 size={14} />
                    </button>
                </div>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                    <div
                    key={i}
                    className={`h-[72px] rounded-sm flex items-center justify-center cursor-pointer transition-all duration-200 ${
                        i === 0
                        ? 'ring-2 ring-[#B85C38] ring-offset-1'
                        : 'opacity-60 hover:opacity-100 hover:ring-1 hover:ring-[#B85C38]/40'
                    }`}
                    style={{ background: `linear-gradient(145deg, ${product.bgFrom}bb, ${product.bgTo}bb)` }}
                    >
                    <Icon size={22} style={{ color: product.accentColor }} className="opacity-80" />
                    </div>
                ))}
                </div>
            </div>

            {/* ── Right — Info ─────────────────────────────────────────── */}
            <div ref={infoRef} className="flex flex-col gap-5">

                {/* Category + Name */}
                <div>
                <p
                    className="text-[10px] tracking-[0.2em] text-[#B85C38] uppercase mb-2"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                >
                    {product.category}
                </p>
                <h1
                    className="text-[#1E130C] leading-tight mb-3"
                    style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(28px, 4vw, 44px)',
                    fontWeight: 600,
                    }}
                >
                    {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <FiStar
                        key={i}
                        size={12}
                        className={
                            i < Math.floor(product.rating)
                            ? 'fill-[#C9A86C] text-[#C9A86C]'
                            : 'text-[#C9A86C]/30'
                        }
                        />
                    ))}
                    </div>
                    <span
                    className="text-[#1E130C] text-sm font-medium"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                    {product.rating.toFixed(1)}
                    </span>
                    <span className="text-[#8A7060] text-xs" style={{ fontFamily: "'Jost', sans-serif" }}>
                    ({product.reviews} reviews)
                    </span>
                </div>
                </div>

                <Separator className="bg-[#E2D7C8]" />

                {/* Price */}
                <div className="flex items-baseline gap-3">
                <span
                    className="text-[#1E130C] font-semibold"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '38px' }}
                >
                    ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                    <>
                    <span className="text-[#8A7060] line-through text-base" style={{ fontFamily: "'Jost', sans-serif" }}>
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <Badge
                        className="bg-[#B85C38]/10 text-[#B85C38] border-0 rounded-none text-[10px] px-2 py-1"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                        Save {discount}%
                    </Badge>
                    </>
                )}
                </div>

                {/* Color selector */}
                {product.colors && (
                <div>
                    <p
                    className="text-[10px] tracking-widest text-[#5A4438] uppercase mb-3"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                    Colour —{' '}
                    <span className="text-[#1E130C] font-medium">{selectedColor}</span>
                    </p>
                    <div className="flex gap-3 flex-wrap">
                    {product.colors.map((c) => (
                        <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        title={c.name}
                        className={`h-8 w-8 rounded-full transition-all duration-200 ${
                            selectedColor === c.name
                            ? 'ring-2 ring-offset-2 ring-[#B85C38]'
                            : 'hover:ring-1 hover:ring-offset-1 hover:ring-[#B85C38]/50'
                        }`}
                        style={{
                            backgroundColor: c.hex,
                            border: '1px solid rgba(0,0,0,0.10)',
                        }}
                        />
                    ))}
                    </div>
                </div>
                )}

                {/* Size selector */}
                {product.sizes && (
                <div>
                    <p
                    className="text-[10px] tracking-widest text-[#5A4438] uppercase mb-3"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                    Size —{' '}
                    <span className="text-[#1E130C] font-medium">{selectedSize}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                        <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-4 py-2 text-[10px] tracking-wider uppercase border transition-all duration-200 ${
                            selectedSize === s
                            ? 'border-[#B85C38] bg-[#B85C38] text-white'
                            : 'border-[#D4C8B8] text-[#5A4438] hover:border-[#B85C38] hover:text-[#B85C38]'
                        }`}
                        style={{ fontFamily: "'Jost', sans-serif" }}
                        >
                        {s}
                        </button>
                    ))}
                    </div>
                </div>
                )}

                {/* Quantity + Add to Bag */}
                <div className="flex items-center gap-3 mt-1">
                {/* Qty stepper */}
                <div className="flex items-center border border-[#D4C8B8] h-12 flex-shrink-0">
                    <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-full px-3.5 text-[#5A4438] hover:text-[#B85C38] transition-colors"
                    >
                    <FiMinus size={13} />
                    </button>
                    <span
                    className="w-10 text-center text-[#1E130C] text-sm font-medium"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                    {quantity}
                    </span>
                    <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-full px-3.5 text-[#5A4438] hover:text-[#B85C38] transition-colors"
                    >
                    <FiPlus size={13} />
                    </button>
                </div>

                {/* Add to bag */}
                <Button
                    onClick={handleAddToCart}
                    className="cart-btn-info flex-1 bg-[#1E130C] hover:bg-[#B85C38] text-white rounded-none h-12 tracking-widest uppercase text-[10px] transition-all duration-400 flex items-center justify-center gap-2 border-0 font-medium"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                >
                    <FiShoppingBag size={13} />
                    {addedToCart
                    ? 'Added to Bag ✓'
                    : `Add to Bag — ₹${(product.price * quantity).toLocaleString('en-IN')}`}
                </Button>

                {/* Wishlist */}
                <button
                    onClick={() => setWishlisted(!wishlisted)}
                    className="h-12 w-12 border border-[#D4C8B8] flex items-center justify-center text-[#5A4438] hover:border-[#B85C38] hover:text-[#B85C38] transition-all duration-300 flex-shrink-0"
                >
                    <FiHeart
                    size={15}
                    className={wishlisted ? 'fill-[#B85C38] text-[#B85C38]' : ''}
                    />
                </button>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-3">
                {[
                    { icon: FiPackage, text: 'Free Delivery above ₹2,500' },
                    { icon: FiRefreshCw, text: '7-Day Easy Returns' },
                    { icon: FiShield, text: 'Authentic & Handcrafted' },
                ].map(({ icon: TrustIcon, text }) => (
                    <div
                    key={text}
                    className="flex flex-col items-center text-center gap-2 p-3 bg-[#EDE3D4]/60 rounded-sm"
                    >
                    <TrustIcon size={14} className="text-[#B85C38]" />
                    <span
                        className="text-[9px] text-[#5A4438] leading-tight"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                        {text}
                    </span>
                    </div>
                ))}
                </div>

                {/* Accordion details */}
                <div className="border-t border-[#E2D7C8]">
                <AccordionItem title="Description" defaultOpen>
                    <p>{product.description}</p>
                </AccordionItem>

                <AccordionItem title="Product Details">
                    <ul className="space-y-2">
                    {product.details.map((d) => (
                        <li key={d} className="flex items-start gap-2">
                        <span className="text-[#B85C38] mt-0.5 text-[10px] flex-shrink-0">◆</span>
                        {d}
                        </li>
                    ))}
                    </ul>
                </AccordionItem>

                <AccordionItem title="Care Instructions">
                    <p>{product.careInstructions}</p>
                </AccordionItem>
                </div>
            </div>
            </div>

            {/* ── Related Products ──────────────────────────────────────── */}
            {relatedProducts.length > 0 && (
            <div className="mt-20 pt-16 border-t border-[#E2D7C8]">
                <div className="flex items-center justify-between mb-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                    <div className="h-px w-8 bg-[#B85C38]" />
                    <span
                        className="text-[10px] tracking-[0.22em] text-[#B85C38] uppercase"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                        More from {product.category}
                    </span>
                    </div>
                    <h2
                    className="text-[#1E130C]"
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(28px, 3.5vw, 42px)',
                        fontWeight: 600,
                    }}
                    >
                    You Might Also Like
                    </h2>
                </div>
                <Link
                    href="/products"
                    className="hidden sm:flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#1E130C] border border-[#1E130C]/20 hover:border-[#B85C38] hover:text-[#B85C38] transition-all duration-300 px-6 py-3"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                >
                    View All
                </Link>
                </div>

                <div
                ref={relatedRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                >
                {relatedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} variant="compact" />
                ))}
                </div>
            </div>
            )}
        </div>
        </div>
    )
}