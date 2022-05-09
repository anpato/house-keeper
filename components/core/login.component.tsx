import GoogleButton from 'react-google-button';
import GithubButton from 'react-github-login-button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Grid,
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';

const LoginRedirect = (
  status: 'loading' | 'authenticated' | 'unauthenticated'
) => {
  const router = useRouter();
  switch (status) {
    case 'authenticated':
      return (
        <Grid
          container
          justifyContent="center"
          direction="column"
          alignItems="center"
          gap={2}
        >
          <Grid item>
            <Button onClick={() => router.push('/dashboard')}>
              Go to dashboard
            </Button>
          </Grid>
        </Grid>
      );
      break;

    default:
      return (
        <Grid
          container
          justifyContent="center"
          direction="column"
          alignItems="center"
          gap={2}
        >
          <Grid item>
            <GithubButton onClick={() => signIn('github')} />
          </Grid>
          <Grid item>
            <GoogleButton onClick={() => signIn('google')} />
          </Grid>
        </Grid>
      );
  }
};

const Login = () => {
  const { status } = useSession();
  return (
    <Card style={{ minWidth: '50%', margin: 'auto' }} variant="outlined">
      <CardHeader title="Housekeeper" />
      <Divider />
      <CardContent>{LoginRedirect(status)}</CardContent>
    </Card>
  );
};

export default Login;
