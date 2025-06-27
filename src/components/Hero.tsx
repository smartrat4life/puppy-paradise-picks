
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Star, Award, Instagram, Facebook } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/2dfe2e53-b4b0-40be-a1d0-80e6a5782e20.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 text-teal-300 opacity-60 animate-bounce">
        <div className="w-8 h-8 bg-teal-200 rounded-full"></div>
      </div>
      <div className="absolute top-40 right-32 text-orange-300 opacity-60 animate-pulse">
        <div className="w-6 h-6 bg-orange-200 rounded-full"></div>
      </div>
      <div className="absolute bottom-32 left-40 text-amber-300 opacity-60 animate-bounce delay-300">
        <div className="w-10 h-10 bg-amber-200 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in delay-200 drop-shadow-2xl">
          Find Your Perfect
          <span className="block text-teal-300">Furry Companion</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in delay-400 drop-shadow-lg">
          Premium puppies from a trusted breeder with 13 years of experience. 
          Specializing in ShihTzu, Doberman, Cavapoo, GoldenDoodle, Chihuahua, and Dachshund breeds.
        </p>

        {/* Trust indicators */}
        <div className="flex justify-center items-center gap-8 mb-10 animate-fade-in delay-500 flex-wrap">
          <div className="flex items-center gap-2 text-white/90 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
            <Award className="w-6 h-6 text-teal-400" />
            <span className="font-semibold">13+ Years Experience</span>
          </div>
          <div className="flex items-center gap-2 text-white/90 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
            <Heart className="w-6 h-6 text-red-400" />
            <span className="font-semibold">Health Guaranteed</span>
          </div>
          <div className="flex items-center gap-2 text-white/90 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
            <Star className="w-6 h-6 text-yellow-500" />
            <span className="font-semibold">Premium Bloodlines</span>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center items-center gap-6 mb-10 animate-fade-in delay-600">
          <a 
            href="https://instagram.com/pickapuppybreeder" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/90 hover:text-pink-400 transition-colors duration-300 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-black/50"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-sm font-medium">Follow our puppies on Instagram</span>
          </a>
          <a 
            href="https://facebook.com/pickapuppybreeder" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/90 hover:text-blue-400 transition-colors duration-300 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-black/50"
          >
            <Facebook className="w-5 h-5" />
            <span className="text-sm font-medium">Like us on Facebook</span>
          </a>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-700">
          <Button 
            size="lg" 
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-2 border-teal-500"
            onClick={() => scrollToSection('available-puppies')}
          >
            See Available Puppies
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-white text-white hover:bg-white hover:text-amber-900 px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            onClick={() => scrollToSection('breeds')}
          >
            Explore Our Breeds
          </Button>
        </div>

        {/* Video Call to Action */}
        <div className="mt-8 animate-fade-in delay-800">
          <p className="text-white/80 text-sm mb-4">
            📹 Watch our puppies playing, eating, and being loved!
          </p>
          <Button 
            variant="ghost" 
            className="text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300"
            onClick={() => scrollToSection('available-puppies')}
          >
            View Puppy Videos →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
