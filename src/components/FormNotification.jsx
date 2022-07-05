import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";

const FormNotification = () => {
  const [code, setCode] = useState();
  const [data, setData] = useState({ name: "", bio: "" });

  const { name, bio } = data;

  const readerHandler = (result, error) => {
    if (!!result) {
      setCode(result?.text);
    }

    if (!!error) {
      // console.log(error);
    }
  };

  const inputHandler = (e) => {
    let id = e.target.id;

    setData((prevState) => ({ ...prevState, [id]: e.target.value }));
  };

  const notificationHandler = async () => {
    try {
      const res = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: process.env.REACT_APP_FCM_AUTHKEY,
        },
        body: JSON.stringify({
          to: code,
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
    } catch (e) {
      console.log("error" + e);
    }
  };

  return (
    <div style={{ width: "25%" }}>
      <QrReader
        onResult={(result, error) => readerHandler(result, error)}
        style={{ width: "100%" }}
      />
      <p>{code}</p>
      {code && (
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
          <button onClick={notificationHandler}>Send Push Notification</button>
        </>
      )}
    </div>
  );
};

export default FormNotification;
