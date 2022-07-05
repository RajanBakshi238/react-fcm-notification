// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyDlvevp77yKdAXnlLG_p1urgxV8gB_e__E",
  authDomain: "test-5ab45.firebaseapp.com",
  // databaseURL: "test-5ab45",
  projectId: "test-5ab45.appspot.com",
  storageBucket: "test-5ab45.appspot.com",
  messagingSenderId: "268770122624",
  appId: "1:268770122624:web:05148eba9426c4e32a3f65",
  measurementId: "G-YYGPW8GQNC"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();