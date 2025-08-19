import { useState } from 'react'
import api from '../lib/api'
import { useAuth } from '../hooks/useAuth'

export default function Signup(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')
  const [skills, setSkills] = useState('')
  const [message, setMessage] = useState('')
  const { login } = useAuth()

  const submit = async (e) => {
    e.preventDefault()
    try{
      const res = await api.post('/auth/signup', {
        email, password, role, skills: skills.split(',').map(s=>s.trim()).filter(Boolean)
      })
      setMessage(res.data.message || 'Signed up')
      // backend returns token + userId
      login({ token: res.data.token, email, role, userId: res.data.userId })
    }catch(err){
      setMessage(err.response?.data?.message || err.message)
    }
  }

  return (
    <div className="card max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Create your account</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password (>=8 w/ number & symbol)" value={password} onChange={e=>setPassword(e.target.value)} required />
        <select className="input" value={role} onChange={e=>setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="entrepreneur">Entrepreneur</option>
          <option value="admin">Admin</option>
        </select>
        <input className="input" placeholder="Skills (comma separated)" value={skills} onChange={e=>setSkills(e.target.value)} />
        <button className="btn w-full" type="submit">Sign up</button>
      </form>
      {message && <p className="mt-3 text-sm">{message}</p>}
      <p className="text-xs text-gray-500 mt-2">We’ll email you a verification link.</p>
    </div>
  )
}
