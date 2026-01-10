"use client"


import { useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle, Linkedin, Github, Twitter, LinkedinIcon, TwitterIcon, GithubIcon, CheckCircle2, Zap, Users, Star } from "lucide-react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import Image from "next/image"
import globe from '../../public/globe-network.jpg'
import logo from '../../public/Frame 28.svg'
import { motion } from "framer-motion"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmitted(true)
    setIsLoading(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div id="contact" className=" pt-20">
      <div className="max-w-7xl px-6 md:px4 mx-auto flex items-center gap-4 mb-16">
        <div className="flex-1 h-px bg-gradient-to-r from-emerald-200 to-transparent" />
        <span className="text-xs font-semibold tracking-widest text-emerald-600 uppercase">contact</span>
        <div className="flex-1 h-px bg-gradient-to-l from-emerald-200 to-transparent" />
      </div>
      <section className="md:h-[calc(100vh-64px)] w-full md:grid grid-cols-2 px-5">

        <div className=" relative max-md:hidden border bg-emerald-500 rounded-lg select-none ">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 to-black/80 rounded-lg"></div>
          <Image className="absolute z-0 h-full w-full rounded-lg object-cover" src={globe} alt="globe" />
          <div className="absolute z-20 top-5 left-5 select-none ">

            <div className="flex items-center gap-3">
              <Image className="h-10 w-10 object-contain " src={logo} alt="logo" />
              <h1 className=" text-white text-[17px] font-bold">MyGrono</h1>
            </div>
          </div>
          <div className="absolute z-20 inset-0 flex flex-col justify-between p-8 pt-24">
            <div className="space-y-6">
              <div>
                <h2 className="text-white text-3xl font-bold mb-2">We're here to help</h2>
                <p className="text-emerald-100 text-sm leading-relaxed">
                  Have questions about MyGrono? Our team is ready to assist you and provide tailored solutions for your
                  business needs.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-medium">24/7 Support</p>
                    <p className="text-emerald-100 text-xs">Always available when you need us</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-medium">Fast Response</p>
                    <p className="text-emerald-100 text-xs">Get answers within 2 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-medium">Expert Team</p>
                    <p className="text-emerald-100 text-xs">Industry specialists ready to help</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <p className="text-emerald-300 text-xl font-bold">500+</p>
                    <p className="text-white text-xs">Active Clients</p>
                  </div>
                  <div>
                    <p className="text-emerald-300 text-xl font-bold">98%</p>
                    <p className="text-white text-xs">Satisfaction Rate</p>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-emerald-300 fill-emerald-300" />
                    ))}
                  </div>
                  <p className="text-white text-xs leading-relaxed italic">
                    "MyGrono transformed how we manage our operations. Exceptional service!"
                  </p>
                  <p className="text-emerald-200 text-xs mt-2 font-medium">— Sarah Johnson, CEO</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="md:px-20 px-3 flex items-center">
          <div className="space-y-5">
            <h1 className="text-2xl font-bold">Chat with us</h1>
            <p className="text-muted-foreground text-sm">We’d love to hear about your channel and goals. Share a few details and our team will get back to you with the right guidance to help you grow.</p>
            <form action="" method="post" className="space-y-4">
              <div>
                {/* <Label>Full name</Label> */}
                <input type={"text"} placeholder="Full name" className={"border-b border-muted-foreground w-full focus:outline-0 p-2 text-sm placeholder:text-sm"} />
              </div>
              <div>
                {/* <Label>Full name</Label> */}
                <input type={"email"} placeholder="Email" className={"border-b border-muted-foreground w-full focus:outline-0 p-2 text-sm placeholder:text-sm"} />
              </div>
              <div>
                {/* <Label>Full name</Label> */}
                <input type={"text"} placeholder="Subject" className={"border-b border-muted-foreground w-full focus:outline-0 p-2 text-sm placeholder:text-sm"} />
              </div>
              <div>
                {/* <Label>Full name</Label> */}
                <textarea type={"text"} placeholder="Message" className={"border-b h-20 resize-none border-muted-foreground w-full focus:outline-0 p-2 text-sm placeholder:text-sm"} />
              </div>
              <Button className={"w-full h-12 shadow-lg shadow-emerald-50 bg-gradient-to-r from-[#10b981] to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"}>Get in touch</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
