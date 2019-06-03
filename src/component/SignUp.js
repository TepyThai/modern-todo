import React, { useState } from 'react';
import { firebase } from '../firebase/firebase';
import { Formik } from 'formik';
import SignButton from './SignButton';
import Alert from './Alert';
import { StForm, StTodoInput, StAddButton, FormWrapper } from './TodoForm';
import Center from './Center';
import { ReactComponent as Google } from '../utils/Icons/google.svg';
import styled from 'styled-components/macro';

function SignUp({ handleSignIn }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const handleSignUp = async (values, actions) => {
    const user = {
      email: values.email,
      password: values.password,
      username: values.username
    };
    setLoading(true);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(async ({ user: returnUser }) => {
        await returnUser.updateProfile({ displayName: user.username });
        actions.setSubmitting(false);
      })
      .catch(error => {
        actions.resetForm();
        setError(error.message);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });

    setLoading(false);
  };
  return (
    <div
      css={`
        display: flex;
        width: 100wh;
        height: 100vh;
      `}
    >
      <FormWrapper
        css={`
          margin: auto;
          max-width: 450px;
          padding: 20px;
        `}
      >
        <Formik
          initialValues={{
            email: '',
            password: '',
            username: ''
          }}
          onSubmit={handleSignUp}
          render={({ errors, status, touched, isSubmitting }) => (
            <StForm>
              <StTodoInput
                type="text"
                name="username"
                autoComplete="off"
                placeholder={'Username'}
              />
              <StTodoInput
                type="email"
                name="email"
                autoComplete="off"
                placeholder={'Email'}
              />
              <StTodoInput
                type="password"
                name="password"
                autoComplete="off"
                placeholder={'Password'}
              />
              <Center>
                <StAddButton type="submit" disabled={isSubmitting || loading}>
                  Sign Up
                </StAddButton>
              </Center>
            </StForm>
          )}
        />
        <div
          css={`
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <SignButton text={'Sign In with'} handleSign={handleSignIn}>
            {' '}
            <Google width="26px" height="26px" />
          </SignButton>
          <p
            css={`
              font-size: 10px;
              font-weight: 400;
            `}
          >
            or
          </p>
          <SignButton text={'Sign In'} handleSign={handleSignIn} />
        </div>
        <Alert noMargin={true} show={error} onClose={() => setError(false)}>
          {error}
        </Alert>
      </FormWrapper>
    </div>
  );
}

export default SignUp;
