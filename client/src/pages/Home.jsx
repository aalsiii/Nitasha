import React from 'react';
import Hero from '../components/sections/Hero';
import QuickServices from '../components/sections/QuickServices';
import Philosophy from '../components/sections/Philosophy';
import TargetAudience from '../components/sections/TargetAudience';
import Process from '../components/sections/Process';
import Testimonials from '../components/sections/Testimonials';
import FeaturedBlog from '../components/sections/FeaturedBlog';
import CTASection from '../components/sections/CTASection';

const Home = ({ onOpenBooking }) => {
    return (
        <>
            <Hero onOpenBooking={onOpenBooking} />
            <QuickServices />
            <Philosophy />
            <TargetAudience />
            <Process />
            <Testimonials />
            <FeaturedBlog />
            <CTASection onOpenBooking={onOpenBooking} />
        </>
    );
};

export default Home;
