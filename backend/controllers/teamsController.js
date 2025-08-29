
import Team from '../models/Team.js'
import Hackathon from '../models/Hackathon.js'
import User from '../models/User.js'

export async function listTeams(req, res) {
  const teams = await Team.find().populate('hackathon').populate('members', 'name email skills')
  res.json(teams)
}

export async function createTeam(req, res) {
  const { name, hackathonId, skillsNeeded = [], bio = '' } = req.body
  const team = await Team.create({ name, hackathon: hackathonId || null, members: [req.user.id], skillsNeeded, bio })
  res.json(team)
}

export async function joinTeam(req, res) {
  const { teamId } = req.body
  const team = await Team.findById(teamId)
  if (!team) return res.status(404).json({ error: 'Team not found' })
  if (team.members.map(String).includes(req.user.id)) return res.status(400).json({ error: 'Already in team' })
  if (team.members.length >= team.maxSize) return res.status(400).json({ error: 'Team is full' })
  team.members.push(req.user.id)
  await team.save()
  res.json(team)
}
