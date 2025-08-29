
import { useState } from 'react'
import Nav from '../components/Nav'
import { API } from '../components/util'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', skills: '' })
  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  async function submit(e) {
    e.preventDefault()
    const path = mode === 'login' ? '/api/auth/login' : '/api/auth/signup'
    const body = mode === 'login' ? { email: form.email, password: form.password } : { name: form.name, email: form.email, password: form.password, skills: form.skills.split(',').map(s => s.trim()).filter(Boolean) }
    const r = await fetch(`${API}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const data = await r.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      window.location.href = '/dashboard'
    } else {
      alert(data.error || 'Failed')
    }
  }
  return (
    <>
      <Nav />
      <main className="container">
        <div className="card">
          <div style={{ display: 'flex', gap: '.5rem', marginBottom: '.6rem' }}>
            <button className="btn" onClick={() => setMode('login')}>Login</button>
            <button className="btn" onClick={() => setMode('signup')}>Signup</button>
          </div>
          <form onSubmit={submit} className="row">
            {mode === 'signup' &&
              <div>
                <label className="label">Name</label>
                <input className="input" name="name" value={form.name} onChange={onChange} required />
              </div>
            }
            <div>
              <label className="label">Email</label>
              <input type="email" className="input" name="email" value={form.email} onChange={onChange} required />
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" className="input" name="password" value={form.password} onChange={onChange} required />
            </div>
            {mode === 'signup' &&
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="label">Skills (comma-separated)</label>
                <input className="input" name="skills" value={form.skills} onChange={onChange} />
              </div>
            }
            <div style={{ gridColumn: '1 / -1' }}>
              <button className="btn" type="submit">{mode === 'login' ? 'Login' : 'Create Account'}</button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
