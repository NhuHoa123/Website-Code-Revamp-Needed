import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Fingerprint, Link2, Download, Share2, Verified } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import GlassmorphismCard from '../ui/GlassmorphismCard';

interface NFTCertificateProps {
  productId: string;
  productName: string;
  productImage: string;
  purchaseDate: string;
  serialNumber: string;
  authenticity: {
    verified: boolean;
    blockchainHash: string;
    certificateId: string;
  };
}

const NFTCertificate: React.FC<NFTCertificateProps> = ({
  productId,
  productName,
  productImage,
  purchaseDate,
  serialNumber,
  authenticity
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const verifyAuthenticity = async () => {
    setIsVerifying(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsVerifying(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-2 mb-4"
        >
          <Shield className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-display font-bold gradient-text">
            Digital Certificate of Authenticity
          </h2>
        </motion.div>
        
        <div className="flex items-center justify-center space-x-2">
          <Badge className="glass border-green-500/30 text-green-400">
            <Verified className="w-4 h-4 mr-2" />
            Blockchain Verified
          </Badge>
          <Badge className="glass border-primary/30">
            NFT Certificate
          </Badge>
        </div>
      </div>

      <GlassmorphismCard className="overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10 animate-pulse" />
        
        <div className="relative z-10 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-2xl"
              >
                <img
                  src={productImage}
                  alt={productName}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                <motion.div
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                >
                  <Award className="w-10 h-10 text-white" />
                </motion.div>
              </motion.div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-display font-bold mb-2">{productName}</h3>
                <p className="text-muted-foreground">
                  This certificate serves as proof of authenticity and ownership for this premium product.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-lg bg-muted/20">
                  <span className="text-sm font-medium">Product ID</span>
                  <span className="text-sm font-mono">{productId}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 rounded-lg bg-muted/20">
                  <span className="text-sm font-medium">Serial Number</span>
                  <span className="text-sm font-mono">{serialNumber}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 rounded-lg bg-muted/20">
                  <span className="text-sm font-medium">Purchase Date</span>
                  <span className="text-sm">{purchaseDate}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 rounded-lg bg-muted/20">
                  <span className="text-sm font-medium">Certificate ID</span>
                  <span className="text-sm font-mono">{authenticity.certificateId}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button onClick={verifyAuthenticity} disabled={isVerifying} className="flex-1">
                  <Fingerprint className="w-4 h-4 mr-2" />
                  {isVerifying ? 'Verifying...' : 'Verify Authenticity'}
                </Button>
                <Button variant="outline" className="glass">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="glass">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </GlassmorphismCard>
    </div>
  );
};

export default NFTCertificate;