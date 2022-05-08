import { Label, Input, Button, Card, CardBody } from 'reactstrap';
import { useState } from 'react';

function RoomInput(props) {
  const {
    onPickRoom
  } = props;

  const [roomCode, setRoomCode] = useState('');

  return (
    <>
      <Card>
        <CardBody>
          <Label>Enter Your Room Code</Label>
          <Input type='text' value={roomCode} onChange={(e) => setRoomCode(e.currentTarget.value)}/>
          <Button onClick={() => {onPickRoom(roomCode)}}>Pick</Button>
        </CardBody>
      </Card>
    </>
  );
}

export default RoomInput;
