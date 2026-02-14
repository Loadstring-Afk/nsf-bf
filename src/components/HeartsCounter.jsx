import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeartsCounter = ({ hearts }) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed top-4 left-4 glassmorphism rounded-full px-6 py-3 z-50"
    >
      <div className="flex items-center gap-2">
        <motion.span
          key={hearts}
          initial={{ scale: 1.5, color: '#ff69b4' }}
          animate={{ scale: 1, color: '#ffffff' }}
          className="text-2xl"
        >
          ❤️
        </motion.span>
        <span className="text-xl font-bold">x {hearts}</span>
      </div>
    </motion.div>
  );
};

export default HeartsCounter;