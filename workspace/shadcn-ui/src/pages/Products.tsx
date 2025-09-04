import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, Heart, ShoppingCart, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/lib/store';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  inStock: boolean;
  isNew: boolean;
  description: string;
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState('all');
  const addToCart = useCartStore((state) => state.addToCart);

  const categories = [
    { id: 'all', name: 'All Products', count: 48 },
    { id: 'pens', name: 'Pens & Writing', count: 18 },
    { id: 'notebooks', name: 'Notebooks & Journals', count: 12 },
    { id: 'desk', name: 'Desk Accessories', count: 8 },
    { id: 'art', name: 'Art Supplies', count: 6 },
    { id: 'organization', name: 'Organization', count: 4 }
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Fountain Pen Collection',
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 127,
      image: '/api/placeholder/400/400',
      category: 'pens',
      inStock: true,
      isNew: true,
      description: 'Luxury fountain pen with gold-plated nib and premium materials.'
    },
    {
      id: '2',
      name: 'Leather Bound Journal Set',
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.9,
      reviews: 203,
      image: '/api/placeholder/400/400',
      category: 'notebooks',
      inStock: true,
      isNew: false,
      description: 'Handcrafted leather journals with premium paper quality.'
    },
    {
      id: '3',
      name: 'Executive Desk Organizer',
      price: 159.99,
      originalPrice: 199.99,
      rating: 4.7,
      reviews: 89,
      image: '/api/placeholder/400/400',
      category: 'desk',
      inStock: true,
      isNew: true,
      description: 'Elegant wooden desk organizer with multiple compartments.'
    },
    {
      id: '4',
      name: 'Professional Art Pencil Set',
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.6,
      reviews: 156,
      image: '/api/placeholder/400/400',
      category: 'art',
      inStock: false,
      isNew: false,
      description: 'Complete set of professional-grade drawing pencils.'
    },
    {
      id: '5',
      name: 'Minimalist Pen Holder',
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.5,
      reviews: 78,
      image: '/api/placeholder/400/400',
      category: 'desk',
      inStock: true,
      isNew: false,
      description: 'Clean, modern design pen holder for your workspace.'
    },
    {
      id: '6',
      name: 'Luxury Ballpoint Pen',
      price: 189.99,
      originalPrice: 249.99,
      rating: 4.8,
      reviews: 94,
      image: '/api/placeholder/400/400',
      category: 'pens',
      inStock: true,
      isNew: true,
      description: 'Sophisticated ballpoint pen with smooth writing experience.'
    }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'under-50':
          filtered = filtered.filter(product => product.price < 50);
          break;
        case '50-100':
          filtered = filtered.filter(product => product.price >= 50 && product.price <= 100);
          break;
        case '100-200':
          filtered = filtered.filter(product => product.price >= 100 && product.price <= 200);
          break;
        case 'over-200':
          filtered = filtered.filter(product => product.price > 200);
          break;
      }
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Premium Stationery Collection
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover our curated selection of high-quality stationery products designed for professionals and enthusiasts.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-64 space-y-6"
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under-50">Under $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100-200">$100 - $200</SelectItem>
                    <SelectItem value="over-200">Over $200</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border border-slate-300 dark:border-slate-600 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600' : ''}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600' : ''}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Products Grid/List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <CardContent className="p-0">
                      {viewMode === 'grid' ? (
                        <div>
                          <div className="relative aspect-square overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                              {product.isNew && (
                                <Badge className="bg-green-500">New</Badge>
                              )}
                              {product.originalPrice > product.price && (
                                <Badge variant="destructive">
                                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                </Badge>
                              )}
                            </div>
                            <div className="absolute top-4 right-4">
                              <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                                <Heart className="w-4 h-4" />
                              </Button>
                            </div>
                            {!product.inStock && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Badge variant="secondary" className="text-lg">Out of Stock</Badge>
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <Link to={`/product/${product.id}`} className="block mb-2">
                              <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex items-center mb-3">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(product.rating)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-slate-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-slate-500">
                                ({product.reviews})
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                  ${product.price}
                                </span>
                                {product.originalPrice > product.price && (
                                  <span className="text-sm text-slate-500 line-through">
                                    ${product.originalPrice}
                                  </span>
                                )}
                              </div>
                              <Button
                                onClick={() => handleAddToCart(product)}
                                disabled={!product.inStock}
                                size="sm"
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex p-6 space-x-6">
                          <div className="w-32 h-32 flex-shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <Link to={`/product/${product.id}`}>
                              <h3 className="font-semibold text-xl text-slate-900 dark:text-slate-100 mb-2 hover:text-blue-600 transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-slate-600 dark:text-slate-400 mb-3">
                              {product.description}
                            </p>
                            <div className="flex items-center mb-3">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(product.rating)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-slate-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-slate-500">
                                ({product.reviews} reviews)
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                  ${product.price}
                                </span>
                                {product.originalPrice > product.price && (
                                  <span className="text-lg text-slate-500 line-through">
                                    ${product.originalPrice}
                                  </span>
                                )}
                              </div>
                              <Button
                                onClick={() => handleAddToCart(product)}
                                disabled={!product.inStock}
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-slate-500">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;