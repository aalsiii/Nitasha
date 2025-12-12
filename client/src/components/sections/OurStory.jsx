import React from 'react';
import SectionTitle from '../ui/SectionTitle';

const StoryChapter = ({ title, subtitle, description, image, align = 'left', color = 'terracotta' }) => {
    // Dynamic color handling
    const dotColor = color === 'sage' ? 'bg-sage-dark' : 'bg-terracotta';
    const lineColor = color === 'sage' ? 'bg-sage-dark/30' : 'bg-terracotta/30';

    return (
        <div className={`flex flex-col md:flex-row items-stretch gap-6 md:gap-8 mb-0 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
            {/* Image Side */}
            <div className="w-full md:w-5/12 relative group py-8">
                <div className="absolute inset-0 bg-sage-dark/10 transform translate-x-4 translate-y-4 rounded-3xl transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
            </div>

            {/* Timeline Line & Dot */}
            <div className="hidden md:flex flex-col items-center justify-center relative w-1/12">
                <div className={`h-full w-px absolute top-0 bottom-0 ${lineColor}`}></div>

                {/* Horizontal Connector & Dot Wrapper - Centered Vertically */}
                <div className="h-full flex items-center justify-center w-full relative">

                    {/* Horizontal Line */}
                    {/* If align left (Text Right), line goes Right. If align right (Text Left), line goes Left */}
                    <div className={`h-px w-1/2 absolute top-1/2 ${lineColor} ${align === 'left' ? 'left-1/2' : 'right-1/2'}`}></div>

                    {/* Center Anchor Dot (Small) */}
                    <div className={`w-3 h-3 rounded-full ${dotColor} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-sm`}></div>

                    {/* Main Theme Dot (at the end of the connector) */}
                    <div className={`w-4 h-4 rounded-full shadow-md z-10 absolute top-1/2 transform -translate-y-1/2 ${dotColor} ${align === 'left' ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`}>
                        <div className={`absolute inset-0 animate-ping opacity-20 rounded-full ${dotColor}`}></div>
                    </div>
                </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-5/12 relative flex flex-col justify-center py-8">
                <span className={`block font-serif text-lg italic mb-2 ${color === 'sage' ? 'text-sage-dark' : 'text-terracotta'}`}>{subtitle}</span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-sage-deep mb-6 leading-tight">
                    {title}
                </h3>
                <div className={`h-1 w-20 mb-6 ${color === 'sage' ? 'bg-sage-light' : 'bg-terracotta/30'}`}></div>
                <p className="text-gray-600 leading-relaxed text-lg">
                    {description}
                </p>
            </div>
        </div>
    );
};

const OurStory = () => {
    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-6">
                <SectionTitle subtitle="Our Journey" title="Bringing the Vision to Life" />

                <div className="max-w-6xl mx-auto mt-20">
                    <p className="text-center text-xl text-sage-deep font-light mb-24 max-w-3xl mx-auto leading-relaxed">
                        "We didn't just want to build a clinic. We wanted to build a bridge—between the science you trust and the healing you feel."
                    </p>

                    <StoryChapter
                        align="left"
                        color="sage"
                        subtitle="The Beginning"
                        title="Science Meets Soul"
                        image="https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        description="It started in a research lab. Dr. Nitasha, surrounded by data, realized that biochemical markers couldn't explain why some patients healed against the odds. The missing variable wasn't in the microscope—it was in the spirit."
                    />

                    <StoryChapter
                        align="right"
                        color="sage"
                        subtitle="The Evolution"
                        title="Ancient Wisdom, Modern Proof"
                        image="https://images.unsplash.com/photo-1600618528240-fb9fc964b853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        description="Years were spent decoding Ayurveda through the lens of biomechanics. We stripped away the mysticism to find the mechanism, creating a protocol where energy work is grounded in physiology."
                    />

                    <StoryChapter
                        align="left"
                        color="sage"
                        subtitle="The Sanctuary"
                        title="A Space for Wholeness"
                        image="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        description="In 2015, we opened our doors. No sterile white walls, no rushed appointments. We built a sanctuary where you are heard, seen, and treated as a complete human being."
                    />

                    <div className="text-center mt-20 bg-sage-light/20 p-12 rounded-3xl">
                        <h3 className="text-3xl font-serif font-bold text-sage-deep mb-4">Join Our Story</h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                            We are writing the next chapter with every patient we heal. Be part of a community that chooses vibrancy over just surviving.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;
