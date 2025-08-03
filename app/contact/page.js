'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/home/main.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    apartmentInterest: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      apartmentInterest: ''
    });
    // Show success message
    alert('Thank you for your inquiry! Our team will contact you shortly.');
  };

  return (
    <>
      <Head>
        <title>Contact Harsukh Residencies – Book Your Luxury Apartment in Nathiagali</title>
        <meta 
          name="description" 
          content="Ready to buy an apartment in Nathiagali? Contact Harsukh Residencies today for pricing, floor plans, and site visit bookings." 
        />
        <meta 
          name="keywords" 
          content="contact Harsukh Residencies, book apartment Nathiagali, luxury apartment booking Galyat, Nathiagali property contact, Galyat real estate agent, mountain apartment booking, Harsukh floor plans, site visit Nathiagali, property investment consultation" 
        />
        <meta property="og:title" content="Contact Harsukh Residencies – Book Your Apartment" />
        <meta 
          property="og:description" 
          content="Have questions about buying an apartment in Nathiagali? Reach out to our team for pricing, floor plans, and site visit bookings." 
        />
        <meta property="og:image" content="/images/contact-us.jpg" />
        <meta property="og:url" content="https://theharsukh.com/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://theharsukh.com/contact" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Harsukh Residencies Sales Team",
              "description": "Contact our team for information about luxury apartments in Nathiagali",
              "image": "/images/contact-us.jpg",
              "telephone": "+92-300-1234567",
              "email": "info@theharsukh.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Nathiagali",
                "addressRegion": "KP",
                "addressCountry": "Pakistan"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              }
            }),
          }}
        />
      </Head>

      <main className={styles.main}>
        <h1>Contact Harsukh to Book Your Apartment</h1>
        <p>Have questions? Need help choosing the perfect apartment? Reach out to our team today and we&apos;ll guide you every step of the way.</p>

        <div className={styles.contactContainer}>
          <div className={styles.contactInfo}>
            <h2>Get in Touch</h2>
            <div className={styles.contactMethod}>
              <h3>Sales Office</h3>
              <p>Harsukh Residencies, Nathiagali, Galyat</p>
            </div>
            
            <div className={styles.contactMethod}>
              <h3>Phone</h3>
              <p>+92-300-1234567</p>
              <p>+92-321-7654321</p>
            </div>
            
            <div className={styles.contactMethod}>
              <h3>Email</h3>
              <p>info@theharsukh.com</p>
              <p>sales@theharsukh.com</p>
            </div>
            
            <div className={styles.contactMethod}>
              <h3>Business Hours</h3>
              <p>Monday - Sunday: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
          
          <div className={styles.contactForm}>
            <h2>Send an Inquiry</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Your Name*</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  placeholder="Enter your full name" 
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address*</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  placeholder="Enter your email address" 
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number*</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                  placeholder="Enter your contact number" 
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="apartmentInterest">Interested In</label>
                <select 
                  id="apartmentInterest" 
                  name="apartmentInterest"
                  value={formData.apartmentInterest}
                  onChange={handleChange}
                >
                  <option value="">Select Apartment Type</option>
                  <option value="studio">Studio Apartment</option>
                  <option value="one-bedroom">One Bedroom Apartment</option>
                  <option value="two-bedroom">Two Bedroom Apartment</option>
                  <option value="three-bedroom">Three Bedroom Apartment</option>
                  <option value="penthouse">Penthouse</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message">Message*</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  placeholder="How can we assist you?" 
                  rows="5"
                ></textarea>
              </div>
              
              <button type="submit" className={styles.submitButton}>Send Inquiry</button>
            </form>
          </div>
        </div>
        
        <div className={styles.visitCTA}>
          <h2>Visit Our Site</h2>
          <p>Interested in seeing the property in person? Schedule a site visit with our team to experience the luxury and views firsthand.</p>
          <button className={styles.ctaButton}>Schedule Site Visit</button>
        </div>
      </main>
    </>
  );
}
