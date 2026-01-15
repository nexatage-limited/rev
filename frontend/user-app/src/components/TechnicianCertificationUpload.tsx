"use client";

import { useState } from "react";
import { Certification, CertificationUploadProps } from "@/types";

export default function TechnicianCertificationUpload({ 
  onUpload, 
  onDelete,
  existingCertifications = [
    {
      id: "cert-1",
      name: "Apple Certified Mac Technician",
      issuer: "Apple Inc.",
      issueDate: "2023-03-15",
      expiryDate: "2025-03-15",
      status: "verified"
    },
    {
      id: "cert-2", 
      name: "Samsung Mobile Device Certification",
      issuer: "Samsung Electronics",
      issueDate: "2023-06-20",
      expiryDate: "2024-06-20",
      status: "pending"
    },
    {
      id: "cert-3",
      name: "CompTIA A+ Certification",
      issuer: "CompTIA",
      issueDate: "2022-01-10",
      status: "verified"
    }
  ]
}: CertificationUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [certifications, setCertifications] = useState<Certification[]>(existingCertifications);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (onUpload) {
      onUpload(files);
    }
    // Add to local state for demo
    Array.from(files).forEach((file, index) => {
      const newCert: Certification = {
        id: `cert-new-${Date.now()}-${index}`,
        name: file.name.replace(/\.[^/.]+$/, ""),
        issuer: "Pending Verification",
        issueDate: new Date().toISOString().split('T')[0],
        status: "pending"
      };
      setCertifications(prev => [...prev, newCert]);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "text-green-700 bg-green-100 border-green-200";
      case "pending": return "text-yellow-700 bg-yellow-100 border-yellow-200";
      case "expired": return "text-red-700 bg-red-100 border-red-200";
      case "rejected": return "text-red-700 bg-red-100 border-red-200";
      default: return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return "verified";
      case "pending": return "schedule";
      case "expired": return "error";
      case "rejected": return "cancel";
      default: return "help";
    }
  };

  const deleteCertification = (certId: string) => {
    setCertifications(prev => prev.filter(cert => cert.id !== certId));
    if (onDelete) {
      onDelete(certId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Certifications & Documents</h2>
          <p className="text-gray-600">Upload and manage your professional certifications</p>
        </div>
        <span className="text-sm text-gray-500">
          {certifications.filter(c => c.status === "verified").length} verified
        </span>
      </div>

      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive 
            ? "border-primary bg-primary/5" 
            : "border-gray-300 hover:border-primary hover:bg-gray-50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-gray-400">upload</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Upload Certifications</h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your certification files here, or click to browse
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="hidden"
              id="cert-upload"
            />
            <label
              htmlFor="cert-upload"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-primary/90 transition-colors"
            >
              <span className="material-symbols-outlined">add</span>
              Choose Files
            </label>
          </div>
          <p className="text-xs text-gray-500">
            Supported formats: PDF, JPG, PNG (Max 10MB per file)
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold">Your Certifications</h3>
        
        {certifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <span className="material-symbols-outlined text-4xl mb-2 block">description</span>
            <p>No certifications uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-blue-600">school</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-1">{cert.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">Issued by {cert.issuer}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                        {cert.expiryDate && (
                          <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(cert.status)}`}>
                      <span className="material-symbols-outlined text-xs">{getStatusIcon(cert.status)}</span>
                      {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                    </span>
                    <div className="flex items-center gap-1">
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                        <span className="material-symbols-outlined text-sm">visibility</span>
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                        <span className="material-symbols-outlined text-sm">download</span>
                      </button>
                      <button 
                        onClick={() => deleteCertification(cert.id)}
                        className="p-1 text-gray-400 hover:text-red-600 rounded"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-blue-600">info</span>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Certification Guidelines</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Upload clear, high-quality images or PDFs of your certifications</li>
              <li>• Ensure all text is readable and the document is complete</li>
              <li>• Verification typically takes 24-48 hours</li>
              <li>• Keep your certifications up to date to maintain your technician level</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}