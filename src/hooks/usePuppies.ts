import { useState, useEffect, useCallback } from 'react';
import { PuppyService, Puppy } from '@/services/puppyService';
import { useToast } from '@/hooks/use-toast';
import { testSupabaseConnection, testBasicConnectivity } from '@/integrations/supabase/client';

type ConnectionStatus = 'idle' | 'checking' | 'connected' | 'disconnected' | 'error' | 'cors_error';

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
      duration: 10000, // Show for 10 seconds
    });
  }, [toast]);

  const testConnection = useCallback(async (): Promise<boolean> => {
    console.log('Starting connection test...');
    setConnectionStatus('checking');
    
    try {
      // First test basic connectivity
      console.log('Testing basic connectivity...');
      await testBasicConnectivity();
      
      // Then test the full connection
      const result = await testSupabaseConnection();
      
      if (result.success) {
        console.log('Connection test successful');
        setConnectionStatus('connected');
        return true;
      } else {
        console.warn('Connection test failed:', result.error);
        
        // Handle CORS errors specifically
        if (result.message.includes('CORS') || result.error?.includes('CORS')) {
          setConnectionStatus('cors_error');
          showErrorToast(
            'CORS Error', 
            'Please check your Supabase CORS settings. Make sure to add your local development URL (http://localhost:8083) to the CORS settings in your Supabase dashboard.'
          );
        } else {
          setConnectionStatus('error');
          showErrorToast('Connection Error', result.message);
        }
        
        return false;
      }
    } catch (err) {
      console.error('Connection test threw an error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      
      if (errorMessage.includes('CORS') || errorMessage.includes('blocked by CORS policy')) {
        setConnectionStatus('cors_error');
        showErrorToast(
          'CORS Error', 
          'Please check your Supabase CORS settings. Make sure to add your local development URL (http://localhost:8083) to the CORS settings in your Supabase dashboard.'
        );
      } else {
        setConnectionStatus('error');
        showErrorToast('Connection Error', errorMessage);
      }
      
      return false;
    }
  }, [showErrorToast]);

  const fetchPuppies = useCallback(async () => {
    console.log('Starting to fetch puppies...');
    setLoading(true);
    setError(null);
    
    try {
      // First test the connection
      const isConnected = await testConnection();
      if (!isConnected) {
        console.warn('Skipping puppy fetch due to connection issues');
        setPuppies([]);
        return;
      }
      
      console.log('Connection verified, fetching puppies...');
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
      
      if (errorMessage.includes('CORS') || errorMessage.includes('blocked by CORS policy')) {
        setConnectionStatus('cors_error');
        showErrorToast(
          'CORS Error', 
          'Please check your Supabase CORS settings. Make sure to add your local development URL (http://localhost:8083) to the CORS settings in your Supabase dashboard.'
        );
      } else {
        setConnectionStatus('error');
        showErrorToast('Error', errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [testConnection, showErrorToast]);

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
      // Find the puppy to get its image URL for cleanup
      const puppyToDelete = puppies.find(p => p.id === id);
      
      // Delete the puppy
      await PuppyService.deletePuppy(id);
      
      // Update the local state
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
  }, [puppies, toast]);

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
    testConnection,
  };
};
