import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-[#F9FAFB] text-[#1A1A1A] font-inter">
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
            <Link to="/signup-student" className="bg-[#3B82F6] hover:bg-blue-700 px-6 py-3 rounded-lg font-medium">
              I’m a Student
            </Link>
            <Link to="/signup-entrepreneur" className="bg-[#10B981] hover:bg-green-700 px-6 py-3 rounded-lg font-medium">
              I’m an Entrepreneur
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 md:px-16 text-center bg-[#F5E6D3]">
        <h2 className="text-3xl font-bold font-poppins mb-8">The Problem We Solve</h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-3">For Students</h3>
            <p className="text-gray-700">
              Courses give theory. Without real-world projects, skills don’t stick.  
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
      <section className="py-20 px-6 bg-[#F9FAFB] text-center">
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
      <section className="py-20 px-6 text-center bg-white">
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
          Join today — whether you’re learning or launching.
        </p>
        <div className="flex justify-center gap-6">
          <Link to="/signup-student" className="bg-[#3B82F6] hover:bg-blue-700 px-6 py-3 rounded-lg font-medium">
            I’m a Student
          </Link>
          <Link to="/signup-entrepreneur" className="bg-[#10B981] hover:bg-green-700 px-6 py-3 rounded-lg font-medium">
            I’m an Entrepreneur
          </Link>
        </div>
      </section>
    </div>
  );
}
