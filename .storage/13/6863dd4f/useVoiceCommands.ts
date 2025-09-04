import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface VoiceCommand {
  command: string;
  action: () => void;
  description: string;
}

export const useVoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const navigate = useNavigate();

  const commands: VoiceCommand[] = [
    {
      command: 'go to products',
      action: () => navigate('/products'),
      description: 'Navigate to products page'
    },
    {
      command: 'show cart',
      action: () => navigate('/cart'),
      description: 'Open shopping cart'
    },
    {
      command: 'search for pens',
      action: () => {
        navigate('/products');
        // Trigger search for pens
      },
      description: 'Search for pen products'
    },
    {
      command: 'go home',
      action: () => navigate('/'),
      description: 'Return to homepage'
    },
    {
      command: 'toggle dark mode',
      action: () => {
        // Toggle theme
        document.documentElement.classList.toggle('dark');
      },
      description: 'Switch between light and dark themes'
    }
  ];

  const initializeRecognition = useCallback(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1];
        const transcript = result[0].transcript.toLowerCase().trim();
        const confidence = result[0].confidence;
        
        setTranscript(transcript);
        setConfidence(confidence);
        
        // Check for matching commands
        const matchedCommand = commands.find(cmd => 
          transcript.includes(cmd.command.toLowerCase())
        );
        
        if (matchedCommand && confidence > 0.7) {
          matchedCommand.action();
          setTranscript('');
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      setRecognition(recognition);
    }
  }, [navigate]);

  const startListening = useCallback(() => {
    if (recognition) {
      recognition.start();
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
    }
  }, [recognition]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  useEffect(() => {
    initializeRecognition();
  }, [initializeRecognition]);

  return {
    isListening,
    transcript,
    confidence,
    commands,
    startListening,
    stopListening,
    toggleListening,
    isSupported: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
  };
};

// Extend window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}