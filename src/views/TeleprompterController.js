import { useState } from 'react';
import { Button, Row, Col, Container, Input } from 'reactstrap';

function TeleprompterController(props) {
  const {
    socketHelper,
    room
  } = props;

  const requestState = (data) => {
    socketHelper.sendMessage({command: 'send_state_info'});
  }

  const sendStartCommand = (data) => {
    socketHelper.sendMessage({command: 'start'});
  }
  
  const sendStopCommand = (data) => {
    socketHelper.sendMessage({command: 'stop'});
  }

  const sendSkipBackCommand = (data) => {
    socketHelper.sendMessage({command: 'skip_back'});
  }

  const sendSkipAheadCommand = (data) => {
    socketHelper.sendMessage({command: 'skip_ahead'});
  }

  const sendMirrorCommand = (data) => {
    socketHelper.sendMessage({command: 'mirror'});
  }

  socketHelper.onMessage((event) => {
    console.log(event);
  });


  return (
    <Container fluid={true}>
      <Row className='border-2 border-bottom'>
        <Col xs="6">
          <p>FREQ: {room}</p>
        </Col>
        <Col xs="6">
          <p>🟢 Connected</p>
        </Col>
      </Row>
      <Row className='border-2 border-bottom'>
        <Col>
          <div className="display-box">
            Display text here
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="p-2" xs="12">
          <Button onClick={requestState} className="w-100">Edit</Button>
        </Col>
      </Row>
      <Row className='border-bottom'>
        <Col>
          <Row>
            <Col className="pb-2" xs="12">
              <Button className="w-100" onClick={sendMirrorCommand}>
                <i className="bi-symmetry-vertical"></i>
              </Button>
            </Col>
          </Row>
          <Row className='px-2'>
            <Col xs="2">
              Speed:
            </Col>
            <Col xs="2">
              <Button onClick={() => {}}>
                <i className="bi-chevron-double-left"></i>
              </Button>
            </Col>
            <Col xs="6">
              <Input type="text" onClick={() => {}} />
            </Col>
            <Col xs="2">
              <Button onClick={() => {}}>
                <i className="bi-chevron-double-right"></i>
              </Button>
            </Col>
          </Row>
          <Row className='p-2'>
            <Col xs="2">
              Zoom:
            </Col>
            <Col xs="2">
              <Button onClick={() => {}}>
                <i className='bi-zoom-out'></i>
              </Button>
            </Col>
            <Col xs="6">
              <Input type="text" onClick={() => {}} />
            </Col>
            <Col xs="2">
              <Button onClick={() => {}}>
                <i className='bi-zoom-in'></i>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className='p-2'>
        <Col xs="6">
          <Button className="w-100" size="lg" onClick={sendSkipBackCommand}>
            <i className="bi-skip-start-fill"></i>
          </Button>
        </Col>
        <Col xs="6">
          <Button className="w-100" size="lg" onClick={sendSkipAheadCommand}>
            <i className="bi-skip-end-fill"></i>
          </Button>
        </Col>
      </Row>
      <Row className='p-2'>
        <Col xs="6">
          <Button className="w-100" size="lg" onClick={sendStartCommand}>
            <i className="bi-play-fill"></i>
          </Button>
        </Col>
        <Col xs="6">
          <Button className="w-100" size="lg" onClick={sendStopCommand}>
            <i className="bi-pause-fill"></i>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default TeleprompterController;
