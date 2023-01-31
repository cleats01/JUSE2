import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import GlobalStyle from '../stories/foundations/global.ts';
import theme, { palette } from '../styles/theme';
import * as NextImage from 'next/image';

NextImage.defaultProps = {
  unoptimized: true,
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <MuiThemeProvider theme={palette}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    </MuiThemeProvider>
  ),
];
