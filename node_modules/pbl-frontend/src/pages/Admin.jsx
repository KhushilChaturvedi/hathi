import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function Admin(){
  const [pending, setPending] = useState([])
  const [users, setUsers] = useState([])
  const [msg, setMsg] = useState('')

  const load = async () => {
    const p = await api.get('/admin/pending-projects')
    const u = await api.get('/admin/users')
    setPending(p.data.projects || [])
    setUsers(u.data.users || [])
  }

  useEffect(()=>{ load() }, [])

  const approve = async (projectId, approved) => {
    await api.post('/projects/approve', { projectId, approved })
    setMsg('Saved.'); load()
  }

  const suspend = async (userId, suspend) => {
    await api.post('/admin/suspend', { userId, suspend })
    setMsg('User updated.'); load()
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Pending Projects</h2>
        <ul className="space-y-2">
          {pending.map(p => (
            <li key={p._id} className="border rounded p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-gray-600">By {p.entrepreneurId}</div>
              </div>
              <div className="flex gap-2">
                <button className="btn" onClick={()=>approve(p._id, true)}>Approve</button>
                <button className="btn bg-red-600 hover:bg-red-700" onClick={()=>approve(p._id, false)}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Users</h2>
        <ul className="space-y-2">
          {users.map(u => (
            <li key={u._id} className="border rounded p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{u.email}</div>
                <div className="text-xs text-gray-600">{u.role} {u.suspended ? '(suspended)' : ''}</div>
              </div>
              <div className="flex gap-2">
                {!u.suspended ? (
                  <button className="btn bg-red-600 hover:bg-red-700" onClick={()=>suspend(u._id, true)}>Suspend</button>
                ) : (
                  <button className="btn" onClick={()=>suspend(u._id, false)}>Unsuspend</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {msg && <p className="text-sm">{msg}</p>}
    </div>
  )
}
