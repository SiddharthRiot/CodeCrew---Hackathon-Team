
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export async function signup(req, res) {
  try {
    const { name, email, password, skills = [] } = req.body
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ error: 'Email already registered' })
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, passwordHash, skills })
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' })
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, skills: user.skills } })
  } catch (e) {
    res.status(500).json({ error: 'Signup failed', details: e.message })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' })
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' })
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, skills: user.skills } })
  } catch (e) {
    res.status(500).json({ error: 'Login failed', details: e.message })
  }
}
