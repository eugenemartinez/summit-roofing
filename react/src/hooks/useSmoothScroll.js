import { useCallback } from 'react';

/**
 * Custom hook for smooth scrolling functionality
 * @param {number} offset - Offset from the top (e.g., for fixed header)
 * @returns {Object} - Scroll functions
 */
const useSmoothScroll = (offset = 0) => {
  /**
   * Scroll to a specific position
   * @param {number} targetPosition - Target position to scroll to
   */
  const scrollToPosition = useCallback((targetPosition) => {
    // Get current scroll position
    const startPosition = window.pageYOffset;
    
    // Calculate distance
    const distance = targetPosition - startPosition;
    
    // Calculate duration (adjust for distance)
    const duration = Math.min(1000, Math.max(500, Math.abs(distance) / 2));
    
    // Animation timing
    const startTime = performance.now();
    
    // Scroll animation function
    const animateScroll = (currentTime) => {
      // Calculate elapsed time
      const elapsedTime = currentTime - startTime;
      
      // Calculate progress (0 to 1)
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function (smoother animation)
      const easeInOutCubic = t => t < 0.5 
        ? 4 * t * t * t 
        : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      
      // Apply easing
      const easedProgress = easeInOutCubic(progress);
      
      // Calculate new scroll position
      const newScrollPosition = startPosition + (distance * easedProgress);
      
      // Set scroll position
      window.scrollTo(0, newScrollPosition);
      
      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };
    
    // Start animation
    requestAnimationFrame(animateScroll);
  }, []);
  
  /**
   * Scroll to the top of the page
   */
  const scrollToTop = useCallback(() => {
    scrollToPosition(0);
  }, [scrollToPosition]);
  
  /**
   * Scroll to a specific element by ID
   * @param {Event} e - Click event
   */
  const scrollToSection = useCallback((e) => {
    // Only process links that start with #
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    
    e.preventDefault();
    
    // Get the target element
    const targetId = href === '#' ? 'top' : href.substring(1);
    const targetElement = targetId === 'top' ? document.body : document.getElementById(targetId);
    
    if (!targetElement) return;
    
    // Calculate target position with offset
    const targetPosition = targetId === 'top' ? 0 : 
      targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
    
    scrollToPosition(targetPosition);
  }, [offset, scrollToPosition]);
  
  return {
    scrollToPosition,
    scrollToTop,
    scrollToSection
  };
};

export default useSmoothScroll;