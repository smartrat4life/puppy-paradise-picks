import React, { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/AuthModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, signOut, isAdmin } = useAuth();

  const handleAuthClick = async () => {
    if (user) {
      try {
        setIsLoggingOut(true);
        await signOut();
        // No need to redirect or refresh - the auth state update will handle UI changes
      } catch (error) {
        console.error('Logout error:', error);
        // You could add a toast notification here if desired
      } finally {
        setIsLoggingOut(false);
      }
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
                  disabled={isLoggingOut}
                  className="bg-black/70 hover:bg-black/80 text-white border border-white/10 px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging out...
                    </>
                  ) : user ? (
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
                      disabled={isLoggingOut}
                      className="w-full bg-black/70 hover:bg-black/80 text-white border border-white/10 py-2 rounded-lg font-semibold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoggingOut ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Logging out...
                        </>
                      ) : user ? (
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
