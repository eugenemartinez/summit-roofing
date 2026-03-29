import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaBuilding, 
  FaTools, 
  FaClipboardCheck, 
  FaSnowflake,
  FaLeaf
} from 'react-icons/fa';
import useSmoothScroll from '../hooks/useSmoothScroll'; // Import our hook

const Services = () => {
  // Use smooth scroll hook with a header offset
  const { scrollToSection } = useSmoothScroll(80);

  const servicesList = [
    {
      id: 1,
      title: 'Residential Roofing',
      description: 'Complete roofing solutions for homeowners, including installation, replacement, and maintenance of asphalt shingles, metal roofing, tile, and more.',
      icon: <FaHome className="text-6xl text-cta" />,
      features: [
        'Architectural shingles',
        'Metal roof installation',
        'Cedar shake roofs',
        'Tile and slate options',
        'Energy-efficient materials'
      ]
    },
    {
      id: 2,
      title: 'Commercial Roofing',
      description: 'Professional roofing systems for businesses, warehouses, and commercial properties with minimal disruption to your operations.',
      icon: <FaBuilding className="text-6xl text-cta" />,
      features: [
        'TPO & EPDM systems',
        'Built-up roofing (BUR)',
        'Modified bitumen',
        'Green roof installations',
        'Preventative maintenance plans'
      ]
    },
    {
      id: 3,
      title: 'Roof Repairs',
      description: 'Fast, reliable repair services to fix leaks, damage, and wear to extend your roof\'s lifespan and prevent water damage.',
      icon: <FaTools className="text-6xl text-cta" />,
      features: [
        'Leak detection & repair',
        'Shingle replacement',
        'Flashing repair',
        'Valley repair',
        'Emergency repair services'
      ]
    },
    {
      id: 4,
      title: 'Roof Inspections',
      description: 'Thorough assessments of your roof\'s condition with detailed reports and recommendations for maintenance or repairs.',
      icon: <FaClipboardCheck className="text-6xl text-cta" />,
      features: [
        'Comprehensive evaluation',
        'Written inspection reports',
        'Insurance claim assistance',
        'Preventative maintenance',
        'Real estate inspections'
      ]
    },
    {
      id: 5,
      title: 'Storm Damage Repair',
      description: 'Specialized repair services for roofs damaged by severe weather, including wind, hail, and falling debris.',
      icon: <FaSnowflake className="text-6xl text-cta" />,
      features: [
        'Emergency tarping',
        'Hail damage assessment',
        'Wind damage repair',
        'Insurance claim support',
        '24/7 emergency response'
      ]
    },
    {
      id: 6,
      title: 'Gutter Services',
      description: 'Installation, repair, and maintenance of gutters and downspouts to protect your property from water damage.',
      icon: <FaLeaf className="text-6xl text-cta" />,
      features: [
        'Seamless gutter installation',
        'Gutter guards',
        'Downspout installation',
        'Gutter cleaning',
        'Repairs & maintenance'
      ]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -5,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300 }
    },
    hover: {
      scale: 1.1,
      rotate: [0, 5, -5, 0],
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
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
            <span className="text-accent uppercase tracking-wider text-sm font-semibold">Our Services</span>
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
            Comprehensive Roofing Solutions
          </motion.h2>
          
          <motion.p 
            className="text-accent max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            From installation to repairs, we provide expert roofing services for residential and commercial properties.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {servicesList.map((service) => (
            <motion.div 
              key={service.id}
              className="bg-neutral-bg rounded-lg p-8 shadow-sm transition-all duration-300 flex flex-col h-full"
              variants={itemVariants}
              whileHover="hover"
            >
              <motion.div 
                className="text-center mb-6"
                whileHover="hover"
              >
                <motion.div 
                  className="flex justify-center items-center mb-4"
                  variants={iconVariants}
                >
                  <motion.div 
                    className="bg-primary/5 hover:bg-primary/10 p-5 rounded-full inline-flex items-center justify-center transition-all duration-300"
                    whileHover={{ 
                      scale: 1.05
                    }}
                  >
                    {service.icon}
                  </motion.div>
                </motion.div>
                <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
              </motion.div>
              
              <p className="text-accent mb-6 flex-grow">{service.description}</p>
              
              <motion.ul 
                className="space-y-2 border-t border-gray-200 pt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                viewport={{ once: true }}
              >
                {service.features.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-center text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (index * 0.1), duration: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 3 }}
                  >
                    <svg className="h-4 w-4 mr-2 text-cta" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
              
              <motion.div 
                className="mt-6 pt-4 border-t border-gray-200"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.a 
                  href="#contact" 
                  className="inline-block w-full text-center bg-primary hover:bg-primary/90 text-white font-medium px-4 py-2 rounded-md transition-all duration-300"
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 4px 12px rgba(30, 58, 138, 0.3)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToSection} // Add smooth scroll
                >
                  Get a Quote
                </motion.a>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 bg-primary/5 hover:bg-primary/8 border border-primary/10 rounded-lg p-6 md:p-8 transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ 
            boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.08)"
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <motion.h3 
                className="text-2xl font-semibold text-primary mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Not sure which service you need?
              </motion.h3>
              <motion.p 
                className="text-accent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Our experts can assess your roofing needs and recommend the best solution.
              </motion.p>
            </div>
            
            <motion.a 
              href="#contact" 
              className="inline-flex items-center bg-cta hover:bg-cta/90 text-white font-medium px-6 py-3 rounded-md transition-all duration-300 whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 5px 15px rgba(216, 106, 106, 0.3)" 
              }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToSection} // Add smooth scroll
            >
              Schedule a Free Consultation
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ x: 0 }}
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </motion.svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;