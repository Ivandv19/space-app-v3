import "@fontsource/outfit/400.css";
import "@fontsource/outfit/700.css";
import { createGlobalStyle } from "styled-components";

const GlobalStyleds = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    font-family: "Outfit", sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4 {
    font-weight: 700;
  }

  body {
    min-height: 100vh;
  }

  button {
    font-family: inherit;
  }

  img {
    border-style: none;
  }

  a {
    background-color: transparent;
  }
`;

export default GlobalStyleds;
