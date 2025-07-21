import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Link, NavLink } from 'react-router-dom';
import AuthModal from '@/components/AuthModal';

// Mobile navigation link component
const MobileNavLink = ({
  to,
  onClick,
  children,
  className = '',
  ...props
}) => <Link to={to} onClick={onClick} className={`flex items-center px-4 py-3 text-base font-medium text-amber-100 hover:bg-amber-800/50 hover:text-white rounded-lg transition-colors duration-200 ${className}`} {...props}>
    {children}
  </Link>;
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const {
    user,
    signOut,
    isAdmin
  } = useAuth();

  // Handle scroll to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 100) {
        // Always show navbar when near top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide navbar when scrolling down
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Show navbar when scrolling up
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  const handleAuthClick = async () => {
    if (user) {
      try {
        await signOut();
      } catch (error) {
        console.error('Logout error:', error);
      }
    } else {
      setIsAuthModalOpen(true);
    }
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Scroll to available puppies section and trigger search
      const element = document.getElementById('available');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
        // Dispatch custom event to trigger search in AvailablePuppies component
        window.dispatchEvent(new CustomEvent('headerSearch', {
          detail: searchQuery
        }));
      }
    }
  };
  return <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`} role="banner">
        <div className="bg-gradient-to-r from-amber-900 to-amber-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
                  <img src="/images/logo/puppy-logo.png" alt="Pick a Puppy Logo" className="h-12 w-auto object-contain drop-shadow-md" />
                  <h1 className="text-2xl font-bold text-white font-serif tracking-tight">Pick a Puppy</h1>
                </Link>
              </div>

              {/* Desktop Search */}
              <div className="hidden md:flex flex-1 max-w-xl mx-8">
                <form onSubmit={handleSearch} className="w-full relative" role="search">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-200" />
                    <Input type="search" placeholder="Find your perfect puppy..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-12 py-2 bg-white/10 border-amber-400/30 text-white placeholder-amber-200/70 focus:ring-2 focus:ring-amber-300/50 focus:border-amber-400 transition-all duration-200 rounded-full" aria-label="Search for puppies" />
                    <Button type="submit" className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-amber-600 hover:bg-amber-700 h-8 w-8 p-0 rounded-full transition-all duration-200 hover:scale-105" aria-label="Submit search">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
                <NavLink to="/about" className="px-4 py-2 text-sm font-medium text-amber-100 hover:bg-amber-700/50 hover:text-white rounded-lg transition-all duration-200">
                  About Us
                </NavLink>
                <a href="/#available" className="px-4 py-2 text-sm font-medium text-amber-100 hover:bg-amber-700/50 hover:text-white rounded-lg transition-all duration-200">
                  Available Puppies
                </a>
                <NavLink to="/reviews" className="px-4 py-2 text-sm font-medium text-amber-100 hover:bg-amber-700/50 hover:text-white rounded-lg transition-all duration-200">
                  Reviews
                </NavLink>
                <NavLink to="/pricing" className="px-4 py-2 text-sm font-medium text-amber-100 hover:bg-amber-700/50 hover:text-white rounded-lg transition-all duration-200">
                  Pricing
                </NavLink>
                <NavLink to="/faq" className="px-4 py-2 text-sm font-medium text-amber-100 hover:bg-amber-700/50 hover:text-white rounded-lg transition-all duration-200">
                  FAQ
                </NavLink>
                {user && <NavLink to="/favorites" className="px-4 py-2 text-sm font-medium text-amber-100 hover:bg-amber-700/50 hover:text-white rounded-lg transition-all duration-200 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-current" />
                    Favorites
                  </NavLink>}
                {isAdmin && <NavLink to="/admin" className="px-4 py-2 text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 rounded-lg transition-all duration-200">
                    Admin
                  </NavLink>}
              </nav>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                {user && <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-amber-100" />
                    </div>
                    <span className="text-sm font-medium text-amber-100" aria-label={`Welcome ${user.email?.split('@')[0]}`}>
                      {user.email?.split('@')[0]}
                    </span>
                  </div>}
                <Button onClick={handleAuthClick} className={`${user ? 'bg-amber-700 hover:bg-amber-800 text-white' : 'bg-white text-amber-800 hover:bg-amber-50'} px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105`} aria-label={user ? 'Logout' : 'Login or Sign up'}>
                  {user ? <>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </> : <>
                      <User className="w-4 h-4 mr-2" />
                      Login / Sign Up
                    </>}
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-amber-100 hover:bg-amber-700/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 transition-all duration-200" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen}>
                  {isMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen py-4 border-t border-amber-700' : 'max-h-0'}`}>
              <nav className="px-2 pt-2 pb-4 space-y-2 bg-amber-900/95 rounded-lg mx-2 shadow-lg" role="navigation" aria-label="Mobile navigation">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="px-2" role="search">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-200" />
                    <Input type="search" placeholder="Find your perfect puppy..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-12 py-2 bg-white/10 border-amber-400/30 text-white placeholder-amber-200/70 focus:ring-2 focus:ring-amber-300/50 focus:border-amber-400 transition-all duration-200 rounded-full" aria-label="Search for puppies" />
                  </div>
                </form>
                
                <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>
                  About Us
                </MobileNavLink>
                <a href="/#available" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-base font-medium text-amber-100 hover:bg-amber-800/50 hover:text-white rounded-lg transition-colors duration-200">
                  Available Puppies
                </a>
                <MobileNavLink to="/testimonials" onClick={() => setIsMenuOpen(false)}>
                  Reviews
                </MobileNavLink>
                <MobileNavLink to="/pricing" onClick={() => setIsMenuOpen(false)}>
                  Pricing
                </MobileNavLink>
                <MobileNavLink to="/faq" onClick={() => setIsMenuOpen(false)}>
                  FAQ
                </MobileNavLink>
                
                {user && <MobileNavLink to="/favorites" onClick={() => setIsMenuOpen(false)}>
                    <Heart className="w-5 h-5 mr-2" />
                    Favorites
                  </MobileNavLink>}
                
                {isAdmin && <MobileNavLink to="/admin" onClick={() => setIsMenuOpen(false)} className="bg-amber-700/30 hover:bg-amber-700/50">
                    Admin Dashboard
                  </MobileNavLink>}
                
                <div className="pt-3 mt-3 border-t border-amber-700">
                  {user ? <div className="flex items-center justify-between px-4 py-2 mb-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center mr-2">
                          <User className="h-4 w-4 text-amber-100" />
                        </div>
                        <span className="text-sm font-medium text-amber-100">
                          {user.email?.split('@')[0]}
                        </span>
                      </div>
                      <Button onClick={handleAuthClick} className="text-sm bg-amber-700 hover:bg-amber-800 text-white px-4 py-1.5 rounded-full font-medium flex items-center">
                        <LogOut className="w-4 h-4 mr-1" />
                        Logout
                      </Button>
                    </div> : <Button onClick={handleAuthClick} className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2.5 rounded-lg font-medium flex items-center justify-center">
                      <User className="w-5 h-5 mr-2" />
                      Login / Sign Up
                    </Button>}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>;
};
export default Header;