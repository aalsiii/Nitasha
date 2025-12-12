import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import Icon from '../ui/Icon';

const TestimonialCard = ({ quote, author, role }) => (
    <div className="bg-sand/30 p-8 rounded-2xl relative">
        <Icon name="Quote" className="w-8 h-8 text-terracotta/40 mb-4" />
        <p className="text-lg text-sage-deep italic mb-6 leading-relaxed">
            "{quote}"
        </p>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sage-dark rounded-full flex items-center justify-center text-white font-serif font-bold">
                {author[0]}
            </div>
            <div>
                <h4 className="font-bold text-sage-deep text-sm">{author}</h4>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{role}</p>
            </div>
        </div>
    </div>
);

const Testimonials = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <SectionTitle subtitle="Patient Stories" title="Transformative Journeys" />

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <TestimonialCard
                        quote="I came to Dr. Nitasha with chronic back pain that no one else could fix. After just three sessions of Marmapuncture and lifestyle changes, I feel like a new person."
                        author="Sarah Jenkins"
                        role="Yoga Teacher"
                    />
                    <TestimonialCard
                        quote="The combination of medical knowledge and spiritual depth is rare. Dr. Nitasha didn't just treat my symptoms; she helped me understand my body."
                        author="James Thorne"
                        role="Executive Director"
                    />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
