import React from 'react';

const SectionTitle = ({ subtitle, title, centered = true }) => (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
        <span className="text-terracotta-dark font-semibold tracking-widest text-sm uppercase mb-3 block">
            {subtitle}
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-sage-deep leading-tight">
            {title}
        </h2>
        <div className={`h-1 w-24 bg-terracotta mt-6 ${centered ? 'mx-auto' : ''} rounded-full`}></div>
    </div>
);

export default SectionTitle;
