'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';
import styles from '@/styles/chat/chatPage.module.css';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?', isVisible: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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

  // Original handleSend function
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input.trim(), isVisible: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', { // Updated to proxy API route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ user_input: input.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }

      const data = await response.json();

      const botMessage = {
        sender: 'bot',
        text: data.response,
        isVisible: false,
      };

      setMessages(prev => [...prev, botMessage]);

      // Delay before showing the message for a natural typing effect
      setTimeout(() => {
        setMessages(prev =>
          prev.map((msg, idx) =>
            idx === prev.length - 1 ? { ...msg, isVisible: true } : msg
          )
        );
      }, 500);
    } catch (error) {
      // console.error('Error fetching the bot response:', error);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Oops! Something went wrong. Please try again later.',
          isVisible: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Create a debounced version of handleSend
  const debouncedHandleSend = useCallback(
    debounce(() => {
      handleSend();
    }, 300), // 300ms debounce delay
    [input] // Recreate the debounced function if 'input' changes
  );

  // Clean up the debounce on unmount
  useEffect(() => {
    return () => {
      debouncedHandleSend.cancel();
    };
  }, [debouncedHandleSend]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      debouncedHandleSend();
    }
  };

  const SendIcon = ({ fill }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill={fill} d="M13 20h-2V8l-5.5 5.5l-1.42-1.42L12 4.16l7.92 7.92l-1.42 1.42L13 8z" />
    </svg>
  );

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

      <div className={styles.inputArea}>
        <div className={styles.inputBox}>
          <textarea
            ref={textareaRef}
            className={styles.textInput}
            placeholder="Ask anything about Harsukh..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            onInput={adjustTextareaHeight}
            rows={1}
            aria-label="Type your message"
          />
          <button
            className={`${styles.sendButton} ${input.trim() ? styles.sendButtonActive : ''}`}
            onClick={debouncedHandleSend} // Use debounced function here
            disabled={!input.trim()}
            aria-label="Send Message"
          >
            <SendIcon fill={input.trim() ? '#FFFFFF' : '#C0C0C0'} />
          </button>
        </div>
      </div>
    </div>
  );
}
