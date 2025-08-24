import { useState } from 'react'
import api from '../lib/api'
import WordCounter from '../components/WordCounter'

// word counter helper
const wc = s => String(s || '').trim().split(/\s+/).filter(Boolean).length

export default function CreateProject(){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [problem, setProblem] = useState('')
  const [solution, setSolution] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [revenueModel, setRevenueModel] = useState('')
  const [premium, setPremium] = useState(false)
  const [message, setMessage] = useState('')

  const valid = wc(description)>=100 && wc(problem)>=100 && wc(solution)>=100

  // ensure Razorpay script is loaded
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!valid){ setMessage('Please reach 100 words in the long fields.'); return }

    try {
      const res = await api.post('/projects/create', {
        title, description, problem, solution, targetAudience, revenueModel, premium
      });

      if (premium && res.data.order) {
        // load Razorpay SDK
        const loaded = await loadRazorpayScript();
        if (!loaded) { setMessage('Failed to load Razorpay.'); return; }

        const order = res.data.order;

        const options = {
          key: order.keyId, // provided by backend
          amount: order.amount,
          currency: order.currency,
          name: "Hathi Platform",
          description: "Premium Project Payment",
          order_id: order.id,
          handler: async function (response) {
            try {
              // send success details back to backend for verification
              await api.post('/payments/razorpay/verify', {
                projectId: res.data.projectId,
                ...response
              });
              setMessage('Project created and premium paid ✅');
            } catch (err) {
              setMessage(err.response?.data?.message || err.message);
            }
          },
          prefill: {
            name: "Test User",
            email: "test@example.com",
            contact: "9999999999"
          },
          theme: { color: "#3399cc" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

      } else {
        setMessage('Project created. Pending review.');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || err.message)
    }
  }

  return (
    <div className="card">
      <h1 className="text-xl font-semibold mb-4">Create Project</h1>
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Title</label>
          <input className="input" value={title} onChange={e=>setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm">Target Audience</label>
          <input className="input" value={targetAudience} onChange={e=>setTargetAudience(e.target.value)} required />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm">Revenue Model</label>
          <input className="input" value={revenueModel} onChange={e=>setRevenueModel(e.target.value)} required />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm">Description</label>
          <textarea className="input h-32" value={description} onChange={e=>setDescription(e.target.value)} />
          <WordCounter text={description} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm">Problem</label>
          <textarea className="input h-32" value={problem} onChange={e=>setProblem(e.target.value)} />
          <WordCounter text={problem} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm">Solution</label>
          <textarea className="input h-32" value={solution} onChange={e=>setSolution(e.target.value)} />
          <WordCounter text={solution} />
        </div>
        <div className="md:col-span-2 flex items-center gap-2">
          <input id="premium" type="checkbox" checked={premium} onChange={e=>setPremium(e.target.checked)} />
          <label htmlFor="premium">Make Premium (₹499)</label>
        </div>
        <div className="md:col-span-2">
          <button className="btn" type="submit">Submit</button>
        </div>
      </form>
      {message && <p className="mt-3">{message}</p>}
      <p className="text-xs text-gray-500 mt-2">Note: Payments handled securely by Razorpay.</p>
    </div>
  )
}
