import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaArrowRight } from 'react-icons/fa';
import useSmoothScroll from '../hooks/useSmoothScroll';

const FAQ = () => {
  // State to track which FAQ is open
  const [openId, setOpenId] = useState(null);
  
  // Use the smooth scroll hook with a header offset
  const { scrollToSection } = useSmoothScroll(80);

  // Toggle function for opening/closing FAQs
  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // FAQ data with questions and answers
  const faqItems = [
    {
      id: 1,
      question: "How long does a typical roof installation take?",
      answer: "Most residential roof installations can be completed in 1-3 days, depending on the size of your roof, weather conditions, and complexity of the job. Larger commercial projects may take longer. Our team will provide you with a specific timeline during your consultation."
    },
    {
      id: 2,
      question: "What types of roofing materials do you offer?",
      answer: "We offer a variety of high-quality roofing materials including asphalt shingles, metal roofing, tile, slate, and flat roofing systems. Each material comes with different benefits, aesthetics, and price points. Our experts can help you choose the best option for your specific needs and budget."
    },
    {
      id: 3,
      question: "Do you provide warranties on your roofing work?",
      answer: "Yes, all our roofing installations come with a comprehensive workmanship warranty. Additionally, the materials we use are covered by manufacturer warranties ranging from 20-50 years depending on the product. We'll explain all warranty details before beginning your project."
    },
    {
      id: 4,
      question: "How do I know if I need a roof repair or a complete replacement?",
      answer: "Signs you might need roof work include missing or damaged shingles, leaks, water stains on ceilings, excessive granules in gutters, or a roof over 20 years old. Our free inspection service will assess your roof's condition and help you determine whether a repair or replacement is the most cost-effective solution."
    },
    {
      id: 5,
      question: "Do you offer financing options for roofing projects?",
      answer: "Yes, we understand roof replacements can be a significant investment, which is why we offer flexible financing options with competitive rates to qualified customers. Our team can guide you through the application process and help you find a payment plan that fits your budget."
    },
    {
      id: 6,
      question: "Are you licensed and insured?",
      answer: "Absolutely. Summit Roofing is fully licensed, bonded, and insured in all areas we operate. We carry comprehensive liability insurance and workers' compensation coverage to protect both our team and your property throughout the project."
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "3rem",
      transition: { duration: 0.5 }
    }
  };

  const contentVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          duration: 0.3
        },
        opacity: {
          duration: 0.25,
          delay: 0.15
        }
      }
    }
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  return (
    <section id="faq" className="py-16 bg-neutral-bg relative overflow-hidden">
      {/* Background decorations */}
      <motion.div 
        className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-cta/5 rounded-full -ml-48 -mb-48"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        viewport={{ once: true }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <motion.div 
            className="flex items-center justify-center mb-4"
          >
            <motion.div 
              className="h-1 w-12 bg-cta mr-4"
              variants={lineVariants}
            ></motion.div>
            <motion.span 
              className="text-accent uppercase tracking-wider text-sm font-semibold"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              FAQ
            </motion.span>
            <motion.div 
              className="h-1 w-12 bg-cta ml-4"
              variants={lineVariants}
            ></motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p 
            className="text-accent max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Find answers to common questions about our roofing services, materials, and process.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {faqItems.map((item) => (
            <motion.div 
              key={item.id} 
              className="mb-5 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              variants={itemVariants}
              whileHover={{ y: -3 }}
              onClick={() => toggleFAQ(item.id)}
            >
              <motion.button 
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-cta/50 rounded-lg cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent double triggering
                  toggleFAQ(item.id);
                }}
                whileTap={{ scale: 0.995 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center">
                  <motion.span 
                    className="text-cta mr-3"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaQuestionCircle className="h-5 w-5" />
                  </motion.span>
                  <span className="font-semibold text-primary">{item.question}</span>
                </div>
                
                <motion.div
                  className="bg-primary/5 rounded-full p-1 text-primary flex-shrink-0"
                  variants={iconVariants}
                  animate={openId === item.id ? "open" : "closed"}
                  transition={{ duration: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {openId === item.id && (
                  <motion.div 
                    className="px-6 pb-4 pt-1"
                    key={`answer-${item.id}`}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={contentVariants}
                  >
                    <motion.div 
                      className="bg-gray-50 p-4 rounded-lg border-l-4 border-cta text-accent"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-14 bg-white p-8 rounded-xl shadow-sm max-w-3xl mx-auto border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ 
            boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.12)",
            y: -5
          }}
        >
          <motion.div
            className="inline-block mb-4 bg-cta/10 p-3 rounded-full"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cta" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </motion.div>
          <motion.h3 
            className="text-xl font-bold text-primary mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Still have questions?
          </motion.h3>
          <motion.p 
            className="text-accent mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Our roofing experts are here to help you with any specific questions about your project.
          </motion.p>
          
          <motion.a 
            href="#contact" 
            className="inline-flex items-center justify-center bg-cta hover:bg-cta/90 text-white font-medium px-6 py-3 rounded-md transition-all duration-300"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0px 5px 15px rgba(239, 68, 68, 0.3)" 
            }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToSection} // Add smooth scroll
          >
            Get in Touch
            <FaArrowRight className="ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;