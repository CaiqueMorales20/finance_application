'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

// Functional Component
export default function Login() {
  // Variables
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()


  // Function
  async function signIn() {
    try {
      const response = await fetch('http://localhost:3333/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      console.log('email', email)
      console.log('password', password)
  
      const responseData = await response.json();
      localStorage.setItem('token', responseData.token);
      document.cookie = "token =" + responseData.token
      router.push('/dashboard')
    
    } catch {
      alert('Invalid credentials')
    } 
  }

  // Rendering
  return (
    <main className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-neutral-700">
      <div className="flex flex-col gap-10">
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
          <button
            onClick={() => signIn()}
            className="w-full rounded-md bg-primary px-5 py-2 text-base font-medium text-white"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  )
}
