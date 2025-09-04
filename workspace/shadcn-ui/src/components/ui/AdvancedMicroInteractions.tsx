import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { Sparkles, Zap, Star, Heart, Eye, Fingerprint } from 'lucide-react';

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({ 
  children, 
  delay = 0, 
  duration = 3 
}) => {
  return (
    <motion.div
      animate={{ 
        y: [0, -20, 0],
        rotate: [0, 2, -2, 0]
      }}
      transition={{ 
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = '',
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((event.clientX - centerX) * 0.1);
    y.set((event.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`cursor-pointer ${className}`}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
      
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

interface ParallaxTextProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxText: React.FC<ParallaxTextProps> = ({ 
  children, 
  speed = 0.5,
  className = ''
}) => {
  const y = useMotionValue(0);
  
  useEffect(() => {
    const updateY = () => {
      y.set(window.scrollY * speed);
    };
    
    window.addEventListener('scroll', updateY);
    return () => window.removeEventListener('scroll', updateY);
  }, [y, speed]);

  return (
    <motion.div
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
};

interface MorphingShapeProps {
  size?: number;
  color?: string;
  className?: string;
}

export const MorphingShape: React.FC<MorphingShapeProps> = ({ 
  size = 100, 
  color = '#8B5CF6',
  className = ''
}) => {
  const pathVariants = {
    variant1: {
      d: "M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z"
    },
    variant2: {
      d: "M50,5 C80,15 95,40 85,65 C75,90 45,95 25,80 C5,65 0,35 15,15 C30,0 50,5 50,5 Z"
    },
    variant3: {
      d: "M50,15 C65,5 85,25 95,45 C95,65 75,85 55,85 C35,85 15,65 15,45 C15,25 35,5 50,15 Z"
    }
  };

  return (
    <motion.div className={className}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <motion.path
          fill={color}
          variants={pathVariants}
          animate={["variant1", "variant2", "variant3", "variant1"]}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </motion.div>
  );
};

interface HolographicTextProps {
  children: React.ReactNode;
  className?: string;
}

export const HolographicText: React.FC<HolographicTextProps> = ({ 
  children, 
  className = ''
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover="hover"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        variants={{
          hover: {
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {children}
      </motion.div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default {
  FloatingElement,
  MagneticButton,
  ParallaxText,
  MorphingShape,
  HolographicText
};