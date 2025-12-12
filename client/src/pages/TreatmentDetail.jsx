import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { treatmentsConfig } from '../data/treatments';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';

const TreatmentDetail = ({ onOpenBooking }) => {
    const { slug } = useParams();
    const treatment = treatmentsConfig[slug];

    if (!treatment) {
        return <Navigate to="/treatments" replace />;
    }

    return (
        <div className="animate-fade-in bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={treatment.image} alt={treatment.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto mt-20">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">{treatment.title}</h1>
                    <p className="text-xl md:text-2xl font-light opacity-90">{treatment.subtitle}</p>
                </div>
                {/* Scroll Down Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/80">
                    <Icon name="ChevronDown" className="w-8 h-8" />
                </div>
            </div>

            {/* Content Section */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-serif text-sage-deep mb-6">About this Therapy</h2>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {treatment.description}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-serif text-sage-deep mb-4 flex items-center gap-2">
                                    <Icon name="Star" className="w-5 h-5 text-terracotta" />
                                    Key Benefits
                                </h3>
                                <ul className="space-y-4">
                                    {treatment.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-700">
                                            <div className="w-1.5 h-1.5 rounded-full bg-sage mt-2"></div>
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Booking Card */}
                        <div className="bg-cream/50 p-8 md:p-10 rounded-2xl border border-sage/10 sticky top-32">
                            <h3 className="text-2xl font-serif text-sage-deep mb-4">Start your journey.</h3>
                            <p className="text-gray-600 mb-8">
                                Experience the healing power of {treatment.title}. Book your initial consultation today.
                            </p>
                            <div className="space-y-4">
                                <Button onClick={() => onOpenBooking(treatment.title)} className="w-full justify-center text-center">
                                    Book Appointment
                                </Button>
                                <p className="text-xs text-center text-gray-500 mt-4">
                                    Unsure if this is right for you? <a href="/contact" className="text-terracotta underline hover:text-terracotta-dark">Contact us</a> for guidance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TreatmentDetail;
