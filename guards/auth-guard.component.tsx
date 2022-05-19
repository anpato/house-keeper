import { CtxOrReq } from 'next-auth/client/_utils';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import { useQueries } from 'react-query';
import Loading from '../components/core/loading.component';
import Navbar from '../components/shared/navbar.component';
import homeService from '../services/home.service';
import listService from '../services/list.service';
import profileService from '../services/profile.service';
import { useAppDispatch, useAppSelector } from '../store';
import { LoadLists, LoadRecents } from '../store/actions/listings.actions';
import { SetUser } from '../store/actions/user.actions';
import { Home, HomeList } from '@prisma/client';
import { UserStore } from '../store/types/user.store';

type IProps = {
  children: ReactNode;
};

const AuthGuard: FC<IProps> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useSession({
    required: true,
    onUnauthenticated() {
      return router.push('/');
    }
  });
  const { user, homeCount } = useAppSelector((state) => ({
    ...state.ui,
    user: state.session.id,
    lists: state.listings.lists,
    homeCount: state.listings.recentHomes.length
  }));

  const [profile, lists, homes] = useQueries([
    {
      queryKey: 'GET/User',
      queryFn: async () => await profileService.getProfile(),
      onSuccess: (data: UserStore) => {
        dispatch(SetUser(data));
      }
    },
    {
      queryKey: ['GET/Lists', homeCount, user],
      enabled: !!user,
      queryFn: async () => await listService.getLists(user),
      onSuccess: (data: HomeList[]) => {
        dispatch(LoadLists(data));
      }
    },
    {
      queryKey: ['GET/Homes-recent', user],
      enabled: !!user,
      queryFn: async () => await homeService.getRecentHomes(user),
      onSuccess: (data: Home[]) => dispatch(LoadRecents(data))
    }
  ]);

  switch (true) {
    case profile.isLoading:
    case profile.isFetching:
    case lists.isLoading:
    case lists.isFetching:
    case homes.isLoading:
    case homes.isFetching:
      return <Loading isLoading />;
  }

  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default AuthGuard;

export async function getServerSideProps(ctx: CtxOrReq) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
  return {
    props: { session }
  };
}
