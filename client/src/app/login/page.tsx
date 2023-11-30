// Client Side
'use client'

import { useRouter } from "next/navigation";

// Functional Component
export default function Login() {
  // Variables
  const data = {
    "email": "caiquemorales20@gmail.com",
    "password": "prismapass0101"
  }
  const router = useRouter()

  // Function
  async function signIn() {
      const response = await fetch('http://localhost:3333/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      localStorage.setItem('token', responseData.token);
      router.push('/dashboard')
  }

  // Rendering
  return (
    <main className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-neutral-700">
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl font-bold text-white">Finnace Application</h1>
        <div>
          <div className="mb-10 flex flex-col gap-4">
            <input
              className="w-full rounded-md px-5 py-3"
              type="email"
              placeholder="Email"
            />
            <input
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
