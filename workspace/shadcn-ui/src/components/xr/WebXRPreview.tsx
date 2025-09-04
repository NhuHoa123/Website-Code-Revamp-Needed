import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PresentationControls, Float, MeshReflectorMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { VR, Eye, Maximize, RotateCcw, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import GlassmorphismCard from '../ui/GlassmorphismCard';
import * as THREE from 'three';

interface Product3DProps {
  productType: 'pen' | 'notebook' | 'desk' | 'paintset';
  color?: string;
}

const Product3D: React.FC<Product3DProps> = ({ productType, color = '#8B5CF6' }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const renderProduct = () => {
    switch (productType) {
      case 'pen':
        return (
          <group ref={meshRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
                <cylinderGeometry args={[0.05, 0.05, 3, 16]} />
                <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
              </mesh>
              <mesh position={[-1.4, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
                <coneGeometry args={[0.03, 0.3, 8]} />
                <meshStandardMaterial color="#FFD700" metalness={1} roughness={0} />
              </mesh>
            </Float>
          </group>
        );
      
      case 'notebook':
        return (
          <group ref={meshRef}>
            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
              <mesh position={[0, 0, 0]} rotation={[-0.1, 0, 0]}>
                <boxGeometry args={[2, 0.1, 2.8]} />
                <meshStandardMaterial color={color} metalness={0.1} roughness={0.8} />
              </mesh>
              <mesh position={[0, 0.05, 0]} rotation={[-0.1, 0, 0]}>
                <boxGeometry args={[1.9, 0.3, 2.7]} />
                <meshStandardMaterial color="#F7FAFC" />
              </mesh>
            </Float>
          </group>
        );
      
      default:
        return (
          <mesh ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
    }
  };

  return renderProduct();
};

interface WebXRPreviewProps {
  productId: string;
  productName: string;
  productType: 'pen' | 'notebook' | 'desk' | 'paintset';
}

interface XRSession {
  end: () => void;
}

declare global {
  interface Navigator {
    xr?: {
      requestSession: (mode: string) => Promise<XRSession>;
    };
  }
}

const WebXRPreview: React.FC<WebXRPreviewProps> = ({ productId, productName, productType }) => {
  const [isXRActive, setIsXRActive] = useState(false);
  const [viewMode, setViewMode] = useState<'3d' | 'ar' | 'vr'>('3d');
  const [productColor, setProductColor] = useState('#8B5CF6');

  const enterXR = async (mode: 'ar' | 'vr') => {
    if ('xr' in navigator && navigator.xr) {
      try {
        const session = await navigator.xr.requestSession(mode === 'ar' ? 'immersive-ar' : 'immersive-vr');
        setIsXRActive(true);
        setViewMode(mode);
      } catch (error) {
        console.log('XR not supported or permission denied');
        // Fallback to 3D preview
        setViewMode('3d');
      }
    }
  };

  const colorOptions = [
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Gold', value: '#F59E0B' },
    { name: 'Black', value: '#1F2937' }
  ];

  return (
    <div className="space-y-6">
      {/* XR Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge className="glass border-primary/20">
            <VR className="w-4 h-4 mr-2" />
            WebXR Preview
          </Badge>
          <Badge variant={viewMode === 'ar' ? 'default' : 'secondary'}>
            {viewMode.toUpperCase()} Mode
          </Badge>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => enterXR('ar')}
            className="glass"
          >
            <Eye className="w-4 h-4 mr-2" />
            AR View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => enterXR('vr')}
            className="glass"
          >
            <VR className="w-4 h-4 mr-2" />
            VR View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('3d')}
            className="glass"
          >
            <Maximize className="w-4 h-4 mr-2" />
            3D View
          </Button>
        </div>
      </div>

      {/* Color Customization */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Customize Color</h4>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <motion.button
              key={color.value}
              onClick={() => setProductColor(color.value)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                productColor === color.value ? 'border-primary scale-110' : 'border-muted'
              }`}
              style={{ backgroundColor: color.value }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>
      </div>

      {/* 3D Canvas */}
      <GlassmorphismCard className="overflow-hidden">
        <div className="h-96 relative">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            className="bg-gradient-to-br from-background to-muted/20"
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              
              <PresentationControls
                global
                rotation={[0.13, 0.1, 0]}
                polar={[-0.4, 0.2]}
                azimuth={[-1, 0.75]}
                config={{ mass: 2, tension: 400 }}
                snap={{ mass: 4, tension: 400 }}
              >
                <Product3D productType={productType} color={productColor} />
              </PresentationControls>
              
              <Environment preset="studio" />
              
              {/* Reflective Ground */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                <planeGeometry args={[20, 20]} />
                <MeshReflectorMaterial
                  blur={[300, 100]}
                  resolution={2048}
                  mixBlur={1}
                  mixStrength={80}
                  roughness={1}
                  depthScale={1.2}
                  minDepthThreshold={0.4}
                  maxDepthThreshold={1.4}
                  color="#050505"
                  metalness={0.5}
                />
              </mesh>
              
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Suspense>
          </Canvas>

          {/* XR Status Overlay */}
          {isXRActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-4 left-4 right-4"
            >
              <div className="glass p-3 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">XR Session Active</span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsXRActive(false)}
                >
                  Exit XR
                </Button>
              </div>
            </motion.div>
          )}

          {/* Controls Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="glass p-3 rounded-lg">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Drag to rotate • Scroll to zoom • Right-click to pan</span>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-4 h-4" />
                  <Zap className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassmorphismCard>

      {/* Product Info */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-display font-semibold">{productName}</h3>
        <p className="text-muted-foreground">
          Experience this product in immersive AR/VR or explore every detail in our interactive 3D viewer
        </p>
      </div>
    </div>
  );
};

export default WebXRPreview;