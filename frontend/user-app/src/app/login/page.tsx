'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { login, signup } from '@/lib/auth'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [userType, setUserType] = useState<'user' | 'technician'>('user')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password,
          userType
        })
      } else {
        await signup({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          confirmPassword: formData.confirmPassword,
          userType
        })
      }
      
      if (userType === 'technician') {
        router.push('/technician/dashboard')
      } else {
        router.push('/customer/dashboard')
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f8f7f5] font-display antialiased text-[#181410]">
      {/* Left Side: Hero / Brand Imagery (Desktop Only) */}
      <div className="relative hidden lg:flex w-full lg:w-1/2 bg-[#23170f] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full bg-cover bg-center opacity-80 mix-blend-overlay" style={{backgroundImage: 'url("/phone-panel.png")'}}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#23170f]/80 via-transparent to-[#23170f]/90"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo Large */}
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

      {/* Right Side: Authentication Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 lg:px-20 relative bg-[#f8f7f5]">
        {/* Mobile Logo */}
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

          {/* Tabs */}
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

          {/* User Type Selection */}
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

          {/* Social Login */}
          <div className="flex flex-col gap-3 mb-6">
            <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-white border border-[#e5e7eb] text-[#181410] hover:bg-gray-50 transition-colors gap-3 text-sm font-bold leading-normal tracking-[0.015em]">
              <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </g>
              </svg>
              <span className="truncate">Continue with Google</span>
            </button>
            <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-white border border-[#e5e7eb] text-[#181410] hover:bg-gray-50 transition-colors gap-3 text-sm font-bold leading-normal tracking-[0.015em]">
              <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-.98-.5-2.04-.5-3.02 0-1.22.58-2.12.29-3.08-.85-2.18-2.58-2.12-6.55.85-8.23 1.39-.77 2.75-.48 3.65.25.75.56 1.77.56 2.56 0 .98-.68 2.56-.91 4.14-.14 1.77.83 2.75 2.06 3.23 2.89-2.92 1.4-4.52 3.8-5.75 5.68zm-2.08-12.8c-.12 2.37-2.02 4.16-4.33 4.1-1.02-.02-2.1-.56-2.73-1.5-.75-1.12-.9-2.62.27-4.14 1.02-1.31 2.81-2.02 4.1-1.93.9.06 2.27.75 2.69 2.1l-.01 1.36z"></path>
              </svg>
              <span className="truncate">Continue with Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative bg-[#f8f7f5] px-2 text-xs text-gray-500 uppercase tracking-wider">Or continue with</div>
          </div>

          {/* Email / Phone Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#181410]" htmlFor="name">Full Name</label>
                <div className="relative">
                  <input 
                    className="w-full rounded-xl border border-[#e6e6e6] bg-white px-4 py-3 text-sm text-[#181410] placeholder-gray-400 focus:border-[#ff6a00] focus:outline-none focus:ring-1 focus:ring-[#ff6a00]" 
                    id="name" 
                    placeholder="Enter your full name" 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required={!isLogin}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#181410]" htmlFor="email">Email Address{isLogin ? ' or Phone Number' : ''}</label>
              <div className="relative">
                <input 
                  className="w-full rounded-xl border border-[#e6e6e6] bg-white px-4 py-3 text-sm text-[#181410] placeholder-gray-400 focus:border-[#ff6a00] focus:outline-none focus:ring-1 focus:ring-[#ff6a00]" 
                  id="email" 
                  placeholder="name@example.com" 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-[#181410]" htmlFor="password">Password</label>
              <div className="relative">
                <input 
                  className="w-full rounded-xl border border-[#e6e6e6] bg-white px-4 py-3 text-sm text-[#181410] placeholder-gray-400 focus:border-[#ff6a00] focus:outline-none focus:ring-1 focus:ring-[#ff6a00]" 
                  id="password" 
                  placeholder="Enter your password" 
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
              </div>
            </div>
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#181410]" htmlFor="confirmPassword">Confirm Password</label>
                <div className="relative">
                  <input 
                    className="w-full rounded-xl border border-[#e6e6e6] bg-white px-4 py-3 text-sm text-[#181410] placeholder-gray-400 focus:border-[#ff6a00] focus:outline-none focus:ring-1 focus:ring-[#ff6a00]" 
                    id="confirmPassword" 
                    placeholder="Confirm your password" 
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required={!isLogin}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                </div>
              </div>
            )}
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-[#ff6a00] focus:ring-[#ff6a00]" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-[#ff6a00] hover:underline">Forgot password?</a>
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

          {/* Footer / Trust */}
          <div className="mt-8 text-center space-y-4">
            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span>Secure, encrypted {isLogin ? 'login' : 'registration'}</span>
            </div>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">
              By continuing, you agree to Rev&apos;s <a className="underline hover:text-[#ff6a00]" href="#">Terms of Service</a> and <a className="underline hover:text-[#ff6a00]" href="#">Privacy Policy</a>.
            </p>
            {isLogin && (
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-[#ff6a00] hover:underline font-medium">
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