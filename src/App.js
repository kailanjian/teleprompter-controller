import './App.css';
import RoomInput from './components/RoomInput'
import TeleprompterController from './views/TeleprompterController';
import { Spinner } from 'reactstrap';
import { useCallback, useEffect, useState } from 'react';
import { useSocket } from './utils/useSocket';

function App() {
  console.log('APP RERENDERING');
  // CHANGE THIS FOR DEVELOPMENT
  const STUB_ROOM = true;

  const [loadingSocket, setLoadingSocket] = useState(true)
  const [room, setRoom] = useState(null);
  const socketHelper = useSocket(room);

  const handlePickRoom = useCallback((newRoom) => {
    setRoom(newRoom)
    socketHelper.connectToRoom(newRoom);
  }, [socketHelper]);

  useEffect(() => {
    console.log('use effect called');
    console.log(socketHelper);
    socketHelper.onSocketOpen(() => {
      if(STUB_ROOM) {
        // Normally, the RoomInput UI would pick the room based on user input.
        // But we can expedite development by shortcutting to XXXX
        handlePickRoom('XXXX');
      }

      setLoadingSocket(false);
    });
  },[]);

  const renderSetup = () => {
    if (loadingSocket) {
      return (<Spinner>Connecting...</Spinner>);
    } else if (!room) {
      return (<RoomInput onPickRoom={handlePickRoom} />);
    } else {
      return (<TeleprompterController room={room} socketHelper={socketHelper} />);
    }
  }

  return (
    <div className="App">
      { renderSetup() }
    </div>
  );
}

export default App;
