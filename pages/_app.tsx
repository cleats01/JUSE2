import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import GlobalStyle from 'styles/global-styles';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useState } from 'react';
import { useEffect } from 'react';
import { Router } from 'next/router';

import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import LoadingSpinner from 'components/Common/LoadingSpinner';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [loading, setLoading] = useState(false);

  const palette = createTheme({
    palette: {
      primary: {
        main: '#be99ff',
      },
      secondary: {
        main: '#81d8cf',
      },
    },
  });

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <MuiThemeProvider theme={palette}>
              <GlobalStyle />
              <AppContainer>
                {loading ? (
                  <LoadingSpinner fullScreen />
                ) : (
                  <Component {...pageProps} />
                )}
                <ReactQueryDevtools />
              </AppContainer>
            </MuiThemeProvider>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

const AppContainer = styled.div`
  box-shadow: rgb(0 0 0 / 16%) 0px 0px 8px;
`;
