import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import NavBar from '../components/NavBar';
import GlobalStyle from '../styles/global-styles';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <NavBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
