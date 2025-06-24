
import React from 'react';
import Hero from '../components/Hero';
import BreedsSection from '../components/BreedsSection';
import AboutSection from '../components/AboutSection';
import AvailablePuppies from '../components/AvailablePuppies';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Hero />
      <BreedsSection />
      <AboutSection />
      <AvailablePuppies />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
