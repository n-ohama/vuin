import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

if (!Firebase.apps.length) {
  Firebase.initializeApp({
    apiKey: "AIzaSyCAX1ZhH6RMhBzOjVhF7GXyFtl3hpiyCHY",
    authDomain: "vue-firestore-4f571.firebaseapp.com",
    projectId: "vue-firestore-4f571",
    storageBucket: "vue-firestore-4f571.appspot.com",
    messagingSenderId: "729027247822",
    appId: "1:729027247822:web:4bacf26f274e6636f69a9f"
  });
}

export default (context, inject) => {
  const $fb = {
    app: Firebase.app,
    auth: Firebase.auth,
    firestore: Firebase.firestore,
  }
  inject('fb',$fb)
}