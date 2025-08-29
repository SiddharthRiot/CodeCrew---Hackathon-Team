
export default function Nav(){
  return (
    <nav className="nav container">
      <div className="brand">CodeCrew</div>
      <div style={{display:'flex', gap:'.5rem'}}>
        <a href="/hackathons" className="btn">Hackathons</a>
        <a href="/team" className="btn">Teams</a>
        <a href="/dashboard" className="btn">Dashboard</a>
        <a href="/login" className="btn">Login</a>
      </div>
    </nav>
  )
}
