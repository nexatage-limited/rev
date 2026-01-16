'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { mockCustomerDashboard } from '@/utils/mock-data'
import Image from 'next/image'

export default function UserDashboard() {
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState(mockCustomerDashboard)

  const { user, ongoingRepairs, recentRepairs, notifications } = dashboardData

  return (
    <div className="min-h-screen bg-[#f8f7f5] text-[#181410] font-display antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="size-8 text-[#ff6a00]">
                <svg className="h-full w-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                  <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <h1 className="text-xl font-black tracking-tight text-[#181410]">Rev</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                  <span className="material-symbols-outlined text-gray-600">notifications</span>
                  <span className="absolute -top-1 -right-1 bg-[#ff6a00] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold">{user.name}</p>
                  <p className="text-xs text-gray-500">Member since {user.memberSince}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <Image alt="Profile" className="w-full h-full object-cover" src="/sarah_jenkins.png" width={40} height={40}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-[#181410] mb-2">Welcome back, {user.name.split(' ')[0]}!</h2>
          <p className="text-gray-600">Manage your device repairs and track your service history.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button 
            onClick={() => router.push('/customer/request-repair')}
            className="bg-[#ff6a00] hover:bg-orange-600 text-white p-6 rounded-xl shadow-lg shadow-orange-200 transition-all hover:-translate-y-1 text-left"
          >
            <span className="material-symbols-outlined text-3xl mb-3 block">add_circle</span>
            <h3 className="text-lg font-bold mb-1">Request New Repair</h3>
            <p className="text-sm opacity-90">Get instant quotes from verified technicians</p>
          </button>
          <button className="bg-white hover:bg-gray-50 border border-gray-200 p-6 rounded-xl transition-all hover:shadow-lg text-left">
            <span className="material-symbols-outlined text-3xl mb-3 block text-blue-600">history</span>
            <h3 className="text-lg font-bold mb-1 text-[#181410]">View History</h3>
            <p className="text-sm text-gray-600">See all your past repairs and receipts</p>
          </button>
          <button className="bg-white hover:bg-gray-50 border border-gray-200 p-6 rounded-xl transition-all hover:shadow-lg text-left">
            <span className="material-symbols-outlined text-3xl mb-3 block text-green-600">support_agent</span>
            <h3 className="text-lg font-bold mb-1 text-[#181410]">Get Support</h3>
            <p className="text-sm text-gray-600">Chat with our customer service team</p>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ongoing Repairs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-[#181410] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ff6a00]">build</span>
                  Ongoing Repairs
                </h3>
              </div>
              <div className="p-6">
                {ongoingRepairs.length > 0 ? (
                  <div className="space-y-4">
                    {ongoingRepairs.map((repair) => (
                      <div key={repair.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-[#181410]">{repair.device}</h4>
                            <p className="text-sm text-gray-600">{repair.issue}</p>
                            <p className="text-xs text-gray-500 mt-1">Repair ID: {repair.id}</p>
                          </div>
                          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">
                            {repair.status}
                          </span>
                        </div>
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{repair.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-[#ff6a00] h-2 rounded-full transition-all" style={{width: `${repair.progress}%`}}></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                              <Image alt="Technician" className="w-full h-full object-cover" src="/sarah_jenkins.png" width={24} height={24}/>
                            </div>
                            <span className="text-sm text-gray-600">{repair.technician}</span>
                          </div>
                          <span className="text-sm font-medium text-[#ff6a00]">~{repair.estimatedCompletion}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <span className="material-symbols-outlined text-4xl text-gray-300 mb-2 block">build</span>
                    <p className="text-gray-500">No ongoing repairs</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Repairs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-[#181410] flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-600">check_circle</span>
                  Recent Repairs
                </h3>
              </div>
              <div className="p-6">
                {recentRepairs.length > 0 ? (
                  <div className="space-y-4">
                    {recentRepairs.map((repair) => (
                      <div key={repair.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-[#181410]">{repair.device}</h4>
                            <p className="text-sm text-gray-600">{repair.issue}</p>
                          </div>
                          <span className="text-lg font-bold text-[#181410]">{repair.cost}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                              <Image alt="Technician" className="w-full h-full object-cover" src="/sarah_jenkins.png" width={24} height={24}/>
                            </div>
                            <span className="text-sm text-gray-600">{repair.technician}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`material-symbols-outlined text-sm ${i < repair.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}>
                                  star
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">{repair.completedDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <span className="material-symbols-outlined text-4xl text-gray-300 mb-2 block">history</span>
                    <p className="text-gray-500">No repair history yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-[#181410] flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600">notifications</span>
                  Notifications
                  {notifications.filter(n => n.unread).length > 0 && (
                    <span className="bg-[#ff6a00] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications.filter(n => n.unread).length}
                    </span>
                  )}
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className={`p-3 rounded-lg border ${notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                      <h4 className="text-sm font-bold text-[#181410]">{notification.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-sm text-[#ff6a00] font-medium hover:underline">
                  View All Notifications
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-[#181410]">Your Stats</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Repairs</span>
                  <span className="text-lg font-bold text-[#181410]">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Money Saved</span>
                  <span className="text-lg font-bold text-green-600">₦245</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg Rating Given</span>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-500 text-sm fill-current">star</span>
                    <span className="text-sm font-bold text-[#181410]">4.7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}