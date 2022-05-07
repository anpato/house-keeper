import { Button, Card, Divider, Grid, Text } from '@nextui-org/react';
import GoogleButton from 'react-google-button';
import GithubButton from 'react-github-login-button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const LoginRedirect = (
  status: 'loading' | 'authenticated' | 'unauthenticated'
) => {
  const router = useRouter();
  switch (status) {
    case 'authenticated':
      return (
        <Grid.Container
          justify="center"
          direction="column"
          alignItems="center"
          gap={2}
        >
          <Grid>
            <Button onClick={() => router.push('/dashboard')}>
              Go to dashboard
            </Button>
          </Grid>
        </Grid.Container>
      );
      break;

    default:
      return (
        <Grid.Container
          justify="center"
          direction="column"
          alignItems="center"
          gap={2}
        >
          <Grid>
            <GithubButton onClick={() => signIn('github')} />
          </Grid>
          <Grid>
            <GoogleButton onClick={() => signIn('google')} />
          </Grid>
        </Grid.Container>
      );
  }
};

const Login = () => {
  const { status } = useSession();
  return (
    <Card style={{ width: '50%', margin: 'auto' }} bordered>
      <Card.Header>
        <Text h3> Housekeeper</Text>
      </Card.Header>
      <Divider />
      <Card.Body>{LoginRedirect(status)}</Card.Body>
    </Card>
  );
};

export default Login;
