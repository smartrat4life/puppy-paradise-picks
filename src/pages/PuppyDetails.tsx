
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Heart, Share2, PawPrint, Phone } from 'lucide-react';
import { usePuppies } from '@/hooks/usePuppies';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import PuppyGrid from '@/components/puppies/PuppyGrid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

const PuppyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { puppies, loading } = usePuppies();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { user } = useAuth();
  const { toast } = useToast();

  const [isFavorited, setIsFavorited] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestedBreed: '',
    message: ''
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const puppy = puppies.find(p => p.id === id);
  const similarPuppies = puppies.filter(p => p.id !== id && p.breed === puppy?.breed && p.status === 'available').slice(0, 3);

  // Check if puppy is favorited
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user && puppy) {
        try {
          const favoriteStatus = await isFavorite(puppy.id);
          setIsFavorited(favoriteStatus);
        } catch (error) {
          console.error('Error checking favorite status:', error);
        }
      }
    };
    checkFavoriteStatus();
  }, [user, puppy, isFavorite]);

  const calculateAgeInWeeks = (birthDate: string, referenceDate?: string) => {
    const birth = new Date(birthDate);
    const ref = referenceDate ? new Date(referenceDate) : new Date();
    const diffTime = Math.abs(ref.getTime() - birth.getTime());
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    return diffWeeks;
  };

  const handleFavoriteToggle = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add favorites",
        variant: "destructive",
      });
      return;
    }

    if (!puppy) return;

    try {
      if (isFavorited) {
        await removeFromFavorites(puppy.id);
        setIsFavorited(false);
      } else {
        await addToFavorites(puppy.id);
        setIsFavorited(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleShare = async () => {
    if (!puppy) return;

    const shareData = {
      title: `${puppy.name} - ${puppy.breed} Puppy`,
      text: `Check out this adorable ${puppy.breed} puppy named ${puppy.name}!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied!",
          description: "The puppy's page link has been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Error",
        description: "Failed to share. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAdoptMe = () => {
    if (!puppy) return;
    
    // Pre-fill form with puppy information
    setFormData(prev => ({
      ...prev,
      interestedBreed: puppy.breed,
      message: `I'm interested in adopting ${puppy.name}, the ${puppy.breed} puppy. Please contact me with more information.`
    }));
    setShowContactForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      // Insert inquiry into database
      const { error } = await supabase
        .from('inquiries')
        .insert([
          {
            user_id: user?.id || null,
            puppy_id: puppy?.id || null,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: `Interested in: ${formData.interestedBreed}\n\n${formData.message}`,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Thank you for your inquiry!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form and close dialog
      setFormData({
        name: '',
        email: '',
        phone: '',
        interestedBreed: '',
        message: ''
      });
      setShowContactForm(false);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const scrollToContact = () => {
    handleAdoptMe();
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

  const ageInWeeks = calculateAgeInWeeks(puppy.birth_date, (puppy as any).created_at);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Header />

      <motion.div
        className="container mx-auto px-4 sm:px-6 pt-24 pb-10 sm:pt-28 max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Breadcrumb / Back */}
        <nav className="flex items-center gap-2 text-sm text-amber-700 mb-5 flex-wrap" aria-label="Breadcrumb">
          <Link to="/" className="inline-flex items-center text-teal-600 hover:text-teal-700 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Puppies
          </Link>
          <span className="text-amber-300">/</span>
          <span>{puppy.breed}</span>
          <span className="text-amber-300">/</span>
          <span className="font-medium text-amber-900">{puppy.name}</span>
        </nav>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-10 mb-12 items-start">
          {/* Main Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <ImageWithFallback
              src={puppy.image_url || 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80'}
              alt={`${puppy.name} - ${puppy.breed} puppy`}
              className="w-full h-full object-cover object-center"
              containerClassName="w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-1 ring-amber-200"
            />

            {/* Floating Action Buttons */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="bg-white/90 hover:bg-white shadow-md"
                onClick={handleFavoriteToggle}
                title={user ? (isFavorited ? 'Remove from favorites' : 'Add to favorites') : 'Sign in to add favorites'}
              >
                <Heart className={`w-4 h-4 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="bg-white/90 hover:bg-white shadow-md"
                onClick={handleShare}
                title="Share this puppy"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            <Badge
              className={`absolute top-3 left-3 sm:top-4 sm:left-4 shadow-md ${puppy.status === 'available' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
            >
              {puppy.status === 'available' ? 'Available' : 'Reserved'}
            </Badge>
          </motion.div>

          {/* Puppy Information */}
          <motion.div
            className="space-y-5 lg:sticky lg:top-28"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-1 break-words">{puppy.name}</h1>
              <p className="text-lg sm:text-xl text-teal-600 font-semibold mb-3">{puppy.breed}</p>
              <div className="text-3xl font-bold text-amber-900">${puppy.price}</div>
              <p className="text-sm text-amber-700 mt-1">Includes health check, first shots &amp; deworming</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Card className="border-amber-200">
                <CardContent className="p-3 sm:p-4 text-center">
                  <Calendar className="w-5 h-5 text-teal-600 mx-auto mb-1.5" />
                  <div className="font-semibold text-amber-900 text-sm sm:text-base">{ageInWeeks} weeks</div>
                  <div className="text-xs text-amber-700">Age</div>
                </CardContent>
              </Card>
              <Card className="border-amber-200">
                <CardContent className="p-3 sm:p-4 text-center">
                  <PawPrint className="w-5 h-5 text-teal-600 mx-auto mb-1.5" />
                  <div className="font-semibold text-amber-900 capitalize text-sm sm:text-base">{puppy.gender}</div>
                  <div className="text-xs text-amber-700">Gender</div>
                </CardContent>
              </Card>
              <Card className="border-amber-200 col-span-2 sm:col-span-1">
                <CardContent className="p-3 sm:p-4 text-center">
                  <MapPin className="w-5 h-5 text-teal-600 mx-auto mb-1.5" />
                  <div className="font-semibold text-amber-900 text-sm sm:text-base">Texas, USA</div>
                  <div className="text-xs text-amber-700">Location</div>
                </CardContent>
              </Card>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <Button
                className={`w-full text-base sm:text-lg py-6 ${puppy.status === 'available'
                  ? 'bg-teal-600 hover:bg-teal-700'
                  : 'bg-gray-400 cursor-not-allowed'}
                  text-white transition-all duration-300`}
                onClick={puppy.status === 'available' ? handleAdoptMe : undefined}
                disabled={puppy.status !== 'available'}
              >
                {puppy.status === 'available' ? `Inquire about ${puppy.name}` : 'Reserved'}
              </Button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link to="/adoption-application" className="w-full">
                  <Button variant="outline" className="w-full border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white py-5">
                    Apply to Adopt
                  </Button>
                </Link>
                <a href="tel:+12029364192" className="w-full">
                  <Button variant="outline" className="w-full border-amber-300 text-amber-900 hover:bg-amber-100 py-5">
                    <Phone className="w-4 h-4 mr-2" />
                    (202) 936-4192
                  </Button>
                </a>
              </div>
            </div>
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

      {/* Contact Form Dialog */}
      <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-amber-900">Send Us a Message</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">Name *</label>
                <Input 
                  required
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  className="border-amber-200 focus:border-teal-500"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">Email *</label>
                <Input 
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  className="border-amber-200 focus:border-teal-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">Phone</label>
                <Input 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  className="border-amber-200 focus:border-teal-500"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-2">Interested Breed</label>
                <Select value={formData.interestedBreed} onValueChange={(value) => handleFormChange('interestedBreed', value)}>
                  <SelectTrigger className="border-amber-200 focus:border-teal-500">
                    <SelectValue placeholder="Select a breed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shihtzu">ShihTzu</SelectItem>
                    <SelectItem value="doberman">Doberman</SelectItem>
                    <SelectItem value="cavapoo">Cavapoo</SelectItem>
                    <SelectItem value="goldendoodle">GoldenDoodle</SelectItem>
                    <SelectItem value="chihuahua">Chihuahua</SelectItem>
                    <SelectItem value="dachshund">Dachshund</SelectItem>
                    <SelectItem value="not-sure">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-amber-900 mb-2">Message *</label>
              <Textarea 
                required
                value={formData.message}
                onChange={(e) => handleFormChange('message', e.target.value)}
                className="border-amber-200 focus:border-teal-500 min-h-32"
                placeholder="Tell us about your family, living situation, and what you're looking for in a puppy..."
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button 
                type="button"
                variant="outline"
                onClick={() => setShowContactForm(false)}
                className="flex-1"
                disabled={formLoading}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={formLoading}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
              >
                {formLoading ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default PuppyDetails;
