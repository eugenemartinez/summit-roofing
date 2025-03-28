import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import useSmoothScroll from '../hooks/useSmoothScroll'; // Import our hook

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  // Use our smooth scroll hook with a header offset
  const { scrollToSection } = useSmoothScroll(80);
  
  // Track scrolling for header appearance and active section
  useEffect(() => {
    const handleScroll = () => {
      // Update header appearance
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = [
        'about',
        'services',
        'projects',
        'testimonials',
        'faq',
        'contact'
      ];
      
      // Find the current active section
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Consider a section active if it's top is within 100px of the viewport top
          // or if we're in the upper half of the section
          return (rect.top <= 100 && rect.bottom > 100) || 
                 (rect.top < 0 && rect.bottom > window.innerHeight / 2);
        }
        return false;
      });
      
      if (current && current !== activeSection) {
        setActiveSection(current);
      } else if (!current && window.scrollY <= 50) {
        // At the top of the page
        setActiveSection('');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check for active section
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);
  
  // Button animation with optimized timing for both hover and unhover
  const quoteButtonStyles = {
    initial: { 
      scale: 1, 
      boxShadow: "0px 0px 0px rgba(216, 106, 106, 0)" 
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(216, 106, 106, 0.3)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 },
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 20
    }
  };
  
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${scrolled 
        ? 'bg-primary/95 backdrop-blur-md py-2 shadow-lg' 
        : 'bg-primary py-4'
      } text-white sticky top-0 z-50 transition-all duration-300`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo with smooth scroll to top */}
        <motion.a 
          href="#" 
          className="flex items-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToSection} 
        >
          <Logo size={scrolled ? "default" : "medium"} />
        </motion.a>
        
        {/* Desktop Navigation with active section highlighting */}
        <nav className="hidden md:flex items-center space-x-8">
          <motion.a 
            href="#about" 
            className={`font-medium transition duration-300 relative group ${activeSection === 'about' ? 'text-cta' : 'hover:text-cta'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={scrollToSection}
          >
            About
            <span 
              className={`absolute -bottom-1 left-0 h-0.5 bg-cta transition-all duration-300 ${
                activeSection === 'about' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </motion.a>
          
          <motion.a 
            href="#services" 
            className={`font-medium transition duration-300 relative group ${activeSection === 'services' ? 'text-cta' : 'hover:text-cta'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            onClick={scrollToSection}
          >
            Services
            <span 
              className={`absolute -bottom-1 left-0 h-0.5 bg-cta transition-all duration-300 ${
                activeSection === 'services' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </motion.a>
          
          <motion.a 
            href="#projects" 
            className={`font-medium transition duration-300 relative group ${activeSection === 'projects' ? 'text-cta' : 'hover:text-cta'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            onClick={scrollToSection}
          >
            Our Work
            <span 
              className={`absolute -bottom-1 left-0 h-0.5 bg-cta transition-all duration-300 ${
                activeSection === 'projects' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </motion.a>
          
          <motion.a 
            href="#testimonials" 
            className={`font-medium transition duration-300 relative group ${activeSection === 'testimonials' ? 'text-cta' : 'hover:text-cta'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            onClick={scrollToSection}
          >
            Testimonials
            <span 
              className={`absolute -bottom-1 left-0 h-0.5 bg-cta transition-all duration-300 ${
                activeSection === 'testimonials' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </motion.a>
          
          <motion.a 
            href="#faq" 
            className={`font-medium transition duration-300 relative group ${activeSection === 'faq' ? 'text-cta' : 'hover:text-cta'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            onClick={scrollToSection}
          >
            FAQ
            <span 
              className={`absolute -bottom-1 left-0 h-0.5 bg-cta transition-all duration-300 ${
                activeSection === 'faq' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </motion.a>
          
          <motion.a 
            href="#contact" 
            className={`bg-cta px-5 py-2 rounded-md font-medium ${activeSection === 'contact' ? 'opacity-90' : ''}`}
            animate={{ opacity: 1, scale: 1 }}
            initial={quoteButtonStyles.initial}
            whileHover={quoteButtonStyles.hover}
            whileTap={quoteButtonStyles.tap}
            transition={quoteButtonStyles.transition}
            onClick={scrollToSection}
          >
            Get a Quote
          </motion.a>
        </nav>
        
        {/* Mobile menu button - unchanged */}
        <motion.button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </motion.button>
      </div>
      
      {/* Mobile Navigation with active section highlighting */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-primary/95 backdrop-blur-md border-t border-accent/20 absolute w-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="flex flex-col space-y-4 px-4 py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.a 
                href="#about" 
                className={`py-2 ${activeSection === 'about' ? 'text-cta' : 'hover:text-cta'}`}
                onClick={(e) => {
                  scrollToSection(e);
                  setMobileMenuOpen(false);
                }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                About
              </motion.a>
              
              <motion.a 
                href="#services" 
                className={`py-2 ${activeSection === 'services' ? 'text-cta' : 'hover:text-cta'}`}
                onClick={(e) => {
                  scrollToSection(e);
                  setMobileMenuOpen(false);
                }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Services
              </motion.a>
              
              <motion.a 
                href="#projects" 
                className={`py-2 ${activeSection === 'projects' ? 'text-cta' : 'hover:text-cta'}`}
                onClick={(e) => {
                  scrollToSection(e);
                  setMobileMenuOpen(false);
                }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Our Work
              </motion.a>
              
              <motion.a 
                href="#testimonials" 
                className={`py-2 ${activeSection === 'testimonials' ? 'text-cta' : 'hover:text-cta'}`}
                onClick={(e) => {
                  scrollToSection(e);
                  setMobileMenuOpen(false);
                }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Testimonials
              </motion.a>
              
              <motion.a 
                href="#faq" 
                className={`py-2 ${activeSection === 'faq' ? 'text-cta' : 'hover:text-cta'}`}
                onClick={(e) => {
                  scrollToSection(e);
                  setMobileMenuOpen(false);
                }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                FAQ
              </motion.a>
              
              <motion.a 
                href="#contact" 
                className="bg-cta px-4 py-3 rounded-md text-center font-medium"
                onClick={(e) => {
                  scrollToSection(e);
                  setMobileMenuOpen(false);
                }}
                initial={quoteButtonStyles.initial}
                whileHover={quoteButtonStyles.hover}
                whileTap={quoteButtonStyles.tap}
                transition={quoteButtonStyles.transition}
              >
                Get a Quote
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;