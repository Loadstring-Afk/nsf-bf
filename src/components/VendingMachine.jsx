import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { logToDiscord } from '../utils/discordLogger';

const VendingMachine = ({ hearts }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'anime', label: 'Watch Anime', emoji: '🎌' },
    { id: 'movie', label: 'Watch Movie', emoji: '🎬' },
    { id: 'games', label: 'Play Games', emoji: '🎮' },
    { id: 'surprise', label: 'Surprise', emoji: '🎲' },
    { id: 'all', label: 'All of the above', emoji: '✨' }
  ];

  const searchTMDB = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${encodeURIComponent(query)}`
      );
      setSearchResults(response.data.results.slice(0, 6));
      
      await logToDiscord('Search Performed', hearts, { 
        query,
        resultsCount: response.data.results.length
      });
    } catch (error) {
      console.error('TMDB search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (item) => {
    await logToDiscord('Item Redeemed', hearts, {
      title: item.title || item.name,
      type: item.media_type,
      id: item.id
    });
    
    // Handle redemption UI feedback
    alert(`✨ Redeemed: ${item.title || item.name}! Check Discord for log.`);
  };

  const handleCategoryClick = (categoryId) => {
    if (categoryId === 'surprise' || categoryId === 'all' || categoryId === 'games') {
      alert(`🎉 ${categoryId.toUpperCase()} feature coming soon! This would connect to various APIs.`);
      logToDiscord('Category Clicked', hearts, { category: categoryId });
      return;
    }
    setActiveCategory(categoryId);
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="glassmorphism rounded-2xl p-6 mt-8"
    >
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span className="text-3xl">🎰</span>
        Entertainment Vending Machine
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glassmorphism p-3 rounded-xl hover:bg-cyber-pink/20 transition-all"
            onClick={() => handleCategoryClick(cat.id)}
          >
            <div className="text-2xl mb-1">{cat.emoji}</div>
            <div className="text-sm">{cat.label}</div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 pt-4">
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder={`Search for ${activeCategory}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchTMDB(searchQuery)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-cyber-pink"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => searchTMDB(searchQuery)}
                  disabled={loading}
                  className="px-4 py-2 bg-cyber-pink rounded-lg disabled:opacity-50"
                >
                  {loading ? '🔍' : 'Search'}
                </motion.button>
              </div>

              {searchResults.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {searchResults.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.05 }}
                      className="glassmorphism rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => handleRedeem(item)}
                    >
                      {item.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                          alt={item.title || item.name}
                          className="w-full aspect-[2/3] object-cover"
                        />
                      ) : (
                        <div className="w-full aspect-[2/3] bg-gradient-to-br from-cyber-pink/20 to-cyber-purple/20 flex items-center justify-center">
                          <span className="text-4xl">🎬</span>
                        </div>
                      )}
                      <div className="p-2 text-xs truncate">
                        {item.title || item.name}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VendingMachine;