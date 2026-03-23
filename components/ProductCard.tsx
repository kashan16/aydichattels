'use client'

import { Badge } from '@/components/ui/badge'
import { Product } from '@/lib/products'
import { gsap } from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi'

type ProductCardProps = {
    product: Product
    /** 'default' = standard height, 'compact' = shorter image for dense grids */
    variant?: 'default' | 'compact'
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [wishlisted, setWishlisted] = useState(false)
    const [added, setAdded] = useState(false)

    const imageHeight = variant === 'compact' ? 'h-52' : 'h-64'

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (added) return
        setAdded(true)
        gsap.fromTo(
            cardRef.current,
            { scale: 0.98 },
            { scale: 1, duration: 0.25, ease: 'back.out(2)' }
        )
        setTimeout(() => setAdded(false), 1800)
    }

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setWishlisted((w) => !w)
    }

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0

    return (
        <Link href={`/products/${product.id}`} className="block group">
            <div
                ref={cardRef}
                className="bg-[#F0E8D8] rounded-sm overflow-hidden transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(30,19,12,0.10)]"
            >
                {/* ── Image ──────────────────────────────────────────────── */}
                <div className={`relative ${imageHeight} overflow-hidden`}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Subtle gradient overlay so badges stay readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                    {/* Tag badge */}
                    {product.tag && (
                        <Badge
                            className="absolute top-3 left-3 rounded-none text-[8px] tracking-[0.15em] uppercase px-2.5 py-1 border-0 pointer-events-none z-10"
                            style={{
                                fontFamily: "'Jost', sans-serif",
                                background:
                                    product.tag === 'Top Rated'
                                        ? '#C9A86C'
                                        : product.tag === 'New In'
                                            ? '#1E130C'
                                            : '#B85C38',
                                color: '#F7F2E9',
                            }}
                        >
                            {product.tag}
                        </Badge>
                    )}

                    {/* Discount badge */}
                    {discount > 0 && (
                        <div className="absolute top-3 right-12 h-9 w-9 rounded-full bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none z-10">
                            <span
                                className="text-white font-bold leading-none"
                                style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px' }}
                            >
                                -{discount}%
                            </span>
                        </div>
                    )}

                    {/* Wishlist */}
                    <button
                        onClick={handleWishlist}
                        className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/40 z-20"
                        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        <FiHeart
                            size={13}
                            className={`transition-all duration-300 ${wishlisted ? 'fill-[#B85C38] text-[#B85C38]' : 'text-white'}`}
                        />
                    </button>

                    {/* Quick-add hover strip */}
                    <button
                        onClick={handleAddToCart}
                        className="absolute bottom-0 left-0 right-0 bg-[#1E130C]/90 backdrop-blur-sm text-[#F7F2E9] py-3 text-[9px] tracking-widest uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 z-20"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                        <FiShoppingBag size={12} />
                        {added ? 'Added to Bag ✓' : 'Quick Add'}
                    </button>
                </div>

                {/* ── Info ───────────────────────────────────────────────── */}
                <div className="p-4">
                    {/* Category */}
                    <p
                        className="text-[9px] tracking-[0.15em] text-[#B85C38] uppercase mb-1"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                        {product.category}
                    </p>

                    {/* Name */}
                    <h3
                        className="text-[#1E130C] leading-tight mb-2 group-hover:text-[#B85C38] transition-colors duration-300"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        {product.name}
                    </h3>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <FiStar
                                key={i}
                                size={9}
                                className={
                                    i < Math.floor(product.rating)
                                        ? 'fill-[#C9A86C] text-[#C9A86C]'
                                        : 'text-[#C9A86C]/30'
                                }
                            />
                        ))}
                        <span
                            className="text-[9px] text-[#8A7060] ml-1"
                            style={{ fontFamily: "'Jost', sans-serif" }}
                        >
                            {product.rating.toFixed(1)}{' '}
                            <span className="text-[#C0B8A8]">({product.reviews})</span>
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                        <span
                            className="text-[#1E130C] font-semibold"
                            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '21px' }}
                        >
                            ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice && (
                            <span
                                className="text-[#A89880] line-through text-xs"
                                style={{ fontFamily: "'Jost', sans-serif" }}
                            >
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}