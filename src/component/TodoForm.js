import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import styled from 'styled-components/macro';
import { db } from '../firebase/firebase';
import Selector from './Selector';
import { Color } from '../utils/Colors';
import Alert from './Alert';
import {
  priorityOptions,
  categoryOptions,
  dateOptions
} from '../utils/Options';
import Center from './Center';

export const FormWrapper = styled.div`
  /* margin: 0 auto; */
  max-width: 600px;
  min-width: 300px;
  width: 100%;
`;
export const StForm = styled(Form)`
  display: flex;
  flex: 1;
  justify-content: center;
  /* align-items: flex-start; */
  flex-direction: column;
  /* padding: 10px; */
`;

export const StTodoInput = styled(Field)`
  padding: 10px;
  margin: 20px 0;
  border: none;
  border-bottom: 2px solid ${Color.Yellow};
  width: 100%;
  min-width: 300px;
  font-size: 16px;
  line-height: 18px;
  transition: border-bottom-color 0.2s;
  :focus {
    border-bottom-color: ${Color.Pink};
    outline: none;
  }
`;

export const StAddButton = styled.button`
  padding: 10px;
  margin: 20px 0;
  border-radius: 5px;
  font-size: 16px;
  line-height: 18px;
  max-width: 450px;
  width: 100%;
  background-color: ${Color.Yellow};
  color: ${Color.Black};
  border-color: transparent;
  transition: transform 0.3s, box-shadow 0.3s;

  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
  :hover,
  :focus {
    cursor: pointer;
    transform: translateZ(-2px);

    box-shadow: none;
  }
`;

function TodoForm({ user, onAddAndClose }) {
  const [errorEmpty, setErrorEmpty] = useState(false);
  const handleOnSubmit = async (values, actions) => {
    if (values.task === '') {
      setErrorEmpty(true);
      actions.setSubmitting(false);
      return;
    }
    db.collection('users')
      .doc(user.uid)
      .collection('todos')
      .add({
        user: db.collection('users').doc(user.uid),
        task: values.task,
        createdAt: new Date(),
        priority: values.priority,
        category: values.category,
        date: values.date,
        completed: false
      })
      .then(_ => {
        actions.setSubmitting(false);
        actions.resetForm();
        if (onAddAndClose) {
          onAddAndClose();
        }
      })
      .catch(error => {
        actions.setSubmitting(false);
        actions.resetForm();
      });
  };

  return (
    <FormWrapper>
      <Formik
        initialValues={{
          task: '',
          priority: 'High',
          category: 'School',
          date: 'This week'
        }}
        onSubmit={handleOnSubmit}
        render={({ errors, status, touched, isSubmitting }) => (
          <StForm>
            <StTodoInput
              type="text"
              name="task"
              autoComplete="off"
              placeholder={'Add Task'}
            />
            <Alert show={errorEmpty} onClose={() => setErrorEmpty(false)}>
              Please add something to the task!
            </Alert>
            <div
              css={`
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
              `}
            >
              <Field
                name="priority"
                component={Selector}
                options={priorityOptions}
                placeholder="Priority"
              />

              <Field
                name="category"
                component={Selector}
                options={categoryOptions}
                placeholder="Category"
              />
              <Field
                name="date"
                component={Selector}
                options={dateOptions}
                placeholder="Date"
              />
            </div>
            <Center>
              <StAddButton type="submit" disabled={isSubmitting}>
                Add Task
              </StAddButton>
            </Center>
          </StForm>
        )}
      />
    </FormWrapper>
  );
}

export default TodoForm;
