
function SocketHelper(developmentMode) {

  // WEBSOCKET PROTOCOL
  // every message must have three components:
  // 1. sender: 'controller' or 'client'
  // 2. id: 4 letter identifier of the channel
  // 3. data: the actual message
  //
  // to pick a room, we will:
  // send {command: 'pick_room', room_code: 'XXXX'}
  // receive {command: 'ack_pick_room', room_code: 'XXXX'}
  // 
  // to initialize, we will:
  // send {command: 'init_me'}
  // receive {command: 'ack_init_me', state: {...}}
  //
  // to receive an update we will:
  // receive {command: 'update', state: {...}}
  // send {command: 'ack_update'}
  //
  // to send an update we will:
  // send {command: 'update', state: {...}}
  // receive {command: 'ack_update'}

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
