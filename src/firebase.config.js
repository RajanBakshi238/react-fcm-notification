import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDlvevp77yKdAXnlLG_p1urgxV8gB_e__E",
  authDomain: "test-5ab45.firebaseapp.com",
  projectId: "test-5ab45",
  storageBucket: "test-5ab45.appspot.com",
  messagingSenderId: "268770122624",
  appId: "1:268770122624:web:05148eba9426c4e32a3f65",
  measurementId: "G-YYGPW8GQNC",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const publicKey = process.env.REACT_APP_FCM_PUBLIC_KEY;

export const getDeviceToken = async () => {
  let currentToken = "";

  try {
    currentToken = await getToken(messaging, { vapidKey: publicKey });

    return currentToken;
  } catch (err) {
    console.log(err);
    console.log("Error ocurred while reteriving token");
  }
};

export const registerMessageReceiver = () => {
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);

    new Notification(payload.notification.title, {
      body: payload.notification.body,
    });
  });
};


export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});