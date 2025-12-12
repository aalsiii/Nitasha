import { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

const Icon = ({ name, className = "w-6 h-6", ...props }) => {
    const LucideIcon = LucideIcons[name];

    if (!LucideIcon) {
        return <span className="w-6 h-6 inline-block bg-gray-200"></span>;
    }

    return <LucideIcon className={className} {...props} />;
};

export default Icon;
