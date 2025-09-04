import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  className,
  hover = true,
  glow = false,
}) => {
  return (
    <motion.div
      className={cn(
        'glass-card p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10',
        'border border-white/20 dark:border-white/10',
        'shadow-2xl',
        hover && 'hover-lift cursor-pointer',
        glow && 'shadow-glow',
        className
      )}
      whileHover={hover ? { scale: 1.02, y: -5 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default GlassmorphismCard;