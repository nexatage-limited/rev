"use client";

import { useState } from "react";

export default function TechnicianProfile() {
  const [activeTab, setActiveTab] = useState("overview");

  const profileData = {
    name: "Alex Martinez",
    level: "Level 3 Technician",
    rating: 4.9,
    totalJobs: 324,
    joinDate: "March 2023",
    specialties: ["Screen Repair", "Battery", "Water Damage", "Charging Port"],
    location: "San Francisco, CA",
    responseTime: "< 15 mins",
    completionRate: "98%"
  };

  const recentReviews = [
    {
      customer: "Sarah J.",
      rating: 5,
      comment: "Alex was amazing! Fixed my iPhone screen in 20 minutes at my office. Super professional.",
      date: "2 days ago",
      job: "iPhone 13 Screen Repair"
    },
    {
      customer: "Michael B.",
      rating: 5,
      comment: "Quick and efficient service. Explained everything clearly and device works perfectly.",
      date: "1 week ago", 
      job: "Samsung S21 Battery"
    },
    {
      customer: "Elena L.",
      rating: 4,
      comment: "Good work overall, arrived on time and fixed the issue. Would recommend.",
      date: "2 weeks ago",
      job: "iPad Air Charging Port"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <h1 className="text-2xl font-bold">My Profile</h1>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="px-6 pb-6 relative">
              <div className="flex items-end justify-between -mt-16 mb-4">
                <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-md bg-gray-300 overflow-hidden">
                  <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white font-bold text-2xl">
                    AM
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-100">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Available Now
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">{profileData.name}</h2>
                <p className="text-gray-600 mb-2">{profileData.level} • {profileData.location}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                    <span className="font-bold">{profileData.rating}</span>
                    <span className="text-gray-500 text-sm">({profileData.totalJobs} reviews)</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Member since {profileData.joinDate}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{profileData.totalJobs}</p>
                  <p className="text-sm text-gray-600">Total Jobs</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{profileData.completionRate}</p>
                  <p className="text-sm text-gray-600">Completion Rate</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{profileData.responseTime}</p>
                  <p className="text-sm text-gray-600">Avg Response</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{profileData.rating}</p>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.specialties.map((specialty, i) => (
                    <span key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-6 py-4 font-medium text-sm border-b-2 ${
                    activeTab === "overview"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Reviews
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`px-6 py-4 font-medium text-sm border-b-2 ${
                    activeTab === "settings"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Settings
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "overview" ? (
                <div className="space-y-6">
                  {recentReviews.map((review, i) => (
                    <div key={i} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold">{review.customer}</h4>
                          <p className="text-sm text-gray-600">{review.job}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(review.rating)].map((_, j) => (
                              <span key={j} className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 italic bg-gray-50 p-3 rounded-lg">
                        &quot;{review.comment}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold mb-4">Profile Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Display Name</label>
                        <input 
                          type="text" 
                          defaultValue={profileData.name}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <input 
                          type="text" 
                          defaultValue={profileData.location}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Bio</label>
                        <textarea 
                          rows={3}
                          placeholder="Tell customers about your experience and expertise..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold mb-4">Availability Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Available for new jobs</span>
                        <button className="w-12 h-6 bg-primary rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Weekend availability</span>
                        <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                          <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium">
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}