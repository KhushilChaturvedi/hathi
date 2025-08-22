import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-black text-white h-screen flex flex-col justify-center items-center text-center px-6">
        <img
          src="https://images.unsplash.com/photo-1589652717521-10c0d092dea9?auto=format&fit=crop&w=1000&q=80"
          alt="Elephant"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Build Skills. Join Real Projects.  
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Hathi connects <span className="font-semibold">students</span> eager to learn  
            with <span className="font-semibold">entrepreneurs</span> who need talent.  
            Learn by doing, earn by building.  
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/signup-student" className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-medium">
              I’m a Student
            </Link>
            <Link to="/signup-entrepreneur" className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-medium">
              I’m an Entrepreneur
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 md:px-16 text-center bg-white">
        <h2 className="text-3xl font-bold mb-8">The Problem</h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-3">For Students</h3>
            <p className="text-gray-700">
              Online courses give you theory. But without real-world projects, your
              learning remains incomplete. Hathi gives you mock & real projects so
              you can prove your skills.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">For Entrepreneurs</h3>
            <p className="text-gray-700">
              Startups need affordable skilled talent. Traditional hiring is expensive.
              Hathi connects you with students ready to contribute at lower cost.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-3">1. Sign Up</h3>
            <p className="text-gray-600">
              Register as a student or entrepreneur.  
              Tell us your skills or project needs.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-3">2. Mock Projects</h3>
            <p className="text-gray-600">
              Students complete mock projects to level up & gain credibility before
              joining real projects.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-3">3. Real Collaboration</h3>
            <p className="text-gray-600">
              Entrepreneurs post projects, pay a small fee, and get skilled students
              working on their startup challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 text-center bg-white">
        <h2 className="text-3xl font-bold mb-8">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="p-6 bg-gray-50 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">🎯 Skills Dashboard</h3>
            <p className="text-gray-600">Track your growth, levels, and projects completed.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">🚀 Entrepreneur Projects</h3>
            <p className="text-gray-600">Affordable, motivated talent to bring your ideas alive.</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">💳 Secure Payments</h3>
            <p className="text-gray-600">Seamless integration with Razorpay for safe payments.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-black text-white text-center">
        <h2 className="text-4xl font-extrabold mb-6">
          Ready to Start Building Your Future?
        </h2>
        <p className="mb-8 text-lg">
          Join Hathi today and turn your skills or startup ideas into reality.
        </p>
        <div className="flex justify-center gap-6">
          <Link to="/signup-student" className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-medium">
            Join as Student
          </Link>
          <Link to="/signup-entrepreneur" className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-medium">
            Post a Project
          </Link>
        </div>
      </section>
    </div>
  );
}
