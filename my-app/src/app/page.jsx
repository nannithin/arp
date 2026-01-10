"use client";

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRight, ArrowUpRight, Star, ChevronDown, Menu, X, MousePointer2 } from "lucide-react"
import img from '../../public/Screenshot 2025-12-17 152621.png'
import Image from "next/image"
import { Lightbulb, Eye, TrendingUp, Clock, Shield, Users } from "lucide-react"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react";
import logo from "../../public/Frame 27.svg"
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useSEOStore, useUserStore } from "@/store/seostore";
import ContactForm from "@/components/contact";
import ava from '../../public/GettyImages-1300321639.jpg'
import { ServiceCards } from "@/components/products";
import { Footer } from "@/components/footer";

const badgeVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.06, 1],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}


export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggedin, setLoggedin] = useState(false);
  useEffect(() => {
    api.get("/health");
  }, [])
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/api/user/dashboard")
        setLoggedin(true)
      } catch (err) {
        setLoggedin(false)

      }
    }

    checkAuth()
  }, [loggedin])

  const Logout = async () => {
    try {
      await api.post("/api/auth/logout")
      useUserStore.getState().clearUser()
      useSEOStore.getState().reset()
      router.replace("/login")
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  const features = [
    {
      icon: Lightbulb,
      title: "Real People, Not Just Numbers",
      description:
        "We promote your videos to real viewers through curated platforms, creator communities, and niche content spaces — never bots, never fake traffic.",
    },
    {
      icon: Eye,
      title: "Growth That Supports the Algorithm",
      description:
        "Our strategy focuses on improving watch time, CTR, and engagement — the exact signals YouTube uses to recommend videos long-term.",
    },
    {
      icon: TrendingUp,
      title: "SEO + Channel Optimization Included",
      description:
        "We optimize titles, descriptions, tags, keywords, and thumbnails so your videos rank better in Search, Suggested, and Browse.",
    },
    {
      icon: Clock,
      title: "Transparent, Measurable Results",
      description:
        "Every creator gets a personalized analytics dashboard showing traffic sources, retention, and engagement in real time.",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description:
        "All campaigns are 100% YouTube-compliant. Your channel’s safety and reputation come first.",
    },
    {
      icon: Users,
      title: "Always-On Support",
      description:
        "Our support team is available across time zones to answer questions, refine campaigns, and support your growth.",
    },
  ]
  return (
    <div className="relative min-h-screen bg-[#f6f6f4]">

      {/* Header */}
      <header className="md:px-20 px-3 backdrop-blur-2xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-5">
              <div className="">
                <Image height={40} src={logo} alt="logo" />
              </div>
              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-6 text-[15px]">
                <a className="hover:text-[#10B981] active:text-[#10b981]" href="#home">Home</a>
                <a className="hover:text-[#10B981]" href="#about">About</a>
                <a className="hover:text-[#10B981]" href="#services">Services</a>
                <a className="hover:text-[#10B981]" href="#contact">Contact</a>
              </nav>
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">
              {
                loggedin ? <Link href="/login">
                  <Button onClick={Logout} className="bg-red-400 hover:bg-red-500 text-white">Log out</Button>
                </Link> : <div className="flex items-center gap-3">
                  <Link href="/login">
                    <Button variant="outline">Log in</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-[#10b981] hover:bg-[#0d9668] text-white">
                      Get Started
                    </Button>
                  </Link>
                </div>
              }
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(prev => !prev)}
              className="md:hidden"
            >
              {open ? <X /> : <Menu className="text-[#10b981]" />}
            </button>
          </div>
        </div>

        {/* 🔥 Animated Mobile Menu */}
        {/* 🔥 Mobile Menu Dropdown */}
        <AnimatePresence>
          {open && (
            <>
              {/* Click outside layer (below header only) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 top-16 z-40"
              />

              {/* Dropdown */}
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute top-16 left-1/2 -translate-x-1/2 z-50 w-[92%] rounded-2xl bg-white p-5 shadow-xl md:hidden"
              >
                <div className="flex flex-col gap-3 text-sm">
                  {["Home", "About", "Services", "Contact"].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2 hover:bg-[#10b981]/10 transition"
                    >
                      {item}
                    </a>
                  ))}
                </div>

                <div className="mt-5">
                  {!loggedin ? <div className="flex flex-col gap-2">
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setOpen(false)}>
                      <Button className="w-full bg-[#10b981] hover:bg-[#0d9668] text-white">
                        Get Started
                      </Button>
                    </Link>
                  </div> :
                    <div className="flex flex-col gap-2">
                      <Link href="/dashboard" onClick={() => setOpen(false)}>
                        <Button className="w-full bg-[#10b981] hover:bg-[#0d9668] text-white">
                          Go to dashboard
                        </Button>
                      </Link>
                      <Link href="/dashboard" onClick={Logout}>
                        <Button className="w-full bg-red-400 hover:bg-red-500 text-white">
                          Logout
                        </Button>
                      </Link>
                    </div>
                  }
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </header>

      {/* Hero Section */}
      <section className="relative grid-wrapper container mx-auto  py-12 lg:py-20 overflow-hidden">

        <div className="relative ">
          <div className="max-md:hidden grid-lines z-0"></div>
          <div className="max-md:hidden">
            <motion.div variants={badgeVariants} initial="initial"
              animate="animate" className="inline-block absolute right-36 ">
              <div className="relative">
                <div className="h-14 w-14 rounded-full bg-[#10b981] border-4 border-white shadow-lg "></div>
                <MousePointer2 className="absolute -left-4 -rotate-90 text-[#10b981] fill-[#10b981]" />
              </div>
            </motion.div>
            <motion.div variants={badgeVariants} initial="initial"
              animate="animate" className="inline-block absolute right-48 bottom-12 ">
              <div className="relative">
                <Image src={ava} alt="logo" className="h-14 w-14 object-cover rounded-full bg-[#10b981] border-4 border-white shadow-lg "></Image>
                <MousePointer2 className="absolute -left-6 -top-2 -rotate-20 text-[#10b981] fill-[#10b981]" />
              </div>
            </motion.div>
            <motion.div variants={badgeVariants} initial="initial"
              animate="animate" className="inline-block absolute left-48 bottom-12 ">
              <div className="relative">
                <div className="h-14 w-14 rounded-full bg-[#10b981] border-4 border-white shadow-lg "></div>
                <MousePointer2 className="absolute -right-6 -top-2 rotate-104 text-[#10b981] fill-[#10b981]" />
              </div>
            </motion.div>
            <motion.div variants={badgeVariants} initial="initial"
              animate="animate" className="inline-block absolute left-36  ">
              <div className="relative">
                <div className="h-14 w-14 rounded-full bg-[#10b981] border-4 border-white shadow-lg "></div>
                <MousePointer2 className="absolute -right-4 rotate-180 text-[#10b981] fill-[#10b981]" />
              </div>
            </motion.div>
          </div>


          <div id="home" className="relative z-10 max-w-4xl mx-auto py-10 space-y-5">

            {/* Left Column - Hero Content */}
            <div className="flex justify-center">
              <div className="inline-flex max-md:text-[7px] items-center px-4 py-2 rounded-full text-sm font-medium gap-5 border bg-emerald-50/50 ">
                <p>Launch your first promotion campaign in under 2 minutes ⚡</p>
                <a className="text-[#10b981]" href={`${loggedin ? "/create-campaign" : "/login"}`}>Create Campaign</a>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center justify-center gap-5 max-md:px-3">
              <h1 className="md:text-5xl text-3xl font-bold text-center md:leading-14">We help creators understand what drives real <span className="text-[#10b981]">channel growth</span></h1>
              <p className="text-center px-5">We help YouTube creators increase visibility, engagement, and long-term growth by promoting content to real audiences and optimizing channels for how the algorithm actually works.</p>
              <div className="flex items-center gap-3">
                {
                  loggedin ? <Link href="/dashboard"><Button size={"lg"} className="bg-[#10b981] hover:bg-[#0d9668] text-white">Go to dashboard</Button></Link> :
                    <Link href="/register"><Button size={"lg"} className="bg-gradient-to-r from-[#10b981] to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-[#10b981]/30 hover:shadow-[#10b981]/50 transition-all duration-300 transform hover:scale-105">Get Started</Button></Link>
                }
                <a href="#about"><Button variant="outline" size={"lg"} className="transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Learn more
                </Button></a>

              </div>
            </motion.div>

          </div>
        </div>
        <div id="about" className="">
          <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="mb-16 text-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-emerald-200 to-transparent" />
                <span className="text-xs font-semibold tracking-widest text-emerald-600 uppercase">How it works</span>
                <div className="flex-1 h-px bg-gradient-to-l from-emerald-200 to-transparent" />
              </div>
              <h1 className="md:text-5xl text-[22px] font-semibold tracking-tight text-gray-900 lg:text-4xl text-balance md:leading-11">Simple, transparent growth <span className="text-[#888]"><br />designed for creators</span></h1>
            </div>

            {/* Feature Cards Grid */}
            <motion.div

              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ translateY: -4 }}
                  className="group relative rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-[#10b981]/50 hover:shadow-lg overflow-hidden"
                >
                  {/* Icon */}
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#10b981]/10 text-[#10b981] transition-all duration-300 group-hover:bg-[#10b981] group-hover:text-white">
                    <feature.icon className="h-6 w-6" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{feature.description}</p>

                  {/* Accent border bottom on hover */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#10b981] transition-all duration-300 group-hover:w-full" />
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
        <ServiceCards />
        <div>
          <ContactForm />
        </div>
      </section>
      <Footer />
    </div>
  )
}
