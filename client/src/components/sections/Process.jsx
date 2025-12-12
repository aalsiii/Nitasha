import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import Icon from '../ui/Icon';

const Step = ({ number, title, desc, icon }) => (
    <div className="flex flex-col items-center text-center relative z-10">
        <div className="w-16 h-16 bg-white border-2 border-sage-light rounded-full flex items-center justify-center text-terracotta mb-4 shadow-sm relative group hover:scale-110 transition-transform duration-300">
            <Icon name={icon} className="w-8 h-8" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-sage-deep text-white rounded-full flex items-center justify-center font-serif text-sm border-2 border-white">
                {number}
            </div>
        </div>
        <h3 className="text-xl font-serif font-bold text-sage-deep mb-2">{title}</h3>
        <p className="text-gray-600 text-sm max-w-xs">{desc}</p>
    </div>
);

const Process = () => {
    return (
        <section className="py-24 bg-cream relative overflow-hidden">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[calc(50%+1rem)] left-0 w-full h-0.5 bg-sage-light/50 -translate-y-[4rem]"></div>

            <div className="container mx-auto px-6 relative z-10">
                <SectionTitle subtitle="How It Works" title="Your Path to Healing" />

                <div className="grid md:grid-cols-4 gap-12 mt-16">
                    <Step
                        number="1"
                        title="Book Appointment"
                        desc="Choose a time that suits you for an in-person or online consultation."
                        icon="Calendar"
                    />
                    <Step
                        number="2"
                        title="In-Depth Assessment"
                        desc="We explore your history, biomechanics, and energy to find the root cause."
                        icon="Stethoscope"
                    />
                    <Step
                        number="3"
                        title="Personalised Plan"
                        desc="Receive a tailored roadmap integrating therapies, nutrition, and lifestyle."
                        icon="ClipboardList"
                    />
                    <Step
                        number="4"
                        title="Healing & Follow-up"
                        desc="Begin your treatment and track your progress with regular check-ins."
                        icon="Smile"
                    />
                </div>
            </div>
        </section>
    );
};

export default Process;
