import { useState, useEffect } from 'react';
import { db, firebase } from './firebase';

function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    //listen when auth state changed
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      //if there is a user logged in
      if (firebaseUser) {
        //extract needed data
        const user = {
          username: firebaseUser.displayName,
          profileImage: firebaseUser.photoURL,
          uid: firebaseUser.uid
        };
        localStorage.setItem('authUser', JSON.stringify(user));
        //set it as internal state
        setUser(user);
        //also save it to 'users" collection with 'uid' as document's uid
        //and if a user is already created, just merge the data
        db.collection('users')
          .doc(user.uid)
          .set(user, { merge: true });
      } else {
        localStorage.removeItem('authUser');
        setUser(null); //no user logged in
      }
    });
    //we can leave [] as empty, since onAuthStateChanged
    //is only called when there is a state changed
    //and it already returns 'unsubcribe' event for us to clean up
  }, []);
  return user;
}

export default useFirebaseAuth;
