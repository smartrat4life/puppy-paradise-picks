
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export type Favorite = Database['public']['Tables']['favorites']['Row'];
export type FavoriteInsert = Database['public']['Tables']['favorites']['Insert'];

export class FavoritesService {
  static async getUserFavorites(userId: string): Promise<Favorite[]> {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        *,
        puppies (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching favorites:', error);
      throw new Error('Failed to fetch favorites');
    }

    return data || [];
  }

  static async addToFavorites(userId: string, puppyId: string): Promise<Favorite> {
    const { data, error } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, puppy_id: puppyId }])
      .select()
      .single();

    if (error) {
      console.error('Error adding to favorites:', error);
      throw new Error('Failed to add to favorites');
    }

    return data;
  }

  static async removeFromFavorites(userId: string, puppyId: string): Promise<void> {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('puppy_id', puppyId);

    if (error) {
      console.error('Error removing from favorites:', error);
      throw new Error('Failed to remove from favorites');
    }
  }

  static async isFavorite(userId: string, puppyId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('puppy_id', puppyId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking favorite status:', error);
      return false;
    }

    return !!data;
  }
}
