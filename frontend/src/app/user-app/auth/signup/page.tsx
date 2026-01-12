"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get("role") || "customer";
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const isCustomer = role === "customer";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    if (isCustomer) {
      router.push("/user-app/customer/dashboard");
    } else {
      router.push("/user-app/technician/onboarding");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className={`w-16 h-16 ${isCustomer ? 'bg-blue-100' : 'bg-orange-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <span className={`material-symbols-outlined text-3xl ${isCustomer ? 'text-primary' : 'text-accent'}`}>
              {isCustomer ? 'smartphone' : 'engineering'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isCustomer ? 'Create Customer Account' : 'Register as Technician'}
          </h1>
          <p className="text-slate-600 mt-2">
            {isCustomer ? 'Get your phone repaired today' : 'Join our network of verified technicians'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
            <input
              type="tel"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="+234 800 000 0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold text-white ${
              isCustomer ? 'bg-primary hover:bg-blue-600' : 'bg-accent hover:bg-orange-600'
            } transition-colors`}
          >
            {isCustomer ? 'Create Account' : 'Continue to Verification'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-600 text-sm">
            Already have an account?{" "}
            <Link href="/user-app/auth/signin" className="text-primary font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link href="/user-app/get-started" className="text-slate-500 text-sm hover:underline">
            ← Back to role selection
          </Link>
        </div>
      </div>
    </div>
  );
}
