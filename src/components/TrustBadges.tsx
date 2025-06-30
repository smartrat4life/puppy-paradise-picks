import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const TrustBadges = () => {
  const badges = [
    { id: 1, text: 'Vet-Checked', icon: <CheckCircle2 className="w-6 h-6 text-green-500" /> },
    { id: 2, text: 'Health Guaranteed', icon: <CheckCircle2 className="w-6 h-6 text-green-500" /> },
    { id: 3, text: 'AKC Registered', icon: <CheckCircle2 className="w-6 h-6 text-green-500" /> },
    { id: 4, text: 'Microchipped', icon: <CheckCircle2 className="w-6 h-6 text-green-500" /> },
  ];

  const trustedBy = [
    { id: 1, name: 'AKC', logo: '/images/akc-logo.png' },
    { id: 2, name: 'Good Dog', logo: '/images/good-dog-logo.png' },
    { id: 3, name: 'PuppySpot', logo: '/images/puppyspot-logo.png' },
    { id: 4, name: 'Petfinder', logo: '/images/petfinder-logo.png' },
  ];

  return (
    <section className="py-12 bg-amber-35">
      <div className="container mx-auto px-4">
        {/* Trust Badges */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Promise to You</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {badges.map((badge) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: badge.id * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="bg-white p-4 rounded-full shadow-md mb-3">
                  {badge.icon}
                </div>
                <span className="font-medium text-gray-700">{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trusted By Section className="grayscale hover:grayscale-0 transition-all duration-300" */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Trusted By</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {trustedBy.map((company) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: company.id * 0.1 }}
                className="flex items-center justify-center"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-24 w-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/150x60?text=${company.name}`;
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
