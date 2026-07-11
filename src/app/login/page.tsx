'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from "next/link";

export default function LoginPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
  alert(error.message)
} else {
  router.push("/")
}
}
  return (
    <div>
      <h1>Log In</h1>
      <input
       type="email"
       placeholder="Email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
      />


      <br />
<br />

<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

<br />
<br />

<button onClick={handleLogin}>
 Log In
</button>

<p className="mt-4 text-center text-sm">
  アカウントをお持ちでないですか？{" "}
  <Link href="/signup" className="text-blue-600 hover:underline">
    Sign Up
  </Link>
</p>
    </div>
  )
}