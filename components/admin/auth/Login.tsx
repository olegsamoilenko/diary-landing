'use client'

import React, { useState } from 'react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const next =
    new URLSearchParams(
      typeof window !== 'undefined' ? window.location.search : '',
    ).get('next') || '/admin'

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr('')
    const res = await fetch('https://api.nemoryai.com/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password: pass }),
    })
    console.log('res', res)
    if (res.ok) {
      window.location.href = next
    } else {
      const t = await res.text()
      setErr(t || 'Login failed')
    }
  }

  return (
    <div className="grid min-h-screen place-items-center p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-3 rounded-xl border p-6"
      >
        <h1 className="text-lg font-semibold">Admin Login</h1>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded border p-2"
        />
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
          className="w-full rounded border p-2"
        />
        {err && <div className="text-sm text-red-600">{err}</div>}
        <button className="w-full rounded border p-2 hover:bg-gray-50">
          Sign in
        </button>
      </form>
    </div>
  )
}
