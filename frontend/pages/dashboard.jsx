
import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { API, authHeader } from '../components/util'

export default function Dashboard(){
  const [user, setUser] = useState(null)
  const [teams, setTeams] = useState([])
  useEffect(()=>{
    const u = localStorage.getItem('user')
    if (!u) return window.location.href = '/login'
    setUser(JSON.parse(u))
    fetch(`${API}/api/teams`).then(r=>r.json()).then(setTeams)
  },[])
  return (
    <>
      <Nav/>
      <main className="container">
        <div className="card">
          <h2 style={{marginTop:0}}>Welcome {user?.name || ''}</h2>
          <p style={{color:'var(--muted)'}}>Your email: {user?.email}</p>
        </div>
        <div className="card" style={{marginTop:'1rem'}}>
          <h3 style={{marginTop:0}}>Teams</h3>
          <table className="table">
            <thead><tr><th>Name</th><th>Hackathon</th><th>Members</th></tr></thead>
            <tbody>
              {teams.map(t=>(
                <tr key={t._id}>
                  <td>{t.name}</td>
                  <td>{t.hackathon?.title || '-'}</td>
                  <td>{t.members?.map(m=>m.name).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
