import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Placeholder */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo-placeholder.png" // replace later with your real logo
            alt="Hathi Logo"
            className="h-10 w-10"
          />
          <span className="font-poppins font-bold text-xl text-[#1A1A1A]">
            Hathi
          </span>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex space-x-6 font-medium">
          <a href="#problem" className="hover:text-[#3B82F6]">Problem</a>
          <a href="#how" className="hover:text-[#3B82F6]">How It Works</a>
          <a href="#features" className="hover:text-[#3B82F6]">Features</a>
        </div>

        {/* CTA */}
        <div className="flex space-x-4">
        <Link to="/login" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Login
          </Link>
          <Link to="/signup" className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-[#F9FAFB] text-[#1A1A1A] font-inter">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-[#1A1A1A] text-white h-screen flex flex-col justify-center items-center text-center px-6">
        <img
          src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80"
          alt="Elephant"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold font-poppins mb-6">
            Hathi: Learn by Doing. Build by Collaborating.
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Students grow with real projects. Entrepreneurs get affordable talent.  
            Together, we make learning practical.
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/signup" className="bg-[#3B82F6] hover:bg-blue-700 px-6 py-3 rounded-lg font-medium">
              I'm a Student
            </Link>
            <Link to="/signup" className="bg-[#10B981] hover:bg-green-700 px-6 py-3 rounded-lg font-medium">
              I'm an Entrepreneur
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 px-6 md:px-16 text-center bg-[#F5E6D3]">
        <h2 className="text-3xl font-bold font-poppins mb-8">The Problem We Solve</h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">For Students</h3>
            <p className="text-gray-700">
              Courses give theory. Without real-world projects, skills don't stick.  
              Hathi provides mock + real projects to bridge the gap.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">For Entrepreneurs</h3>
            <p className="text-gray-700">
              Hiring is costly. Startups need affordable, motivated talent.  
              Hathi connects you to students eager to contribute.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 px-6 bg-[#F9FAFB] text-center">
        <h2 className="text-3xl font-bold font-poppins mb-12">How Hathi Works</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-3">1. Sign Up</h3>
            <p className="text-gray-600">
              Join as a student or entrepreneur. Define your skills or project needs.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-3">2. Mock Projects</h3>
            <p className="text-gray-600">
              Students complete mock projects to gain credibility & unlock real projects.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-3">3. Collaborate</h3>
            <p className="text-gray-600">
              Entrepreneurs post projects, pay a small fee, and get student teams onboard.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 text-center bg-white">
        <h2 className="text-3xl font-bold font-poppins mb-8">Why Choose Hathi?</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="p-6 bg-[#F9FAFB] rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">🎯 Gamified Learning</h3>
            <p className="text-gray-600">Students unlock levels, track growth & build credibility.</p>
          </div>
          <div className="p-6 bg-[#F9FAFB] rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">🚀 Real Projects</h3>
            <p className="text-gray-600">Affordable talent for entrepreneurs, real-world work for students.</p>
          </div>
          <div className="p-6 bg-[#F9FAFB] rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">💳 Secure Payments</h3>
            <p className="text-gray-600">Safe & smooth payments powered by Razorpay.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-[#1A1A1A] text-white text-center">
        <h2 className="text-4xl font-extrabold font-poppins mb-6">
          Build your future with Hathi 🐘
        </h2>
        <p className="mb-8 text-lg">
          Join today — whether you're learning or launching.
        </p>
        <div className="flex justify-center gap-6">
          <Link to="/signup" className="bg-[#3B82F6] hover:bg-blue-700 px-6 py-3 rounded-lg font-medium">
            I'm a Student
          </Link>
          <Link to="/signup" className="bg-[#10B981] hover:bg-green-700 px-6 py-3 rounded-lg font-medium">
            I'm an Entrepreneur
          </Link>
        </div>
      </section>
    </div>
  );
}
