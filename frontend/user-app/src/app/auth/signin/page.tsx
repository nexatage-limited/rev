"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "customer",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signin logic here
    // After authentication, redirect based on role
    if (formData.role === "customer") {
      router.push("/customer/dashboard");
    } else {
      router.push("/technician/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-600 mt-2">Sign in to your Rev account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "customer" })}
                className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                  formData.role === "customer"
                    ? "border-primary bg-primary text-white"
                    : "border-slate-300 text-slate-700 hover:border-primary"
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "technician" })}
                className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                  formData.role === "technician"
                    ? "border-accent bg-accent text-white"
                    : "border-slate-300 text-slate-700 hover:border-accent"
                }`}
              >
                Technician
              </button>
            </div>
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-slate-600">Remember me</span>
            </label>
            <Link href="/auth/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
              formData.role === "customer"
                ? "bg-primary hover:bg-blue-600"
                : "bg-accent hover:bg-orange-600"
            }`}
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-600 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/get-started" className="text-primary font-semibold hover:underline">
              Get Started
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
