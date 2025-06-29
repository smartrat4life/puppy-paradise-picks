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
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/bd88e703-c689-4c38-8f0f-1048f3b8da46.png" 
                  alt="Pick a Puppy Logo" 
                  className="w-10 h-10 object-contain"
                />
                <h1 className="text-2xl font-bold text-white">Pick a Puppy</h1>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#breeds" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                  Our Breeds
                </a>
                <a href="#about" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                  About Us
                </a>
                <a href="#available" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                  Available Puppies
                </a>
                <a href="#testimonials" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                  Reviews
                </a>
                <a href="#contact" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                  Contact
                </a>
                {isAdmin && (
                  <a href="/admin" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                    Admin
                  </a>
                )}
              </nav>


              {/* Auth Buttons */}
              <div className="hidden md:flex items-center gap-4">
                {user && (
                  <span className="text-sm text-white/80">
                    Welcome, {user.email?.split('@')[0]}
                  </span>
                )}
                <Button
                  onClick={handleAuthClick}
                  className="bg-black/70 hover:bg-black/80 text-white border border-white/10 px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm"
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
              <div className="md:hidden flex items-center gap-2">
                <button
                  className="text-white hover:text-white/80 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <nav className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4 bg-black/90 rounded-lg p-4">
                <div className="flex flex-col space-y-4">
                  <a href="#breeds" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                    Our Breeds
                  </a>
                  <a href="#about" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                    About Us
                  </a>
                  <a href="#available" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                    Available Puppies
                  </a>
                  <a href="#testimonials" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                    Reviews
                  </a>
                  <a href="#contact" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                    Contact
                  </a>
                  {isAdmin && (
                    <a href="/admin" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                      Admin
                    </a>
                  )}
                  <div className="pt-2 border-t border-white/10">
                    <Button
                      onClick={handleAuthClick}
                      className="w-full bg-black/70 hover:bg-black/80 text-white border border-white/10 py-2 rounded-lg font-semibold transition-all duration-300"
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
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Header;
