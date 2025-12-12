import React from 'react';
import { Link } from 'react-router-dom';
import { treatmentsConfig } from '../data/treatments';
import Icon from '../components/ui/Icon';
import Button from '../components/ui/Button';

const TreatmentsOverview = () => {
    return (
        <div className="animate-fade-in bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-sage-dark/10">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Wellness Treatments"
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-sage-dark/40"></div>
                </div>
                <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto mt-20">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Our Treatments</h1>
                    <p className="text-xl md:text-2xl font-light opacity-90">
                        Holistic therapies tailored to your unique journey towards wellness.
                    </p>
                </div>
            </div>

            {/* Treatments Grid */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Object.entries(treatmentsConfig).map(([slug, treatment]) => (
                            <div key={slug} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-sage-dark/10 group-hover:bg-transparent transition-colors z-10"></div>
                                    <img
                                        src={treatment.image}
                                        alt={treatment.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-serif text-sage-deep mb-3 group-hover:text-terracotta transition-colors">
                                        {treatment.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                                        {treatment.description.substring(0, 120)}...
                                    </p>

                                    <div className="pt-6 border-t border-gray-100">
                                        <Link to={`/treatments/${slug}`} className="block">
                                            <Button variant="outline" className="w-full justify-center group-hover:bg-sage group-hover:text-white group-hover:border-sage transition-all">
                                                Discover Benefits
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TreatmentsOverview;
