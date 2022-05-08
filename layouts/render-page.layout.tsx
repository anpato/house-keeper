import { getSession, useSession } from 'next-auth/react';
import { FC, useEffect } from 'react';
import AuthGuard from '../guards/auth-guard.component';
import { useRouter } from 'next/router';
import { CtxOrReq } from 'next-auth/client/_utils';
import { ThemeProvider } from '@mui/material';
import { useAppSelector } from '../store';
import { Theme } from '../constants/enums/theme.enum';
import { darkTheme, lightTheme } from '../constants/themes';

type IProps = {
  children: any;
};

const ThemeWrapper: FC<IProps> = ({ children }) => {
  const theme = useAppSelector((state) => state.ui.theme);

  return (
    <ThemeProvider theme={theme === Theme.Light ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
};

const RenderPage: FC<IProps> = ({ children }) => {
  const { status } = useSession();
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
      return (
        <ThemeWrapper>
          <AuthGuard>{children}</AuthGuard>
        </ThemeWrapper>
      );

    default:
      return children;
  }
};

export async function getServerSideProps(ctx: CtxOrReq) {
  const session = await getSession(ctx);
  return {
    props: {}
  };
}
export default RenderPage;
