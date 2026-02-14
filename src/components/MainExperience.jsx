import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import HeartsCounter from './HeartsCounter';
import FloatingGif from './FloatingGif';
import VendingMachine from './VendingMachine';
import { assetsConfig } from '../utils/assetsConfig';
import { logToDiscord } from '../utils/discordLogger';

const MainExperience = ({ onYesClick }) => {
  const [hearts, setHearts] = useState(10);
  const [floatingGifs, setFloatingGifs] = useState([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const handleNoClick = async () => {
    if (hearts > 0) {
      const newHearts = hearts - 1;
      setHearts(newHearts);

      // Add random GIF
      const randomGif = assetsConfig.noGifs[Math.floor(Math.random() * assetsConfig.noGifs.length)];
      const newGif = {
        id: Date.now(),
        url: randomGif
      };
      setFloatingGifs([...floatingGifs, newGif]);

      // Log to Discord
      await logToDiscord('No Button Clicked', newHearts);

      // Cycle gallery
      setGalleryIndex((prev) => (prev + 1) % assetsConfig.gallery.length);
    }
  };

  const handleYesClickMain = async () => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ff6eb4', '#ff8da1']
    });

    // Multiple confetti bursts
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 250);

    await logToDiscord('Yes Button Clicked (Main)', hearts);
    onYesClick();
  };

  const removeGif = (id) => {
    setFloatingGifs(floatingGifs.filter(gif => gif.id !== id));
  };

  return (
    <div className="min-h-screen p-4 relative">
      <HeartsCounter hearts={hearts} />

      {/* Floating GIFs */}
      <AnimatePresence>
        {floatingGifs.map((gif) => (
          <FloatingGif
            key={gif.id}
            gif={gif.url}
            onComplete={() => removeGif(gif.id)}
          />
        ))}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto pt-20">
        {/* Gallery */}
        <motion.div
          key={galleryIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="glassmorphism rounded-2xl p-4 mb-8"
        >
          <img
            src={assetsConfig.gallery[galleryIndex]}
            alt="Memory"
            className="w-full h-64 object-cover rounded-xl"
          />
        </motion.div>

        {/* Main Question */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 cyber-glow">
            Will you be my Valentine?
          </h2>
          <p className="text-xl text-pink-200">You have {hearts} hearts left</p>
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-12 py-4 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full font-bold text-xl shadow-lg relative overflow-hidden group"
            onClick={handleYesClickMain}
          >
            <span className="relative z-10">YES ❤️</span>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
              style={{ opacity: 0.2 }}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full font-bold text-xl shadow-lg relative overflow-hidden group"
            onClick={handleNoClick}
            disabled={hearts === 0}
          >
            <span className="relative z-10">NO 😢</span>
            <motion.div
              className="absolute inset-0 bg-red-500"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
              style={{ opacity: 0.2 }}
            />
          </motion.button>
        </div>

        {/* Vending Machine */}
        <VendingMachine hearts={hearts} />
      </div>
    </div>
  );
};

export default MainExperience;