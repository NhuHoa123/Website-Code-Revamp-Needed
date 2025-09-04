import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const SafeCustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    if (isMounted) {
      document.addEventListener('mousemove', updateMousePosition);
      
      // Add hover effects to interactive elements
      const interactiveElements = document.querySelectorAll('button, a, input, [role="button"]');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      return () => {
        document.removeEventListener('mousemove', updateMousePosition);
        interactiveElements.forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    }
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 700,
        mass: 0.5,
      }}
    >
      <div className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full border border-white/20" />
    </motion.div>
  );
};

export default SafeCustomCursor;