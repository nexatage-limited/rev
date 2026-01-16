"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TechnicianNav from "@/components/TechnicianNav";
import { mockTechnicianStats, mockIncomingJobs } from "@/utils/mock-data";

export default function TechnicianDashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState(mockIncomingJobs);
  const stats = mockTechnicianStats;

  const handleAccept = (index: number) => {
    alert(`Job accepted! Redirecting to active jobs...`);
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
  };

  const handleDecline = (index: number) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
  };

  const handleMessageClient = () => {
    alert("Opening message interface...");
  };

  const handleMarkComplete = () => {
    alert("Job marked as complete! Payment processed.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TechnicianNav />

      <main className="p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Good Morning, Alex</h2>
          <p className="text-gray-600">You have {jobs.length} new requests pending and 2 active jobs.</p>
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
                <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">{jobs.length}</span>
              </h3>
              <span className="text-xs text-gray-500 animate-pulse">Auto-refreshing...</span>
            </div>
            
            <div className="space-y-4">
              {jobs.map((job, i) => (
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
                      <button 
                        onClick={() => handleDecline(i)}
                        className="px-4 py-2 rounded-lg border border-gray-300 font-semibold text-sm hover:bg-gray-50"
                      >
                        Decline
                      </button>
                      <button 
                        onClick={() => handleAccept(i)}
                        className="px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90"
                      >
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
                  <button 
                    onClick={handleMessageClient}
                    className="flex-1 py-2.5 rounded-lg border border-gray-300 font-medium text-sm hover:bg-gray-50"
                  >
                    Message Client
                  </button>
                  <button 
                    onClick={handleMarkComplete}
                    className="flex-1 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90"
                  >
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