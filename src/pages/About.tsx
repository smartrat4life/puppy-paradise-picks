
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Heart, PawPrint, ShieldCheck, Users, Home, Award, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Story</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting loving families with their perfect furry companions since 2012. 
            Over 13 years of passionate breeding and dedicated service to happy families.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-3 mb-6 rounded-full bg-teal-100">
              <PawPrint className="h-8 w-8 text-teal-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              At Pick a Puppy, we believe every dog deserves a loving home and every home deserves the perfect dog. 
              Our mission is to make the adoption process seamless, transparent, and joyful for both pets and their new families. 
              With over 13 years of experience, we've perfected our approach to breeding healthy, well-socialized puppies 
              that become cherished family members.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
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
                We maintain complete transparency about our breeding process, health checks, and the backgrounds of all our puppies.
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

            {/* Value 4 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Award className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Excellence in Breeding</h3>
              <p className="text-gray-600 text-center">
                With 13+ years of experience, we maintain the highest standards in breeding practices and puppy care.
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
            
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3">
                  <img 
                    src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80" 
                    alt="Happy family with puppy"
                    className="rounded-lg shadow-lg w-full h-48 object-cover"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-3">A Dream to Make a Difference</h3>
                  <p className="text-gray-600">
                    Founded in 2012 by a team of passionate dog lovers, Pick a Puppy began with a simple goal: 
                    to create a better way to connect responsible breeders with loving families. What started as 
                    a small local initiative has grown into a trusted platform that prioritizes health, temperament, 
                    and the perfect match between puppy and family.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                <div className="md:w-1/3">
                  <img 
                    src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80" 
                    alt="Puppy care and breeding"
                    className="rounded-lg shadow-lg w-full h-48 object-cover"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-3">Our Growth & Impact</h3>
                  <p className="text-gray-600">
                    Over 13 years, we've helped more than 500 families find their perfect furry companions. 
                    Each adoption story fuels our passion to do even more. We specialize in six wonderful breeds, 
                    each carefully selected for their unique qualities and compatibility with family life. 
                    Our commitment to health testing, proper socialization, and ongoing support has earned us 
                    the trust of countless families across the country.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Breeds */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Premium Breeds</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Golden Doodle', description: 'Intelligent, friendly, and hypoallergenic companions perfect for families.' },
              { name: 'Cavapoo', description: 'Sweet-natured, low-shedding dogs ideal for families with allergies.' },
              { name: 'ShihTzu', description: 'Gentle, affectionate lap dogs with beautiful coats and calm temperaments.' },
              { name: 'Doberman', description: 'Loyal, intelligent guardians with European bloodlines and noble character.' },
              { name: 'Chihuahua', description: 'Tiny but mighty companions with big personalities and devoted hearts.' },
              { name: 'Dachshund', description: 'Playful, courageous "wiener dogs" with distinctive charm and loyalty.' }
            ].map((breed, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Star className="w-8 h-8 text-teal-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{breed.name}</h3>
                <p className="text-gray-600">{breed.description}</p>
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
            Join the hundreds of families who have found their perfect companions with Pick a Puppy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/#available"
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors inline-block"
            >
              View Available Puppies
            </a>
            <a 
              href="/#contact"
              className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
