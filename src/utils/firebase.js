import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config =  {
    apiKey: "AIzaSyDhX3DxbXpEhvUREP45jgXdSfnGMjiXbIM",
    authDomain: "employment-history.firebaseapp.com",
    databaseURL: "https://employment-history.firebaseio.com",
    projectId: "employment-history",
    storageBucket: "employment-history.appspot.com",
    messagingSenderId: "532554269970",
    appId: "1:532554269970:web:ab31b41613600bdbc85fcb"
  };
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;