import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body{
    font-family: 'Work Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const Wrapper = styled.div`
  max-width: 1880px;
  display: flex;
  flex-direction: column;
  /* margin: 0 auto; */
  /* justify-content: center; */
  align-items: center;
  min-width: 320px;
  padding: 0 30px;
  @media only screen and (min-width: 1300px) {
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
  }
`;

function Layout({ children }) {
  return (
    <Wrapper>
      {children}
      <GlobalStyle />
    </Wrapper>
  );
}

export default Layout;
