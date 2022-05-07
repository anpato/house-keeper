import { getSession, useSession } from 'next-auth/react';
import { FC, useEffect } from 'react';
import AuthGuard from '../guards/auth-guard.component';
import { useRouter } from 'next/router';
import { CtxOrReq } from 'next-auth/client/_utils';
import { useQuery } from 'react-query';
import userRepository from '../repositories/user.repository';

type IProps = {
  children: any;
};

const RenderPage: FC<IProps> = ({ children }) => {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    switch (status) {
      case 'authenticated':
        router.push('/dashboard');
        break;
      case 'unauthenticated':
        router.push('/');

      default:
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  switch (status) {
    case 'authenticated':
      return <AuthGuard>{children}</AuthGuard>;

    default:
      return children;
  }
};

export async function getServerSideProps(ctx: CtxOrReq) {
  const session = await getSession(ctx);
  console.log(session, 'hello');
  return {
    props: {}
  };
}
export default RenderPage;
