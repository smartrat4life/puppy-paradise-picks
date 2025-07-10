
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Heart, Share2 } from 'lucide-react';
import { usePuppies } from '@/hooks/usePuppies';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import PuppyGrid from '@/components/puppies/PuppyGrid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PuppyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { puppies, loading } = usePuppies();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const puppy = puppies.find(p => p.id === id);
  const similarPuppies = puppies.filter(p => p.id !== id && p.breed === puppy?.breed && p.status === 'available').slice(0, 3);

  const calculateAgeInWeeks = (birthDate: string) => {
    const birth = new Date(birthDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - birth.getTime());
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    return diffWeeks;
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!puppy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-amber-900 mb-4">Puppy Not Found</h1>
            <Link to="/">
              <Button className="bg-teal-600 hover:bg-teal-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const ageInWeeks = calculateAgeInWeeks(puppy.birth_date);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />
      
      <motion.div 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center mb-6 text-teal-600 hover:text-teal-700 transition-colors"
          onClick={() => {
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Puppies
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Main Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ImageWithFallback
              src={puppy.image_url || 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80'}
              alt={`${puppy.name} - ${puppy.breed} puppy`}
              className="w-full h-96 md:h-[500px] object-cover object-center rounded-2xl shadow-xl"
              containerClassName="w-full h-96 md:h-[500px] rounded-2xl overflow-hidden"
              style={{ aspectRatio: '4/3' }}
            />
            
            {/* Floating Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
                <Heart className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Puppy Information */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-amber-900">{puppy.name}</h1>
                <Badge className={`${puppy.status === 'available' ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}>
                  {puppy.status === 'available' ? 'Available' : 'Reserved'}
                </Badge>
              </div>
              <p className="text-xl text-teal-600 font-semibold mb-4">{puppy.breed}</p>
              <div className="text-2xl font-bold text-amber-900 mb-6">${puppy.price}</div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                  <div className="font-semibold text-amber-900">{ageInWeeks} weeks</div>
                  <div className="text-sm text-amber-700">Age</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <MapPin className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                  <div className="font-semibold text-amber-900 capitalize">{puppy.gender}</div>
                  <div className="text-sm text-amber-700">Gender</div>
                </CardContent>
              </Card>
            </div>

            {/* Adopt Me Button */}
            <Button 
              className={`w-full text-lg py-6 ${puppy.status === 'available' 
                ? 'bg-teal-600 hover:bg-teal-700' 
                : 'bg-gray-400 cursor-not-allowed'} 
                text-white transition-all duration-300`}
              onClick={puppy.status === 'available' ? scrollToContact : undefined}
              disabled={puppy.status !== 'available'}
            >
              {puppy.status === 'available' ? 'Adopt Me' : 'Reserved'}
            </Button>
          </motion.div>
        </div>

        {/* Description */}
        {puppy.description && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-amber-900 mb-4">About {puppy.name}</h2>
                <div className="text-amber-700 leading-relaxed whitespace-pre-line">
                  {puppy.description}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Similar Puppies */}
        {similarPuppies.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-6 text-center">
              Other {puppy.breed} Puppies
            </h2>
            <PuppyGrid
              puppies={similarPuppies}
              calculateAgeInWeeks={calculateAgeInWeeks}
              onInquire={scrollToContact}
            />
          </motion.div>
        )}
      </motion.div>

      <Footer />
    </div>
  );
};

export default PuppyDetails;
