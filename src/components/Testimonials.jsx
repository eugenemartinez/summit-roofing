import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials = () => {
  // Testimonial data
  const testimonialData = [
    {
      id: 1,
      name: "Jennifer Thompson",
      location: "Westview, CA",
      rating: 5,
      text: "Summit Roofing replaced our entire roof after storm damage, and we couldn't be happier with the results. Their team was professional, efficient, and cleaned up thoroughly after the job. The new roof looks fantastic and has already protected us through several storms.",
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      name: "Robert Garcia",
      location: "Lakeside, CA",
      rating: 5,
      text: "I needed emergency repairs after a tree fell on my roof. Summit Roofing responded quickly, secured the damage, and completed the repairs within a week. Their pricing was transparent and fair, and the quality of work was excellent. I highly recommend their services.",
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      id: 3,
      name: "Sarah Wilson",
      location: "Highland Heights, CA",
      rating: 5,
      text: "As a first-time homeowner, I was nervous about replacing my aging roof. Summit Roofing walked me through every step of the process, helped me select the perfect materials, and completed the work on schedule. My new roof is beautiful and I've already noticed improvements in my energy bills.",
      image: "https://randomuser.me/api/portraits/women/64.jpg"
    },
    {
      id: 4,
      name: "Michael Johnson",
      location: "Crestview, CA",
      rating: 4,
      text: "Summit Roofing installed a metal roof on our mountain cabin last year. Despite challenging weather conditions and difficult access, they completed the project professionally and efficiently. The roof has held up perfectly through winter storms and high winds.",
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      id: 5,
      name: "Emily Rodriguez",
      location: "Riverdale, CA",
      rating: 5,
      text: "We hired Summit Roofing for our office building's roof replacement. Their commercial team minimized disruption to our business operations and delivered exceptional results. The project manager kept us informed throughout the entire process, and they even finished ahead of schedule.",
      image: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
      id: 6,
      name: "David Chen",
      location: "Oak Hills, CA",
      rating: 5,
      text: "After getting quotes from several companies, we chose Summit Roofing for their competitive pricing and outstanding reviews. They didn't disappoint! The crew was respectful of our property, the workmanship is excellent, and they honored every aspect of their warranty when we had a minor issue.",
      image: "https://randomuser.me/api/portraits/men/33.jpg"
    }
  ];
  
  // State for controlling current slide in mobile view
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  
  // Auto advance slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev === testimonialData.length - 1 ? 0 : prev + 1));
    }, 6000);
    
    return () => clearInterval(interval);
  }, [testimonialData.length]);
  
  // Move to next slide
  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === testimonialData.length - 1 ? 0 : prev + 1));
  };
  
  // Move to previous slide
  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? testimonialData.length - 1 : prev - 1));
  };
  
  // Function to render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <motion.span 
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 * index }}
      >
        <FaStar 
          className={index < rating ? "text-yellow-400" : "text-gray-300"} 
        />
      </motion.span>
    ));
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "3rem",
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <section id="testimonials" className="py-16 bg-gradient-to-br from-primary via-primary to-primary/90">
      <div className="container mx-auto px-4">
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
              className="text-white uppercase tracking-wider text-sm font-semibold"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              Testimonials
            </motion.span>
            <motion.div 
              className="h-1 w-12 bg-cta ml-4"
              variants={lineVariants}
            ></motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            What Our Customers Say
          </motion.h2>
          
          <motion.p 
            className="text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Don't just take our word for it. Hear from homeowners and businesses who trust Summit Roofing for their roofing needs.
          </motion.p>
        </motion.div>
        
        {/* Updated Mobile testimonial slider with fixed height and improved layout */}
        <div className="md:hidden">
          <div className="bg-white rounded-lg shadow-lg p-6 relative overflow-visible min-h-[400px]">
            {/* Quote icon positioned properly with more space */}
            <motion.div 
              className="absolute -top-5 left-6 bg-cta hover:bg-cta/90 rounded-full p-3 transition-all duration-300 z-10"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <FaQuoteLeft className="text-white text-xl" />
            </motion.div>
            
            <div className="relative h-full">
              <AnimatePresence initial={false} custom={direction} mode="sync">
                <motion.div 
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="pt-4 absolute inset-0"
                >
                  <motion.div 
                    className="flex items-center mb-4 mt-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <motion.img 
                      src={testimonialData[currentSlide].image}
                      alt={testimonialData[currentSlide].name}
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.1 }}
                    />
                    <div>
                      <motion.h4 
                        className="font-bold text-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        {testimonialData[currentSlide].name}
                      </motion.h4>
                      <motion.p 
                        className="text-sm text-accent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        {testimonialData[currentSlide].location}
                      </motion.p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex mb-3 space-x-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    {renderStars(testimonialData[currentSlide].rating)}
                  </motion.div>
                  
                  {/* Shortened text container with proper spacing for navigation */}
                  <motion.p 
                    className="text-accent max-h-[160px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    "{testimonialData[currentSlide].text}"
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Updated navigation controls to match the dots style */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-6">
              <motion.button 
                onClick={prevSlide}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300 border border-gray-200 shadow-sm"
                whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-primary" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </motion.button>
              
              {/* Dot indicators in the middle */}
              <div className="flex justify-center space-x-2">
                {testimonialData.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentSlide ? 1 : -1);
                      setCurrentSlide(index);
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'w-8 bg-cta' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 1 }}
                  ></motion.button>
                ))}
              </div>
              
              <motion.button 
                onClick={nextSlide}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300 border border-gray-200 shadow-sm"
                whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-primary" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Desktop testimonial grid */}
        <motion.div 
          className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonialData.map((testimonial, i) => (
            <motion.div 
              key={testimonial.id} 
              className="bg-white rounded-lg shadow-lg p-6 relative"
              custom={i}
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div 
                className="absolute -top-5 left-6 bg-cta hover:bg-cta/90 rounded-full p-3 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <FaQuoteLeft className="text-white text-xl" />
              </motion.div>
              
              <div className="pt-4">
                <motion.div 
                  className="flex items-center mb-4 mt-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <motion.img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div>
                    <h4 className="font-bold text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-accent">{testimonial.location}</p>
                  </div>
                </motion.div>
                
                <div className="flex mb-3 space-x-1">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-accent">
                  "{testimonial.text}"
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Google reviews badge */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center mt-12 space-y-4 md:space-y-0 md:space-x-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {[
            {
              icon: <motion.svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}>
                <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"></path>
              </motion.svg>,
              title: "4.9/5.0",
              subtitle: "Based on 150+ Reviews"
            },
            {
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>,
              title: "A+ Rating",
              subtitle: "Better Business Bureau"
            },
            {
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>,
              title: "20+ Years",
              subtitle: "Serving our community"
            }
          ].map((badge, index) => (
            <motion.div 
              key={index}
              className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg flex items-center hover:bg-white/15 transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5 }
                }
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)"
              }}
            >
              <motion.div 
                className="mr-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                {badge.icon}
              </motion.div>
              <div className="text-white">
                <motion.p 
                  className="font-bold text-lg"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {badge.title}
                </motion.p>
                <motion.p 
                  className="text-sm"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {badge.subtitle}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;