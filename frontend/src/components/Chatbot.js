// src/components/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';

function Chatbot() {
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

    // Inicializar el mensaje del bot
    const botMessage = { sender: 'bot', text: '' };
    setMessages((prev) => [...prev, botMessage]);
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

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let done = false;
      let botText = '';

      
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        if (doneReading) {
          done = true;
          break;
        }
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          // Procesar el chunk de datos
          const lines = chunk.split('\n');
          for (let line of lines) {
            line = line.trim();
            if (line.startsWith('data:')) {
              const data = line.replace('data:', '').trim();
              if (data === '[DONE]') {
                done = true;
                break;
              }
              if (data !== '') {
                // Actualizar el texto del bot con el texto acumulado
                setMessages((prevMessages) => {
                  const updatedMessages = [...prevMessages];
                  updatedMessages[updatedMessages.length - 1].text = data;
                  return updatedMessages;
                });
              }
            }
          }
        }
      }

      setIsLoading(false);

      // Actualizar el contexto
      setContext((prev) => `${prev}\nUser: ${input}\nAI: ${botText}`);

    } catch (error) {
      console.error('Error al comunicarse con el backend:', error);
      setIsLoading(false);
    }

    setInput('');
  };

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, idx) => (
          <Message key={idx} sender={msg.sender} text={msg.text} />
        ))}
        {isLoading && <div className="loading">Escribiendo...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default Chatbot;
