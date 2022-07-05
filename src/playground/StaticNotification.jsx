import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
// import { registerMessageReceiver } from "./firebase.config";

const StaticNotification = ({ show, notification }) => {
  const [data, setData] = useState();

  useEffect(() => {
    if (data) {
      sendNotification();
    }
  }, [data]);
  
  const sendNotification = async () => {
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

  const readerHandler = (result, error) => {
    if (!!result) {
      setData(result?.text);
    }

    if (!!error) {
      // console.log(error);
    }
  };

  return (
    <div style={{ width: "25%" }}>
      <QrReader
        onResult={(result, error) => readerHandler(result, error)}
        style={{ width: "100%" }}
      />
      {data && <p>QR CODE SCANNED SUCESSFULLY</p>}
      {show && (
        <>
          <h1>{notification.title}</h1>
          <p>{notification.body}</p>
        </>
      )}
    </div>
  );
};

export default StaticNotification;
