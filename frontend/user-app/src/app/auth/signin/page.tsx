'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const searchParams = useSearchParams()
  const roleParam = searchParams.get('role')
  const signupParam = searchParams.get('signup')
  
  const [isLogin, setIsLogin] = useState(signupParam !== 'true')
  const [userType, setUserType] = useState<'user' | 'technician'>('user')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (roleParam === 'customer') {
      setUserType('user')
    } else if (roleParam === 'technician') {
      setUserType('technician')
    }
    if (signupParam === 'true') {
      setIsLogin(false)
    }
  }, [roleParam, signupParam])



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Redirect based on user type and login/signup
      if (userType === 'technician') {
        // First-time technicians go to onboarding, returning users go to dashboard
        router.push(isLogin ? '/technician/dashboard' : '/technician/onboarding')
      } else {
        router.push('/customer/dashboard')
      }
    } catch (error) {
      console.error('Authentication error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f8f7f5] font-display antialiased text-[#181410]">
      <div className="relative hidden lg:flex w-full lg:w-1/2 bg-[#23170f] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full bg-cover bg-center opacity-80 mix-blend-overlay" style={{backgroundImage: 'url("/phone-panel.png")'}}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#23170f]/80 via-transparent to-[#23170f]/90"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-4 text-white">
            <div className="size-8">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight">Rev</span>
          </div>
          <div className="space-y-4 max-w-md">
            <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-white">
              Quality repairs, delivered at the speed of life.
            </h1>
            <div className="flex items-center gap-3 text-white/90">
              <span className="material-symbols-outlined text-[#ff6a00]">verified_user</span>
              <p className="text-lg font-medium">Trust by Design. Vetted experts.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 lg:px-20 relative bg-[#f8f7f5]">
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-3 text-[#181410]">
          <div className="size-6">
            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
              <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <span className="font-bold text-lg">Rev</span>
        </div>

        <div className="w-full max-w-sm lg:max-w-md">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black tracking-[-0.033em] text-[#181410] mb-2">{isLogin ? 'Welcome back' : 'Create your account'}</h2>
            <p className="text-gray-500">{isLogin ? 'Repair, replace, and revive your devices.' : 'Join thousands of satisfied customers.'}</p>
          </div>

          <div className="flex border-b border-[#e7dfda] mb-8 w-full">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex flex-1 flex-col items-center justify-center border-b-[3px] pb-3 cursor-pointer group ${
                isLogin ? 'border-[#ff6a00]' : 'border-transparent hover:border-gray-300 transition-colors'
              }`}
            >
              <p className={`text-sm font-bold leading-normal tracking-[0.015em] ${
                isLogin ? 'text-[#181410]' : 'text-gray-400 group-hover:text-gray-600'
              }`}>Log In</p>
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex flex-1 flex-col items-center justify-center border-b-[3px] pb-3 cursor-pointer group ${
                !isLogin ? 'border-[#ff6a00]' : 'border-transparent hover:border-gray-300 transition-colors'
              }`}
            >
              <p className={`text-sm font-bold leading-normal tracking-[0.015em] ${
                !isLogin ? 'text-[#181410]' : 'text-gray-400 group-hover:text-gray-600'
              }`}>Sign Up</p>
            </button>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-[#181410] mb-3">I am a:</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType('user')}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  userType === 'user'
                    ? 'border-[#ff6a00] bg-[#ff6a00]/5 text-[#ff6a00]'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <span className="material-symbols-outlined text-lg mb-1 block">smartphone</span>
                Device Owner
              </button>
              <button
                type="button"
                onClick={() => setUserType('technician')}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  userType === 'technician'
                    ? 'border-[#ff6a00] bg-[#ff6a00]/5 text-[#ff6a00]'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <span className="material-symbols-outlined text-lg mb-1 block">build</span>
                Technician
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#181410]" htmlFor="name">Full Name</label>
                <input 
                  className="w-full rounded-xl border border-[#e6e6e6] bg-white px-4 py-3 text-sm text-[#181410] placeholder-gray-400 focus:border-[#ff6a00] focus:outline-none focus:ring-1 focus:ring-[#ff6a00]" 
                  id="name" 
                  placeholder="Enter your full name" 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required={!isLogin}
                />
              </div>
            )}
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#181410]" htmlFor="email">Email Address</label>
              <input 
                className="w-full rounded-xl border border-[#e6e6e6] bg-white px-4 py-3 text-sm text-[#181410] placeholder-gray-400 focus:border-[#ff6a00] focus:outline-none focus:ring-1 focus:ring-[#ff6a00]" 
                id="email" 
                placeholder="name@example.com" 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#181410]" htmlFor="password">Password</label>
              <input 
                className="w-full rounded-xl border border-[#e6e6e6] bg-white px-4 py-3 text-sm text-[#181410] placeholder-gray-400 focus:border-[#ff6a00] focus:outline-none focus:ring-1 focus:ring-[#ff6a00]" 
                id="password" 
                placeholder="Enter your password" 
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#181410]" htmlFor="confirmPassword">Confirm Password</label>
                <input 
                  className="w-full rounded-xl border border-[#e6e6e6] bg-white px-4 py-3 text-sm text-[#181410] placeholder-gray-400 focus:border-[#ff6a00] focus:outline-none focus:ring-1 focus:ring-[#ff6a00]" 
                  id="confirmPassword" 
                  placeholder="Confirm your password" 
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required={!isLogin}
                />
              </div>
            )}
            <button 
              className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-[#ff6a00] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                </div>
              ) : (
                <span className="truncate">{isLogin ? 'Sign In' : 'Create Account'}</span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <p className="text-xs text-gray-400 max-w-xs mx-auto">
              By continuing, you agree to Rev&apos;s <a className="underline hover:text-[#ff6a00]" href="#">Terms of Service</a> and <a className="underline hover:text-[#ff6a00]" href="#">Privacy Policy</a>.
            </p>
            {isLogin && (
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/auth/signup" className="text-[#ff6a00] hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
            )}
            {!isLogin && (
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button onClick={() => setIsLogin(true)} className="text-[#ff6a00] hover:underline font-medium">
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f8f7f5]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6a00]"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
