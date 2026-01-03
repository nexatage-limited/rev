"use client";

import { useState } from "react";
import Image from "next/image";

interface PendingReview {
  id: number;
  name: string;
  type: string;
  time: string;
  match: number | null;
  img: string;
}

export default function TechnicianManagement() {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedTech, setSelectedTech] = useState<PendingReview | null>(null);
  const [showAllPending, setShowAllPending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleReviewDocs = (tech: PendingReview) => {
    setSelectedTech(tech);
    setShowReviewModal(true);
  };

  const handleApprove = () => {
    if (!selectedTech) return;
    alert(`${selectedTech.name} has been approved!`);
    setShowReviewModal(false);
  };

  const handleReject = () => {
    if (!selectedTech) return;
    alert(`${selectedTech.name} has been rejected.`);
    setShowReviewModal(false);
  };

  const PENDING_REVIEWS = [
    { id: 1, name: "Sarah Jenkins", type: "ID Verification", time: "2h ago", match: 98, img: "8" },
    { id: 2, name: "Michael Chen", type: "Cert. Validation", time: "4h ago", match: null, img: "9" },
    { id: 3, name: "David Ross", type: "Profile Update", time: "1d ago", match: null, img: "10" },
    { id: 4, name: "Emily Parker", type: "ID Verification", time: "2d ago", match: 95, img: "11" },
    { id: 5, name: "John Martinez", type: "Cert. Validation", time: "3d ago", match: 92, img: "12" },
    { id: 6, name: "Lisa Anderson", type: "Profile Update", time: "3d ago", match: null, img: "13" },
  ];

  const displayedReviews = showAllPending ? PENDING_REVIEWS : PENDING_REVIEWS.slice(0, 3);

  const ALL_TECHNICIANS = [
    { name: "James Wilson", id: "#TE-8821", email: "james@example.com", status: "Verified", expertise: ["Screen", "Battery"], rating: 4.9, jobs: 124, location: "New York, USA" },
    { name: "Sarah Jenkins", id: "#TE-8824", email: "sarah@example.com", status: "Pending", expertise: ["Diagnostics"], rating: null, jobs: 0, location: "London, UK" },
    { name: "Michael Chen", id: "#TE-8825", email: "michael@example.com", status: "Verified", expertise: ["Screen", "Water Damage"], rating: 4.7, jobs: 89, location: "San Francisco, USA" },
    { name: "Emily Parker", id: "#TE-8826", email: "emily@example.com", status: "Active", expertise: ["Battery", "Charging Port"], rating: 4.8, jobs: 156, location: "Toronto, Canada" },
    { name: "David Ross", id: "#TE-8827", email: "david@example.com", status: "Suspended", expertise: ["Screen"], rating: 3.2, jobs: 45, location: "Sydney, Australia" },
  ];

  const filteredTechnicians = ALL_TECHNICIANS.filter(tech => {
    const matchesSearch = searchQuery === "" || 
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || tech.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <header className="flex-shrink-0 px-6 py-5 bg-white/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-200">
        <div className="flex flex-col gap-1 mb-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <a className="text-slate-500 font-medium hover:text-primary transition-colors" href="#">
              Dashboard
            </a>
            <span className="material-symbols-outlined text-[16px] text-slate-500">chevron_right</span>
            <span className="text-slate-900 font-medium">Technicians</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-slate-900 text-3xl font-black leading-tight tracking-tight">
              Technician Management & KYC
            </h1>
            <p className="text-slate-500 text-base font-normal">
              Manage profiles, approve verification requests, and monitor performance.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-900 hover:bg-slate-50 transition-all">
              <span className="material-symbols-outlined text-[20px]">file_download</span>
              Export Data
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary rounded-lg text-sm font-medium text-white hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Invite Technician
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-6">
          <div className="flex flex-col gap-1 rounded-xl p-5 bg-white border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 text-sm font-medium">Pending Reviews</p>
              <span className="material-symbols-outlined text-orange-500 bg-orange-50 p-1 rounded-md text-[20px]">
                pending_actions
              </span>
            </div>
            <div className="flex items-end gap-2 mt-2">
              <p className="text-slate-900 text-2xl font-bold leading-none">12</p>
              <p className="text-orange-600 text-xs font-medium bg-orange-50 px-1.5 py-0.5 rounded">+2 new</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 rounded-xl p-5 bg-white border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 text-sm font-medium">Active Technicians</p>
              <span className="material-symbols-outlined text-primary bg-blue-50 p-1 rounded-md text-[20px]">
                engineering
              </span>
            </div>
            <div className="flex items-end gap-2 mt-2">
              <p className="text-slate-900 text-2xl font-bold leading-none">843</p>
              <p className="text-emerald-600 text-xs font-medium bg-emerald-50 px-1.5 py-0.5 rounded">+5%</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 rounded-xl p-5 bg-white border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 text-sm font-medium">Avg Rating</p>
              <span className="material-symbols-outlined text-yellow-500 bg-yellow-50 p-1 rounded-md text-[20px]">
                star
              </span>
            </div>
            <div className="flex items-end gap-2 mt-2">
              <p className="text-slate-900 text-2xl font-bold leading-none">4.8</p>
              <span className="text-slate-400 text-xs">/ 5.0</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 rounded-xl p-5 bg-white border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 text-sm font-medium">Onboarded This Week</p>
              <span className="material-symbols-outlined text-purple-500 bg-purple-50 p-1 rounded-md text-[20px]">
                person_add
              </span>
            </div>
            <div className="flex items-end gap-2 mt-2">
              <p className="text-slate-900 text-2xl font-bold leading-none">24</p>
              <p className="text-emerald-600 text-xs font-medium bg-emerald-50 px-1.5 py-0.5 rounded">+12%</p>
            </div>
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              Needs Attention
              <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">3 Urgent</span>
            </h2>
            <button onClick={() => setShowAllPending(!showAllPending)} className="text-sm text-primary font-medium hover:underline">
              {showAllPending ? 'Show less' : 'View all pending'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {displayedReviews.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border-l-4 border-l-orange-500 border-y border-r border-slate-200 p-4 shadow-sm flex flex-col gap-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src={`https://picsum.photos/seed/${item.img}/40`}
                      width={40}
                      height={40}
                      className="rounded-full"
                      alt={item.name}
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.type}</p>
                    </div>
                  </div>
                  {item.match && (
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">smart_toy</span> {item.match}% Match
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">schedule</span> Submitted {item.time}
                </div>
                <button
                  onClick={() => handleReviewDocs(item)}
                  className="mt-2 w-full py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold rounded-lg transition-colors"
                >
                  Review Docs
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex p-1 bg-slate-100 rounded-lg w-full md:w-auto">
              <button onClick={() => setStatusFilter("All")} className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all ${statusFilter === "All" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-900"}`}>
                All
              </button>
              <button onClick={() => setStatusFilter("Active")} className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all ${statusFilter === "Active" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-900"}`}>
                Active
              </button>
              <button onClick={() => setStatusFilter("Pending")} className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all ${statusFilter === "Pending" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-900"}`}>
                Pending
              </button>
              <button onClick={() => setStatusFilter("Suspended")} className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all ${statusFilter === "Suspended" ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-900"}`}>
                Suspended
              </button>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <div className="relative flex-1 md:w-64">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 text-[20px]">
                  search
                </span>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-primary/50"
                  placeholder="Search by name, ID or email..."
                  type="text"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Technician
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Expertise
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</th>
                  <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTechnicians.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                      <p className="text-slate-500 text-sm">No technicians found</p>
                    </td>
                  </tr>
                ) : (
                  filteredTechnicians.map((tech, i) => (
                  <tr key={i} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full bg-slate-200 bg-cover bg-center border border-slate-100"></div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-900">{tech.name}</span>
                          <span className="text-xs text-slate-500">ID: {tech.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          tech.status === "Verified"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        <span className={`size-1.5 rounded-full ${tech.status === "Verified" ? "bg-emerald-500" : "bg-orange-500 animate-pulse"}`}></span>
                        {tech.status === "Verified" ? "Verified" : "Pending Review"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-1 flex-wrap">
                        {tech.expertise.map((exp, j) => (
                          <span key={j} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {tech.rating ? (
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-yellow-500 fill-1">star</span>
                          <span className="text-sm font-medium text-slate-900">{tech.rating}</span>
                          <span className="text-xs text-slate-500">({tech.jobs} jobs)</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">No ratings yet</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-sm text-slate-600">{tech.location}</div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {tech.status === "Pending" ? (
                        <button className="bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
                          Review
                        </button>
                      ) : (
                        <button className="text-slate-400 hover:text-primary transition-colors p-1 rounded-md hover:bg-slate-100">
                          <span className="material-symbols-outlined text-[20px]">more_vert</span>
                        </button>
                      )}
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-900">1</span> to{" "}
              <span className="font-semibold text-slate-900">5</span> of{" "}
              <span className="font-semibold text-slate-900">855</span> technicians
            </p>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button className="px-3 py-1 text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-900 hover:bg-slate-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedTech && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Review KYC Documents</h2>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <Image
                  src={`https://picsum.photos/seed/${selectedTech.img}/80`}
                  width={64}
                  height={64}
                  className="rounded-full"
                  alt={selectedTech.name}
                />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedTech.name}</h3>
                  <p className="text-sm text-slate-500">{selectedTech.type}</p>
                  {selectedTech.match && (
                    <span className="inline-flex items-center gap-1 mt-1 bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      <span className="material-symbols-outlined text-[12px]">smart_toy</span> {selectedTech.match}% AI Match
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">Submitted Documents</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-slate-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary">badge</span>
                        <span className="text-sm font-medium">Government ID</span>
                      </div>
                      <p className="text-xs text-slate-500">ID_verification.pdf</p>
                    </div>
                    <div className="border border-slate-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary">workspace_premium</span>
                        <span className="text-sm font-medium">Certification</span>
                      </div>
                      <p className="text-xs text-slate-500">cert_document.pdf</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">Admin Notes</h4>
                  <textarea
                    className="w-full rounded-lg bg-slate-50 border border-slate-200 text-sm p-3 h-24 resize-none focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="Add notes about this review..."
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex gap-3">
              <button
                onClick={handleReject}
                className="flex-1 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={handleApprove}
                className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Approve & Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
