
function SocketHelper(developmentMode) {

  let ws = undefined;
  let room = undefined;
  let socketOpen = false;

  if (developmentMode) {
    // ws = new WebSocket('ws://35.165.115.133:4444')
    ws = new WebSocket('ws://localhost:4444');
  } else {
    ws = new WebSocket('wss://mythicengineering.com:4444');
  }

  ws.onopen = () => {
    socketOpen = true;
  }

  const onSocketOpen = (cb) => {
    if (socketOpen) {
      cb();
    } else {
      ws.onopen = () => {
        cb();
      }
    }
  }

  const sendMessage = (data) => {
    console.log('DEBUG: Sending message from controller');

    const msg = {
      sender: 'controller',
      id: room,
      data: data
    }

    ws.send(JSON.stringify(msg));
  }

  const connectToRoom = (targetRoom) => {
    sendMessage({command: 'pick_room', room_code: targetRoom});
    room = targetRoom;
  }

  // const sendStateUpdate = (stateChange) => {

  // }

  // const sendStartCommand = (data) => {
  //   sendMessage({command: 'start'});
  // }
  
  // const sendStopCommand = (data) => {
  //   sendMessage({command: 'stop'});
  // }

  // const sendSkipBackCommand = (data) => {
  //   console.debug('not implemented');
  // }

  // const sendSkipAheadCommand = (data) => {
  //   console.debug('not implemented');
  // }

  return {
    sendMessage,
    connectToRoom,
    onSocketOpen
  }
}

export default SocketHelper;
