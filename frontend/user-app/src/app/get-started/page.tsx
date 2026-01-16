"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function RoleSelection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Welcome to Rev</h1>
          <p className="text-slate-600 text-lg">Choose how you&apos;d like to continue</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/auth/signin?role=customer&signup=true">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-primary group">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-4xl text-primary group-hover:text-white">
                    smartphone
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">I Need a Repair</h2>
                <p className="text-slate-600 mb-6">
                  Get your phone fixed by verified technicians. Fast, reliable, and transparent.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                    Instant quotes
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                    Track repair status
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                    Secure payments
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold group-hover:underline">Book a Repair</span>
                  <span className="material-symbols-outlined text-primary">arrow_forward</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Technician Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/auth/signin?role=technician&signup=true">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-accent group">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                  <span className="material-symbols-outlined text-4xl text-accent group-hover:text-white">
                    engineering
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">I&apos;m a Technician</h2>
                <p className="text-slate-600 mb-6">
                  Join our network of verified technicians. Grow your business with Rev.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                    Get more customers
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                    Flexible schedule
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                    Fast payouts
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-accent font-semibold group-hover:underline">Register as Technician</span>
                  <span className="material-symbols-outlined text-accent">arrow_forward</span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-slate-600">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-primary font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
