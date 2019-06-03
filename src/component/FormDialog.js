import React from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import TodoForm from './TodoForm';
import { Color } from '../utils/Colors';
import { SubTitle } from '../layout/Home';
import { ReactComponent as ModalClose } from '../utils/Icons/x-circle.svg';

const Container = animated(styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  height: 100%;
  width: 100%;
  /* position: absolute; */
  background-color: ${Color.White}
  top: 0;
  left: 0;
  position: fixed;
`);
const StDialog = animated(styled.div`
  background-color: white;
  border-radius: 4px;
  padding: 40px;
  color: #030303;
  margin: auto;
`);

const SubTitleClose = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StClose = styled(ModalClose)`
  :hover {
    cursor: pointer;
  }
  stroke: ${Color.Black};
`;

function FormDialog({ show, onClose, user, ...props }) {
  const style = useSpring({
    opacity: show ? 1 : 0,
    transform: show ? 'translate3d(0, 0, 0)' : 'translate3d(0, -30px, 0)',
    from: { opacity: 0, transform: 'translate3d(0, -30px, 0)' }
  });
  const containerStyle = useSpring({
    from: { opacity: 0 },
    opacity: show ? 1 : 0
  });
  return (
    <Container show={show} style={containerStyle}>
      <StDialog style={style} {...props}>
        <SubTitleClose>
          <SubTitle>What do you plan to do, today?</SubTitle>
          <StClose onClick={onClose} />
        </SubTitleClose>
        <TodoForm user={user} onAddAndClose={onClose} />
      </StDialog>
    </Container>
  );
}

export default FormDialog;
