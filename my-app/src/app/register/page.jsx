
import { Suspense } from "react"
import RegisterPage from "./RegisterClient"

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <RegisterPage />
    </Suspense>
  )
}
