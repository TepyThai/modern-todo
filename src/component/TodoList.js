import React, { useState } from 'react';
import useCollection from '../firebase/useCollection';
import styled from 'styled-components/macro';
import Selector from './Selector';
import TodoItem from './TodoItem';
import { statusOption } from '../utils/Options';
import { Color } from '../utils/Colors';
import { ReactComponent as Loading } from '../utils/Icons/rings.svg';
import { ReactComponent as Empty } from '../utils/Icons/completed.svg';
import { db } from '../firebase/firebase';
import Center from '../component/Center';
const Wrapper = styled.div`
  @media screen and (min-width: 660px) {
    width: 600px;
  }
`;

const StUl = styled.ul`
  list-style: none;
  min-width: 300px;
  margin: 0;
  width: 100%;
`;

function TodoList({ user, sortedBy }) {
  // const [filteredTodos, setFilteredTodos] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('All');
  const [{ loading }, todos] = useCollection(
    `users/${user.uid}/todos`,
    sortedBy
  );
  const handleTodoToggle = async todo => {
    try {
      db.collection(`users/${user.uid}/todos`)
        .doc(todo.id)
        .update({ completed: !todo.completed });
    } catch (error) {
      alert('Failed to toggle the task! Please try again!');
    }
  };
  const handleTodoDelete = async todoId => {
    try {
      db.collection(`users/${user.uid}/todos`)
        .doc(todoId)
        .delete();
    } catch (error) {
      alert('Failed to delete the task! Please try again!');
    }
  };
  const handleListFiltered = value => {
    setCurrentFilter(value);
  };
  const filteredByCompleted = currentFilter === 'Completed' ? true : false;
  const filteredTodos =
    currentFilter !== 'All'
      ? todos.filter(todo => todo.completed === filteredByCompleted)
      : todos;

  const splitName = user.username ? user.username.split(' ') : 'UserName';
  const displayName =
    splitName.length === 2
      ? splitName[1]
      : splitName === 3
      ? splitName[2]
      : splitName;
  return (
    <Center>
      {loading ? (
        <Center
          css={`
            @media only screen and (min-width: 660px) {
              width: 600px;
            }
          `}
        >
          <Loading
            css={`
              stroke: ${Color.Violet};
              fill: ${Color.Violet};
              margin: 50px auto;
            `}
          />
        </Center>
      ) : (
        <Wrapper>
          <div
            css={`
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex: 1;
            `}
          >
            {user.username ? (
              <h1
                css={`
                  font-size: 36px;
                  font-weight: 400;
                `}
              >{`Hey ${displayName},`}</h1>
            ) : (
              <h1
                css={`
                  font-size: 36px;
                  font-weight: 400;
                `}
              >{`Welcome!!`}</h1>
            )}
            {user.profileImage ? (
              <img
                alt="profile"
                css={`
                  width: 36px;
                  height: 36px;
                  border-radius: 18px;
                  transition: transform 0.3s, box-shadow 0.3s;
                  cursor: pointer;
                  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
                  :hover {
                    box-shadow: none;
                    transform: translateZ(-2px);
                  }
                `}
                src={user.profileImage}
              />
            ) : null}
          </div>
          <h2
            css={`
              font-size: 24px;
              font-weight: 400;
            `}
          >{`Here is your todo list. Have a nice day!`}</h2>
          <Selector
            name={'status'}
            options={statusOption}
            onChange={handleListFiltered}
          />
          {filteredTodos === null || filteredTodos.length === 0 ? (
            <Center
              css={`
                flex-direction: column;
              `}
            >
              <Empty
                css={`
                  width: 250px;
                  height: 250px;
                  margin: 0 auto;
                  display: inline-block;
                  margin-top: 20px;
                `}
              />
              <h2
                css={`
                  font-size: 24px;
                  font-weight: 400;
                `}
              >{`Yayy! All work is done!`}</h2>
            </Center>
          ) : (
            <StUl>
              {filteredTodos.map(todo => (
                <TodoItem
                  todo={todo}
                  handleTodoDelete={handleTodoDelete}
                  handleTodoToggle={handleTodoToggle}
                  key={todo.id}
                />
              ))}
            </StUl>
          )}
        </Wrapper>
      )}
    </Center>
  );
}

export default TodoList;
