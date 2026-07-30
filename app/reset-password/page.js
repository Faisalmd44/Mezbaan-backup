'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react'

function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function restoreSession() {
  const hash = new
  URLSearchParams(window.location.hash.substring(1))

  const code = searchParams.get('code')
  const token = searchParams.get('token')
  const type = searchParams.get('type') || hash.get('type')

  const accessToken =
  searchParams.get('access_token') || hash.get('access_token')

  const refreshToken =
  searchParams.get('refresh_token') || hash.get('refresh_token')

      // If access_token is present in the URL (older flow), set the session directly.
      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        if (!cancelled) {
          if (error) {
            setError('Invalid or expired reset link. Please request a new password reset.')
          } else {
            setSessionReady(true)
          }
        }
        return
      }

      // If a code is present (newer PKCE flow), exchange it for a session.
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!cancelled) {
          if (error) {
            setError('Invalid or expired reset link. Please request a new password reset.')
          } else {
            setSessionReady(true)
          }
        }
        return
      }

      // If a token/type is present (legacy flow), verify the recovery token.
      if (token && type) {
        const { error } = await supabase.auth.verifyOtp({ token_hash: token, type })
        if (!cancelled) {
          if (error) {
            setError('Invalid or expired reset link. Please request a new password reset.')
          } else {
            setSessionReady(true)
          }
        }
        return
      }

      // No recovery params in URL — check if there's already an active session.
      const { data } = await supabase.auth.getSession()

          if (!cancelled) {
          if (data.session) {
          setSessionReady(true)
         } else {
        // Form ko dikhne do.
       setSessionReady(true)
      }
     }
    }

    restoreSession()
    return () => { cancelled = true }
  }, [searchParams])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) {
      setError(error.message || 'Failed to update password. Please try again.')
      return
    }

    setSuccess(true)
    setTimeout(() => router.push('/login'), 3000)
  }

  return (
    <main className="hero-gradient min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md fade-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/Logo.png"
            alt="Mezbaan"
            width={216}
            height={72}
            priority
            className="h-[68px] w-auto"
          />
        </div>

        {/* Card */}
        <div className="bg-neutral-900/80 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[color:var(--mez-yellow)]/15 border border-[color:var(--mez-yellow)]/30 mb-4">
              <Lock className="w-6 h-6 text-[color:var(--mez-yellow)]" />
            </div>
            <h1 className="text-2xl font-black text-white">Reset Your Password</h1>
            <p className="text-sm text-white/50 mt-2">Enter a new password for your Mezbaan account</p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-5 flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Success banner */}
          {success && (
            <div className="mb-5 flex items-start gap-3 bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-green-300 font-semibold">Password updated successfully!</p>
                <p className="text-xs text-green-400/70 mt-0.5">Redirecting to login…</p>
              </div>
            </div>
          )}

          {/* Form — only show when session is ready and not already succeeded */}
          {!success && sessionReady && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/80">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    className="h-12 bg-neutral-950 border-white/10 text-white placeholder:text-white/30 rounded-xl pr-11 focus-visible:ring-[color:var(--mez-yellow)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white/80">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    required
                    className="h-12 bg-neutral-950 border-white/10 text-white placeholder:text-white/30 rounded-xl pr-11 focus-visible:ring-[color:var(--mez-yellow)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[color:var(--mez-yellow)] hover:bg-[color:var(--mez-yellow-dark)] text-black font-bold rounded-xl text-base disabled:opacity-50"
              >
                {loading ? 'Updating…' : 'Update Password'}
              </Button>
            </form>
          )}

          {/* Loading state while restoring session */}
          {!success && !sessionReady && !error && (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-2 border-[color:var(--mez-yellow)]/30 border-t-[color:var(--mez-yellow)] rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Back to login */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/login')}
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[color:var(--mez-yellow)] transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </button>
        </div>
      </div>
    </main>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="hero-gradient min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[color:var(--mez-yellow)]/30 border-t-[color:var(--mez-yellow)] rounded-full animate-spin" />
        </main>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  )
}
