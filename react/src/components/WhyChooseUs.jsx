import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaMedal, 
  FaUserTie, 
  FaMoneyBillWave, 
  FaClock, 
  FaShieldAlt, 
  FaThumbsUp,
  FaChevronRight
} from 'react-icons/fa';
import useSmoothScroll from '../hooks/useSmoothScroll'; // Import our hook

const WhyChooseUs = () => {
  // Use the smooth scroll hook with a header offset
  const { scrollToSection } = useSmoothScroll(80);

  const reasons = [
    {
      id: 1,
      title: 'Quality Materials',
      description: 'We use only premium roofing materials from trusted manufacturers, ensuring durability and long-lasting performance for your roof.',
      icon: <FaMedal className="text-4xl text-cta" />
    },
    {
      id: 2,
      title: 'Expert Craftsmanship',
      description: 'Our team consists of skilled professionals with years of experience and continuous training in the latest roofing techniques.',
      icon: <FaUserTie className="text-4xl text-cta" />
    },
    {
      id: 3,
      title: 'Competitive Pricing',
      description: 'We offer transparent, fair pricing with no hidden fees or surprises, plus flexible financing options to fit your budget.',
      icon: <FaMoneyBillWave className="text-4xl text-cta" />
    },
    {
      id: 4,
      title: 'Timely Service',
      description: 'We respect your schedule and complete projects efficiently without sacrificing quality or cutting corners.',
      icon: <FaClock className="text-4xl text-cta" />
    },
    {
      id: 5,
      title: 'Comprehensive Warranties',
      description: 'Our work is backed by industry-leading warranties on both materials and workmanship for your peace of mind.',
      icon: <FaShieldAlt className="text-4xl text-cta" />
    },
    {
      id: 6,
      title: 'Customer Satisfaction',
      description: 'We\'re not satisfied until you are. Our commitment to customer service has earned us hundreds of positive reviews.',
      icon: <FaThumbsUp className="text-4xl text-cta" />
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
      transition: { duration: 0.5 }
    }
  };

  const imageVariants = {
    offscreen: { 
      opacity: 0, 
      scale: 0.9,
      y: 30
    },
    onscreen: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="why-choose-us" className="py-16 bg-neutral-bg">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="flex items-center justify-center mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="h-1 w-12 bg-cta mr-4"
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            ></motion.div>
            <span className="text-accent uppercase tracking-wider text-sm font-semibold">Why Choose Us</span>
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            What Sets Summit Roofing Apart
          </motion.h2>
          
          <motion.p 
            className="text-accent max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            When you choose Summit Roofing, you get more than just a roofing contractor. You get a dedicated partner committed to quality, integrity, and excellence.
          </motion.p>
        </motion.div>
        
        {/* Main content - alternating image and text sections */}
        <div className="relative mb-20">
          {/* Background decoration */}
          <motion.div 
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 z-0"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          ></motion.div>
          
          {/* Image section */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center mb-16">
            <motion.div 
              className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageVariants}
            >
              <motion.div className="overflow-hidden rounded-lg shadow-lg">
                <motion.img 
                  src="https://images.unsplash.com/photo-1643225523483-e2c434191bba?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Roofing professionals at work" 
                  className="w-full h-80 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 lg:pl-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h3 
                className="text-2xl font-bold text-primary mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Professional Team With Years of Experience
              </motion.h3>
              <motion.p 
                className="text-accent mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Our team consists of certified roofing professionals who take pride in their craft. With decades of combined experience, we handle everything from simple repairs to complex installations with precision and care.
              </motion.p>
              
              <motion.ul 
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  "Fully licensed, bonded, and insured",
                  "Continuous training on latest techniques",
                  "Background-checked and professional crew"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="h-5 w-5 mr-2 text-cta mt-1 flex-shrink-0"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FaChevronRight className="text-cta" />
                    </motion.div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
          
          {/* Second image section (reverse layout) */}
          <div className="relative z-10 flex flex-col lg:flex-row-reverse items-center">
            <motion.div 
              className="lg:w-1/2 lg:pl-12 mb-10 lg:mb-0"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageVariants}
            >
              <motion.div className="overflow-hidden rounded-lg shadow-lg">
                <motion.img 
                  src="https://images.unsplash.com/photo-1635424710928-0544e8512eae?q=80&w=2574" 
                  alt="High-quality roofing materials" 
                  className="w-full h-80 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 lg:pr-12"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h3 
                className="text-2xl font-bold text-primary mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Premium Materials & Lasting Results
              </motion.h3>
              <motion.p 
                className="text-accent mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                We partner with leading manufacturers to provide the highest quality materials for your roof. From traditional asphalt shingles to cutting-edge synthetic options, we offer durable solutions that stand the test of time.
              </motion.p>
              
              <motion.ul 
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  "Top-rated materials from trusted suppliers",
                  "Energy-efficient and environmentally friendly options",
                  "Extended manufacturer warranties"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="h-5 w-5 mr-2 text-cta mt-1 flex-shrink-0"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FaChevronRight className="text-cta" />
                    </motion.div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
        
        {/* Key benefits grid with animations */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {reasons.map((reason) => (
            <motion.div 
              key={reason.id} 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(30, 58, 138, 0.1)"
              }}
            >
              <motion.div 
                className="mb-5 p-4 bg-primary/5 hover:bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300"
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 0.4 }}
              >
                {reason.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-primary mb-3">{reason.title}</h3>
              <p className="text-accent">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Customer action with animation */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.a 
            href="#contact" 
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-md transition-all duration-300"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0px 5px 15px rgba(30, 58, 138, 0.3)" 
            }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToSection} // Add smooth scroll
          >
            Experience the Summit Difference
            <FaChevronRight className="ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;