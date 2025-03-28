import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import useSmoothScroll from '../hooks/useSmoothScroll'; // Import our hook

const ScrollToTop = ({ showThreshold = 300 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToTop } = useSmoothScroll(); // Use the hook
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility();
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showThreshold]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={scrollToTop} // Now using the hook's scrollToTop function
            className="bg-cta hover:bg-cta/90 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-colors duration-300 cursor-pointer"
            whileHover={{ y: -5, boxShadow: "0px 8px 15px rgba(239, 68, 68, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <FaArrowUp className="text-lg" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;