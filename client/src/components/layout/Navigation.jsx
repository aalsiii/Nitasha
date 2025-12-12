import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const Navigation = ({ isScrolled, onOpenBooking }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState(null);
    const location = useLocation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Determine current section from path
    const currentPage = location.pathname === '/' ? 'home' : location.pathname.substring(1);

    const toggleMobileDropdown = (menu) => {
        setMobileDropdown(mobileDropdown === menu ? null : menu);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
        setIsOpen(false);
    };

    // Determine if we are on a page that needs a dark header or light header
    const isDarkHero = ['about', 'retreats'].includes(currentPage) || location.pathname.startsWith('/treatments');
    // If scrolled, always dark text (white bg). If not scrolled: checks if page has dark hero
    const isTransparent = !isScrolled;

    const textColor = isScrolled ? 'text-sage-deep' : (isDarkHero ? 'text-sand' : 'text-sage-deep');
    const logoColor = isScrolled ? 'text-sage-deep' : (isDarkHero ? 'text-sand' : 'text-sage-deep');

    const navLinks = [
        { name: 'About', path: '/about', type: 'link' },
        { name: 'Treatments', path: '/treatments', type: 'link' },
        { name: 'Retreats', path: 'https://iyogaa.org/', type: 'external' },
        {
            name: 'Resources',
            path: '/resources',
            type: 'dropdown',
            items: ['Blogs', 'FAQs']
        },
        { name: 'Contact', path: '/contact', type: 'link' },
        { name: 'Client Form', path: '/client-form', type: 'link' },
    ];

    if (user && user.isAdmin) {
        navLinks.push({ name: 'Admin', path: '/admin', type: 'link' });
    }

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-sage-dark rounded-full flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
                        <Icon name="Leaf" className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className={`font-serif text-xl font-bold leading-none transition-colors ${logoColor}`}>
                            Dr. Nitasha Buldeo
                        </span>
                        <span className="text-[0.65rem] tracking-[0.2em] uppercase text-terracotta-dark">Integrative Medicine</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <div key={link.name} className="relative group">
                            {link.type === 'dropdown' ? (
                                <button className={`flex items-center gap-1 font-medium text-sm transition-colors py-2 focus:outline-none ${textColor} hover:text-terracotta-dark`}>
                                    {link.name} <Icon name="ChevronDown" className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
                                </button>
                            ) : link.type === 'external' ? (
                                <a
                                    href={link.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`font-medium text-sm transition-colors block py-2 ${textColor} hover:text-terracotta-dark`}
                                >
                                    {link.name} <Icon name="ExternalLink" className="w-3 h-3 inline pb-0.5" />
                                </a>
                            ) : (
                                <Link
                                    to={link.path}
                                    className={`font-medium text-sm transition-colors block py-2 ${location.pathname === link.path ? 'text-terracotta-dark font-semibold' : `${textColor} hover:text-terracotta-dark`}`}
                                >
                                    {link.name}
                                </Link>
                            )}

                            {/* Dropdown Menu Content */}
                            {link.type === 'dropdown' && (
                                <div className="absolute top-full -left-4 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2">
                                        {link.items.map((item) => {
                                            const basePath = link.name === 'Resources' ? '/resources' : '/treatments';
                                            return (
                                                <Link
                                                    key={item}
                                                    to={`${basePath}/${item.toLowerCase().replace(/ /g, '-')}`}
                                                    className="block px-4 py-3 text-sm text-gray-600 hover:text-sage-deep hover:bg-sage-light/30 rounded-lg transition-colors font-medium text-left"
                                                >
                                                    {item}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <Link to="/booking">
                        <Button variant="primary" className="!px-6 !py-2 !text-sm ml-2">
                            Book Appointment
                        </Button>
                    </Link>

                    {user ? (
                        <button onClick={handleLogout} className={`font-medium text-sm transition-colors block py-2 ${textColor} hover:text-terracotta-dark`}>
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className={`font-medium text-sm transition-colors block py-2 ${textColor} hover:text-terracotta-dark`}>
                            Login
                        </Link>
                    )}

                </div>

                {/* Mobile Menu Toggle */}
                <button className={`md:hidden ${textColor}`} onClick={() => setIsOpen(!isOpen)}>
                    <Icon name={isOpen ? "X" : "Menu"} className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-xl p-6 flex flex-col gap-2 md:hidden border-t border-gray-100 animate-fade-in h-[calc(100vh-80px)] overflow-y-auto">
                    {navLinks.map((link) => (
                        <div key={link.name} className="border-b border-gray-50 last:border-0">
                            {link.type === 'dropdown' ? (
                                <button
                                    onClick={() => toggleMobileDropdown(link.name)}
                                    className="w-full flex items-center justify-between text-lg font-serif text-sage-deep py-3"
                                >
                                    {link.name}
                                    <Icon name="ChevronDown" className={`w-4 h-4 transition-transform ${mobileDropdown === link.name ? 'rotate-180' : ''}`} />
                                </button>
                            ) : link.type === 'external' ? (
                                <a
                                    href={link.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full flex items-center justify-between text-lg font-serif text-sage-deep py-3"
                                >
                                    {link.name} <Icon name="ExternalLink" className="w-4 h-4 ml-1 opacity-50" />
                                </a>
                            ) : (
                                <Link
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="w-full flex items-center justify-between text-lg font-serif text-sage-deep py-3"
                                >
                                    {link.name}
                                </Link>
                            )}

                            {link.type === 'dropdown' && mobileDropdown === link.name && (
                                <div className="bg-cream rounded-lg mb-3 px-4 py-2 space-y-2">
                                    {link.items.map((item) => {
                                        const basePath = link.name === 'Resources' ? '/resources' : '/treatments';
                                        return (
                                            <Link
                                                key={item}
                                                to={`${basePath}/${item.toLowerCase().replace(/ /g, '-')}`}
                                                className="block text-sm text-gray-600 py-2 border-b border-gray-100 last:border-0"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                    <Link to="/booking" className="w-full mt-6 block" onClick={() => setIsOpen(false)}>
                        <Button className="w-full justify-center">
                            Book Appointment
                        </Button>
                    </Link>

                    {user ? (
                        <button onClick={handleLogout} className="w-full flex items-center justify-between text-lg font-serif text-sage-deep py-3 border-b border-gray-50 last:border-0 text-left">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-between text-lg font-serif text-sage-deep py-3 border-b border-gray-50 last:border-0">
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navigation;
