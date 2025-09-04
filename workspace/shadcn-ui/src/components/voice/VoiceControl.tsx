import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, Command, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { useVoiceCommands } from '../../hooks/useVoiceCommands';
import GlassmorphismCard from '../ui/GlassmorphismCard';

const VoiceControl: React.FC = () => {
  const [showCommands, setShowCommands] = useState(false);
  const {
    isListening,
    transcript,
    confidence,
    commands,
    toggleListening,
    isSupported
  } = useVoiceCommands();

  if (!isSupported) {
    return null;
  }

  return (
    <>
      {/* Voice Control Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="relative">
          {/* Pulse Animation for Active Listening */}
          <AnimatePresence>
            {isListening && (
              <motion.div
                className="absolute inset-0 bg-primary/30 rounded-full"
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </AnimatePresence>

          <Button
            onClick={toggleListening}
            className={`w-16 h-16 rounded-full glass border-2 transition-all duration-300 ${
              isListening 
                ? 'border-red-500 bg-red-500/20 hover:bg-red-500/30' 
                : 'border-primary/30 hover:border-primary/50'
            }`}
            onMouseEnter={() => setShowCommands(true)}
            onMouseLeave={() => setShowCommands(false)}
          >
            <motion.div
              animate={{ scale: isListening ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
            >
              {isListening ? (
                <MicOff className="w-8 h-8 text-red-400" />
              ) : (
                <Mic className="w-8 h-8 text-primary" />
              )}
            </motion.div>
          </Button>

          {/* Status Badge */}
          <AnimatePresence>
            {isListening && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-12 left-1/2 transform -translate-x-1/2"
              >
                <Badge className="glass border-red-500/30 text-red-400 whitespace-nowrap">
                  <Volume2 className="w-3 h-3 mr-1" />
                  Listening...
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Voice Commands Panel */}
      <AnimatePresence>
        {showCommands && (
          <motion.div
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 20, y: 20 }}
            className="fixed bottom-24 right-6 z-40"
          >
            <GlassmorphismCard className="w-80 p-4">
              <div className="flex items-center mb-3">
                <Command className="w-5 h-5 text-primary mr-2" />
                <h3 className="font-semibold">Voice Commands</h3>
              </div>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {commands.map((command, index) => (
                  <motion.div
                    key={command.command}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium">"{command.command}"</p>
                      <p className="text-xs text-muted-foreground">{command.description}</p>
                    </div>
                    <Sparkles className="w-4 h-4 text-primary/60" />
                  </motion.div>
                ))}
              </div>

              {/* Current Transcript */}
              <AnimatePresence>
                {transcript && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <div className="flex items-center mb-2">
                      <Volume2 className="w-4 h-4 text-primary mr-2" />
                      <span className="text-sm font-medium">Heard:</span>
                      <Badge className="ml-2 text-xs">
                        {Math.round(confidence * 100)}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "{transcript}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassmorphismCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Feedback Overlay */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 pointer-events-none"
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Mic className="w-16 h-16 text-primary" />
                  </motion.div>
                </div>
                <p className="text-white text-lg font-medium">Listening for commands...</p>
                <p className="text-white/70 text-sm mt-2">Say "go to products" or "show cart"</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceControl;