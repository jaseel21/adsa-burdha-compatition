import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true },
  phone1: { type: String, required: true },
  phone2: { type: String, required: true },
  membersCount: { type: Number, required: true },
  password: { type: String, required: true },
  codeLetter: { type: String, default: null },
  termsAgreed: { type: Boolean, default: false }
});

export default mongoose.models.Team || mongoose.model('Team', teamSchema);