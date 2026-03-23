'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import {
    FaFacebookF,
    FaPinterestP,
    FaWhatsapp,
} from 'react-icons/fa'
import {
    FiArrowRight,
    FiArrowUpRight,
    FiInstagram,
    FiMail,
    FiMapPin,
    FiPhone,
} from 'react-icons/fi'
import { GiCandleLight } from 'react-icons/gi'

gsap.registerPlugin(ScrollTrigger)

const shopLinks = [
    'Beddings',
    'Home Décor',
    'Candles',
    'Crockery',
    'New Arrivals',
    'Best Sellers',
    'Gift Sets',
]

const helpLinks = [
    'FAQs',
    'Track My Order',
    'Returns & Exchanges',
    'Shipping Policy',
    'Contact Us',
    'Size Guide',
]

const aboutLinks = [
    'Our Story',
    'Sustainability',
    'Press & Features',
    'Stockists',
    'Affiliate Program',
    'Careers',
]

const socials = [
    { icon: FiInstagram, label: 'Instagram', href: '#' },
    { icon: FaPinterestP, label: 'Pinterest', href: '#' },
    { icon: FaFacebookF, label: 'Facebook', href: '#' },
    { icon: FaWhatsapp, label: 'WhatsApp', href: '#' },
]

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null)
    const topRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    useEffect(() => {
        const ctx = gsap.context(() => {
        gsap.from(topRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            },
        })

        gsap.from(gridRef.current?.children ?? [], {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 90%',
            },
        })
        }, footerRef)

        return () => ctx.revert()
    }, [])

    const handleSubscribe = () => {
        if (!email.trim()) return
        setSubscribed(true)
        setTimeout(() => setSubscribed(false), 3000)
        setEmail('')
    }

    return (
        <footer ref={footerRef} className="bg-[#1A0F08] text-[#D4C8B8] relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
            <svg className="absolute right-0 bottom-0 opacity-5 w-[500px]" viewBox="0 0 500 500" fill="none">
            <circle cx="500" cy="500" r="350" stroke="#C9A86C" strokeWidth="1" />
            <circle cx="500" cy="500" r="250" stroke="#B85C38" strokeWidth="0.5" />
            <circle cx="500" cy="500" r="150" stroke="#C9A86C" strokeWidth="0.5" />
            </svg>
            <div
            className="absolute top-0 left-0 w-full h-px opacity-20"
            style={{ background: 'linear-gradient(90deg, transparent, #C9A86C, transparent)' }}
            />
        </div>

        {/* Newsletter Strip */}
        <div
            ref={topRef}
            className="relative border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-14 py-14">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
                {/* Left */}
                <div className="text-center lg:text-left max-w-md">
                <div className="flex items-center gap-2 justify-center lg:justify-start mb-3">
                    <GiCandleLight size={16} className="text-[#C9A86C]" />
                    <span
                    className="text-[9px] tracking-[0.3em] text-[#C9A86C] uppercase"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                    Stay in the loop
                    </span>
                </div>
                <h3
                    className="text-[#F7F2E9] leading-tight mb-2"
                    style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(26px, 3vw, 38px)',
                    fontWeight: 600,
                    }}
                >
                    Get 10% off your{' '}
                    <span className="italic text-[#C9A86C]">first order</span>
                </h3>
                <p
                    className="text-[#A89880] text-sm leading-relaxed"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                >
                    Subscribe to our newsletter for new arrivals, exclusive offers, and home styling inspiration.
                </p>
                </div>

                {/* Newsletter form */}
                <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 min-w-0 lg:min-w-[400px]">
                <div className="relative flex-1">
                    <FiMail
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B5A48]"
                    />
                    <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10 h-12 rounded-none bg-white/5 border-white/10 text-[#D4C8B8] placeholder:text-[#6B5A48] focus-visible:ring-1 focus-visible:ring-[#C9A86C] focus-visible:ring-offset-0 focus-visible:border-[#C9A86C] text-sm"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    />
                </div>
                <Button
                    onClick={handleSubscribe}
                    className="h-12 px-8 rounded-none bg-[#B85C38] hover:bg-[#C9A86C] text-white hover:text-[#1E130C] tracking-widest uppercase text-[10px] transition-all duration-400 border-0 font-medium flex-shrink-0 flex items-center gap-2"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                >
                    {subscribed ? '✓ Subscribed!' : (
                    <>
                        Subscribe
                        <FiArrowRight size={13} />
                    </>
                    )}
                </Button>
                </div>
            </div>
            </div>
        </div>

        {/* Main Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-16">
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

            {/* Brand column */}
            <div>
                {/* Logo */}
                <div className="mb-6">
                <p
                    className="text-[#F7F2E9] text-2xl font-semibold leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.04em' }}
                >
                    Aydi Chattels
                </p>
                <p
                    className="text-[#C9A86C] text-[9px] tracking-[0.3em] uppercase mt-1"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                >
                    by Jashifa
                </p>
                </div>

                <p
                className="text-[#8A7860] text-sm leading-relaxed mb-6"
                style={{ fontFamily: "'Jost', sans-serif" }}
                >
                Curating soulful home goods for lives well-lived. Each piece is chosen with love and an eye for enduring beauty.
                </p>

                {/* Contact info */}
                <div className="space-y-3">
                {[
                    { icon: FiMapPin, text: 'Lucknow, Uttar Pradesh, India' },
                    { icon: FiPhone, text: '+91 98765 43210' },
                    { icon: FiMail, text: 'hello@aydichattelsbyjashifa.com' },
                ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-start gap-3">
                    <Icon size={13} className="text-[#C9A86C] mt-0.5 flex-shrink-0" />
                    <span
                        className="text-[#8A7860] text-xs leading-relaxed"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                        {text}
                    </span>
                    </div>
                ))}
                </div>

                {/* Socials */}
                <div className="flex items-center gap-2 mt-6">
                {socials.map(({ icon: Icon, label, href }) => (
                    <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-[#8A7860] hover:border-[#C9A86C] hover:text-[#C9A86C] transition-all duration-300"
                    >
                    <Icon size={13} />
                    </a>
                ))}
                </div>
            </div>

            {/* Shop links */}
            <div>
                <h4
                className="text-[#F7F2E9] text-[10px] tracking-[0.2em] uppercase mb-6"
                style={{ fontFamily: "'Jost', sans-serif" }}
                >
                Shop
                </h4>
                <ul className="space-y-3">
                {shopLinks.map((link) => (
                    <li key={link}>
                    <a
                        href="#"
                        className="group flex items-center gap-2 text-[#8A7860] hover:text-[#C9A86C] text-sm transition-colors duration-200"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                        <span className="h-px w-3 bg-[#8A7860] group-hover:w-5 group-hover:bg-[#C9A86C] transition-all duration-300" />
                        {link}
                    </a>
                    </li>
                ))}
                </ul>
            </div>

            {/* Help links */}
            <div>
                <h4
                className="text-[#F7F2E9] text-[10px] tracking-[0.2em] uppercase mb-6"
                style={{ fontFamily: "'Jost', sans-serif" }}
                >
                Help
                </h4>
                <ul className="space-y-3">
                {helpLinks.map((link) => (
                    <li key={link}>
                    <a
                        href="#"
                        className="group flex items-center gap-2 text-[#8A7860] hover:text-[#C9A86C] text-sm transition-colors duration-200"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                        <span className="h-px w-3 bg-[#8A7860] group-hover:w-5 group-hover:bg-[#C9A86C] transition-all duration-300" />
                        {link}
                    </a>
                    </li>
                ))}
                </ul>
            </div>

            {/* About links */}
            <div>
                <h4
                className="text-[#F7F2E9] text-[10px] tracking-[0.2em] uppercase mb-6"
                style={{ fontFamily: "'Jost', sans-serif" }}
                >
                About
                </h4>
                <ul className="space-y-3">
                {aboutLinks.map((link) => (
                    <li key={link}>
                    <a
                        href="#"
                        className="group flex items-center gap-2 text-[#8A7860] hover:text-[#C9A86C] text-sm transition-colors duration-200"
                        style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                        <span className="h-px w-3 bg-[#8A7860] group-hover:w-5 group-hover:bg-[#C9A86C] transition-all duration-300" />
                        {link}
                    </a>
                    </li>
                ))}
                </ul>

                {/* Featured quote */}
                <div className="mt-8 border-l-2 border-[#C9A86C]/30 pl-4">
                <p
                    className="text-[#6B5A48] text-xs italic leading-relaxed"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px' }}
                >
                    &quot;A home is a reflection of the soul that lives within it.&quot;
                </p>
                <p
                    className="text-[#C9A86C] text-[9px] tracking-wider mt-2 uppercase"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                >
                    — Jashifa
                </p>
                </div>
            </div>
            </div>
        </div>

        {/* Bottom bar */}
        <Separator className="bg-white/5" />
        <div className="max-w-7xl mx-auto px-6 lg:px-14 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
                className="text-[#4A3A2A] text-[10px] tracking-wider text-center sm:text-left"
                style={{ fontFamily: "'Jost', sans-serif" }}
            >
                © {new Date().getFullYear()} Aydi Chattels by Jashifa. All rights reserved.
            </p>

            <div className="flex items-center gap-5">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a
                    key={link}
                    href="#"
                    className="text-[#4A3A2A] hover:text-[#C9A86C] text-[10px] tracking-wider transition-colors duration-200"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                >
                    {link}
                </a>
                ))}
            </div>

            {/* Scroll to top */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 text-[#4A3A2A] hover:text-[#C9A86C] transition-colors duration-200 group"
                aria-label="Back to top"
            >
                <span
                className="text-[10px] tracking-widest uppercase hidden sm:block"
                style={{ fontFamily: "'Jost', sans-serif" }}
                >
                Back to top
                </span>
                <div className="h-7 w-7 rounded-full border border-white/10 group-hover:border-[#C9A86C] flex items-center justify-center transition-all duration-300">
                <FiArrowUpRight size={13} className="group-hover:text-[#C9A86C]" />
                </div>
            </button>
            </div>
        </div>
        </footer>
    )
}