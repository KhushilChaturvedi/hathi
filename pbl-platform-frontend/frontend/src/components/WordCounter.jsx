export default function WordCounter({ text, min=100 }){
  const words = String(text || '').trim().split(/\s+/).filter(Boolean).length
  const ok = words >= min
  return <p className={ok ? 'text-green-700' : 'text-red-700'}>{words} / {min} words</p>
}
