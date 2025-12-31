"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/axios";
import { useSEOStore, useUserStore } from "@/store/seostore";
import { Bell, Rocket, FolderPlusCreate, FolderPlus, Youtube, TrendingUp, Calendar, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import logo from '../../../public/Frame 27.svg'
import avatar from '../../../public/unnamed (1).png'

const Dash = () => {
    const user = useUserStore((state) => state.user)
    const searchParams = useSearchParams();
    const reset = useSEOStore((state) => state.reset);

    const router = useRouter();
    const [activeTab, setActiveTab] = useState("campaigns");
    const [campaigns, setCampaigns] = useState([]);
    const [loadingCampaigns, setLoadingCampaigns] = useState(true);



    useEffect(() => {
        if (searchParams.get("payment") === "success") {
            reset();
        }
    }, [searchParams, reset]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const res = await api.get("/api/user/campaigns");
                setCampaigns(res.data);
            } catch (error) {
                console.error("Failed to fetch campaigns", error);
            } finally {
                setLoadingCampaigns(false);
            }
        };

        fetchCampaigns();
    }, []);

    if (loadingCampaigns || !user) {
        return (
            <div className="flex items-center justify-center py-32">
                <p className="text-muted-foreground">Loading campaigns...</p>
            </div>
        );
    }
    return (
        <div>
            <nav className="h-20 flex items-center px-10 justify-between">
                <div className="">
                    <Image height={40} src={logo} alt="logo" />
                </div>
                <div className="flex items-center gap-5">
                    <div className="h-12 w-12 rounded-full shadow-md"><Image src={avatar} alt="avatar" className="w-full h-full " /></div>
                    <p className="max-md:hidden">{user?.name}</p>
                </div>
            </nav>
            <div className="space-y-7 py-8">
                <div className="max-w-[800px] mx-auto space-y-7 py-8">
                    <div className="text-center space-y-1">
                        <h1 className="font-bold text-3xl">Good Afternoon, <span className="text-[#10B981]">{user?.name}</span></h1>
                        <p className="text-gray-500">Everything you need to monitor your campaigns and boost your reach.</p>
                    </div>
                    <div className="max-md:hidden h-12 rounded-full bg-[#F0F8F3] flex w-fit items-center p-0.5 mx-auto">
                        <ul className="list-none h-full flex">
                            <li className="bg-[#10B981] h-full rounded-full px-6 flex items-center text-white">
                                Campaigns
                            </li>
                            <li className=" h-full rounded-full px-6 flex items-center text-black">
                                Performance
                            </li>
                            <li className=" h-full rounded-full px-6 flex items-center text-black">
                                Channel Metrics
                            </li>
                            <li className=" h-full rounded-full px-6 flex items-center text-black">
                                Subscriptions
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4">
                    {activeTab === "campaigns" && (
                        <>
                            {campaigns.length === 0 ? (
                                /* Empty State */
                                <div className="flex flex-col items-center justify-center py-24">
                                    <div className="rounded-full bg-muted p-6 mb-6">
                                        <Rocket className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <h2 className="text-2xl font-semibold mb-2">No active campaigns</h2>
                                    <p className="text-muted-foreground text-center mb-8 max-w-md">
                                        Start your first campaign to grow your reach and track performance.
                                    </p>
                                    <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600">
                                        <Link href="/create-campaign">
                                            <span className="mr-2">+</span>
                                            Create campaign
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                /* Campaigns List */
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-semibold">Your Campaigns</h2>
                                        <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
                                            <Link href="/create-campaign">
                                                <span className="mr-2">+</span>
                                                Create campaign
                                            </Link>
                                        </Button>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {campaigns.map((campaign) => (
                                            <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                                                <CardHeader>
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <Youtube className="w-5 h-5 text-red-500" />
                                                            <Badge
                                                                variant={campaign.status === "active" ? "default" : "secondary"}
                                                                className={campaign.status === "active" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                                                            >
                                                                {campaign.status}
                                                            </Badge>
                                                        </div>
                                                        <Badge variant="outline">{campaign.plan}</Badge>
                                                    </div>
                                                    <CardTitle className="text-lg">{campaign.channelName}</CardTitle>
                                                    <CardDescription className="line-clamp-2">{campaign.channelDescription}</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-muted-foreground flex items-center gap-1">
                                                                <TrendingUp className="w-4 h-4" />
                                                                {campaign.subscribers.toLocaleString()}
                                                            </span>
                                                            <span className="font-semibold">{"34000"}</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-muted-foreground flex items-center gap-1">
                                                                <Calendar className="w-4 h-4" />
                                                                Started
                                                            </span>
                                                            <span className="font-semibold">{new Date(campaign.startDate).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 pt-2">
                                                            <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                                                                <Link href={`/`}>View Details</Link>
                                                            </Button>
                                                            <Button variant="ghost" size="sm" asChild>
                                                                <a href={campaign.channelUrl} target="_blank" rel="noopener noreferrer">
                                                                    <ExternalLink className="w-4 h-4" />
                                                                </a>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Other Tabs Placeholder */}
                    {activeTab !== "campaigns" && (
                        <div className="flex flex-col items-center justify-center py-24">
                            <div className="rounded-full bg-muted p-6 mb-6">
                                <Rocket className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
                            <p className="text-muted-foreground text-center max-w-md">
                                {activeTab === "performance" && "Track your campaign performance metrics here."}
                                {activeTab === "channel-metrics" && "Monitor your YouTube channel analytics here."}
                                {activeTab === "subscriptions" && "Manage your subscription plans here."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dash;