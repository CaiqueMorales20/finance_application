'use client'

import { useState } from "react";

import Input from "../Input";
import { useStore } from "@/states/zustand/store";

// Functional Component
export default function Form() {
  const {userInfo} = useStore()
  const [name, setName] = useState(userInfo.name)
  const [email, setEmail] = useState(userInfo.email)
  const [password, setPassword] = useState(userInfo.password)


  // Rendering
  return (
    <div className="flex flex-col gap-4">
      <Input value={userInfo.name} onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)} placeholder="Name" id="name" />
      <Input value={userInfo.email} onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} placeholder="Email" id="email" />
      <Input value={userInfo.password} onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} placeholder="Password" id="password" />
    </div>
  );
}