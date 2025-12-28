

import { Suspense } from "react"
import Dash from "./DashboardClient"

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <Dash />
    </Suspense>
  )
}
