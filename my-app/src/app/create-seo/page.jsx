"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ChevronRight, Youtube, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSEOStore } from "@/store/seostore"

// ✅ URL validator
const isValidYouTubeChannelURL = (url) => {
    const direct = /youtube\.com\/channel\/[A-Za-z0-9_-]+/;
    const handle = /youtube\.com\/@[\w.-]+/;
    return direct.test(url) || handle.test(url);
};

export default function SEOForm() {
    const { channelData, setChannelData, setChannelStats } = useSEOStore()
    const [formData, setFormData] = useState({
        channelName: "",
        channelUrl: "",
        channelDescription: "",
    })
    useEffect(() => {
        if (channelData) {
            setFormData(channelData)
        }
    }, [channelData])

    const router = useRouter();
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(false)
    const [urlError, setUrlError] = useState("")

    // Extract channel ID
    const extractChannelId = async (url) => {
        if (url.includes("/channel/")) {
            return url.split("/channel/")[1]
        }

        if (url.includes("@")) {
            const handle = url.split("@")[1]

            const res = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${handle}&key=AIzaSyANmrScuNuOuh2f0i2v66NnFrMMqt_cLAE`
            )

            const data = await res.json()
            return data.items?.[0]?.snippet?.channelId
        }

        return null
    }

    // Fetch stats
    const fetchChannelStats = async (channelId) => {
        const res = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=AIzaSyANmrScuNuOuh2f0i2v66NnFrMMqt_cLAE`
        )

        const data = await res.json()
        return data.items?.[0]?.statistics
    }

    // Live URL validation and auto-fetch stats
    useEffect(() => {
        const url = formData.channelUrl

        if (!url.trim()) {
            setUrlError("")
            setStats(null)
            return
        }

        if (!isValidYouTubeChannelURL(url)) {
            setUrlError("Please enter a valid YouTube channel URL")
            setStats(null)
            return
        }

        // URL is valid → fetch stats instantly
        setUrlError("")
        setLoading(true)

        const fetchInstantStats = async () => {
            const channelId = await extractChannelId(url)
            if (!channelId) {
                setUrlError("Invalid YouTube channel")
                setStats(null)
                setLoading(false)
                return
            }

            const statistics = await fetchChannelStats(channelId)

            setStats(statistics || null)
            setLoading(false)
        }

        fetchInstantStats()
    }, [formData.channelUrl])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const isFormValid =
        formData.channelName.trim() !== "" &&
        formData.channelUrl.trim() !== "" &&
        formData.channelDescription.trim() !== "";
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) {
            alert("Fill all the req fields");
            return;
        }
        setChannelData(formData)
        setChannelStats(stats)
        router.push("/seo-plans")
        console.log("hello")
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-white to-green-50 flex items-center justify-center p-6">
            <div className="absolute left-8 top-8 mb-8 flex items-center gap-2 text-sm">
                <a href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                    Dashboard
                </a>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <a href="/create-campaign" className="text-muted-foreground hover:text-foreground transition-colors">
                    Create Campaign
                </a>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground font-medium">Create SEO</span>
            </div>

            <div className="w-full max-w-2xl">
                <div className="mb-8 text-center space-y-1">
                    <h1 className="text-3xl font-bold text-foreground">Optimize Your Channel</h1>
                    <p className="text-sm text-muted-foreground">
                        Our experts help your videos reach more people with smart SEO.
                    </p>
                </div>

                <Card className="p-8 shadow-lg border-0 bg-white">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[#10B981] flex items-center justify-center">
                            <Youtube className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground">Channel Details</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-sm font-semibold">Channel Name</label>
                            <Input
                                type="text"
                                name="channelName"
                                placeholder="Enter your channel name"
                                value={formData.channelName}
                                onChange={handleChange}
                                className="h-12 bg-green-50 border-green-200"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-semibold">Channel URL</label>
                            <Input
                                type="url"
                                name="channelUrl"
                                placeholder="https://youtube.com/@yourchannel"
                                value={formData.channelUrl}
                                onChange={handleChange}
                                className="h-12 bg-green-50 border-green-200"
                            />

                            {urlError && (
                                <p className="text-red-500 text-xs">{urlError}</p>
                            )}
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-semibold">Channel Description</label>
                            <Textarea
                                name="channelDescription"
                                placeholder="Describe your channel..."
                                value={formData.channelDescription}
                                onChange={handleChange}
                                rows={5}
                                className="bg-green-50 border-green-200 resize-none"
                            />
                        </div>

                        {stats && (
                            <div className="">
                                <h3 className="text-sm font-medium text-gray-600 mb-4">Channel Metrics</h3>
                                <div className="flex md:flex-row flex-col max-md:gap-3 justify-between mt-6 p-6 bg-slate-50 text-center border border-gray-50 rounded-xl">
                                    <div className="grid gap-1"><p className="font-medium text-sm text-gray-600">Subscribers</p> <p className="font-semibold text-xl">{stats.subscriberCount}</p></div>
                                    <div className="grid gap-1"><p className="font-medium text-sm text-gray-600">Total Views</p> <p className="font-semibold text-xl">{stats.viewCount}</p></div>
                                    <div className="grid gap-1"><p className="font-medium text-sm text-gray-600">Total Videos</p> <p className="font-semibold text-xl">{stats.videoCount}</p></div>
                                </div>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading || urlError}
                            className="w-full h-12 bg-[#10B981] hover:bg-[#17ae7b] text-white rounded-full text-base"
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Continue to Plan Selection"}
                        </Button>
                    </form>
                </Card>



                <p className="text-center text-muted-foreground text-sm mt-8">
                    Your channel information is secure and will only be used for optimization analysis.
                </p>
            </div>
        </div>
    )
}
