import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Product3D from '@/components/3d/Product3D';
import { useCartStore } from '@/stores/cartStore';
import { formatCurrency } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  color: string;
  badge: string;
  description: string;
}

const ProductShowcase = () => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addItem } = useCartStore();

  const categories = [
    { id: 'all', name: 'All Products', count: 12 },
    { id: 'pen', name: 'Premium Pens', count: 4 },
    { id: 'notebook', name: 'Notebooks', count: 4 },
    { id: 'pencil', name: 'Pencils', count: 4 },
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Executive Fountain Pen',
      price: 299.99,
      originalPrice: 399.99,
      category: 'pen',
      rating: 4.9,
      reviews: 127,
      image: '/api/placeholder/300/300',
      color: '#1a1a1a',
      badge: 'Bestseller',
      description: 'Handcrafted fountain pen with 18k gold nib',
    },
    {
      id: '2',
      name: 'Leather Bound Journal',
      price: 89.99,
      originalPrice: 119.99,
      category: 'notebook',
      rating: 4.8,
      reviews: 89,
      image: '/api/placeholder/300/300',
      color: '#8B4513',
      badge: 'Limited Edition',
      description: 'Premium leather journal with handmade paper',
    },
    {
      id: '3',
      name: 'Mechanical Precision Pencil',
      price: 45.99,
      originalPrice: null,
      category: 'pencil',
      rating: 4.7,
      reviews: 203,
      image: '/api/placeholder/300/300',
      color: '#4A90E2',
      badge: 'New',
      description: 'Professional mechanical pencil with titanium grip',
    },
    {
      id: '4',
      name: 'Calligraphy Pen Set',
      price: 199.99,
      originalPrice: 249.99,
      category: 'pen',
      rating: 4.9,
      reviews: 156,
      image: '/api/placeholder/300/300',
      color: '#6B46C1',
      badge: 'Professional',
      description: 'Complete calligraphy set with multiple nibs',
    },
    {
      id: '5',
      name: 'Designer Sketchbook',
      price: 59.99,
      originalPrice: null,
      category: 'notebook',
      rating: 4.6,
      reviews: 78,
      image: '/api/placeholder/300/300',
      color: '#10B981',
      badge: 'Eco-Friendly',
      description: 'Sustainable sketchbook with recycled paper',
    },
    {
      id: '6',
      name: 'Architect Pencil Kit',
      price: 129.99,
      originalPrice: 159.99,
      category: 'pencil',
      rating: 4.8,
      reviews: 94,
      image: '/api/placeholder/300/300',
      color: '#F59E0B',
      badge: 'Professional',
      description: 'Complete drafting pencil set for architects',
    },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.color,
      category: product.category,
    });
  };

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Premium Collection
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Discover our handpicked selection of luxury stationery, crafted for professionals who demand excellence
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
            >
              {category.name}
              <span className="ml-2 text-sm opacity-70">({category.count})</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
              viewport={{ once: true }}
              layout
            >
              {/* Badge */}
              {product.badge && (
                <motion.div
                  className="absolute top-4 left-4 z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1">
                    {product.badge}
                  </Badge>
                </motion.div>
              )}

              {/* Wishlist Button */}
              <motion.button
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-gray-800"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </motion.button>

              {/* 3D Product Display */}
              <div className="relative h-64 overflow-hidden">
                <Product3D
                  productType={product.category as 'pen' | 'notebook' | 'pencil' | 'eraser'}
                  color={product.color}
                  isHovered={hoveredProduct === product.id}
                />
                
                {/* Quick View Overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/90 hover:bg-white text-gray-900"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Quick View
                  </Button>
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-purple-600">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                  {product.originalPrice && (
                    <Badge variant="destructive" className="text-xs">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  )}
                </div>

                {/* Add to Cart Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3 border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white transition-all duration-300"
          >
            Load More Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;