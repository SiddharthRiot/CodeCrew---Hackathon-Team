
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  skills: [String],
  bio: String,
  lookingForTeam: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model('User', UserSchema)
