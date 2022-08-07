
function SocketHelper(props) {
  const {
    developmentMode,
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

  const sendStateUpdate = (stateChange) => {

  }

  const sendStartCommand = (data) => {
    sendMessage({command: 'start'});
  }
  
  const sendStopCommand = (data) => {
    sendMessage({command: 'stop'});
  }

  const sendSkipBackCommand = (data) => {
    console.debug('not implemented');
  }

  const sendSkipAheadCommand = (data) => {
    console.debug('not implemented');
  }

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
      <Row className='border-bottom'>
        <Row>
          <Col xs="2">
            <Button onClick={() => {}}>
              <i class="bi-chevron-double-left"></i>
            </Button>
          </Col>
          <Col xs="8">
            <Input type="text" onClick={() => {}} />
          </Col>
          <Col xs="2">
            <Button onClick={() => {}}>
              <i class="bi-chevron-double-right"></i>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs="2">
            <Button onClick={() => {}}>
              <i className='bi-zoom-out'></i>
            </Button>
          </Col>
          <Col xs="8">
            <Input type="text" onClick={() => {}} />
          </Col>
          <Col xs="2">
            <Button onClick={() => {}}>
              <i className='bi-zoom-in'></i>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs="2">
            <Button>
              <i className="bi-symmetry-vertical"></i>
            </Button>
          </Col>
          <Col xs="10">
            <Button>Edit</Button>
          </Col>
        </Row>
      </Row>
      <Row>
        <Col xs="3">
          <Button size="lg" onClick={sendStartCommand}>
            <i class="bi-play-fill"></i>
          </Button>
        </Col>
        <Col xs="3">
          <Button size="lg" onClick={sendStopCommand}>
            <i class="bi-pause-fill"></i>
          </Button>
        </Col>
        <Col xs="3">
          <Button size="lg" onClick={sendSkipBackCommand}>
            <i class="bi-skip-end-fill"></i>
          </Button>
        </Col>
        <Col xs="3">
          <Button size="lg" onClick={sendSkipAheadCommand}>
            <i class="bi-skip-start-fill"></i>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default SocketHelper;
