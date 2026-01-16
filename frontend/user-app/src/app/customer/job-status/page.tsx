'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { JobStatus } from '@/types'
import { mockJobStatus } from '@/utils/mock-data'

function JobStatusContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobId = searchParams.get('id')
  
  const [job, setJob] = useState<JobStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock job data - replace with actual API call
    const mockJob: JobStatus = {
      ...mockJobStatus,
      id: jobId || mockJobStatus.id
    }

    setTimeout(() => {
      setJob(mockJob)
      setLoading(false)
    }, 1000)
  }, [jobId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f7f5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6a00] mx-auto mb-4"></div>
          <p className="text-[#181410]">Loading job status...</p>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#f8f7f5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#181410] mb-4">Job not found</h1>
          <button 
            onClick={() => router.push('/dashboard')}
            className="bg-[#ff6a00] hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f7f5] font-display text-[#181410]">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7dfda] bg-white/90 backdrop-blur-md px-4 lg:px-10 py-3">
        <div className="flex items-center gap-4">
          <div className="size-8 text-[#ff6a00]">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_6_543)">
                <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
              </g>
              <defs>
                <clipPath id="clip0_6_543"><rect fill="white" height="48" width="48"></rect></clipPath>
              </defs>
            </svg>
          </div>
          <h2 className="text-[#181410] text-xl font-bold leading-tight tracking-[-0.015em]">Rev</h2>
        </div>
        <nav className="hidden md:flex items-center gap-9">
          <a className="text-[#181410] hover:text-[#ff6a00] text-sm font-medium leading-normal transition-colors" href="#">Home</a>
          <a className="text-[#ff6a00] text-sm font-medium leading-normal" href="#">My Repairs</a>
          <a className="text-[#181410] hover:text-[#ff6a00] text-sm font-medium leading-normal transition-colors" href="#">Support</a>
        </nav>
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <span className="material-symbols-outlined text-2xl">menu</span>
          </div>
          <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-white shadow-sm" style={{backgroundImage: 'url("/sarah_jenkins.png")'}}></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-[#ff6a00]/10 text-[#ff6a00] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Pickup In Progress</span>
                  <span className="text-[#8d715e] text-sm">Created Oct 24, 2023</span>
                </div>
                <h1 className="text-[#181410] text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Repair Status #{job.id}</h1>
                <p className="text-[#8d715e] text-base font-normal">Track your repair in real-time with verified updates.</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-[#e7dfda] rounded-lg bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-[#181410]">
                  <span className="material-symbols-outlined text-[20px]">print</span>
                  Invoice
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-[#e7dfda] rounded-lg bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-[#181410]">
                  <span className="material-symbols-outlined text-[20px]">help</span>
                  Help
                </button>
              </div>
            </div>

            {/* Hero Card */}
            <div className="rounded-xl bg-white border border-[#e7dfda] shadow-sm overflow-hidden group">
              <div className="relative h-48 sm:h-64 w-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCBKAJbdSH_I4aGzTj4MiJiwmtXOhpWkG5k3GBJZZ5j3_5zslE98qN68UyMu8ng_0VQU9EqzhqMDfn--lLlTpfZL7nYAK2bX73DPjEor6Gucn8ssaldobwELkXffqOq2j7b3l9svr8qk37hGMtldsUmzawP438Dl6_ZwIp9hdbsiL7sPaEeGqszC1IQ7Rp2q1QFMabtZegQoSE0SU6B0aWEk2PH05fdVlUTMcodA_FTDxtl-n0N_x2bP1RMe13YmCG-F1XckagWf7I")'}}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center gap-2 text-[#ff6a00] mb-1">
                    <span className="material-symbols-outlined animate-pulse fill-1">two_wheeler</span>
                    <p className="text-sm font-bold uppercase tracking-wide">Rider En Route</p>
                  </div>
                  <h2 className="text-white text-2xl font-bold mb-1">Delivery Rider is on the way</h2>
                  <p className="text-gray-200 text-sm sm:text-base">Estimated pickup: {job.technician?.estimatedArrival}</p>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-r from-[#ff6a00]/5 to-transparent">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#ff6a00]/10 rounded-full text-[#ff6a00]">
                      <span className="material-symbols-outlined">verified_user</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#181410]">Insured Pickup in Progress</p>
                      <p className="text-sm text-[#8d715e]">Your device is covered up to ₦1,000 during transport.</p>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto">
                    <div className="w-full bg-[#e7dfda] rounded-full h-2.5 mb-1 sm:w-32">
                      <div className="bg-[#ff6a00] h-2.5 rounded-full" style={{width: '35%'}}></div>
                    </div>
                    <p className="text-xs text-right text-[#8d715e]">Pickup Phase</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl border border-[#e7dfda] p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6 text-[#181410] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff6a00]">history</span>
                Repair Timeline
              </h3>
              <div className="grid grid-cols-[40px_1fr] gap-x-0 sm:gap-x-2">
                {job.timeline.map((item, index) => (
                  <div key={index} className="contents">
                    <div className="flex flex-col items-center gap-1">
                      <div className={`${item.completed ? 'text-[#ff6a00]' : item.current ? 'text-[#ff6a00] bg-[#ff6a00]/10 rounded-full p-1 -m-1' : 'text-[#8d715e]'}`}>
                        <span className={`material-symbols-outlined ${item.completed ? 'fill-1' : item.current ? 'animate-pulse' : ''}`}>
                          {item.completed ? 'check_circle' : item.current ? 'two_wheeler' : 'radio_button_unchecked'}
                        </span>
                      </div>
                      {index < job.timeline.length - 1 && (
                        <div className={`w-[2px] h-full min-h-[40px] ${item.completed ? 'bg-[#ff6a00]' : item.current ? 'bg-[#e7dfda] border-l-2 border-dashed border-[#e7dfda]' : 'bg-[#e7dfda]'}`}></div>
                      )}
                    </div>
                    <div className={`flex flex-col pb-6 pl-2 ${!item.completed && !item.current ? 'opacity-60' : ''}`}>
                      <div className="flex items-center gap-2">
                        <p className={`text-base font-bold leading-normal ${item.current ? 'text-[#ff6a00]' : 'text-[#181410]'}`}>
                          {item.step}
                        </p>
                        {item.current && (
                          <span className="bg-[#ff6a00]/20 text-[#ff6a00] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Current Step</span>
                        )}
                      </div>
                      <p className="text-[#8d715e] text-sm leading-normal mb-3">{item.timestamp}</p>
                      {item.current && (
                        <div className="bg-white border border-[#e7dfda] p-3 rounded-lg shadow-sm inline-block w-full sm:max-w-xs relative overflow-hidden">
                          <div className="absolute right-0 top-0 h-full w-1 bg-[#ff6a00]"></div>
                          <div className="flex items-center gap-3">
                            <div className="bg-[#ff6a00]/10 p-2 rounded-md text-[#ff6a00] flex items-center justify-center">
                              <span className="material-symbols-outlined text-[20px]">lock_open</span>
                            </div>
                            <div>
                              <p className="text-[10px] text-[#8d715e] font-bold uppercase tracking-wider">Delivery Code</p>
                              <p className="text-2xl font-black text-[#181410] tracking-widest font-mono">REV-4290</p>
                            </div>
                          </div>
                          <p className="text-[11px] text-[#8d715e] mt-2 border-t border-[#e7dfda] pt-2">Provide this code to the rider for verification.</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Repair Details */}
            <div className="bg-white rounded-xl border border-[#e7dfda] shadow-sm overflow-hidden">
              <div className="p-4 bg-[#f8f7f5] border-b border-[#e7dfda] flex justify-between items-center">
                <h3 className="font-bold text-[#181410]">Repair Details</h3>
                <a className="text-[#ff6a00] text-sm font-medium hover:underline" href="#">View Invoice</a>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <p className="text-[#8d715e] text-xs font-bold uppercase tracking-wide">Device Model</p>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#181410]">smartphone</span>
                    <p className="text-[#181410] text-base font-medium">{job.deviceName}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[#8d715e] text-xs font-bold uppercase tracking-wide">Issue Reported</p>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#181410]">broken_image</span>
                    <p className="text-[#181410] text-base font-medium">{job.issue}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 md:col-span-2 pt-4 border-t border-[#e7dfda]">
                  <p className="text-[#8d715e] text-xs font-bold uppercase tracking-wide">Repair Quote</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[#181410] text-xl font-bold">₦189.00 <span className="text-sm font-normal text-green-600 bg-green-100 px-2 py-0.5 rounded-full ml-2">Approved</span></p>
                    <button className="text-[#8d715e] text-sm hover:text-[#ff6a00] transition-colors">Breakdown</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
            {/* Technician Card */}
            <div className="bg-white rounded-xl border border-[#e7dfda] shadow-sm p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-8xl text-[#ff6a00]">security</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-white shadow-md" style={{backgroundImage: 'url("/sarah_jenkins.png")'}}></div>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white rounded-full p-0.5 text-white" title="Verified Pro">
                    <span className="material-symbols-outlined text-[14px] block">verified</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#8d715e] font-bold uppercase tracking-wide mb-1">Your Technician</p>
                  <h3 className="text-lg font-bold text-[#181410] leading-tight">{job.technician?.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[#ff6a00] text-[16px] fill-1">star</span>
                    <span className="text-sm font-bold text-[#181410]">{job.technician?.rating}</span>
                    <span className="text-xs text-[#8d715e]">(128 repairs)</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <div className="flex items-center gap-1 bg-[#f8f7f5] px-2 py-1 rounded text-xs text-[#8d715e]">
                  <span className="material-symbols-outlined text-[14px]">beenhere</span>
                  Rev Certified
                </div>
                <div className="flex items-center gap-1 bg-[#f8f7f5] px-2 py-1 rounded text-xs text-[#8d715e]">
                  <span className="material-symbols-outlined text-[14px]">shield</span>
                  Background Checked
                </div>
              </div>
            </div>

            {/* Messaging Card */}
            <div className="bg-white rounded-xl border border-[#e7dfda] shadow-lg flex flex-col h-[500px]">
              <div className="p-4 border-b border-[#e7dfda] bg-[#ff6a00]/5 flex justify-between items-center rounded-t-xl">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                    <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("/sarah_jenkins.png")'}}></div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#181410]">Message Sarah</p>
                    <p className="text-xs text-[#ff6a00] font-medium">Online</p>
                  </div>
                </div>
                <button className="text-[#8d715e] hover:text-[#181410] transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#f8f7f5]">
                <div className="flex flex-col items-center my-2">
                  <span className="text-xs text-[#8d715e] bg-[#e7dfda] px-2 py-1 rounded-full">Today, 10:32 AM</span>
                </div>
                <div className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-full bg-cover bg-center shrink-0" style={{backgroundImage: 'url("/sarah_jenkins.png")'}}></div>
                  <div className="flex flex-col gap-1 max-w-[85%]">
                    <div className="bg-white border border-[#e7dfda] p-3 rounded-2xl rounded-bl-none shadow-sm">
                      <p className="text-sm text-[#181410]">Hi! I&apos;ve assigned a rider for pickup. They should be there shortly.</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-end justify-end gap-2">
                  <div className="flex flex-col gap-1 max-w-[85%] items-end">
                    <div className="bg-[#ff6a00] text-white p-3 rounded-2xl rounded-br-none shadow-sm">
                      <p className="text-sm">Thanks Sarah! I see the rider details.</p>
                    </div>
                    <span className="text-[10px] text-[#8d715e]">Read 10:35 AM</span>
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-[#e7dfda] bg-white rounded-b-xl">
                <div className="flex gap-2 items-end">
                  <button className="text-[#8d715e] p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <span className="material-symbols-outlined">add_photo_alternate</span>
                  </button>
                  <div className="flex-1 bg-[#f8f7f5] rounded-xl flex items-center px-3 py-2 border border-transparent focus-within:border-[#ff6a00] transition-colors">
                    <input className="bg-transparent border-none outline-none w-full text-sm text-[#181410] placeholder-[#8d715e] focus:ring-0 p-0" placeholder="Type a message..." type="text"/>
                  </div>
                  <button className="bg-[#ff6a00] hover:bg-orange-600 text-white p-2 rounded-full transition-colors shadow-md flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px] ml-0.5">send</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex gap-3">
                <div className="text-blue-600">
                  <span className="material-symbols-outlined">support_agent</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-blue-900">Need help with your order?</h4>
                  <p className="text-xs text-blue-700 mt-1 mb-2">Our support team is available 24/7 to assist you.</p>
                  <a className="text-xs font-bold text-blue-600 hover:underline" href="#">Contact Support</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function JobStatusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f8f7f5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6a00] mx-auto mb-4"></div>
          <p className="text-[#181410]">Loading job status...</p>
        </div>
      </div>
    }>
      <JobStatusContent />
    </Suspense>
  )
}
