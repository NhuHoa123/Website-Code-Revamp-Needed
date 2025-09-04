import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassmorphismCard = ({ children, className = '', hover = true }: GlassmorphismCardProps) => {
  return (
    <motion.div
      className={`
        backdrop-blur-xl bg-white/10 dark:bg-gray-900/10 
        border border-white/20 dark:border-gray-700/20 
        rounded-2xl shadow-2xl 
        ${hover ? 'hover:bg-white/20 dark:hover:bg-gray-800/20' : ''}
        ${className}
      `}
      whileHover={hover ? { 
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default GlassmorphismCard;