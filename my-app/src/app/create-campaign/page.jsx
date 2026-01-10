import { CheckCircle, Zap, Target, TrendingUp, Users, BarChart3, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function PromotionalPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 py-12 px-3">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center gap-2 text-sm">
          <a href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </a>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground font-medium">Create Campaign</span>
        </div>

        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Launch Your Campaign</h1>
          <p className="text-lg text-muted-foreground">Select the perfect strategy to grow your business</p>
        </div>

        {/* Promotion Cards Grid */}
        <div className="md:px-24 px-4 grid md:grid-cols-2 gap-8">
          {/* Performance Marketing Card */}
          <div className="relative overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.03] bg-card rounded-2xl border border-gray-100">
            {/* New Badge */}
            
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#10B981]">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                coming soon
              </span>
            </div>

            <div className="md:p-8 p-4">
              {/* Icon Circle */}
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-800 flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-10 h-10 text-[#10B981]" />
              </div>

              {/* Title and Description */}
              <h2 className="text-2xl font-bold text-center text-foreground mb-2">Performance Marketing</h2>
              <p className="text-center text-muted-foreground mb-6">
                Data-driven campaigns to maximize ROI and drive conversions
              </p>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0" />
                  <span className="text-sm text-gray-600 font-medium">Real-time performance tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-[#10B981] shrink-0" />
                  <span className="text-sm text-gray-600 font-medium">Audience targeting & segmentation</span>
                </li>
                <li className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-[#10B981] shrink-0" />
                  <span className="text-sm text-gray-600 font-medium">Conversion rate optimization</span>
                </li>
              </ul>

              {/* Button */}
              <Button className="w-full bg-[#10B981] hover:bg-[#0D8659] text-white font-semibold py-6 rounded-lg transition-colors">
                Start Performance Campaign
                
              </Button>
            </div>
          </div>

          {/* Brand Awareness Card */}
          <div className="relative overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.03] bg-card border border-gray-100 rounded-2xl">
            <div className="md:p-8 p-4">
              {/* Icon Circle */}
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-800 flex items-center justify-center mb-6 mx-auto">
                <Users className="w-10 h-10 text-blue-600" />
              </div>

              {/* Title and Description */}
              <h2 className="text-2xl font-bold text-center text-foreground mb-2">Brand Awareness</h2>
              <p className="text-center text-muted-foreground mb-6">
                Build brand recognition and reach new audiences at scale
              </p>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="text-sm text-gray-600 font-medium">Multi-channel distribution</span>
                </li>
                <li className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="text-sm text-gray-600 font-medium">Creative asset management</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="text-sm text-gray-600 font-medium">Brand consistency monitoring</span>
                </li>
              </ul>

              {/* Button */}
              <Link href="/create-seo">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 rounded-lg transition-colors">
                Create Brand Campaign
              </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Need help choosing?{" "}
            <a href="mailto:support@mygrono.com" className="text-[#10B981] font-semibold cursor-pointer hover:underline">Contact our team</a>
          </p>
        </div>
      </div>
    </main>
  )
}
