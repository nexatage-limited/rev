"use client";

export default function TechnicianOnboarding() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Complete Your Profile</h1>
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <p className="text-slate-600 mb-4">Welcome! Let&apos;s get you verified and ready to accept jobs.</p>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-slate-900">Step 1: Upload Documents</h3>
              <p className="text-sm text-slate-600">ID, certifications, and proof of address</p>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg">
              <h3 className="font-semibold text-slate-700">Step 2: Bank Details</h3>
              <p className="text-sm text-slate-600">For receiving payments</p>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg">
              <h3 className="font-semibold text-slate-700">Step 3: Verification</h3>
              <p className="text-sm text-slate-600">AI-powered document verification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
