import React from 'react';

const Logo = ({ className = '', size = 'default' }) => {
  // Set dimensions based on size prop
  let dimensions = {
    small: { width: 40, height: 40, fontSize: 'text-xs' },
    default: { width: 50, height: 50, fontSize: 'text-sm' },
    medium: { width: 60, height: 60, fontSize: 'text-base' },
    large: { width: 80, height: 80, fontSize: 'text-lg' }
  };
  
  const { width, height, fontSize } = dimensions[size] || dimensions.default;
  
  return (
    <div className={`flex items-center ${className}`}>
      {/* Logo SVG */}
      <div className="-mr-2">
        <svg 
          width={width} 
          height={height} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer circle */}
          <circle cx="50" cy="50" r="46" fill="#1E3A5F" stroke="#1E3A5F" strokeWidth="2" />
          
          {/* House roof - emphasized with gradient fill */}
          <path 
            d="M20 50L50 20L80 50" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="url(#roof-gradient)"
          />
          
          {/* Create a subtle roof texture with lines */}
          <path 
            d="M30 45L50 25M40 45L50 35M60 45L50 35M70 45L50 25" 
            stroke="rgba(255,255,255,0.4)" 
            strokeWidth="1.5" 
            strokeLinecap="round"
          />
          
          {/* Roof shingle detail */}
          <path 
            d="M50 20L55 25L50 30L45 25L50 20" 
            fill="#D86A6A" 
            stroke="white" 
            strokeWidth="1"
          />
          
          {/* Mountain peaks */}
          <path 
            d="M35 75L45 55L55 65L65 45" 
            stroke="#D86A6A" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          
          {/* Chimney */}
          <rect 
            x="65" 
            y="30" 
            width="8" 
            height="12" 
            fill="white" 
            rx="1"
          />
          
          {/* House base */}
          <path 
            d="M30 50V75H70V50" 
            stroke="white" 
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          
          {/* Window */}
          <rect 
            x="45" 
            y="58" 
            width="10" 
            height="10" 
            rx="2" 
            fill="#D86A6A"
          />
          
          {/* Define the roof gradient */}
          <defs>
            <linearGradient id="roof-gradient" x1="50" y1="20" x2="50" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#D86A6A" stopOpacity="0.8" />
              <stop offset="1" stopColor="#D86A6A" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Text part of the logo */}
      <div className="flex flex-col pt-1">
        <span className={`font-bold leading-none text-white tracking-wider ${fontSize}`}>SUMMIT</span>
        <span className={`font-semibold leading-none text-cta ${fontSize}`}>ROOFING</span>
      </div>
    </div>
  );
};

export default Logo;