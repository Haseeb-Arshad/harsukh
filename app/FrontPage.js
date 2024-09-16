import React, { useState, useEffect } from 'react';
import Image from 'next/image';
const FrontPage = () => {
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const newProgress = oldProgress + 3.3;
        return Math.min(newProgress, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (

    <>
     <img
        src="/Webpage/front-page.webp"
        layout="fill"
        objectFit="cover"
        priority
        alt="Background"
      />
      <div style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}>
     
      <h1 style={{
        color: 'white',
        fontSize: '40px',
        fontWeight: 'bold',
        marginBottom: '40px'
      }}>
        <img src="https://cdn.theharsukh.com/images/Logo/HarsukhLogo.webp" height={65} width={270} alt="Harsukh" />
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
    
    
    
    </>
 
  );
};

export default FrontPage;