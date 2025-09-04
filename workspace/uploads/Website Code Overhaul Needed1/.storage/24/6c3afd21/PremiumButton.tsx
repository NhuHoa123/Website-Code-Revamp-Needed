import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Button, ButtonProps } from './button';

interface PremiumButtonProps extends ButtonProps {
  variant?: 'premium' | 'glass' | 'glow' | 'gradient';
  shimmer?: boolean;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  className,
  variant = 'premium',
  shimmer = false,
  ...props
}) => {
  const variants = {
    premium: 'btn-premium',
    glass: 'glass border-white/20 hover:border-white/40 backdrop-blur-xl',
    glow: 'shadow-glow hover:shadow-[0_0_30px_rgba(var(--primary),0.6)]',
    gradient: 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          variants[variant],
          shimmer && 'animate-shimmer',
          className
        )}
        {...props}
      >
        {shimmer && (
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        )}
        {children}
      </Button>
    </motion.div>
  );
};

export default PremiumButton;