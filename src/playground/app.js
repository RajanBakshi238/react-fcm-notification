import { useEffect, useState } from "react";
import { getDeviceToken, onMessageListener } from "./firebase.config";
import QRCode from "react-qr-code";
import QrScanner from "./components/QrScanner";

function App() {
  const [token, setToken] = useState();
  const [showQr, setShowQr] = useState(true);
  const [showQrReader, setShowQrReader] = useState(false);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  console.log(token);

  useEffect(() => {
    (async () => {
      Notification.requestPermission().then(async (permission) => {
        console.log("permission granted");
        if (permission === "granted") {
          try {
            const token = await getDeviceToken();
            setToken(token);
          } catch (e) {
            console.log(e);
          }
        }
      });
    })();


	onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        title: payload.data.title,
        body: payload.data.body,
      });
      console.log(payload);

    })
    .catch((err) => console.log("failed: ", err));
  }, []);

  
	console.log(show);

  const qrReaderHandler = () => {
    setShowQrReader(true);
    setShowQr(false);
  };

  const QrHandler = () => {
    setShowQr(true);
    setShowQrReader(false);
  };

  return (
    <div className="app">
      {showQr && (
        <>
          <div>{token && <QRCode value={token} />}</div>
          <button onClick={qrReaderHandler}>Show Qr Reader</button>
        </>
      )}

      {showQrReader && (
        <>
          <QrScanner /> <button onClick={QrHandler}>Show Qr Code</button>
          {/* <QrScanner2 show={show} notification={notification}/> <button onClick={QrHandler}>Show Qr Code</button> */}
        </>
      )}
      
    </div>
  );
}

export default App;
