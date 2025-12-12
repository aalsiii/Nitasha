import React from 'react';
import Icon from '../ui/Icon';

const CertBadge = ({ title, sub }) => (
    <div className="flex flex-col items-center justify-center text-center p-6 border border-gray-100 rounded-xl hover:shadow-md transition-shadow bg-white">
        <Icon name="Award" className="w-8 h-8 text-terracotta mb-3" />
        <h4 className="font-bold text-sage-deep text-sm">{title}</h4>
        {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
    </div>
);

const Certifications = () => {
    return (
        <section className="py-24 bg-white border-t border-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h3 className="font-serif text-2xl text-sage-deep font-bold mb-2">Accreditations & Associations</h3>
                    <div className="h-1 w-20 bg-terracotta mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <CertBadge title="General Medical Council" sub="Registered Practitioner" />
                    <CertBadge title="Ayurvedic Professionals Assoc." sub="Certified Member" />
                    <CertBadge title="British Society of Lifestyle Medicine" sub="Diplomate" />
                    <CertBadge title="Care Quality Commission" sub="Regulated Provider" />
                </div>
            </div>
        </section>
    );
};

export default Certifications;
