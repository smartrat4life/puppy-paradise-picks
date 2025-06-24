
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Available Puppies', href: '/#available-puppies' },
    { name: 'Our Breeds', href: '/#breeds' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/#contact' }
  ];

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/${id}`;
    } else {
      document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      scrollToSection(href);
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-200 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
            <img 
              src="/lovable-uploads/bd88e703-c689-4c38-8f0f-1048f3b8da46.png" 
              alt="Pick a Puppy Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-amber-900">Pick a Puppy</h1>
              <p className="text-xs text-teal-600 font-medium">13 Years of Excellence</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.href.startsWith('/#') ? (
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-amber-800 hover:text-teal-600 font-medium transition-colors duration-300 relative group"
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className="text-amber-800 hover:text-teal-600 font-medium transition-colors duration-300 relative group"
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:+15551234567" 
              className="flex items-center gap-2 text-amber-700 hover:text-teal-600 transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">(555) 123-4567</span>
            </a>
            <a 
              href="mailto:info@pickapuppy.com"
              className="flex items-center gap-2 text-amber-700 hover:text-teal-600 transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium">Email Us</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-amber-900" />
            ) : (
              <Menu className="h-6 w-6 text-amber-900" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-amber-200 shadow-lg">
            <nav className="px-6 py-4 space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.href.startsWith('/#') ? (
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="block w-full text-left text-amber-800 hover:text-teal-600 font-medium py-2 transition-colors duration-300"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-amber-800 hover:text-teal-600 font-medium py-2 transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile Contact */}
              <div className="pt-4 border-t border-amber-200 space-y-2">
                <a 
                  href="tel:+15551234567" 
                  className="flex items-center gap-2 text-amber-700 hover:text-teal-600 py-2 transition-colors duration-300"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">(555) 123-4567</span>
                </a>
                <a 
                  href="mailto:info@pickapuppy.com"
                  className="flex items-center gap-2 text-amber-700 hover:text-teal-600 py-2 transition-colors duration-300"
                >
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">info@pickapuppy.com</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
