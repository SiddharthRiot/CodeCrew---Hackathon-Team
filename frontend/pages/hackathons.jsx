
import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { API } from '../components/util'


export default function Hackathons(){
  const [items, setItems] = useState([])
  useEffect(()=>{
    fetch(`${API}/api/hackathons`).then(r=>r.json()).then(setItems)
  },[])
  async function seed(){
    const r = await fetch(`${API}/api/hackathons/dev/seed`, { method:'POST' })
    const d = await r.json()
    alert('Seeded: ' + (d.inserted || 0))
    const x = await fetch(`${API}/api/hackathons`)
    setItems(await x.json())
  }
  return (
    <>
      <Nav/>
      <main className="container">
        <div className="card" style={{marginBottom:'1rem'}}>
          <button className="btn" onClick={seed}>Seed Sample Hackathons</button>
        </div>
        <div className="grid">
          {items.map(h => (
            <div className="card" key={h._id}>
              <h3 style={{marginTop:0}}>{h.title}</h3>
              <p style={{color:'var(--muted)'}}>{h.organizer} • {new Date(h.startDate).toDateString()}</p>
              <div>{(h.tags||[]).map(t => <span key={t} className="badge">{t}</span>)}</div>
              <p>{h.description}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
