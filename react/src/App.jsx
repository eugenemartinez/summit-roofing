import React from 'react';

// Import all components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import OurWork from './components/OurWork';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import ContactForm from './components/ContactForm';
import NewsletterSubscribe from './components/NewsletterSubscribe';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <OurWork />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <CallToAction />
        <ContactForm />
        <NewsletterSubscribe />
      </main>
      <Footer />
      <ScrollToTop showThreshold={200} /> 
    </div>
  );
}

export default App;
