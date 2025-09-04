import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Gauge, Cpu, HardDrive, Wifi, Battery, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import GlassmorphismCard from '../ui/GlassmorphismCard';

interface PerformanceMetrics {
  loadTime: number;
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  memoryUsage: number;
  cacheHitRate: number;
  bundleSize: number;
}

const PerformanceOptimizer: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationScore, setOptimizationScore] = useState(0);

  useEffect(() => {
    // Simulate performance monitoring
    const mockMetrics: PerformanceMetrics = {
      loadTime: 1.2,
      fcp: 0.8,
      lcp: 1.5,
      fid: 12,
      cls: 0.05,
      ttfb: 0.3,
      memoryUsage: 45,
      cacheHitRate: 92,
      bundleSize: 2.1
    };

    setMetrics(mockMetrics);
    
    // Calculate optimization score
    const score = Math.round(
      (100 - mockMetrics.loadTime * 20) * 0.3 +
      (100 - mockMetrics.lcp * 30) * 0.3 +
      (100 - mockMetrics.fid * 2) * 0.2 +
      mockMetrics.cacheHitRate * 0.2
    );
    setOptimizationScore(Math.max(0, Math.min(100, score)));
  }, []);

  const optimizePerformance = async () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    const steps = [
      'Analyzing bundle size...',
      'Optimizing images...',
      'Implementing lazy loading...',
      'Configuring service worker...',
      'Optimizing critical path...'
    ];

    for (const step of steps) {
      console.log(step);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setIsOptimizing(false);
    setOptimizationScore(prev => Math.min(100, prev + 15));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { text: 'Excellent', color: 'bg-green-500/20 text-green-400' };
    if (score >= 70) return { text: 'Good', color: 'bg-yellow-500/20 text-yellow-400' };
    return { text: 'Needs Improvement', color: 'bg-red-500/20 text-red-400' };
  };

  if (!metrics) return null;

  const scoreBadge = getScoreBadge(optimizationScore);

  return (
    <div className="space-y-6">
      {/* Performance Score Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative inline-block"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(optimizationScore)}`}>
                {optimizationScore}
              </div>
              <div className="text-xs text-white/80">SCORE</div>
            </div>
          </div>
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-primary/30"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
        
        <div>
          <h2 className="text-3xl font-display font-bold gradient-text mb-2">
            Performance Optimizer
          </h2>
          <Badge className={scoreBadge.color}>
            {scoreBadge.text}
          </Badge>
        </div>
      </div>

      {/* Core Web Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassmorphismCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Zap className="w-6 h-6 text-primary mr-2" />
              <h3 className="font-semibold">First Contentful Paint</h3>
            </div>
            <Badge className={metrics.fcp <= 1.8 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
              {metrics.fcp}s
            </Badge>
          </div>
          <Progress value={(2 - metrics.fcp) * 50} className="mb-2" />
          <p className="text-xs text-muted-foreground">
            Time until first content appears
          </p>
        </GlassmorphismCard>

        <GlassmorphismCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Gauge className="w-6 h-6 text-primary mr-2" />
              <h3 className="font-semibold">Largest Contentful Paint</h3>
            </div>
            <Badge className={metrics.lcp <= 2.5 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
              {metrics.lcp}s
            </Badge>
          </div>
          <Progress value={(4 - metrics.lcp) * 25} className="mb-2" />
          <p className="text-xs text-muted-foreground">
            Time until main content loads
          </p>
        </GlassmorphismCard>

        <GlassmorphismCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Cpu className="w-6 h-6 text-primary mr-2" />
              <h3 className="font-semibold">First Input Delay</h3>
            </div>
            <Badge className={metrics.fid <= 100 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
              {metrics.fid}ms
            </Badge>
          </div>
          <Progress value={(300 - metrics.fid) / 3} className="mb-2" />
          <p className="text-xs text-muted-foreground">
            Response time to user interaction
          </p>
        </GlassmorphismCard>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassmorphismCard className="p-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <HardDrive className="w-5 h-5 mr-2" />
              Resource Optimization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Bundle Size</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-mono">{metrics.bundleSize}MB</span>
                <Badge className={metrics.bundleSize <= 2 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                  {metrics.bundleSize <= 2 ? 'Optimal' : 'Large'}
                </Badge>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Cache Hit Rate</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-mono">{metrics.cacheHitRate}%</span>
                <Badge className="bg-green-500/20 text-green-400">Excellent</Badge>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Memory Usage</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-mono">{metrics.memoryUsage}MB</span>
                <Badge className="bg-green-500/20 text-green-400">Low</Badge>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">TTFB</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-mono">{metrics.ttfb}s</span>
                <Badge className="bg-green-500/20 text-green-400">Fast</Badge>
              </div>
            </div>
          </CardContent>
        </GlassmorphismCard>

        <GlassmorphismCard className="p-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Optimization Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium">Image Optimization</p>
                  <p className="text-xs text-muted-foreground">WebP format implemented, 40% size reduction</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium">Code Splitting</p>
                  <p className="text-xs text-muted-foreground">Dynamic imports reduce initial bundle size</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium">Service Worker</p>
                  <p className="text-xs text-muted-foreground">Implement for better caching strategy</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium">CDN Integration</p>
                  <p className="text-xs text-muted-foreground">Global edge caching for faster delivery</p>
                </div>
              </div>
            </div>
          </CardContent>
        </GlassmorphismCard>
      </div>

      {/* Optimization Actions */}
      <div className="text-center">
        <Button
          onClick={optimizePerformance}
          disabled={isOptimizing}
          className="glass px-8 py-4 text-lg"
        >
          {isOptimizing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="mr-2"
              >
                <Zap className="w-5 h-5" />
              </motion.div>
              Optimizing Performance...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 mr-2" />
              Run Auto-Optimization
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PerformanceOptimizer;