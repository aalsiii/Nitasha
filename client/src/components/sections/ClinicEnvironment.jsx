import React from 'react';
import SectionTitle from '../ui/SectionTitle';

const ClinicEnvironment = () => {
    return (
        <section className="py-24 bg-cream">
            <div className="container mx-auto px-6">
                <SectionTitle subtitle="Our Sanctuary" title="A Healing Environment" />
                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                    We have curated a space that promotes peace, privacy, and restoration from the moment you step inside.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px] md:h-[500px]">
                    <div className="col-span-2 md:col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                        <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Reception Area" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="col-span-1 md:col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                        <img src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Therapy Room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="col-span-1 md:col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Consultation Room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="col-span-2 md:col-span-2 row-span-1 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                        <img src="https://images.unsplash.com/photo-1581579186913-45ac3e6e3dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Treatment Details" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClinicEnvironment;
