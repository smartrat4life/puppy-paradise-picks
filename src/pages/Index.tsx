
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import BreedsSection from '../components/BreedsSection';
import AboutSection from '../components/AboutSection';
import AvailablePuppies from '../components/AvailablePuppies';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
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
