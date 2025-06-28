
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/contexts/AuthContext';

interface FavoriteButtonProps {
  puppyId: string;
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ puppyId, className = "" }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { user } = useAuth();

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user) {
        const favoriteStatus = await isFavorite(puppyId);
        setIsFavorited(favoriteStatus);
      }
    };
    checkFavoriteStatus();
  }, [user, puppyId, isFavorite]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
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
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggleFavorite}
      disabled={loading}
      className={`p-2 hover:bg-white/20 ${className}`}
    >
      <Heart 
        className={`w-5 h-5 transition-colors ${
          isFavorited 
            ? 'fill-red-500 text-red-500' 
            : 'text-white hover:text-red-300'
        }`}
      />
    </Button>
  );
};

export default FavoriteButton;
