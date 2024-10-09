// pages/unity.js
'use client'

import { useEffect } from 'react';
import Head from 'next/head';
import '@/public/unity/TemplateData/style.css';

const UnityPage = () => {
  useEffect(() => {
    // Dynamically load the Unity loader script
    const script = document.createElement('script');
    script.src = '/unity/Build/HarsukhWeb.loader.js';
    script.async = true;

    script.onload = () => {
      console.log('Unity loader script loaded.');
      if (window.createUnityInstance) {
        console.log('createUnityInstance is available.');
        window
          .createUnityInstance(
            document.querySelector("#unity-canvas"),
            {
              dataUrl: "/unity/Build/HarsukhWeb.data.gz",
              frameworkUrl: "/unity/Build/HarsukhWeb.framework.js.gz",
              codeUrl: "/unity/Build/HarsukhWeb.wasm.gz",
              streamingAssetsUrl: "StreamingAssets",
              companyName: "MangoMango",
              productName: "HarsukhResidencies",
              productVersion: "0.1",
              showBanner: (msg, type) => {
                console.warn(`Unity Banner [${type}]: ${msg}`);
              },
            },
            (progress) => {
              console.log(`Loading progress: ${Math.floor(progress * 100)}%`);
              const progressBarFull = document.querySelector("#unity-progress-bar-full");
              if (progressBarFull) {
                progressBarFull.style.width = `${Math.floor(progress * 100)}%`;
              }
            }
          )
          .then((unityInstance) => {
            console.log('Unity instance loaded successfully.');
            const loadingBar = document.querySelector("#unity-loading-bar");
            if (loadingBar) {
              loadingBar.style.display = "none";
            }
          })
          .catch((message) => {
            console.error('Unity instance failed to load:', message);
            alert(`Unity Error: ${message}`);
          });
      } else {
        console.error('createUnityInstance is not available.');
      }
    };

    script.onerror = () => {
      console.error('Failed to load the Unity loader script.');
      alert('Failed to load the Unity loader script.');
    };

    document.body.appendChild(script);

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/unity/ServiceWorker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Unity WebGL Player | HarsukhResidencies</title>
        <link rel="shortcut icon" href="/unity/TemplateData/favicon.ico" />
        <link rel="stylesheet" href="/unity/TemplateData/style.css" />
        <link rel="manifest" href="/unity/manifest.webmanifest" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes"
        />
      </Head>
      <div id="unity-container" styles={{ width: '100%', height: '100vh', background: '#231F20' }}>
        <canvas
          id="unity-canvas"
          width="960"
          height="600"
          tabIndex="-1"
          style={{ width: '100%', height: '100%' }}
        ></canvas>
        <div id="unity-loading-bar" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <div id="unity-logo"></div>
          <div id="unity-progress-bar-empty">
            <div id="unity-progress-bar-full" style={{ width: '0%', height: '20px', background: '#fff' }}></div>
          </div>
        </div>
        <div id="unity-warning" style={{ position: 'absolute', top: 0, width: '100%', textAlign: 'center', color: '#fff' }}></div>
      </div>
    </>
  );
};

export default UnityPage;
