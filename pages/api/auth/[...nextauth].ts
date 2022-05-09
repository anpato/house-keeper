import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { AuthProviders } from '../../../constants/enums/auth-providers.enum';
import { User } from '../../../constants/models/user.model';
import userRepository from '../../../repositories/user.repository';
import store from '../../../store';
import { SetUser } from '../../../store/actions/user.actions';

export default NextAuth({
  adapter: PrismaAdapter(db as PrismaClient),
  secret:
    process.env.NEXTAUTH_SECRET ||
    'LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=',
  pages: {
    error: '/',
    signIn: '/'
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ''
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    })
  ],
  callbacks: {
    redirect() {
      return '/dashboard';
    }
  }
});
