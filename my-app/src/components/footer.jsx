"use client"

import { motion } from "framer-motion"
import { Mail, Linkedin, Twitter, Youtube, ArrowRight } from "lucide-react"

const socialLinks = [
    {
        icon: Youtube,
        href: "https://youtube.com",
        label: "YouTube",
    },
    {
        icon: Mail,
        href: "mailto:hello@example.com",
        label: "Email",
    },
    {
        icon: Linkedin,
        href: "https://linkedin.com",
        label: "LinkedIn",
    },
    {
        icon: Twitter,
        href: "https://twitter.com",
        label: "Twitter",
    },
]

const footerSections = [
    {
        title: "Product",
        links: [
            { label: "Features", href: "#features" },
            { label: "How it Works", href: "#about" },
            { label: "Services", href: "#services" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "#about" },
            //   { label: "Careers", href: "#careers" },
            { label: "Contact", href: "#contact" },
        ],
    },

]

export function Footer() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    }

    const socialVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
        hover: {
            scale: 1.2,
            rotate: 5,
            transition: {
                duration: 0.2,
            },
        },
    }

    return (
        <footer className="bg-[#171717] text-primary-foreground py-8">


            <div className="max-w-7xl mx-auto px-4">
                {/* Top Section: Brand + Newsletter */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Brand Section */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent">
                                MyGrono
                            </h3>
                            <p className="text-primary-foreground/70 text-base leading-relaxed mt-3">
                                Accelerate your YouTube growth with AI-powered strategies, expert guidance, and data-driven insights.
                                Transform your channel in weeks, not months.
                            </p>
                        </div>
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-4 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {footerSections.map((section) => (
                                <motion.div key={section.title} variants={itemVariants} className="space-y-4">
                                    <h5 className="font-semibold text-base">{section.title}</h5>
                                    <nav className="flex flex-col space-y-2">
                                        {section.links.map((link) => (
                                            <motion.a
                                                key={link.label}
                                                href={link.href}
                                                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-200 text-sm flex items-center gap-2 group"
                                                whileHover={{ x: 4 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <span className="inline-block w-1 h-1 bg-primary-foreground/40 rounded-full group-hover:bg-primary-foreground transition-colors" />
                                                {link.label}
                                            </motion.a>
                                        ))}
                                    </nav>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Newsletter Section */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-xl mb-2">Get Weekly Growth Tips</h4>
                            <p className="text-primary-foreground/70 text-sm">
                                Subscribe to receive exclusive strategies, case studies, and insider tips delivered to your inbox.
                            </p>
                        </div>
                        <motion.form
                            className="space-y-3"
                            onSubmit={(e) => {
                                e.preventDefault()
                            }}
                        >
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/50 transition-colors text-sm"
                            />
                            <motion.button
                                type="submit"
                                className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 group"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Subscribe Now
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </motion.form>
                        <p className="text-xs text-primary-foreground/50">
                            ✓ No spam, unsubscribe anytime. We respect your privacy.
                        </p>
                    </motion.div>
                </motion.div>



                {/* Social Links & Bottom Section */}
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-primary-foreground/10 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Social Icons */}
                    <motion.div
                        className="flex gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {socialLinks.map((social) => {
                            const Icon = social.icon
                            return (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    variants={socialVariants}
                                    whileHover="hover"
                                    className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors duration-200"
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.a>
                            )
                        })}
                    </motion.div>

                    {/* Copyright */}
                    <motion.p variants={itemVariants} className="text-primary-foreground/60 text-sm text-center md:text-right">
                        © {new Date().getFullYear()} MyGrono. All rights reserved.
                    </motion.p>
                </motion.div>
            </div>
        </footer>
    )
}
