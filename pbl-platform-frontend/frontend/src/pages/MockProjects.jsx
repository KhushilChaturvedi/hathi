import { useEffect, useState } from 'react'
import api from '../lib/api'
import { Link } from 'react-router-dom'

export default function MockProjects(){
  const [role, setRole] = useState('software')
  const [level, setLevel] = useState('Level 1')
  const [items, setItems] = useState([])

  const load = ()=> api.get(`/mock-projects/${role}/${level}`).then(r=> setItems(r.data.mockProjects || []))

  useEffect(()=>{ load() }, [role, level])

  return (
    <div className="space-y-4">
      <div className="card flex gap-3 items-end">
        <div><label className="block text-sm">Role</label>
          <input className="input" value={role} onChange={e=>setRole(e.target.value)} />
        </div>
        <div><label className="block text-sm">Level</label>
          <select className="input" value={level} onChange={e=>setLevel(e.target.value)}>
            <option>Level 1</option>
            <option>Level 2</option>
          </select>
        </div>
        <button className="btn" onClick={load}>Refresh</button>
        <Link to="/mock/submit" className="btn">Submit Work</Link>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map(m => (
          <div key={m._id} className="card">
            <h3 className="text-lg font-semibold">{m.title}</h3>
            <p className="text-sm text-gray-700 mt-1">{m.description}</p>
            <p className="text-xs mt-2">{m.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
