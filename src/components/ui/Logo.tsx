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
    sm: { container: 'h-10 w-10', text: 'text-xl', tagline: 'text-xs' },
    md: { container: 'h-12 w-12', text: 'text-2xl', tagline: 'text-xs' },
    lg: { container: 'h-16 w-16', text: 'text-3xl', tagline: 'text-sm' },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className={`${currentSize.container} relative rounded-full overflow-hidden border-2 border-white shadow-md`}>
        <Image 
          src="/images/logo.jpg" 
          alt="MiCabs Logo"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 48px, 64px"
        />
      </div>
      <div className="ml-3">
        <h1 className={`${currentSize.text} font-bold text-blue-900`}>MiCabs</h1>
        {showTagline && (
          <p className={`${currentSize.tagline} text-gray-600`}>Your Travel Partner</p>
        )}
      </div>
    </Link>
  );
};

export default Logo;
