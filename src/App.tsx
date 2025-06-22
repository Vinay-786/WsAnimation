import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket>();
  const [message, setMessage] = useState('');
  const [clientId, setClientId] = useState<number>();

  useEffect(() => {
    const websocket = new WebSocket('/ws');

    websocket.onopen = () => {
      console.log('WebSocket is connected');
      const id = Math.floor(Math.random() * 1000);
      setClientId(id);
    };

    websocket.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        setMessages((prevMessages) => [...prevMessages, data.payload]);
      } catch {
        setMessages((prevMessages) => [...prevMessages, evt.data]);
      }
    };

    websocket.onclose = () => {
      console.log('WebSocket is closed');
    };
    setWs(websocket);
    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws) {
      ws.send(JSON.stringify({
        type: 'message',
        payload: message,
        clientId: clientId
      }));
      setMessage('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };


  return (
    <>
      <div>
        {messages.map((message, index) =>
          <p key={index}>{message}</p>)}
        <input type="text" value={message}
          onChange={handleInputChange} />
        <button onClick={sendMessage}>
          Send Message
        </button>
      </div>
    </>
  )
}

export default App
