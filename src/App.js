import { useEffect, useState } from "react";
import { getDeviceToken, registerMessageReceiver } from "./firebase.config";
import QRCode from "react-qr-code";
import QrScanner from "./components/QrScanner";

function App() {
  const [token, setToken] = useState();
  const [showQr, setShowQr] = useState(true);
  const [showQrReader, setShowQrReader] = useState(false);

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

    // registerMessageReceiver();
  }, []);

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
