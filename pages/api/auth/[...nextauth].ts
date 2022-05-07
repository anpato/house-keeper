import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { AuthProviders } from '../../../constants/enums/auth-providers.enum';
import { User } from '../../../constants/models/user.model';
import userRepository from '../../../repositories/user.repository';
import store from '../../../store';
import { SetUser } from '../../../store/actions/user.actions';

export default NextAuth({
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
    async signIn({ account, profile }) {
      let accountPayload: Pick<User, 'email' | 'name'> | null;
      switch (account.provider) {
        case AuthProviders.Github:
          accountPayload = {
            email: profile.login as string,
            name: profile.name as string
          };
          break;
        case AuthProviders.Google:
          accountPayload = {
            email: profile.email as string,
            name: profile.name as string
          };
          break;
        default:
          return false;
      }

      const data = await userRepository.createProfile(accountPayload);
      store.dispatch(SetUser({ id: data.id, name: data.name }));
      if (data) {
        return true;
      }
      return false;
    },
    redirect() {
      return '/dashboard';
    }
  }
});
