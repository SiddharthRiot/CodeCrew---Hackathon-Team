import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import hackathonRoutes from './routes/hackathons.js'
import teamRoutes from './routes/teams.js'
import partnerRoutes from './routes/partners.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.json({ ok: true, service: 'codecrew-backend' }))

app.use('/api/auth', authRoutes)
app.use('/api/hackathons', hackathonRoutes)
app.use('/api/teams', teamRoutes)
app.use('/api/partners', partnerRoutes)

const PORT = process.env.PORT || 4000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/codecrew'

mongoose.connect(MONGODB_URI).then(()=>{
  console.log('MongoDB connected')
  app.listen(PORT, ()=> console.log(`API running on http://localhost:${PORT}`))
}).catch(err=>{
  console.error('Mongo connect error:', err.message)
  process.exit(1)
})
