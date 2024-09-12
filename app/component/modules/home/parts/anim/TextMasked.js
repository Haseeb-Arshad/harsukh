import React, { useState, useEffect, useRef } from 'react';

const AnimatedText = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  const lines = text.split('\n');

  return (
    <div 
      ref={textRef}
      className={`text-reveal ${isVisible ? 'show' : ''}`}
    >
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="line-wrapper">
          <div className="line">
            {line}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedText;