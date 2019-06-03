import React, { useState } from 'react';
import styled from 'styled-components/macro';

import Layout from '../component/Layout';
import Header from '../component/Header';
import TodoList from '../component/TodoList';
import TodoForm, { StAddButton } from '../component/TodoForm';
import FormDialog from '../component/FormDialog';
import Center from '../component/Center';
import { Color } from '../utils/Colors';

export const SubTitle = styled.p`
  margin: 20px 0;
  font-size: 24px;
  font-weight: 500;
  color: ${Color.Violet};
  /* margin-top: 60px; */
`;

export const Divider = styled.div`
  width: 50%;
  height: 2px;
  background-color: ${Color.Violet};
  margin: 40px;
`;

function Home({ user }) {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <React.Fragment>
      <Header />
      <Layout
        css={`
          position: relative;
        `}
      >
        <Center
          css={`
            flex-direction: column;
          `}
        >
          <TodoList user={user} filterBy={`task`} />
          <Divider />
        </Center>
        <Center
          css={`
          flex-direction: column;
              align-items: flex-start;
            }
            @media only screen and (max-width: 1300px) {
             
              display: none;
              
          `}
        >
          <SubTitle>What do you plan to do, today?</SubTitle>
          <TodoForm user={user} />
        </Center>
        <StAddButton
          css={`
            position: fixed;
            bottom: 0;
            @media only screen and (min-width: 1300px) {
              display: none;
            }
            margin-bottom: 10px;
          `}
          onClick={() => setShowAdd(true)}
        >
          Add Task
        </StAddButton>
      </Layout>
      <FormDialog
        show={showAdd}
        onClose={() => setShowAdd(false)}
        user={user}
      />
    </React.Fragment>
  );
}

export default Home;
