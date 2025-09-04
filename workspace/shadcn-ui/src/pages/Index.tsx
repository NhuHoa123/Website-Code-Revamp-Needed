import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import LoadingAnimation from '@/components/advanced/LoadingAnimation';
import ShoppingCart from '@/components/advanced/ShoppingCart';
import FloatingElements from '@/components/advanced/FloatingElements';
import PremiumHero from '@/components/advanced/PremiumHero';
import { useStore } from '@/stores/useStore';

export default function Index() {
  const { isLoading, setLoading } = useStore();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate loading time for premium experience
    const timer = setTimeout(() => {
      setLoading(false);
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen relative">
        {/* Loading Animation */}
        <LoadingAnimation 
          isLoading={isLoading} 
          onComplete={() => setShowContent(true)} 
        />
        
        {/* Main Content */}
        {showContent && (
          <>
            {/* Simple gradient background instead of particles */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-50 pointer-events-none z-0" />
            
            {/* Floating Elements */}
            <FloatingElements />
            
            {/* Content */}
            <div className="relative z-10">
              <Navigation />
              <PremiumHero />
              <ProductShowcase />
              <AboutSection />
              <ContactSection />
              <Footer />
            </div>
            
            {/* Shopping Cart */}
            <ShoppingCart />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}