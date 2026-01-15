'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const [deviceModel, setDeviceModel] = useState('')
  const router = useRouter()

  const handleGetEstimate = () => {
    if (deviceModel.trim()) {
      router.push(`/user/request-repair?device=${encodeURIComponent(deviceModel)}`)
    }
  }

  return (
    <div className="bg-white text-[#181410] font-display antialiased overflow-x-hidden">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="size-8 text-[#ff6a00]">
                <svg className="h-full w-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                  <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <h1 className="text-xl font-black tracking-tight text-[#181410]">Rev</h1>
            </div>
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              <a className="text-sm font-medium text-[#181410]/80 hover:text-[#ff6a00] transition-colors" href="#">How it Works</a>
              <a className="text-sm font-medium text-[#181410]/80 hover:text-[#ff6a00] transition-colors" href="#">Technicians</a>
              <a className="text-sm font-medium text-[#181410]/80 hover:text-[#ff6a00] transition-colors" href="/login">Log In</a>
              <button 
                onClick={() => router.push('/signup')}
                className="bg-[#ff6a00] hover:bg-[#ff6a00]/90 text-white text-sm font-bold py-2.5 px-5 rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                Signup
              </button>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button className="text-[#181410]">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Abstract bg shapes */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Content */}
            <div className="flex flex-col gap-6 max-w-2xl lg:max-w-none">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 w-fit">
                <span className="flex h-2 w-2 rounded-full bg-[#ff6a00] animate-pulse"></span>
                <span className="text-xs font-semibold text-[#ff6a00] uppercase tracking-wide">Trust-First Repairs</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#181410] leading-[1.1] tracking-tight">
                Mobile Repair, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6a00] to-orange-400">Redefined by AI.</span>
              </h1>
              <p className="text-lg text-[#6b7280] max-w-lg leading-relaxed">
                Instantly connect with vetted technicians near you. We combine smart diagnostics with human expertise to get you back online fast.
              </p>
              {/* Search Input */}
              <div className="mt-4 bg-white p-2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col sm:flex-row gap-2 max-w-lg">
                <div className="flex-1 flex items-center px-3 gap-3">
                  <span className="material-symbols-outlined text-gray-400">smartphone</span>
                  <input 
                    className="w-full bg-transparent border-none focus:ring-0 text-[#181410] placeholder-gray-400 text-sm font-medium h-10" 
                    placeholder="Enter your device model (e.g. iPhone 13)" 
                    type="text"
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleGetEstimate()}
                  />
                </div>
                <button 
                  onClick={handleGetEstimate}
                  className="bg-[#ff6a00] hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold text-sm whitespace-nowrap transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  Get Estimate
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
              <div className="flex items-center gap-6 text-sm font-medium text-[#6b7280] mt-2">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span>
                  <span>10k+ Repairs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-yellow-500 text-[18px] fill-current">star</span>
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
            {/* Hero Image */}
            <div className="relative lg:h-auto h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
              <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCufkTLL15hwkpTPtTI2dORPQ1esKPWTEowt5E0jQ6pu5FFaFh4uJsCu856HDUknQ1EnmWPEtsaTcedYMPl6FS-R3Q5AearP6yGiIEnnvWjVF4AC3LGdNDkXLCmiPD-hSLFw0o8NYl1dJrK10HIrW-kNN-kavaEHt9FuPofzL_OOmK5_Ir4AXYZGaEaN5DMLj3rjd6cehcXqf1OHrUv2sBns0bCWIH_m0IhjCtoIwyMGWZO3EkP9iw-Wpsyg7ra-NduUywcqOz6vuY")'}}></div>
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur px-4 py-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 max-w-xs">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img alt="Technician portrait" className="w-full h-full object-cover" src="/sarah_jenkins.png"/>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#181410]">Technician nearby</p>
                  <p className="text-[10px] text-[#6b7280]">Arrives in <span className="text-[#ff6a00] font-bold">~45 mins</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[#181410] mb-4">Why Choose Rev?</h2>
            <p className="text-[#6b7280]">We combine advanced AI diagnostics with human expertise to create a seamless repair experience.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-[#ff6a00]/10 rounded-xl flex items-center justify-center mb-6 text-[#ff6a00]">
                <span className="material-symbols-outlined text-[28px]">smart_toy</span>
              </div>
              <h3 className="text-xl font-bold text-[#181410] mb-3">AI-Powered Diagnostics</h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                Our smart system identifies your issue instantly and matches you with the perfect expert for your specific device model.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-[#ff6a00]/10 rounded-xl flex items-center justify-center mb-6 text-[#ff6a00]">
                <span className="material-symbols-outlined text-[28px]">verified_user</span>
              </div>
              <h3 className="text-xl font-bold text-[#181410] mb-3">Vetted Experts</h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                Trust is paramount. Every technician is background-checked, skill-verified, and rated by users like you.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-[#ff6a00]/10 rounded-xl flex items-center justify-center mb-6 text-[#ff6a00]">
                <span className="material-symbols-outlined text-[28px]">payments</span>
              </div>
              <h3 className="text-xl font-bold text-[#181410] mb-3">Transparent Pricing</h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                Know exactly what you'll pay before you book. No hidden fees, no last-minute upcharges. Just fair rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (Timeline) */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#181410] mb-16 text-center">How It Works</h2>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 -translate-x-1/2"></div>
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between mb-16 group">
              <div className="md:w-[45%] mb-4 md:mb-0 md:text-right pr-0 md:pr-12 order-2 md:order-1 pl-16 md:pl-0 text-left w-full">
                <h3 className="text-xl font-bold text-[#181410] mb-2">Book Your Repair</h3>
                <p className="text-[#6b7280] text-sm">Enter your device details and issue. Our AI gives you an instant quote and finds availability.</p>
              </div>
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-[#ff6a00] shadow-lg flex items-center justify-center z-10 order-1 md:order-2">
                <span className="material-symbols-outlined text-[#ff6a00] text-[20px]">calendar_add_on</span>
              </div>
              <div className="md:w-[45%] order-3 hidden md:block"></div>
            </div>
            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between mb-16 group">
              <div className="md:w-[45%] order-3 hidden md:block"></div>
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-white ring-4 ring-gray-100 flex items-center justify-center z-10 order-1 md:order-2">
                <span className="material-symbols-outlined text-gray-400 text-[20px]">handshake</span>
              </div>
              <div className="md:w-[45%] mb-4 md:mb-0 pl-16 md:pl-12 order-2 md:order-3 w-full text-left">
                <h3 className="text-xl font-bold text-[#181410] mb-2">Meet Your Tech</h3>
                <p className="text-[#6b7280] text-sm">We match you with a vetted pro nearby. Track their arrival in real-time or drop off your device.</p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-center justify-between group">
              <div className="md:w-[45%] mb-4 md:mb-0 md:text-right pr-0 md:pr-12 order-2 md:order-1 pl-16 md:pl-0 text-left w-full">
                <h3 className="text-xl font-bold text-[#181410] mb-2">Device Fixed</h3>
                <p className="text-[#6b7280] text-sm">Your tech repairs your device on the spot. Payment is released only after you're satisfied.</p>
              </div>
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#ff6a00] flex items-center justify-center z-10 shadow-lg shadow-orange-200 order-1 md:order-2">
                <span className="material-symbols-outlined text-white text-[20px]">check</span>
              </div>
              <div className="md:w-[45%] order-3 hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Technician Spotlight Card Section */}
      <section className="py-20 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold text-[#181410]">Repairs you can trust, <br/>by people you can know.</h2>
              <p className="text-[#6b7280] text-lg">We don't send strangers. We send vetted professionals with verified skills and community reviews.</p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#ff6a00]">check_circle</span>
                  <span className="font-medium text-[#181410]">Identity Verified</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#ff6a00]">check_circle</span>
                  <span className="font-medium text-[#181410]">Skill Tested</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#ff6a00]">check_circle</span>
                  <span className="font-medium text-[#181410]">Background Checked</span>
                </li>
              </ul>
              <button className="mt-4 flex items-center gap-2 text-[#ff6a00] font-bold hover:gap-3 transition-all">
                Meet our technicians
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="flex-1 w-full max-w-md">
              {/* Tech Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="h-32 bg-gradient-to-r from-gray-800 to-gray-900 relative">
                  <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                </div>
                <div className="px-6 pb-6 relative">
                  <div className="flex justify-between items-end -mt-12 mb-4">
                    <div className="w-24 h-24 rounded-2xl border-4 border-white overflow-hidden shadow-md bg-white">
                      <img alt="Sarah T." className="w-full h-full object-cover" src="/sarah_jenkins.png"/>
                    </div>
                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-100">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Available Now
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-[#181410]">Sarah Jenkins</h3>
                    <p className="text-sm text-[#6b7280]">Master Technician • 4 years exp.</p>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-yellow-500 text-sm fill-current">star</span>
                      <span className="font-bold text-[#181410]">4.9</span>
                      <span className="text-[#6b7280] text-xs">(324 reviews)</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200"></div>
                    <div className="flex gap-1">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Screen</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Battery</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#6b7280] italic bg-gray-50 p-3 rounded-lg border border-gray-100 mb-6">
                    "Sarah was amazing! Fixed my iPhone screen in 20 minutes at my office. Super professional."
                  </p>
                  <button 
                    onClick={() => router.push('/signup/user')}
                    className="w-full py-3 bg-[#181410] text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Book Sarah
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#181410] mb-6 tracking-tight">
            Don't let a broken phone <br/> slow you down.
          </h2>
          <p className="text-lg text-[#6b7280] mb-10 max-w-2xl mx-auto">
            Join thousands of happy customers who got their devices fixed quickly, safely, and affordably with Rev.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => router.push('/signup/user')}
              className="w-full sm:w-auto px-8 py-4 bg-[#ff6a00] hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-200 transition-all hover:-translate-y-1 text-lg"
            >
              Book a Repair Now
            </button>
            <button 
              onClick={() => router.push('/signup/technician')}
              className="w-full sm:w-auto px-8 py-4 bg-gray-100 hover:bg-gray-200 text-[#181410] font-bold rounded-xl transition-all"
            >
              Become a Technician
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#f9fafb] to-transparent -z-0"></div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="size-6 text-[#ff6a00]">
                  <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                  </svg>
                </div>
                <span className="text-lg font-black text-[#181410]">Rev</span>
              </div>
              <p className="text-sm text-[#6b7280] mb-4">
                Modern mobile repair for the modern world. Fast, trusted, and powered by AI.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[#181410] mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-[#6b7280]">
                <li><a className="hover:text-[#ff6a00]" href="#">About Us</a></li>
                <li><a className="hover:text-[#ff6a00]" href="#">Careers</a></li>
                <li><a className="hover:text-[#ff6a00]" href="#">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#181410] mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-[#6b7280]">
                <li><a className="hover:text-[#ff6a00]" href="#">Help Center</a></li>
                <li><a className="hover:text-[#ff6a00]" href="#">Track Order</a></li>
                <li><a className="hover:text-[#ff6a00]" href="#">Warranty</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#181410] mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[#6b7280]">
                <li><a className="hover:text-[#ff6a00]" href="#">Privacy Policy</a></li>
                <li><a className="hover:text-[#ff6a00]" href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#6b7280]">© 2024 Rev Technologies Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <a className="text-gray-400 hover:text-[#181410] transition-colors" href="#"><span className="sr-only">Twitter</span><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg></a>
              <a className="text-gray-400 hover:text-[#181410] transition-colors" href="#"><span className="sr-only">Instagram</span><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.37c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" fillRule="evenodd"></path></svg></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
