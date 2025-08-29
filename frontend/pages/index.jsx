import Nav from '../components/Nav'

export default function Home(){
  return (
    <>
      <Nav/>
      <main className="container">
        <section className="card">
          <h1 style={{marginTop:0, fontSize:'2.2rem'}}>Find your perfect hackathon team</h1>
          <p style={{color:'var(--muted)'}}>Browse hackathons, create teams, and discover partners based on skills.</p>
          <div style={{display:'flex', gap:'.6rem', marginTop:'.6rem'}}>
            <a href="/hackathons" className="btn">Explore Hackathons</a>
            <a href="/team" className="btn">Create/Join Team</a>
          </div>
        </section>
      </main>
      <footer className="footer">Frontend powered by Next.js • Backend: Node/Express</footer>
    </>
  )
}
