'use client'

import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { Category } from '@/lib/products'
import { CATEGORIES, products } from '@/lib/products'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { FaSliders } from "react-icons/fa6"
import { FiSearch, FiX } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Best Rating', value: 'rating' },
    { label: 'Most Reviewed', value: 'reviews' },
]

type SortValue = (typeof sortOptions)[number]['value']

export default function ProductsPage() {
    const pageRef = useRef<HTMLDivElement>(null)
    const headingRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    const [activeCategory, setActiveCategory] = useState<'All' | Category>('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState<SortValue>('featured')

    // ── Filtered + sorted list ──────────────────────────────────────────────
    const filtered = products
        .filter((p) => {
        const matchCat = activeCategory === 'All' || p.category === activeCategory
        const q = searchQuery.toLowerCase()
        const matchSearch =
            q === '' ||
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        return matchCat && matchSearch
        })
        .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'rating') return b.rating - a.rating
        if (sortBy === 'reviews') return b.reviews - a.reviews
        return 0
        })

    // ── Initial heading animation ───────────────────────────────────────────
    useEffect(() => {
        const ctx = gsap.context(() => {
        gsap.from(headingRef.current?.children ?? [], {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            },
        })
        }, pageRef)
        return () => ctx.revert()
    }, [])

    // ── Re-animate grid on filter change ───────────────────────────────────
    useEffect(() => {
        if (!gridRef.current) return
        const cards = Array.from(gridRef.current.children)
        gsap.fromTo(
        cards,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: 'power2.out' }
        )
    }, [filtered.length, activeCategory, sortBy, searchQuery])

    return (
        <div ref={pageRef} className="min-h-screen bg-[#F7F2E9] pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">

            {/* ── Page heading ──────────────────────────────────────────── */}
            <div ref={headingRef} className="mb-10">
            <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-8 bg-[#B85C38]" />
                <span
                className="text-[10px] tracking-[0.25em] text-[#B85C38] uppercase"
                style={{ fontFamily: "'Jost', sans-serif" }}
                >
                Aydi Chattels by Jashifa
                </span>
            </div>
            <h1
                className="text-[#1E130C]"
                style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(38px, 5vw, 62px)',
                fontWeight: 600,
                }}
            >
                All Collections
            </h1>
            <p
                className="text-[#5A4438] mt-2 max-w-lg"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: '14px', lineHeight: 1.7 }}
            >
                Every piece is thoughtfully curated for homes that value warmth, craft, and character.
            </p>
            </div>

            {/* ── Toolbar ───────────────────────────────────────────────── */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
                {(['All', ...CATEGORIES] as const).map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 text-[10px] tracking-widest uppercase border transition-all duration-300 ${
                    activeCategory === cat
                        ? 'bg-[#1E130C] border-[#1E130C] text-[#F7F2E9]'
                        : 'bg-transparent border-[#D4C8B8] text-[#5A4438] hover:border-[#B85C38] hover:text-[#B85C38]'
                    }`}
                    style={{ fontFamily: "'Jost', sans-serif" }}
                >
                    {cat}
                </button>
                ))}
            </div>

            {/* Search + Sort */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
                {/* Search */}
                <div className="relative flex-1 lg:w-60">
                <FiSearch
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A7060]"
                />
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products…"
                    className="pl-9 h-10 rounded-none border-[#D4C8B8] bg-transparent text-[#1E130C] placeholder:text-[#A89880] focus-visible:ring-1 focus-visible:ring-[#B85C38] focus-visible:ring-offset-0 text-[13px]"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                />
                {searchQuery && (
                    <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A7060] hover:text-[#B85C38] transition-colors"
                    >
                    <FiX size={13} />
                    </button>
                )}
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortValue)}>
                <SelectTrigger
                    className="h-10 w-[170px] rounded-none border-[#D4C8B8] bg-transparent text-[#1E130C] text-[10px] tracking-wider uppercase focus:ring-1 focus:ring-[#B85C38] focus:ring-offset-0"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                >
                    <FaSliders size={12} className="mr-2 text-[#8A7060] flex-shrink-0" />
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none border-[#D4C8B8] bg-[#F7F2E9]">
                    {sortOptions.map((opt) => (
                    <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="text-[10px] tracking-wider uppercase text-[#1E130C] focus:bg-[#EDE3D4] focus:text-[#B85C38] rounded-none"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                        {opt.label}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            </div>

            {/* ── Result count + active filter ─────────────────────────── */}
            <div className="flex items-center justify-between mb-8">
            <p
                className="text-[11px] text-[#8A7060] tracking-wider"
                style={{ fontFamily: "'Jost', sans-serif" }}
            >
                Showing{' '}
                <span className="text-[#1E130C] font-medium">{filtered.length}</span> of{' '}
                <span className="text-[#1E130C] font-medium">{products.length}</span> products
            </p>

            {(activeCategory !== 'All' || searchQuery) && (
                <button
                onClick={() => {
                    setActiveCategory('All')
                    setSearchQuery('')
                }}
                className="flex items-center gap-1.5 text-[10px] text-[#B85C38] tracking-wider hover:underline"
                style={{ fontFamily: "'Jost', sans-serif" }}
                >
                <FiX size={11} /> Clear all filters
                </button>
            )}
            </div>

            {/* ── Product Grid ─────────────────────────────────────────── */}
            {filtered.length > 0 ? (
            <div
                ref={gridRef}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            >
                {filtered.map((p) => (
                <ProductCard key={p.id} product={p} variant="compact" />
                ))}
            </div>
            ) : (
            /* ── Empty state ─────────────────────────────────────────── */
            <div className="flex flex-col items-center justify-center py-28 text-center">
                <div className="h-16 w-16 rounded-full bg-[#EDE3D4] flex items-center justify-center mb-5">
                <FiSearch size={24} className="text-[#B85C38]" />
                </div>
                <h3
                className="text-[#1E130C] text-2xl mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                >
                No products found
                </h3>
                <p
                className="text-[#8A7060] text-sm mb-7"
                style={{ fontFamily: "'Jost', sans-serif" }}
                >
                Try adjusting your search or clearing the filters.
                </p>
                <Button
                onClick={() => {
                    setSearchQuery('')
                    setActiveCategory('All')
                }}
                className="bg-[#B85C38] hover:bg-[#A04E2E] text-white rounded-none px-10 h-12 tracking-widest uppercase text-[10px] border-0"
                style={{ fontFamily: "'Jost', sans-serif" }}
                >
                Clear All Filters
                </Button>
            </div>
            )}
        </div>
        </div>
    )
}