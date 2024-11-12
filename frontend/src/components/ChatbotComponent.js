import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import { Github, Linkedin } from 'lucide-react';
import './ChatbotComponent.css';

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [context, setContext] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          context,
          question: input,
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const botMessage = { sender: 'bot', text: data.response };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);

      setContext((prev) => `${prev}\nUser: ${input}\nAI: ${data.response}`);
    } catch (error) {
      console.error('Error communicating with the backend:', error);
      setIsLoading(false);
    }

    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-content">
        <h1>AI Chatbot</h1>
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <Message key={idx} sender={msg.sender} text={msg.text} />
          ))}
          {isLoading && <div className="loading">Typing...</div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <footer>
          <div className="social-links">
            <a
              href="https://github.com/Mateorovere"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/mateo-rovere/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={24} />
            </a>
          </div>
          <p>Created by Mateo Rovere</p>
        </footer>
      </div>
    </div>
  );
};

export default ChatbotComponent;
