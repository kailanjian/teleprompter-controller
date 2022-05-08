import { useState } from 'react';
import { Button } from 'reactstrap';

function TeleprompterController(props) {
  const {
    ws,
    room
  } = props;

  // extract to helper class
  const sendMessage = (data) => {
    console.log('DEBUG: Sending message from controller');

    const msg = {
      sender: 'controller',
      id: room,
      data: data
    }
    ws.send(JSON.stringify(msg));
  }

  const sendStartCommand = (data) => {
    sendMessage({command: 'start'});
  }
  
  const sendStopCommand = (data) => {
    sendMessage({command: 'stop'});
  }

  return (
    <div>
      <p>Loaded TeleprompterController to Frequency {room}</p>
      <Button onClick={sendStartCommand}>Start</Button>
      <Button onClick={sendStopCommand}>Stop</Button>
    </div>
  );
}

export default TeleprompterController;
