"use client";

import Link from "next/link";

export default function TechnicianDashboard() {
  const stats = [
    { label: "Acceptance Rate", value: "92%", trend: "+2%", icon: "trending_up" },
    { label: "Jobs Completed Today", value: "4", icon: "handyman" },
    { label: "Avg Rating", value: "4.9", icon: "star" },
    { label: "Est. Earnings Today", value: "$320", icon: "attach_money" }
  ];

  const incomingJobs = [
    {
      device: "iPhone 13 Pro",
      issue: "Screen Replacement",
      location: "2.4 miles • Downtown Area",
      priority: "High Priority",
      aiInsight: "User reports ghost touch issues. Digitizer damage likely. Estimated repair time: 45m."
    },
    {
      device: "Samsung S21",
      issue: "Battery Replacement", 
      location: "5.1 miles • North Hills",
      priority: null
    },
    {
      device: "Pixel 6",
      issue: "Charging Port",
      location: "1.2 miles • Westside",
      priority: null
    }
  ];

  const navItems = [
    { label: "Dashboard", href: "/technician/dashboard", icon: "dashboard" },
    { label: "Jobs", href: "/technician/jobs", icon: "handyman" },
    { label: "Profile", href: "/technician/profile", icon: "person" },
    { label: "Documents", href: "/technician/documents", icon: "description" },
    { label: "Banking", href: "/technician/banking", icon: "account_balance" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 text-primary">
              <span className="material-symbols-outlined text-2xl">build</span>
            </div>
            <h1 className="text-xl font-bold">Rev Technician</h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
                >
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button className="px-3 py-1.5 bg-white rounded shadow-sm text-xs font-bold text-primary">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block mr-2"></span>
                Online
              </button>
              <button className="px-3 py-1.5 text-gray-500 text-xs font-bold">Offline</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold">Alex M.</p>
                <p className="text-xs text-gray-500">Lvl 3 Technician</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Good Morning, Alex</h2>
          <p className="text-gray-600">You have 3 new requests pending and 2 active jobs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg">
                  {stat.icon}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                {stat.trend && (
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
                    {stat.trend}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                Incoming
                <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">3</span>
              </h3>
              <span className="text-xs text-gray-500 animate-pulse">Auto-refreshing...</span>
            </div>
            
            <div className="space-y-4">
              {incomingJobs.map((job, i) => (
                <div key={i} className={`bg-white rounded-xl border shadow-sm overflow-hidden ${i === 0 ? 'opacity-100' : 'opacity-90'}`}>
                  {i === 0 && <div className="h-1 bg-gradient-to-r from-orange-400 to-red-500 w-3/5 animate-pulse"></div>}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold">{job.device}</h4>
                        <p className="text-sm text-gray-600">{job.issue}</p>
                      </div>
                      {job.priority && (
                        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">
                          {job.priority}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <span className="material-symbols-outlined">location_on</span>
                      <span>{job.location}</span>
                    </div>
                    {job.aiInsight && (
                      <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 mb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="material-symbols-outlined text-primary text-sm">psychology</span>
                          <span className="text-xs font-bold text-primary">AI Insight</span>
                        </div>
                        <p className="text-xs text-gray-600">{job.aiInsight}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <button className="px-4 py-2 rounded-lg border border-gray-300 font-semibold text-sm">
                        Decline
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm">
                        Accept Job
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4">Active Queue</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-xl border-l-4 border-l-primary border shadow-sm p-5">
                <div className="absolute right-0 top-0 bg-primary/10 text-primary px-3 py-1 rounded-bl-lg text-xs font-bold">
                  In Progress
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">smartphone</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">iPhone 14 Plus</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="material-symbols-outlined text-sm">person</span>
                      <span>Sarah J.</span>
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-1.5 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Issue</p>
                    <p className="text-sm font-medium">Cracked Back Glass</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Est. Time Remaining</p>
                    <p className="text-sm font-medium text-primary">~25 Mins</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-2.5 rounded-lg border border-gray-300 font-medium text-sm">
                    Message Client
                  </button>
                  <button className="flex-1 py-2.5 rounded-lg bg-primary text-white font-bold text-sm">
                    Mark as Complete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}