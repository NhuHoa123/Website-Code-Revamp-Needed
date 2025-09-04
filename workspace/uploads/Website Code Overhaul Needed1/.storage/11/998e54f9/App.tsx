import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import CursorFollower from './components/ui/CursorFollower';
import PageTransition from './components/ui/PageTransition';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));
const AccountPage = React.lazy(() => import('./pages/AccountPage'));
const WishlistPage = React.lazy(() => import('./pages/WishlistPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

import './App.css';

function App() {
  useEffect(() => {
    // Preload critical resources
    const preloadImages = [
      '/images/background.jpg',
      '/images/Logo.jpg',
    ];
    
    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              <div className="App min-h-screen bg-background text-foreground">
                <CursorFollower />
                <ScrollToTop />
                
                <Navigation />
                
                <main className="flex-1">
                  <AnimatePresence mode="wait">
                    <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
                        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
                        <Route path="/products" element={<PageTransition><ProductsPage /></PageTransition>} />
                        <Route path="/products/:id" element={<PageTransition><ProductDetailPage /></PageTransition>} />
                        <Route path="/cart" element={<PageTransition><CartPage /></PageTransition>} />
                        <Route path="/checkout" element={<PageTransition><CheckoutPage /></PageTransition>} />
                        <Route path="/account" element={<PageTransition><AccountPage /></PageTransition>} />
                        <Route path="/wishlist" element={<PageTransition><WishlistPage /></PageTransition>} />
                        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
                        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
                      </Routes>
                    </Suspense>
                  </AnimatePresence>
                </main>
                
                <Footer />
                
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: 'hsl(var(--background))',
                      color: 'hsl(var(--foreground))',
                      border: '1px solid hsl(var(--border))',
                    },
                  }}
                />
              </div>
            </Router>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;