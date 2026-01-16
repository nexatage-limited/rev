"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/services/auth";

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });

  useEffect(() => {
    const role = searchParams.get('role');
    const device = searchParams.get('device');
    const pathname = window.location.pathname;
    
    // Check if we're on a technician signup page
    if (pathname.includes('/technician') || role === 'technician') {
      setFormData(prev => ({ ...prev, role: 'technician' }));
    }
    
    if (device) {
      localStorage.setItem('requested_device', device);
    }
  }, [searchParams]);

  const validateForm = () => {
    // Clear any existing errors
    setError("");
    
    // Check full name
    if (!formData.full_name.trim()) {
      setError("Full name is required");
      return false;
    }
    
    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Check phone format (must start with +)
    if (!formData.phone.startsWith('+')) {
      setError("Phone number must start with + (international format)");
      return false;
    }
    
    // Check phone has enough digits
    if (formData.phone.length < 10) {
      setError("Phone number is too short");
      return false;
    }

    // Check password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    // Check password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    setLoading(true);
    try {
      console.log('Calling auth service register...');
      const response = await authService.register({
        email: formData.email,
        phone: formData.phone,
        full_name: formData.full_name,
        password: formData.password,
        role: formData.role
      });
      
      console.log('Registration successful:', response);

      if (formData.role === 'technician') {
        router.push('/technician/onboarding');
      } else {
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      console.error('Registration failed:', err);
      let errorMessage = "Registration failed";
      
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      // Handle specific backend validation errors
      if (errorMessage.includes('email')) {
        setError("Email address is already registered or invalid");
      } else if (errorMessage.includes('phone')) {
        setError("Phone number is already registered or invalid format");
      } else if (errorMessage.includes('password')) {
        setError("Password does not meet requirements");
      } else if (errorMessage.includes('server') || errorMessage.includes('connect') || errorMessage.includes('Backend')) {
        setError("⚠️ Backend server is not running. Please start the backend server first.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 lg:px-20">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            {formData.role === 'technician' ? 'Join as Technician' : 'Create Account'}
          </h2>
          <p className="text-gray-500">
            {formData.role === 'technician' 
              ? 'Start earning by fixing devices' 
              : 'Get your device repaired by experts'
            }
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="+1234567890"
            />
            <p className="text-xs text-gray-500 mt-1">Must include country code (e.g., +1 for US)</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password *</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="Minimum 6 characters"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password *</label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FF6A00] text-white rounded-lg font-bold hover:bg-[#e65f00] disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-[#FF6A00] font-medium hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            By creating an account, you agree to Rev&apos;s Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}