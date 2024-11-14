
'use client'

import { useState, useEffect, useRef } from 'react';
import styles from '@/styles/chat/chatPage.module.css';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?', isVisible: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input.trim(), isVisible: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('https://your-backend-api.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input.trim() }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Add bot message with initial visibility set to false
      const botMessage = {
        sender: 'bot',
        text: data.reply,
        isVisible: false
      };

      setMessages(prev => [...prev, botMessage]);

      // Delay before showing the message
      setTimeout(() => {
        setMessages(prev => 
          prev.map((msg, idx) => 
            idx === prev.length - 1 ? { ...msg, isVisible: true } : msg
          )
        );
      }, 500);

    } catch (error) {
      console.error('Error fetching the bot response:', error);
      const errorMessage = {
        sender: 'bot',
        text: 'Oops! Something went wrong. Please try again later.',
        isVisible: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const SendIcon = ({ fill }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill={fill} d="M13 20h-2V8l-5.5 5.5l-1.42-1.42L12 4.16l7.92 7.92l-1.42 1.42L13 8z" />
    </svg>
  );


  const textareaRef = useRef(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to auto
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);




  return (
    <div className={styles.container}>
      <div className={styles.chatWindow}>
        <div className={styles.chatWindowInside}>
          {messages.map((msg, index) =>
            msg.sender === 'user' ? (
              <div key={index} className={styles.userMessageContainer}>
                <div className={styles.userMessageBubble}>{msg.text}</div>
              </div>
            ) : (
              <div key={index} className={styles.botMessageContainer}>
                <div 
                  className={`${styles.botMessageBubble} ${
                    msg.isVisible ? styles.fadeInText : styles.hiddenText
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            )
          )}

          {isTyping && (
            <div className={styles.botMessageContainer}>
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
{/* 
      <div className={styles.inputArea}>
        <div className={styles.inputBox}>
          <textarea
            className={styles.textInput}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            rows={1}
          />
          <button
            className={`${styles.sendButton} ${input.trim() ? styles.sendButtonActive : ''}`}
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <SendIcon fill={input.trim() ? '#FFFFFF' : '#C0C0C0'} />
          </button>
        </div>
      </div> */}

    <div className={styles.inputArea}>
      <div className={styles.inputBox}>
        <textarea
          ref={textareaRef}
          className={styles.textInput}
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          onInput={adjustTextareaHeight}
          rows={1}
        />
        <button
          className={`${styles.sendButton} ${input.trim() ? styles.sendButtonActive : ''}`}
          onClick={handleSend}
          disabled={!input.trim()}
        >
          <SendIcon fill={input.trim() ? '#FFFFFF' : '#C0C0C0'} />
        </button>
      </div>
    </div>


    </div>
  );
}