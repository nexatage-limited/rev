import { Suspense } from "react";
import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
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

      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
        <SignUpForm />
      </Suspense>
    </div>
  );
}