import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    
    html {
        font-size: 62.5%;
    }

    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box; 
    }

    body {
        font-family: Poppins, Arial, sans-serif;
        list-style: none;
        position: relative;
        background: url(../../src/assets/blackhole.jpg);
        background-size: 100%;

    a {
        text-decoration: none;
    }
`