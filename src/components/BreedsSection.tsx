
import React from 'react';
import BreedCard from './BreedCard';

const BreedsSection = () => {
  const breeds = [
    {
      name: "ShihTzu",
      description: "Friendly, outgoing, and affectionate companions known for their beautiful coats and loving nature.",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80",
      traits: ["Friendly", "Outgoing", "Low Shedding"]
    },
    {
      name: "Doberman",
      description: "Intelligent, loyal, and fearless protectors with elegant athleticism and unwavering devotion.",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&q=80",
      traits: ["Intelligent", "Loyal", "Protective"]
    },
    {
      name: "Cavapoo",
      description: "Sweet-natured, intelligent, and hypoallergenic crosses that make perfect family companions.",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
      traits: ["Sweet", "Hypoallergenic", "Family-Friendly"]
    },
    {
      name: "GoldenDoodle",
      description: "Gentle, intelligent, and playful hybrids combining the best of Golden Retrievers and Poodles.",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80",
      traits: ["Gentle", "Intelligent", "Playful"]
    },
    {
      name: "Chihuahua",
      description: "Bold, confident, and charming small dogs with big personalities and fierce loyalty.",
      image: "https://images.unsplash.com/photo-1444212477490-ca407925329e?w=800&q=80",
      traits: ["Bold", "Confident", "Loyal"]
    },
    {
      name: "Dachshund",
      description: "Clever, lively, and courageous with distinctive long bodies and playful personalities.",
      image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&q=80",
      traits: ["Clever", "Lively", "Courageous"]
    }
  ];

  return (
    <section id="breeds" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
            Our Premium Breeds
          </h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Each breed is carefully selected and bred with love, ensuring healthy, happy puppies 
            that will bring joy to your family for years to come.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {breeds.map((breed, index) => (
            <BreedCard key={breed.name} breed={breed} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BreedsSection;
