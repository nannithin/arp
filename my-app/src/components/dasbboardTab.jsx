"use client"

import { useRouter, useSearchParams } from "next/navigation"
import clsx from "clsx"

const tabs = [
  { key: "campaigns", label: "Campaigns" },
  { key: "performance", label: "Performance" },
  { key: "metrics", label: "Channel Metrics" },
  { key: "subscriptions", label: "Subscriptions" },
]

export default function DashboardTabs() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const activeTab = searchParams.get("tab") || "campaigns"

  const handleTabChange = (key) => {
    router.replace(`?tab=${key}`, { scroll: false })
  }

  return (
    <div className="max-md:hidden h-12 rounded-full bg-[#F0F8F3] flex w-fit items-center p-0.5 mx-auto select-none">
      <ul className="list-none h-full flex gap-1">
        {tabs.map((tab) => (
          <li className="" key={tab.key}>
            <button
              onClick={() => handleTabChange(tab.key)}
              className={clsx(
                "cursor-pointer h-full rounded-full px-6 flex items-center text-sm font-medium transition-all",
                activeTab === tab.key
                  ? "bg-[#10B981] text-white shadow-sm"
                  : "text-black hover:bg-[#D1FAE5]"
              )}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
