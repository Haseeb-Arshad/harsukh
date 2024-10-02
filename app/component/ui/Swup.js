"use client";

import { useEffect } from 'react';

export default function SwupProvider() {
  useEffect(() => {
    console.log("swup");

    const initSwup = async () => {
      if (typeof window !== 'undefined') {
        const Swup = (await import('swup')).default;
        const SwupPreloadPlugin = (await import('@swup/preload-plugin')).default;

        const swup = new Swup({
          plugins: [new SwupPreloadPlugin()],
        });

        return () => {
          swup.destroy();
        };
      }
    };

    initSwup();
  }, []);

  return null;
}