"use client";

import { useState } from "react";

export default function TechnicianJobManagement() {
  const [activeTab, setActiveTab] = useState("active");

  const activeJobs = [
    {
      id: "REV-2045",
      device: "iPhone 13 Pro",
      issue: "Screen Replacement",
      customer: "Sarah J.",
      status: "In Progress",
      timeRemaining: "25 mins",
      location: "Downtown Area"
    },
    {
      id: "REV-2046", 
      device: "iPad Air 4",
      issue: "Battery Replacement",
      customer: "Michael B.",
      status: "En Route",
      timeRemaining: "8 mins away",
      location: "North Hills"
    }
  ];

  const completedJobs = [
    {
      id: "REV-2044",
      device: "Samsung S21",
      issue: "Battery Replacement",
      customer: "David K.",
      completedAt: "1 hour ago",
      earnings: "$65",
      rating: 5
    },
    {
      id: "REV-2043",
      device: "iPhone 11",
      issue: "Screen Repair", 
      customer: "Elena L.",
      completedAt: "3 hours ago",
      earnings: "$85",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Job Management</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Total Earnings Today: <span className="font-bold text-primary">$320</span></span>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("active")}
                className={`px-6 py-4 font-medium text-sm border-b-2 ${
                  activeTab === "active" 
                    ? "border-primary text-primary" 
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Active Jobs ({activeJobs.length})
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-6 py-4 font-medium text-sm border-b-2 ${
                  activeTab === "completed"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Completed Today ({completedJobs.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "active" ? (
              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{job.device}</h3>
                        <p className="text-gray-600">{job.issue}</p>
                        <p className="text-sm text-gray-500">Job ID: {job.id}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        job.status === "In Progress" 
                          ? "bg-orange-100 text-orange-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {job.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400">person</span>
                        <span className="text-sm">{job.customer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400">location_on</span>
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400">schedule</span>
                        <span className="text-sm font-medium text-primary">{job.timeRemaining}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                        Message Customer
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                        View Details
                      </button>
                      {job.status === "In Progress" && (
                        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">
                          Mark Complete
                        </button>
                      )}
                      {job.status === "En Route" && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                          Arrived
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {completedJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{job.device}</h3>
                        <p className="text-gray-600">{job.issue}</p>
                        <p className="text-sm text-gray-500">Job ID: {job.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{job.earnings}</p>
                        <div className="flex items-center gap-1">
                          {[...Array(job.rating)].map((_, i) => (
                            <span key={i} className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400">person</span>
                        <span className="text-sm">{job.customer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400">schedule</span>
                        <span className="text-sm">{job.completedAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-green-500">check_circle</span>
                        <span className="text-sm text-green-600 font-medium">Completed</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                        View Receipt
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                        Customer Feedback
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}