import React, { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import ServiceCard from '../ui/ServiceCard';

const QuickServices = () => {
    const [activeTab, setActiveTab] = useState('body');

    const services = [
        {
            category: 'body',
            iconName: "Activity",
            title: "Marmapuncture",
            desc: "Ayurvedic acupuncture targeting vital energy points to release blockages.",
            price: "from £120"
        },
        {
            category: 'body',
            iconName: "Leaf",
            title: "Ayurvedic Medicine",
            desc: "Personalized nutritional and lifestyle plans based on your unique Dosha.",
            price: "from £150"
        },
        {
            category: 'body',
            iconName: "Zap",
            title: "Biohacking",
            desc: "Optimizing biology with science-backed interventions for peak performance.",
            price: "from £200"
        },
        {
            category: 'mind',
            iconName: "Brain",
            title: "Psychotherapy",
            desc: "Transpersonal therapy for deep healing and mental clarity.",
            price: "from £130"
        },
        {
            category: 'mind',
            iconName: "Music",
            title: "Sound Healing",
            desc: "Vibrational therapy to restore harmonic resonance and reduce stress.",
            price: "from £90"
        },
        {
            category: 'mind',
            iconName: "Sun",
            title: "Meditation Coaching",
            desc: "Guided techniques to cultivate presence and inner peace.",
            price: "from £100"
        }
    ];

    const filteredServices = services.filter(service => service.category === activeTab);

    return (
        <section className="py-24 bg-cream">
            <div className="container mx-auto px-6">
                <SectionTitle subtitle="Quick Services" title="Curated Pathways to Wellness" />

                {/* Category Toggles */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100 inline-flex">
                        <button
                            onClick={() => setActiveTab('body')}
                            className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === 'body' ? 'bg-sage-dark text-white shadow-md' : 'text-gray-500 hover:text-sage-dark'}`}
                        >
                            Body & Clinical
                        </button>
                        <button
                            onClick={() => setActiveTab('mind')}
                            className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === 'mind' ? 'bg-sage-dark text-white shadow-md' : 'text-gray-500 hover:text-sage-dark'}`}
                        >
                            Mind & Spirit
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
                    {filteredServices.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuickServices;
