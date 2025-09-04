import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Cylinder } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { ErrorBoundary } from 'react-error-boundary';

interface Product3DProps {
  productType: 'pen' | 'notebook' | 'pencil' | 'eraser';
  color?: string;
  isHovered?: boolean;
}

const ProductMesh = ({ productType, color = '#6366f1', isHovered = false }: Product3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      try {
        meshRef.current.rotation.y += isHovered ? 0.02 : 0.005;
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      } catch (error) {
        console.warn('3D animation error:', error);
      }
    }
  });

  const renderProduct = () => {
    try {
      switch (productType) {
        case 'pen':
          return (
            <group>
              <Cylinder args={[0.05, 0.05, 2]} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
              </Cylinder>
              <Cylinder args={[0.03, 0.03, 0.3]} position={[1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color="#333" />
              </Cylinder>
            </group>
          );
        case 'notebook':
          return (
            <group>
              <Box args={[1.5, 0.1, 2]}>
                <meshStandardMaterial color={color} />
              </Box>
              <Box args={[1.4, 0.05, 1.9]} position={[0, 0.075, 0]}>
                <meshStandardMaterial color="#fff" />
              </Box>
            </group>
          );
        case 'pencil':
          return (
            <group>
              <Cylinder args={[0.04, 0.04, 1.8]} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color={color} />
              </Cylinder>
              <Cylinder args={[0.04, 0.02, 0.2]} position={[0.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color="#d4af37" />
              </Cylinder>
            </group>
          );
        case 'eraser':
          return (
            <Box args={[0.8, 0.3, 0.3]}>
              <meshStandardMaterial color={color} />
            </Box>
          );
        default:
          return (
            <Sphere args={[0.5]}>
              <meshStandardMaterial color={color} />
            </Sphere>
          );
      }
    } catch (error) {
      console.warn('Product mesh render error:', error);
      return (
        <Sphere args={[0.5]}>
          <meshStandardMaterial color={color} />
        </Sphere>
      );
    }
  };

  return (
    <mesh
      ref={meshRef}
      onClick={() => setClicked(!clicked)}
      scale={clicked ? 1.2 : 1}
    >
      {renderProduct()}
    </mesh>
  );
};

const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="w-full h-64 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center">
        <span className="text-2xl">📦</span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">3D Preview Unavailable</p>
    </div>
  </div>
);

const LoadingFallback = () => (
  <div className="w-full h-64 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
  </div>
);

const Product3D = ({ productType, color, isHovered }: Product3DProps) => {
  return (
    <motion.div 
      className="w-full h-64 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingFallback />}>
          <Canvas 
            camera={{ position: [3, 2, 3], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
          >
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            <ProductMesh productType={productType} color={color} isHovered={isHovered} />
            
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={isHovered}
              autoRotateSpeed={2}
            />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </motion.div>
  );
};

export default Product3D;