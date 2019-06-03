import React from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as Close } from '../utils/Icons/x.svg';
import { Color } from '../utils/Colors';

const AlertWrapper = styled.p`
  padding: 5px 15px;
  width: max-content;
  background: ${Color.Red};
  color: ${Color.White};
  margin: ${p => (p.noMargin ? '0' : '10px 0')};
  border-radius: 5px;
  font-size: 16px;
  line-height: 18px;
  display: flex;
  align-items: center;
`;
function Alert({ show, onClose, children, ...props }) {
  return show ? (
    <AlertWrapper {...props}>
      {children}
      <Close
        onClick={onClose}
        css={`
          margin-left: 10px;
          :hover {
            cursor: pointer;
          }
        `}
      />
    </AlertWrapper>
  ) : null;
}

export default Alert;
