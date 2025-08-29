
import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { API, authHeader } from '../components/util'

export default function Team() {
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({ name: '', hackathonId: '', skillsNeeded: '', bio: '' })
  const [hackathons, setHackathons] = useState([])
  const [partners, setPartners] = useState([])
  useEffect(() => {
    const u = localStorage.getItem('user')
    if (!u) return window.location.href = '/login'
    setUser(JSON.parse(u))
    fetch(`${API}/api/hackathons`).then(r => r.json()).then(setHackathons)
    fetch(`${API}/api/partners`).then(r => r.json()).then(setPartners)
  }, [])
  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  async function createTeam(e) {
    e.preventDefault()
    const body = { name: form.name, hackathonId: form.hackathonId || null, skillsNeeded: form.skillsNeeded.split(',').map(s => s.trim()).filter(Boolean), bio: form.bio }
    const r = await fetch(`${API}/api/teams`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader() }, body: JSON.stringify(body) })
    const d = await r.json()
    if (d._id) alert('Team created!'); else alert(d.error || 'Failed')
  }
  async function toggleLooking() {
    const r = await fetch(`${API}/api/partners/toggle`, { method: 'POST', headers: authHeader() })
    const d = await r.json()
    alert('Looking for team: ' + d.lookingForTeam)
    const x = await fetch(`${API}/api/partners`)
    setPartners(await x.json())
  }
  return (
    <>
      <Nav />
      <main className="container">
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Create Team</h3>
          <form onSubmit={createTeam} className="row">
            <div>
              <label className="label">Team Name</label>
              <input className="input" name="name" value={form.name} onChange={onChange} required />
            </div>
            <div>
              <label className="label">Hackathon</label>
              <select className="select" name="hackathonId" value={form.hackathonId} onChange={onChange}>
                <option value="">None</option>
                {hackathons.map(h => <option key={h._id} value={h._id}>{h.title}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="label">Skills Needed (comma-separated)</label>
              <input className="input" name="skillsNeeded" value={form.skillsNeeded} onChange={onChange} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="label">Team Bio</label>
              <textarea className="input" rows="3" name="bio" value={form.bio} onChange={onChange} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <button className="btn" type="submit">Create Team</button>
            </div>
          </form>
        </div>

        <div className="card" style={{ marginTop: '1rem' }}>
          <h3 style={{ marginTop: 0 }}>Partner Finder</h3>
          <button className="btn" onClick={toggleLooking} style={{ marginBottom: '.6rem' }}>Toggle "Looking for Team"</button>
          <table className="table">
            <thead><tr><th>Name</th><th>Email</th><th>Skills</th></tr></thead>
            <tbody>
              {partners.map(p => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{(p.skills || []).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
