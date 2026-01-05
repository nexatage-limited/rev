"use client";

import { useState, useEffect } from "react";
import { jobService, JobResponse } from "@/services/jobs";

export default function JobStatusTracker() {
  const [jobId, setJobId] = useState("REV-2045");
  const [job, setJob] = useState<JobResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const jobSteps = [
    { id: 1, title: "Order Confirmed", status: "completed", time: "2:30 PM" },
    { id: 2, title: "Technician Assigned", status: "completed", time: "2:45 PM" },
    { id: 3, title: "Diagnostic Complete", status: "completed", time: "3:15 PM" },
    { id: 4, title: "Repair in Progress", status: "active", time: "3:30 PM" },
    { id: 5, title: "Quality Check", status: "pending", time: "Est. 4:15 PM" },
    { id: 6, title: "Ready for Pickup", status: "pending", time: "Est. 4:30 PM" }
  ];

  useEffect(() => {
    const fetchJob = async () => {
      if (jobId) {
        setLoading(true);
        try {
          const jobData = await jobService.getJobById(parseInt(jobId.replace('REV-', '')));
          setJob(jobData);
        } catch (error) {
          console.error('Error fetching job:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchJob();
  }, [jobId]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-primary p-6 text-white">
          <h1 className="text-xl font-bold">Track Your Repair</h1>
          <p className="text-primary-light opacity-90">Job ID: {jobId}</p>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading job details...</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="font-bold text-lg mb-2">
                  {job?.device_name || "iPhone 13 Pro"} - Screen Replacement
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="material-symbols-outlined text-lg">person</span>
                  <span>Technician: Sarah Jenkins</span>
                </div>
              </div>

              <div className="space-y-4">
                {jobSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.status === 'completed' ? 'bg-green-500 text-white' :
                        step.status === 'active' ? 'bg-primary text-white animate-pulse' :
                        'bg-gray-200 text-gray-400'
                      }`}>
                        {step.status === 'completed' ? (
                          <span className="material-symbols-outlined text-sm">check</span>
                        ) : (
                          <span className="text-sm font-bold">{step.id}</span>
                        )}
                      </div>
                      {index < jobSteps.length - 1 && (
                        <div className={`w-0.5 h-8 mt-2 ${
                          step.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className={`font-medium ${
                        step.status === 'active' ? 'text-primary' : 
                        step.status === 'completed' ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-primary">info</span>
                  <span className="font-medium text-sm">Estimated Completion</span>
                </div>
                <p className="text-sm text-gray-600">Your device will be ready in approximately 45 minutes.</p>
              </div>

              <button className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-medium">
                Contact Technician
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}