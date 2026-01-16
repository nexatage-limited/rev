'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function SignupContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get('role')

  useEffect(() => {
    if (role) {
      router.push(`/auth/signin?role=${role}`)
    } else {
      router.push('/get-started')
    }
  }, [role, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6a00]"></div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6a00]"></div>
      </div>
    }>
      <SignupContent />
    </Suspense>
  )
}
