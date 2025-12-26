"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSEOStore } from "@/store/seostore";
import axios from "axios";
import { ChevronRight, SquareCheckBig } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


const PlanSelection = () => {
    const { channelData, channelStats } = useSEOStore();
    const [plan, setPlan] = useState(null)
    const plans = [
        {
            name: "Starter",
            price: 499,
            description: "Get our starter plan for getting small scale services.",
        },
        {
            name: "Intro",
            price: 999,
            description: "Get our starter plan for getting small scale services.",
        },
        {
            name: "Popular",
            price: 1499,
            description: "Get our starter plan for getting small scale services.",
            featured: true,
        },
        {
            name: "Enterprise",
            price: 1999,
            description: "Get our starter plan for getting small scale services.",
        },
    ]

    const planHandler = (e) => {
        setPlan(e)
    }

    const handlePayment = async () => {
        try {
            const p = plan.name
            console.log(p);
            
            const res = await axios.post(
                "http://localhost:5000/api/payment/create-checkout-session",
                { plan : p },
                { withCredentials: true } // IMPORTANT (cookie auth)
            );

            window.location.href = res.data.url; // redirect to Stripe
        } catch (error) {
            console.error(error);
            alert("Payment failed");
        }
    };


    return (
        <div className="py-28 max-w-7xl mx-auto space-y-10">
            <div className="absolute left-8 top-8 mb-8 flex items-center gap-2 text-sm">
                <Link href={"/create-seo"}><span className="text-muted-foreground font-medium">Create SEO</span></Link>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground font-medium">Select plan</span>
            </div>
            <div className="max-w-md shadow-xs mx-auto space-y-1 p-5 rounded-sm border border-slate-100">
                <p><span className="font-bold text-xl">Channel : {channelData?.channelName} </span></p>
                <p className="text-gray-500 text-sm">{channelData?.channelDescription}</p>
                <div className="flex gap-5 font-semibold">
                    <p>{channelStats?.subscriberCount} Subscribers</p>
                    <p>{channelStats?.viewCount} Views</p>
                </div>
            </div>
            <div className="text-center space-y-1">
                <h1 className="font-semibold md:text-4xl text-3xl">Choose Your SEO Plan</h1>
                <p className="md:text-[18px] text-[16px] text-gray-500">Select the perfect SEO optimization plan for your YouTube channel</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-10 px-5">
                {plans.map((plan) => (
                    <Card
                        key={plan.name}
                        className={`relative p-4 transition-all hover:shadow-xl ${plan.featured ? "bg-[#10B981] text-white scale-105" : "bg-white"
                            }`}
                    >
                        {plan.featured && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#10B981] px-4 py-1 rounded-full text-sm font-semibold">
                                {plan?.name}
                            </div>
                        )}

                        <h3 className={`text-lg font-medium ${plan.featured ? "text-white" : "text-gray-700"}`}>
                            {plan?.name}
                        </h3>

                        <div className="">
                            <span className="text-5xl font-bold">₹{plan?.price}</span>
                            <span className={`text-lg ml-1 ${plan.featured ? "text-white/80" : "text-gray-600"}`}>/ Month</span>
                        </div>

                        <p className={` text-sm ${plan.featured ? "text-white/90" : "text-gray-600"}`}>{plan?.description}</p>

                        <Button
                            onClick={() => planHandler(plan)}
                            className={`w-full ${plan.featured
                                ? "bg-white text-[#10B981] hover:bg-gray-50"
                                : "bg-[#10B981] text-white hover:bg-[#059669]"
                                }`}
                        >
                            Choose Plan
                        </Button>
                    </Card>
                ))}
            </div>

            {
                plan &&
                <div className="space-y-5 max-md:px-5">
                    <div className="w-full shadow-sm rounded-md p-5">

                        <div className="space-y-3">
                            <p className="font-semibold text-[18px]">Selected <span className="text-[#10B981]">{plan.name}</span> Plan</p>
                            <div className="space-y-2 max-md:text-[14px]">
                                <div className="flex items-start gap-2"><SquareCheckBig size={18} color="#10B981" /> <p>Channel & Video Optimization: Every video optimized for better discoverability among your target audience</p></div>
                                <div className="flex items-start gap-2"><SquareCheckBig size={18} color="#10B981" /> <p>Targeted Audience Growth: Reaching individuals who genuinely resonate with your content</p></div>
                                <div className="flex items-start gap-2"><SquareCheckBig size={18} color="#10B981" /> <p>SEO & Algorithm Strategy: Keywords, metadata, and descriptions designed to maximize visibility and engagement</p></div>
                            </div>
                        </div>

                    </div>

                    <div className="w-full shadow-sm rounded-md p-5 text-center space-y-2">
                        <p className="font-semibold text-[18px]">Selected <span className="text-[#10B981]">{plan.name}</span> Plan : {plan.price}₹</p>
                        <Button onClick={handlePayment} className="bg-[#10B981]">Proceed to payment</Button>
                    </div>
                </div>
            }

        </div>
    )
}

export default PlanSelection;