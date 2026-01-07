"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-white text-xl">build</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Rev</h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors duration-200" href="#how-it-works">How it Works</Link>
            <Link className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors duration-200" href="#technicians">Technicians</Link>
            <button 
              onClick={() => router.push('/auth/signin')}
              className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors duration-200"
            >
              Log In
            </button>
            <button 
              onClick={() => router.push('/auth/signup')}
              className="bg-gradient-to-r from-accent to-orange-600 hover:from-accent/90 hover:to-orange-600/90 text-white text-sm font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Book a Repair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}