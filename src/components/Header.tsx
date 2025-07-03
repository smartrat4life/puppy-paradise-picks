import React, { useState } from 'react';
import { Menu, X, User, LogOut, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/AuthModal';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    user,
    signOut,
    isAdmin
  } = useAuth();
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
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl" role="banner">
        <div className="bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <img src="/images/logo/puppy-logo.png" alt="Pick a Puppy Logo" className="h-12 w-auto object-contain" />
                <h1 className="text-2xl font-bold text-amber-100 ">Pick a Puppy</h1>
              </div>

              {/* Desktop Search */}
              <div className="hidden md:flex flex-1 max-w-md mx-8">
                <form onSubmit={handleSearch} className="w-full relative" role="search">
                  <Input type="search" placeholder="Search puppies by name, breed..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60 pr-10" aria-label="Search for puppies" />
                  <Button type="submit" size="sm" className="absolute right-1 top-1 bg-teal-600 hover:bg-teal-700 h-8 w-8 p-0" aria-label="Submit search">
                    <Search className="w-4 h-4" />
                  </Button>
                </form>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
                {/*<a href="#breeds" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                  Our Breeds
                 </a>*/}
                <a href="/about" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                  About Us
                </a>
                <a href="#available" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                  Available Puppies
                </a>
                <a href="/testimonials" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                  Testimonials
                </a>
                <a href="/pricing" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                  Pricing
                </a>
                <a href="/faq" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                  FAQ
                </a>
                {user && <a href="/favorites" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    Favorites
                  </a>}
                {isAdmin && <a href="/admin" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                    Admin
                  </a>}
              </nav>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center gap-4">
                {user && <span className="text-sm text-white/80" aria-label={`Welcome ${user.email?.split('@')[0]}`}>
                    Welcome, {user.email?.split('@')[0]}
                  </span>}
                <Button onClick={handleAuthClick} className="bg-black/70 hover:bg-black/80 text-white border border-white/10 px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm" aria-label={user ? 'Logout' : 'Login or Sign up'}>
                  {user ? <>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </> : <>
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </>}
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-2">
                <button className="text-white hover:text-white/80 transition-colors duration-200" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen}>
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && <nav className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4 bg-black/90 rounded-lg p-4" role="navigation" aria-label="Mobile navigation">
                <div className="flex flex-col space-y-4">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="w-full relative" role="search">
                    <Input type="search" placeholder="Search puppies..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60 pr-10" aria-label="Search for puppies" />
                    <Button type="submit" size="sm" className="absolute right-1 top-1 bg-teal-600 hover:bg-teal-700 h-8 w-8 p-0" aria-label="Submit search">
                      <Search className="w-4 h-4" />
                    </Button>
                  </form>
                  
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
                  {user && <a href="/favorites" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      Favorites
                    </a>}
                  {isAdmin && <a href="/admin" className="text-white hover:text-teal-300 transition-colors duration-200 font-medium">
                      Admin
                    </a>}
                  <div className="pt-2 border-t border-white/10">
                    <Button onClick={handleAuthClick} className="w-full bg-black/70 hover:bg-black/80 text-white border border-white/10 py-2 rounded-lg font-semibold transition-all duration-300" aria-label={user ? 'Logout' : 'Login or Sign up'}>
                      {user ? <>
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </> : <>
                          <User className="w-4 h-4 mr-2" />
                          Login
                        </>}
                    </Button>
                  </div>
                </div>
              </nav>}
          </div>
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>;
};
export default Header;