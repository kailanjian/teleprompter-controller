import { SocketContext } from './SocketProvider';
import { useContext, useState } from 'react';

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

export const useSocket = (room) => {
  const ws = useContext(SocketContext);

  const onMessage = (cb) => {
    console.log('add message event handler');

    ws.addEventListener('message', (event) => {
      console.log('ws event listener triggered');
      cb(event.data);
    })
  }

  const onSocketOpen = (cb) => {
    if (ws.readyState === 1) {
      cb();
    } else {
      ws.addEventListener('open', () => {
        cb();
      });
    }
  }

  const sendMessage = (data) => {
    const msg = {
      sender: 'controller',
      id: room,
      data: data
    }

    console.log(`DEBUG: Sending message from controller ${JSON.stringify(msg)}`);

    ws.send(JSON.stringify(msg));
  }

  const getState = () => {
    return ws.readyState;
  }

  const connectToRoom = (targetRoom) => {
    sendMessage({command: 'pick_room', room_code: targetRoom});
    room = targetRoom;
  }

  return {
    ws,
    sendMessage,
    connectToRoom,
    onSocketOpen,
    onMessage,
    getState
  }
};
