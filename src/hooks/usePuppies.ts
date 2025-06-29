
import { useState, useEffect, useCallback } from 'react';
import { PuppyService, Puppy } from '@/services/puppyService';
import { useToast } from '@/hooks/use-toast';

type ConnectionStatus = 'idle' | 'loading' | 'connected' | 'error';

export const usePuppies = () => {
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('idle');
  const { toast } = useToast();

  const showErrorToast = useCallback((title: string, message: string) => {
    toast({
      title,
      description: message,
      variant: 'destructive',
      duration: 10000,
    });
  }, [toast]);

  const fetchPuppies = useCallback(async () => {
    console.log('Starting to fetch puppies...');
    setLoading(true);
    setError(null);
    setConnectionStatus('loading');
    
    try {
      console.log('Fetching puppies directly from PuppyService...');
      const data = await PuppyService.getAllPuppies();
      
      if (!data) {
        throw new Error('No data returned from server');
      }
      
      console.log(`Successfully fetched ${data.length} puppies`);
      setPuppies(data);
      setConnectionStatus('connected');
    } catch (err) {
      console.error('Error in fetchPuppies:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch puppies';
      setError(errorMessage);
      setPuppies([]);
      setConnectionStatus('error');
      
      showErrorToast('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [showErrorToast]);

  const createPuppy = useCallback(async (puppyData: Parameters<typeof PuppyService.createPuppy>[0]) => {
    try {
      const newPuppy = await PuppyService.createPuppy(puppyData);
      setPuppies(prev => [newPuppy, ...prev]);
      
      toast({
        title: "Success!",
        description: "Puppy added successfully.",
        variant: "default",
      });
      
      return newPuppy;
    } catch (err) {
      console.error('Error creating puppy:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create puppy';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw err;
    }
  }, [toast]);

  const updatePuppy = useCallback(async (id: string, updates: Parameters<typeof PuppyService.updatePuppy>[1]) => {
    try {
      const updatedPuppy = await PuppyService.updatePuppy(id, updates);
      setPuppies(prev => prev.map(puppy => 
        puppy.id === id ? { ...puppy, ...updatedPuppy } : puppy
      ));
      
      toast({
        title: "Success!",
        description: "Puppy updated successfully.",
        variant: "default",
      });
      
      return updatedPuppy;
    } catch (err) {
      console.error('Error updating puppy:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update puppy';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw err;
    }
  }, [toast]);

  const deletePuppy = useCallback(async (id: string) => {
    try {
      await PuppyService.deletePuppy(id);
      setPuppies(prev => prev.filter(puppy => puppy.id !== id));
      
      toast({
        title: "Success!",
        description: "Puppy removed successfully.",
        variant: "default",
      });
      
      return true;
    } catch (err) {
      console.error('Error deleting puppy:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete puppy';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw err;
    }
  }, [toast]);

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    try {
      return await PuppyService.uploadImage(file);
    } catch (err) {
      console.error('Error uploading image:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw err;
    }
  }, [toast]);

  // Initial data fetch
  useEffect(() => {
    fetchPuppies();
  }, [fetchPuppies]);

  return {
    puppies,
    loading,
    error,
    connectionStatus,
    fetchPuppies,
    createPuppy,
    updatePuppy,
    deletePuppy,
    uploadImage,
  };
};
