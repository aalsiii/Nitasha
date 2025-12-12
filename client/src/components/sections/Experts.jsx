import React from 'react';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

const ExpertCard = ({ image, name, designation, qualifications, experience, specialisation, mode, onConsult }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
        <div className="relative aspect-[3/4] overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-sage-deep/90 via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xs font-semibold tracking-wider uppercase mb-1 opacity-90">{designation}</p>
                <h3 className="text-2xl font-serif font-bold">{name}</h3>
            </div>
        </div>
        <div className="p-6">
            <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                    <Icon name="GraduationCap" className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                    <span>{qualifications}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Icon name="Clock" className="w-4 h-4 text-terracotta shrink-0" />
                    <span>{experience} Experience</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-600">
                    <Icon name="Heart" className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                    <span>{specialisation}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Icon name="Video" className="w-4 h-4 text-terracotta shrink-0" />
                    <span>{mode}</span>
                </div>
            </div>
            <Button onClick={onConsult} className="w-full justify-center">
                Consult This Doctor
            </Button>
        </div>
    </div>
);

const Experts = ({ onOpenBooking }) => {
    return (
        <section className="py-24 bg-sage-light/20">
            <div className="container mx-auto px-6">
                <SectionTitle subtitle="Meet Our Experts" title="Guides on Your Healing Path" />

                <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mt-12">
                    <ExpertCard
                        image="https://images.unsplash.com/photo-1544367563-12123d896889?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        name="Dr. Nitasha Buldeo"
                        designation="Natural Medicine Expert"
                        qualifications="PhD in Biomedical Science, Ayurveda Acharya"
                        experience="15+ Years"
                        specialisation="Integrated Health, Marmapuncture, Biohacking"
                        mode="In-Clinic & Online"
                        onConsult={onOpenBooking}
                    />
                    <ExpertCard
                        image="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        name="Dr. Vishal Naidoo"
                        designation="Primary Care Physician"
                        qualifications="MBBS, MRCGP (UK)"
                        experience="12+ Years"
                        specialisation="General Practice, Chronic Disease Management, Preventative Care"
                        mode="Online Consultation"
                        onConsult={onOpenBooking}
                    />
                </div>
            </div>
        </section>
    );
};

export default Experts;
