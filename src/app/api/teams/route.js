import connectDB from '@/lib/db';
import Team from '@/models/Team';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  try {
    await connectDB();
    const teams = await Team.find().select('teamName phone1 phone2 membersCount password codeLetter termsAgreed');
    return new Response(JSON.stringify(teams), { status: 200 });
  } catch (error) {
    console.error('Error fetching teams:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch teams' }), { status: 500 });
  }
}