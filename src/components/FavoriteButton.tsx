
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

interface FavoriteButtonProps {
  puppyId: string;
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ puppyId, className = "" }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { user } = useAuth();

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user) {
        try {
          console.log('Checking favorite status for puppy:', puppyId, 'user:', user.id);
          const favoriteStatus = await isFavorite(puppyId);
          console.log('Favorite status result:', favoriteStatus);
          setIsFavorited(favoriteStatus);
        } catch (error) {
          console.error('Error checking favorite status:', error);
          setIsFavorited(false);
        }
      } else {
        setIsFavorited(false);
      }
    };
    checkFavoriteStatus();
  }, [user, puppyId, isFavorite]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Favorite button clicked - User:', user ? 'authenticated' : 'not authenticated');
    
    // Check if user is authenticated
    if (!user) {
      console.log('User not authenticated, showing auth modal');
      setShowAuthModal(true);
      return;
    }

    if (loading) {
      console.log('Already loading, ignoring click');
      return;
    }

    setLoading(true);
    try {
      if (isFavorited) {
        console.log('Removing from favorites');
        await removeFromFavorites(puppyId);
        setIsFavorited(false);
      } else {
        console.log('Adding to favorites');
        await addToFavorites(puppyId);
        setIsFavorited(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggleFavorite}
        disabled={loading}
        className={`relative z-10 p-2 hover:bg-white/20 border-2 border-white/30 backdrop-blur-sm pointer-events-auto ${className}`}
        title={user ? (isFavorited ? 'Remove from favorites' : 'Add to favorites') : 'Sign in to add favorites'}
        style={{ pointerEvents: 'auto' }}
      >
        <Heart 
          className={`w-6 h-6 transition-all duration-200 ${
            isFavorited 
              ? 'fill-red-500 text-red-500 scale-110' 
              : 'text-white fill-none hover:text-red-300 hover:scale-105'
          }`}
          strokeWidth={2}
        />
      </Button>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default FavoriteButton;
