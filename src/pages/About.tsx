import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Heart, PawPrint, ShieldCheck, Users, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Story</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting loving families with their perfect furry companions since 2020
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-3 mb-6 rounded-full bg-blue-100">
              <PawPrint className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              At Puppy Paradise Picks, we believe every dog deserves a loving home and every home deserves the perfect dog. 
              Our mission is to make the adoption process seamless, transparent, and joyful for both pets and their new families.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Compassion First</h3>
              <p className="text-gray-600 text-center">
                We treat every animal with the love and respect they deserve, ensuring their well-being is always our top priority.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <ShieldCheck className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Trust & Transparency</h3>
              <p className="text-gray-600 text-center">
                We maintain complete transparency about our adoption process, health checks, and the backgrounds of all our puppies.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Lifelong Support</h3>
              <p className="text-gray-600 text-center">
                Our relationship doesn't end at adoption. We provide ongoing support and resources to ensure happy, healthy lives together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It All Began</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <div className="bg-gray-200 rounded-lg h-48 w-full flex items-center justify-center text-gray-400">
                    <Home className="h-12 w-12" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-3">A Dream to Make a Difference</h3>
                  <p className="text-gray-600">
                    Founded in 2020 by a team of passionate dog lovers, Puppy Paradise Picks began with a simple goal: 
                    to create a better way to connect responsible breeders with loving families.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center gap-8 mt-12">
                <div className="md:w-1/3">
                  <div className="bg-gray-200 rounded-lg h-48 w-full flex items-center justify-center text-gray-400">
                    <PawPrint className="h-12 w-12" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-3">Our Growth & Impact</h3>
                  <p className="text-gray-600">
                    What started as a small local initiative has grown into a trusted platform that has helped over 1,000 families 
                    find their perfect furry companions. Each adoption story fuels our passion to do even more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Founder & CEO',
                bio: 'With over 15 years in animal welfare, Sarah leads our mission with compassion and vision.',
                image: 'https://www.facebook.com/images/fb_icon_325x325.png'
              },
              {
                name: 'Michael Chen',
                role: 'Head Veterinarian',
                bio: 'Ensuring all our puppies receive the highest standard of care and medical attention.',
                image: 'https://www.facebook.com/images/fb_icon_325x325.png'
              },
              {
                name: 'Emily Rodriguez',
                role: 'Adoption Specialist',
                bio: 'Passionate about matching the right family with the perfect puppy for a lifetime of happiness.',
                image: 'https://www.facebook.com/images/fb_icon_325x325.png'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your New Best Friend?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our available puppies or learn more about our adoption process today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/" 
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              View Available Puppies
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
