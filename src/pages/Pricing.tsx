
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Shield, Heart, Award, DollarSign, RefreshCw } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Pricing = () => {
  const breedPricing = [
    {
      breed: "Golden Doodle",
      price: "$1,200 - $1,500",
      deposit: "$300 - $400",
      description: "Hypoallergenic, intelligent, and family-friendly companions",
      features: ["F1 & F1B Available", "Health Tested Parents", "Non-Shedding Coat"]
    },
    {
      breed: "ShihTzu",
      price: "$900 - $1,100",
      deposit: "$250 - $300",
      description: "Loving, outgoing, and beautiful companion dogs",
      features: ["Champion Bloodlines", "Luxurious Coat", "Great with Kids"]
    },
    {
      breed: "Cavapoo",
      price: "$1,100 - $1,300",
      deposit: "$275 - $350",
      description: "Sweet-natured, hypoallergenic family pets",
      features: ["Hypoallergenic", "Gentle Temperament", "Easy to Train"]
    },
    {
      breed: "Doberman",
      price: "$1,500 - $2,000",
      deposit: "$400 - $500",
      description: "Loyal, intelligent, and protective guardians",
      features: ["European Bloodlines", "Protection Trained", "Health Certified"]
    },
    {
      breed: "Chihuahua",
      price: "$700 - $900",
      deposit: "$175 - $225",
      description: "Bold, confident, and charming small companions",
      features: ["Tiny Size", "Big Personality", "Long Lifespan"]
    },
    {
      breed: "Dachshund",
      price: "$800 - $1,000",
      deposit: "$200 - $250",
      description: "Clever, lively, and courageous sausage dogs",
      features: ["Standard & Miniature", "Various Colors", "Playful Nature"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-amber-100 via-orange-50 to-teal-50">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">
              Transparent Pricing
            </h1>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto mb-8">
              No hidden fees, no surprises. Our pricing reflects the quality care, health testing, 
              and love that goes into raising each puppy.
            </p>
            
            {/* Trust Badges */}
            <div className="flex justify-center items-center gap-8 mb-10 flex-wrap">
              <div className="flex items-center gap-2 text-teal-600">
                <Shield className="w-6 h-6" />
                <span className="font-semibold">Health Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-teal-600">
                <Award className="w-6 h-6" />
                <span className="font-semibold">AKC Registered</span>
              </div>
              <div className="flex items-center gap-2 text-teal-600">
                <Heart className="w-6 h-6" />
                <span className="font-semibold">Lifetime Support</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {breedPricing.map((breed, index) => (
                <Card key={index} className="hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-amber-50 border-2 border-amber-200 hover:border-teal-300">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-amber-900 mb-2">
                      {breed.breed}
                    </CardTitle>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-teal-600">
                        {breed.price}
                      </div>
                      <Badge className="bg-amber-100 text-amber-800">
                        Deposit: {breed.deposit}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-amber-700 mb-6 text-center">
                      {breed.description}
                    </p>
                    <ul className="space-y-3">
                      {breed.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-amber-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 bg-gradient-to-br from-teal-50 to-amber-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-amber-900 mb-6">
                What's Included with Every Puppy
              </h2>
              <p className="text-xl text-amber-700 max-w-3xl mx-auto">
                Your investment includes comprehensive care and guarantees for peace of mind
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center bg-white/80 backdrop-blur">
                <CardContent className="p-6">
                  <Shield className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-amber-900 mb-2">Health Certificate</h3>
                  <p className="text-amber-700 text-sm">Complete veterinary examination and health clearance</p>
                </CardContent>
              </Card>

              <Card className="text-center bg-white/80 backdrop-blur">
                <CardContent className="p-6">
                  <Award className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-amber-900 mb-2">AKC Registration</h3>
                  <p className="text-amber-700 text-sm">Official registration papers and pedigree documentation</p>
                </CardContent>
              </Card>

              <Card className="text-center bg-white/80 backdrop-blur">
                <CardContent className="p-6">
                  <Heart className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-amber-900 mb-2">Vaccinations</h3>
                  <p className="text-amber-700 text-sm">Age-appropriate vaccines and deworming treatments</p>
                </CardContent>
              </Card>

              <Card className="text-center bg-white/80 backdrop-blur">
                <CardContent className="p-6">
                  <CheckCircle className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-amber-900 mb-2">Microchip</h3>
                  <p className="text-amber-700 text-sm">Permanent identification for your puppy's safety</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Health Guarantee */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-amber-900 mb-6">
                  Our Health Guarantee
                </h2>
                <p className="text-xl text-amber-700">
                  We stand behind the health and quality of every puppy we place
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-green-800">
                      <Shield className="w-8 h-8 text-green-600" />
                      2-Year Health Guarantee
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-green-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Coverage for genetic conditions
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Hip and elbow dysplasia
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Heart conditions
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Eye disorders
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-blue-800">
                      <Heart className="w-8 h-8 text-blue-600" />
                      Lifetime Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-blue-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Training guidance and tips
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Behavioral support
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Nutrition recommendations
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Re-homing assistance if needed
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Refund Policy */}
        <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-amber-900 mb-6">
                  Deposit & Refund Policy
                </h2>
                <p className="text-xl text-amber-700">
                  Clear terms to protect both you and your future puppy
                </p>
              </div>

              <Card className="bg-white/80 backdrop-blur">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-3">
                        <DollarSign className="w-8 h-8 text-green-600" />
                        Deposit Terms
                      </h3>
                      <ul className="space-y-3 text-amber-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-1 text-green-500" />
                          <span>Deposits secure your puppy and are applied to final payment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-1 text-green-500" />
                          <span>Deposits are transferable to future litters within 1 year</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-1 text-green-500" />
                          <span>Balance due at 8 weeks of age before pickup</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-1 text-green-500" />
                          <span>Payment accepted: Cash, certified check, or bank transfer</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-3">
                        <RefreshCw className="w-8 h-8 text-blue-600" />
                        Refund Policy
                      </h3>
                      <ul className="space-y-3 text-amber-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-1 text-blue-500" />
                          <span>Full refund if puppy has serious health issues at birth</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-1 text-blue-500" />
                          <span>Deposits refundable up to 2 weeks after placement</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-1 text-blue-500" />
                          <span>Transfer option available for family emergencies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-1 text-blue-500" />
                          <span>Non-refundable after puppy goes home (health guarantee applies)</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-amber-100 to-teal-100 rounded-lg">
                    <p className="text-amber-800 font-semibold text-center">
                      <Shield className="w-5 h-5 inline mr-2" />
                      All policies are designed to ensure the best outcome for both puppies and families. 
                      We're here to support you throughout the entire process.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
