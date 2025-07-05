
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, Heart, MapPin, Calendar } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah & Mike Johnson",
      location: "Austin, TX",
      puppy: "Golden Doodle - Charlie",
      adoptionDate: "March 2024",
      rating: 5,
      story: "Our experience with Pick a Puppy was absolutely wonderful from start to finish! Charlie has brought so much joy to our family. The breeder was incredibly knowledgeable and supportive throughout the entire process. Charlie came home perfectly socialized, healthy, and well-adjusted. He's now 6 months old and the perfect addition to our family. We couldn't be happier!",
      ownerImage: "https://images.unsplash.com/photo-1494790108755-2616b612b587?w=150&q=80",
      puppyThenImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80",
      puppyNowImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
      featured: true
    },
    {
      id: 2,
      name: "Lisa & Tom Chen",
      location: "Dallas, TX",
      puppy: "Cavapoo - Mia",
      adoptionDate: "January 2024",
      rating: 5,
      story: "Mia has been the perfect addition to our family! She's exactly as described - hypoallergenic, sweet-natured, and incredibly smart. The health guarantee gave us such peace of mind, and the ongoing support has been invaluable. She's great with our kids and has adapted beautifully to our home. We're already considering getting a second puppy from Pick a Puppy!",
      ownerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
      puppyThenImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
      puppyNowImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80",
      featured: true
    },
    {
      id: 3,
      name: "Jennifer Martinez",
      location: "Houston, TX",
      puppy: "ShihTzu - Buddy",
      adoptionDate: "December 2023",
      rating: 5,
      story: "The level of care and attention to detail is incredible. Buddy came home healthy, happy, and already partially house-trained! The 13 years of experience really shows in how well-socialized and adjusted he was. The breeder provided excellent guidance on feeding, training, and care. Buddy is now a year old and the sweetest, most well-behaved dog. Highly recommend!",
      ownerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
      puppyThenImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80",
      puppyNowImage: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&q=80",
      featured: true
    },
    {
      id: 4,
      name: "David & Emma Wilson",
      location: "San Antonio, TX",
      puppy: "Dachshund - Rosie",
      adaptionDate: "October 2023",
      rating: 5,
      story: "Rosie has the most amazing personality! She's exactly what we were looking for - playful, loving, and full of character. The entire process was seamless, and we felt supported every step of the way. The health testing on the parents and the comprehensive health guarantee shows how much the breeder cares about their puppies' well-being.",
      ownerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
      puppyThenImage: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&q=80",
      puppyNowImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
      featured: false
    },
    {
      id: 5,
      name: "Amanda Rodriguez",
      location: "Fort Worth, TX",
      puppy: "Chihuahua - Peanut",
      adoptionDate: "August 2023",
      rating: 5,
      story: "Peanut may be tiny, but she has the biggest personality! She's confident, loving, and brings so much joy to our apartment. The breeder's expertise with small breeds really shows - Peanut was perfectly socialized and comfortable with new situations right from day one. Excellent communication throughout the entire process.",
      ownerImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
      puppyThenImage: "https://images.unsplash.com/photo-1444212477490-ca407925329e?w=400&q=80",
      puppyNowImage: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80",
      featured: false
    },
    {
      id: 6,
      name: "Robert & Carol Thompson",
      location: "Plano, TX",
      puppy: "Doberman - Duke",
      adoptionDate: "June 2023",
      rating: 5,
      story: "Duke is everything we hoped for in a Doberman - intelligent, loyal, and protective yet gentle with our grandchildren. The European bloodlines and health testing were important to us, and the breeder delivered exactly what was promised. Duke's training has progressed wonderfully, and he's become an integral part of our family security and companionship.",
      ownerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
      puppyThenImage: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&q=80",
      puppyNowImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
      featured: false
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Families" },
    { number: "13", label: "Years Experience" },
    { number: "6", label: "Premium Breeds" },
    { number: "100%", label: "Health Guaranteed" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-amber-100 via-orange-50 to-teal-50">
          <div className="container mx-auto px-6 text-center">
            <Heart className="w-16 h-16 text-teal-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">
              Happy Families, Happy Puppies
            </h1>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto mb-12">
              Don't just take our word for it. Here are real stories from families who found 
              their perfect companions through Pick a Puppy.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-teal-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-amber-700 font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Reviews */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">
                Featured Success Stories
              </h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                These families share their journey and how their puppies have grown and thrived
              </p>
            </div>

            <div className="space-y-12">
              {reviews.filter(review => review.featured).map((review) => (
                <Card key={review.id} className="bg-gradient-to-br from-white to-amber-50 border-2 border-amber-200 hover:border-teal-300 transition-all duration-500 hover:shadow-2xl">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Story Content */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center mb-6">
                          <Quote className="w-8 h-8 text-teal-600 mr-3" />
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-amber-700 leading-relaxed mb-6 text-lg italic">
                          "{review.story}"
                        </p>
                        
                        <div className="flex items-center">
                          <img 
                            src={review.ownerImage} 
                            alt={review.name}
                            className="w-16 h-16 rounded-full object-cover mr-4"
                          />
                          <div>
                            <h4 className="font-bold text-amber-900 text-lg">
                              {review.name}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-amber-600">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {review.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {review.adoptionDate}
                              </span>
                            </div>
                            <p className="text-teal-600 font-semibold">{review.puppy}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Before/After Images */}
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-sm font-semibold text-amber-700 mb-2">Then (8 weeks old)</h5>
                          <img 
                            src={review.puppyThenImage} 
                            alt={`${review.puppy} as a puppy`}
                            className="w-full h-32 object-cover rounded-lg border-2 border-amber-200"
                          />
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-amber-700 mb-2">Now (All grown up!)</h5>
                          <img 
                            src={review.puppyNowImage} 
                            alt={`${review.puppy} now`}
                            className="w-full h-32 object-cover rounded-lg border-2 border-teal-200"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* All Reviews Grid */}
        <section className="py-20 bg-gradient-to-br from-teal-50 to-amber-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">
                More Happy Families
              </h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Every puppy that leaves our home becomes part of an extended family
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.filter(review => !review.featured).map((review) => (
                <Card key={review.id} className="group bg-white hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-amber-200 hover:border-teal-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Quote className="w-6 h-6 text-teal-600 mr-2" />
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-amber-700 leading-relaxed mb-4 italic">
                      "{review.story.substring(0, 200)}..."
                    </p>
                    
                    <div className="flex items-center mb-4">
                      <img 
                        src={review.ownerImage} 
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h4 className="font-bold text-amber-900 group-hover:text-teal-700 transition-colors duration-300">
                          {review.name}
                        </h4>
                        <p className="text-sm text-amber-600">{review.location}</p>
                        <p className="text-sm text-teal-600 font-semibold">{review.puppy}</p>
                      </div>
                    </div>

                    {/* Puppy Images */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <img 
                          src={review.puppyThenImage} 
                          alt="Puppy then"
                          className="w-full h-20 object-cover rounded border border-amber-200"
                        />
                        <p className="text-xs text-amber-600 text-center mt-1">Then</p>
                      </div>
                      <div>
                        <img 
                          src={review.puppyNowImage} 
                          alt="Puppy now"
                          className="w-full h-20 object-cover rounded border border-teal-200"
                        />
                        <p className="text-xs text-teal-600 text-center mt-1">Now</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-amber-50 to-teal-50 border-2 border-teal-200">
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
                    href="/#available-puppies"
                    className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    See Available Puppies
                  </a>
                  <a 
                    href="/#contact"
                    className="border-2 border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
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

export default Reviews;
