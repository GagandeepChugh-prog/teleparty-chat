import React, { useState } from 'react';
import { createClient, getClient, isSocketConnected } from '../client';

const CreateRoom: React.FC<any> = ({ setRoomId, setNickname, setUserIcon }) => {
  const [nicknameInput, setNicknameInput] = useState('');

  const handleCreate = () => {
    createClient(
      () => {},
      () => alert('Socket closed'),
      async () => {
        if (isSocketConnected()) {  // Check if socket is ready
          const roomId = await getClient().createChatRoom(nicknameInput, '');
          setRoomId(roomId);
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
      <h3>Create Room</h3>
      <input
        placeholder="Nickname"
        value={nicknameInput}
        onChange={(e) => setNicknameInput(e.target.value)}
      />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default CreateRoom;
