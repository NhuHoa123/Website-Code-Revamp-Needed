import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, Headphones, Play, Award, Users, Globe, Brain, Zap, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import PremiumButton from '../components/ui/PremiumButton';
import GlassmorphismCard from '../components/ui/GlassmorphismCard';
import ParticleSystem from '../components/ui/ParticleSystem';
import AIRecommendations from '../components/ai/AIRecommendations';
import VoiceControl from '../components/voice/VoiceControl';
import WebXRPreview from '../components/xr/WebXRPreview';
import AdvancedAnalytics from '../components/analytics/AdvancedAnalytics';
import NFTCertificate from '../components/blockchain/NFTCertificate';
import PerformanceOptimizer from '../components/performance/PerformanceOptimizer';

const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const featuredProducts = [
    {
      id: '1',
      name: 'AI-Enhanced Platinum Pen Collection',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 347,
      badge: 'AI Recommended',
      description: '24k gold-plated nib with smart pressure sensors and blockchain authenticity',
    },
    {
      id: '2',
      name: 'Neural Network Smart Journal',
      price: 189.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 189,
      badge: 'AR Compatible',
      description: 'Hand-stitched Italian leather with AR overlay and voice-to-text integration',
    },
    {
      id: '3',
      name: 'Quantum Color Paint System',
      price: 159.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 256,
      badge: 'VR Preview',
      description: 'Professional-grade pigments with AI color matching and holographic effects',
    },
    {
      id: '4',
      name: 'Executive Holographic Desk',
      price: 449.99,
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 423,
      badge: 'NFT Certified',
      description: 'Handcrafted walnut with holographic display and blockchain ownership certificate',
    },
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Personalization',
      description: 'Advanced machine learning algorithms analyze your preferences to curate the perfect products for your creative journey.',
    },
    {
      icon: Eye,
      title: 'AR/VR Product Preview',
      description: 'Experience products in immersive augmented and virtual reality before purchase with our cutting-edge WebXR technology.',
    },
    {
      icon: Shield,
      title: 'Blockchain Authentication',
      description: 'Every premium product comes with an NFT certificate of authenticity stored on the blockchain for lifetime verification.',
    },
  ];

  const testimonials = [
    {
      name: 'Dr. Alexandra Chen',
      role: 'AI Research Director',
      company: 'MIT Innovation Lab',
      content: 'The AI recommendations are incredibly accurate. It\'s like having a personal curator who understands my creative process better than I do.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'Prof. Marcus Rodriguez',
      role: 'Quantum Computing Researcher',
      company: 'Stanford University',
      content: 'The AR preview technology is revolutionary. I can visualize how products fit in my workspace before ordering. Absolutely mind-blowing.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'Isabella Thompson',
      role: 'Blockchain Artist',
      company: 'Digital Renaissance Studio',
      content: 'The NFT certificates give me confidence in authenticity. Plus, the voice commands make shopping hands-free while I\'m creating.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      rating: 5,
    },
  ];

  const stats = [
    { icon: Users, value: '500K+', label: 'AI-Assisted Purchases' },
    { icon: Award, value: '50+', label: 'Innovation Awards' },
    { icon: Globe, value: '150+', label: 'Countries with AR/VR' },
    { icon: Zap, value: '99.9%', label: 'Performance Score' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen overflow-hidden">
      <ParticleSystem />
      <VoiceControl />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"
          style={{ y: backgroundY }}
        />
        
        {/* Advanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                scale: Math.random() * 2 + 0.5,
              }}
              animate={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1200),
                scale: [0.5, 2, 0.5],
              }}
              transition={{
                duration: Math.random() * 40 + 30,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        <motion.div 
          className="relative z-10 container mx-auto px-4 text-center"
          style={{ y: textY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.div
              className="mb-8"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Badge className="mb-6 text-sm px-8 py-4 glass border-white/20 backdrop-blur-xl">
                ✨ Introducing AI-Powered Luxury Collection 2024 with AR/VR Preview
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="gradient-text bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text">
                Future of Luxury
              </span>
              <br />
              <span className="text-foreground">Stationery</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-3xl text-muted-foreground mb-12 max-w-5xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Experience the convergence of traditional craftsmanship and cutting-edge technology. 
              AI-curated collections, AR/VR previews, blockchain authentication, and voice-controlled shopping 
              redefine luxury stationery for the digital age.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Link to="/products">
                <PremiumButton variant="premium" size="lg" className="text-xl px-12 py-8" shimmer>
                  <Brain className="mr-3 w-6 h-6" />
                  Explore AI Collection
                  <ArrowRight className="ml-3 w-6 h-6" />
                </PremiumButton>
              </Link>
              
              <PremiumButton variant="glass" size="lg" className="text-xl px-12 py-8">
                <Eye className="mr-3 w-6 h-6" />
                Experience AR/VR
              </PremiumButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-10 h-16 border-2 border-primary/50 rounded-full flex justify-center backdrop-blur-sm">
            <motion.div 
              className="w-2 h-6 bg-gradient-to-b from-primary to-purple-500 rounded-full mt-4"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Advanced Stats Section */}
      <section className="py-24 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <GlassmorphismCard className="p-8 hover:scale-105 transition-all duration-500 backdrop-blur-xl">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-16 h-16 text-primary mx-auto mb-4" />
                    </motion.div>
                    <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </GlassmorphismCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Recommendations Section */}
      <AIRecommendations />

      {/* Featured Products with Advanced Features */}
      <section className="py-24 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 gradient-text">
              Next-Generation Collection
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Each product represents the pinnacle of innovation, featuring AI enhancement, 
              AR/VR compatibility, and blockchain authentication for the ultimate luxury experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <GlassmorphismCard className="group overflow-hidden hover:shadow-2xl transition-all duration-700 backdrop-blur-xl">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-80 object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.8 }}
                    />
                    
                    {/* Advanced Badge */}
                    <Badge className="absolute top-6 left-6 glass border-primary/30 backdrop-blur-xl">
                      <Zap className="w-3 h-3 mr-1" />
                      {product.badge}
                    </Badge>
                    
                    {/* Holographic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* AR/VR Preview Button */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      whileHover={{ scale: 1.1 }}
                    >
                      <PremiumButton variant="glass" className="backdrop-blur-xl">
                        <Eye className="w-4 h-4 mr-2" />
                        AR Preview
                      </PremiumButton>
                    </motion.div>
                  </div>
                  
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground ml-2">
                        ({product.reviews})
                      </span>
                    </div>
                    
                    <h3 className="font-display font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-3xl font-bold gradient-text">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </GlassmorphismCard>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link to="/products">
              <PremiumButton variant="glass" size="lg" className="group text-xl px-12 py-6">
                <Brain className="mr-3 w-6 h-6" />
                Explore Full AI Collection
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </PremiumButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-purple-500/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <GlassmorphismCard className="p-12 h-full backdrop-blur-xl">
                    <motion.div 
                      className="w-24 h-24 bg-gradient-to-br from-primary via-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-8"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Icon className="w-12 h-12 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-display font-semibold mb-6">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{feature.description}</p>
                  </GlassmorphismCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 gradient-text">
              Trusted by Innovators Worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Leading researchers, artists, and creators rely on our AI-powered platform 
              for their most important creative work
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <GlassmorphismCard className="p-8 h-full backdrop-blur-xl">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-8 italic text-lg leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4 border-2 border-primary/20"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm text-primary">{testimonial.company}</p>
                    </div>
                  </div>
                </GlassmorphismCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultimate CTA Section */}
      <section className="py-32 bg-gradient-to-br from-primary via-purple-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Advanced Background Animation */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              animate={{
                x: [0, Math.random() * 100],
                y: [0, Math.random() * 100],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
              Ready to Experience the
              <br />
              <span className="text-yellow-300">Future of Luxury?</span>
            </h2>
            <p className="text-2xl mb-16 max-w-4xl mx-auto opacity-90 leading-relaxed">
              Join the revolution where artificial intelligence meets artisanal craftsmanship. 
              Experience AR/VR previews, voice-controlled shopping, and blockchain-verified authenticity. 
              The future of luxury stationery is here.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link to="/products">
                <PremiumButton variant="glass" size="lg" className="text-xl px-16 py-8 border-white/30 text-white hover:bg-white/10">
                  <Brain className="mr-3 w-8 h-8" />
                  Start AI Journey
                  <ArrowRight className="ml-3 w-8 h-8" />
                </PremiumButton>
              </Link>
              <PremiumButton variant="glass" size="lg" className="text-xl px-16 py-8 border-white/30 text-white hover:bg-white/10">
                <Eye className="mr-3 w-8 h-8" />
                Experience AR/VR Demo
              </PremiumButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;