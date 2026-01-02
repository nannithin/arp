

import { Suspense } from "react"
import Dash from "./DashboardClient"

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="relative h-screen w-full bg-emerald-500">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-7 h-7 animate-[spin988_2s_linear_infinite]">
          <span className="absolute top-0 left-0 w-3 h-3 bg-white rounded-full"></span>
          <span className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full"></span>
          <span className="absolute bottom-0 left-0 w-3 h-3 bg-white rounded-full"></span>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-full"></span>
        </div>
      </div>
    </div>}>
      <Dash />
    </Suspense>
  )
}
