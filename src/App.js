import './App.css';
import RoomInput from './components/RoomInput'
import TeleprompterController from './views/TeleprompterController';
import { Spinner } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useSocket } from './utils/useSocket';

function App() {
  const STUB_ROOM = true;

  // CHANGE THIS FOR DEVELOPMENT
  const [loadingSocket, setLoadingSocket] = useState(true)
  const [room, setRoom] = useState(null);

  const socketHelper = useSocket(room);

  const handlePickRoom = (room) => {
    setRoom(room)
    socketHelper.connectToRoom(room);
  }

  useEffect(() => {
    if (!room) {
      socketHelper.onSocketOpen(() => {
        console.log('DEBUG: Connected to websocket!');
        console.log(socketHelper.getState())

        if(STUB_ROOM) {
          handlePickRoom('XXXX');
        }

        setLoadingSocket(false);
      });
    }
  },[room])

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
