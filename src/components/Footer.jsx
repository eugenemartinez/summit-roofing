import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedinIn, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaClock,
  FaShieldAlt,
  FaHandshake,
  FaAward
} from 'react-icons/fa';
import Logo from './Logo';
import useSmoothScroll from '../hooks/useSmoothScroll'; // Import our hook

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Use smooth scroll hook with a small offset for footer links
  const { scrollToSection } = useSmoothScroll(20);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };
  
  const linkVariants = {
    hover: { 
      x: 5, 
      transition: { duration: 0.2 } 
    }
  };
  
  const iconVariants = {
    hover: { 
      scale: 1.2, 
      rotate: 5, 
      transition: { duration: 0.2 } 
    }
  };
  
  return (
    <footer className="bg-gradient-to-br from-primary via-primary to-primary/95 text-white relative">
      {/* Wave decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform -translate-y-99%">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-12 w-full">
          <motion.path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="#f8fafc" 
            className="opacity-10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          ></motion.path>
        </svg>
      </div>
      
      {/* Trust badges */}
      <div className="container mx-auto px-4 py-8 border-b border-white/10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: <FaShieldAlt />, title: "Licensed & Insured", text: "Full coverage for peace of mind" },
            { icon: <FaHandshake />, title: "Quality Guarantee", text: "Satisfaction on every project" },
            { icon: <FaAward />, title: "Award Winning Service", text: "Recognized industry leader" },
          ].map((badge, index) => (
            <motion.div 
              key={index}
              className="flex items-center"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-white/10 hover:bg-white/20 p-4 rounded-full mr-4 text-cta text-xl transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                {badge.icon}
              </motion.div>
              <div>
                <h4 className="font-semibold">{badge.title}</h4>
                <p className="text-white/70 text-sm">{badge.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Company info */}
          <motion.div variants={itemVariants}>
            <div className="mb-6">
              <motion.a
                href="#"
                onClick={scrollToSection}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <Logo size="medium" />
              </motion.a>
            </div>
            
            <motion.p 
              className="mb-6 text-white/80 leading-relaxed"
              variants={itemVariants}
            >
              Professional roofing solutions for residential and commercial properties. 
              Quality craftsmanship with over 20 years of industry experience.
            </motion.p>
            
            <motion.div 
              className="flex space-x-4"
              variants={itemVariants}
            >
              {[
                { icon: <FaFacebookF />, href: "#" },
                { icon: <FaInstagram />, href: "#" },
                { icon: <FaTwitter />, href: "#" },
                { icon: <FaLinkedinIn />, href: "#" }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  className="bg-white/10 hover:bg-cta p-2 rounded-full transition-colors duration-300"
                  whileHover={{ 
                    scale: 1.2
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-lg font-semibold mb-6 border-b border-white/20 pb-2 flex items-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span 
                className="w-1.5 h-6 bg-cta rounded-full mr-2 inline-block"
                initial={{ height: 0 }}
                animate={{ height: 24 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              ></motion.span>
              Quick Links
            </motion.h3>
            
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "#about" },
                { label: "Our Services", href: "#services" },
                { label: "Recent Projects", href: "#projects" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact Us", href: "#contact" }
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  custom={index}
                >
                  <motion.a 
                    href={link.href} 
                    className="text-white/80 hover:text-cta transition-colors duration-300 flex items-center"
                    variants={linkVariants}
                    whileHover="hover"
                    onClick={scrollToSection} // Add smooth scroll
                  >
                    <motion.span 
                      className="mr-2 text-cta"
                      variants={iconVariants}
                      whileHover="hover"
                    >›</motion.span> 
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Services */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-lg font-semibold mb-6 border-b border-white/20 pb-2 flex items-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span 
                className="w-1.5 h-6 bg-cta rounded-full mr-2 inline-block"
                initial={{ height: 0 }}
                animate={{ height: 24 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              ></motion.span>
              Our Services
            </motion.h3>
            
            <ul className="space-y-3">
              {[
                { label: "Roof Installation", href: "#services" },
                { label: "Roof Repair", href: "#services" },
                { label: "Roof Inspection", href: "#services" },
                { label: "Gutter Installation", href: "#services" },
                { label: "Storm Damage Repair", href: "#services" },
                { label: "Commercial Roofing", href: "#services" }
              ].map((service, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  custom={index}
                >
                  <motion.a 
                    href={service.href} 
                    className="text-white/80 hover:text-cta transition-colors duration-300 flex items-center"
                    variants={linkVariants}
                    whileHover="hover"
                    onClick={scrollToSection} // Add smooth scroll
                  >
                    <motion.span 
                      className="mr-2 text-cta"
                      variants={iconVariants}
                      whileHover="hover"
                    >›</motion.span> 
                    {service.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-lg font-semibold mb-6 border-b border-white/20 pb-2 flex items-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span 
                className="w-1.5 h-6 bg-cta rounded-full mr-2 inline-block"
                initial={{ height: 0 }}
                animate={{ height: 24 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              ></motion.span>
              Contact Us
            </motion.h3>
            
            <ul className="space-y-4">
              <motion.li 
                className="flex items-start"
                variants={itemVariants}
              >
                <motion.div 
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full mr-3 mt-1 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaMapMarkerAlt className="text-cta" />
                </motion.div>
                <span className="text-white/80">123 Roofing Way, Anytown, ST 12345</span>
              </motion.li>
              
              <motion.li 
                className="flex items-center"
                variants={itemVariants}
              >
                <motion.div 
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full mr-3 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaPhoneAlt className="text-cta" />
                </motion.div>
                <motion.a 
                  href="tel:+15551234567" 
                  className="text-white/80 hover:text-cta transition-colors duration-300"
                  whileHover={{ x: 3 }}
                >
                  (555) 123-4567
                </motion.a>
              </motion.li>
              
              <motion.li 
                className="flex items-center"
                variants={itemVariants}
              >
                <motion.div 
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full mr-3 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaEnvelope className="text-cta" />
                </motion.div>
                <motion.a 
                  href="mailto:contact@summitroofing.com" 
                  className="text-white/80 hover:text-cta transition-colors duration-300"
                  whileHover={{ x: 3 }}
                >
                  contact@summitroofing.com
                </motion.a>
              </motion.li>
              
              <motion.li 
                className="flex items-start"
                variants={itemVariants}
              >
                <motion.div 
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-full mr-3 mt-1 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaClock className="text-cta" />
                </motion.div>
                <div className="text-white/80">
                  <div>Monday-Friday: 7am-6pm</div>
                  <div>Saturday: 8am-2pm</div>
                  <div>Sunday: Closed</div>
                </div>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom bar */}
      <div className="bg-accent py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
          <motion.div 
            className="mb-3 md:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            © {currentYear} Summit Roofing. All rights reserved.
          </motion.div>
          <motion.div 
            className="flex flex-wrap justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { text: "Privacy Policy", href: "#" },
              { text: "Terms of Service", href: "#" },
              { text: "Sitemap", href: "#" }
            ].map((item, index) => (
              <motion.a 
                key={item.text}
                href={item.href} 
                className="hover:text-cta transition-colors duration-300"
                whileHover={{ x: 2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + (index * 0.1) }}
                onClick={scrollToSection} // Add smooth scroll
              >
                {item.text}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;