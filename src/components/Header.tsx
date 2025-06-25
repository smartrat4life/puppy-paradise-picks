
import React, { useState } from 'react';
import { Menu, X, User, LogOut, Heart, Home, Info, Mail, Star, Shield } from 'lucide-react';
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

  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'Our Breeds', href: '#breeds', icon: Heart },
    { name: 'About Us', href: '#about', icon: Info },
    { name: 'Available Puppies', href: '#available', icon: Heart },
    { name: 'Reviews', href: '#testimonials', icon: Star },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-amber-100">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-amber-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-teal-600 bg-clip-text text-transparent">
                Pick a Puppy
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-amber-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 font-medium group"
                  >
                    <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-sm">{item.name}</span>
                  </a>
                );
              })}
              {isAdmin && (
                <a
                  href="/admin"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-amber-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 font-medium group"
                >
                  <Shield className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm">Admin</span>
                </a>
              )}
            </nav>

            {/* Auth Section */}
            <div className="hidden lg:flex items-center gap-4">
              {user && (
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-teal-50 to-amber-50 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-amber-700">
                    {user.email?.split('@')[0]}
                  </span>
                </div>
              )}
              <Button
                onClick={handleAuthClick}
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
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
              className="lg:hidden p-2 rounded-xl text-amber-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-amber-100 bg-white/95 backdrop-blur-md">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-amber-700 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{item.name}</span>
                    </a>
                  );
                })}
                {isAdmin && (
                  <a
                    href="/admin"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-amber-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield className="w-5 h-5" />
                    <span>Admin Dashboard</span>
                  </a>
                )}
              </nav>
              
              {/* Mobile Auth Section */}
              <div className="mt-4 pt-4 border-t border-amber-100">
                {user && (
                  <div className="flex items-center gap-2 px-4 py-2 mb-3 bg-gradient-to-r from-teal-50 to-amber-50 rounded-xl">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-amber-700">
                      Welcome, {user.email?.split('@')[0]}
                    </span>
                  </div>
                )}
                <Button
                  onClick={handleAuthClick}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-3 rounded-xl font-semibold"
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
          )}
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Header;
