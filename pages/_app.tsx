import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '../store';
import RenderPage from '../layouts/render-page.layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material';
import { lightTheme } from '../constants/themes';

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
      <QueryClientProvider client={client}>
        <ThemeProvider theme={lightTheme}>
          <SessionProvider session={session}>
            <RenderPage>
              <Component {...pageProps} />
            </RenderPage>
          </SessionProvider>
        </ThemeProvider>
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
