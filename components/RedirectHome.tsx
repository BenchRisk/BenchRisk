'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from '@/components/Link'

export default function RedirectHome() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/')
  }, [router])
  return (
    <div className="pb-8 pt-8">
      <p>
        Redirecting to the <Link href="/">home page</Link>.
      </p>
    </div>
  )
}
