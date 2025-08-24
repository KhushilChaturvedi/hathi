import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../lib/api'

export default function VerifyEmail(){
  const [params] = useSearchParams()
  const [msg, setMsg] = useState('Verifying...')
  useEffect(()=>{
    const token = params.get('token')
    if (!token){ setMsg('Missing token'); return }
    api.post('/auth/verify-email', { token }).then(r=>{
      setMsg(r.data.message || 'Verified')
    }).catch(e=> setMsg(e.response?.data?.message || e.message))
  }, [])
  return (
    <div className="card max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-2">Email Verification</h1>
      <p>{msg}</p>
    </div>
  )
}
