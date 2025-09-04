import { motion } from 'framer-motion';

interface SafeProduct3DProps {
  productType: 'pen' | 'notebook' | 'pencil' | 'eraser';
  color?: string;
  isHovered?: boolean;
}

const SafeProduct3D = ({ productType, color = '#6366f1', isHovered = false }: SafeProduct3DProps) => {
  const getProductIcon = () => {
    switch (productType) {
      case 'pen':
        return '✒️';
      case 'notebook':
        return '📓';
      case 'pencil':
        return '✏️';
      case 'eraser':
        return '🧽';
      default:
        return '📦';
    }
  };

  const getProductName = () => {
    switch (productType) {
      case 'pen':
        return 'Premium Pen';
      case 'notebook':
        return 'Luxury Notebook';
      case 'pencil':
        return 'Designer Pencil';
      case 'eraser':
        return 'Soft Eraser';
      default:
        return 'Product';
    }
  };

  return (
    <motion.div 
      className="w-full h-64 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500" />
      </div>
      
      {/* Product display */}
      <motion.div
        className="text-center z-10"
        animate={{
          y: isHovered ? [-5, 5, -5] : [0],
          rotate: isHovered ? [0, 5, -5, 0] : [0],
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="text-6xl mb-4"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.3 }}
        >
          {getProductIcon()}
        </motion.div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {getProductName()}
        </h3>
        <div 
          className="w-16 h-2 mx-auto mt-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      </motion.div>
      
      {/* Floating particles */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SafeProduct3D;