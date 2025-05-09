import React, { useEffect, useState } from 'react';
import { createClient, getClient, isSocketConnected } from '../client';
import { SocketMessageTypes, SessionChatMessage } from 'teleparty-websocket-lib';

interface ChatProps {
  roomId: string;
  nickname: string;
  userIcon: string;
}

const Chat: React.FC<ChatProps> = ({ roomId, nickname, userIcon }) => {
  const [messages, setMessages] = useState<SessionChatMessage[]>([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    createClient(
      (msg) => setMessages((prev) => [...prev, msg]),
      () => alert('Socket closed'),
      () => {
        if (isSocketConnected()) {  // Check if socket is ready
          getClient().joinChatRoom(nickname, roomId, userIcon);
        } else {
          alert('Connection not ready, please try again later.');
        }
      }
    );
  }, [nickname, roomId, userIcon]);

  const sendMessage = () => {
    if (isSocketConnected()) {  // Check if socket is ready
      getClient().sendMessage(SocketMessageTypes.SEND_MESSAGE, { body: messageText });
      setMessageText('');
    } else {
      alert('Connection not ready, please try again later.');
    }
  };

  return (
    <div>
      <h3>Room: {roomId}</h3>
      <div style={{ border: '1px solid #ccc', height: 200, overflowY: 'scroll' }}>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.userNickname || 'System'}:</strong> {msg.body}
          </div>
        ))}
      </div>
      <input value={messageText} onChange={(e) => setMessageText(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
