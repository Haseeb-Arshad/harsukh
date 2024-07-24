'use client';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "@/app/page.module.css";
import ImageBackground from "./background/page.jsx";
import { Suspense } from "react";
import Loading from './[floor]/Loading.js';
import { Provider } from 'react-redux';
import store from '../state/store';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    // <Provider store={store}>
      <main className={styles.main}>

        {isLoading ? (
          <Loading />
        ) : (
          // <Suspense fallback={<Loading />}>
            <ImageBackground />
        )}
      </main>

  );
}