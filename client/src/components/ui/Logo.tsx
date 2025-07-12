import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'light' | 'dark' | 'light-transparent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export default function Logo({ 
  variant = 'dark', 
  size = 'md', 
  className,
  showText = true 
}: LogoProps) {
  const sizeClasses: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12'
  };

  const textSizeClasses: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
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
          'logo-image',
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