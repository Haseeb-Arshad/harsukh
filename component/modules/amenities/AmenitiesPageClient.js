'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/component/sections/home/navbar';
import Footer from '@/component/sections/home/footer';
import styles from '@/styles/amenity/amenityPage.module.css';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import RegisterRequestForm from '@/component/ui/Bars/contactBox';

const amenityCategories = [
    {
        category: "Wellness & Relaxation",
        description: "Rejuvenate your body and mind with our state-of-the-art wellness facilities.",
        items: [
            { name: "Thermal Pools", description: "Experience hot water thermal pools designed for ultimate relaxation, even in the coldest winters.", image: "https://cdn.theharsukh.com/images/gallery/Lobby/lobby-1.webp" },
            { name: "Fully Equipped Gym", description: "Maintain your fitness routine with top-of-the-line equipment and inspiring mountain views.", image: "https://cdn.theharsukh.com/images/Amenity/Gym.png" },
            { name: "Smart Home Features", description: "Experience the convenience of modern living with integrated smart home technology in every apartment.", image: "https://cdn.theharsukh.com/images/gallery/Lobby/lobby-4.webp" },
        ]
    },
    {
        category: "Dining & Social",
        description: "Experience culinary excellence and social vibrancy in the heart of Galiyat.",
        items: [
            { name: "Rooftop Dining", description: "Exquisite multi-cuisine dining experience with a 360-degree panoramic view of the Galyat valley.", image: "https://cdn.theharsukh.com/images/Amenity/Resturant.png" },
            { name: "Community Lounge", description: "A warm and inviting space designed for residents to connect, relax, and share stories.", image: "https://cdn.theharsukh.com/images/gallery/Lobby/lobby-6.webp" },
        ]
    },
    {
        category: "Nature & Architecture",
        description: "Unique features that blend luxury with the natural beauty of the surroundings.",
        items: [
            { name: "Glass Skywalk", description: "An architectural marvel offering a thrilling glass-bottomed walk with unobstructed valley views.", image: "https://cdn.theharsukh.com/images/gallery/Lobby/Corridor.webp" },
            { name: "Landscaped Gardens", description: "Beautifully manicured alpine gardens providing a serene escape within the residency.", image: "https://cdn.theharsukh.com/images/gallery/Lobby/lobby-2.webp" },
        ]
    },
    {
        category: "Comfort & Security",
        description: "Ensuring your peace of mind and absolute comfort with top-tier services.",
        items: [
            { name: "Dedicated Parking", description: "Multiple levels of secure, easy-access parking for residents and their esteemed guests.", image: "https://cdn.theharsukh.com/images/Amenity/Parking.png" },
            { name: "24/7 Security", description: "Advanced surveillance and professional security personnel ensuring safety at all times.", image: "https://cdn.theharsukh.com/images/gallery/Lobby/lobby-5.webp" },
        ]
    }
];

export default function AmenitiesPageClient() {
    const { isFormOpen, closeForm, openForm, isSuccess, handleSuccess } = useRegisterForm();
    const [isMobile, setIsMobile] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleNavClick = (menuItem) => {
        if (menuItem === 'Home') router.push('/');
        else if (menuItem === 'About') router.push('/about');
        else if (menuItem === 'Developer') router.push('/developer');
        else if (menuItem === 'Blogs') router.push('/blog');
    };

    const openImageModal = (image) => {
        setSelectedImage(image);
        document.body.style.overflow = 'hidden';
    };

    const closeImageModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className={styles.pageWrapper}>
            <Navbar
                currentSection="amenities"
                toggleContactForm={openForm}
                useGreenLogo={true}
                onNavClick={handleNavClick}
            >
                <div className={styles.heroSection}>
                    <Image
                        src="https://cdn.theharsukh.com/images/background/front-view-winter.webp"
                        alt="Harsukh Amenities"
                        layout="fill"
                        className={styles.heroImage}
                        priority
                    />
                    <div className={styles.heroContent}>
                        <h1 className={styles.title}>World-Class Amenities</h1>
                        <p className={styles.subtitle}>Elevating your lifestyle with a perfect blend of modern luxury and natural beauty.</p>
                    </div>
                </div>

                <div className={styles.contentContainer}>
                    {amenityCategories.map((cat, index) => (
                        <div key={index} className={styles.categorySection}>
                            <div className={styles.categoryHeader}>
                                <h2 className={styles.categoryTitle}>{cat.category}</h2>
                                <p className={styles.categoryDesc}>{cat.description}</p>
                            </div>
                            <div className={styles.amenityGrid}>
                                {cat.items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={styles.amenityCard}
                                        onClick={() => openImageModal(item.image)}
                                    >
                                        <div className={styles.cardImageWrapper}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className={styles.cardImage}
                                                quality={100}
                                            />
                                            <div className={styles.zoomOverlay}>
                                                <span>Click to View Image</span>
                                            </div>
                                        </div>
                                        <div className={styles.cardContent}>
                                            <h3 className={styles.itemName}>{item.name}</h3>
                                            <p className={styles.itemDesc}>{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Navbar>
            <Footer />

            {selectedImage && (
                <div className={styles.imageModal} onClick={closeImageModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeModal} onClick={closeImageModal}>×</button>
                        <div className={styles.modalImageWrapper}>
                            <Image
                                src={selectedImage}
                                alt="Amenity Detail"
                                layout="fill"
                                objectFit="contain"
                                quality={100}
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}

            {isFormOpen && (
                <div className={styles.contactFormOverlay}>
                    <RegisterRequestForm onSuccess={handleSuccess} onClose={closeForm} />
                </div>
            )}
        </div>
    );
}
