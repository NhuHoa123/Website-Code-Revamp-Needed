import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Users, ShoppingCart, Eye, Clock, Target, Brain, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import GlassmorphismCard from '../ui/GlassmorphismCard';

interface AnalyticsData {
  userEngagement: Array<{ time: string; views: number; interactions: number; conversions: number }>;
  productPerformance: Array<{ name: string; sales: number; views: number; rating: number }>;
  userBehavior: Array<{ category: string; value: number }>;
  realTimeMetrics: {
    activeUsers: number;
    conversionRate: number;
    avgSessionTime: number;
    bounceRate: number;
  };
  heatmapData: Array<{ x: number; y: number; intensity: number }>;
  aiInsights: Array<{ insight: string; confidence: number; impact: string }>;
}

const AdvancedAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<'engagement' | 'performance' | 'behavior' | 'realtime'>('engagement');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalytics = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockData: AnalyticsData = {
        userEngagement: [
          { time: '00:00', views: 120, interactions: 45, conversions: 8 },
          { time: '04:00', views: 89, interactions: 32, conversions: 5 },
          { time: '08:00', views: 234, interactions: 87, conversions: 15 },
          { time: '12:00', views: 345, interactions: 123, conversions: 23 },
          { time: '16:00', views: 298, interactions: 109, conversions: 19 },
          { time: '20:00', views: 187, interactions: 67, conversions: 12 }
        ],
        productPerformance: [
          { name: 'Premium Pens', sales: 145, views: 2340, rating: 4.8 },
          { name: 'Luxury Notebooks', sales: 98, views: 1890, rating: 4.7 },
          { name: 'Art Supplies', sales: 76, views: 1456, rating: 4.6 },
          { name: 'Desk Organizers', sales: 123, views: 2100, rating: 4.9 }
        ],
        userBehavior: [
          { category: 'Product Browsing', value: 35 },
          { category: 'Cart Interactions', value: 25 },
          { category: 'Wishlist Usage', value: 15 },
          { category: 'Search Activity', value: 20 },
          { category: 'Social Sharing', value: 5 }
        ],
        realTimeMetrics: {
          activeUsers: 1247,
          conversionRate: 3.8,
          avgSessionTime: 4.2,
          bounceRate: 23.5
        },
        heatmapData: Array.from({ length: 100 }, (_, i) => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          intensity: Math.random()
        })),
        aiInsights: [
          { insight: 'Users spend 40% more time on product pages with 3D previews', confidence: 0.94, impact: 'High' },
          { insight: 'Voice search queries increase conversion rate by 23%', confidence: 0.87, impact: 'Medium' },
          { insight: 'Premium product recommendations show 67% higher engagement', confidence: 0.91, impact: 'High' }
        ]
      };
      
      setAnalyticsData(mockData);
      setIsLoading(false);
    };

    loadAnalytics();
  }, []);

  const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-4"
          >
            <Brain className="w-12 h-12 text-primary" />
          </motion.div>
          <h3 className="text-2xl font-display font-bold mb-2">AI is analyzing your data...</h3>
          <p className="text-muted-foreground">Processing millions of data points for insights</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold gradient-text">Advanced Analytics</h2>
          <p className="text-muted-foreground mt-2">AI-powered insights and real-time performance metrics</p>
        </div>
        <div className="flex space-x-2">
          {(['engagement', 'performance', 'behavior', 'realtime'] as const).map((metric) => (
            <Button
              key={metric}
              variant={selectedMetric === metric ? 'default' : 'outline'}
              onClick={() => setSelectedMetric(metric)}
              className="glass"
            >
              {metric.charAt(0).toUpperCase() + metric.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Users, label: 'Active Users', value: analyticsData.realTimeMetrics.activeUsers, suffix: '', color: 'text-blue-500' },
          { icon: Target, label: 'Conversion Rate', value: analyticsData.realTimeMetrics.conversionRate, suffix: '%', color: 'text-green-500' },
          { icon: Clock, label: 'Avg Session', value: analyticsData.realTimeMetrics.avgSessionTime, suffix: 'm', color: 'text-purple-500' },
          { icon: TrendingUp, label: 'Bounce Rate', value: analyticsData.realTimeMetrics.bounceRate, suffix: '%', color: 'text-orange-500' }
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassmorphismCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold mt-1">
                    {metric.value.toLocaleString()}{metric.suffix}
                  </p>
                </div>
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+12.5%</span>
                <span className="text-sm text-muted-foreground ml-2">vs last week</span>
              </div>
            </GlassmorphismCard>
          </motion.div>
        ))}
      </div>

      {/* Main Analytics Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Engagement Chart */}
        <GlassmorphismCard className="p-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              User Engagement Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.userEngagement}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px'
                  }} 
                />
                <Line type="monotone" dataKey="views" stroke="#8B5CF6" strokeWidth={3} />
                <Line type="monotone" dataKey="interactions" stroke="#3B82F6" strokeWidth={3} />
                <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </GlassmorphismCard>

        {/* Product Performance */}
        <GlassmorphismCard className="p-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Product Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.productPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="sales" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </GlassmorphismCard>

        {/* User Behavior Pie Chart */}
        <GlassmorphismCard className="p-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              User Behavior Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.userBehavior}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.userBehavior.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </GlassmorphismCard>

        {/* AI Insights */}
        <GlassmorphismCard className="p-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              AI-Generated Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.aiInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-4 rounded-lg bg-muted/20 border border-primary/20"
              >
                <div className="flex items-start justify-between mb-2">
                  <Badge className={`${
                    insight.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                    insight.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {insight.impact} Impact
                  </Badge>
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 text-primary mr-1" />
                    <span className="text-sm text-primary">
                      {Math.round(insight.confidence * 100)}% confidence
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">{insight.insight}</p>
              </motion.div>
            ))}
          </CardContent>
        </GlassmorphismCard>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;