
import User from '../models/User.js'

export async function listPartners(req, res) {
  const { skill } = req.query
  const q = { lookingForTeam: true }
  if (skill) q.skills = skill
  const users = await User.find(q).select('name email skills lookingForTeam').limit(50)
  res.json(users)
}

export async function toggleLooking(req, res) {
  const user = await User.findById(req.user.id)
  user.lookingForTeam = !user.lookingForTeam
  await user.save()
  res.json({ lookingForTeam: user.lookingForTeam })
}
