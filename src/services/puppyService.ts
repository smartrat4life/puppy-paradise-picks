
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export type Puppy = Database['public']['Tables']['puppies']['Row'];
export type PuppyInsert = Database['public']['Tables']['puppies']['Insert'];
export type PuppyUpdate = Database['public']['Tables']['puppies']['Update'];

const handleSupabaseError = (operation: string, error: any) => {
  console.error(`Supabase error during ${operation}:`, {
    message: error.message,
    details: error.details,
    hint: error.hint,
    code: error.code,
    status: error.status
  });
  throw new Error(`Failed to ${operation}: ${error.message}`);
};

export class PuppyService {
  static async getAllPuppies(): Promise<Puppy[]> {
    console.log('PuppyService.getAllPuppies called');
    
    try {
      console.log('Creating Supabase query for puppies...');
      
      // Use a simple query without any auth context to ensure public access
      const { data, error } = await supabase
        .from('puppies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase query error:', error);
        handleSupabaseError('fetch puppies', error);
      }

      console.log(`Successfully fetched ${data?.length || 0} puppies`);
      return data || [];
    } catch (error) {
      console.error('Unexpected error in getAllPuppies:', error);
      throw error;
    }
  }

  static async getPuppyById(id: string): Promise<Puppy> {
    console.log(`PuppyService.getPuppyById called for id: ${id}`);
    
    try {
      const { data, error } = await supabase
        .from('puppies')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Supabase query error:', error);
        handleSupabaseError('fetch puppy', error);
      }

      console.log('Successfully fetched puppy:', data);
      return data!;
    } catch (error) {
      console.error('Unexpected error in getPuppyById:', error);
      throw error;
    }
  }

  static async createPuppy(puppy: PuppyInsert): Promise<Puppy> {
    console.log('Creating new puppy:', puppy);
    try {
      const { data, error } = await supabase
        .from('puppies')
        .insert([puppy])
        .select()
        .single();

      if (error) {
        handleSupabaseError('create puppy', error);
      }

      console.log('Successfully created puppy:', data);
      return data!;
    } catch (error) {
      console.error('Error in createPuppy:', error);
      throw error;
    }
  }

  static async updatePuppy(id: string, updates: PuppyUpdate): Promise<Puppy> {
    console.log(`Updating puppy ${id}:`, updates);
    try {
      const { data, error } = await supabase
        .from('puppies')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        handleSupabaseError('update puppy', error);
      }

      console.log('Successfully updated puppy:', data);
      return data!;
    } catch (error) {
      console.error(`Error updating puppy ${id}:`, error);
      throw error;
    }
  }

  static async deletePuppy(id: string): Promise<void> {
    console.log(`Deleting puppy ${id}`);
    try {
      const { error } = await supabase
        .from('puppies')
        .delete()
        .eq('id', id);

      if (error) {
        handleSupabaseError('delete puppy', error);
      }

      console.log(`Successfully deleted puppy ${id}`);
    } catch (error) {
      console.error(`Error deleting puppy ${id}:`, error);
      throw error;
    }
  }

  static async uploadImage(file: File): Promise<string> {
    console.log('Uploading image:', file.name);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `puppies/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('puppy-images')
        .upload(filePath, file);

      if (uploadError) {
        handleSupabaseError('upload image', uploadError);
      }

      const { data: { publicUrl } } = supabase.storage
        .from('puppy-images')
        .getPublicUrl(filePath);

      console.log('Successfully uploaded image:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  static async deleteImage(imageUrl: string): Promise<void> {
    console.log('Deleting image:', imageUrl);
    try {
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      const filePath = pathParts.slice(-2).join('/');

      const { error } = await supabase.storage
        .from('puppy-images')
        .remove([filePath]);

      if (error) {
        handleSupabaseError('delete image', error);
      }

      console.log('Successfully deleted image:', filePath);
    } catch (error) {
      console.error('Error deleting image:', error);
      // Don't throw here as it's a non-critical operation
    }
  }
}
