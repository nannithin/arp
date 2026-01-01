
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Rocket, FolderPlusCreate, FolderPlus, Youtube, TrendingUp, Calendar, ExternalLink, Dot } from "lucide-react";
import Link from "next/link";



export default function DashboardContent({ campaigns, paymentInfo }) {
    const searchParams = useSearchParams()
    const tab = searchParams.get("tab") || "campaigns"
    const formated = paymentInfo?.renewAt
    ? new Date(paymentInfo.renewAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "--"

    const Skel = () => {
        return (
            <div className="flex flex-col items-center justify-center py-24">
                <div className="rounded-full bg-muted p-6 mb-6">
                    <Rocket className="w-8 h-8 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
                <p className="text-muted-foreground text-center max-w-md">
                    {tab === "performance" && "Track your campaign performance metrics here."}
                    {tab === "metrics" && "Monitor your YouTube channel analytics here."}
                    {tab === "subscriptions" && "Manage your subscription plans here."}
                </p>
            </div>
        )
    }

    switch (tab) {
        case "performance":
            return <Skel />
        case "metrics":
            return <Skel />
        case "subscriptions":
            return (
                <div className="space-y-5">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="font-semibold">Plan & Billing</h1>
                            <p className="text-muted-foreground">Manage your plan and payments</p>
                        </div>
                        {paymentInfo && <div className="max-md:hidden"><Button variant={"outline"}>Cancel subscription</Button></div>}
                    </div>
                    <h1 className="font-semibold">Current plan</h1>
                    {
                        paymentInfo ? <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
                            <div className="p-5 space-y-2 rounded-lg border border-gray-300">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-muted-foreground">Monthly plan</h1>
                                    <div><Badge className={"bg-emerald-100 text-emerald-500"}> <div className="p-[3px] rounded-full bg-emerald-500"></div> Active</Badge></div>
                                </div>
                                <div>
                                    <p className="font-semibold">{paymentInfo?.displayPrice}</p>
                                </div>
                            </div>
                            <div className="p-5 space-y-2 rounded-lg border border-gray-300">
                                <h1 className="text-muted-foreground">Renew At</h1>
                                <p className="font-semibold">{formated}</p>
                            </div>
                            <div className="p-5 space-y-2 rounded-lg border border-gray-300">
                                <h1 className="text-muted-foreground">Campaigns</h1>
                                <p className="font-semibold">{`Created ${campaigns.length} / 3`}</p>
                            </div>
                            <div className="p-5 space-y-3 rounded-lg border border-dashed border-emerald-400 bg-emerald-50">
                                <h1 className="text-muted-foreground">Upgrade Plan</h1>
                                <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                                    Upgrade Now
                                </Button>
                            </div>

                        </div> : <div>
                            <p>No active plan</p>
                        </div>
                    }
                </div>
            )
        default:
            return (
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
                                <h2 className="md:text-2xl text-xl font-semibold">Your Campaigns</h2>
                                <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
                                    <Link href="/create-campaign">
                                        <span className="md:mr-1">+</span>
                                        <p className="max-md:hidden">Create campaign</p>
                                    </Link>
                                </Button>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {campaigns.map((campaign) => (
                                    <Card key={campaign._id} className="hover:shadow-lg transition-shadow">
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
                                                <Badge variant="outline">{campaign.planName}</Badge>
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
            )
    }
}
