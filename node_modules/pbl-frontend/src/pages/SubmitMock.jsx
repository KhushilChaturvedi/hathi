import { useState } from 'react'
import api from '../lib/api'

export default function SubmitMock(){
  const [role, setRole] = useState('software')
  const [level, setLevel] = useState('Level 2')
  const [githubLink, setGithubLink] = useState('')
  const [msg, setMsg] = useState('')
  const submit = async (e)=>{
    e.preventDefault()
    try{
      const r = await api.post('/mock-projects/submit', { role, level, githubLink })
      setMsg(r.data.message || 'Submitted.')
    }catch(e){ setMsg(e.response?.data?.message || e.message) }
  }
  return (
    <div className="card max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-3">Submit Mock Project</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Role" value={role} onChange={e=>setRole(e.target.value)} />
        <select className="input" value={level} onChange={e=>setLevel(e.target.value)}>
          <option>Level 1</option>
          <option>Level 2</option>
          <option>Level 3</option>
        </select>
        <input className="input" placeholder="GitHub Link" value={githubLink} onChange={e=>setGithubLink(e.target.value)} />
        <button className="btn" type="submit">Submit</button>
      </form>
      {msg && <p className="mt-2 text-sm">{msg}</p>}
    </div>
  )
}
