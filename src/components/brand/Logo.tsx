import React from 'react';

export interface LogoProps {
  className?: string;
  variant?: 'default' | 'maroon' | 'light' | 'white' | 'black';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  symbolOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'default',
  size = 'md',
  symbolOnly = false
}) => {
  // Height sizing mapping for logo
  const heightMap = {
    xs: 'h-5',        // 20px
    sm: 'h-6 sm:h-7', // 24-28px
    md: 'h-7 sm:h-8.5', // 28-34px (Sleek & Pro size)
    lg: 'h-9 sm:h-10', // 36-40px
    xl: 'h-11 sm:h-12'// 44-48px
  };

  // Sizing mapping for round icon symbol
  const symbolMap = {
    xs: 'w-6 h-6',
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14'
  };

  if (symbolOnly) {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src="/icon.png"
          alt="enteya symbol"
          className={`object-contain transition-transform duration-300 group-hover:scale-105 ${symbolMap[size]}`}
        />
      </div>
    );
  }

  // Select base logo asset with clean CSS variant filters
  const logoSrc = '/images/logo.png';
  let variantClasses = '';
  if (variant === 'white') {
    variantClasses = 'brightness-0 invert';
  } else if (variant === 'light') {
    variantClasses = 'brightness-0 invert opacity-90';
  } else if (variant === 'maroon') {
    variantClasses = 'filter drop-shadow';
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="enteya luxury jewellery"
        className={`object-contain transition-transform duration-300 group-hover:scale-[1.03] ${heightMap[size]} ${variantClasses}`}
      />
    </div>
  );
};
