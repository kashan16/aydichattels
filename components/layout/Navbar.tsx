'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { FiHeart, FiMenu, FiSearch, FiShoppingBag, FiX } from 'react-icons/fi'

const navLinks = [
    { label: 'Collections', href: '#collections' },
    { label: 'Beddings', href: '#beddings' },
    { label: 'Home Décor', href: '#homedecor' },
    { label: 'Candles', href: '#candles' },
    { label: 'Crockery', href: '#crockery' },
]

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null)
    const logoRef = useRef<HTMLDivElement>(null)
    const linksRef = useRef<HTMLDivElement>(null)
    const actionsRef = useRef<HTMLDivElement>(null)
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
        const tl = gsap.timeline()

        tl.from(logoRef.current, {
            x: -40,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
        })
            .from(
            linksRef.current?.children ?? [],
            {
                y: -20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power2.out',
            },
            '-=0.5'
            )
            .from(
            actionsRef.current?.children ?? [],
            {
                x: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
            },
            '-=0.5'
            )
        })

        const handleScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', handleScroll)

        return () => {
        ctx.revert()
        window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled
            ? 'bg-[#F7F2E9]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(30,19,12,0.08)]'
            : 'bg-transparent'
        }`}
        >
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
            <div className="flex items-center justify-between h-[76px]">

            {/* Logo */}
            <div ref={logoRef} className="flex flex-col leading-none cursor-pointer select-none">
                <span
                className="text-[22px] font-semibold tracking-wide text-[#1E130C]"
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.04em' }}
                >
                Aydi Chattels
                </span>
                <span
                className="text-[9px] tracking-[0.3em] text-[#B85C38] uppercase mt-0.5"
                style={{ fontFamily: "'Jost', sans-serif" }}
                >
                by Jashifa
                </span>
            </div>

            {/* Desktop Nav Links */}
            <div ref={linksRef} className="hidden lg:flex items-center gap-9">
                {navLinks.map((link) => (
                <a
                    key={link.label}
                    href={link.href}
                    className="group relative text-[11px] font-medium tracking-[0.18em] text-[#1E130C] uppercase transition-colors duration-300 hover:text-[#B85C38]"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#B85C38] transition-all duration-300 group-hover:w-full" />
                </a>
                ))}
            </div>

            {/* Action Icons */}
            <div ref={actionsRef} className="flex items-center gap-3">
                <button
                className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-[#1E130C] transition-all duration-300 hover:text-[#B85C38] hover:bg-[#F0E8DC]"
                aria-label="Search"
                >
                <FiSearch size={18} />
                </button>

                <button
                className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-[#1E130C] transition-all duration-300 hover:text-[#B85C38] hover:bg-[#F0E8DC]"
                aria-label="Wishlist"
                >
                <FiHeart size={18} />
                </button>

                <button
                className="relative h-9 w-9 flex items-center justify-center rounded-full text-[#1E130C] transition-all duration-300 hover:text-[#B85C38] hover:bg-[#F0E8DC]"
                aria-label="Cart"
                >
                <FiShoppingBag size={18} />
                <Badge
                    className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center rounded-full bg-[#B85C38] text-white border-0"
                    style={{ fontSize: '9px', fontFamily: "'Jost', sans-serif" }}
                >
                    3
                </Badge>
                </button>

                {/* Mobile hamburger */}
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                    <button
                    className="lg:hidden h-9 w-9 flex items-center justify-center rounded-full text-[#1E130C] hover:bg-[#F0E8DC] transition-all duration-300"
                    aria-label="Menu"
                    >
                    {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                    </button>
                </SheetTrigger>
                <SheetContent
                    side="right"
                    className="w-[300px] bg-[#F7F2E9] border-l border-[#E8DDD0] p-0"
                >
                    <div className="flex flex-col h-full px-8 py-10">
                    {/* Mobile Logo */}
                    <div className="mb-10">
                        <p
                        className="text-xl font-semibold text-[#1E130C]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                        Aydi Chattels
                        </p>
                        <p
                        className="text-[9px] tracking-[0.3em] text-[#B85C38] uppercase mt-1"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                        >
                        by Jashifa
                        </p>
                    </div>

                    {/* Mobile Links */}
                    <nav className="flex flex-col gap-1">
                        {navLinks.map((link, i) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between py-4 border-b border-[#E2D7C8] text-[#1E130C] hover:text-[#B85C38] transition-colors duration-200"
                            style={{ fontFamily: "'Jost', sans-serif", fontSize: '13px', letterSpacing: '0.12em' }}
                        >
                            <span className="uppercase tracking-widest">{link.label}</span>
                            <span className="text-[#B85C38] text-xs">0{i + 1}</span>
                        </a>
                        ))}
                    </nav>

                    {/* Mobile CTA */}
                    <div className="mt-auto pt-8">
                        <Button
                        className="w-full bg-[#B85C38] hover:bg-[#A04E2E] text-white rounded-none h-12 tracking-widest uppercase text-xs border-0"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                        >
                        Shop Now
                        </Button>
                    </div>
                    </div>
                </SheetContent>
                </Sheet>
            </div>
            </div>
        </div>

        {/* Bottom border — visible when scrolled */}
        <div
            className={`h-px bg-[#E2D7C8] transition-opacity duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-0'
            }`}
        />
        </nav>
    )
}
