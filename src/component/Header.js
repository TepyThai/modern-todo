import React from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as Logo } from '../utils/Icons/logo.svg';
import SignButton from './SignButton';
import { SubTitle } from '../layout/Home';
import { Color } from '../utils/Colors';
const Wrapper = styled.div`
  display: flex;
  max-width: 1880px;
  min-width: 320px;
  padding: 0 30px;
  height: 70px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  /* background-color: rgba(0, 0, 0, 0.5); */
`;

function Header({ handleLogout }) {
  return (
    <Wrapper>
      <Logo
        css={`
          margin: auto;
          height: 50px;
        `}
      />
      <p
        css={`
          font-size: 12px;
          margin: 0;
          padding-right: 10px;
          font-weight: 400;
          color: ${Color.Black};
        `}
      >
        built by{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/TepyThai"
        >
          @TepyThai
        </a>
      </p>
      <SignButton text="Log out" handleSign={handleLogout} />
    </Wrapper>
  );
}

export default Header;
