import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../lib/api'

export default function Dashboard(){
  const { projectId } = useParams()
  const [data, setData] = useState(null)
  const [name, setName] = useState('')
  const [status, setStatus] = useState('pending')
  const [msg, setMsg] = useState('')

  const load = () => api.get(`/dashboard/${projectId}`).then(r=> setData(r.data))

  useEffect(()=>{ load() }, [projectId])

  const addMilestone = async () => {
    try{
      await api.patch(`/projects/${projectId}/milestones`, { name, status })
      setName(''); setStatus('pending'); setMsg('Milestone saved.'); load()
    }catch(e){ setMsg(e.response?.data?.message || e.message) }
  }

  if (!data) return <p>Loading...</p>
  const { project, team, links, progress } = data

  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="text-lg font-semibold">{project?.title}</h2>
        <p className="text-sm text-gray-700 mt-1">{project?.description}</p>
        <p className="mt-2 text-sm">Progress: <span className="font-medium">{progress}%</span></p>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-2">Team</h3>
        <ul className="list-disc pl-6">
          {(team?.members || []).map(m => (
            <li key={m.userId}>{m.role} — {m.level}</li>
          ))}
        </ul>
        <div className="mt-2 text-sm">
          <a className="underline mr-3" href={links?.teams} target="_blank">MS Teams</a>
          <a className="underline" href={links?.github} target="_blank">GitHub</a>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-2">Milestones</h3>
        <ul className="list-disc pl-6">
          {(project?.milestones || []).map(m => <li key={m.name}>{m.name} — {m.status}</li>)}
        </ul>
        <div className="grid md:grid-cols-3 gap-2 mt-3">
          <input className="input" placeholder="Milestone name" value={name} onChange={e=>setName(e.target.value)} />
          <select className="input" value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="pending">pending</option>
            <option value="completed">completed</option>
          </select>
          <button className="btn" onClick={addMilestone}>Save</button>
        </div>
        {msg && <p className="mt-2 text-sm">{msg}</p>}
      </div>
    </div>
  )
}
