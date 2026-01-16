'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RequestRepairPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    brand: 'Apple',
    model: 'iPhone 14 Pro',
    issue: '',
    serviceType: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Navigate to matched technicians
    router.push('/customer/matched-technician')
  }

  return (
    <div className="bg-[#f8f7f5] text-[#181410] font-display antialiased overflow-x-hidden min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e5e7eb] bg-white px-6 py-4 lg:px-12">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="size-8 text-[#ff6a00]">
              <svg className="size-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_543)">
                  <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                  <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_543"><rect fill="white" height="48" width="48"></rect></clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-[#181410] text-xl font-bold leading-tight tracking-[-0.015em]">Rev</h2>
          </div>
        </div>
        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-9">
            <a className="text-[#181410] text-sm font-medium leading-normal hover:text-[#ff6a00] transition-colors" href="#">Home</a>
            <a className="text-[#181410] text-sm font-medium leading-normal hover:text-[#ff6a00] transition-colors" href="#">My Repairs</a>
            <a className="text-[#181410] text-sm font-medium leading-normal hover:text-[#ff6a00] transition-colors" href="#">Support</a>
          </nav>
          <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-transparent hover:border-[#ff6a00] cursor-pointer transition-all" style={{backgroundImage: 'url("/sarah_jenkins.png")'}}></div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[1440px] mx-auto p-4 md:p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
          {/* Main Wizard Content */}
          <div className="flex-1 flex flex-col gap-8 max-w-[800px]">
            {/* Progress Bar */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-6 justify-between items-end">
                <p className="text-[#ff6a00] text-sm font-bold uppercase tracking-wide">Step 1 of 3</p>
                <span className="text-gray-500 text-sm">Device & Issue</span>
              </div>
              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-[#ff6a00] transition-all duration-500 ease-out" style={{width: '35%'}}></div>
              </div>
            </div>

            {/* Page Heading */}
            <div className="flex flex-col gap-2">
              <h1 className="text-[#181410] text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Let's get your device fixed.</h1>
              <p className="text-gray-600 text-lg font-normal leading-normal">Tell us about your device and the issue you're facing to get an instant quote.</p>
            </div>

            {/* Step 1: Device Selection */}
            <section className="flex flex-col gap-5 pt-4">
              <h2 className="flex items-center gap-2 text-[#181410] text-xl font-bold">
                <span className="bg-[#ff6a00] text-white size-7 rounded-full flex items-center justify-center text-sm">1</span>
                Which device needs repair?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Apple (Selected State) */}
                <div className="group relative flex flex-col gap-3 pb-3 rounded-xl border-2 border-[#ff6a00] bg-[#ff6a00]/5 cursor-pointer overflow-hidden transition-all hover:shadow-lg">
                  <div className="absolute top-3 right-3 text-[#ff6a00]">
                    <span className="material-symbols-outlined filled">check_circle</span>
                  </div>
                  <div className="w-full aspect-square bg-white flex items-center justify-center p-6">
                    <span className="material-symbols-outlined text-6xl text-gray-800">phone_iphone</span>
                  </div>
                  <p className="text-[#ff6a00] text-center text-base font-bold leading-normal">Apple</p>
                </div>
                {/* Samsung */}
                <div className="group flex flex-col gap-3 pb-3 rounded-xl border-2 border-transparent bg-white shadow-sm hover:border-[#ff6a00]/50 cursor-pointer transition-all hover:shadow-lg">
                  <div className="w-full aspect-square bg-gray-50 rounded-t-xl flex items-center justify-center p-6">
                    <span className="material-symbols-outlined text-6xl text-gray-400">smartphone</span>
                  </div>
                  <p className="text-[#181410] text-center text-base font-medium leading-normal group-hover:text-[#ff6a00]">Samsung</p>
                </div>
                {/* Google */}
                <div className="group flex flex-col gap-3 pb-3 rounded-xl border-2 border-transparent bg-white shadow-sm hover:border-[#ff6a00]/50 cursor-pointer transition-all hover:shadow-lg">
                  <div className="w-full aspect-square bg-gray-50 rounded-t-xl flex items-center justify-center p-6">
                    <span className="material-symbols-outlined text-6xl text-gray-400">android</span>
                  </div>
                  <p className="text-[#181410] text-center text-base font-medium leading-normal group-hover:text-[#ff6a00]">Google</p>
                </div>
                {/* Other */}
                <div className="group flex flex-col gap-3 pb-3 rounded-xl border-2 border-transparent bg-white shadow-sm hover:border-[#ff6a00]/50 cursor-pointer transition-all hover:shadow-lg">
                  <div className="w-full aspect-square bg-gray-50 rounded-t-xl flex items-center justify-center p-6">
                    <span className="material-symbols-outlined text-6xl text-gray-400">devices_other</span>
                  </div>
                  <p className="text-[#181410] text-center text-base font-medium leading-normal group-hover:text-[#ff6a00]">Other</p>
                </div>
              </div>

              {/* Sub-selection: Model */}
              <div className="mt-2 p-4 bg-white rounded-xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Model</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  <button className="px-4 py-3 rounded-lg border border-[#ff6a00] bg-[#ff6a00]/10 text-[#ff6a00] font-medium text-sm transition-colors">iPhone 14 Pro</button>
                  <button className="px-4 py-3 rounded-lg border border-gray-200 hover:border-[#ff6a00] hover:text-[#ff6a00] font-medium text-sm transition-colors">iPhone 14</button>
                  <button className="px-4 py-3 rounded-lg border border-gray-200 hover:border-[#ff6a00] hover:text-[#ff6a00] font-medium text-sm transition-colors">iPhone 13 Pro</button>
                  <button className="px-4 py-3 rounded-lg border border-gray-200 hover:border-[#ff6a00] hover:text-[#ff6a00] font-medium text-sm transition-colors">Show All</button>
                </div>
              </div>
            </section>

            {/* Step 2: Issue Description */}
            <section className="flex flex-col gap-5 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-[#181410] text-xl font-bold">
                  <span className="bg-gray-200 text-gray-600 size-7 rounded-full flex items-center justify-center text-sm">2</span>
                  What seems to be the problem?
                </h2>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
                  <span className="material-symbols-outlined text-blue-600 text-sm">auto_awesome</span>
                  <span className="text-xs font-semibold text-blue-600">Rev AI Active</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="mb-4">
                  <textarea 
                    className="w-full min-h-[120px] p-4 rounded-lg bg-gray-50 border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-[#ff6a00] text-base placeholder:text-gray-400 resize-none transition-shadow" 
                    placeholder="Describe your issue (e.g., 'My screen is cracked and the touch isn't working properly...')"
                    value={formData.issue}
                    onChange={(e) => setFormData({...formData, issue: e.target.value})}
                  ></textarea>
                </div>
                <div className="flex flex-wrap gap-2">
                  <p className="text-xs font-semibold text-gray-500 w-full mb-1">AI Suggestions:</p>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-[#ff6a00]/10 hover:text-[#ff6a00] transition-colors text-sm font-medium text-gray-600 border border-transparent hover:border-[#ff6a00]/30">
                    <span className="material-symbols-outlined text-[18px]">broken_image</span> Cracked Screen
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-[#ff6a00]/10 hover:text-[#ff6a00] transition-colors text-sm font-medium text-gray-600 border border-transparent hover:border-[#ff6a00]/30">
                    <span className="material-symbols-outlined text-[18px]">battery_alert</span> Battery Drain
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-[#ff6a00]/10 hover:text-[#ff6a00] transition-colors text-sm font-medium text-gray-600 border border-transparent hover:border-[#ff6a00]/30">
                    <span className="material-symbols-outlined text-[18px]">water_drop</span> Water Damage
                  </button>
                </div>
              </div>
            </section>

            {/* Step 3: Service Type (Preview) */}
            <section className="flex flex-col gap-5 pt-4 opacity-60 hover:opacity-100 transition-opacity">
              <h2 className="flex items-center gap-2 text-[#181410] text-xl font-bold">
                <span className="bg-gray-200 text-gray-600 size-7 rounded-full flex items-center justify-center text-sm">3</span>
                Select Service Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-gray-200 bg-white flex flex-col gap-3 hover:border-[#ff6a00] cursor-pointer transition-colors">
                  <div className="size-10 rounded-full bg-orange-50 flex items-center justify-center text-[#ff6a00]">
                    <span className="material-symbols-outlined">person_pin_circle</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#181410]">We Come to You</h3>
                    <p className="text-xs text-gray-500 mt-1">Technician arrives in ~2 hours</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-white flex flex-col gap-3 hover:border-[#ff6a00] cursor-pointer transition-colors">
                  <div className="size-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <span className="material-symbols-outlined">local_shipping</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#181410]">Mail-In Repair</h3>
                    <p className="text-xs text-gray-500 mt-1">Free shipping both ways</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-gray-200 bg-white flex flex-col gap-3 hover:border-[#ff6a00] cursor-pointer transition-colors">
                  <div className="size-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                    <span className="material-symbols-outlined">storefront</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#181410]">Drop-Off</h3>
                    <p className="text-xs text-gray-500 mt-1">Find a certified shop nearby</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Navigation Actions */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-200 mt-4">
              <button 
                onClick={() => router.back()}
                className="px-6 py-3 rounded-lg text-[#181410] font-medium hover:bg-gray-100 transition-colors"
              >
                Back
              </button>
              <button 
                onClick={handleSubmit}
                className="px-8 py-3 rounded-lg bg-[#ff6a00] text-white font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all flex items-center gap-2"
              >
                Next Step
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right Sidebar: Summary */}
          <aside className="lg:w-[360px] flex-shrink-0">
            <div className="sticky top-24 flex flex-col gap-4">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 bg-gray-50">
                  <h3 className="text-lg font-bold text-[#181410]">Repair Summary</h3>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  {/* Device Item */}
                  <div className="flex gap-4">
                    <div className="size-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-gray-500">phone_iphone</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#181410]">iPhone 14 Pro</p>
                      <p className="text-xs text-gray-500 mt-0.5">Silver • 256GB</p>
                    </div>
                    <button className="text-xs font-semibold text-[#ff6a00] hover:underline">Edit</button>
                  </div>
                  {/* Issue Item (Placeholder) */}
                  <div className="flex gap-4 opacity-50">
                    <div className="size-12 rounded-lg bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-gray-300">build</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-400">Issue Description</p>
                      <p className="text-xs text-gray-400 mt-0.5">Pending input...</p>
                    </div>
                  </div>
                  <div className="h-px bg-gray-100 my-1"></div>
                  {/* Price */}
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-500">Estimated Total</p>
                    <p className="text-xl font-black text-[#181410]">--</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg flex gap-3 items-start">
                    <span className="material-symbols-outlined text-blue-600 text-lg mt-0.5">verified_user</span>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      Prices are final after diagnostic. Includes <strong>Lifetime Warranty</strong> on parts.
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                  <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-sm">lock</span>
                    Secure SSL Encrypted
                  </p>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3 shadow-sm">
                <div className="size-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                  <span className="material-symbols-outlined">health_and_safety</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#181410]">Vetted Technicians</p>
                  <p className="text-xs text-gray-500">All experts are background checked & certified.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}