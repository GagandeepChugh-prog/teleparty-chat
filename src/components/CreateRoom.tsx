import React, { useState } from 'react';
import { createClient, getClient } from '../client';

const CreateRoom: React.FC<any> = ({ setRoomId, setNickname, setUserIcon }) => {
  const [nicknameInput, setNicknameInput] = useState('');

  const handleCreate = () => {
    createClient(
      () => {},
      () => alert('Socket closed'),
      async () => {
        const roomId = await getClient().createChatRoom(nicknameInput, '');
        setRoomId(roomId);
        setNickname(nicknameInput);
        setUserIcon('');
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
