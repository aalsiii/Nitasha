import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import Icon from '../ui/Icon';

const AudienceCard = ({ icon, title, desc }) => (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 group hover:-translate-y-1">
        <div className="w-14 h-14 bg-cream rounded-full flex items-center justify-center mb-6 group-hover:bg-terracotta group-hover:text-white transition-colors text-terracotta-dark">
            <Icon name={icon} className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-serif font-bold text-sage-deep mb-3">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
);

const TargetAudience = () => {
    return (
        <section className="py-24 bg-sage-light/30">
            <div className="container mx-auto px-6">
                <SectionTitle subtitle="Who Is This For?" title="Is Integrated Health Right For You?" />

                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    <AudienceCard
                        icon="Briefcase"
                        title="The Overworked Professional"
                        desc="You're successful but exhausted. You deal with burnout, stress, or chronic fatigue and need a sustainable way to reclaim your energy."
                    />
                    <AudienceCard
                        icon="Activity"
                        title="The Chronic Pain Warrior"
                        desc="You've tried everything for your back pain, migraines, or joint issues. You want a solution that addresses the root cause, not just the pain."
                    />
                    <AudienceCard
                        icon="Sparkles"
                        title="The Spiritual Seeker"
                        desc="You feel a disconnect between your body and spirit. You're looking for deep, clear alignment and a practice that honors your energy."
                    />
                </div>
            </div>
        </section>
    );
};

export default TargetAudience;
