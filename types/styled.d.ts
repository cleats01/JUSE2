import 'styled-components';
import { ColorsTypes, FontSizeTypes } from '../styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsTypes;
    fontSize: FontSizeTypes;
  }
}
