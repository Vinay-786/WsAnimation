import { useEffect, useState } from 'react'
import { LampContainer } from './components/lamp';

function App() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [clientId, setClientId] = useState<number | null>(null);
  const [wsResponse, setwsResponse] = useState<boolean>(false)
  const [AnimationStatus, toggleAnimation] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Generate client ID BEFORE creating WebSocket connection
    const id = Math.floor(Math.random() * 1000);
    setClientId(id);
    
    const websocket = new WebSocket('/ws');
    
    websocket.onopen = () => {
      console.log('WebSocket is connected');
      setIsConnected(true);
      setwsResponse(false);
    };
    
    websocket.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      console.log('Received message:', data);
      // Use the id variable directly instead of clientId state
      if (data.clientId === id) {
        console.log('Matching client ID, updating wsResponse to:', data.payload);
        setwsResponse(data.payload)
      }
    };
    
    websocket.onclose = () => {
      console.log('WebSocket is closed');
      setIsConnected(false);
    };
    
    setWs(websocket);
    
    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = (status: boolean) => {
    if (ws && ws.readyState === WebSocket.OPEN && clientId !== null) {
      ws.send(JSON.stringify({
        type: 'message',
        payload: status,
        clientId: clientId,
        timestamp: Date.now()
      }));
      console.log('Sent message:', status, 'at', new Date().toLocaleTimeString());
    } else {
      console.log('WebSocket not ready or clientId not set');
    }
  };

  // Continuous message sending with setInterval
  useEffect(() => {
    let intervalId: any
    if (isConnected && clientId !== null) {
      sendMessage(AnimationStatus);
      intervalId = setInterval(() => {
        sendMessage(AnimationStatus);
      }, 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [AnimationStatus, isConnected, clientId, ws]);

  return (
    <div>
      {/* Debug info */}
      <div className="fixed top-4 left-4 z-[100] bg-black/50 text-white p-2 rounded text-xs">
        <div>Client ID: {clientId}</div>
        <div>Connected: {isConnected ? 'Yes' : 'No'}</div>
        <div>WS Response: {wsResponse ? 'true' : 'false'}</div>
      </div>
      
      {/* Toggle button */}
      <div className="fixed top-4 right-4 z-[100]">
        <label className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <input
            type="checkbox"
            checked={AnimationStatus}
            onChange={(e) => toggleAnimation(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-white text-sm">{AnimationStatus ? "on" : "off"}</span>
        </label>
      </div>
      
      {/* Lamp component with controlled animation */}
      <LampContainer isAnimating={wsResponse}>
        <h1 className="text-4xl font-bold text-white text-center">
          Websocket Lamp Animation
        </h1>
        <p className="text-gray-300 text-center mt-4">
          Use the toggle button to control the animation
        </p>
        <p className="text-gray-500 text-center mt-4">
          Check console for continuous server response
        </p>
      </LampContainer>
    </div>
  )
}

export default App
