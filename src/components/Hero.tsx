import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Star, Award, Instagram, Facebook } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24 lg:pt-28">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/2dfe2e53-b4b0-40be-a1d0-80e6a5782e20.png')`,
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Decorative elements - Hidden on mobile */}
      <div className="hidden md:block absolute top-10 left-10 text-teal-300 opacity-60 animate-bounce">
        <div className="w-6 h-6 md:w-8 md:h-8 bg-teal-200 rounded-full"></div>
      </div>
      <div className="hidden md:block absolute top-20 right-8 text-orange-300 opacity-60 animate-pulse">
        <div className="w-4 h-4 md:w-6 md:h-6 bg-orange-200 rounded-full"></div>
      </div>
      <div className="hidden md:block absolute bottom-20 left-10 text-amber-300 opacity-60 animate-bounce delay-300">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-200 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10 py-12">
        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 animate-fade-in delay-200 drop-shadow-2xl">
          Find Your Perfect
          <span className="block text-teal-300 mt-2">Furry Companion</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto animate-fade-in delay-400 drop-shadow-lg px-2">
          Premium puppies from a trusted breeder with 13 years of experience. 
          Specializing in ShihTzu, Doberman, Cavapoo, GoldenDoodle, Chihuahua, and Dachshund breeds.
        </p>

        {/* Trust indicators */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-8 mb-8 md:mb-10 animate-fade-in delay-500 flex-wrap px-2">
          <div className="w-full sm:w-auto flex items-center justify-center gap-2 text-white/90 bg-black/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />
            <span className="text-sm sm:text-base font-semibold">13+ Years Experience</span>
          </div>
          <div className="w-full sm:w-auto flex items-center justify-center gap-2 text-white/90 bg-black/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
            <span className="text-sm sm:text-base font-semibold">Health Guaranteed</span>
          </div>
          <div className="w-full sm:w-auto flex items-center justify-center gap-2 text-white/90 bg-black/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm">
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            <span className="text-sm sm:text-base font-semibold">Premium Bloodlines</span>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mb-8 md:mb-10 animate-fade-in delay-600 max-w-2xl mx-auto px-2">
          <a 
            href="https://instagram.com/pickapuppybreeder" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-white/90 hover:text-pink-400 transition-colors duration-300 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-black/50"
          >
            <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium">Follow on Instagram</span>
          </a>
          <a 
            href="https://facebook.com/pickapuppybreeder" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-white/90 hover:text-blue-400 transition-colors duration-300 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-black/50"
          >
            <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium">Like on Facebook</span>
          </a>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in delay-700 px-2">
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-2 border-teal-500"
            onClick={() => scrollToSection('available-puppies')}
          >
            See Available Puppies
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection('breeds')}
          >
            Explore Our Breeds
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
