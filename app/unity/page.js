// app/unity/page.jsx
'use client';

import { useEffect } from 'react';

const UnityPage = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/unity/ServiceWorker.js');
    }

    const script = document.createElement('script');
    script.src = '/unity/Build/HarsukhWeb.loader.js';
    script.onload = () => {
      createUnityInstance(document.querySelector('#unity-canvas'), {
        dataUrl: '/unity/Build/HarsukhWeb.data.gz',
        frameworkUrl: '/unity/Build/HarsukhWeb.framework.js.gz',
        codeUrl: '/unity/Build/HarsukhWeb.wasm.gz',
        streamingAssetsUrl: 'StreamingAssets',
        companyName: 'MangoMango',
        productName: 'HarsukhResidencies',
        productVersion: '0.1',
        showBanner: unityShowBanner,
      }, (progress) => {
        document.querySelector('#unity-progress-bar-full').style.width = `${100 * progress}%`;
      }).then((unityInstance) => {
        document.querySelector('#unity-loading-bar').style.display = 'none';
      }).catch((message) => {
        alert(message);
      });
    };
    document.body.appendChild(script);
  }, []);

  function unityShowBanner(msg, type) {
    const warningBanner = document.querySelector("#unity-warning");
    const div = document.createElement('div');
    div.innerHTML = msg;
    if (type === 'error') {
      div.style = 'background: red; padding: 10px;';
    } else if (type === 'warning') {
      div.style = 'background: yellow; padding: 10px;';
      setTimeout(() => {
        warningBanner.removeChild(div);
        updateBannerVisibility();
      }, 5000);
    }
    warningBanner.appendChild(div);
    updateBannerVisibility();

    function updateBannerVisibility() {
      warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
    }
  }

  return (
    <div id="unity-container">
      <canvas id="unity-canvas" width="960" height="600" tabIndex="-1"></canvas>
      <div id="unity-loading-bar">
        <div id="unity-logo"></div>
        <div id="unity-progress-bar-empty">
          <div id="unity-progress-bar-full"></div>
        </div>
      </div>
      <div id="unity-warning"></div>
    </div>
  );
};

export default UnityPage;
