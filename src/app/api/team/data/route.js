import connectDB from '@/lib/db';
import Team from '@/models/Team';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  await connectDB();
  const team = await Team.findOne({ teamName: session.user.name }).select('teamName phone1 phone2 membersCount codeLetter termsAgreed');
  if (!team) {
    return new Response(JSON.stringify({ message: 'Team not found' }), { status: 404 });
  }

  return new Response(JSON.stringify(team), { status: 200 });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  await connectDB();
  const team = await Team.findOne({ teamName: session.user.name });
  if (!team) {
    return new Response(JSON.stringify({ message: 'Team not found' }), { status: 404 });
  }

  try {
    team.termsAgreed = true;
    await team.save();
    return new Response(JSON.stringify({ message: 'Terms agreed successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error updating termsAgreed:', error);
    return new Response(JSON.stringify({ message: 'Failed to agree terms. Please try again.' }), { status: 400 });
  }
}