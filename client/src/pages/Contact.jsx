import React from 'react';
import Icon from '../components/ui/Icon';

const Contact = () => (
    <div className="animate-fade-in bg-cream min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="text-center p-12">
            <div className="w-20 h-20 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Mail" className="w-10 h-10 text-sage-dark" />
            </div>
            <h2 className="text-4xl font-serif text-sage-deep mb-4">Get in Touch</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
                We are currently accepting new patients. Please use the booking form or contact us directly.
            </p>
            <p className="text-xl font-medium text-terracotta-dark">hello@drnitasha.com</p>
        </div>
    </div>
);

export default Contact;
