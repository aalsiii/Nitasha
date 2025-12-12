import React, { useState } from 'react';
import BookingModal from '../components/features/booking/BookingModal';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';

const Booking = ({ onOpenBooking }) => {
    const [activeTab, setActiveTab] = useState('london');

    const locations = {
        london: {
            title: 'London Clinic',
            subtitle: 'Harley Street District',
            description: 'Experience our premium holistic treatments in the heart of London’s medical district. Our serene clinic offers a sanctuary from the urban bustle.',
            image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop', // Modern clean clinic
            services: [
                {
                    name: 'First Consult',
                    duration: '40 mins',
                    price: '£110',
                    details: 'A comprehensive health review & treatment plan formulation. Includes initial treatment (time permitting) such as Acupuncture, Ayurveda, or Nutritional Healing.',
                },
                {
                    name: 'Follow-Up Session',
                    duration: '20 mins',
                    price: '£65',
                    details: 'Review of progress, administration of treatment, and adjustment of the health plan.',
                }
            ]
        },
        bedford: {
            title: 'Bedford Clinic',
            subtitle: 'Riverside Wellness Centre',
            description: 'Visit our dedicated clinic space in Bedford for focused healing in a calm, grounded environment.',
            image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop', // Peaceful plant vibes
            services: [
                {
                    name: 'First Consult',
                    duration: '40 mins',
                    price: '£65',
                    details: 'A comprehensive health review & treatment plan formulation. Includes initial treatment (time permitting) such as Acupuncture, Ayurveda, or Nutritional Healing.',
                },
                {
                    name: 'Follow-Up Session',
                    duration: '20 mins',
                    price: '£45',
                    details: 'Review of progress, administration of treatment, and adjustment of the health plan.',
                }
            ]
        },
        virtual: {
            title: 'Virtual / Online',
            subtitle: 'Global Access',
            description: 'Expert consultation from the comfort of your own home, accessible from anywhere in the world.',
            image: 'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?q=80&w=2671&auto=format&fit=crop', // Cozy laptop/plant setting
            services: [
                {
                    name: 'First Consult',
                    duration: '40 mins',
                    price: '£65',
                    details: 'Deep dive into your health history via secure video call. Perfect for Herbal Medicine, Homeopathy, and Psychotherapy consultations.',
                },
                {
                    name: 'Follow-Up Session',
                    duration: '30 mins',
                    price: '£45',
                    details: 'Review of progress and adjustment of herbal or lifestyle prescriptions.',
                }
            ]
        }
    };

    const activeLocation = locations[activeTab];

    return (
        <div className="min-h-screen bg-cream pt-24 pb-20 font-sans">
            {/* Header */}
            <div className="container mx-auto px-6 mb-12 text-center pt-10">
                <span className="text-terracotta-dark uppercase tracking-[0.2em] text-xs md:text-sm font-bold animate-fade-in">Appointments</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-sage-deep mt-4 mb-6 leading-tight animate-fade-in-up">
                    Begin Your Healing Journey
                </h1>
            </div>

            {/* Tabs / Navigation */}
            <div className="container mx-auto px-6 mb-12">
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 border-b border-gray-200 pb-1">
                    {Object.keys(locations).map((key) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`pb-4 text-lg md:text-xl font-serif transition-all duration-300 relative px-4 ${activeTab === key
                                ? 'text-sage-deep font-medium'
                                : 'text-gray-400 hover:text-sage-DEFAULT'
                                }`}
                        >
                            {locations[key].title}
                            {activeTab === key && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-terracotta-dark animate-fade-in"></span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-6 max-w-6xl min-h-[600px] animate-fade-in" key={activeTab}>
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* Left: Info & Description */}
                    <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-px bg-terracotta-dark"></div>
                                <span className="text-terracotta-dark uppercase tracking-widest text-xs font-semibold">{activeLocation.subtitle}</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif text-sage-deep mb-6 leading-tight">{activeLocation.title}</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {activeLocation.description}
                            </p>
                        </div>

                        {/* Visual element - Location Image */}
                        <div className="aspect-[4/5] bg-sage-light/30 rounded-2xl overflow-hidden relative hidden md:block shadow-lg">
                            <img
                                src={activeLocation.image}
                                alt={activeLocation.title}
                                className="w-full h-full object-cover animate-fade-in"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            <div className="absolute inset-x-0 bottom-0 p-8">
                                <p className="text-white/90 italic font-serif text-lg">"Healing begins with the first step."</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Service List */}
                    <div className="lg:col-span-7 space-y-6">
                        {activeLocation.services.map((service, index) => (
                            <div
                                key={service.name}
                                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-sage-light group-hover:bg-terracotta transition-colors"></div>

                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="text-2xl font-serif text-sage-deep group-hover:text-terracotta-dark transition-colors">{service.name}</h3>
                                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                            <Icon name="Clock" className="w-4 h-4" />
                                            <span>{service.duration}</span>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-serif text-sage-deep">
                                        {service.price}
                                    </div>
                                </div>

                                <p className="text-gray-600 leading-relaxed mb-6 border-t border-gray-50 pt-4">
                                    {service.details}
                                </p>

                                <div className="flex justify-end">
                                    <Button onClick={onOpenBooking} className="group-hover:translate-x-1 transition-transform">
                                        Book Now <Icon name="ArrowRight" className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        <div className="bg-sage-light/20 p-6 rounded-xl border border-sage-light/30 mt-8 flex items-start gap-4">
                            <Icon name="Info" className="w-6 h-6 text-sage-dark flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-serif text-sage-deep text-lg mb-1">Not sure what to book?</h4>
                                <p className="text-gray-600 text-sm mb-3">
                                    If you are a new patient with complex history, we recommend the <strong>First Consult (40 mins)</strong> to ensure adequate time for assessment.
                                </p>
                                <a href="/contact" className="text-terracotta-dark text-sm font-semibold hover:underline">Contact us for advice &rarr;</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
