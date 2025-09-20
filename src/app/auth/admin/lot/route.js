import connectDB from '@/lib/db';
import Team from '@/models/Team';
import { codeLetters } from '@/lib/teams';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  await connectDB();
  const team = await Team.findOne({ teamName: session.user.teamName });
  return new Response(JSON.stringify({ codeLetter: team.codeLetter }), { status: 200 });
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  await connectDB();
  const team = await Team.findOne({ teamName: session.user.teamName });
  if (team.codeLetter) {
    return new Response(JSON.stringify({ message: 'Code letter already assigned' }), { status: 400 });
  }

  // Get all assigned letters
  const assigned = await Team.find({ codeLetter: { $ne: null } }).select('codeLetter');
  const assignedLetters = assigned.map((t) => t.codeLetter);

  // Available letters
  const available = codeLetters.filter((letter) => !assignedLetters.includes(letter));
  if (available.length === 0) {
    return new Response(JSON.stringify({ message: 'No more code letters available' }), { status: 400 });
  }

  // Random assign
  const randomLetter = available[Math.floor(Math.random() * available.length)];
  team.codeLetter = randomLetter;
  await team.save();

  return new Response(JSON.stringify({ codeLetter: randomLetter }), { status: 200 });
}