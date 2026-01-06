"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { technicianService, DocumentResponse } from "@/services/technician";

const DOCUMENT_TYPES = [
  { value: "id", label: "Government ID" },
  { value: "license", label: "Business License" },
  { value: "certification", label: "Technical Certification" },
  { value: "insurance", label: "Insurance Certificate" }
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const docs = await technicianService.getMyDocuments();
      setDocuments(docs);
    } catch (err) {
      setError("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setSelectedFile(file);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedType) {
      setError("Please select a document type and file");
      return;
    }

    setUploading(true);
    setError("");

    try {
      await technicianService.uploadDocument(selectedType, selectedFile);
      setSelectedFile(null);
      setSelectedType("");
      await loadDocuments();
    } catch (err) {
      setError("Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return { icon: 'picture_as_pdf', color: 'text-red-500', bg: 'bg-red-50' };
    if (['jpg', 'jpeg', 'png'].includes(ext || '')) return { icon: 'image', color: 'text-primary', bg: 'bg-primary/10' };
    return { icon: 'description', color: 'text-gray-500', bg: 'bg-gray-50' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-gray-50">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-10 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="size-8 text-primary">
            <span className="material-symbols-outlined text-2xl">build</span>
          </div>
          <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-[-0.015em]">Rev</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="hidden md:flex items-center gap-9">
            <a className="text-gray-900 text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Support</a>
          </div>
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-gray-200 bg-gray-300"></div>
        </div>
      </header>

      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col max-w-[1024px] flex-1">
            <div className="flex flex-col gap-3 pb-8">
              <div className="flex gap-6 justify-between items-end">
                <p className="text-gray-900 text-base font-medium leading-normal">Step 3 of 5</p>
                <p className="text-gray-500 text-sm font-normal leading-normal">Technician Onboarding</p>
              </div>
              <div className="rounded-full bg-gray-200 overflow-hidden">
                <div className="h-2 rounded-full bg-primary transition-all duration-500 ease-out" style={{width: '60%'}}></div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-900 text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                    Verify Your Expertise
                  </h1>
                  <p className="text-gray-500 text-base font-normal leading-normal">
                    Upload your certifications and licenses. Verified technicians earn 20% more on Rev and get priority access to jobs.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg w-fit text-xs font-medium border border-primary/20">
                    <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                    AI-Powered: We&apos;ll auto-detect certificate details for faster approval.
                  </div>

                  <div className="group relative flex flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed border-gray-300 bg-white px-6 py-14 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                    <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                      <span className="material-symbols-outlined text-[32px]">cloud_upload</span>
                    </div>
                    <div className="flex max-w-[480px] flex-col items-center gap-2">
                      <p className="text-gray-900 text-lg font-bold leading-tight tracking-[-0.015em] text-center">
                        Drag & Drop certifications here
                      </p>
                      <p className="text-gray-500 text-sm font-normal leading-normal text-center">
                        or <span className="text-primary underline decoration-primary/30 underline-offset-4">browse files</span> from your computer
                      </p>
                    </div>
                    <div className="text-gray-400 text-xs font-medium text-center bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                      Supported: PDF, JPEG, PNG (Max 5MB)
                    </div>
                    <input 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      multiple 
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileSelect}
                    />
                  </div>
                </div>

                {documents.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Attached Documents</h3>
                    <div className="flex flex-col gap-2">
                      {documents.map((doc) => {
                        const fileInfo = getFileIcon(doc.file_name);
                        return (
                          <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-white shadow-sm">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className={`size-10 rounded-lg ${fileInfo.bg} flex items-center justify-center ${fileInfo.color} shrink-0`}>
                                <span className="material-symbols-outlined">{fileInfo.icon}</span>
                              </div>
                              <div className="flex flex-col min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{doc.file_name}</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500">Uploaded {new Date(doc.uploaded_at).toLocaleDateString()}</span>
                                  <span className="size-1 rounded-full bg-gray-300"></span>
                                  <span className="text-xs text-green-600 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                    Verified
                                  </span>
                                </div>
                              </div>
                            </div>
                            <a
                              href={doc.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-primary/10"
                            >
                              <span className="material-symbols-outlined">visibility</span>
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 mt-2 p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <span className="material-symbols-outlined text-gray-600 mt-0.5">lock</span>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-gray-900">Your documents are secure</p>
                    <p className="text-sm text-gray-600">We use bank-level 256-bit encryption to store your sensitive documents. They are only shared with the verification team.</p>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">
                  <h2 className="text-gray-900 text-xl font-bold leading-tight mb-6">Why verify?</h2>
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-4">
                      <div className="size-10 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-yellow-600">verified</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-gray-900 text-sm font-bold">Trusted Pro Badge</h3>
                        <p className="text-gray-500 text-sm leading-normal">Stand out in search results with a verified badge next to your name.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="size-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-green-600">attach_money</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-gray-900 text-sm font-bold">Premium Requests</h3>
                        <p className="text-gray-500 text-sm leading-normal">Access higher-paying repair jobs reserved for verified experts.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary">handshake</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-gray-900 text-sm font-bold">Customer Trust</h3>
                        <p className="text-gray-500 text-sm leading-normal">Clients choose verified technicians 3x more often.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-8 mt-4 border-t border-gray-200">
              <Link href="/technician/onboarding">
                <button className="flex items-center justify-center px-6 h-12 rounded-lg text-gray-500 text-base font-bold hover:bg-gray-100 transition-colors">
                  Back
                </button>
              </Link>
              <button 
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="flex items-center justify-center px-8 h-12 rounded-lg bg-primary text-white text-base font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Save & Continue'}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}