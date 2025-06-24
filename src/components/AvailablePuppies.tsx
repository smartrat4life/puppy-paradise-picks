
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Calendar } from 'lucide-react';

const AvailablePuppies = () => {
  const availablePuppies = [
    {
      id: 1,
      name: "Bella",
      breed: "Golden Doodle",
      age: "8 weeks",
      gender: "Female",
      price: "$1,200",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80",
      description: "Sweet and playful Golden Doodle ready for her forever home.",
      available: true
    },
    {
      id: 2,
      name: "Max",
      breed: "ShihTzu",
      age: "10 weeks",
      gender: "Male",
      price: "$900",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80",
      description: "Adorable ShihTzu with a gentle temperament and beautiful coat.",
      available: true
    },
    {
      id: 3,
      name: "Luna",
      breed: "Cavapoo",
      age: "9 weeks",
      gender: "Female",
      price: "$1,100",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
      description: "Hypoallergenic Cavapoo perfect for families with allergies.",
      available: true
    },
    {
      id: 4,
      name: "Rocky",
      breed: "Dachshund",
      age: "7 weeks",
      gender: "Male",
      price: "$800",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&q=80",
      description: "Energetic Dachshund with a bold personality and loving nature.",
      available: false
    }
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="available-puppies" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
            Available Puppies
          </h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Meet our adorable puppies who are ready to find their forever homes. 
            Each puppy comes with health certificates and our lifetime support guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {availablePuppies.map((puppy) => (
            <Card key={puppy.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-amber-50 border-2 border-amber-200 hover:border-teal-300">
              <div className="relative overflow-hidden">
                <img 
                  src={puppy.image} 
                  alt={puppy.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={puppy.available ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                    {puppy.available ? "Available" : "Reserved"}
                  </Badge>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-amber-800">
                    {puppy.price}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-amber-900 group-hover:text-teal-700 transition-colors duration-300">
                    {puppy.name}
                  </h3>
                  <Heart className="w-6 h-6 text-red-400 group-hover:text-red-500 transition-colors duration-300" />
                </div>
                
                <p className="text-lg font-semibold text-teal-600 mb-2">{puppy.breed}</p>
                
                <div className="flex items-center gap-4 mb-3 text-sm text-amber-700">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {puppy.age}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {puppy.gender}
                  </div>
                </div>
                
                <p className="text-amber-700 mb-4 leading-relaxed text-sm">
                  {puppy.description}
                </p>
                
                <Button 
                  className={`w-full ${puppy.available 
                    ? 'bg-teal-600 hover:bg-teal-700' 
                    : 'bg-gray-400 cursor-not-allowed'} 
                    text-white transition-all duration-300`}
                  onClick={puppy.available ? scrollToContact : undefined}
                  disabled={!puppy.available}
                >
                  {puppy.available ? 'Inquire Now' : 'Reserved'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-amber-700 mb-6">
            Don't see the perfect puppy? We have more litters planned throughout the year.
          </p>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={scrollToContact}
          >
            Join Our Waiting List
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AvailablePuppies;
