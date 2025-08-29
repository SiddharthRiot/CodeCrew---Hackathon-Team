
import mongoose from 'mongoose'

const HackathonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organizer: String,
  startDate: Date,
  endDate: Date,
  location: String,
  tags: [String],
  description: String
}, { timestamps: true })

export default mongoose.model('Hackathon', HackathonSchema)
