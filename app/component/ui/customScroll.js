import React, { useRef, useEffect, useState } from 'react';

const CustomScrollbarContainer = ({ children }) => {
  const containerRef = useRef(null);
  const thumbRef = useRef(null);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const updateScrollThumb = () => {
      if (container) {
        const scrollRatio = container.scrollTop / (container.scrollHeight - container.clientHeight);
        const newThumbHeight = (container.clientHeight / container.scrollHeight) * container.clientHeight;
        const newThumbTop = scrollRatio * (container.clientHeight - newThumbHeight);
        
        setThumbHeight(newThumbHeight);
        setThumbTop(newThumbTop);
      }
    };

    container.addEventListener('scroll', updateScrollThumb);
    window.addEventListener('resize', updateScrollThumb);
    updateScrollThumb();

    return () => {
      container.removeEventListener('scroll', updateScrollThumb);
      window.removeEventListener('resize', updateScrollThumb);
    };
  }, []);

  return (
    <div className="scrollable-container" ref={containerRef}>
      {children}
      <div className="custom-scrollbar">
        <div
          ref={thumbRef}
          className="custom-scrollbar-thumb"
          style={{
            height: `${thumbHeight}px`,
            top: `${thumbTop}px`
          }}
        />
      </div>
    </div>
  );
};

export default CustomScrollbarContainer;