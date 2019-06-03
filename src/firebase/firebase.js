import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//get the config info from
//"Console->Setting->Your app->Firebase SDK Snippet->Config"
const firebaseConfig = {
  apiKey: 'AIzaSyCQYDIF--rLUpo9TQwzFW0sSjYkrdMmrBo',
  authDomain: 'todo-list-45df1.firebaseapp.com',
  databaseURL: 'https://todo-list-45df1.firebaseio.com',
  projectId: 'todo-list-45df1',
  storageBucket: 'todo-list-45df1.appspot.com',
  messagingSenderId: '31145718090',
  appId: '1:31145718090:web:026d708ed972e5ac'
};

//init firebase instance with the config info
firebase.initializeApp(firebaseConfig);

//create firestore database
const db = firebase.firestore();

export { db, firebase };
