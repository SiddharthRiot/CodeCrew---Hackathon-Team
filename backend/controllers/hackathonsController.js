
import Hackathon from '../models/Hackathon.js'

export async function listHackathons(req, res) {
  const items = await Hackathon.find().sort({ startDate: 1 })
  res.json(items)
}

export async function createHackathon(req, res) {
  const { title, organizer, startDate, endDate, location, tags = [], description = '' } = req.body
  const item = await Hackathon.create({ title, organizer, startDate, endDate, location, tags, description })
  res.json(item)
}

export async function seedHackathons(req, res) {
  await Hackathon.deleteMany({})
  const sample = [
    { title: 'Smart India Hackathon', organizer: 'MoE', startDate: new Date(Date.now()+86400000*30), endDate: new Date(Date.now()+86400000*37), location: 'India', tags: ['SIH','Govt'], description: 'National level hackathon.' },
    { title: 'Google Solution Challenge', organizer: 'Google', startDate: new Date(Date.now()+86400000*60), endDate: new Date(Date.now()+86400000*67), location: 'Online', tags: ['GDSC'], description: 'Build for the SDGs.' },
    { title: 'Hack the North', organizer: 'HTN', startDate: new Date(Date.now()+86400000*90), endDate: new Date(Date.now()+86400000*93), location: 'Waterloo', tags: ['ML','Web'], description: 'Canada’s largest hackathon.' }
  ]
  const r = await Hackathon.insertMany(sample)
  res.json({ inserted: r.length })
}
