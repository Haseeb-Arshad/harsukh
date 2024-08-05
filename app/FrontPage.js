import React, { useState, useEffect } from 'react';
import Image from 'next/image';
const FrontPage = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const newProgress = oldProgress + 2;
        return Math.min(newProgress, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div style={{
      backgroundImage: 'url("/Webpage/FrontPage.png")', // Replace with your image path
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    }}>
      <h1 style={{
        color: 'white',
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '40px'
      }}>
        <Image src="/images/Logo/HarsukhLogo.webp" height={70} width={270} alt="Harsukh" />
      </h1>
      <div style={{
        width: '280px',
        height: '4px',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: 'white',
          transition: 'width 0.1s ease-out'
        }} />
      </div>
    </div>
  );
};

export default FrontPage;