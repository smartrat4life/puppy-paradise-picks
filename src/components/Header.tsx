
import React, { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/AuthModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/bd88e703-c689-4c38-8f0f-1048f3b8da46.png" 
                alt="Pick a Puppy Logo" 
                className="w-10 h-10 object-contain"
              />
              <h1 className="text-2xl font-bold text-amber-900">Pick a Puppy</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#breeds" className="text-amber-800 hover:text-teal-600 transition-colors duration-200 font-medium">
                Our Breeds
              </a>
              <a href="#about" className="text-amber-800 hover:text-teal-600 transition-colors duration-200 font-medium">
                About Us
              </a>
              <a href="#available" className="text-amber-800 hover:text-teal-600 transition-colors duration-200 font-medium">
                Available Puppies
              </a>
              <a href="#testimonials" className="text-amber-800 hover:text-teal-600 transition-colors duration-200 font-medium">
                Reviews
              </a>
              <a href="#contact" className="text-amber-800 hover:text-teal-600 transition-colors duration-200 font-medium">
                Contact
              </a>
              {isAdmin && (
                <a href="/admin" className="text-amber-800 hover:text-teal-600 transition-colors duration-200 font-medium">
                  Admin
                </a>
              )}
            </nav>

            {/* Auth Button */}
            <div className="hidden md:flex items-center gap-4">
              {user && (
                <span className="text-sm text-amber-700">
                  Welcome, {user.email?.split('@')[0]}
                </span>
              )}
              <Button
                onClick={handleAuthClick}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {user ? (
                  <>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </>
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-amber-900 hover:text-teal-600 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-amber-200 pt-4">
              <div className="flex flex-col space-y-4">
                <a href="#breeds" className="text-amber-800 hover:text-teal-600 transition-colors duration-200 font-medium">
                  Our Breeds
                </a>
                <a href="#about" className="text-amber-800 hover:text-teal-600 transition-colors duration-200 font-medium">
                  About Us
                </a>
                <a href="#available" className="text-amber-800 hover:text-teal-600 transition-colors duration-200 font-medium">
                  Available Puppies
                </a>
                <a href="#testimonials" className="text-amber-800 hover:text-teal-600 transition-colors duration-200 font-medium">
                  Reviews
                </a>
                <a href="#contact" className="text-amber-800 hover:text-teal-600 transition-colors duration-200 font-medium">
                  Contact
                </a>
                {isAdmin && (
                  <a href="/admin" className="text-amber-800 hover:text-teal-600 transition-colors duration-200 font-medium">
                    Admin Dashboard
                  </a>
                )}
                <div className="pt-4 border-t border-amber-200">
                  {user && (
                    <p className="text-sm text-amber-700 mb-2">
                      Welcome, {user.email?.split('@')[0]}
                    </p>
                  )}
                  <Button
                    onClick={handleAuthClick}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full font-semibold"
                  >
                    {user ? (
                      <>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </>
                    ) : (
                      <>
                        <User className="w-4 h-4 mr-2" />
                        Login
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Header;
