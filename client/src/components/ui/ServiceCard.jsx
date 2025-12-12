import React from 'react';
import Icon from './Icon';

const ServiceCard = ({ iconName, title, desc, price }) => (
    <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-terracotta/30 relative overflow-hidden cursor-pointer">
        <div className="absolute top-0 right-0 bg-sage-light w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
        <div className="relative z-10">
            <div className="w-14 h-14 bg-sage-dark/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-sage-dark transition-colors">
                <Icon name={iconName} className="w-7 h-7 text-sage-dark group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-serif font-bold text-sage-deep mb-3">{title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm">{desc}</p>
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-terracotta-dark font-semibold">{price}</span>
                <span className="text-sage-dark font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More <Icon name="ArrowRight" className="w-4 h-4" />
                </span>
            </div>
        </div>
    </div>
);

export default ServiceCard;
