import React from 'react';
import { SubTitle } from '../layout/Home';
import { StAddButton } from '../component/TodoForm';
import styled from 'styled-components/macro';
import { Color } from '../utils/Colors';

function SignButton({ handleSign, text, children, ...props }) {
  return (
    <StAddButton
      {...props}
      css={`
        width: auto;
      `}
      onClick={handleSign}
    >
      <div
        css={`
          display: flex;
          align-items: center;
          padding: 0;
          margin: 0;
        `}
      >
        <SubTitle
          css={`
            color: ${Color.Black};
            font-size: 16px;
            margin: 0 10px 0 0;
          `}
        >
          {text}{' '}
        </SubTitle>
        {children}
      </div>
    </StAddButton>
  );
}

export default SignButton;
