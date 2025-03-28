import React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaShieldAlt, FaClock, FaMoneyBillWave } from 'react-icons/fa';
import useSmoothScroll from '../hooks/useSmoothScroll'; // Import our hook

const CallToAction = () => {
  // Use the smooth scroll hook with a header offset
  const { scrollToSection } = useSmoothScroll(80);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)"
    },
    tap: { scale: 0.98 }
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 0.1,
      transition: {
        duration: 1.2
      }
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary via-primary to-primary/90 py-16 relative overflow-hidden">
      {/* Background pattern with animation */}
      <motion.div 
        className="absolute inset-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={backgroundVariants}
      >
        <motion.svg 
          className="h-full w-full"
          viewBox="0 0 800 800" 
          xmlns="http://www.w3.org/2000/svg"
          initial={{ rotate: -5, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.path 
            d="M0 0L800 0L800 800L0 800L0 0Z" 
            fill="none" 
            stroke="white" 
            strokeWidth="100"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path 
            d="M100 100L700 100L700 700L100 700L100 100Z" 
            fill="none" 
            stroke="white" 
            strokeWidth="100"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          />
          <motion.path 
            d="M200 200L600 200L600 600L200 600L200 200Z" 
            fill="none" 
            stroke="white" 
            strokeWidth="100"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
          />
        </motion.svg>
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div
            className="mb-4 inline-block"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
          >
            <div className="h-1 w-20 bg-cta mx-auto"></div>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
            variants={itemVariants}
          >
            Ready for a Roof That <span className="text-cta">Lasts</span>?<br /> 
            Get Your Free Estimate Today
          </motion.h2>
          
          <motion.p 
            className="text-white/80 text-lg mb-8 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Don't wait until leaks or damage worsen. Our team of experts is ready to provide you with a detailed assessment and competitive quote for your roofing project.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            {/* Primary CTA button with smooth scroll */}
            <motion.a 
              href="#contact" 
              className="bg-cta hover:bg-cta/90 text-white font-medium px-8 py-4 rounded-md text-center transition-all duration-300 text-lg shadow-lg shadow-cta/20"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={scrollToSection} // Add smooth scroll
            >
              Request Free Estimate
            </motion.a>
            
            {/* Secondary CTA button */}
            <motion.a 
              href="tel:+15551234567" 
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium px-8 py-4 rounded-md text-center border border-white/20 transition-all duration-300 flex items-center justify-center"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaPhoneAlt className="mr-2 h-4 w-4" />
              Call Us Now
            </motion.a>
          </motion.div>
          
          {/* Animated trust indicators */}
          <motion.div 
            className="mt-12 flex flex-wrap justify-center gap-6 md:gap-10 items-center"
            variants={itemVariants}
          >
            {[
              { icon: <FaShieldAlt className="text-cta text-xl" />, text: "No Obligation Quotes" },
              { icon: <FaClock className="text-cta text-xl" />, text: "Fast Response Time" },
              { icon: <FaMoneyBillWave className="text-cta text-xl" />, text: "Financing Available" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:bg-white/15 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05
                }}
              >
                <motion.div 
                  className="mr-2"
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.icon}
                </motion.div>
                <span className="text-white text-sm">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Additional social proof */}
          <motion.div 
            className="mt-16 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10 max-w-3xl mx-auto hover:bg-white/15 transition-all duration-300"
            variants={itemVariants}
            whileHover={{ 
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
              y: -5
            }}
          >
            <div className="flex items-center justify-center mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.svg 
                  key={star}
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-yellow-400" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + star * 0.1 }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
              ))}
            </div>
            <motion.p 
              className="text-white text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="font-semibold">We've completed over 1,500 projects</span> with a 
              <span className="font-bold text-yellow-400"> 4.9/5</span> customer satisfaction rating!
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated corner decoration */}
      <motion.div 
        className="absolute -bottom-24 -right-24 w-48 h-48 bg-cta/20 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
      />
      
      <motion.div 
        className="absolute -top-16 -left-16 w-32 h-32 bg-white/10 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        viewport={{ once: true }}
      />
    </section>
  );
};

export default CallToAction;