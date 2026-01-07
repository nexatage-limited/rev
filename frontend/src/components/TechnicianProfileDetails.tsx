"use client";

import { TechnicianProfileDetailsProps } from "@/types";

import Image from "next/image";

export default function TechnicianProfileDetails({ 
  technician = {
    id: "tech-001",
    name: "Alex Martinez",
    level: "Level 3 Technician", 
    rating: 4.9,
    totalJobs: 324,
    specialties: ["Screen Repair", "Battery", "Water Damage", "Charging Port"],
    location: "San Francisco, CA",
    responseTime: "< 15 mins",
    completionRate: "98%",
    joinDate: "March 2023",
    bio: "Experienced mobile device technician with over 5 years in the field. Specialized in complex repairs and customer service excellence.",
    certifications: ["Apple Certified", "Samsung Certified", "CompTIA A+"],
    availability: {
      status: "available"
    }
  },
  onContact,
  onBook
}: TechnicianProfileDetailsProps) {

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "text-green-600 bg-green-100";
      case "busy": return "text-yellow-600 bg-yellow-100";
      case "offline": return "text-gray-600 bg-gray-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available": return "Available Now";
      case "busy": return "Currently Busy";
      case "offline": return "Offline";
      default: return "Unknown";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-md mx-auto">
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="px-6 pb-6 relative">
        <div className="flex items-end justify-between -mt-16 mb-4">
          <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-md bg-gray-300 overflow-hidden">
            {technician.avatar ? (
              <Image src={technician.avatar} alt={technician.name} width={96} height={96} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white font-bold text-2xl">
                {technician.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(technician.availability.status)}`}>
            <span className="w-2 h-2 rounded-full bg-current"></span>
            {getStatusText(technician.availability.status)}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">{technician.name}</h2>
          <p className="text-gray-600 mb-2">{technician.level} • {technician.location}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
              <span className="font-bold">{technician.rating}</span>
              <span className="text-gray-500 text-sm">({technician.totalJobs} reviews)</span>
            </div>
          </div>
        </div>

        {technician.bio && (
          <div className="mb-6">
            <p className="text-gray-700 text-sm leading-relaxed">{technician.bio}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-primary">{technician.totalJobs}</p>
            <p className="text-xs text-gray-600">Jobs</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-primary">{technician.completionRate}</p>
            <p className="text-xs text-gray-600">Success</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-bold text-primary">{technician.responseTime}</p>
            <p className="text-xs text-gray-600">Response</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold mb-3 text-sm">Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {technician.specialties.map((specialty, i) => (
              <span key={i} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {technician.certifications && technician.certifications.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold mb-3 text-sm">Certifications</h3>
            <div className="space-y-2">
              {technician.certifications.map((cert, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-500 text-sm">verified</span>
                  <span className="text-sm text-gray-700">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {onBook && (
            <button 
              onClick={onBook}
              className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors"
            >
              Book {technician.name}
            </button>
          )}
          {onContact && (
            <button 
              onClick={onContact}
              className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Contact Technician
            </button>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Member since {technician.joinDate}</span>
            <span>ID: {technician.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}