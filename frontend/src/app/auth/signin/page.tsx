"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/services/auth";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: ""
  });

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setError("");
      // Show success message instead
    }
  }, [searchParams]);

  const validateForm = () => {
    if (loginMethod === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        return false;
      }
    } else {
      if (!formData.phone.startsWith('+')) {
        setError("Phone number must start with + (international format)");
        return false;
      }
    }

    if (!formData.password) {
      setError("Password is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const loginData = loginMethod === 'email' 
        ? { email: formData.email, password: formData.password }
        : { phone: formData.phone, password: formData.password };

      const response = await authService.login(loginData);
      
      // Redirect based on role
      switch (response.role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'technician':
          router.push('/technician/dashboard');
          break;
        default:
          const requestedDevice = localStorage.getItem('requested_device');
          if (requestedDevice) {
            localStorage.removeItem('requested_device');
            router.push('/job-status');
          } else {
            router.push('/');
          }
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex w-1/2 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent to-orange-600 opacity-90"></div>
        <div className="relative z-10 flex flex-col justify-between p-12 w-full text-white">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-3xl">build</span>
            <span className="text-2xl font-bold">Rev</span>
          </div>
          <div className="space-y-4 max-w-md">
            <h1 className="text-4xl font-black leading-tight">
              Quality repairs, delivered at the speed of life.
            </h1>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-accent">verified_user</span>
              <p className="text-lg font-medium">Trust by Design. Vetted experts.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 lg:px-20">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-500">Repair, replace, and revive your devices.</p>
          </div>

          {searchParams.get('registered') === 'true' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">Account created successfully! Please sign in.</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 pb-3 text-sm font-bold border-b-2 ${
                loginMethod === 'email' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-400'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 pb-3 text-sm font-bold border-b-2 ${
                loginMethod === 'phone' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-400'
              }`}
            >
              Phone
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {loginMethod === 'email' ? (
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="name@example.com"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="+1234567890"
                />
                <p className="text-xs text-gray-500 mt-1">Must include country code</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => router.push('/auth/signup')}
                className="text-primary font-medium hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>

          <div className="mt-6 text-center">
            <div className="flex items-center gap-1.5 justify-center text-xs text-gray-500">
              <span className="material-symbols-outlined text-sm">lock</span>
              <span>Secure, encrypted login</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}