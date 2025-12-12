import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';

const Footer = ({ onNavigate }) => (
    <footer className="bg-sage-deep text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-terracotta rounded-full flex items-center justify-center text-white">
                            <Icon name="Leaf" className="w-4 h-4" />
                        </div>
                        <span className="font-serif text-xl font-bold">Dr. Nitasha Buldeo</span>
                    </div>
                    <p className="text-sage-light text-sm leading-relaxed">
                        Integrative medicine combines the best of modern science with ancient healing wisdom.
                    </p>
                </div>

                <div>
                    <h4 className="font-serif text-lg mb-6 text-terracotta">Explore</h4>
                    <ul className="space-y-3 text-sm text-sage-light">
                        <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link to="/about" className="hover:text-white transition-colors">About Dr. Nitasha</Link></li>
                        <li><Link to="/treatments" className="hover:text-white transition-colors">Treatments</Link></li>
                        <li><Link to="/client-form" className="hover:text-white transition-colors">New Patient Form</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-serif text-lg mb-6 text-terracotta">Legal</h4>
                    <ul className="space-y-3 text-sm text-sage-light">
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-serif text-lg mb-6 text-terracotta">Connect</h4>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full border border-sage-light flex items-center justify-center hover:bg-terracotta hover:border-terracotta transition-colors">
                            <Icon name="Instagram" className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-sage-light flex items-center justify-center hover:bg-terracotta hover:border-terracotta transition-colors">
                            <Icon name="Linkedin" className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-sage-light flex items-center justify-center hover:bg-terracotta hover:border-terracotta transition-colors">
                            <Icon name="Facebook" className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-xs text-sage-light">
                © 2024 Dr. Nitasha Buldeo. All rights reserved.
            </div>
        </div>
    </footer>
);

export default Footer;
