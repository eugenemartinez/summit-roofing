import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCheck } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Roof Repair',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [activeField, setActiveField] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Roof Repair',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  const serviceOptions = [
    'Roof Repair',
    'Roof Replacement',
    'Roof Inspection',
    'Gutter Installation',
    'Storm Damage Assessment',
    'Commercial Roofing',
    'Other Services'
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.5 }
    }
  };

  const contactIconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 10 }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };
  
  return (
    <section id="contact" className="py-16 bg-neutral-bg">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div 
            className="flex items-center justify-center mb-4"
            variants={itemVariants}
          >
            <motion.div 
              className="h-1 w-12 bg-cta mr-4"
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            ></motion.div>
            <motion.span 
              className="text-accent uppercase tracking-wider text-sm font-semibold"
              variants={itemVariants}
            >
              Contact Us
            </motion.span>
            <motion.div 
              className="h-1 w-12 bg-cta ml-4"
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            ></motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-primary mb-4"
            variants={itemVariants}
          >
            Get Your Free Roofing Estimate
          </motion.h2>
          
          <motion.p 
            className="text-accent max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Fill out the form below and our team will get back to you within 24 hours to discuss your roofing needs.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden"
            whileHover={{ boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)" }}
            transition={{ duration: 0.3 }}
          >
            {/* Contact information side */}
            <motion.div 
              className="lg:w-2/5 bg-gradient-to-br from-primary to-primary/90 p-8 text-white"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h3 
                className="text-xl font-semibold mb-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Contact Information
              </motion.h3>
              
              <motion.div 
                className="space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="bg-white/10 hover:bg-white/20 rounded-full p-3 mr-4 flex-shrink-0 transition-all duration-300"
                    variants={contactIconVariants}
                    whileHover="hover"
                  >
                    <FaMapMarkerAlt className="h-5 w-5" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-white/70 mb-1">Address</p>
                    <p>123 Roofing Way, Anytown, ST 12345</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="bg-white/10 hover:bg-white/20 rounded-full p-3 mr-4 flex-shrink-0 transition-all duration-300"
                    variants={contactIconVariants}
                    whileHover="hover"
                  >
                    <FaPhoneAlt className="h-5 w-5" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-white/70 mb-1">Phone</p>
                    <motion.a 
                      href="tel:+15551234567" 
                      className="hover:text-white/80 transition-colors duration-300"
                      whileHover={{ x: 3 }}
                    >
                      (555) 123-4567
                    </motion.a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="bg-white/10 hover:bg-white/20 rounded-full p-3 mr-4 flex-shrink-0 transition-all duration-300"
                    variants={contactIconVariants}
                    whileHover="hover"
                  >
                    <FaEnvelope className="h-5 w-5" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-white/70 mb-1">Email</p>
                    <motion.a 
                      href="mailto:contact@summitroofing.com" 
                      className="hover:text-white/80 transition-colors duration-300"
                      whileHover={{ x: 3 }}
                    >
                      contact@summitroofing.com
                    </motion.a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="bg-white/10 hover:bg-white/20 rounded-full p-3 mr-4 flex-shrink-0 transition-all duration-300"
                    variants={contactIconVariants}
                    whileHover="hover"
                  >
                    <FaClock className="h-5 w-5" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-white/70 mb-1">Hours</p>
                    <p>Mon-Fri: 7am-6pm</p>
                    <p>Sat: 8am-2pm</p>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Redesigned Trust indicators */}
              <motion.div 
                className="mt-10 pt-8 border-t border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.p 
                  className="text-sm mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  Proudly serving homeowners throughout the region with quality roofing solutions.
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-2" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  {['BBB Accredited', 'Fully Insured', 'Licensed Contractors'].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-xs inline-flex items-center transition-all duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + (index * 0.1), duration: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <FaCheck className="mr-1 text-cta" />
                      <span className="whitespace-nowrap">{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Form side */}
            <motion.div 
              className="lg:w-3/5 p-8"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div 
                    className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6"
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="flex">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                      <div>
                        <motion.p 
                          className="font-medium"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          Message sent successfully!
                        </motion.p>
                        <motion.p 
                          className="text-sm mt-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          We'll get back to you as soon as possible.
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <AnimatePresence>
                {submitError && (
                  <motion.div 
                    className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6"
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mr-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-medium">Something went wrong!</p>
                        <p className="text-sm mt-1">Please try again or call us directly.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <form onSubmit={handleSubmit}>
                <motion.div 
                  className="space-y-6 mb-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-medium text-accent mb-2">
                      Full Name <span className="text-cta">*</span>
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setActiveField('name')}
                      onBlur={() => setActiveField(null)}
                      className={`w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        activeField === 'name' ? 'shadow-[0px_0px_0px_2px_rgba(30,58,138,0.2)]' : ''
                      }`}
                      placeholder="John Doe"
                      required
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-medium text-accent mb-2">
                      Email Address <span className="text-cta">*</span>
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setActiveField('email')}
                      onBlur={() => setActiveField(null)}
                      className={`w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        activeField === 'email' ? 'shadow-[0px_0px_0px_2px_rgba(30,58,138,0.2)]' : ''
                      }`}
                      placeholder="your@email.com"
                      required
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                  
                  {/* Phone and service in 2 columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label htmlFor="phone" className="block text-sm font-medium text-accent mb-2">
                        Phone Number <span className="text-cta">*</span>
                      </label>
                      <motion.input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setActiveField('phone')}
                        onBlur={() => setActiveField(null)}
                        className={`w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                          activeField === 'phone' ? 'shadow-[0px_0px_0px_2px_rgba(30,58,138,0.2)]' : ''
                        }`}
                        placeholder="(123) 456-7890"
                        required
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <label htmlFor="service" className="block text-sm font-medium text-accent mb-2">
                        Service Needed
                      </label>
                      <motion.select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        onFocus={() => setActiveField('service')}
                        onBlur={() => setActiveField(null)}
                        className={`w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white cursor-pointer ${
                          activeField === 'service' ? 'shadow-[0px_0px_0px_2px_rgba(30,58,138,0.2)]' : ''
                        }`}
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        {serviceOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </motion.select>
                    </motion.div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mb-8"
                  variants={itemVariants}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-accent mb-2">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setActiveField('message')}
                    onBlur={() => setActiveField(null)}
                    rows="5"
                    className={`w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      activeField === 'message' ? 'shadow-[0px_0px_0px_2px_rgba(30,58,138,0.2)]' : ''
                    }`}
                    placeholder="Please provide details about your project..."
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  ></motion.textarea>
                </motion.div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-4 px-4 rounded-md transition-colors duration-300 flex justify-center items-center cursor-pointer"
                  whileHover={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(30, 58, 138, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  variants={itemVariants}
                >
                  {isSubmitting ? (
                    <>
                      <motion.svg 
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </motion.svg>
                      <span>Processing...</span>
                    </>
                  ) : "Request Free Estimate"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;