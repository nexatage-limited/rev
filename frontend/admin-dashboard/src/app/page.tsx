"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllActivities, setShowAllActivities] = useState(false);

  const allActivities = [
    {
      icon: "check_circle",
      color: "emerald",
      title: "Repair #2045 marked complete",
      subtitle: "Technician: Sarah Jenkins • iPhone 13 Screen",
      time: "2m ago",
    },
    {
      icon: "verified",
      color: "primary",
      title: "Tech John D. verified",
      subtitle: "Documents approved automatically by AI",
      time: "15m ago",
    },
    {
      icon: "warning",
      color: "accent",
      title: "New Dispute Opened",
      subtitle: "Order #9921 • Device not powering on",
      time: "1h ago",
    },
    {
      icon: "person_add",
      color: "slate",
      title: "New User Registration",
      subtitle: "Mike Ross joined the platform",
      time: "2h ago",
    },
    {
      icon: "check_circle",
      color: "emerald",
      title: "Repair #2044 marked complete",
      subtitle: "Technician: David Kim • Samsung S21 Battery",
      time: "3h ago",
    },
    {
      icon: "local_shipping",
      color: "primary",
      title: "Delivery completed",
      subtitle: "Order #9920 delivered by Rider Mike T.",
      time: "4h ago",
    },
    {
      icon: "person_add",
      color: "slate",
      title: "New Technician Application",
      subtitle: "Elena Lopez submitted KYC documents",
      time: "5h ago",
    },
    {
      icon: "warning",
      color: "accent",
      title: "Payment Issue Resolved",
      subtitle: "Order #9919 • Refund processed",
      time: "6h ago",
    },
  ];

  const displayedActivities = showAllActivities ? allActivities : allActivities.slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to orders page with search query
      window.location.href = `/orders?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <h2 className="text-slate-800 text-lg font-bold tracking-tight">Dashboard Overview</h2>
        </div>
        <div className="flex items-center gap-6">
          <form onSubmit={handleSearch} className="hidden md:flex items-center bg-slate-100 rounded-xl px-3 py-2 border border-slate-200 w-64">
            <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
            <input
              className="bg-transparent border-none text-sm text-slate-700 placeholder-slate-400 focus:ring-0 w-full ml-2 h-5 p-0 outline-none"
              placeholder="Search orders, users..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div className="flex items-center gap-3">
            <button className="relative flex items-center justify-center size-10 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-accent rounded-full border border-white"></span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "group", label: "Active Users", value: "12,450", trend: "+5% this week", color: "primary" },
              { icon: "verified", label: "Verified Technicians", value: "485", trend: "+2% this week", color: "primary" },
              { icon: "build_circle", label: "Ongoing Repairs", value: "124", trend: "Requires Monitoring", color: "accent", highlight: true },
              { icon: "local_shipping", label: "Total Deliveries", value: "3,892", trend: "+8% this week", color: "primary" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`flex flex-col gap-2 rounded-xl p-5 bg-white border shadow-sm ${
                  stat.highlight ? "border-accent/40 ring-1 ring-accent/10" : "border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                  <span className={`material-symbols-outlined text-${stat.color} bg-${stat.color}/10 p-1.5 rounded-lg text-[20px]`}>
                    {stat.icon}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-slate-900 text-3xl font-bold tracking-tight">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className={`material-symbols-outlined text-${stat.highlight ? "accent" : "emerald-500"} text-[16px]`}>
                      {stat.highlight ? "priority_high" : "trending_up"}
                    </span>
                    <p className={`text-${stat.highlight ? "accent" : "emerald-500"} text-sm font-medium`}>{stat.trend}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-slate-900 text-lg font-bold">Platform Activity</h3>
                  <p className="text-slate-500 text-sm">Revenue & Transactions over last 30 days</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-900 text-2xl font-bold">$145,200</span>
                  <span className="text-emerald-500 text-sm font-medium flex items-center">
                    <span className="material-symbols-outlined text-[16px]">arrow_upward</span> 12.5%
                  </span>
                </div>
              </div>
              <div className="h-[250px] w-full">
                <svg className="w-full h-full text-primary" fill="none" preserveAspectRatio="none" viewBox="0 0 800 250" xmlns="http://www.w3.org/2000/svg">
                  <line stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="200" y2="200" />
                  <line stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="150" y2="150" />
                  <line stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="100" y2="100" />
                  <line stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="800" y1="50" y2="50" />
                  <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#0d7ff2" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#0d7ff2" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 200 C 50 200, 100 120, 150 140 C 200 160, 250 80, 300 90 C 350 100, 400 60, 450 70 C 500 80, 550 130, 600 110 C 650 90, 700 40, 750 50 L 800 60 L 800 250 L 0 250 Z" fill="url(#chartGradient)" />
                  <path d="M0 200 C 50 200, 100 120, 150 140 C 200 160, 250 80, 300 90 C 350 100, 400 60, 450 70 C 500 80, 550 130, 600 110 C 650 90, 700 40, 750 50 L 800 60" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
                </svg>
              </div>
              <div className="flex justify-between mt-4 text-xs text-slate-400 font-medium px-2">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col h-full shadow-sm">
              <h3 className="text-slate-900 text-lg font-bold mb-1">Repair Status</h3>
              <p className="text-slate-500 text-sm mb-6">Breakdown of 124 active jobs</p>
              <div className="flex-1 flex flex-col justify-center space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-700 font-medium">In-Progress</span>
                    <span className="text-accent font-bold">58%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: "58%" }}></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">72 repairs currently on bench</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-700 font-medium">Pending Pickup</span>
                    <span className="text-slate-600 font-bold">25%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-500 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">31 devices waiting for courier</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-700 font-medium">Completed (Last 24h)</span>
                    <span className="text-primary font-bold">17%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "17%" }}></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">21 repairs ready for delivery</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-slate-900 text-lg font-bold">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "verified", label: "Verify Technician", color: "primary", href: "/technicians" },
                  { icon: "gavel", label: "Resolve Dispute", color: "accent", href: "/disputes" },
                  { icon: "local_shipping", label: "Assign Delivery", color: "slate", href: "/deliveries" },
                  { icon: "person_add", label: "Invite Admin", color: "slate", href: "/users" },
                ].map((action, i) => (
                  <Link key={i} href={action.href}>
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-all group shadow-sm"
                    >
                      <div className={`bg-${action.color === "slate" ? "slate-100" : `${action.color}/10`} text-${action.color === "slate" ? "slate-700" : action.color} p-3 rounded-full group-hover:scale-110 transition-transform ${action.color === "slate" ? "border border-slate-200" : ""}`}>
                        <span className="material-symbols-outlined">{action.icon}</span>
                      </div>
                      <span className="text-slate-700 font-medium text-sm">{action.label}</span>
                    </motion.button>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-slate-900 text-lg font-bold">Recent Activity</h3>
                <button
                  onClick={() => setShowAllActivities(!showAllActivities)}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  {showAllActivities ? "Show Less" : "View All"}
                </button>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                {displayedActivities.map((activity, i) => (
                  <div
                    key={i}
                    className="p-4 border-b border-slate-100 last:border-b-0 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div
                      className={`size-10 rounded-full bg-${activity.color}-500/20 text-${activity.color}-500 flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{activity.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-900 text-sm font-medium truncate">{activity.title}</p>
                      <p className="text-slate-500 text-xs">{activity.subtitle}</p>
                    </div>
                    <span className="text-slate-400 text-xs whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
