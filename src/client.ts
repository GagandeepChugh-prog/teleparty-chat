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
  let isSocketReady = false; // Track connection readiness
  
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
      },
      onClose,
      onConnectionReady: () => {
        isSocketReady = true;
        onReady();  // Call onReady when the connection is ready
      },
    };
  
    client = new TelepartyClient(eventHandler);
    return client;
  };
  
  /**
   * Returns the current TelepartyClient instance.
   */
  export const getClient = () => client;
  
  /**
   * Check if the WebSocket connection is ready.
   */
  export const isSocketConnected = () => isSocketReady; // Function to check socket readiness
  