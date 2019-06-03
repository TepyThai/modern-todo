import React from 'react';
import useFirebaseAuth from './firebase/useFirebaseAuth';
import NotAuthHome from './layout/NotAuthHome';
import Home from './layout/Home';

function App() {
  const user = useFirebaseAuth();
  //get user from localstorage to avoid flickering at first load up
  const localUser = JSON.parse(localStorage.getItem('authUser'));
  if (localUser) {
    return <Home user={localUser} />;
  }
  if (!user) {
    return <NotAuthHome />;
  }

  return <Home user={localUser} />;
}

export default App;
