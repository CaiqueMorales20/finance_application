'use client'

import Button from "@/components/Button";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import Link from "next/link";
import React, { useState } from "react";

// Functional Component
export default function Register() {
  // Variables
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirm, setPassword_confirm] = useState('')
  const [isLoading, setLoading] = useState(false)

  // Function
  async function signUp(): Promise<void> {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3333/create-account', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirm
        })
      })
      .then((res) => res.json())
      console.log(email)
      console.log(response)
      setLoading(false)
      alert(response)
      document.cookie = "token =" + response.token
      window.location.href = "/dashboard";
    } catch(error) {  
      alert('Invalid credential')
      return setLoading(false)
  } 

  } 

  // Rendering
  return (
    <main className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-neutral-700">
      {isLoading && <Loading />}
      <div className="flex flex-col gap-14">
        <h1 className="text-3xl font-bold text-white text-center">Create a new account</h1>
        <div className="flex flex-col items-center">
          <div className="mb-14 grid grid-cols-2 gap-4">
            <Input id="name" onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)} value={name} placeholder="Name" />
            <Input id="email" onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} value={email} placeholder="Email" />
            <Input id="password" onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} value={password} placeholder="Password" />
            <Input id="confirm_password" onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword_confirm(e.currentTarget.value)} value={password_confirm} placeholder="Confirm Password" />
          </div>
          <Button className="w-full justify-center mb-4" alt="Sign up" text="Sign up" onClick={() => signUp()} />
          <Link className="text-white text-sm text-center w-full flex justify-center" href="/login">Back to login</Link>
        </div>
      </div>
    </main>
  )
}
