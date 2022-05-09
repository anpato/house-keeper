import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '../store';
import RenderPage from '../layouts/render-page.layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CssBaseline } from '@mui/material';
import Head from 'next/head';
const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Housekeeper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={client}>
        <SessionProvider session={session}>
          <RenderPage>
            <CssBaseline />
            <Component {...pageProps} />
          </RenderPage>
        </SessionProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

export const getServerSideProps = async () => {
  const msg = await db?.$connect();
  console.log(msg);
  return { props: {} };
};
