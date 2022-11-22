import { DefaultTheme } from 'styled-components';

const colors = {
  black1: '#333533',
  grey1: '#e9ecef',
  grey2: '#dee2e6',
  grey3: '#adb5bd',
  grey4: '#7e858d',
  grey5: '#495057',
  purple1: `#be99ff`,
  purple2: '#6f2dbd',
  tiffanyblue: '#81d8cf',
};

const fontSize = {
  title: 20,
  subTitle: 16,
  content: 14,
};

export type ColorsTypes = typeof colors;
export type FontSizeTypes = typeof fontSize;

const theme: DefaultTheme = {
  colors,
  fontSize,
};

export default theme;
