'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MatchedTechnicianPage() {
  const router = useRouter()
  const [sortBy, setSortBy] = useState('best-match')

  const technicians = [
    {
      id: 1,
      name: 'Alex M.',
      memberSince: '2021',
      rating: 4.9,
      repairs: 120,
      distance: '0.8 miles away',
      description: 'Certified Apple Repair Specialist. I focus on screen replacements and battery issues. I come to you fully equipped.',
      badges: ['Rev Verified', 'Background Checked'],
      price: 120,
      isBestMatch: true,
      avatar: '/sarah_jenkins.png'
    },
    {
      id: 2,
      name: 'Sarah J.',
      memberSince: '2020',
      rating: 5.0,
      repairs: 85,
      distance: '1.2 miles away',
      description: 'Fast, reliable, and precise. I use only high-quality parts for all repairs. Available for same-day service.',
      badges: ['Rev Verified', 'Fast Service'],
      price: 145,
      isBestMatch: false,
      avatar: '/sarah_jenkins.png'
    },
    {
      id: 3,
      name: 'Tech Squad',
      memberSince: 'Top Rated Team',
      rating: 4.8,
      repairs: 300,
      distance: '0.5 miles away',
      description: 'Professional team of mobile technicians. We handle all major brands. 90-day warranty on all parts and labor.',
      badges: ['Rev Verified', 'Warranty'],
      price: 110,
      isBestMatch: false,
      isBestValue: true,
      avatar: '/sarah_jenkins.png'
    }
  ]

  const handleSelectTechnician = (technicianId: number) => {
    router.push(`/customer/job-status?id=${technicianId}`)
  }

  return (
    <div className="bg-[#f8f7f5] font-display text-[#181410] transition-colors duration-200 flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7dfda] px-10 py-4 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="size-8 text-[#ff6a00]">
            <svg className="size-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
              <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-[#181410] text-xl font-bold leading-tight tracking-tight">Rev</h2>
        </div>
        <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-transparent border border-[#e7dfda] text-[#181410] hover:bg-black/5 text-sm font-bold leading-normal transition-colors">
          <span className="truncate">Edit Request</span>
        </button>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 px-4 sm:px-10 py-8 max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Content & Cards */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Progress Section */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-6 justify-between items-end">
                <div>
                  <h1 className="text-[#181410] text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] mb-2">We found the best experts for you</h1>
                  <p className="text-[#8d715e] text-base font-normal leading-normal">
                    Matches for <span className="font-semibold text-[#181410]">iPhone 13 • Cracked Screen</span> in Brooklyn, NY
                  </p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-[#181410] text-sm font-medium leading-normal mb-1">Matching Process</p>
                  <p className="text-[#8d715e] text-xs">Step 3 of 4</p>
                </div>
              </div>
              <div className="rounded bg-[#e7dfda] mt-2">
                <div className="h-1.5 rounded bg-[#ff6a00] w-3/4"></div>
              </div>
            </div>

            {/* Filter / Sort */}
            <div className="flex items-center gap-3 py-2">
              <span className="text-sm font-medium text-[#8d715e]">Sorted by:</span>
              <button 
                onClick={() => setSortBy('best-match')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  sortBy === 'best-match' 
                    ? 'bg-white border border-[#e7dfda] text-[#ff6a00] shadow-sm' 
                    : 'bg-transparent border border-transparent text-[#8d715e] hover:bg-black/5'
                }`}
              >
                Best Match
              </button>
              <button 
                onClick={() => setSortBy('lowest-price')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  sortBy === 'lowest-price' 
                    ? 'bg-white border border-[#e7dfda] text-[#ff6a00] shadow-sm' 
                    : 'bg-transparent border border-transparent text-[#8d715e] hover:bg-black/5'
                }`}
              >
                Lowest Price
              </button>
              <button 
                onClick={() => setSortBy('highest-rated')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  sortBy === 'highest-rated' 
                    ? 'bg-white border border-[#e7dfda] text-[#ff6a00] shadow-sm' 
                    : 'bg-transparent border border-transparent text-[#8d715e] hover:bg-black/5'
                }`}
              >
                Highest Rated
              </button>
            </div>

            {/* Technicians List */}
            <div className="flex flex-col gap-4">
              {technicians.map((tech, index) => (
                <div key={tech.id} className={`group relative flex flex-col sm:flex-row gap-6 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow ${
                  tech.isBestMatch ? 'border-2 border-[#ff6a00]/20 bg-white' : 'border border-[#e7dfda] bg-white'
                }`}>
                  {/* Best Match Badge */}
                  {tech.isBestMatch && (
                    <div className="absolute -top-3 left-6 bg-[#ff6a00] text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-sm z-10">
                      Best Match
                    </div>
                  )}
                  {/* Best Value Badge */}
                  {tech.isBestValue && (
                    <div className="absolute -top-3 left-6 bg-gray-800 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-sm z-10">
                      Best Value
                    </div>
                  )}

                  {/* Avatar Column */}
                  <div className="flex-shrink-0 flex flex-col items-center sm:items-start gap-3">
                    <div className="relative size-20 sm:size-24">
                      <div className="size-full rounded-full bg-cover bg-center border-2 border-white shadow-sm" style={{backgroundImage: `url('${tech.avatar}')`}}></div>
                      <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full border-2 border-white" title="Verified">
                        <span className="material-symbols-outlined text-[16px] font-bold block">check</span>
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-bold text-[#181410]">{tech.name}</h3>
                      <p className="text-xs text-[#8d715e]">Member since {tech.memberSince}</p>
                    </div>
                  </div>

                  {/* Details Column */}
                  <div className="flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <div className="flex items-center text-[#ff6a00]">
                          <span className="material-symbols-outlined text-[20px] fill-current">star</span>
                          <span className="ml-1 font-bold text-[#181410]">{tech.rating}</span>
                        </div>
                        <span className="text-[#8d715e] text-sm">• {tech.repairs}+ repairs</span>
                        <span className="text-[#8d715e] text-sm">• {tech.distance}</span>
                      </div>
                      <p className="text-sm text-[#8d715e] line-clamp-2 mb-3">
                        {tech.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tech.badges.map((badge, i) => (
                          <span key={i} className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium ${
                            badge === 'Rev Verified' ? 'bg-green-100 text-green-700' :
                            badge === 'Background Checked' ? 'bg-blue-100 text-blue-700' :
                            badge === 'Fast Service' ? 'bg-gray-100 text-[#181410]' :
                            badge === 'Warranty' ? 'bg-purple-100 text-purple-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            <span className="material-symbols-outlined text-[14px]">
                              {badge === 'Rev Verified' ? 'verified_user' :
                               badge === 'Background Checked' ? 'security' :
                               badge === 'Fast Service' ? 'bolt' :
                               badge === 'Warranty' ? 'workspace_premium' :
                               'check'}
                            </span>
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Column */}
                  <div className="flex flex-col sm:items-end justify-between gap-4 border-t sm:border-t-0 sm:border-l border-[#e7dfda] pt-4 sm:pt-0 sm:pl-6 min-w-[180px]">
                    <div className="text-left sm:text-right">
                      <span className="block text-3xl font-black text-[#181410] tracking-tight">${tech.price}</span>
                      <span className="text-sm font-medium text-[#8d715e]">Estimated total</span>
                    </div>
                    <button 
                      onClick={() => handleSelectTechnician(tech.id)}
                      className={`w-full py-3 px-4 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 font-bold ${
                        tech.isBestMatch 
                          ? 'bg-[#ff6a00] hover:bg-[#cc5500] text-white shadow-[#ff6a00]/20' 
                          : 'bg-[#f8f7f5] hover:bg-gray-200 text-[#181410] border border-[#e7dfda]'
                      }`}
                    >
                      Select Technician
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Map & Trust Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Map Card */}
            <div className="bg-white border border-[#e7dfda] rounded-2xl overflow-hidden shadow-sm h-fit">
              <div className="p-4 border-b border-[#e7dfda] flex items-center justify-between">
                <h3 className="font-bold text-[#181410]">Technicians near you</h3>
                <div className="text-xs font-medium text-[#8d715e] bg-[#f8f7f5] px-2 py-1 rounded">Brooklyn, NY</div>
              </div>
              <div className="w-full aspect-[4/3] bg-gray-200 relative">
                <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAD1051yIB2YSe-VCGZ4kTQrAYiQvTOsI4bFgjt3V4Oz96oMzJqP3hUekMFYClMhBPyT57yzlKrYOZSB1YFO6i9VMUaabe1JMBs6GuCpcid4JLQqiLX8pGf1YjCvZa9dfoTNt3t8nWLrjBp55QNy6J7gDwGfSa7Ojam1KKchM00WCVytQd-DSQVaRFWTmnXTSqwIDVlEidj1HRMME2A4xd7UdCdlH7rCfMPLgPVy0hsPutqrdSUYSt_mAqcgHeHP61_l5Pd4vafhRs")'}}></div>
                {/* Simulated Pins */}
                <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex flex-col items-center">
                    <div className="bg-[#ff6a00] text-white text-[10px] font-bold px-1.5 rounded mb-1 shadow-sm">$120</div>
                    <span className="material-symbols-outlined text-[#ff6a00] text-3xl drop-shadow-md">location_on</span>
                  </div>
                </div>
                <div className="absolute top-1/3 right-1/4">
                  <span className="material-symbols-outlined text-gray-700 text-3xl drop-shadow-md">location_on</span>
                </div>
                <div className="absolute bottom-1/3 left-1/4">
                  <span className="material-symbols-outlined text-gray-700 text-3xl drop-shadow-md">location_on</span>
                </div>
              </div>
            </div>

            {/* Trust/Vetting Info */}
            <div className="bg-[#ff6a00]/5 border border-[#ff6a00]/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[#ff6a00]">verified_user</span>
                <h3 className="font-bold text-lg text-[#181410]">Rev Verified Promise</h3>
              </div>
              <p className="text-sm text-[#8d715e] mb-4 leading-relaxed">
                Every technician on Rev goes through a rigorous 5-step vetting process to ensure your safety and quality of service.
              </p>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-3 text-sm text-[#181410]">
                  <span className="material-symbols-outlined text-green-600 text-[18px]">check_circle</span>
                  Identity Verification
                </li>
                <li className="flex items-center gap-3 text-sm text-[#181410]">
                  <span className="material-symbols-outlined text-green-600 text-[18px]">check_circle</span>
                  Skills Assessment
                </li>
                <li className="flex items-center gap-3 text-sm text-[#181410]">
                  <span className="material-symbols-outlined text-green-600 text-[18px]">check_circle</span>
                  Background Checks
                </li>
              </ul>
              <button className="mt-6 w-full text-[#ff6a00] text-sm font-bold hover:underline text-left">
                Learn more about our safety standards →
              </button>
            </div>

            {/* Support Help */}
            <div className="bg-white border border-[#e7dfda] rounded-2xl p-6 flex flex-col gap-3">
              <h3 className="font-bold text-[#181410]">Need help choosing?</h3>
              <p className="text-sm text-[#8d715e]">Our support team is available 24/7 to help you find the right match.</p>
              <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-[#e7dfda] hover:bg-[#f8f7f5] transition-colors text-sm font-bold text-[#181410]">
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Chat with Support
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}