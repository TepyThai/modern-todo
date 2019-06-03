import React from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as Logo } from '../utils/Icons/logo.svg';
const Wrapper = styled.div`
  display: flex;
  max-width: 1880px;
  min-width: 320px;
  padding: 0 30px;
  height: 70px;
  width: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
`;

function Header() {
  return (
    <Wrapper>
      <Logo
        css={`
          margin: auto;
          height: 50px;
        `}
      />
    </Wrapper>
  );
}

export default Header;
