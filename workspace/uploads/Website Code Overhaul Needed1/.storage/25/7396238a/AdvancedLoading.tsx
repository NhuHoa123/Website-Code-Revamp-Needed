import React from 'react';
import { motion } from 'framer-motion';

interface AdvancedLoadingProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'wave';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const AdvancedLoading: React.FC<AdvancedLoadingProps> = ({
  variant = 'spinner',
  size = 'md',
  color = 'hsl(var(--primary))',
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  const dotsVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const waveVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  switch (variant) {
    case 'spinner':
      return (
        <motion.div
          className={`${sizes[size]} border-2 border-current border-t-transparent rounded-full`}
          style={{ color }}
          variants={spinnerVariants}
          animate="animate"
        />
      );

    case 'dots':
      return (
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`${sizes[size]} rounded-full`}
              style={{ backgroundColor: color }}
              variants={dotsVariants}
              animate="animate"
              transition={{ delay: i * 0.2 }}
            />
          ))}
        </div>
      );

    case 'pulse':
      return (
        <motion.div
          className={`${sizes[size]} rounded-full`}
          style={{ backgroundColor: color }}
          variants={pulseVariants}
          animate="animate"
        />
      );

    case 'wave':
      return (
        <div className="flex space-x-1 items-end">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-6 rounded-full"
              style={{ backgroundColor: color }}
              variants={waveVariants}
              animate="animate"
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
      );

    default:
      return null;
  }
};

export default AdvancedLoading;