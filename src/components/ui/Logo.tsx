import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: FC<LogoProps> = ({ 
  className = '', 
  showTagline = true,
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: { 
      container: 'h-10 w-10', 
      text: 'text-lg font-semibold', 
      tagline: 'text-[10px]',
      spacing: 'ml-2.5'
    },
    md: { 
      container: 'h-12 w-12', 
      text: 'text-xl font-semibold', 
      tagline: 'text-xs',
      spacing: 'ml-3'
    },
    lg: { 
      container: 'h-16 w-16', 
      text: 'text-2xl font-semibold', 
      tagline: 'text-sm',
      spacing: 'ml-3.5'
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className={`${currentSize.container} relative flex-shrink-0`}>
        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md">
          <Image 
            src="/images/logo.jpg" 
            alt="MI CABS Logo"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 48px, 64px"
            priority
          />
        </div>
      </div>
      <div className={`${currentSize.spacing} flex flex-col justify-center`}>
        <h1 className={`${currentSize.text} text-blue-900 leading-tight tracking-tight`}>
          MI CABS
        </h1>
        {showTagline && (
          <p className={`${currentSize.tagline} text-gray-600 mt-0.5`}>
            Your Travel Partner
          </p>
        )}
      </div>
    </Link>
  );
};

export default Logo;