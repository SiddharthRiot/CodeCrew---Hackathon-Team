
import { Router } from 'express'
import { listTeams, createTeam, joinTeam } from '../controllers/teamsController.js'
import { requireAuth } from '../middleware/auth.js'
const r = Router()
r.get('/', listTeams)
r.post('/', requireAuth, createTeam)
r.post('/join', requireAuth, joinTeam)
export default r
