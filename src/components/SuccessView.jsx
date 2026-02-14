import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTimer } from '../hooks/useTimer';
import { FRIENDSHIP_START_DATE } from '../utils/constants';

const SuccessView = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const timeElapsed = useTimer(FRIENDSHIP_START_DATE);

  const fullText = 'Gracias por aceptar. Sé que somos en línea pero hice esta sorpresa; estuve trabajando por unas horas, espero que te guste.';

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setShowCursor(false);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="glassmorphism rounded-2xl p-8 text-center relative overflow-hidden"
        >
          {/* Floating hearts background */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-cyber-pink text-2xl"
                animate={{
                  y: [-20, -100],
                  x: Math.sin(i) * 50,
                  rotate: 360,
                  opacity: [0.5, 0]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '100%'
                }}
              >
                ❤️
              </motion.div>
            ))}
          </div>

          <motion.h1 
            className="text-5xl font-bold mb-8 cyber-glow"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎉 She Said YES! 🎉
          </motion.h1>

          <div className="mb-8 min-h-[100px]">
            <p className="text-xl text-pink-200">
              {displayText}
              {showCursor && <span className="cursor-blink">|</span>}
            </p>
          </div>

          <div className="glassmorphism rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Friendship Pulse ❤️</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {Object.entries(timeElapsed).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="text-3xl font-bold text-cyber-pink">
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-pink-200">
                    {unit}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px #ff69b4',
                '0 0 40px #ff69b4',
                '0 0 20px #ff69b4'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-4 rounded-full inline-block"
          >
            <span className="text-6xl">💝</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SuccessView;