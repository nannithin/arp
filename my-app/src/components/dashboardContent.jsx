
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Rocket, FolderPlusCreate, FolderPlus, Youtube, TrendingUp, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";


export default function DashboardContent({campaigns}) {
    const searchParams = useSearchParams()
    const tab = searchParams.get("tab") || "campaigns"

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
            return <Skel />
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
            )
    }
}
