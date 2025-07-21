import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Award, Shield, Users } from 'lucide-react';
const AboutSection = () => {
  const features = [{
    icon: Heart,
    title: "Passionate Care",
    description: "Every puppy is raised with love and individual attention in our family environment."
  }, {
    icon: Award,
    title: "13+ Years Experience",
    description: "Over a decade of dedicated breeding experience with champion bloodlines."
  }, {
    icon: Shield,
    title: "Health Guaranteed",
    description: "All puppies come with health certificates and comprehensive health guarantees."
  }, {
    icon: Users,
    title: "Family Focused",
    description: "We carefully match each puppy with the perfect family for lifelong happiness."
  }];
  return <section className="py-20 bg-gradient-to-br from-teal-50 to-amber-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
            Why Choose Happy Tails Breeder?
          </h2>
          <p className="text-xl text-amber-700 max-w-4xl mx-auto leading-relaxed">
            With 13 years of dedicated breeding experience, we've built our reputation on providing 
            healthy, well-socialized puppies to loving families. Our commitment to excellence ensures 
            that every puppy we place brings joy and companionship for years to come.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => <Card key={feature.title} className="group text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white border-2 border-amber-200 hover:border-teal-300">
              <CardContent className="p-8">
                <div className="mb-6">
                  <feature.icon className="w-16 h-16 mx-auto text-teal-600 group-hover:text-teal-700 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-4 group-hover:text-teal-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-amber-700 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>)}
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border-2 border-amber-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-amber-900 mb-6">Our Story & Commitment</h3>
              <p className="text-amber-700 leading-relaxed mb-6">For over 13 years, we've been dedicated to breeding exceptional puppies that become cherished family members. Our passion for dogs and commitment to ethical breeding practices has earned us the trust of countless families.</p>
              <p className="text-amber-700 leading-relaxed mb-6">
                We specialize in six wonderful breeds, each carefully selected for their unique 
                qualities and compatibility with family life. From the gentle Giant Doberman to 
                the tiny but mighty Chihuahua, we have the perfect companion for every lifestyle.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600">13+</div>
                  <div className="text-sm text-amber-700">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600">6</div>
                  <div className="text-sm text-amber-700">Premium Breeds</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-600">500+</div>
                  <div className="text-sm text-amber-700">Happy Families</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80" alt="Happy family with puppy" className="rounded-xl shadow-lg w-full h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-600/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;