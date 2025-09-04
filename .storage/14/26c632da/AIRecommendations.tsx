import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Star, TrendingUp, Sparkles } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useAI } from '../../hooks/useAI';
import GlassmorphismCard from '../ui/GlassmorphismCard';

const AIRecommendations: React.FC = () => {
  const { recommendations, isLoading } = useAI();

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="inline-block"
            >
              <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
            </motion.div>
            <h3 className="text-2xl font-display font-bold mb-2">AI is analyzing your preferences...</h3>
            <p className="text-muted-foreground">Generating personalized recommendations</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-purple-500/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-primary mr-3" />
            <Badge className="glass border-primary/20 text-primary">
              AI-Powered Recommendations
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
            Curated Just for You
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our advanced AI analyzes your preferences, behavior, and creative needs to suggest the perfect products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendations.map((recommendation, index) => (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <GlassmorphismCard className="group overflow-hidden hover:shadow-2xl transition-all duration-500 relative">
                {/* AI Confidence Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="glass border-green-500/30 text-green-400">
                    {Math.round(recommendation.confidence * 100)}% Match
                  </Badge>
                </div>

                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={recommendation.image}
                    alt={recommendation.name}
                    className="w-full h-64 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* AI Analysis Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-center text-white">
                      <Brain className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm font-medium">AI Analyzed</p>
                    </div>
                  </motion.div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="w-5 h-5 text-primary mr-2" />
                    <span className="text-sm text-primary font-medium">AI Recommended</span>
                  </div>

                  <h3 className="font-display font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                    {recommendation.name}
                  </h3>

                  <div className="mb-4">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                      {recommendation.reason}
                    </p>
                    
                    {/* Confidence Meter */}
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">Confidence:</span>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${recommendation.confidence * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                      <span className="text-xs font-medium text-primary">
                        {Math.round(recommendation.confidence * 100)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold gradient-text">
                        ${recommendation.price}
                      </span>
                    </div>
                    <Button className="glass hover:bg-primary/20 transition-all duration-300">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </GlassmorphismCard>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-muted-foreground"
          >
            <Brain className="w-5 h-5" />
            <span className="text-sm">
              Recommendations improve as we learn more about your preferences
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIRecommendations;