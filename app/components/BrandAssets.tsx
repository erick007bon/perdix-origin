export const MainLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00D4FF" />
        <stop offset="50%" stopColor="#9F4BFF" />
        <stop offset="100%" stopColor="#FF2E9E" />
      </linearGradient>
      <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Correct 8-Point Compass Rose Star */}
    <path 
      d="M50 0 L60 35 L85 15 L65 40 L100 50 L65 60 L85 85 L60 65 L50 100 L40 65 L15 85 L35 60 L0 50 L35 40 L15 15 L40 35 Z" 
      stroke="url(#neonGrad)" 
      strokeWidth="2"
      fill="rgba(0, 0, 0, 0.6)"
      filter="url(#neonGlow)"
    />
    
    {/* Inner Star Lines for Detail */}
    <path 
        d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22"
        stroke="url(#neonGrad)"
        strokeWidth="0.5"
        opacity="0.6"
    />

    {/* Stylized Partridge (Centered & Scaled) */}
    <g transform="translate(32, 32) scale(0.36)">
        <path
        d="M70 20 C 65 15, 60 15, 55 20 C 50 15, 45 20, 45 25 C 45 30, 50 35, 40 40 C 20 50, 10 70, 20 80 L 30 85 L 40 75 L 45 85 L 50 75 C 60 75, 75 65, 80 50 C 85 40, 80 30, 75 25 C 70 20, 75 20, 70 20 Z"
        fill="url(#neonGrad)"
        fillOpacity="1"
        stroke="white"
        strokeWidth="2"
        />
    </g>
  </svg>
);

export const PartridgeWatermark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M70 20 C 65 15, 60 15, 55 20 C 50 15, 45 20, 45 25 C 45 30, 50 35, 40 40 C 20 50, 10 70, 20 80 L 30 85 L 40 75 L 45 85 L 50 75 C 60 75, 75 65, 80 50 C 85 40, 80 30, 75 25 C 70 20, 75 20, 70 20 Z" />
  </svg>
);

export const StarWatermark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="starGradBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00D4FF" />
        <stop offset="50%" stopColor="#9F4BFF" />
        <stop offset="100%" stopColor="#FF2E9E" />
      </linearGradient>
    </defs>
    {/* 8-Pointed Star Geometry (Matches Main Logo) */}
    <path 
      d="M50 0 L60 35 L85 15 L65 40 L100 50 L65 60 L85 85 L60 65 L50 100 L40 65 L15 85 L35 60 L0 50 L35 40 L15 15 L40 35 Z" 
      stroke="url(#starGradBg)" 
      strokeWidth="0.5"
      fill="none"
      opacity="0.4"
    />
     <path 
        d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22"
        stroke="url(#starGradBg)"
        strokeWidth="0.2"
        opacity="0.3"
    />
  </svg>
);
