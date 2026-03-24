'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { FiArrowDownRight, FiArrowRight } from 'react-icons/fi'
import { GiCandleLight } from 'react-icons/gi'
import { MdBed, MdOutlineCoffee } from 'react-icons/md'
import { PiFlower } from 'react-icons/pi'

gsap.registerPlugin(ScrollTrigger)

const categories = [
    { icon: MdBed, label: 'Beddings', desc: 'Dreamy comfort' },
    { icon: PiFlower, label: 'Home Décor', desc: 'Soulful spaces' },
    { icon: GiCandleLight, label: 'Candles', desc: 'Warm ambiance' },
    { icon: MdOutlineCoffee, label: 'Crockery', desc: 'Artisan craft' },
]

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const headlineRef = useRef<HTMLDivElement>(null)
    const subRef = useRef<HTMLParagraphElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)
    const taglineRef = useRef<HTMLDivElement>(null)
    const catsRef = useRef<HTMLDivElement>(null)
    const decorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // ── 1. Respect reduced-motion OS setting ──────────────────────────
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        // ── 2. Detect mobile (≤ 768 px) once, avoid re-querying in scroll cb ──
        const isMobile = window.innerWidth <= 768

        const ctx = gsap.context(() => {
            if (prefersReduced) return  // Skip all animations for accessibility

            // ── 3. Add will-change only on desktop; mobile compositor budget is limited ──
            if (!isMobile) {
                const animatedEls = [
                    headlineRef.current,
                    subRef.current,
                    ctaRef.current,
                    taglineRef.current,
                    catsRef.current,
                ]
                animatedEls.forEach((el) => {
                    if (el) (el as HTMLElement).style.willChange = 'transform, opacity'
                })
            }

            const tl = gsap.timeline({ delay: isMobile ? 0.1 : 0.3 })

            const lines = headlineRef.current?.querySelectorAll('.headline-line') ?? []

            // ── 4. Simpler, shorter animations on mobile ──────────────────
            tl.from(lines, {
                y: isMobile ? 40 : 80,        // smaller travel distance
                opacity: 0,
                duration: isMobile ? 0.7 : 1.1,
                stagger: isMobile ? 0.08 : 0.15,
                ease: 'power3.out',            // power3 is faster to compute than power4
            })
                .from(
                    taglineRef.current,
                    {
                        x: isMobile ? -15 : -30,
                        opacity: 0,
                        duration: isMobile ? 0.5 : 0.8,
                        ease: 'power2.out',
                    },
                    '-=0.5'
                )
                .from(
                    subRef.current,
                    { y: 15, opacity: 0, duration: isMobile ? 0.45 : 0.7, ease: 'power2.out' },
                    '-=0.4'
                )
                .from(
                    ctaRef.current?.children ?? [],
                    {
                        y: 15,
                        opacity: 0,
                        duration: isMobile ? 0.4 : 0.6,
                        stagger: isMobile ? 0.08 : 0.12,
                        ease: 'power2.out',
                    },
                    '-=0.3'
                )
                .from(
                    catsRef.current?.children ?? [],
                    {
                        y: isMobile ? 15 : 30,
                        opacity: 0,
                        duration: isMobile ? 0.4 : 0.6,
                        stagger: isMobile ? 0.06 : 0.1,
                        ease: 'power2.out',
                    },
                    '-=0.25'
                )

            // ── 5. Float animation: skip on mobile (costly continuous repaint) ──
            if (!isMobile && decorRef.current) {
                gsap.to(decorRef.current, {
                    y: -18,
                    duration: 3.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                })
            }

            // ── 6. Parallax: desktop only — mobile scroll performance is fragile ──
            if (!isMobile) {
                gsap.to('.hero-bg-layer', {
                    yPercent: 30,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1,          // throttled scrub (was `true` = immediate)
                    },
                })
            }

            // ── 7. Clean up will-change after animation completes ──────────
            if (!isMobile) {
                tl.call(() => {
                    const animatedEls = [
                        headlineRef.current,
                        subRef.current,
                        ctaRef.current,
                        taglineRef.current,
                        catsRef.current,
                    ]
                    animatedEls.forEach((el) => {
                        if (el) (el as HTMLElement).style.willChange = 'auto'
                    })
                })
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen overflow-hidden bg-[#F7F2E9] flex flex-col"
        >
            {/* Layered background */}
            {/*
                ── 8. hero-bg-layer: removed backdrop-blur and blur-2xl on mobile.
                   The grain SVG filter is lightweight (no JS), kept as-is.
            */}
            <div className="hero-bg-layer absolute inset-0 pointer-events-none">
                {/* Warm gradient mesh — GPU composited, cheap */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F7F2E9] via-[#F2E9D8] to-[#EAD9C0] opacity-70" />

                {/* Grain overlay — SVG filter, CPU-only, negligible cost */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* Decorative arcs — hidden on mobile via CSS (saves SVG layout/paint) */}
                <svg
                    className="absolute right-0 top-0 h-full w-auto opacity-10 hidden md:block"
                    viewBox="0 0 600 900"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMaxYMid meet"
                    aria-hidden="true"
                >
                    <circle cx="600" cy="450" r="380" stroke="#B85C38" strokeWidth="1" fill="none" />
                    <circle cx="600" cy="450" r="280" stroke="#C9A86C" strokeWidth="0.5" fill="none" />
                    <circle cx="600" cy="450" r="180" stroke="#B85C38" strokeWidth="0.5" fill="none" />
                </svg>

                {/* Large faded letter — hidden on mobile (large text = large paint rect) */}
                <div
                    className="absolute -bottom-10 -left-10 text-[320px] font-bold text-[#1E130C]/[0.025] leading-none select-none hidden md:block"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    aria-hidden="true"
                >
                    A
                </div>
            </div>

            {/* Main content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 lg:px-14 pt-28 pb-16">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left — Text */}
                    <div>
                        {/* Tagline badge */}
                        <div ref={taglineRef} className="mb-6 flex items-center gap-3">
                            <div className="h-px w-10 bg-[#B85C38]" />
                            <Badge
                                className="bg-transparent border border-[#B85C38]/40 text-[#B85C38] rounded-none px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-medium"
                                style={{ fontFamily: "'Jost', sans-serif" }}
                            >
                                Artisan Home Goods
                            </Badge>
                        </div>

                        {/* Headline */}
                        <div ref={headlineRef} className="overflow-hidden mb-6">
                            <div
                                className="headline-line text-[#1E130C] leading-[1.05]"
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: 'clamp(52px, 7vw, 92px)',
                                    fontWeight: 600,
                                }}
                            >
                                Home is Where
                            </div>
                            <div
                                className="headline-line leading-[1.05] flex items-baseline gap-4"
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: 'clamp(52px, 7vw, 92px)',
                                    fontWeight: 600,
                                }}
                            >
                                <span className="italic text-[#B85C38]">Beauty</span>
                                <span className="text-[#1E130C]">Begins</span>
                            </div>
                        </div>

                        {/* Subtext */}
                        <p
                            ref={subRef}
                            className="text-[#5A4438] leading-relaxed mb-10 max-w-md"
                            style={{ fontFamily: "'Jost', sans-serif", fontSize: '15px', lineHeight: '1.75' }}
                        >
                            Curated with love by Jashifa — each piece in our collection tells a story of warmth,
                            craftsmanship, and intentional living. Transform your space into a sanctuary.
                        </p>

                        {/* CTAs */}
                        <div ref={ctaRef} className="flex flex-wrap gap-4 mb-14">
                            <Button
                                className="group bg-[#1E130C] hover:bg-[#B85C38] text-white rounded-none h-13 px-8 tracking-widest uppercase text-xs transition-colors duration-300 flex items-center gap-3 border-0"
                                style={{ fontFamily: "'Jost', sans-serif", height: '52px' }}
                                // ── 9. transition-colors instead of transition-all — avoids
                                //       triggering layout recalculation on hover
                            >
                                Explore Collection
                                <FiArrowRight
                                    size={15}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </Button>
                            <Button
                                variant="outline"
                                className="group border border-[#1E130C]/20 bg-transparent text-[#1E130C] hover:border-[#B85C38] hover:text-[#B85C38] rounded-none h-13 px-8 tracking-widest uppercase text-xs transition-colors duration-300"
                                style={{ fontFamily: "'Jost', sans-serif", height: '52px' }}
                            >
                                Our Story
                            </Button>
                        </div>

                        {/* Stats row */}
                        <div className="flex items-center gap-8">
                            {[
                                { value: '200+', label: 'Products' },
                                { value: '4.9★', label: 'Rating' },
                                { value: '5K+', label: 'Happy Homes' },
                            ].map((stat) => (
                                <div key={stat.label} className="flex flex-col">
                                    <span
                                        className="text-[#B85C38] font-semibold text-lg"
                                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px' }}
                                    >
                                        {stat.value}
                                    </span>
                                    <span
                                        className="text-[#5A4438] text-[10px] tracking-widest uppercase"
                                        style={{ fontFamily: "'Jost', sans-serif" }}
                                    >
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Feature Cards + Decorative */}
                    <div className="relative hidden lg:flex items-center justify-center">
                        {/*
                            ── 10. Replaced blur-2xl (expensive filter) with a simple
                               radial-gradient div. Visually near-identical, zero GPU filter cost.
                        */}
                        <div
                            ref={decorRef}
                            className="absolute top-10 right-10 w-28 h-28 rounded-full opacity-40"
                            style={{
                                background: 'radial-gradient(circle, #C9A86C 0%, #B85C38 60%, transparent 100%)',
                            }}
                            aria-hidden="true"
                        />

                        {/* Category showcase grid */}
                        <div className="relative grid grid-cols-2 gap-4 w-full max-w-[420px]">
                            {/* Large card top-left */}
                            <div className="col-span-2 bg-[#EDE3D4] rounded-sm overflow-hidden h-52 relative group cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1E130C]/60 to-transparent" />
                                <div
                                    className="absolute inset-0 flex items-center justify-center"
                                    style={{
                                        background: 'linear-gradient(135deg, #D4C0A0 0%, #C4A882 50%, #B8916A 100%)',
                                    }}
                                >
                                    <MdBed size={80} className="text-[#F7F2E9]/30" />
                                </div>
                                <div className="absolute bottom-4 left-5 right-5 z-10">
                                    <p
                                        className="text-white text-xl font-semibold"
                                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                    >
                                        Bedding Collection
                                    </p>
                                    <p
                                        className="text-white/70 text-xs tracking-wider mt-0.5"
                                        style={{ fontFamily: "'Jost', sans-serif" }}
                                    >
                                        New Arrivals
                                    </p>
                                </div>
                                <div className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {/* ── 11. Removed backdrop-blur-sm from card overlay button ── */}
                                    <FiArrowRight size={14} className="text-white" />
                                </div>
                            </div>

                            {/* Small card bottom-left */}
                            <div className="bg-[#2C1A0E] rounded-sm overflow-hidden h-44 relative group cursor-pointer flex flex-col justify-end p-4">
                                <GiCandleLight size={36} className="text-[#C9A86C] mb-2" />
                                <p
                                    className="text-[#F7F2E9] text-base font-semibold"
                                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                >
                                    Candles
                                </p>
                                <p
                                    className="text-[#C9A86C] text-[10px] tracking-wider uppercase mt-0.5"
                                    style={{ fontFamily: "'Jost', sans-serif" }}
                                >
                                    Hand-poured
                                </p>
                            </div>

                            {/* Small card bottom-right */}
                            <div className="bg-[#EAD9C0] rounded-sm overflow-hidden h-44 relative group cursor-pointer flex flex-col justify-end p-4">
                                <PiFlower size={36} className="text-[#B85C38] mb-2" />
                                <p
                                    className="text-[#1E130C] text-base font-semibold"
                                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                >
                                    Home Décor
                                </p>
                                <p
                                    className="text-[#B85C38] text-[10px] tracking-wider uppercase mt-0.5"
                                    style={{ fontFamily: "'Jost', sans-serif" }}
                                >
                                    Handcrafted
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom — Category Strips */}
            {/*
                ── 12. Removed backdrop-blur-sm from the category strip.
                   The visual effect is preserved via a solid semi-transparent bg.
            */}
            <div ref={catsRef} className="relative z-10 border-t border-[#E2D7C8] bg-[#F0E8D8]/90">
                <div className="max-w-7xl mx-auto px-6 lg:px-14">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E2D7C8]">
                        {categories.map(({ icon: Icon, label, desc }) => (
                            <a
                                key={label}
                                href="#"
                                className="group flex items-center gap-4 px-6 py-5 hover:bg-[#EAD9C0]/40 transition-colors duration-300 cursor-pointer"
                                // ── 13. transition-colors instead of transition-all ──
                            >
                                <div className="flex-shrink-0 h-9 w-9 rounded-full border border-[#B85C38]/30 flex items-center justify-center text-[#B85C38] group-hover:bg-[#B85C38] group-hover:text-white transition-colors duration-300">
                                    <Icon size={17} />
                                </div>
                                <div>
                                    <p
                                        className="text-[#1E130C] text-sm font-medium"
                                        style={{ fontFamily: "'Jost', sans-serif" }}
                                    >
                                        {label}
                                    </p>
                                    <p
                                        className="text-[#8A7060] text-[10px] tracking-wider"
                                        style={{ fontFamily: "'Jost', sans-serif" }}
                                    >
                                        {desc}
                                    </p>
                                </div>
                                <FiArrowDownRight
                                    size={14}
                                    className="ml-auto text-[#B85C38] opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                                    // ── 14. transition-opacity instead of transition-all ──
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}