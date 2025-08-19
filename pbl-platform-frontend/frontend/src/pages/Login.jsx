import { useState } from 'react'
import api from '../lib/api'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const { login } = useAuth()
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try{
      const res = await api.post('/auth/login', { email, password })
      login({ token: res.data.token, email, role: res.data.role || 'student', userId: res.data.userId })
      nav('/projects')
    }catch(err){
      setMessage(err.response?.data?.message || err.message)
    }
  }

  return (
    <div className="card max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Welcome back</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="btn w-full" type="submit">Login</button>
      </form>
      {message && <p className="mt-3 text-sm text-red-700">{message}</p>}
    </div>
  )
}
