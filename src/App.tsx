import React, { useState } from 'react';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import Chat from './components/Chat';

function App() {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [userIcon, setUserIcon] = useState<string>('');

  if (!roomId) {
    return (
      <div>
        <h1>Teleparty Chat</h1>
        <CreateRoom setRoomId={setRoomId} setNickname={setNickname} setUserIcon={setUserIcon} />
        <JoinRoom setRoomId={setRoomId} setNickname={setNickname} setUserIcon={setUserIcon} />
      </div>
    );
  }

  return <Chat roomId={roomId} nickname={nickname} userIcon={userIcon} />;
}

export default App;
