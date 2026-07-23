
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, MapPin, PawPrint } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Favorites: React.FC = () => {
  const { user } = useAuth();
  const { favorites, loading, removeFromFavorites } = useFavorites();

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh] bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
            <p className="text-gray-600">Please log in to view your favorites.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-xl">Loading your favorites...</div>
        </div>
        <Footer />
      </div>
    );
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApply = (puppyId: string) => {
    window.location.href = `/adoption-application?puppyId=${puppyId}`;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
              Your Favorite Puppies
            </h1>
            <p className="text-xl text-amber-700">
              Keep track of the puppies you're interested in
            </p>
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No favorites yet</h3>
              <p className="text-gray-500 mb-6">Start browsing our available puppies to add some favorites!</p>
              <Button 
                onClick={() => window.location.href = '/#available-puppies'}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                Browse Puppies
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((favorite) => {
                const puppy = favorite.puppies;
                if (!puppy) return null;
                
                return (
                  <Card key={favorite.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gradient-to-br from-white to-amber-50 border-2 border-amber-200 hover:border-teal-300">
                    <div className="relative overflow-hidden">
                      <img 
                        src={puppy.image_url || 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80'} 
                        alt={puppy.name}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className={puppy.status === 'available' ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                          {puppy.status === 'available' ? 'Available' : 'Reserved'}
                        </Badge>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-white/90 text-amber-800">
                          ${puppy.price}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-2xl font-bold text-amber-900 group-hover:text-teal-700 transition-colors duration-300">
                          {puppy.name}
                        </h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromFavorites(puppy.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Heart className="w-5 h-5 fill-current" />
                        </Button>
                      </div>
                      
                      <p className="text-lg font-semibold text-teal-600 mb-2">{puppy.breed}</p>
                      
                      <div className="flex items-center gap-4 mb-3 text-sm text-amber-700">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(puppy.birth_date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {puppy.gender}
                        </div>
                      </div>
                      
                      <p className="text-amber-700 mb-4 leading-relaxed text-sm">
                        {puppy.description}
                      </p>
                      
                      <div className="flex gap-2">
                        <Button 
                          className={`flex-1 ${puppy.status === 'available' 
                            ? 'bg-teal-600 hover:bg-teal-700' 
                            : 'bg-gray-400 cursor-not-allowed'} 
                            text-white transition-all duration-300`}
                          onClick={puppy.status === 'available' ? scrollToContact : undefined}
                          disabled={puppy.status !== 'available'}
                        >
                          {puppy.status === 'available' ? 'Inquire' : 'Reserved'}
                        </Button>
                        <Button 
                          className={`flex-1 ${puppy.status === 'available' 
                            ? 'bg-amber-600 hover:bg-amber-700' 
                            : 'bg-gray-400 cursor-not-allowed'} 
                            text-white transition-all duration-300`}
                          onClick={() => puppy.status === 'available' && handleApply(puppy.id)}
                          disabled={puppy.status !== 'available'}
                        >
                          <PawPrint className="w-4 h-4 mr-2" />
                          {puppy.status === 'available' ? 'Apply' : 'Reserved'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Favorites;
