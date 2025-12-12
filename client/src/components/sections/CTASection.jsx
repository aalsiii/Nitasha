import React from 'react';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

const CTASection = ({ onOpenBooking }) => {
    return (
        <section className="py-24 bg-sage-deep relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-terracotta rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-sage-light rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">
                    Your Healing Journey <span className="text-terracotta italic">Begins Here.</span>
                </h2>
                <p className="text-sage-light text-lg mb-10 max-w-2xl mx-auto">
                    Take the first step towards a vibrant, balanced life. Our integrated approach ensures you are heard, understood, and healed.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button onClick={onOpenBooking} className="bg-terracotta hover:bg-terracotta-dark text-white shadow-xl hover:shadow-2xl">
                        Book Consultation
                    </Button>
                    <Button variant="outline" className="border-sage-light text-sage-light hover:bg-white hover:text-sage-deep">
                        <Icon name="MessageCircle" className="w-5 h-5" /> WhatsApp Now
                    </Button>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-white/60 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p>Limited daily consultation slots available</p>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
