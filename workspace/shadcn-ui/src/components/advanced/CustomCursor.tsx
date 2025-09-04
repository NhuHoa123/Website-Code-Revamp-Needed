import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    
    const moveCursor = (e: MouseEvent) => {
      if (!isMounted) return;
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseEnter = () => {
      if (cursorRef.current && isMounted) {
        try {
          cursorRef.current.style.transform = 'scale(1.5)';
          cursorRef.current.style.backgroundColor = 'rgba(99, 102, 241, 0.8)';
        } catch (error) {
          console.warn('Cursor hover effect error:', error);
        }
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current && isMounted) {
        try {
          cursorRef.current.style.transform = 'scale(1)';
          cursorRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        } catch (error) {
          console.warn('Cursor leave effect error:', error);
        }
      }
    };

    if (isMounted) {
      window.addEventListener('mousemove', moveCursor);
      
      // Add hover effects to interactive elements with delay to ensure DOM is ready
      setTimeout(() => {
        try {
          const interactiveElements = document.querySelectorAll('button, a, input, [role="button"]');
          interactiveElements.forEach(el => {
            if (el) {
              el.addEventListener('mouseenter', handleMouseEnter);
              el.addEventListener('mouseleave', handleMouseLeave);
            }
          });
        } catch (error) {
          console.warn('Interactive elements setup error:', error);
        }
      }, 100);
    }

    return () => {
      if (isMounted) {
        window.removeEventListener('mousemove', moveCursor);
        try {
          const interactiveElements = document.querySelectorAll('button, a, input, [role="button"]');
          interactiveElements.forEach(el => {
            if (el) {
              el.removeEventListener('mouseenter', handleMouseEnter);
              el.removeEventListener('mouseleave', handleMouseLeave);
            }
          });
        } catch (error) {
          console.warn('Cleanup error:', error);
        }
      }
    };
  }, [cursorX, cursorY, isMounted]);

  if (!isMounted) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full pointer-events-none z-50 mix-blend-difference border border-white/20"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export default CustomCursor;