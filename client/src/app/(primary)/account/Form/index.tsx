'use client'

import { JwtPayload } from "jsonwebtoken";
import { useEffect, useState } from "react";

import Input from "../Input";
import fetchToken from "@/utils/fecthToken";

// Functional Component
export default function Form() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const decodedToken = await fetchToken();
        const { name: decodedName, email: decodedEmail, password: decodedPassword } = decodedToken as JwtPayload;
        setName(decodedName);
        setEmail(decodedEmail)
        setPassword(decodedPassword)
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    } 

    fetchData();
  }, []);

  // Rendering
  return (
    <div className="flex flex-col gap-4">
      <Input value={name} onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)} placeholder="Name" id="name" />
      <Input value={email} onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} placeholder="Email" id="email" />
      <Input value={password} onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} placeholder="Password" id="password" />
    </div>
  );
}