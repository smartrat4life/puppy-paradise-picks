import React from 'react';
import { Heart, Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-amber-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/logo/puppy-logo.png" alt="Happy Tails Breeder Logo" className="w-12 h-12 object-contain" />
              <h3 className="text-2xl font-bold">Happy Tails Breeder</h3>
            </div>
            <p className="text-amber-200 leading-relaxed mb-4">
              Premium puppies from a trusted breeder with 13 years of experience. 
              We're dedicated to connecting healthy, happy puppies with loving families.
            </p>
            <div className="flex items-center gap-2 text-amber-200 mb-4">
              <Heart className="w-5 h-5 text-red-400" />
              <span>Breeding with love since 2012</span>
            </div>
            
            {/* Social Media Links */}
            <div className="flex gap-4">
              <a href="https://www.instagram.com/pickapuppyplus?igsh=MTJ1OTZsbzc4cjhjZw==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-amber-200 hover:text-pink-400 transition-colors duration-300 bg-amber-800/50 px-3 py-2 rounded-full">
                <Instagram className="w-5 h-5" />
                <span className="text-sm">Instagram</span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=100088549120878" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-amber-200 hover:text-blue-400 transition-colors duration-300 bg-amber-800/50 px-3 py-2 rounded-full">
                <Facebook className="w-5 h-5" />
                <span className="text-sm">Facebook</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">Our Breeds</h4>
            <ul className="space-y-2 text-amber-200">
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">ShihTzu</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">Doberman</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">Cavapoo</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">GoldenDoodle</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">Chihuahua</li>
              <li className="hover:text-white transition-colors duration-200 cursor-pointer">Dachshund</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
            <div className="space-y-3 text-amber-200">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <a href="tel:+1555123456785" className="hover:text-white transition-colors duration-200">
                  (000) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <a href="mailto:
                pickapuppyplus@gmail.com" className="hover:text-white transition-colors duration-200">
                  pickapuppyplus@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span>Texas, USA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-700 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-amber-200">© 2025 Happy Tails Breeder. All rights reserved.</p>
            <div className="flex gap-6 text-amber-200">
              <a href="/pricing" className="hover:text-white transition-colors duration-200">Pricing & Policies</a>
              <a href="/faq" className="hover:text-white transition-colors duration-200">FAQ</a>
              <a href="/pricing" className="hover:text-white transition-colors duration-200 cursor-pointer">Health Guarantee</a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;