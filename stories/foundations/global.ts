import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
      ${reset}
      * {
        box-sizing: border-box;
      }
      body {
        font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
        color: ${({ theme }) => theme.colors.black1};
        fill: ${({ theme }) => theme.colors.black1};
        max-width: 480px;
        margin: auto;
        -ms-overflow-style: none;
        ::-webkit-scrollbar {
          display: none;
        }
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      input, button {
        color: inherit;
        background-color: transparent;
        border: none;
        outline: none;
        :hover {
          cursor: pointer;
        }
      }
    `;

export default GlobalStyle;
