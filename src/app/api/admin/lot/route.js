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
  const team = await Team.findOne({ teamName: session.user.name });
  if (!team) {
    return new Response(JSON.stringify({ message: 'Team not found' }), { status: 404 });
  }
  return new Response(JSON.stringify({ 
    codeLetter: team.codeLetter, 
    teamName: team.teamName, 
    phone1: team.phone1, 
    phone2: team.phone2, 
    membersCount: team.membersCount 
  }), { status: 200 });
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  await connectDB();
  const team = await Team.findOne({ teamName: session.user.name });
  if (!team) {
    return new Response(JSON.stringify({ message: 'Team not found' }), { status: 404 });
  }

  if (team.codeLetter) {
    return new Response(JSON.stringify({ message: 'Code letter already assigned' }), { status: 400 });
  }

  const assigned = await Team.find({ codeLetter: { $ne: null } }).select('codeLetter');
  const assignedLetters = assigned.map((t) => t.codeLetter);
  const available = codeLetters.filter((letter) => !assignedLetters.includes(letter));
  if (available.length === 0) {
    return new Response(JSON.stringify({ message: 'No more code letters available' }), { status: 400 });
  }

  const randomLetter = available[Math.floor(Math.random() * available.length)];
  team.codeLetter = randomLetter;
  await team.save();

  return new Response(JSON.stringify({ codeLetter: randomLetter }), { status: 200 });
}