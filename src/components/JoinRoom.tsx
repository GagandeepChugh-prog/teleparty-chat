import React, { useState } from 'react';
import { createClient, getClient, isSocketConnected } from '../client';

const JoinRoom: React.FC<any> = ({ setRoomId, setNickname, setUserIcon }) => {
  const [nicknameInput, setNicknameInput] = useState('');
  const [roomIdInput, setRoomIdInput] = useState('');

  const handleJoin = () => {
    createClient(
      () => {},
      () => alert('Socket closed'),
      () => {
        if (isSocketConnected()) {  // Check if socket is ready
          getClient().joinChatRoom(nicknameInput, roomIdInput, '');
          setRoomId(roomIdInput);
          setNickname(nicknameInput);
          setUserIcon('');
        } else {
          alert('Connection not ready, please try again later.');
        }
      }
    );
  };

  return (
    <div>
      <h3>Join Room</h3>
      <input
        placeholder="Nickname"
        value={nicknameInput}
        onChange={(e) => setNicknameInput(e.target.value)}
      />
      <input
        placeholder="Room ID"
        value={roomIdInput}
        onChange={(e) => setRoomIdInput(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
};

export default JoinRoom;
