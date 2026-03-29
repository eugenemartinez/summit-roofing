import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import useSmoothScroll from '../hooks/useSmoothScroll'; // Import our hook

const OurWork = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Use the smooth scroll hook with a header offset
  const { scrollToSection } = useSmoothScroll(80);
  
  // Project categories
  const categories = ['All', 'Residential', 'Commercial', 'Repairs', 'Metal Roofing'];
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Project portfolio data
  const projects = [
    {
      id: 1,
      title: 'Modern Home Shingle Installation',
      category: 'Residential',
      description: 'Complete roof replacement with premium architectural shingles for this modern family home.',
      image: 'https://images.pexels.com/photos/15421142/pexels-photo-15421142/free-photo-of-tiles-on-house-roof.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'Lakeside, CA'
    },
    {
      id: 2,
      title: 'Commercial Office Complex',
      category: 'Commercial',
      description: 'New TPO roofing system for a 15,000 sq ft office complex with improved insulation and drainage.',
      image: 'https://images.pexels.com/photos/986829/pexels-photo-986829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'Downtown Metro'
    },
    {
      id: 3,
      title: 'Storm Damage Restoration',
      category: 'Repairs',
      description: 'Emergency roof repair after severe wind damage, including structural reinforcement and shingle replacement.',
      image: 'https://images.pexels.com/photos/17931269/pexels-photo-17931269/free-photo-of-destroyed-house-in-village.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      location: 'Highland Heights'
    },
    {
      id: 4,
      title: 'Standing Seam Metal Roof',
      category: 'Metal Roofing',
      description: 'Custom metal roofing installation with seamless gutters and snow guards for this mountain retreat.',
      image: 'https://images.unsplash.com/photo-1628002881911-8bcdfbdf320e?q=80&w=902&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      location: 'Mountain View'
    },
    {
      id: 5,
      title: 'Craftsman Style Home',
      category: 'Residential',
      description: 'Complete tear-off and replacement with architectural shingles that complement the craftsman aesthetic.',
      image: 'https://images.unsplash.com/photo-1713789271157-5cebf11b961e?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      location: 'Heritage District'
    },
    {
      id: 6,
      title: 'Retail Shopping Center',
      category: 'Commercial',
      description: 'Large-scale commercial roofing project featuring energy-efficient materials and built-up membrane system.',
      image: 'https://images.unsplash.com/photo-1525478440856-b40668b83b79?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      location: 'Commerce Square'
    }
  ];
  
  // Filter projects based on active category
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  // Open modal with selected image
  const openModal = (project) => {
    setSelectedImage(project);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };
  
  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

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

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const categoryVariants = {
    inactive: { 
      scale: 1,
      backgroundColor: "#f3f4f6", // gray-100
      color: "#4B5563" // accent color
    },
    active: { 
      scale: 1.05,
      backgroundColor: "#1e3a8a", // primary color
      color: "#ffffff",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };
  
  return (
    <section id="projects" className="py-16 bg-white">
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
            <span className="text-accent uppercase tracking-wider text-sm font-semibold">Our Portfolio</span>
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
            Featured Roofing Projects
          </motion.h2>
          
          <motion.p 
            className="text-accent max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Browse through our completed projects to see the quality and craftsmanship we bring to every roof.
          </motion.p>
          
          {/* Category filters */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="px-4 py-2 rounded-full transition-all duration-200 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={categoryVariants}
                initial={activeCategory === category ? "active" : "inactive"}
                animate={activeCategory === category ? "active" : "inactive"}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Projects grid with animations */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id} 
                className="bg-neutral-bg rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                variants={projectVariants}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -5 }}
                onClick={() => openModal(project)} // Added onClick to the entire card
              >
                <div className="relative overflow-hidden group h-64">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-primary/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    // Removed whileHover since we're using group hover instead
                  >
                    <motion.div 
                      className="bg-white rounded-full p-3 text-primary hover:text-cta transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FaSearch className="text-xl" />
                    </motion.div>
                  </motion.div>
                </div>
                
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <motion.span 
                      className="text-xs font-semibold text-cta bg-cta/10 px-2 py-1 rounded"
                      whileHover={{ scale: 1.05 }}
                    >
                      {project.category}
                    </motion.span>
                    <span className="text-xs text-accent">
                      {project.location}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-primary mb-2">{project.title}</h3>
                  <p className="text-accent text-sm">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* "View More Projects" button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.a 
            href="#contact" 
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-md"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0px 5px 15px rgba(30, 58, 138, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToSection} // Add smooth scroll
          >
            Request Your Free Estimate
          </motion.a>
        </motion.div>
      </div>
      
      {/* Image modal with animations */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div 
              className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              <motion.button 
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-primary/50 hover:bg-primary rounded-full p-2 z-10"
                whileHover={{ scale: 1.1, backgroundColor: "#1e3a8a" }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTimes />
              </motion.button>
              
              <div className="relative pb-[56.25%]">
                <motion.img 
                  src={selectedImage.image} 
                  alt={selectedImage.title}
                  className="absolute inset-0 w-full h-full object-cover" 
                  initial={{ filter: "blur(10px)" }}
                  animate={{ filter: "blur(0px)" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              
              <motion.div 
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-cta bg-cta/10 px-2 py-1 rounded">
                    {selectedImage.category}
                  </span>
                  <span className="text-sm text-accent">
                    {selectedImage.location}
                  </span>
                </div>
                <h3 className="font-bold text-2xl text-primary mb-2">{selectedImage.title}</h3>
                <p className="text-accent">{selectedImage.description}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurWork;