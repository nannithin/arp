"use client";


import api from "@/lib/axios";
import { useSEOStore, useUserStore } from "@/store/seostore";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import logo from '../../../public/Frame 27.svg'
import avatar from '../../../public/unnamed (1).png'
import DashboardTabs from "@/components/dasbboardTab";
import DashboardContent from "@/components/dashboardContent";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Dash = () => {
    const user = useUserStore((state) => state.user)
    const searchParams = useSearchParams();
    const reset = useSEOStore((state) => state.reset);

    const router = useRouter();
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

    const handleTabChange = (key) => {
        router.replace(`?tab=${key}`, { scroll: false })
    }

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

    if (loadingCampaigns || !user) {
        return (
            <div className="flex items-center justify-center py-32">
                <p className="text-muted-foreground">Loading campaigns...</p>
            </div>
        );
    }
    return (
        <div>
            <DropdownMenu>
                <nav className="h-20 flex items-center md:px-10 px-5 justify-between">
                    <div className="">
                        <Image height={40} src={logo} alt="logo" />
                    </div>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-5">
                            <div className="h-12 w-12 rounded-full shadow-md cursor-pointer"><Image src={avatar} alt="avatar" className="w-full h-full " /></div>
                            <p className="max-md:hidden cursor-pointer">{user?.name}</p>
                        </div>
                    </DropdownMenuTrigger>
                </nav>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleTabChange("campaigns")}>Campaigns</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleTabChange("performance")}>Performance</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTabChange("metrics")}>Channel metrics</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleTabChange("metrics")}>Subscriptions</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className={"bg-red-400 focus:bg-red-500 text-white focus:text-white"} onClick={Logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="space-y-7 py-8">
                <div className="max-w-[800px] mx-auto space-y-7 py-8">
                    <div className="text-center space-y-1 max-md:px-3">
                        <h1 className="font-bold md:text-3xl text-[26px]">Good Afternoon, <span className="text-[#10B981]">{user?.name}</span></h1>
                        <p className="text-gray-500">Everything you need to monitor your campaigns and boost your reach.</p>
                    </div>
                    <DashboardTabs />
                </div>

                <div className="max-w-7xl mx-auto px-4">
                    <DashboardContent campaigns={campaigns} />
                </div>
            </div>
        </div>
    )
}

export default Dash;