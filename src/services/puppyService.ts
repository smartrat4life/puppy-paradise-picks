
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export type Puppy = Database['public']['Tables']['puppies']['Row'];
export type PuppyInsert = Database['public']['Tables']['puppies']['Insert'];
export type PuppyUpdate = Database['public']['Tables']['puppies']['Update'];

export class PuppyService {
  static async getAllPuppies(): Promise<Puppy[]> {
    console.log('PuppyService.getAllPuppies called');
    
    const { data, error } = await supabase
      .from('puppies')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('Supabase response:', { data, error });

    if (error) {
      console.error('Error fetching puppies:', error);
      throw new Error('Failed to fetch puppies');
    }

    console.log('Returning puppies data:', data);
    return data || [];
  }

  static async createPuppy(puppy: PuppyInsert): Promise<Puppy> {
    const { data, error } = await supabase
      .from('puppies')
      .insert([puppy])
      .select()
      .single();

    if (error) {
      console.error('Error creating puppy:', error);
      throw new Error('Failed to create puppy');
    }

    return data;
  }

  static async updatePuppy(id: string, updates: PuppyUpdate): Promise<Puppy> {
    const { data, error } = await supabase
      .from('puppies')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating puppy:', error);
      throw new Error('Failed to update puppy');
    }

    return data;
  }

  static async deletePuppy(id: string): Promise<void> {
    const { error } = await supabase
      .from('puppies')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting puppy:', error);
      throw new Error('Failed to delete puppy');
    }
  }

  static async uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `puppies/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('puppy-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      throw new Error('Failed to upload image');
    }

    const { data: { publicUrl } } = supabase.storage
      .from('puppy-images')
      .getPublicUrl(filePath);

    return publicUrl;
  }

  static async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Extract file path from URL
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      const filePath = pathParts.slice(-2).join('/'); // Get 'puppies/filename.ext'

      const { error } = await supabase.storage
        .from('puppy-images')
        .remove([filePath]);

      if (error) {
        console.error('Error deleting image:', error);
        // Don't throw here as the puppy deletion should still proceed
      }
    } catch (error) {
      console.error('Error parsing image URL for deletion:', error);
    }
  }
}
