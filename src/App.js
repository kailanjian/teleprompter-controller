import logo from './logo.svg';
import './App.css';
import RoomInput from './components/RoomInput'
import TeleprompterController from './views/TeleprompterController';
import { Spinner } from 'reactstrap';
import { useState } from 'react';

function App() {
  const STUB_ROOM = false;

  // CHANGE THIS FOR DEVELOPMENT
  const ws = new WebSocket('ws://localhost:4444')
  const ws = new WebSocket('ws://35.165.115.133:4444')

  const [loadingSocket, setLoadingSocket] = useState(true)
  const [room, setRoom] = useState(STUB_ROOM ? 'XXXX' : null);

  ws.onopen = () => {
    console.log('DEBUG: Connected to websocket!');

    setLoadingSocket(false);
  }

  const sendWSMessage = (data) => {
    const msg = {
      sender: 'controller',
      id: room,
      data: data
    }

    ws.send(JSON.stringify(msg));
  }

  const sendWSPickRoomMessage = (room_code) => {
    sendWSMessage({info: 'pick_room', room_code: room_code})
  }

  const handlePickRoom = (room) => {
    setRoom(room)
    sendWSPickRoomMessage(room);
  }

  const renderSetup = () => {
    if (loadingSocket) {
      return (<Spinner>Connecting...</Spinner>);
    } else if (!room) {
      return (<RoomInput onPickRoom={handlePickRoom} />);
    } else {
      return (<TeleprompterController room={room} ws={ws} />);
    }
  }

  return (
    <div className="App">
      { renderSetup() }
    </div>
  );
}

export default App;
