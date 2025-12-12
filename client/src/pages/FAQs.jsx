import React, { useState } from 'react';

const FAQs = () => {
    // Static FAQs for now, can be moved to DB if needed
    const faqs = [
        {
            question: "What should I expect during my first consultation?",
            answer: "Your initial consultation is a comprehensive assessment where we discuss your medical history, lifestyle, and specific health concerns. This allows Dr. Nitasha to create a personalized treatment plan tailored to your unique needs."
        },
        {
            question: "How do I know which treatment is right for me?",
            answer: "We recommend booking a general consultation if you are unsure. However, you can also explore our treatment pages which describe the benefits of each modality. Dr. Nitasha often combines modalities (like Acupuncture and Ayurveda) for the best results."
        },
        {
            question: "Are the treatments covered by insurance?",
            answer: "Coverage varies depending on your insurance provider and plan. We recommend contacting your insurance company directly to ask about coverage for complementary and alternative medicine practationers."
        },
        {
            question: "Can I book a remote consultation?",
            answer: "Yes, we offer online consultations for Nutritional Healing, Lifestyle Medicine, and initial assessments. Physical treatments like Acupuncture require in-person visits."
        },
        {
            question: "What is Marmapuncture?",
            answer: "Marmapuncture is a unique integration of Ayurveda and Acupuncture. It involves stimulating specific 'Marma' points on the body to clear energy blockages and promote healing, often providing deep relaxation and pain relief."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
                <span className="text-terracotta-dark uppercase tracking-[0.2em] text-sm font-semibold mb-3 block">Got Questions?</span>
                <h1 className="text-4xl md:text-5xl font-serif text-sage-deep mb-6">Frequently Asked Questions</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Find answers to common questions about our practices, treatments, and what to expect on your healing journey.
                </p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm bg-white">
                        <button
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none bg-white hover:bg-gray-50 transition-colors"
                            onClick={() => toggleAccordion(index)}
                        >
                            <span className={`font-serif text-lg ${openIndex === index ? 'text-terracotta-dark' : 'text-sage-deep'}`}>
                                {faq.question}
                            </span>
                            <span className={`transition-transform duration-300 text-gray-400 ${openIndex === index ? 'rotate-180' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </button>
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQs;
