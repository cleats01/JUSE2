import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import GlobalStyle from '../styles/global-styles';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export default function App({ Component, pageProps }: AppProps) {
  const client = new QueryClient();

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AppContainer>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </AppContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

const AppContainer = styled.div``;
