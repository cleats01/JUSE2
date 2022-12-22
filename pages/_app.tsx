import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import GlobalStyle from '../styles/global-styles';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';

export default function App({ Component, pageProps }: AppProps) {
  const client = new QueryClient();

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

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <MuiThemeProvider theme={palette}>
            <GlobalStyle />
            <AppContainer>
              <Component {...pageProps} />
              {/* <ReactQueryDevtools /> */}
            </AppContainer>
          </MuiThemeProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

const AppContainer = styled.div``;
