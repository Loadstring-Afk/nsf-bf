import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { assetsConfig } from '../utils/assetsConfig';
import { logToDiscord } from '../utils/discordLogger';

const WelcomeScreen = ({ onEnter }) => {
  const audioRef = useRef(new Audio(assetsConfig.music));

  const handleYesPapi = async () => {
    try {
      // Play music
      await audioRef.current.play();
      
      // Log to Discord
      await logToDiscord('Gateway Accessed', null, { 
        event: 'Welcome Screen Entered' 
      });
      
      // Trigger main experience
      onEnter();
    } catch (error) {
      console.error('Audio playback failed:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
        className="glassmorphism rounded-2xl p-12 max-w-md w-full text-center relative overflow-hidden"
      >
        {/* Animated background hearts */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-cyber-pink text-4xl"
              initial={{ 
                x: Math.random() * 300 - 150,
                y: Math.random() * 300 - 150,
                rotate: 0,
                scale: 0.5
              }}
              animate={{ 
                y: [null, -30, 0],
                rotate: 360,
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>

        <motion.h1 
          className="text-4xl font-bold mb-6 cyber-glow"
          animate={{ 
            textShadow: [
              '0 0 10px #ff69b4',
              '0 0 20px #ff69b4',
              '0 0 30px #ff69b4',
              '0 0 20px #ff69b4',
              '0 0 10px #ff69b4'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ❤️ Valentine's Portal ❤️
        </motion.h1>

        <p className="text-xl mb-8 text-pink-200">
          Ready to see the full page?
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-gradient-to-r from-cyber-pink to-cyber-purple rounded-full font-bold text-lg shadow-lg relative overflow-hidden group"
          onClick={handleYesPapi}
        >
          <span className="relative z-10">YES PAPI ❤️</span>
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
            style={{ opacity: 0.2 }}
          />
        </motion.button>

        <p className="mt-6 text-xs text-pink-300/60">
          Click to begin your journey...
        </p>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;