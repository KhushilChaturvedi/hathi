import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'

export default function Projects(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    api.get('/projects').then(res => setItems(res.data.projects || [])).finally(()=> setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map(p => (
        <div key={p._id} className="card">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            {p.premium && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Premium</span>}
          </div>
          <p className="text-sm text-gray-700 line-clamp-3 mt-2">{p.description}</p>
          <div className="mt-3 flex gap-2">
            <Link className="btn" to={`/dashboard/${p._id}`}>Open</Link>
          </div>
        </div>
      ))}
    </div>
  )
}
