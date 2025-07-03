
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote, Heart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'Portland, OR',
    image: '/testimonials/puppy1.jpg',
    date: 'June 2024',
    rating: 5,
    puppy: 'Golden Doodle - Max',
    content: 'We adopted Max from Pick a Puppy and couldn\'t be happier! The entire process was smooth and transparent. Max came home healthy, happy, and already well-socialized. The team was incredibly supportive throughout our journey. The health guarantee gave us complete peace of mind, and the ongoing support has been invaluable.'
  },
  {
    id: 2,
    name: 'Michael Thompson',
    location: 'Seattle, WA',
    image: '/testimonials/puppy2.jpg',
    date: 'May 2024',
    rating: 5,
    puppy: 'Cavapoo - Luna',
    content: 'Luna has been the perfect addition to our family. The health guarantee gave us peace of mind, and the support team was always available to answer our questions. The breeder\'s 13+ years of experience really shows in how well-adjusted and healthy Luna is. Highly recommend Pick a Puppy!'
  },
  {
    id: 3,
    name: 'Jessica Martinez',
    location: 'San Francisco, CA',
    image: '/testimonials/puppy3.jpg',
    date: 'April 2024',
    rating: 5,
    puppy: 'ShihTzu - Buddy',
    content: 'The adoption process was seamless, and our puppy arrived in perfect health. The detailed care instructions and follow-up calls showed how much they care about their puppies even after they go home. Buddy is now 8 months old and the sweetest, most well-behaved dog we could ask for.'
  },
  {
    id: 4,
    name: 'David & Emma Wilson',
    location: 'Austin, TX',
    image: '/testimonials/puppy1.jpg',
    date: 'March 2024',
    rating: 5,
    puppy: 'Doberman - Duke',
    content: 'Duke is everything we hoped for in a Doberman - intelligent, loyal, and protective yet gentle with our children. The European bloodlines and health testing were important to us, and Pick a Puppy delivered exactly what was promised. The professionalism and care shown throughout the process was exceptional.'
  },
  {
    id: 5,
    name: 'Amanda Rodriguez',
    location: 'Denver, CO',
    image: '/testimonials/puppy2.jpg',
    date: 'February 2024',
    rating: 5,
    puppy: 'Chihuahua - Peanut',
    content: 'Peanut may be tiny, but she has the biggest personality! She\'s confident, loving, and brings so much joy to our apartment. The breeder\'s expertise with small breeds really shows - Peanut was perfectly socialized and comfortable with new situations right from day one.'
  },
  {
    id: 6,
    name: 'Robert Chen',
    location: 'Phoenix, AZ',
    image: '/testimonials/puppy3.jpg',
    date: 'January 2024',
    rating: 5,
    puppy: 'Dachshund - Oscar',
    content: 'Oscar has the most amazing personality! He\'s playful, loving, and full of character. The entire process was transparent and professional. The health testing on the parents and comprehensive health guarantee shows how much Pick a Puppy cares about their puppies\' well-being.'
  },
];

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-amber-100 via-orange-50 to-teal-50">
          <div className="container mx-auto px-6 text-center">
            <Heart className="w-16 h-16 text-teal-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">
              What Our Families Say
            </h1>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto mb-12">
              Real stories from families who found their perfect companions through Pick a Puppy. 
              These testimonials reflect our commitment to connecting healthy, happy puppies with loving homes.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">500+</div>
                <div className="text-amber-700 font-semibold">Happy Families</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">13+</div>
                <div className="text-amber-700 font-semibold">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">6</div>
                <div className="text-amber-700 font-semibold">Premium Breeds</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">100%</div>
                <div className="text-amber-700 font-semibold">Health Guaranteed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">
                Success Stories from Our Families
              </h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Every puppy that leaves our home becomes part of an extended family. 
                Here's what our adopting families have to say about their experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="group bg-white hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-amber-200 hover:border-teal-300">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name}'s ${testimonial.puppy}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80';
                      }}
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Quote className="w-6 h-6 text-teal-600" />
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback className="bg-teal-600 text-white">
                          {testimonial.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-amber-900 group-hover:text-teal-700 transition-colors duration-300">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-amber-600">{testimonial.location} • {testimonial.date}</p>
                        <p className="text-sm text-teal-600 font-semibold">{testimonial.puppy}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-amber-700 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-teal-50 to-amber-50">
          <div className="container mx-auto px-6 text-center">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-white to-amber-50 border-2 border-teal-200">
              <CardContent className="p-8">
                <Heart className="w-16 h-16 text-teal-600 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-amber-900 mb-4">
                  Ready to Start Your Own Success Story?
                </h2>
                <p className="text-xl text-amber-700 mb-8">
                  Join our family of happy puppy parents. We're here to help you find 
                  your perfect companion and support you every step of the way.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/#available"
                    className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl inline-block"
                  >
                    See Available Puppies
                  </a>
                  <a 
                    href="/#contact"
                    className="border-2 border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl inline-block"
                  >
                    Contact Us Today
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Testimonials;
