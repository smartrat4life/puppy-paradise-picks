
import { useState, useEffect } from 'react';
import { PuppyService, Puppy } from '@/services/puppyService';
import { useToast } from '@/hooks/use-toast';

export const usePuppies = () => {
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPuppies = async () => {
    try {
      console.log('Starting to fetch puppies...');
      setLoading(true);
      setError(null);
      const data = await PuppyService.getAllPuppies();
      console.log('Fetched puppies data:', data);
      setPuppies(data);
    } catch (err) {
      console.error('Error fetching puppies:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch puppies';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  const createPuppy = async (puppyData: Parameters<typeof PuppyService.createPuppy>[0]) => {
    try {
      const newPuppy = await PuppyService.createPuppy(puppyData);
      setPuppies(prev => [newPuppy, ...prev]);
      toast({
        title: "Success",
        description: "Puppy added successfully!",
      });
      return newPuppy;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create puppy';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const updatePuppy = async (id: string, updates: Parameters<typeof PuppyService.updatePuppy>[1]) => {
    try {
      const updatedPuppy = await PuppyService.updatePuppy(id, updates);
      setPuppies(prev => prev.map(puppy => 
        puppy.id === id ? updatedPuppy : puppy
      ));
      toast({
        title: "Success",
        description: "Puppy updated successfully!",
      });
      return updatedPuppy;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update puppy';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const deletePuppy = async (id: string) => {
    try {
      // Find the puppy to get its image URL for cleanup
      const puppyToDelete = puppies.find(p => p.id === id);
      
      await PuppyService.deletePuppy(id);
      
      // Clean up image if it exists
      if (puppyToDelete?.image_url) {
        await PuppyService.deleteImage(puppyToDelete.image_url);
      }
      
      setPuppies(prev => prev.filter(puppy => puppy.id !== id));
      toast({
        title: "Success",
        description: "Puppy deleted successfully!",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete puppy';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      return await PuppyService.uploadImage(file);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    console.log('usePuppies useEffect triggered');
    fetchPuppies();
  }, []);

  return {
    puppies,
    loading,
    error,
    fetchPuppies,
    createPuppy,
    updatePuppy,
    deletePuppy,
    uploadImage,
  };
};
