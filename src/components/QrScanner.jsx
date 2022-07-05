import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { onMessageListener, registerMessageReceiver } from "../firebase.config";
import {Check} from "./Check";

const QrScanner = () => {
  const [notification, setNotification] = useState();
  const [data, setData] = useState();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", bio: "" });

  const { name, bio } = formData;

  useEffect(() => {
    console.log('render')
  }, [])

  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        setNotification({
          title: payload.data.title,
          body: payload.data.body,
        });

        if (showForm) {
            console.log('testing');
          new Notification(payload.notification.title, {
            body: payload.notification.body,
          });
        }

        console.log(payload);
      })
      .catch((err) => console.log("failed: ", err));
  }, [showForm]);

  const readerHandler = (result, error) => {
    if (!!result) {
      setData(result?.text);
    }

    if (!!error) {
      // console.log(error);
    }
  };

  const sendStaticNotification = async () => {
    setShowForm(false);
    console.log(data);
    try {
      const res = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: process.env.REACT_APP_FCM_AUTHKEY,
        },
        body: JSON.stringify({
          to: data,

          notification: {
            title: "Hello Rajan Bakshi",
            body: "How are You",
          },
          data: {
            title: "Hello Rajan Bakshi",
            body: "How are You",
          },
        }),
      });
      console.log(res);
    } catch (e) {
      console.log("error" + e);
    }
  };

  const formHandler = () => {
    setShowForm(true);
    setNotification({});
  };

  const inputHandler = (e) => {
    let id = e.target.id;
    setFormData((prevState) => ({ ...prevState, [id]: e.target.value }));
  };

  const sendPushNotification = async () => {
    try {
      const res = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: process.env.REACT_APP_FCM_AUTHKEY,
        },
        body: JSON.stringify({
          to: data,
          notification: {
            title: name,
            body: bio,
          },
          data: {
            title: name,
            body: bio,
          },
        }),
      });

      console.log(res);
      setFormData({name: '', bio: ''})
    } catch (e) {
      console.log("error" + e);
    }
  };

  return (
    <>
      <div style={{ width: "25%" }}>
        {!data ? <QrReader scanDelay={400}
          onResult={(result, error) => readerHandler(result, error)}
          style={{ width: "100%" }}
        /> : <Check size={220}/>}
      </div>

      {data && <p>QR CODE SCANNED SUCCESSFULL</p>}

      {notification && !showForm && (
        <>
          <h1>{notification.title}</h1>
          <p>{notification.body}</p>
        </>
      )}

      {showForm && (
        <>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            onChange={inputHandler}
            value={name}
          />
          <input
            id="bio"
            type="text"
            placeholder="Enter about yourself"
            onChange={inputHandler}
            value={bio}
          />
          <button onClick={sendPushNotification}>Send Push Notification</button>
        </>
      )}

      <div className="scanner-block">
        <button onClick={sendStaticNotification}>Send Static Key</button>
        <button onClick={formHandler}>Notification With Form</button>
      </div>
    </>
  );
};

export default QrScanner;
