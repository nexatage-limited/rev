"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Bank {
  name: string;
  slug: string;
  code: string;
  logo: string;
}

export default function TechnicianOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedDocs, setUploadedDocs] = useState<{
    govId: File | null;
    proofOfAddress: File | null;
    backgroundCheck: File | null;
  }>({
    govId: null,
    proofOfAddress: null,
    backgroundCheck: null
  });
  const [certifications, setCertifications] = useState<File[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('https://supermx1.github.io/nigerian-banks-api/data.json')
      .then(res => res.json())
      .then(data => setBanks(data))
      .catch(err => console.error('Failed to load banks:', err));
  }, []);

  const handleFileUpload = (docType: 'govId' | 'proofOfAddress' | 'backgroundCheck', file: File) => {
    setUploadedDocs(prev => ({ ...prev, [docType]: file }));
  };

  const handleCertificationUpload = (files: FileList) => {
    setCertifications(prev => [...prev, ...Array.from(files)]);
  };

  const steps = [
    { id: 1, title: "Personal Information", icon: "person" },
    { id: 2, title: "Document Verification", icon: "verified_user" },
    { id: 3, title: "Skills & Certifications", icon: "school" },
    { id: 4, title: "Banking Details", icon: "account_balance" },
    { id: 5, title: "Review & Submit", icon: "check_circle" }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name *</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name *</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Address *</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Street address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">City *</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ZIP Code *</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="12345"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Document Verification</h2>
            <p className="text-gray-600 mb-6">Upload the following documents for identity verification:</p>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">upload</span>
                <h3 className="font-medium mb-2">Government-issued ID</h3>
                <p className="text-sm text-gray-500 mb-4">Driver&apos;s license, passport, or state ID</p>
                {uploadedDocs.govId ? (
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <span className="material-symbols-outlined">check_circle</span>
                    <span className="text-sm font-medium">{uploadedDocs.govId.name}</span>
                    <button 
                      onClick={() => setUploadedDocs(prev => ({ ...prev, govId: null }))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                ) : (
                  <label className="inline-block bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-primary/90">
                    <input 
                      type="file" 
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('govId', e.target.files[0])}
                    />
                    Choose File
                  </label>
                )}
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">upload</span>
                <h3 className="font-medium mb-2">Proof of Address</h3>
                <p className="text-sm text-gray-500 mb-4">Utility bill or bank statement (last 3 months)</p>
                {uploadedDocs.proofOfAddress ? (
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <span className="material-symbols-outlined">check_circle</span>
                    <span className="text-sm font-medium">{uploadedDocs.proofOfAddress.name}</span>
                    <button 
                      onClick={() => setUploadedDocs(prev => ({ ...prev, proofOfAddress: null }))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                ) : (
                  <label className="inline-block bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-primary/90">
                    <input 
                      type="file" 
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('proofOfAddress', e.target.files[0])}
                    />
                    Choose File
                  </label>
                )}
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">upload</span>
                <h3 className="font-medium mb-2">Background Check Authorization</h3>
                <p className="text-sm text-gray-500 mb-4">Signed consent form for background verification</p>
                {uploadedDocs.backgroundCheck ? (
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <span className="material-symbols-outlined">check_circle</span>
                    <span className="text-sm font-medium">{uploadedDocs.backgroundCheck.name}</span>
                    <button 
                      onClick={() => setUploadedDocs(prev => ({ ...prev, backgroundCheck: null }))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                ) : (
                  <label className="inline-block bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-primary/90">
                    <input 
                      type="file" 
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('backgroundCheck', e.target.files[0])}
                    />
                    Choose File
                  </label>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Skills & Certifications</h2>
            
            <div>
              <label className="block text-sm font-medium mb-3">Select your repair specialties:</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Screen Repair", "Battery Replacement", "Charging Port", 
                  "Water Damage", "Camera Repair", "Speaker/Microphone",
                  "Software Issues", "Data Recovery", "Motherboard Repair"
                ].map((skill) => (
                  <label key={skill} className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" className="text-primary focus:ring-primary" />
                    <span className="text-sm">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Years of Experience</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none">
                <option>Select experience level</option>
                <option>Less than 1 year</option>
                <option>1-2 years</option>
                <option>3-5 years</option>
                <option>5+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Certifications (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">upload</span>
                <p className="text-sm text-gray-500 mb-4">Upload any relevant certifications or training documents</p>
                <label className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-200">
                  <input 
                    type="file" 
                    accept="image/*,.pdf"
                    multiple
                    className="hidden"
                    onChange={(e) => e.target.files && handleCertificationUpload(e.target.files)}
                  />
                  Choose Files
                </label>
                {certifications.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {certifications.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <span className="material-symbols-outlined text-green-600">check_circle</span>
                        <span>{file.name}</span>
                        <button 
                          onClick={() => setCertifications(prev => prev.filter((_, i) => i !== idx))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Banking Details</h2>
            <p className="text-gray-600 mb-6">Add your bank account for receiving payments:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Bank Name *</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowBankDropdown(!showBankDropdown)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-left flex items-center justify-between bg-white"
                  >
                    {selectedBank ? (
                      <div className="flex items-center gap-2">
                        <img src={banks.find(b => b.code === selectedBank)?.logo} alt="" className="w-6 h-6 object-contain" />
                        <span>{banks.find(b => b.code === selectedBank)?.name}</span>
                      </div>
                    ) : (
                      <span className="text-gray-500">Select your bank</span>
                    )}
                    <span className="material-symbols-outlined text-gray-400">{showBankDropdown ? 'expand_less' : 'expand_more'}</span>
                  </button>
                  {showBankDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {banks.map((bank) => (
                        <button
                          key={bank.code}
                          type="button"
                          onClick={() => {
                            setSelectedBank(bank.code);
                            setShowBankDropdown(false);
                          }}
                          className="w-full px-3 py-2 hover:bg-gray-50 flex items-center gap-2 text-left"
                        >
                          <img src={bank.logo} alt="" className="w-6 h-6 object-contain" />
                          <span>{bank.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Account Holder Name *</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Full name on account"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Account Type *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none">
                  <option>Select account type</option>
                  <option>Checking</option>
                  <option>Savings</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Routing Number *</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="9-digit routing number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Account Number *</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Account number"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-blue-600">info</span>
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Secure Banking</h4>
                  <p className="text-sm text-blue-800">Your banking information is encrypted and secure. We use bank-level security to protect your data.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Review & Submit</h2>
            <p className="text-gray-600 mb-6">Please review your information before submitting your application:</p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium mb-2">Personal Information</h3>
                <p className="text-sm text-gray-600">Name, contact details, and address verified</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium mb-2">Documents</h3>
                <p className="text-sm text-gray-600">ID, proof of address, and background check authorization uploaded</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium mb-2">Skills & Experience</h3>
                <p className="text-sm text-gray-600">Repair specialties and experience level selected</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium mb-2">Banking</h3>
                <p className="text-sm text-gray-600">Bank account information provided for payments</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-yellow-600">schedule</span>
                <div>
                  <h4 className="font-medium text-yellow-900 mb-1">Application Review</h4>
                  <p className="text-sm text-yellow-800">Your application will be reviewed within 24-48 hours. You&apos;ll receive an email notification once approved.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" className="text-primary focus:ring-primary" />
              <label className="text-sm">
                I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Technician Onboarding</h1>
          <p className="text-gray-600">Complete your profile to start accepting repair jobs</p>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id 
                      ? "bg-primary border-primary text-white" 
                      : "border-gray-300 text-gray-400"
                  }`}>
                    <span className="material-symbols-outlined text-sm">{step.icon}</span>
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? "text-primary" : "text-gray-500"
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      currentStep > step.id ? "bg-primary" : "bg-gray-300"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            {renderStepContent()}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-6 py-2 border border-gray-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {currentStep < 5 ? (
                <button
                  onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                  className="px-6 py-2 bg-primary text-white rounded-lg font-medium"
                >
                  Next Step
                </button>
              ) : (
                <button 
                  onClick={() => router.push('/technician/dashboard')}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium"
                >
                  Submit Application
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}