import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';

const AboutHero = () => {
    return (
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-sage-deep">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-40">
                <img
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                    alt="Soft therapy space"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center text-sand">
                <nav className="flex justify-center mb-6 text-sm text-sage-light">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <Icon name="ChevronRight" className="w-4 h-4 mx-2" />
                    <span className="text-sand">About Us</span>
                </nav>

                <h1 className="text-4xl md:text-6xl font-serif mb-4 leading-tight">
                    About Our <span className="italic text-terracotta">Healing Journey</span>
                </h1>
                <p className="text-xl md:text-2xl text-sage-light font-light max-w-2xl mx-auto">
                    "Where science meets holistic healing."
                </p>
            </div>
        </section>
    );
};

export default AboutHero;
