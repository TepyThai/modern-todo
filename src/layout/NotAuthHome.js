import React, { useState } from 'react';
import SignUp from '../component/SignUp';
import SignIn from '../component/SignIn';

function NotAuthHome() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  // const [isSigningIn, setIsSigningIn] = useState(true);
  const handleSignUp = () => {
    setIsSigningUp(true);
  };
  const handleSignIn = () => {
    setIsSigningUp(false);
  };
  return (
    <>
      {isSigningUp ? (
        <SignUp handleSignIn={handleSignIn} />
      ) : (
        <SignIn handleSignUp={handleSignUp} />
      )}
    </>
  );
}

export default NotAuthHome;
