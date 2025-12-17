import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import philosophyImage from '../../assets/philosophy.jpg';

const Philosophy = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1 relative">
                    <div className="absolute inset-0 bg-terracotta rounded-full opacity-10 blur-3xl transform -translate-x-10 scale-90"></div>
                    <div className="relative z-10 rounded-t-[10rem] rounded-b-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
                        <img
                            src={philosophyImage}
                            alt="Dr. Nitasha Buldeo treating a patient"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-6 -right-6 z-20 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block border border-gray-50">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-12 bg-sage-light rounded-full flex items-center justify-center text-sage-dark">
                                <Icon name="Heart" className="w-6 h-6 fill-current" />
                            </div>
                            <div>
                                <p className="text-2xl font-serif font-bold text-sage-deep">15+</p>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Years Experience</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="order-1 md:order-2">
                    <SectionTitle subtitle="Our Philosophy" title="Bridging Science & Soul" centered={false} />

                    <div className="space-y-6 text-gray-600 leading-relaxed mb-8">
                        <p>
                            Unlike traditional clinics that often treat symptoms in isolation, we see you as a complete, interconnected being. Dr. Nitasha Buldeo combines her rigor as a medical scientist with the intuitive wisdom of ancient healing arts.
                        </p>
                        <p>
                            We don't just ask "what hurts?"—we ask "why?" By integrating advanced biomechanics with Ayurvedic principles and energy medicine, we unlock your body's innate capacity to heal itself.
                        </p>
                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="flex items-center gap-3">
                                <Icon name="CheckCircle2" className="w-5 h-5 text-terracotta" />
                                <span className="font-medium text-sage-deep">Data-Driven</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon name="CheckCircle2" className="w-5 h-5 text-terracotta" />
                                <span className="font-medium text-sage-deep">Deeply Holistic</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon name="CheckCircle2" className="w-5 h-5 text-terracotta" />
                                <span className="font-medium text-sage-deep">Personalized</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Icon name="CheckCircle2" className="w-5 h-5 text-terracotta" />
                                <span className="font-medium text-sage-deep">Root-Cause Focused</span>
                            </div>
                        </div>
                    </div>

                    <Link to="/about">
                        <Button>
                            Meet Our Experts <Icon name="ArrowRight" className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Philosophy;
