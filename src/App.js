import './App.css';
import RoomInput from './components/RoomInput'
import TeleprompterController from './views/TeleprompterController';
import { Spinner } from 'reactstrap';
import { useCallback, useEffect, useState } from 'react';
import { useSocket } from './utils/useSocket';

// make this a util eventually
const getRoomFromURL = () => {
  // gets url in format ?room_code=XXXX
  const urlQuerier = new URLSearchParams(window.location.search);
  const roomCode = urlQuerier.get('room_code');
  return roomCode;
}

function App() {
  console.log('APP RERENDERING');
  // CHANGE THIS FOR DEVELOPMENT
  const PRODUCTION = true;
  const STUB_ROOM = !PRODUCTION;

  const [loadingSocket, setLoadingSocket] = useState(true)
  const [room, setRoom] = useState(getRoomFromURL());
  const socketHelper = useSocket(room);

  const handlePickRoom = useCallback((newRoom) => {
    socketHelper.connectToRoom(newRoom);
  }, [socketHelper]);

  useEffect(() => {
    if (room) {
      handlePickRoom(room);
      socketHelper.sendMessage({command: 'send_state_info'});
    }
  }, [room]);

  useEffect(() => {
    console.log('use effect called');
    console.log(socketHelper);
    // TODO, this setup assumes connecting to the websocket before room input
    // I have broken it and moved stuff around...
    socketHelper.onSocketOpen(() => {
      if(STUB_ROOM) {
        // Normally, the RoomInput UI would pick the room based on user input.
        // But we can expedite development by shortcutting to XXXX
        setRoom('XXXX');
      }

      setLoadingSocket(false);
    });
  },[]);

  const renderSetup = () => {
    if (!room) {
      return (<RoomInput onPickRoom={setRoom} />);
    } else if (loadingSocket) {
      return (<Spinner>Connecting...</Spinner>);
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
