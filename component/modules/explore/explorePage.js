'use client'

import React from 'react'
import dynamic from 'next/dynamic';
import Loader from '@/component/ui/Loading/Loading';

const DynamicMainPage = dynamic(() => import("@/component/modules/Background/MainPage.js"), {
  ssr: false,
  loading: () => <Loader />,
});

const ExplorePage = () => {
  return (
    <>
      <DynamicMainPage />
    </>
  )
}

export default ExplorePage
