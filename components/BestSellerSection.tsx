'use client'

import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { getBestSellers } from '@/lib/products'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { FiArrowRight } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const bestSellers = getBestSellers()

export default function BestSellerSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const headingRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)
    const btnRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
        // Heading reveal
        gsap.from(headingRef.current?.children ?? [], {
            y: 50,
            opacity: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            },
        })

        // Cards stagger
        gsap.from(gridRef.current?.children ?? [], {
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            },
        })

        // See more button
        gsap.from(btnRef.current, {
            y: 24,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
            trigger: btnRef.current,
            start: 'top 92%',
            },
        })

        // Banner CTA
        gsap.from(ctaRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            },
        })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-[#F7F2E9] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-14">

            {/* ── Section Heading ─────────────────────────────────────── */}
            <div
            ref={headingRef}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
            >
            <div>
                <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-[#B85C38]" />
                <span
                    className="text-[10px] tracking-[0.25em] text-[#B85C38] uppercase"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                >
                    Customer Favourites
                </span>
                </div>
                <h2
                className="text-[#1E130C] leading-tight"
                style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(36px, 5vw, 60px)',
                    fontWeight: 600,
                }}
                >
                Our Best Sellers
                </h2>
                <p
                className="text-[#5A4438] mt-3 max-w-sm"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: '14px', lineHeight: 1.7 }}
                >
                Pieces that have found their way into thousands of homes — loved, gifted, and kept.
                </p>
            </div>

            {/* View all button (desktop) */}
            <Link href="/products">
                <Button
                variant="outline"
                className="group self-start md:self-auto border border-[#1E130C]/20 bg-transparent text-[#1E130C] hover:border-[#B85C38] hover:text-[#B85C38] rounded-none h-11 px-7 tracking-widest uppercase text-[10px] transition-all duration-300 flex items-center gap-2"
                style={{ fontFamily: "'Jost', sans-serif" }}
                >
                View All
                <FiArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                />
                </Button>
            </Link>
            </div>

            {/* ── Product Grid ────────────────────────────────────────── */}
            <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
            {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>

            {/* ── See More Button ─────────────────────────────────────── */}
            <div ref={btnRef} className="flex justify-center mt-12">
            <Link href="/products">
                <Button
                className="group bg-[#1E130C] hover:bg-[#B85C38] text-white rounded-none h-13 px-12 tracking-widest uppercase text-[10px] transition-all duration-400 flex items-center gap-3 border-0 font-medium"
                style={{ fontFamily: "'Jost', sans-serif", height: '52px' }}
                >
                See More Products
                <FiArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                />
                </Button>
            </Link>
            </div>

            {/* ── Promo Banner ────────────────────────────────────────── */}
            <div
            ref={ctaRef}
            className="mt-14 bg-[#1E130C] rounded-sm overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 px-10 py-8 relative"
            >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg
                viewBox="0 0 800 200"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid slice"
                >
                <circle cx="150" cy="100" r="200" stroke="#C9A86C" strokeWidth="1" fill="none" />
                <circle cx="650" cy="100" r="150" stroke="#B85C38" strokeWidth="1" fill="none" />
                </svg>
            </div>

            <div className="relative text-center md:text-left">
                <p
                className="text-[#C9A86C] text-[10px] tracking-[0.25em] uppercase mb-2"
                style={{ fontFamily: "'Jost', sans-serif" }}
                >
                Limited Time
                </p>
                <h3
                className="text-[#F7F2E9] text-2xl md:text-3xl"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                >
                Free Delivery on orders above{' '}
                <span className="text-[#C9A86C] italic">₹2,500</span>
                </h3>
            </div>

            <Link href="/products">
                <Button
                className="relative flex-shrink-0 bg-[#B85C38] hover:bg-[#C9A86C] text-white hover:text-[#1E130C] rounded-none h-12 px-8 tracking-widest uppercase text-[10px] transition-all duration-400 border-0 font-medium"
                style={{ fontFamily: "'Jost', sans-serif" }}
                >
                Shop &amp; Save
                </Button>
            </Link>
            </div>
        </div>
        </section>
    )
}