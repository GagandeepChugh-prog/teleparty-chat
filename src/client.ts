import {
    TelepartyClient,
    SocketEventHandler,
    SocketMessageTypes,
    SessionChatMessage,
  } from 'teleparty-websocket-lib';
  
  // Define a generic structure for all incoming WebSocket messages
  type GenericSocketMessage = {
    type: string;
    data: any;
  };
  
  let client: TelepartyClient;
  
  /**
   * Creates and initializes a TelepartyClient with appropriate handlers.
   *
   * @param onChatMessage - Callback for chat messages (type: SEND_MESSAGE)
   * @param onClose - Callback when socket closes
   * @param onReady - Callback when connection is ready
   */
  export const createClient = (
    onChatMessage: (msg: SessionChatMessage) => void,
    onClose: () => void,
    onReady: () => void
  ) => {
    const eventHandler: SocketEventHandler = {
      onMessage: (message: GenericSocketMessage) => {
        if (message.type === SocketMessageTypes.SEND_MESSAGE) {
          const chatMsg = message.data as SessionChatMessage;
          onChatMessage(chatMsg);
        }
  
        // Optional: Add logic here for typing updates, system messages, etc.
      },
  
      onClose,
      onConnectionReady: onReady,
    };
  
    client = new TelepartyClient(eventHandler);
    return client;
  };
  
  /**
   * Returns the current TelepartyClient instance.
   */
  export const getClient = () => client;
  