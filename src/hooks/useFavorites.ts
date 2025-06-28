
import { useState, useEffect } from 'react';
import { FavoritesService, Favorite } from '@/services/favoritesService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchFavorites = async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await FavoritesService.getUserFavorites(user.id);
      setFavorites(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch favorites';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (puppyId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to add favorites",
        variant: "destructive",
      });
      return;
    }

    try {
      await FavoritesService.addToFavorites(user.id, puppyId);
      await fetchFavorites(); // Refresh the list
      toast({
        title: "Success",
        description: "Added to favorites!",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add to favorites';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const removeFromFavorites = async (puppyId: string) => {
    if (!user) return;

    try {
      await FavoritesService.removeFromFavorites(user.id, puppyId);
      await fetchFavorites(); // Refresh the list
      toast({
        title: "Success",
        description: "Removed from favorites!",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove from favorites';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const isFavorite = async (puppyId: string): Promise<boolean> => {
    if (!user) return false;
    return await FavoritesService.isFavorite(user.id, puppyId);
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    fetchFavorites,
  };
};
