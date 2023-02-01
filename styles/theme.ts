import { createTheme } from '@mui/material';
import { DefaultTheme } from 'styled-components';

export const palette = createTheme({
  palette: {
    primary: {
      main: '#be99ff',
      contrastText: '#fff',
    },
    secondary: {
      main: '#81d8cf',
      contrastText: '#fff',
    },
  },
});

const colors = {
  black1: '#333533', // 기본 텍스트
  grey1: '#e9ecef', // 네비 경계
  grey2: '#dee2e6', // 구분선
  grey3: '#adb5bd', // 비활성화
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
