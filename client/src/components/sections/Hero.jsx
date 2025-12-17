import React from 'react';
import Icon from '../ui/Icon';
import Button from '../ui/Button';

const Hero = ({ onOpenBooking }) => (
    <header className="relative h-screen max-h-screen flex items-center pt-20 overflow-hidden bg-sand">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-sage-light rounded-l-[10rem] opacity-60 z-0 transform translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-terracotta rounded-tr-[10rem] opacity-10 z-0"></div>

        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-8 items-center h-full">
            <div className="order-2 md:order-1 space-y-6 animate-fade-in-up flex flex-col justify-center md:pl-24">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 w-fit">
                    <Icon name="Star" className="w-4 h-4 text-terracotta-dark fill-current" />
                    <span className="text-xs font-semibold tracking-wide text-sage-dark uppercase">Holistic Healer & Scientist</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-serif text-sage-deep leading-[1.1]">
                    Harmonize Body, <br />
                    <span className="text-sage-dark italic">Mind</span> & Spirit.
                </h1>
                <p className="text-base text-gray-600 md:w-3/4 leading-relaxed">
                    Dr. Nitasha Buldeo bridges the gap between ancient wisdom and modern biomechanics to activate your body's natural healing intelligence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button onClick={onOpenBooking}>
                        Start Your Journey <Icon name="ArrowRight" className="w-4 h-4" />
                    </Button>
                    <Button variant="outline">Explore Therapies</Button>
                </div>
            </div>
            <div className="order-1 md:order-2 relative animate-fade-in h-full flex items-center justify-center">
                <div className="relative z-10 rounded-t-[12rem] rounded-b-[4rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] max-h-[85vh] w-full max-w-sm md:max-w-2xl">
                    <img src="nitasha-hero.jpg" alt="Dr. Nitasha Buldeo" className="w-full h-full object-cover object-top" />
                </div>
            </div>
        </div>
    </header>
);

export default Hero;
