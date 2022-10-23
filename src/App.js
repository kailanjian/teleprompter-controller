import './App.css';
import RoomInput from './components/RoomInput'
import TeleprompterController from './views/TeleprompterController';
import { Spinner } from 'reactstrap';
import { useState } from 'react';
import SocketHelper from './utils/SocketHelper';

function App() {
  const STUB_ROOM = false;

  // CHANGE THIS FOR DEVELOPMENT
  let development = (process.env.NODE_ENV === 'development');

  const [loadingSocket, setLoadingSocket] = useState(true)
  const [room, setRoom] = useState(STUB_ROOM ? 'XXXX' : null);

  const socketHelper = new SocketHelper(development, room);

  socketHelper.onSocketOpen(() => {
    console.log('DEBUG: Connected to websocket!');

    setLoadingSocket(false);
  });

  const handlePickRoom = (room) => {
    setRoom(room)
    socketHelper.connectToRoom(room);
  }

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
