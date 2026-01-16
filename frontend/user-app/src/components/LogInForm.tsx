"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/lib/auth";
import { Input } from "@/components/ui/Input";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userType, setUserType] = useState<'user' | 'technician'>('user');
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await login({
        email: formData.email,
        password: formData.password,
        userType
      });
      
      if (userType === 'technician') {
        router.push('/technician/dashboard');
      } else {
        router.push('/customer/dashboard');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 lg:px-20 relative bg-[#f8f7f5]">
      <div className="w-full max-w-sm lg:max-w-md">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black tracking-[-0.033em] text-[#181410] mb-2">Welcome back</h2>
          <p className="text-gray-500">Sign in to continue</p>
        </div>

        <div className="flex border-b border-[#e7dfda] mb-8 w-full">
          <button className="flex flex-1 flex-col items-center justify-center border-b-[3px] border-[#ff6a00] pb-3 cursor-pointer group">
            <p className="text-[#181410] text-sm font-bold leading-normal tracking-[0.015em]">Log In</p>
          </button>
          <Link href="/signup" className="flex flex-1 flex-col items-center justify-center border-b-[3px] border-transparent hover:border-gray-300 pb-3 cursor-pointer group transition-colors">
            <p className="text-gray-400 text-sm font-bold leading-normal tracking-[0.015em] group-hover:text-gray-600">Sign Up</p>
          </Link>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-[#181410] mb-3">I am a:</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setUserType('user')}
              className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                userType === 'user'
                  ? 'border-[#ff6a00] bg-[#ff6a00]/5 text-[#ff6a00]'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <span className="material-symbols-outlined text-lg mb-1 block">smartphone</span>
              Device Owner
            </button>
            <button
              type="button"
              onClick={() => setUserType('technician')}
              className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                userType === 'technician'
                  ? 'border-[#ff6a00] bg-[#ff6a00]/5 text-[#ff6a00]'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <span className="material-symbols-outlined text-lg mb-1 block">build</span>
              Technician
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="name@example.com"
          />

          <Input
            label="Password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="Enter your password"
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-[#ff6a00] focus:ring-[#ff6a00]" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-[#ff6a00] hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FF6A00] text-white rounded-lg font-bold hover:bg-[#e65f00] disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-xs text-gray-400 max-w-xs mx-auto">
            By continuing, you agree to Rev&apos;s <a className="underline hover:text-[#ff6a00]" href="#">Terms of Service</a> and <a className="underline hover:text-[#ff6a00]" href="#">Privacy Policy</a>.
          </p>
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#ff6a00] hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
