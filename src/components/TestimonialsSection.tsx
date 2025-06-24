
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Austin, TX",
      puppy: "Golden Doodle - Charlie",
      rating: 5,
      text: "Our experience with Pick a Puppy was absolutely wonderful! Charlie is the most well-behaved and loving dog. The breeder's expertise really shows in how well-socialized he is.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b587?w=150&q=80"
    },
    {
      name: "Mike & Lisa Chen",
      location: "Dallas, TX",
      puppy: "Cavapoo - Mia",
      rating: 5,
      text: "We couldn't be happier with our Cavapoo! She's hypoallergenic as promised and has the sweetest temperament. The health guarantee gave us such peace of mind.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
    },
    {
      name: "Jennifer Martinez",
      location: "Houston, TX",
      puppy: "ShihTzu - Buddy",
      rating: 5,
      text: "The level of care and attention to detail is incredible. Buddy came home healthy, happy, and already partially house-trained. 13 years of experience really shows!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-teal-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
            Happy Families, Happy Puppies
          </h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our families have to say about 
            their experience with Pick a Puppy and their new furry family members.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group bg-white hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-amber-200 hover:border-teal-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Quote className="w-8 h-8 text-teal-600 mr-3" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-amber-700 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-amber-900 group-hover:text-teal-700 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-amber-600">{testimonial.location}</p>
                    <p className="text-sm text-teal-600 font-semibold">{testimonial.puppy}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
