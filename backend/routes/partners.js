
import { Router } from 'express'
import { listPartners, toggleLooking } from '../controllers/partnersController.js'
import { requireAuth } from '../middleware/auth.js'
const r = Router()
r.get('/', listPartners)
r.post('/toggle', requireAuth, toggleLooking)
export default r
