import React from 'react';
import { motion } from 'framer-motion';

const FloatingGif = ({ gif, onComplete }) => {
  const randomX = Math.random() * window.innerWidth - 100;
  const randomY = Math.random() * window.innerHeight - 100;

  return (
    <motion.div
      initial={{ 
        x: randomX, 
        y: randomY, 
        scale: 0,
        opacity: 1,
        rotate: 0
      }}
      animate={{ 
        y: -100,
        scale: 1.5,
        opacity: 0,
        rotate: 360
      }}
      transition={{ 
        duration: 2,
        ease: "easeOut"
      }}
      onAnimationComplete={onComplete}
      className="fixed pointer-events-none z-40"
      style={{
        left: 0,
        top: 0
      }}
    >
      <img 
        src={gif} 
        alt="floating gif" 
        className="w-32 h-32 object-cover rounded-lg shadow-2xl border-2 border-cyber-pink"
      />
    </motion.div>
  );
};

export default FloatingGif;