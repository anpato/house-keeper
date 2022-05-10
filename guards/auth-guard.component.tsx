import { CircularProgress } from '@mui/material';
import { CtxOrReq } from 'next-auth/client/_utils';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import { useQuery } from 'react-query';
import { connect } from 'react-redux';
import Loading from '../components/core/loading.component';
import Navbar from '../components/shared/navbar.component';
import profileService from '../services/profile.service';
import { useAppDispatch } from '../store';
import { SetUser } from '../store/actions/user.actions';

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

  const { isLoading, isFetching } = useQuery(
    'GET',
    async () => await profileService.getProfile(),
    {
      onSuccess(data) {
        dispatch(SetUser(data));
      }
    }
  );

  if (isLoading || isFetching) {
    return <Loading isLoading />;
  }

  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default connect()(AuthGuard);

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
