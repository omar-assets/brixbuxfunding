import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'light' | 'dark' | 'light-transparent';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  className?: string;
  showText?: boolean;
}

export default function Logo({ 
  variant = 'dark', 
  size = 'md', 
  className,
  showText = true 
}: LogoProps) {
  const sizeClasses: Record<'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl', string> = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
    '2xl': 'h-20 w-20',
    '3xl': 'h-24 w-24',
    '4xl': 'h-28 w-28',
    '5xl': 'h-32 w-32',
    '6xl': 'h-40 w-40',
    '7xl': 'h-48 w-48'
  };

  const textSizeClasses: Record<'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl', string> = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
    '2xl': 'text-5xl',
    '3xl': 'text-6xl',
    '4xl': 'text-7xl',
    '5xl': 'text-8xl',
    '6xl': 'text-9xl',
    '7xl': 'text-10xl'
  };

  const logoSrc = variant === 'dark' 
    ? '/logos/fundinglogodark_transparentbg.png'
    : variant === 'light-transparent' 
      ? '/logos/fundinglogowhite_transparentbg.png'
      : '/logos/fundinglogowhite_darkbg.png';

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <img 
        src={logoSrc}
        alt="BRIXBUX Funding Logo"
        className={cn(
          'logo-image transition-opacity duration-500',
          sizeClasses[size]
        )}
        loading="lazy"
      />
      {showText && (
        <span className={cn(
          'font-semibold tracking-tight transition-colors',
          textSizeClasses[size],
          variant === 'dark' ? 'text-gray-900' : 'text-white'
        )}>
          BRIXBUX Funding
        </span>
      )}
    </div>
  );
} 