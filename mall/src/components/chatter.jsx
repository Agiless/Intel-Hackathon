import React, { useState } from 'react';
import './Chat.css';  // Importing the CSS file

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [error,setError] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: "user" };
      setMessages([...messages, userMessage]);
      setInput("");
      
      // Simulating an AI response
      setTimeout(() => {
        const aiMessage = { text: "", sender: "ai" };
        setMessages(prevMessages => [...prevMessages, aiMessage]);
      }, 1000);
      fetch('http://127.0.0.1:8000/api/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: input,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            console.log(String(data.result));
            setMessages(prevMessages => [...prevMessages, {text:data.result,sender:"ai"}]);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setError('Failed to send data.');
        });
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>AI Chat</h2>
      </div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <div className="message-bubble">
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
