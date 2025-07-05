
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
      console.log('Fetching favorites for user:', user.id);
      const data = await FavoritesService.getUserFavorites(user.id);
      console.log('Fetched favorites:', data);
      setFavorites(data);
    } catch (err) {
      console.error('Error in fetchFavorites:', err);
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
        description: "Please sign in to add favorites",
        variant: "destructive",
      });
      throw new Error('User not authenticated');
    }

    try {
      console.log('Adding to favorites:', { userId: user.id, puppyId });
      await FavoritesService.addToFavorites(user.id, puppyId);
      await fetchFavorites(); // Refresh the list
      toast({
        title: "Success",
        description: "Added to favorites!",
      });
    } catch (err) {
      console.error('Error in addToFavorites:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to add to favorites';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const removeFromFavorites = async (puppyId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required", 
        description: "Please sign in to manage favorites",
        variant: "destructive",
      });
      throw new Error('User not authenticated');
    }

    try {
      console.log('Removing from favorites:', { userId: user.id, puppyId });
      await FavoritesService.removeFromFavorites(user.id, puppyId);
      await fetchFavorites(); // Refresh the list
      toast({
        title: "Success",
        description: "Removed from favorites!",
      });
    } catch (err) {
      console.error('Error in removeFromFavorites:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove from favorites';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const isFavorite = async (puppyId: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const result = await FavoritesService.isFavorite(user.id, puppyId);
      console.log('isFavorite check:', { puppyId, result });
      return result;
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
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
