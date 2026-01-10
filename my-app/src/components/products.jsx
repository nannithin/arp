"use client"

import { Play, Rocket, Video } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

const services = [
    {
        icon: Play,
        title: "Video Promotion",
        description: "Grow your channel with authentic views from real audiences interested in your content.",
        features: [
            "Real people watching - no bots or fake views",
            "Targeted viewer growth by region and interest",
            "Transparent analytics and growth tracking",
            "Dedicated support to guide your success",
        ],
        color: "emerald",
    },
    {
        icon: Rocket,
        title: "Channel Optimization",
        description: "Optimize your entire channel with strategic SEO and algorithmic best practices.",
        features: [
            "Complete channel and video optimization strategy",
            "SEO optimization with keywords, titles, and tags",
            "Data-driven insights to reach engaged audiences",
            "Growth dashboard with actionable updates",
        ],
        color: "emerald",
    },
    {
        icon: Video,
        title: "Video Editing & Enhancement",
        description: "Professional editing and refinement to maximize engagement and retention.",
        features: [
            "Professional editing for new and existing videos",
            "Add hooks, intros, outros, subtitles, and graphics",
            "Optimize pacing and flow for viewer retention",
            "Deliver polished, HD-ready content for upload",
        ],
        color: "emerald",
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
}

const floatingDotVariants = {
    initial: { scale: 1 },
    animate: {
        scale: [1, 1.3, 1],
        transition: {
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
        },
    },
}

export function ServiceCards() {
    const [loggedin, setLoggedin] = useState(false);

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
    return (
        <section id="services" className="w-full px-4 pt-20 sm:px-6 lg:px-8 ">
            <div className="mx-auto max-w-7xl ">
                {/* Header */}
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-gradient-to-r from-emerald-200 to-transparent" />
                        <span className="text-xs font-semibold tracking-widest text-emerald-600 uppercase">services</span>
                        <div className="flex-1 h-px bg-gradient-to-l from-emerald-200 to-transparent" />
                    </div>
                    <h1 className="md:text-5xl text-[22px] font-semibold tracking-tight text-gray-900 lg:text-4xl text-balance md:leading-11">End-to-end growth for creators<span className="text-[#888]"><br />promotion, optimization, and retention</span></h1>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    className="grid gap-8 md:grid-cols-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {services.map((service, index) => {
                        const Icon = service.icon
                        const colors = {
                            border: "border-border",
                            gradient: "from-emerald-50",
                            accent: "bg-emerald-500",
                            text: "text-emerald-700",
                            badge: "bg-emerald-100 text-emerald-700",
                            button: "bg-emerald-600 hover:bg-emerald-700",
                        }

                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{
                                    y: -8,
                                    transition: { duration: 0.3 },
                                }}
                                className={`group relative overflow-hidden rounded-xl border ${colors.border} bg-gradient-to-br ${colors.gradient} to-white shadow-sm hover:shadow-xl transition-shadow duration-300 hover:border-opacity-100`}
                            >
                                <div className={`absolute top-0 left-0 right-0 h-1 ${colors.accent}`} />

                                {/* Content Container */}
                                <div className="p-8 flex flex-col h-full">
                                    {/* Icon and Title Section */}
                                    <motion.div
                                        className="mb-6 flex items-start gap-4"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        viewport={{ once: true }}
                                    >
                                        <motion.div
                                            className={`flex h-12 w-12 items-center justify-center rounded-lg ${colors.accent} flex-shrink-0`}
                                            whileHover={{
                                                scale: 1.1,
                                                rotate: 5,
                                            }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <Icon className="h-6 w-6 text-white" />
                                        </motion.div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                                        </div>
                                    </motion.div>

                                    {/* Description */}
                                    <p className="mb-6 text-sm text-slate-600 leading-relaxed">{service.description}</p>

                                    {/* Features List */}
                                    <div className="space-y-3 mb-8">
                                        {service.features.map((feature, idx) => (
                                            <motion.div
                                                key={idx}
                                                className="flex gap-3"
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                viewport={{ once: true }}
                                            >
                                                <motion.div
                                                    className={`flex-shrink-0 h-1.5 w-1.5 rounded-full ${colors.accent} mt-2`}
                                                    variants={floatingDotVariants}
                                                    initial="initial"
                                                    animate="animate"
                                                />
                                                <p className="text-sm text-slate-700">{feature}</p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Divider */}
                                    <div className="mb-6 h-px bg-gradient-to-r from-slate-200 via-slate-300 to-transparent" />

                                    {/* CTA Button */}
                                    <Link href={loggedin ? "/create-campaign" : "/login"}>
                                    <button
                                        className={`mt-auto w-full py-3 px-4 rounded-lg cursor-pointer font-semibold text-white transition-all duration-300 ${colors.button}`}
                                    >
                                        Start now
                                    </button>
                                    </Link>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
