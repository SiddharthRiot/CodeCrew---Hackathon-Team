
import mongoose from 'mongoose'

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hackathon: { type: mongoose.Schema.Types.ObjectId, ref: 'Hackathon' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxSize: { type: Number, default: 4 },
  skillsNeeded: [String],
  bio: String
}, { timestamps: true })

export default mongoose.model('Team', TeamSchema)
