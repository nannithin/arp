"use client";

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRight, ArrowUpRight, Star, ChevronDown, Menu, X } from "lucide-react"
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}


export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggedin, setLoggedin] = useState(false);
  useEffect(() => {
    api.get("/health");
  },[])
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
    <div className="relative min-h-screen">

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
                <a className="hover:text-[#10B981]" href="#">Products</a>
                <a className="hover:text-[#10B981]" href="#">Contact</a>
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
                  {["Home", "About", "Products", "Contact"].map((item) => (
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
      <section className="relative container mx-auto  py-12 lg:py-20 overflow-hidden">

        <div id="home" className=" max-w-4xl mx-auto py-10 space-y-5">

          {/* Left Column - Hero Content */}
          <div className="flex justify-center">
            <div className="inline-flex max-md:text-[7px] items-center px-4 py-2 rounded-full text-sm font-medium gap-5 border bg-emerald-50/50 ">
              <p>Launch your first promotion campaign in under 2 minutes ⚡</p>
              <a className="text-[#10b981]" href={`${loggedin ? "/create-campaign" : "/login"}`}>Create Campaign</a>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 pb-20 max-md:px-3">
            <h1 className="md:text-5xl text-3xl font-bold text-center md:leading-14">We help creators understand what drives real <span className="text-[#10b981]">channel growth</span></h1>
            <p className="text-center px-5">We help YouTube creators increase visibility, engagement, and long-term growth by promoting content to real audiences and optimizing channels for how the algorithm actually works.</p>
            <div className="flex items-center gap-3">
              {
                loggedin ? <Link href="/dashboard"><Button size={"lg"} className="bg-[#10b981] hover:bg-[#0d9668] text-white">Go to dashboard</Button></Link> :
                  <Link href="/register"><Button size={"lg"} className="bg-[#10b981] hover:bg-[#0d9668] text-white">Get Started</Button></Link>
              }
              <a href="#about"><Button variant="outline" size={"lg"} className="">
                Learn more
              </Button></a>

            </div>
          </div>

        </div>
        <div id="about" className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="mb-16 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-emerald-500 bg-white md:px-6 px-4 py-2 shadow-sm">
                <div className="flex md:h-8 md:w-8 h-6 w-6 max-md:text[10px]  items-center justify-center rounded-full bg-emerald-500 text-white font-bold">
                  1
                </div>
                <span className="text-sm font-semibold text-emerald-700">How it Works</span>
              </div>
              <h1 className="md:text-5xl text-3xl font-semibold tracking-tight text-gray-900 lg:text-4xl text-balance md:leading-11">Simple, transparent growth <span className="text-[#888]"><br />designed for creators</span></h1>
            </div>

            {/* Feature Cards Grid */}
            <motion.div

              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  whileHover={{
                    y: -10,
                    rotateX: 4,
                    rotateY: -4,
                    transition: { duration: 0.25 },
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-emerald-300"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Content */}
                  <div className="relative">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg"
                    >
                      <feature.icon className="h-8 w-8 text-white" strokeWidth={2.5} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="mb-4 text-xl font-bold text-gray-900 text-balance">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base leading-relaxed text-gray-600 text-pretty">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom Accent Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400"
                  />
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  )
}
