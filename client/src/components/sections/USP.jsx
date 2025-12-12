import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import Icon from '../ui/Icon';

const FeatureCard = ({ icon, title, description, color }) => {
    // Dynamic color classes
    const bgColors = {
        sage: 'bg-sage-light/20',
        terracotta: 'bg-terracotta/10',
        cream: 'bg-sand'
    };

    const iconColors = {
        sage: 'text-sage-dark',
        terracotta: 'text-terracotta',
        cream: 'text-sage-deep'
    };

    return (
        <div className={`p-8 rounded-3xl border border-transparent ${bgColors[color]}`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${iconColors[color]} bg-white shadow-sm`}>
                <Icon name={icon} className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-3 text-sage-deep">{title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm font-medium">
                {description}
            </p>
        </div>
    );
};

const USP = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <SectionTitle subtitle="Why Choose Us?" title="The Integrated Difference" />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 px-4 md:px-0">
                    <FeatureCard
                        icon="Fingerprint"
                        title="Hyper-Personalized"
                        description="No two bodies are the same. We map your treatment to your unique biology, history, and energy signature."
                        color="sage"
                    />
                    <FeatureCard
                        icon="Users"
                        title="Doctor + Therapist"
                        description="A rare collaboration where a medical doctor and holistic therapist co-design your healing roadmap."
                        color="cream"
                    />
                    <FeatureCard
                        icon="Microscope"
                        title="Root-Cause Focus"
                        description="We don't just manage symptoms. We act as detectives to find and treat the underlying origin of your pain."
                        color="sage"
                    />
                    <FeatureCard
                        icon="Shield"
                        title="Safe & Gentle"
                        description="Rigorous safety protocols make our treatments suitable for pregnancy, chronic illness, and sensitive conditions."
                        color="cream"
                    />
                    <FeatureCard
                        icon="TrendingUp"
                        title="Long-Term Results"
                        description="Our goal is independence, not dependency. We give you the tools and support to sustain your own health."
                        color="sage"
                    />
                    <FeatureCard
                        icon="Infinity"
                        title="Science Meets Soul"
                        description="We prove that evidence-based medicine and ancient spiritual wisdom are not opposites—they are partners."
                        color="cream"
                    />
                </div>
            </div>
        </section>
    );
};

export default USP;
