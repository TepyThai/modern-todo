import React from 'react';
import styled from 'styled-components/macro';

import { Color } from '../utils/Colors';
import { ReactComponent as NotDone } from '../utils/Icons/square.svg';
import { ReactComponent as Done } from '../utils/Icons/check.svg';
import { ReactComponent as Delete } from '../utils/Icons/trash.svg';

const StLi = styled.li`
  display: flex;
  flex: 1;
  padding: 10px;
  margin: 10px;
  opacity: ${props => (props.completed ? 0.5 : 1)};
  text-decoration: ${props => (props.completed ? 'line-through' : '')};
  text-decoration-color: ${props => (props.completed ? Color.Red : '')};
  transition: opacity 0.3s;
  :hover {
    cursor: pointer;
  }
`;

const TodoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  flex: 1;
  border-bottom: 1.5px solid ${Color.White};
  @media only screen and (min-width: 660px) {
    width: 600px;
  }
`;
function TodoItem({ todo, handleTodoDelete, handleTodoToggle }) {
  return (
    <TodoWrapper key={todo.createdAt}>
      {todo.completed ? (
        <Done
          onClick={() => handleTodoToggle(todo)}
          css={`
            stroke: ${Color.Teal};
            opacity: 0.5;
            :hover {
              cursor: pointer;
            }
          `}
        />
      ) : (
        <NotDone
          onClick={() => handleTodoToggle(todo)}
          css={`
            stroke: ${Color.Teal};
            :hover {
              cursor: pointer;
            }
          `}
        />
      )}
      <StLi onClick={() => handleTodoToggle(todo)} completed={todo.completed}>
        {todo.task}
      </StLi>

      <Delete
        onClick={() => handleTodoDelete(todo.id)}
        css={`
          stroke: ${Color.Teal};
          opacity: 0.5;
          transition: opacity 0.3s;
          :hover {
            cursor: pointer;
            opacity: 1;
          }
        `}
      />
    </TodoWrapper>
  );
}

export default TodoItem;
