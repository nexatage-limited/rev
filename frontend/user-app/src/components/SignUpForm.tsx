"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { register } from "@/lib/auth";
import { Input } from "@/components/ui/Input";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await register({
        email: formData.email,
        phone: formData.phone,
        full_name: formData.full_name,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role
      });

      if (formData.role === 'technician') {
        router.push('/technician/onboarding');
      } else {
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed');
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
          <Input
            label="Full Name *"
            type="text"
            required
            value={formData.full_name}
            onChange={(e) => setFormData({...formData, full_name: e.target.value})}
            placeholder="Enter your full name"
          />

          <Input
            label="Email Address *"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="name@example.com"
          />

          <div>
            <Input
              label="Phone Number *"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+1234567890"
            />
            <p className="text-xs text-gray-500 mt-1">Must include country code (e.g., +1 for US)</p>
          </div>

          <Input
            label="Password *"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="Minimum 6 characters"
          />

          <Input
            label="Confirm Password *"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            placeholder="Confirm your password"
          />

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