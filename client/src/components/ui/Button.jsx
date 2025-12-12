import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "px-8 py-3 rounded-full transition-all duration-300 font-medium tracking-wide flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer";
    const variants = {
        primary: `bg-sage-dark text-white hover:bg-sage-deep shadow-lg hover:shadow-xl`,
        secondary: `bg-terracotta text-white hover:bg-terracotta-dark shadow-md`,
        outline: `border-2 border-sage-dark text-sage-dark hover:bg-sage-dark hover:text-white`,
        ghost: `text-sage-deep hover:bg-sage-light`,
    };

    return (
        <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
