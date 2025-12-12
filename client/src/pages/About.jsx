import React from 'react';
import AboutHero from '../components/sections/AboutHero';
import OurStory from '../components/sections/OurStory';
import Experts from '../components/sections/Experts';
import USP from '../components/sections/USP';
import ClinicEnvironment from '../components/sections/ClinicEnvironment';
import Certifications from '../components/sections/Certifications';
import CTASection from '../components/sections/CTASection';

const About = ({ onOpenBooking }) => {
    return (
        <>
            <AboutHero />
            <OurStory />
            <Experts onOpenBooking={onOpenBooking} />
            <USP />
            <ClinicEnvironment />
            <Certifications />
            <CTASection onOpenBooking={onOpenBooking} />
        </>
    );
};

export default About;
