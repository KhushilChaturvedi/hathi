import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'
import Projects from './pages/Projects.jsx'
import CreateProject from './pages/CreateProject.jsx'
import Dashboard from './pages/Dashboard.jsx'
import MockProjects from './pages/MockProjects.jsx'
import SubmitMock from './pages/SubmitMock.jsx'
import Admin from './pages/Admin.jsx'
import { useAuth } from './hooks/useAuth.js'
import LandingPage from './pages/LandingPage.jsx'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')

function Nav(){
  const { user, logout } = useAuth()
  return (
    <nav className="bg-white border-b">
      <div className="container flex items-center justify-between h-14">
        <div className="flex gap-4 items-center">
          <Link to="/" className="font-semibold">PBL</Link>
          <Link to="/projects">Projects</Link>
          {user?.role === 'entrepreneur' && <Link to="/projects/create">Create</Link>}
          {user?.role === 'student' && <Link to="/mock">Mock</Link>}
          {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
        </div>
        <div className="flex gap-2 items-center">
          {user ? (<>
            <span className="text-sm">{user.email} ({user.role})</span>
            <button className="btn" onClick={logout}>Logout</button>
          </>) : (<>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signup" className="btn bg-gray-800 hover:bg-gray-900">Signup</Link>
          </>)}
        </div>
      </div>
    </nav>
  )
}

function Protected({ children, roles }){
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />
  return children
}

export default function App(){
  return (
    <Elements stripe={stripePromise}>
      <Nav />
      <div className="container py-6">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/create" element={<Protected roles={['entrepreneur']}><CreateProject /></Protected>} />
          <Route path="/dashboard/:projectId" element={<Protected><Dashboard /></Protected>} />
          <Route path="/mock" element={<Protected roles={['student']}><MockProjects /></Protected>} />
          <Route path="/mock/submit" element={<Protected roles={['student']}><SubmitMock /></Protected>} />
          <Route path="/admin" element={<Protected roles={['admin']}><Admin /></Protected>} />
        </Routes>
      </div>
    </Elements>
  )
}
