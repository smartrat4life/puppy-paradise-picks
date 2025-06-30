import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    id: 1,
    name: 'Sarah J.',
    location: 'Portland, OR',
    image: '/testimonials/puppy1.jpg',
    date: 'June 2024',
    content: 'We adopted Max from Puppy Paradise Picks and couldn\'t be happier! The entire process was smooth and transparent. Max came home healthy, happy, and already well-socialized. The team was incredibly supportive throughout our journey.'
  },
  {
    id: 2,
    name: 'Michael T.',
    location: 'Seattle, WA',
    image: '/testimonials/puppy2.jpg',
    date: 'May 2024',
    content: 'Luna has been the perfect addition to our family. The health guarantee gave us peace of mind, and the support team was always available to answer our questions. Highly recommend Puppy Paradise Picks!'
  },
  {
    id: 3,
    name: 'Jessica L.',
    location: 'San Francisco, CA',
    image: '/testimonials/puppy3.jpg',
    date: 'April 2024',
    content: 'The adoption process was seamless, and our puppy arrived in perfect health. The detailed care instructions and follow-up calls showed how much they care about their puppies even after they go home.'
  },
];

const Testimonials = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Happy Tails from Our Families</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img
                src={testimonial.image}
                alt={`${testimonial.name}'s dog`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback className="bg-primary text-white">
                    {testimonial.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.location} • {testimonial.date}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-700">"{testimonial.content}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
