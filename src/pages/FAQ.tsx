
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, HelpCircle, Truck, Shield, Calendar, Heart, MapPin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqData = [
    {
      category: "Puppy Care & Health",
      icon: <Heart className="w-6 h-6" />,
      questions: [
        {
          question: "What age do you release puppies?",
          answer: "We release our puppies at 8-10 weeks of age, depending on the breed and individual puppy's development. This ensures they are fully weaned, have received their first set of vaccinations, and have had proper socialization with their littermates and mother. Smaller breeds like Chihuahuas may stay until 10-12 weeks for extra development time."
        },
        {
          question: "Are the puppies vaccinated?",
          answer: "Yes! All puppies receive age-appropriate vaccinations before going home. This typically includes their first DHPP vaccine (Distemper, Hepatitis, Parvovirus, Parainfluenza) and deworming treatments. We provide a complete health record showing all vaccinations and treatments received. Your veterinarian will continue the vaccination schedule."
        },
        {
          question: "What health testing do you do on parent dogs?",
          answer: "All our breeding dogs undergo comprehensive health testing including hip and elbow evaluations, eye clearances, and genetic testing for breed-specific conditions. We test for conditions like progressive retinal atrophy (PRA), degenerative myelopathy (DM), and other hereditary diseases common to each breed. Health certificates are available upon request."
        },
        {
          question: "Do you provide health guarantees?",
          answer: "Absolutely! We provide a comprehensive 2-year health guarantee covering genetic conditions, hip/elbow dysplasia, heart conditions, and eye disorders. We also offer lifetime support for training, behavioral guidance, and nutrition advice. If serious health issues arise, we work with you to find the best solution, including replacement or refund options."
        }
      ]
    },
    {
      category: "Shipping & Pickup",
      icon: <Truck className="w-6 h-6" />,
      questions: [
        {
          question: "Do you ship puppies?",
          answer: "Yes, we offer safe and reliable shipping throughout the United States. We use a professional pet transport service with climate-controlled vehicles and experienced handlers. Shipping costs range from $350-$500 depending on distance. We also offer hand-delivery for an additional fee within a 300-mile radius. Many families prefer to visit and pick up their puppy in person."
        },
        {
          question: "Can we visit and meet the puppies before deciding?",
          answer: "Absolutely! We encourage visits and believe it's important for you to meet your potential puppy. Visits are scheduled by appointment to ensure the health and safety of our puppies and mothers. We're located in Texas and welcome families to see our facilities, meet the parents, and interact with available puppies."
        },
        {
          question: "What's included when we pick up our puppy?",
          answer: "Your puppy comes with a comprehensive puppy package including: health certificate, vaccination records, AKC registration papers, microchip information, a small bag of the food they're eating, a comfort blanket with mom's scent, care instructions, and our emergency contact information."
        }
      ]
    },
    {
      category: "Registration & Documentation",
      icon: <Shield className="w-6 h-6" />,
      questions: [
        {
          question: "Are your puppies AKC registered?",
          answer: "Yes, all our purebred puppies come with AKC (American Kennel Club) registration papers. Mixed breeds like Goldendoodles and Cavapoos come with documentation from their respective parent clubs. Registration papers include the puppy's pedigree showing their lineage and champion bloodlines where applicable."
        },
        {
          question: "What documentation do you provide?",
          answer: "Each puppy comes with: AKC registration papers (or appropriate breed registry), health certificate from our veterinarian, complete vaccination record, microchip registration information, pedigree documentation, care instructions, feeding guidelines, and our contact information for ongoing support."
        }
      ]
    },
    {
      category: "Deposits & Payments",
      icon: <Calendar className="w-6 h-6" />,
      questions: [
        {
          question: "How much is the deposit and when is it due?",
          answer: "Deposit amounts vary by breed, ranging from $175-$500. Deposits are required to reserve your puppy and are applied to the final purchase price. The remaining balance is due when your puppy is 8 weeks old and ready to go home. We accept cash, certified checks, and bank transfers."
        },
        {
          question: "Are deposits refundable?",
          answer: "Deposits are refundable up to 2 weeks after placement if you decide the puppy isn't the right fit for your family. After the puppy goes home, deposits become non-refundable, but our health guarantee covers any serious health issues that may arise. Deposits can be transferred to future litters within one year if needed."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept cash, certified checks, money orders, and bank transfers. For deposits, we also accept Gift Cards, Cash app, PayPal and Venmo. Credit cards are not accepted for final payments due to processing fees, but we're happy to work with you on payment timing if needed."
        }
      ]
    },
    {
      category: "Breeding & Availability",
      icon: <MapPin className="w-6 h-6" />,
      questions: [
        {
          question: "How often do you have litters available?",
          answer: "We typically have 2-3 litters per breed per year, spacing them to ensure the health and well-being of our mothers. We maintain a waiting list for each breed, and families on the list get first choice of available puppies. We recommend getting on our waiting list even if current litters are sold out."
        },
        {
          question: "Can I choose my puppy's gender and color?",
          answer: "We do our best to accommodate preferences for gender and color, but availability depends on each litter. Families on our waiting list get to choose in the order deposits were received. We'll work with you to find a puppy that matches your preferences and lifestyle needs."
        },
        {
          question: "Do you breed for specific traits or temperaments?",
          answer: "Yes! We carefully select breeding pairs based on temperament, health, conformation, and breed standards. We breed for stable, family-friendly temperaments and work to maintain the best qualities of each breed. All our breeding dogs have excellent temperaments and are part of our family."
        },
        {
          question: "What makes your breeding program special?",
          answer: "With 13 years of experience, we focus on health, temperament, and proper socialization. Our puppies are raised in our home, not in kennels, and receive constant human interaction. We follow the Puppy Culture protocol for early neurological stimulation and socialization. Each puppy is individually evaluated and matched with families based on lifestyle and preferences."
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const questionId = categoryIndex * 1000 + questionIndex;
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-amber-100 via-orange-50 to-teal-50">
          <div className="container mx-auto px-6 text-center">
            <HelpCircle className="w-16 h-16 text-teal-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Find answers to the most common questions about our puppies, process, and policies. 
              Can't find what you're looking for? Feel free to contact us directly.
            </p>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              {faqData.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-teal-600">{category.icon}</div>
                    <h2 className="text-3xl font-bold text-amber-900">{category.category}</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {category.questions.map((faq, questionIndex) => {
                      const questionId = categoryIndex * 1000 + questionIndex;
                      const isOpen = openQuestion === questionId;
                      
                      return (
                        <Card key={questionIndex} className="overflow-hidden border-2 border-amber-200 hover:border-teal-300 transition-colors duration-300">
                          <button
                            onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                            className="w-full text-left"
                          >
                            <CardContent className="p-6 hover:bg-amber-50/50 transition-colors duration-300">
                              <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-amber-900 pr-4">
                                  {faq.question}
                                </h3>
                                {isOpen ? (
                                  <ChevronUp className="w-5 h-5 text-teal-600 flex-shrink-0" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-teal-600 flex-shrink-0" />
                                )}
                              </div>
                            </CardContent>
                          </button>
                          
                          {isOpen && (
                            <CardContent className="px-6 pb-6 pt-0">
                              <div className="bg-gradient-to-r from-teal-50 to-amber-50 p-4 rounded-lg">
                                <p className="text-amber-700 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-16 text-center">
              <Card className="max-w-2xl mx-auto bg-gradient-to-br from-teal-50 to-amber-50 border-2 border-teal-200">
                <CardContent className="p-8">
                  <HelpCircle className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-amber-900 mb-4">
                    Still Have Questions?
                  </h3>
                  <p className="text-amber-700 mb-6">
                    We're here to help! Don't hesitate to reach out with any questions 
                    about our puppies, process, or policies.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="tel:+0001234567"
                      className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300"
                    >
                      Call Us: (000) 123-4567
                    </a>
                    <a 
                      href="mailto:pickapuppy@gmail.com"
                      className="border-2 border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
                    >
                      Email Us
                    </a>
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

export default FAQ;
