import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/lib/db';
import Team from '@/models/Team';
import bcrypt from 'bcryptjs';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        teamName: { label: 'Team Name', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB();
        const team = await Team.findOne({ teamName: credentials.teamName });
        if (!team) {
          throw new Error('No team found with this name');
        }
        const isValid = await bcrypt.compare(credentials.password, team.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }
        return { id: team._id, name: team.teamName };  // Session data
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.teamName = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.teamName = token.teamName;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',  // Custom login page
    error: '/auth/error',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };