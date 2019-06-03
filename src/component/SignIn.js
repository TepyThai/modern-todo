import React, { useState } from 'react';
import { firebase } from '../firebase/firebase';
import styled from 'styled-components/macro';
import Alert from './Alert';
import { Formik } from 'formik';
import SignButton from './SignButton';
import { StForm, StTodoInput, StAddButton, FormWrapper } from './TodoForm';
import Center from './Center';
import { ReactComponent as Google } from '../utils/Icons/google.svg';
import { Divider } from '../layout/Home';

function SignIn({ handleSignUp }) {
  const [error, setError] = useState(null);
  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setError(error);
    }
  };
  const handleSignInWithEmail = async (values, actions) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(_ => actions.setSubmitting(false))
      .catch(error => {
        actions.resetForm();
        setError(error.message);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };
  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        width: 100wh;
        height: 100vh;
      `}
    >
      <FormWrapper
        css={`
          display: flex;
          margin: auto;
          max-width: 450px;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        `}
      >
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={handleSignInWithEmail}
          render={({ errors, status, touched, isSubmitting }) => (
            <StForm>
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
                <StAddButton type="submit" disabled={isSubmitting}>
                  Sign In
                </StAddButton>
              </Center>
            </StForm>
          )}
        />
        <Alert noMargin={true} show={error} onClose={() => setError(false)}>
          {error}
        </Alert>
        <Divider />
        <div
          css={`
            width: 300px;
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
          <SignButton text={'Sign Up'} handleSign={handleSignUp} />
        </div>
        <Alert noMargin={true} show={error} onClose={() => setError(false)}>
          Error signing in! Please try again!
        </Alert>
      </FormWrapper>
    </div>
  );
}

export default SignIn;
