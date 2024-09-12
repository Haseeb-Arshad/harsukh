import React from 'react'
import Header from './parts/header'
import Vision from './parts/vision'
import AboutUs from './parts/aboutus'
import CeoVision from './parts/ceoVision'
import Footer from './parts/footer'
import VideoContent from './parts/videoContent'
import Navbar from './parts/navbar'

export default function HomePage() {
  return (
    <Navbar>
      <Header />
      <VideoContent/>
      <div id="about-section">
        <AboutUs/>
      </div>
      <Vision/>
      <CeoVision/>
      <Footer/>
    </Navbar>
  )
}