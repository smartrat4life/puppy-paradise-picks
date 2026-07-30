import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Search, Heart, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Link, NavLink } from 'react-router-dom';
import AuthModal from '@/components/AuthModal';

const navItems = [
  { to: '/about', label: 'About Us' },
  { to: '/#available', label: 'Available Puppies', external: true },
  { to: '/reviews', label: 'Reviews' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/faq', label: 'FAQ' },
];

// Mobile navigation link component
const MobileNavLink = ({
  to,
  onClick,
  children,
  className = '',
  ...props
}: any) => <Link to={to} onClick={onClick} className={`flex items-center px-4 py-3 text-base font-medium text-amber-100 hover:bg-amber-800/60 hover:text-white rounded-lg transition-colors duration-200 ${className}`} {...props}>
    {children}
  </Link>;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
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
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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
      setIsMenuOpen(false);
      const element = document.getElementById('available');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
      window.dispatchEvent(new CustomEvent('headerSearch', {
        detail: searchQuery
      }));
    }
  };

  const navLinkClass = ({ isActive }: { isActive?: boolean } = {}) =>
    `relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
      isActive
        ? 'text-white bg-amber-700/60'
        : 'text-amber-100 hover:text-white hover:bg-amber-700/40'
    }`;

  return <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`} role="banner">
        {/* Top utility bar */}
        <div className="hidden lg:block bg-amber-950 text-amber-200 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
            <span className="tracking-wide">Trusted Texas breeder since 2012 · Health-guaranteed puppies</span>
            <a href="tel:+12029364192" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" />
              (202) 936-4192
            </a>
          </div>
        </div>

        <div className={`bg-gradient-to-r from-amber-900 via-amber-900 to-amber-800 transition-shadow duration-300 ${isScrolled ? 'shadow-xl' : 'shadow-md'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex items-center justify-between gap-4 transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 hover:opacity-90 transition-opacity">
                <img src="/images/logo/puppy-logo.png" alt="Pick a Puppy Logo" className={`w-auto object-contain drop-shadow-md transition-all duration-300 ${isScrolled ? 'h-9' : 'h-11'}`} />
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white font-serif tracking-tight leading-none">
                  Pick a Puppy
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center" role="navigation" aria-label="Main navigation">
                {navItems.map(item =>
                  item.external
                    ? <a key={item.to} href={item.to} className={navLinkClass()}>{item.label}</a>
                    : <NavLink key={item.to} to={item.to} className={({ isActive }) => navLinkClass({ isActive })}>{item.label}</NavLink>
                )}
                {user && <NavLink to="/favorites" className={({ isActive }) => `${navLinkClass({ isActive })} flex items-center gap-1.5`}>
                    <Heart className="w-4 h-4 fill-current" />
                    Favorites
                  </NavLink>}
                {isAdmin && <NavLink to="/admin" className="px-3 py-2 text-sm font-medium bg-amber-600 text-white hover:bg-amber-500 rounded-lg transition-colors duration-200">
                    Admin
                  </NavLink>}
              </nav>

              {/* Desktop actions */}
              <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                <form onSubmit={handleSearch} className="relative" role="search">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-200 pointer-events-none" />
                  <Input
                    type="search"
                    placeholder="Search puppies..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-40 xl:w-56 focus:w-56 xl:focus:w-64 transition-all duration-300 pl-9 h-10 bg-white/10 border-amber-400/30 text-white placeholder:text-amber-200/70 focus:ring-2 focus:ring-amber-300/40 rounded-full"
                    aria-label="Search for puppies"
                  />
                </form>

                <Link to="/adoption-application" className="px-4 py-2 text-sm font-semibold bg-white text-amber-900 hover:bg-amber-50 rounded-full transition-all duration-300 hover:shadow-lg whitespace-nowrap">
                  Apply Now
                </Link>

                {user ? <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-full bg-amber-500/20 flex items-center justify-center" title={user.email ?? ''}>
                      <User className="h-4 w-4 text-amber-100" />
                    </div>
                    <Button onClick={handleAuthClick} variant="ghost" size="icon" className="text-amber-100 hover:text-white hover:bg-amber-700/50 rounded-full" aria-label="Logout">
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div> : <Button onClick={handleAuthClick} variant="ghost" className="text-amber-100 hover:text-white hover:bg-amber-700/50 rounded-full px-4" aria-label="Login or Sign up">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>}
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center gap-1">
                <Link to="/adoption-application" className="hidden sm:inline-flex px-3 py-2 text-sm font-semibold bg-white text-amber-900 hover:bg-amber-50 rounded-full transition-colors">
                  Apply
                </Link>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-amber-100 hover:bg-amber-700/50 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-200" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen}>
                  {isMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden bg-amber-900/98 backdrop-blur-sm border-t border-amber-700/60 overflow-y-auto transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[calc(100vh-5rem)] opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="px-4 py-4 space-y-1.5" role="navigation" aria-label="Mobile navigation">
            <form onSubmit={handleSearch} className="mb-3" role="search">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-200 pointer-events-none" />
                <Input type="search" placeholder="Find your perfect puppy..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 h-11 bg-white/10 border-amber-400/30 text-white placeholder:text-amber-200/70 rounded-full" aria-label="Search for puppies" />
              </div>
            </form>

            <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>About Us</MobileNavLink>
            <a href="/#available" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-base font-medium text-amber-100 hover:bg-amber-800/60 hover:text-white rounded-lg transition-colors duration-200">
              Available Puppies
            </a>
            <MobileNavLink to="/reviews" onClick={() => setIsMenuOpen(false)}>Reviews</MobileNavLink>
            <MobileNavLink to="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing</MobileNavLink>
            <MobileNavLink to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</MobileNavLink>

            {user && <MobileNavLink to="/favorites" onClick={() => setIsMenuOpen(false)}>
                <Heart className="w-5 h-5 mr-2 fill-current" />
                Favorites
              </MobileNavLink>}

            {isAdmin && <MobileNavLink to="/admin" onClick={() => setIsMenuOpen(false)} className="bg-amber-700/40 hover:bg-amber-700/60">
                Admin Dashboard
              </MobileNavLink>}

            <Link to="/adoption-application" onClick={() => setIsMenuOpen(false)} className="block text-center px-4 py-3 mt-2 text-base font-semibold bg-white text-amber-900 hover:bg-amber-50 rounded-lg transition-colors">
              Apply to Adopt
            </Link>

            <a href="tel:+12029364192" className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-amber-200 hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
              (202) 936-4192
            </a>

            <div className="pt-3 mt-2 border-t border-amber-700">
              {user ? <div className="flex items-center justify-between px-2 py-2">
                  <div className="flex items-center min-w-0">
                    <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center mr-2 flex-shrink-0">
                      <User className="h-4 w-4 text-amber-100" />
                    </div>
                    <span className="text-sm font-medium text-amber-100 truncate">
                      {user.email?.split('@')[0]}
                    </span>
                  </div>
                  <Button onClick={handleAuthClick} className="text-sm bg-amber-700 hover:bg-amber-800 text-white px-4 py-1.5 rounded-full font-medium flex items-center flex-shrink-0">
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
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>;
};
export default Header;
