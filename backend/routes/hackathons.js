
import { Router } from 'express'
import { listHackathons, createHackathon, seedHackathons } from '../controllers/hackathonsController.js'
import { requireAuth } from '../middleware/auth.js'
const r = Router()
r.get('/', listHackathons)
r.post('/', requireAuth, createHackathon)
r.post('/dev/seed', seedHackathons)
export default r
