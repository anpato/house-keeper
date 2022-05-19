import { Container, Grid, Paper } from '@mui/material';
import type { NextPage } from 'next';
import Login from '../components/core/login.component';

const Home: NextPage = () => {
  return (
    <Container
      component={Paper}
      maxWidth="xl"
      sx={{
        height: '100vh'
      }}
    >
      <Grid
        columns={1}
        container
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs>
          <Login />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
