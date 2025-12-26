"use client"


import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react"
import api from "@/lib/axios"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { useSearchParams } from "next/navigation"
import { useUserStore } from "@/store/seostore"
import { toast } from "sonner"


export default function LoginPage() {
  const searchParams = useSearchParams()
  const { setUser } = useUserStore.getState()
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [authResolving, setAuthResolving] = useState(true)




  useEffect(() => {
    const checkAuth = async () => {
      const code = searchParams.get("code");

      // 🔒 If Google OAuth is in progress, do NOTHING
      if (code) return
      try {
        const res = await api.get("/api/user/dashboard")
        router.replace('/dashboard')
      } catch {
        setCheckingAuth(false)
        console.log("user not logged in");


      }
    }

    checkAuth()
  }, [router])
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const isValid = email.trim() !== "" &&
        password.trim() !== ""

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    if(!isValid){
      toast.error("Fill all the required fields")
      setLoading(false)
      return;
    }
    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
        rememberMe,
      })
      console.log("jj");

      // ✅ success      
      setUser(res.data.user)
      router.push("/dashboard")
      console.log("jj");


    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Try again."
      )
      toast.error("Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      setError("")

      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/login`,
        },
      })
    } catch {
      setError("Google login failed")
      setLoading(false)
    }
  }


  useEffect(() => {

    const finishGoogleLogin = async () => {
      const code = searchParams.get("code")

      // 🔒 IMPORTANT: only run after Google redirect
      if (!code) {
        setAuthResolving(false);
        return;
      }

      const { data, error } = await supabase.auth.getSession()

      if (error || !data?.session) return

      const accessToken = data.session.access_token
      try {
        const res = await api.post(
          "/api/auth/google",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        // Optional: clear Supabase session
        await supabase.auth.signOut()
        console.log(res);

        router.replace("/dashboard")
      } catch (err) {
        setError("Google authentication failed")
      } finally {
        setAuthResolving(false)
        setLoading(false)
      }
    }

    finishGoogleLogin()
  }, [searchParams, router])


  console.log(loading);


  if (checkingAuth || authResolving) {
    return (
      <div>
        <div className="relative w-5 h-5 animate-[spin988_2s_linear_infinite]">
          <span className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full"></span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full"></span>
          <span className="absolute bottom-0 left-0 w-2 h-2 bg-white rounded-full"></span>
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-white rounded-full"></span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex ">
      {/* Left Side - Sign Up Form */}
      <div className="w-full border lg:w-2/5 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-7">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M3 3h18v18H3V3z" />
              </svg>
            </div>
            <span className="text-xl text-[#10B981] font-semibold">Title</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-medium mb-2 text-balance font-sans">Welcome Back</h1>
          <p className="text-muted-foreground mb-8">Glad to see you again Log into your account below</p>

          {/* Google Sign In Button */}
          <Button onClick={handleGoogleLogin} variant="outline" className="w-full mb-6 h-12 bg-transparent">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </Button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">or</span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4">


            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email<span className="text-red-500">*</span>
              </Label>
              <Input id="email" type="email" placeholder="Enter your email" className="mt-1.5 h-12" onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium">
                Password<span className="text-red-500">*</span>
              </Label>
              <Input id="password" type="password" placeholder="Enter your password" autoComplete="new-password" className="mt-1.5 h-12" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <Button onClick={handleSubmit} className="w-full h-12 bg-[#10B981] text-white hover:bg-[#17ae7b] mt-6">
              {
                loading ? <div className="relative w-5 h-5 animate-[spin988_2s_linear_infinite]">
                  <span className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full"></span>
                  <span className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full"></span>
                  <span className="absolute bottom-0 left-0 w-2 h-2 bg-white rounded-full"></span>
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-white rounded-full"></span>
                </div> : 'Login'
              }
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <a href="/register" className=" font-medium hover:underline text-[#10B981]">
              Signup Here
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Reserved Space for Image/Cards */}
      <div className="max-md:hidden lg:w-3/5 h-screen p-7">
        <div className="rounded-lg hidden lg:flex lg:w-full h-full bg-gradient-to-br from-[#10B981] via-[#10B981] to-[#44e7b0] relative overflow-hidden">

        </div>
      </div>
    </div>
  )
}