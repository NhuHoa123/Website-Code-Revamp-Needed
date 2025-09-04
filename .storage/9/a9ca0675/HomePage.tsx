import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, Headphones, Play, Award, Users, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import PremiumButton from '../components/ui/PremiumButton';
import GlassmorphismCard from '../components/ui/GlassmorphismCard';
import ParticleSystem from '../components/ui/ParticleSystem';

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
      name: 'Artisan Leather Journal',
      price: 189.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 347,
      badge: 'Bestseller',
      description: 'Hand-stitched Italian leather with premium paper',
    },
    {
      id: '2',
      name: 'Platinum Fountain Pen Collection',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 189,
      badge: 'Limited Edition',
      description: '24k gold-plated nib with precision engineering',
    },
    {
      id: '3',
      name: 'Master Artist Paint Set',
      price: 159.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 256,
      badge: 'New Arrival',
      description: 'Professional-grade pigments in 48 vibrant colors',
    },
    {
      id: '4',
      name: 'Executive Desk System',
      price: 449.99,
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 423,
      badge: 'Premium',
      description: 'Handcrafted walnut with smart organization',
    },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Lifetime Quality Guarantee',
      description: 'Every product backed by our uncompromising quality promise and lifetime craftsmanship warranty.',
    },
    {
      icon: Truck,
      title: 'White-Glove Delivery',
      description: 'Premium packaging and expedited shipping worldwide with complimentary insurance coverage.',
    },
    {
      icon: Headphones,
      title: 'Concierge Support',
      description: 'Dedicated customer success team available 24/7 for personalized assistance and guidance.',
    },
  ];

  const testimonials = [
    {
      name: 'Alexandra Chen',
      role: 'Creative Director',
      company: 'Design Studio Pro',
      content: 'The attention to detail is extraordinary. These tools have transformed my creative process and elevated my work to new heights.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Architect',
      company: 'Rodriguez & Associates',
      content: 'Unparalleled quality and craftsmanship. Every piece feels like a work of art that inspires excellence in my designs.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      rating: 5,
    },
    {
      name: 'Isabella Thompson',
      role: 'Author & Illustrator',
      company: 'Independent Artist',
      content: 'These premium tools don\'t just serve function—they inspire creativity and make every writing session feel special.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      rating: 5,
    },
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Creators' },
    { icon: Award, value: '15+', label: 'Design Awards' },
    { icon: Globe, value: '80+', label: 'Countries Served' },
    { icon: Star, value: '4.9', label: 'Average Rating' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen overflow-hidden">
      <ParticleSystem />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"
          style={{ y: backgroundY }}
        />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              }}
              animate={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1200),
              }}
              transition={{
                duration: Math.random() * 30 + 20,
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
              <Badge className="mb-6 text-sm px-6 py-3 glass border-white/20">
                ✨ Introducing Our Platinum Collection 2024
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="gradient-text">Luxury Stationery</span>
              <br />
              <span className="text-foreground">Redefined</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Experience the pinnacle of craftsmanship with our curated collection of premium stationery, 
              designed for visionaries, creators, and those who demand excellence in every detail.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Link to="/products">
                <PremiumButton variant="premium" size="lg" className="text-lg px-10 py-6" shimmer>
                  Explore Collection
                  <ArrowRight className="ml-3 w-6 h-6" />
                </PremiumButton>
              </Link>
              
              <PremiumButton variant="glass" size="lg" className="text-lg px-10 py-6">
                <Play className="mr-3 w-6 h-6" />
                Watch Our Story
              </PremiumButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-12 border-2 border-muted-foreground/50 rounded-full flex justify-center">
            <motion.div 
              className="w-1.5 h-4 bg-primary rounded-full mt-3"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/20">
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
                  <GlassmorphismCard className="p-8 hover:scale-105 transition-transform duration-300">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </GlassmorphismCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 gradient-text">
              Masterpiece Collection
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Each piece in our collection represents the perfect fusion of traditional craftsmanship 
              and contemporary design, created for those who appreciate the extraordinary.
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
                <GlassmorphismCard className="group overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-80 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <Badge className="absolute top-6 left-6 glass border-white/30">
                      {product.badge}
                    </Badge>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <CardContent className="p-8">
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
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
                    
                    <h3 className="font-display font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold gradient-text">${product.price}</span>
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

          <div className="text-center mt-16">
            <Link to="/products">
              <PremiumButton variant="glass" size="lg" className="group">
                View Complete Collection
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </PremiumButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gradient-to-br from-muted/30 to-background">
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
                  <GlassmorphismCard className="p-10 h-full">
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-display font-semibold mb-6">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
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
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 gradient-text">
              Trusted by Creators Worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of satisfied customers who have elevated their creative process with our premium collection
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
                <GlassmorphismCard className="p-8 h-full">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-purple-600 to-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
              Ready to Create Something
              <br />
              <span className="text-yellow-300">Extraordinary?</span>
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
              Join our exclusive community of creators and discover the tools that will transform 
              your artistic vision into reality. Every masterpiece begins with the right foundation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/products">
                <PremiumButton variant="glass" size="lg" className="text-lg px-12 py-6 border-white/30 text-white hover:bg-white/10">
                  Start Your Journey
                  <ArrowRight className="ml-3 w-6 h-6" />
                </PremiumButton>
              </Link>
              <PremiumButton variant="glass" size="lg" className="text-lg px-12 py-6 border-white/30 text-white hover:bg-white/10">
                Schedule Consultation
              </PremiumButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;