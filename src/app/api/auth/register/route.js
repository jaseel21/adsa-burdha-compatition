import connectDB from '@/lib/db';
import Team from '@/models/Team';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { teamName, phone1, phone2, membersCount, password } = await req.json();
  await connectDB();

  const existingTeam = await Team.findOne({ teamName });
  if (existingTeam) {
    return new Response(JSON.stringify({ message: 'Team already registered' }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const team = new Team({ teamName, phone1, phone2, membersCount, password: hashedPassword });
  await team.save();

  return new Response(JSON.stringify({ message: 'Registered successfully' }), { status: 200 });
}