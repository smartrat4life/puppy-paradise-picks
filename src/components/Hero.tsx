
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Star, Award } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-50 to-teal-50 overflow-hidden">
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
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <img 
            src="/lovable-uploads/bd88e703-c689-4c38-8f0f-1048f3b8da46.png" 
            alt="Pick a Puppy Logo" 
            className="mx-auto w-64 h-64 object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-amber-900 mb-6 animate-fade-in delay-200">
          Find Your Perfect
          <span className="block text-teal-600">Furry Companion</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-amber-800 mb-8 max-w-3xl mx-auto animate-fade-in delay-400">
          Premium puppies from a trusted breeder with 13 years of experience. 
          Specializing in ShihTzu, Doberman, Cavapoo, GoldenDoodle, Chihuahua, and Dachshund breeds.
        </p>

        {/* Trust indicators */}
        <div className="flex justify-center items-center gap-8 mb-10 animate-fade-in delay-500">
          <div className="flex items-center gap-2 text-amber-700">
            <Award className="w-6 h-6 text-teal-500" />
            <span className="font-semibold">13+ Years Experience</span>
          </div>
          <div className="flex items-center gap-2 text-amber-700">
            <Heart className="w-6 h-6 text-red-400" />
            <span className="font-semibold">Health Guaranteed</span>
          </div>
          <div className="flex items-center gap-2 text-amber-700">
            <Star className="w-6 h-6 text-yellow-500" />
            <span className="font-semibold">Premium Bloodlines</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-700">
          <Button 
            size="lg" 
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection('available-puppies')}
          >
            See Available Puppies
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
