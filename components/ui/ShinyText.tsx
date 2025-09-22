import React from 'react';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number; // seconds for one shine pass
    className?: string; // additional classes for sizing/weight
    baseColor?: string; // visible base color (default: light gray)
}

const ShinyText: React.FC<ShinyTextProps> = ({
    text,
    disabled = false,
    speed = 5,
    className = '',
    baseColor = '#d1d5db', // tailwind gray-300
}) => {
    const animationDuration = `${speed}s`;

    return (
        <span className={`relative inline-block ${className}`}>
            {/* Base visible text */}
            <span style={{ color: baseColor }}>{text}</span>
            {/* Animated shine overlay (clipped to text) */}
            {!disabled && (
                <span
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none animate-shine"
                    style={{
                        color: 'transparent',
                        WebkitTextFillColor: 'transparent',
                        backgroundImage:
                            'linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 60%)',
                        backgroundSize: '200% 100%',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        animationDuration,
                    }}
                >
                    {text}
                </span>
            )}
        </span>
    );
};

export default ShinyText;