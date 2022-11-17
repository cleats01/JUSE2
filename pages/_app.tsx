import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import NavBar from '../components/NavBar';
import GlobalStyle from '../styles/global-styles';
import styled from 'styled-components';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <GlobalStyle />
      <NavBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
