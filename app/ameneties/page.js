import React from 'react';
import AmenitiesPageClient from '@/component/modules/amenities/AmenitiesPageClient';

export const metadata = {
    title: 'World-Class Amenities | Thermal Pools & Skywalk in Ayubia',
    description: 'Experience Pakistan\'s first residential thermal pools, glass skywalks, and rooftop dining. Luxury living with 24/7 security and heating.',
    alternates: {
        canonical: 'https://theharsukh.com/ameneties',
    },
    openGraph: {
        title: 'World-Class Amenities | Thermal Pools & Skywalk in Ayubia',
        description: 'Experience Pakistan\'s first residential thermal pools, glass skywalks, and rooftop dining. Luxury living with 24/7 security and heating.',
        url: 'https://theharsukh.com/ameneties',
        type: 'website',
    },
};

const Page = () => {
    return <AmenitiesPageClient />;
};

export default Page;
