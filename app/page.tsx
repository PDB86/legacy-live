"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  Phone,
  Star,
  Menu,
  X,
  User,
  Calendar,
  Music,
  MapPin,
  Users,
  Building,
  Headphones,
  ArrowRight,
  Quote,
  CheckCircle,
  Instagram,
  Facebook,
} from "lucide-react"
import Link from "next/link"
import { submitContactForm } from "./actions/contact"

export default function LuxuryLiveEntertainment() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())
  const [visibleReviews, setVisibleReviews] = useState<Set<number>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const formatRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const reviewRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})
  const heroRef = useRef<HTMLDivElement>(null)
  // Particle state for hero section
  const [particles, setParticles] = useState<
    { left: number; top: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute("data-format-id")
            if (cardId) {
              setVisibleCards((prev) => new Set([...prev, cardId]))
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    Object.values(formatRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const reviewObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reviewIndex = entry.target.getAttribute("data-review-index")
            if (reviewIndex !== null) {
              setVisibleReviews((prev) => new Set([...prev, Number.parseInt(reviewIndex)]))
            }
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    Object.values(reviewRefs.current).forEach((ref) => {
      if (ref) reviewObserver.observe(ref)
    })

    return () => reviewObserver.disconnect()
  }, [])

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3,
      }))
    );
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const formData = new FormData(event.currentTarget)
      const result = await submitContactForm(formData)

      setIsSubmitting(false)
      setSubmitMessage({
        type: result.success ? "success" : "error",
        text: result.message,
      })

      if (result.success) {
        // Reset form with null check
        if (event.currentTarget) {
          event.currentTarget.reset()
        }
        // Clear message after 5 seconds
        setTimeout(() => setSubmitMessage(null), 5000)
      }
    } catch (error) {
      setIsSubmitting(false)
      setSubmitMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again.",
      })
    }
  }

  const bandFormats = [
    {
      id: "dj-bam",
      name: "DJ BAM",
      subtitle: "The Groove Architect",
      description:
        "Pure energy. No filler. DJ BAM brings old-school swagger with modern sophistication. From classic throwbacks to contemporary chart-toppers, every set is expertly curated and flawlessly delivered.",
      accentColor: "#0d9488",
      lightAccent: "#5eead4",
    },
    {
      id: "dj-fever",
      name: "DJ FEVER",
      subtitle: "Refined Beats, Elevated Vibes",
      description:
        "Cool, smooth, and irresistibly sophisticated. DJ Fever transforms your event into an immersive sonic experience. From deep house to Latin grooves, he brings the club's energy with upscale refinement.",
      accentColor: "#a21caf",
      lightAccent: "#f0abfc",
    },
    {
      id: "dj-tony",
      name: "DJ TONY",
      subtitle: "The Master of Ceremonies",
      description:
        "Lights, camera, elegance. DJ Tony isn't just performing — he's orchestrating an experience. Expect charisma, crowd mastery, and a sophisticated approach to musical storytelling.",
      accentColor: "#d97706",
      lightAccent: "#fcd34d",
    },
    {
      id: "latin-band",
      name: "LATIN ENSEMBLE",
      subtitle: "Ritmo y Elegancia",
      description:
        "From salsa to reggaeton, this ensemble doesn't just perform — they create magic. Live percussion, vocal excellence, and irresistible Latin rhythms that captivate every generation with refined energy.",
      accentColor: "#0f766e",
      lightAccent: "#99f6e4",
    },
    {
      id: "party-band",
      name: "SIGNATURE BAND",
      subtitle: "The Complete Experience",
      description:
        "This is the pinnacle. A full-scale, sophisticated live show featuring powerhouse vocalists and world-class musicians. From Bruno Mars to Beyoncé, we don't just cover songs — we reimagine them.",
      accentColor: "#b45309",
      lightAccent: "#fde68a",
    },
  ]

  const testimonials = [
    {
      quote:
        "They elevated our wedding beyond our wildest dreams. The sophistication and energy were absolutely perfect.",
      name: "Sofia Laurent",
      event: "Private Estate Wedding, Hamptons",
      rating: 5,
    },
    {
      quote:
        "Absolutely extraordinary. The dance floor was alive all evening. The most refined entertainment we've ever experienced.",
      name: "Marcus & Jennifer Whitmore",
      event: "Corporate Gala, Manhattan",
      rating: 5,
    },
    {
      quote:
        "DJ BAM brought an incredible energy while maintaining the elegance our event required. Simply outstanding.",
      name: "Rachel Montgomery",
      event: "Anniversary Celebration, Beverly Hills",
      rating: 5,
    },
    {
      quote:
        "The Latin Ensemble brought pure sophistication to our celebration. Guests are still raving about the performance.",
      name: "Carlos & Maria Delacroix",
      event: "Private Villa Party, Miami",
      rating: 5,
    },
    {
      quote:
        "Professional, talented, and they understand how to create the perfect atmosphere. An unforgettable experience.",
      name: "David Kensington",
      event: "Product Launch, San Francisco",
      rating: 5,
    },
    {
      quote:
        "DJ FEVER transformed our corporate event into something truly special. The perfect blend of energy and elegance.",
      name: "Amanda Richardson",
      event: "Executive Retreat, Napa Valley",
      rating: 5,
    },
  ]

  const stats = [
    { number: "500+", label: "Exclusive Events" },
    { number: "10+", label: "Years of Excellence" },
    { number: "5★", label: "Client Rating" },
    { number: "100%", label: "Satisfaction Guarantee" },
  ]

  const reviewColors = ["#0d9488", "#b45309", "#d97706", "#0f766e", "#a21caf"]

  return (
    <div className="min-h-screen bg-charcoal-950 text-stone-50 overflow-x-hidden">
      {/* Enhanced Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrollY > 50
            ? "bg-charcoal-950/95 backdrop-blur-xl border-b border-stone-800/50 shadow-2xl"
            : "bg-transparent"
        }`}
        style={{
          transform: `translateY(${scrollY > 100 ? "-2px" : "0px"})`,
        }}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 transform transition-all duration-500 hover:scale-105 cursor-pointer">
              <img src="/legacy-live-logo-transparent.png" alt="Legacy Live Entertainment" className="h-10 w-auto md:h-12 lg:h-14 xl:h-16" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-12">
              {[
                { href: "#home", label: "Home" },
                { href: "#formats", label: "Services" },
                { href: "#reviews", label: "Testimonials" },
                { href: "#contact", label: "Contact" },
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-stone-300 hover:text-gold-400 transition-all duration-500 font-light tracking-wide text-sm uppercase group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-400 transition-all duration-500 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-stone-50 transform transition-all duration-300 hover:scale-110 hover:rotate-90"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Enhanced Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-8 pb-6 border-t border-stone-800/50 animate-in slide-in-from-top duration-500">
              <div className="flex flex-col space-y-6 mt-6">
                {[
                  { href: "#home", label: "Home" },
                  { href: "#formats", label: "Services" },
                  { href: "#reviews", label: "Testimonials" },
                  { href: "#contact", label: "Contact" },
                ].map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-stone-300 hover:text-gold-400 transition-all duration-500 font-light tracking-wide text-sm uppercase transform hover:translate-x-2"
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0,
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Enhanced Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-100 transition-all duration-1000"
            style={{
              transform: `scale(${1 + scrollY * 0.0002}) translateY(${scrollY * 0.3}px)`,
            }}
          >
            <source
              src="/deck_1.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-950/30 via-charcoal-950/50 to-charcoal-950/60"></div>

          {/* Animated particles (hydration-safe) */}
          <div className="absolute inset-0">
            {particles.map((p, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-gold-400/30 rounded-full animate-pulse"
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-20 text-center max-w-6xl mx-auto px-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif mb-8 leading-tight tracking-tight">
            <span className="block text-stone-50 mb-4 animate-in fade-in slide-in-from-bottom duration-1000">
              Extraordinary Live
            </span>
            <span className="block text-gold-400 italic font-light animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
              Entertainment
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 text-stone-300 max-w-4xl mx-auto leading-relaxed font-light animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
            <span className="block">Five distinctive formats. One unparalleled experience.</span>
            <span className="block">Elevating weddings, private celebrations, and corporate events.</span>
          </p>

          <Button
            type="button"
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="mx-auto px-10 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-medium py-4 text-lg transition-all duration-500 transform hover:scale-110 hover:rotate-1 hover:shadow-2xl hover:shadow-gold-500/40 rounded-xl border-2 border-gold-500 hover:border-gold-400 tracking-wide uppercase group shadow-lg shadow-gold-500/20 hover:shadow-gold-400/40 focus:ring-4 focus:ring-gold-400/40"
          >
            <span className="relative z-10">REQUEST AVAILABILITY</span>
            <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-125 group-hover:rotate-12" />
            <span className="absolute inset-0 rounded-xl bg-gold-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
          </Button>

          {/* Enhanced Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-default"
                style={{
                  animationDelay: `${index * 0.2 + 0.8}s`,
                  opacity: 0,
                  animation: `fadeInUp 1s ease-out ${index * 0.2 + 0.8}s forwards`,
                }}
              >
                <div className="text-3xl md:text-4xl font-light text-gold-400 mb-2 group-hover:text-gold-300 transition-all duration-500 transform group-hover:scale-110">
                  {stat.number}
                </div>
                <div className="text-sm text-stone-400 font-light tracking-wide uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Formats Section */}
      <section
        id="formats"
        className="relative py-24 px-6 bg-gradient-to-b from-charcoal-950 to-charcoal-900"
        style={{
          backgroundImage: 'url(/5-background.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(20,20,20,0.90)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom duration-1000">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 tracking-tight">
              <span className="text-stone-50">Five Distinctive </span>
              <span className="italic text-gold-400 font-light">Formats</span>
            </h2>
            <p className="text-xl text-stone-400 max-w-3xl mx-auto leading-relaxed font-light">
              Each format represents a complete artistic experience, meticulously crafted to create the perfect
              atmosphere for your distinguished event
            </p>
          </div>

          <div className="space-y-32">
            {bandFormats.map((format, index) => {
              const isVisible = visibleCards.has(format.id)
              const isReversed = index % 2 === 1

              return (
                <div
                  key={format.id}
                  ref={(el) => { formatRefs.current[format.id] = el; }}
                  data-format-id={format.id}
                  className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1200 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                  } ${isReversed ? "lg:grid-flow-col-dense" : ""}`}
                  style={{
                    transitionDelay: `${index * 0.3}s`,
                  }}
                >
                  {/* Enhanced Video Section */}
                  <div
                    className={`${isReversed ? "lg:col-start-2" : ""} order-1 ${isReversed ? "lg:order-2" : "lg:order-1"}`}
                  >
                    {format.id === "dj-bam" && (
                      <div
                        className="aspect-video bg-charcoal-800/50 backdrop-blur-sm overflow-hidden border border-stone-700/50 transition-all duration-700 transform hover:scale-[1.02] cursor-pointer group relative"
                        style={{
                          boxShadow: `0 8px 32px ${format.accentColor}20`,
                        }}
                        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                          const target = e.currentTarget as HTMLDivElement
                          target.style.boxShadow = `0 12px 48px ${format.accentColor}40, 0 0 0 1px ${format.accentColor}30`
                          target.style.transform = "scale(1.02) rotateY(2deg)"
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                          const target = e.currentTarget as HTMLDivElement
                          target.style.boxShadow = `0 8px 32px ${format.accentColor}20`
                          target.style.transform = "scale(1) rotateY(0deg)"
                        }}
                      >
                        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                          <iframe
                            src="https://player.vimeo.com/video/1098987499?h=3f109ec64e&title=0&byline=0&portrait=0"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                            title="DJ BAM PROMO"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    )}
                    {format.id === "dj-fever" && (
                      <div
                        className="aspect-video bg-charcoal-800/50 backdrop-blur-sm overflow-hidden border border-stone-700/50 transition-all duration-700 transform hover:scale-[1.02] cursor-pointer group relative"
                        style={{
                          boxShadow: `0 8px 32px ${format.accentColor}20`,
                        }}
                        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                          const target = e.currentTarget as HTMLDivElement
                          target.style.boxShadow = `0 12px 48px ${format.accentColor}40, 0 0 0 1px ${format.accentColor}30`
                          target.style.transform = "scale(1.02) rotateY(-2deg)"
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                          const target = e.currentTarget as HTMLDivElement
                          target.style.boxShadow = `0 8px 32px ${format.accentColor}20`
                          target.style.transform = "scale(1) rotateY(0deg)"
                        }}
                      >
                        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                          <iframe
                            src="https://player.vimeo.com/video/1098987561?h=852b52e54f&title=0&byline=0&portrait=0"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                            title="DJ FEVER PROMO"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    )}
                    {format.id === "dj-tony" && (
                      <div
                        className="aspect-video bg-charcoal-800/50 backdrop-blur-sm overflow-hidden border border-stone-700/50 transition-all duration-700 transform hover:scale-[1.02] cursor-pointer group relative"
                        style={{
                          boxShadow: `0 8px 32px ${format.accentColor}20`,
                        }}
                        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                          const target = e.currentTarget as HTMLDivElement
                          target.style.boxShadow = `0 12px 48px ${format.accentColor}40, 0 0 0 1px ${format.accentColor}30`
                          target.style.transform = "scale(1.02) rotateY(2deg)"
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                          const target = e.currentTarget as HTMLDivElement
                          target.style.boxShadow = `0 8px 32px ${format.accentColor}20`
                          target.style.transform = "scale(1) rotateY(0deg)"
                        }}
                      >
                        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                          <iframe
                            src="https://player.vimeo.com/video/1098987612?h=c0abf2ce95&title=0&byline=0&portrait=0"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                            title="DJ TONY PROMO"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    )}
                    {format.id === "latin-band" && (
                      <div
                        className="aspect-video bg-charcoal-800/50 backdrop-blur-sm overflow-hidden border border-stone-700/50 transition-all duration-700 transform hover:scale-[1.02] cursor-pointer group relative"
                        style={{
                          boxShadow: `0 8px 32px ${format.accentColor}20`,
                        }}
                        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                          const target = e.currentTarget as HTMLDivElement
                          target.style.boxShadow = `0 12px 48px ${format.accentColor}40, 0 0 0 1px ${format.accentColor}30`
                          target.style.transform = "scale(1.02) rotateY(-2deg)"
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                          const target = e.currentTarget as HTMLDivElement
                          target.style.boxShadow = `0 8px 32px ${format.accentColor}20`
                          target.style.transform = "scale(1) rotateY(0deg)"
                        }}
                      >
                        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                          <iframe
                            src="https://player.vimeo.com/video/1098987357?h=443ed6f06e&title=0&byline=0&portrait=0"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                            title="LATIN BAND PROMO"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    )}
                    {format.id === "party-band" && (
                      <div
                        className="aspect-video bg-charcoal-800/50 backdrop-blur-sm overflow-hidden border border-stone-700/50 transition-all duration-700 transform hover:scale-[1.02] cursor-pointer group relative"
                        style={{
                          boxShadow: `0 8px 32px ${format.accentColor}20`,
                        }}
                        onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                          const target = e.currentTarget as HTMLDivElement
                          target.style.boxShadow = `0 12px 48px ${format.accentColor}40, 0 0 0 1px ${format.accentColor}30`
                          target.style.transform = "scale(1.02) rotateY(2deg)"
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                          const target = e.currentTarget as HTMLDivElement
                          target.style.boxShadow = `0 8px 32px ${format.accentColor}20`
                          target.style.transform = "scale(1) rotateY(0deg)"
                        }}
                      >
                        <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                          <iframe
                            src="https://player.vimeo.com/video/1098987411?h=c095a6fa6e&title=0&byline=0&portrait=0"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                            title="PARTY BAND PROMO"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Content Section */}
                  <div
                    className={`space-y-8 ${isReversed ? "lg:col-start-1 lg:row-start-1" : ""} order-2 ${isReversed ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <div>
                      {/* Enhanced accent line */}
                      <div
                        className="w-20 h-0.5 mb-8 transition-all duration-700 transform origin-left"
                        style={{
                          backgroundColor: format.accentColor,
                          transform: isVisible ? "scaleX(1)" : "scaleX(0)",
                        }}
                      ></div>

                      <h3
                        className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 transition-all duration-500 cursor-default tracking-tight hover:text-gold-400 transform hover:scale-105"
                        style={{ color: "#f5f5f4" }}
                      >
                        {format.name}
                      </h3>
                      <div
                        className="text-xl md:text-2xl font-serif italic mb-6 transition-all duration-500 cursor-default font-light"
                        style={{ color: format.accentColor }}
                      >
                        {format.subtitle}
                      </div>
                    </div>

                    <p className="text-lg leading-relaxed font-light max-w-2xl text-stone-300 transition-all duration-500 hover:text-stone-200">
                      {format.description}
                    </p>

                    <Button
                      variant="outline"
                      className="border-stone-600 text-stone-300 hover:bg-stone-800/50 hover:text-stone-50 transition-all duration-500 px-6 py-3 rounded-none tracking-wide uppercase text-sm bg-transparent transform hover:scale-105 hover:shadow-lg group"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Portfolio Section - Single Row Carousel */}
      <section className="relative py-24 px-6 bg-charcoal-900 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-1000">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-8 tracking-tight">
              <span className="text-stone-50">Portfolio </span>
              <span className="italic text-gold-400 font-light">Highlights</span>
            </h2>
          </div>

          {/* Enhanced Single Carousel */}
          <div className="relative mb-12 overflow-hidden">
            <div className="flex animate-scroll-left hover:pause">
              {[
                { id: 1, alt: "Luxury Wedding Reception" },
                { id: 2, alt: "Corporate Gala Atmosphere" },
                { id: 3, alt: "DJ Performance Excellence" },
                { id: 4, alt: "Live Band Sophistication" },
                { id: 5, alt: "Dance Floor Elegance" },
                { id: 6, alt: "Professional Lighting" },
                { id: 7, alt: "Crowd Engagement" },
                { id: 8, alt: "Premium Setup" },
                { id: 9, alt: "Latin Ensemble Performance" },
                { id: 10, alt: "Sophisticated Party Atmosphere" },
                { id: 11, alt: "Premium Sound Equipment" },
                { id: 12, alt: "Event Highlights" },
              ].map((item, index) => (
                <div
                  key={`carousel-${item.id}`}
                  className="flex-shrink-0 w-[450px] h-[350px] mx-6 bg-charcoal-800/30 backdrop-blur-sm border-2 border-stone-700/30 overflow-hidden transition-all duration-700 transform hover:scale-110 hover:-translate-y-4 cursor-pointer group relative shadow-2xl hover:shadow-gold-500/20"
                  style={{
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                    const target = e.currentTarget as HTMLDivElement
                    target.style.boxShadow = "0 30px 60px rgba(217, 119, 6, 0.3), 0 0 0 2px rgba(217, 119, 6, 0.4)"
                    target.style.borderColor = "rgba(217, 119, 6, 0.6)"
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    const target = e.currentTarget as HTMLDivElement
                    target.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)"
                    target.style.borderColor = "rgba(120, 113, 108, 0.3)"
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-charcoal-800 to-charcoal-900 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=350&width=450&text=Event+${item.id}`}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 opacity-90 group-hover:opacity-100 brightness-90 group-hover:brightness-110 contrast-110 group-hover:contrast-125 saturate-110 group-hover:saturate-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-gold-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute bottom-8 left-8 right-8 text-stone-100 text-lg font-light opacity-0 group-hover:opacity-100 transition-all duration-700 tracking-wide transform translate-y-6 group-hover:translate-y-0 drop-shadow-lg">
                      <div className="text-xl font-serif text-gold-400 mb-2">{item.alt}</div>
                      <div className="text-sm text-stone-300 uppercase tracking-wider">Premium Event Experience</div>
                    </div>
                    {/* Enhanced glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-r from-gold-400/20 via-transparent to-gold-600/20 blur-xl"></div>
                  </div>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                { id: 1, alt: "Luxury Wedding Reception" },
                { id: 2, alt: "Corporate Gala Atmosphere" },
                { id: 3, alt: "DJ Performance Excellence" },
                { id: 4, alt: "Live Band Sophistication" },
                { id: 5, alt: "Dance Floor Elegance" },
                { id: 6, alt: "Professional Lighting" },
                { id: 7, alt: "Crowd Engagement" },
                { id: 8, alt: "Premium Setup" },
                { id: 9, alt: "Latin Ensemble Performance" },
                { id: 10, alt: "Sophisticated Party Atmosphere" },
                { id: 11, alt: "Premium Sound Equipment" },
                { id: 12, alt: "Event Highlights" },
              ].map((item, index) => (
                <div
                  key={`carousel-dup-${item.id}`}
                  className="flex-shrink-0 w-[450px] h-[350px] mx-6 bg-charcoal-800/30 backdrop-blur-sm border-2 border-stone-700/30 overflow-hidden transition-all duration-700 transform hover:scale-110 hover:-translate-y-4 cursor-pointer group relative shadow-2xl hover:shadow-gold-500/20"
                  style={{
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                    const target = e.currentTarget as HTMLDivElement
                    target.style.boxShadow = "0 30px 60px rgba(217, 119, 6, 0.3), 0 0 0 2px rgba(217, 119, 6, 0.4)"
                    target.style.borderColor = "rgba(217, 119, 6, 0.6)"
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    const target = e.currentTarget as HTMLDivElement
                    target.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)"
                    target.style.borderColor = "rgba(120, 113, 108, 0.3)"
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-charcoal-800 to-charcoal-900 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=350&width=450&text=Event+${item.id}`}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 opacity-90 group-hover:opacity-100 brightness-90 group-hover:brightness-110 contrast-110 group-hover:contrast-125 saturate-110 group-hover:saturate-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-gold-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute bottom-8 left-8 right-8 text-stone-100 text-lg font-light opacity-0 group-hover:opacity-100 transition-all duration-700 tracking-wide transform translate-y-6 group-hover:translate-y-0 drop-shadow-lg">
                      <div className="text-xl font-serif text-gold-400 mb-2">{item.alt}</div>
                      <div className="text-sm text-stone-300 uppercase tracking-wider">Premium Event Experience</div>
                    </div>
                    {/* Enhanced glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-r from-gold-400/20 via-transparent to-gold-600/20 blur-xl"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Call to Action */}
          <div className="text-center mt-16">
            <Button
              variant="outline"
              size="lg"
              className="border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-charcoal-950 font-medium px-8 py-4 text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-gold-500/25 rounded-none tracking-wide uppercase bg-transparent group"
            >
              View Complete Portfolio
              <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Standards Section */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-charcoal-900 to-charcoal-950">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom duration-1000">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-8 tracking-tight">
              <span className="text-stone-50">Our </span>
              <span className="italic text-gold-400 font-light">Standards</span>
            </h2>
            <p className="text-xl text-stone-400 font-light max-w-3xl mx-auto">
              Six pillars of excellence that define every Legacy Live Entertainment experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Custom */}
            <div className="group text-center p-8 bg-charcoal-800/20 backdrop-blur-sm border border-stone-700/30 hover:border-gold-500/30 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 cursor-default">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-gold-400/20 to-gold-600/20 rounded-full border border-gold-500/30 group-hover:border-gold-400/50 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                <svg
                  className="w-8 h-8 text-gold-400 group-hover:text-gold-300 transition-colors duration-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM3 19V5h18v14H3z" />
                  <path d="M8 15c.83 0 1.5-.67 1.5-1.5 0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5c0 .83.67 1.5 1.5 1.5zm0-9C6.34 6 5 7.34 5 9s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm8 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 9c-.83 0-1.5.67-1.5 1.5 0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5c0-.83-.67-1.5-1.5-1.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif mb-4 text-stone-50 group-hover:text-gold-400 transition-colors duration-500">
                Custom
              </h3>
              <p className="text-stone-400 leading-relaxed font-light group-hover:text-stone-300 transition-colors duration-500">
                Because every event is unique, Legacy Live delivers a tailor-made performance designed to meet your
                specific needs and vision.
              </p>
            </div>

            {/* Interactive */}
            <div className="group text-center p-8 bg-charcoal-800/20 backdrop-blur-sm border border-stone-700/30 hover:border-gold-500/30 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 cursor-default">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-gold-400/20 to-gold-600/20 rounded-full border border-gold-500/30 group-hover:border-gold-400/50 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                <svg
                  className="w-8 h-8 text-gold-400 group-hover:text-gold-300 transition-colors duration-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-serif mb-4 text-stone-50 group-hover:text-gold-400 transition-colors duration-500">
                Interactive
              </h3>
              <p className="text-stone-400 leading-relaxed font-light group-hover:text-stone-300 transition-colors duration-500">
                Our performers are highly interactive, inviting guests to take part in a unique and memorable musical
                experience that engages everyone.
              </p>
            </div>

            {/* International */}
            <div className="group text-center p-8 bg-charcoal-800/20 backdrop-blur-sm border border-stone-700/30 hover:border-gold-500/30 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 cursor-default">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-gold-400/20 to-gold-600/20 rounded-full border border-gold-500/30 group-hover:border-gold-400/50 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                <svg
                  className="w-8 h-8 text-gold-400 group-hover:text-gold-300 transition-colors duration-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif mb-4 text-stone-50 group-hover:text-gold-400 transition-colors duration-500">
                International
              </h3>
              <p className="text-stone-400 leading-relaxed font-light group-hover:text-stone-300 transition-colors duration-500">
                Fluent in multiple languages and performing diverse repertoires, we offer a versatile experience that
                engages all audiences.
              </p>
            </div>

            {/* Reliable */}
            <div className="group text-center p-8 bg-charcoal-800/20 backdrop-blur-sm border border-stone-700/30 hover:border-gold-500/30 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 cursor-default">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-gold-400/20 to-gold-600/20 rounded-full border border-gold-500/30 group-hover:border-gold-400/50 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                <svg
                  className="w-8 h-8 text-gold-400 group-hover:text-gold-300 transition-colors duration-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-serif mb-4 text-stone-50 group-hover:text-gold-400 transition-colors duration-500">
                Reliable
              </h3>
              <p className="text-stone-400 leading-relaxed font-light group-hover:text-stone-300 transition-colors duration-500">
                We take our mission seriously: punctuality, professionalism, and attention to detail. Nothing is left up
                to chance in our performances.
              </p>
            </div>

            {/* Savoir-Faire */}
            <div className="group text-center p-8 bg-charcoal-800/20 backdrop-blur-sm border border-stone-700/30 hover:border-gold-500/30 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 cursor-default">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-gold-400/20 to-gold-600/20 rounded-full border border-gold-500/30 group-hover:border-gold-400/50 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                <svg
                  className="w-8 h-8 text-gold-400 group-hover:text-gold-300 transition-colors duration-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  <path d="M16.5 6L12 7.5V3h4.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif mb-4 text-stone-50 group-hover:text-gold-400 transition-colors duration-500">
                Savoir-Faire
              </h3>
              <p className="text-stone-400 leading-relaxed font-light group-hover:text-stone-300 transition-colors duration-500">
                The right song at the right time! Our expert control of the mood will take your guests from anticipation
                to euphoria—a night they will never forget.
              </p>
            </div>

            {/* Passion */}
            <div className="group text-center p-8 bg-charcoal-800/20 backdrop-blur-sm border border-stone-700/30 hover:border-gold-500/30 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 cursor-default">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-gold-400/20 to-gold-600/20 rounded-full border border-gold-500/30 group-hover:border-gold-400/50 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                <svg
                  className="w-8 h-8 text-gold-400 group-hover:text-gold-300 transition-colors duration-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif mb-4 text-stone-50 group-hover:text-gold-400 transition-colors duration-500">
                Passion
              </h3>
              <p className="text-stone-400 leading-relaxed font-light group-hover:text-stone-300 transition-colors duration-500">
                Our artists' love for their craft shows not only in their explosive live energy, but also in the years
                spent mastering their instruments and performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <section className="relative py-16 px-6 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif text-charcoal-950 tracking-wide uppercase font-light">
              You Are In Good Company
            </h2>
          </div>

          {/* Brand Logos Carousel */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-left hover:pause">
              {/* First set of logos */}
              {[
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1e88b3eb1ef4d3da35dc483878ba5eb5-i5YD1ntgJhGPfeg4eXwlDvwLwIyQAE.webp",
                  alt: "Brand Logo 1",
                },
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8306eb45da3baff6618fcfb80807c0ae-ddgta720Tv3r3MiYJILaKLwoCV8h0W.webp",
                  alt: "Brand Logo 2",
                },
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ec0aa507019ec22c04b19d01122bdb35-KhMNrkTLUly2ZangKCSXZ1WSZSxUIy.webp",
                  alt: "Lacoste",
                },
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/887958a82e68bd667673369c3a7ce8ca-nr6KKLwuP25x16QPQIxcwawDZRJsGA.webp",
                  alt: "Brand Logo 4",
                },
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4b57525261aafa18a6b7f15a86e1d6c0-KEjzfzEEIab8Bxmx6GiAp2LHfkYERN.webp",
                  alt: "Dior",
                },
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/be67c46f540fe69cb0a52f24b5986d62-vj8ROTOS9KVl9R60xRUJzzPEoEV0H5.webp",
                  alt: "Brand Logo 6",
                },
              ].map((logo, index) => (
                <div
                  key={`logo-${index}`}
                  className="flex-shrink-0 w-32 md:w-40 lg:w-48 h-16 md:h-20 mx-6 md:mx-8 flex items-center justify-center transition-all duration-500 hover:scale-110 cursor-pointer group"
                >
                  <img
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 filter brightness-0 contrast-200"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(13%) sepia(9%) saturate(1018%) hue-rotate(314deg) brightness(95%) contrast(88%)",
                    }}
                  />
                </div>
              ))}

              {/* Duplicate set for seamless loop */}
              {[
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1e88b3eb1ef4d3da35dc483878ba5eb5-i5YD1ntgJhGPfeg4eXwlDvwLwIyQAE.webp",
                  alt: "Brand Logo 1",
                },
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8306eb45da3baff6618fcfb80807c0ae-ddgta720Tv3r3MiYJILaKLwoCV8h0W.webp",
                  alt: "Brand Logo 2",
                },
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ec0aa507019ec22c04b19d01122bdb35-KhMNrkTLUly2ZangKCSXZ1WSZSxUIy.webp",
                  alt: "Lacoste",
                },
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/887958a82e68bd667673369c3a7ce8ca-nr6KKLwuP25x16QPQIxcwawDZRJsGA.webp",
                  alt: "Brand Logo 4",
                },
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4b57525261aafa18a6b7f15a86e1d6c0-KEjzfzEEIab8Bxmx6GiAp2LHfkYERN.webp",
                  alt: "Dior",
                },
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/be67c46f540fe69cb0a52f24b5986d62-vj8ROTOS9KVl9R60xRUJzzPEoEV0H5.webp",
                  alt: "Brand Logo 6",
                },
              ].map((logo, index) => (
                <div
                  key={`logo-dup-${index}`}
                  className="flex-shrink-0 w-32 md:w-40 lg:w-48 h-16 md:h-20 mx-6 md:mx-8 flex items-center justify-center transition-all duration-500 hover:scale-110 cursor-pointer group"
                >
                  <img
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 filter brightness-0 contrast-200"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(13%) sepia(9%) saturate(1018%) hue-rotate(314deg) brightness(95%) contrast(88%)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="reviews" className="relative py-24 px-6 overflow-hidden">
        {/* Enhanced Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-300"
            style={{
              transform: `translateY(${scrollY * 0.1}px) scale(1.1)`,
            }}
          >
            <source src="/deck.webm" type="video/webm" />
          </video>
        </div>

        {/* Enhanced Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-charcoal-950/90 via-charcoal-950/95 to-charcoal-950/90"></div>

        {/* Content */}
        <div className="container mx-auto max-w-7xl relative z-20">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom duration-1000">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 tracking-tight">
              <span className="text-stone-50">Client </span>
              <span className="text-gold-400 italic font-light">Testimonials</span>
            </h2>
            <p className="text-xl text-stone-400 font-light">
              What our distinguished clients say about their experience
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const isVisible = visibleReviews.has(index)
              const colorIndex = index % reviewColors.length
              const accentColor = reviewColors[colorIndex]

              return (
                <div
                  key={index}
                  ref={(el) => { reviewRefs.current[index] = el; }}
                  data-review-index={index}
                  className={`group relative p-8 bg-charcoal-800/30 backdrop-blur-sm border border-stone-700/30 hover:border-gold-500/30 transition-all duration-1000 transform cursor-default ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                  } hover:scale-105 hover:-translate-y-2`}
                  style={{
                    transitionDelay: `${index * 0.2}s`,
                    boxShadow: `0 8px 32px ${accentColor}10`,
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                    const target = e.currentTarget as HTMLDivElement
                    target.style.boxShadow = `0 12px 48px ${accentColor}20, 0 0 0 1px ${accentColor}20`
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    const target = e.currentTarget as HTMLDivElement
                    target.style.boxShadow = `0 8px 32px ${accentColor}10`
                  }}
                >
                  {/* Quote Icon */}
                  <div className="absolute -top-4 left-8">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Quote className="w-4 h-4 text-charcoal-950" />
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex mb-6 mt-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-gold-400 fill-current transition-all duration-300 group-hover:scale-110"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-stone-300 leading-relaxed mb-6 font-light text-lg group-hover:text-stone-200 transition-colors duration-500">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="border-t border-stone-700/50 pt-6">
                    <div
                      className="font-serif text-lg mb-1 transition-colors duration-500 group-hover:text-gold-400"
                      style={{ color: accentColor }}
                    >
                      {testimonial.name}
                    </div>
                    <div className="text-stone-500 text-sm font-light tracking-wide">{testimonial.event}</div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-xl"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="relative py-24 px-6 bg-gradient-to-b from-charcoal-950 to-black">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <div className="space-y-12">
              <div className="animate-in fade-in slide-in-from-bottom duration-1000">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 tracking-tight">
                  <span className="text-stone-50">Let's Create </span>
                  <span className="text-gold-400 italic font-light">Magic</span>
                </h2>
                <p className="text-xl text-stone-400 leading-relaxed font-light max-w-2xl">
                  Ready to elevate your event? Contact us to discuss how Legacy Live Entertainment can create an
                  unforgettable experience tailored to your vision.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
                <div className="flex items-center space-x-6 group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-400/20 to-gold-600/20 rounded-full flex items-center justify-center border border-gold-500/30 group-hover:border-gold-400/50 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                    <Phone className="w-6 h-6 text-gold-400 group-hover:text-gold-300 transition-colors duration-500" />
                  </div>
                  <div>
                    <div className="text-stone-300 font-light text-sm uppercase tracking-wider mb-1">Phone</div>
                    <div className="text-2xl font-light text-stone-50 group-hover:text-gold-400 transition-colors duration-500">
                      +1 (305) 968-3889
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold-400/20 to-gold-600/20 rounded-full flex items-center justify-center border border-gold-500/30 group-hover:border-gold-400/50 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                    <Mail className="w-6 h-6 text-gold-400 group-hover:text-gold-300 transition-colors duration-500" />
                  </div>
                  <div>
                    <div className="text-stone-300 font-light text-sm uppercase tracking-wider mb-1">Email</div>
                    <div className="text-2xl font-light text-stone-50 group-hover:text-gold-400 transition-colors duration-500">
                      jacinnagao@gmail.com
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
                <div className="text-stone-300 font-light text-sm uppercase tracking-wider mb-6">Follow Us</div>
                <div className="flex space-x-8">
                  <Link
                    href="#"
                    className="flex items-center text-stone-400 hover:text-gold-400 transition-all duration-500 font-light tracking-wide transform hover:scale-110 hover:-translate-y-1"
                  >
                    <Instagram className="w-5 h-5 mr-2" /> Instagram
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center text-stone-400 hover:text-gold-400 transition-all duration-500 font-light tracking-wide transform hover:scale-110 hover:-translate-y-1"
                  >
                    <Facebook className="w-5 h-5 mr-2" /> Facebook
                  </Link>
                </div>
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div className="bg-black/40 backdrop-blur-xl border border-stone-800/50 p-8 lg:p-12 animate-in fade-in slide-in-from-bottom duration-1000 delay-700">
              <div className="mb-8">
                <h3 className="text-3xl font-serif mb-4 text-stone-50">
                  <span className="text-gold-400 italic font-light">BRING THE HEAT</span>
                </h3>
                <p className="text-stone-400 font-light">
                  Tell us about your event and let's create something extraordinary together.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500 group-focus-within:text-gold-400 transition-colors duration-300" />
                      <Input
                        name="name"
                        placeholder="Your Name"
                        required
                        className="pl-12 bg-charcoal-900/50 border-stone-700/50 text-stone-100 placeholder-stone-500 focus:border-gold-400/50 focus:ring-gold-400/20 transition-all duration-300 h-14 rounded-none"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500 group-focus-within:text-gold-400 transition-colors duration-300" />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        required
                        className="pl-12 bg-charcoal-900/50 border-stone-700/50 text-stone-100 placeholder-stone-500 focus:border-gold-400/50 focus:ring-gold-400/20 transition-all duration-300 h-14 rounded-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500 group-focus-within:text-gold-400 transition-colors duration-300" />
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        className="pl-12 bg-charcoal-900/50 border-stone-700/50 text-stone-100 placeholder-stone-500 focus:border-gold-400/50 focus:ring-gold-400/20 transition-all duration-300 h-14 rounded-none"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500 group-focus-within:text-gold-400 transition-colors duration-300" />
                      <Input
                        name="eventDate"
                        type="date"
                        placeholder="Event Date"
                        required
                        className="pl-12 bg-charcoal-900/50 border-stone-700/50 text-stone-100 placeholder-stone-500 focus:border-gold-400/50 focus:ring-gold-400/20 transition-all duration-300 h-14 rounded-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <div className="relative">
                      <Music className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500 group-focus-within:text-gold-400 transition-colors duration-300" />
                      <select
                        name="eventType"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-charcoal-900/50 border border-stone-700/50 text-stone-100 focus:border-gold-400/50 focus:ring-gold-400/20 transition-all duration-300 h-14 rounded-none appearance-none"
                      >
                        <option value="">Event Type</option>
                        <option value="wedding">Wedding</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="private">Private Party</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="birthday">Birthday Celebration</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500 group-focus-within:text-gold-400 transition-colors duration-300" />
                      <Input
                        name="guests"
                        type="number"
                        placeholder="Expected Guests"
                        className="pl-12 bg-charcoal-900/50 border-stone-700/50 text-stone-100 placeholder-stone-500 focus:border-gold-400/50 focus:ring-gold-400/20 transition-all duration-300 h-14 rounded-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500 group-focus-within:text-gold-400 transition-colors duration-300" />
                      <Input
                        name="venue"
                        placeholder="Venue Name"
                        className="pl-12 bg-charcoal-900/50 border-stone-700/50 text-stone-100 placeholder-stone-500 focus:border-gold-400/50 focus:ring-gold-400/20 transition-all duration-300 h-14 rounded-none"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500 group-focus-within:text-gold-400 transition-colors duration-300" />
                      <Input
                        name="location"
                        placeholder="Event Location"
                        className="pl-12 bg-charcoal-900/50 border-stone-700/50 text-stone-100 placeholder-stone-500 focus:border-gold-400/50 focus:ring-gold-400/20 transition-all duration-300 h-14 rounded-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="relative">
                    <Headphones className="absolute left-4 top-4 w-5 h-5 text-stone-500 group-focus-within:text-gold-400 transition-colors duration-300" />
                    <Textarea
                      name="preferences"
                      placeholder="Tell us about your vision, music preferences, and any special requirements..."
                      rows={4}
                      className="pl-12 bg-charcoal-900/50 border-stone-700/50 text-stone-100 placeholder-stone-500 focus:border-gold-400/50 focus:ring-gold-400/20 transition-all duration-300 rounded-none resize-none"
                    />
                  </div>
                </div>

                {/* Submit Message */}
                {submitMessage && (
                  <div
                    className={`p-4 rounded-none border ${
                      submitMessage.type === "success"
                        ? "bg-green-900/20 border-green-500/30 text-green-400"
                        : "bg-red-900/20 border-red-500/30 text-red-400"
                    } animate-in fade-in slide-in-from-bottom duration-500`}
                  >
                    <div className="flex items-center space-x-3">
                      {submitMessage.type === "success" ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 flex-shrink-0" />
                      )}
                      <p className="font-light">{submitMessage.text}</p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-medium py-4 text-lg transition-all duration-500 transform hover:scale-110 hover:rotate-1 hover:shadow-2xl hover:shadow-gold-500/40 rounded-xl border-2 border-gold-500 hover:border-gold-400 tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-gold-500/20 hover:shadow-gold-400/40 focus:ring-4 focus:ring-gold-400/40"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-charcoal-950/30 border-t-charcoal-950 rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">BRING THE HEAT</span>
                      <ArrowRight className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-125 group-hover:rotate-12" />
                      <span className="absolute inset-0 rounded-xl bg-gold-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative py-16 px-6 bg-black border-t border-stone-800/50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <img src="/legacy-live-logo-transparent.png" alt="Legacy Live Entertainment" className="h-10 w-auto md:h-12 lg:h-14 xl:h-16" />
              </div>
              <p className="text-stone-400 leading-relaxed font-light max-w-sm">
                Elevating events with sophisticated live entertainment. Five distinctive formats, one unparalleled
                experience.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-stone-50 font-serif text-xl">Quick Links</h4>
              <div className="space-y-3">
                {[
                  { href: "#home", label: "Home" },
                  { href: "#formats", label: "Services" },
                  { href: "#reviews", label: "Testimonials" },
                  { href: "#contact", label: "Contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-stone-400 hover:text-gold-400 transition-colors duration-300 font-light"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-stone-50 font-serif text-xl">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gold-400" />
                  <span className="text-stone-400 font-light">+1 (305) 968-3889</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gold-400" />
                  <span className="text-stone-400 font-light">jacinnagao@gmail.com</span>
                </div>
              </div>

              {/* Social Links removed as requested */}
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-stone-800/50 pt-8 text-center">
            <p className="text-stone-500 font-light">
              © 2024 Legacy Live Entertainment. All rights reserved. Crafted with passion for extraordinary events.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
