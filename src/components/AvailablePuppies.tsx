
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, MapPin, Calendar, Shield, Award, CheckCircle, Play, Camera } from 'lucide-react';

const AvailablePuppies = () => {
  const [breedFilter, setBreedFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const availablePuppies = [
    {
      id: 1,
      name: "Bella",
      breed: "Golden Doodle",
      age: "8 weeks",
      gender: "Female",
      price: "$1,200",
      deposit: "$300",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80",
      parentImages: [
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80",
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80"
      ],
      description: "Sweet and playful Golden Doodle ready for her forever home.",
      available: true,
      vetChecked: true,
      akcRegistered: true,
      healthGuaranteed: true,
      videoUrl: "#"
    },
    {
      id: 2,
      name: "Max",
      breed: "ShihTzu",
      age: "10 weeks",
      gender: "Male",
      price: "$900",
      deposit: "$250",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80",
      parentImages: [
        "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80",
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80"
      ],
      description: "Adorable ShihTzu with a gentle temperament and beautiful coat.",
      available: true,
      vetChecked: true,
      akcRegistered: true,
      healthGuaranteed: true,
      videoUrl: "#"
    },
    {
      id: 3,
      name: "Luna",
      breed: "Cavapoo",
      age: "9 weeks",
      gender: "Female",
      price: "$1,100",
      deposit: "$275",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
      parentImages: [
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80",
        "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80"
      ],
      description: "Hypoallergenic Cavapoo perfect for families with allergies.",
      available: true,
      vetChecked: true,
      akcRegistered: true,
      healthGuaranteed: true,
      videoUrl: "#"
    },
    {
      id: 4,
      name: "Rocky",
      breed: "Dachshund",
      age: "7 weeks",
      gender: "Male",
      price: "$800",
      deposit: "$200",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&q=80",
      parentImages: [
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80"
      ],
      description: "Energetic Dachshund with a bold personality and loving nature.",
      available: false,
      vetChecked: true,
      akcRegistered: true,
      healthGuaranteed: true,
      videoUrl: "#"
    },
    {
      id: 5,
      name: "Milo",
      breed: "Chihuahua",
      age: "12 weeks",
      gender: "Male",
      price: "$700",
      deposit: "$175",
      image: "https://images.unsplash.com/photo-1444212477490-ca407925329e?w=800&q=80",
      parentImages: [
        "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80",
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80"
      ],
      description: "Tiny but mighty Chihuahua with a big personality.",
      available: true,
      vetChecked: true,
      akcRegistered: true,
      healthGuaranteed: true,
      videoUrl: "#"
    },
    {
      id: 6,
      name: "Zeus",
      breed: "Doberman",
      age: "8 weeks",
      gender: "Male",
      price: "$1,500",
      deposit: "$400",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&q=80",
      parentImages: [
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80",
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80"
      ],
      description: "Strong and loyal Doberman with excellent bloodlines.",
      available: true,
      vetChecked: true,
      akcRegistered: true,
      healthGuaranteed: true,
      videoUrl: "#"
    }
  ];

  const filteredPuppies = availablePuppies.filter(puppy => {
    if (breedFilter !== 'all' && puppy.breed !== breedFilter) return false;
    if (genderFilter !== 'all' && puppy.gender !== genderFilter) return false;
    if (ageFilter !== 'all') {
      const weeks = parseInt(puppy.age);
      if (ageFilter === '6-8' && (weeks < 6 || weeks > 8)) return false;
      if (ageFilter === '9-12' && (weeks < 9 || weeks > 12)) return false;
      if (ageFilter === '13+' && weeks < 13) return false;
    }
    if (availabilityFilter !== 'all') {
      if (availabilityFilter === 'available' && !puppy.available) return false;
      if (availabilityFilter === 'reserved' && puppy.available) return false;
    }
    return true;
  });

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
            Each puppy comes with health certificates, AKC registration, and our lifetime support guarantee.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex justify-center items-center gap-8 mb-12 flex-wrap">
          <div className="flex items-center gap-2 text-teal-600">
            <Shield className="w-6 h-6" />
            <span className="font-semibold">Vet-Checked</span>
          </div>
          <div className="flex items-center gap-2 text-teal-600">
            <Heart className="w-6 h-6" />
            <span className="font-semibold">Health Guaranteed</span>
          </div>
          <div className="flex items-center gap-2 text-teal-600">
            <Award className="w-6 h-6" />
            <span className="font-semibold">AKC Registered</span>
          </div>
          <div className="flex items-center gap-2 text-teal-600">
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold">13+ Years Experience</span>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12 bg-gradient-to-r from-amber-50 to-teal-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-amber-900 mb-4 text-center">Filter Puppies</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2">Breed</label>
              <Select value={breedFilter} onValueChange={setBreedFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Breeds" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Breeds</SelectItem>
                  <SelectItem value="Golden Doodle">Golden Doodle</SelectItem>
                  <SelectItem value="ShihTzu">ShihTzu</SelectItem>
                  <SelectItem value="Cavapoo">Cavapoo</SelectItem>
                  <SelectItem value="Dachshund">Dachshund</SelectItem>
                  <SelectItem value="Chihuahua">Chihuahua</SelectItem>
                  <SelectItem value="Doberman">Doberman</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2">Gender</label>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Genders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2">Age</label>
              <Select value={ageFilter} onValueChange={setAgeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Ages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="6-8">6-8 weeks</SelectItem>
                  <SelectItem value="9-12">9-12 weeks</SelectItem>
                  <SelectItem value="13+">13+ weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-amber-700 mb-2">Availability</label>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPuppies.map((puppy) => (
            <Card key={puppy.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-amber-50 border-2 border-amber-200 hover:border-teal-300">
              <div className="relative overflow-hidden">
                <img 
                  src={puppy.image} 
                  alt={puppy.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Badge className={puppy.available ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                    {puppy.available ? "Available" : "Reserved"}
                  </Badge>
                  {puppy.videoUrl && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 cursor-pointer hover:bg-purple-200">
                      <Play className="w-3 h-3 mr-1" />
                      Video
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 left-4 flex flex-col gap-1">
                  <Badge variant="secondary" className="bg-white/90 text-amber-800">
                    {puppy.price}
                  </Badge>
                  <Badge variant="secondary" className="bg-teal-100 text-teal-700 text-xs">
                    Deposit: {puppy.deposit}
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

                {/* Trust badges for each puppy */}
                <div className="flex gap-2 mb-3 flex-wrap">
                  {puppy.vetChecked && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                      <Shield className="w-3 h-3 mr-1" />
                      Vet-Checked
                    </Badge>
                  )}
                  {puppy.healthGuaranteed && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                      <Heart className="w-3 h-3 mr-1" />
                      Health Guaranteed
                    </Badge>
                  )}
                  {puppy.akcRegistered && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                      <Award className="w-3 h-3 mr-1" />
                      AKC
                    </Badge>
                  )}
                </div>
                
                <p className="text-amber-700 mb-4 leading-relaxed text-sm">
                  {puppy.description}
                </p>

                {/* Parent Images */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-amber-700 mb-2">Parents:</p>
                  <div className="flex gap-2">
                    {puppy.parentImages.map((parentImg, index) => (
                      <img 
                        key={index}
                        src={parentImg} 
                        alt={`Parent ${index + 1}`}
                        className="w-12 h-12 rounded-full object-cover border-2 border-teal-200"
                      />
                    ))}
                  </div>
                </div>
                
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

        {filteredPuppies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-amber-700">No puppies match your current filters.</p>
            <Button 
              onClick={() => {
                setBreedFilter('all');
                setGenderFilter('all');
                setAgeFilter('all');
                setAvailabilityFilter('all');
              }}
              className="mt-4 bg-teal-600 hover:bg-teal-700 text-white"
            >
              Clear All Filters
            </Button>
          </div>
        )}

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
