import { 
  Input, 
  Button, 
  Card, 
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Row,
  Col
} from 'reactstrap';
import { useState } from 'react';

function RoomInput(props) {
  const {
    onPickRoom
  } = props;

  const [roomCode, setRoomCode] = useState('');

  return (
    <Container className='d-flex vh-100'>
      <Row className='m-auto align-self-center'>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle>Mythic Teleprompter</CardTitle>
            </CardHeader>
            <CardBody>
              <p>Enter your 4-digit teleprompter code to start:</p>
              <Input className='my-2' type='text' value={roomCode} onChange={(e) => setRoomCode(e.currentTarget.value)}/>
              <Button className='my-2' width='100%' color='primary' onClick={() => {onPickRoom(roomCode)}}>Start!</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RoomInput;
