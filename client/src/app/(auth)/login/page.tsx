'use client'

import Button from '@/components/Button'
import Loading from '@/components/Loading'
import Link from 'next/link'
import { useState } from 'react'

// Functional Component
export default function Login() {
  // Variables
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)

  // Function
  async function signIn(): Promise<void> {
    setLoading(true)
    try {
      const response = await fetch(
        'https://finance-api-yo3z.onrender.com/login',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      )
      const data = await response.json()
      document.cookie = 'token =' + data.token
      setLoading(false)
      window.location.href = '/dashboard'
    } catch (error) {
      alert('Invalid credential')
      return setLoading(false)
    }
  }

  // Rendering
  return (
    <main className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-neutral-700">
      {isLoading && <Loading />}
      <div className="flex max-w-[80vw] flex-col gap-10">
        <h1 className="text-3xl font-bold text-white">Finance Application</h1>
        <div>
          <div className="mb-10 flex flex-col gap-4">
            <input
              onChange={(e) => setEmail(e.currentTarget.value)}
              className="w-full rounded-md px-5 py-3"
              type="email"
              placeholder="Email"
            />
            <input
              onChange={(e) => setPassword(e.currentTarget.value)}
              className="w-full rounded-md px-5 py-3"
              type="password"
              placeholder="Password"
            />
          </div>
          <Button
            className="text-true mb-4 w-full justify-center"
            alt="Sign in"
            text="Sign in"
            onClick={() => signIn()}
          />
          <Link
            className="flex w-full justify-center text-center text-sm text-white"
            href="/register"
          >
            Dont have an account? Register here
          </Link>
        </div>
      </div>
    </main>
  )
}
