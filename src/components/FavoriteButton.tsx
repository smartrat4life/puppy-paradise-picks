
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
          const favoriteStatus = await isFavorite(puppyId);
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
    
    // Check if user is authenticated
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (loading) {
      return;
    }

    setLoading(true);
    try {
      if (isFavorited) {
        await removeFromFavorites(puppyId);
        setIsFavorited(false);
      } else {
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
        className={`p-2 hover:bg-white/20 ${className}`}
        title={user ? (isFavorited ? 'Remove from favorites' : 'Add to favorites') : 'Sign in to add favorites'}
      >
        <Heart 
          className={`w-5 h-5 transition-colors ${
            isFavorited 
              ? 'fill-red-500 text-red-500' 
              : 'text-white hover:text-red-300'
          }`}
        />
      </Button>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        defaultTab="signin"
      />
    </>
  );
};

export default FavoriteButton;
