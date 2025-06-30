import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let authSubscription: { unsubscribe: () => void } | null = null;
    
    // Set up auth state listener
    try {
      const subscription = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (!isMounted) return;
          
          console.log('Auth state changed:', event, session);
          
          try {
            setSession(session);
            setUser(session?.user ?? null);
            
            if (session?.user) {
              try {
                // Check if user is admin
                const { data: profile, error } = await supabase
                  .from('profiles')
                  .select('is_admin')
                  .eq('id', session.user.id)
                  .single();
                
                if (profile && !error) {
                  setIsAdmin(profile.is_admin || false);
                } else {
                  console.error('Error fetching profile:', error);
                  setIsAdmin(false);
                }
              } catch (error) {
                console.error('Error in profile check:', error);
                setIsAdmin(false);
              }
            } else {
              setIsAdmin(false);
            }
          } catch (error) {
            console.error('Error in auth state change handler:', error);
          } finally {
            if (isMounted) {
              setLoading(false);
            }
          }
        }
      );
      
      authSubscription = subscription.data.subscription;
    } catch (error) {
      console.error('Error setting up auth listener:', error);
      if (isMounted) {
        setLoading(false);
      }
    }

    // Initial session check
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (!isMounted) return;
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          throw sessionError;
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          try {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('is_admin')
              .eq('id', session.user.id)
              .single();
            
            if (profile && !profileError) {
              setIsAdmin(profile.is_admin || false);
            } else {
              console.error('Error fetching profile:', profileError);
              setIsAdmin(false);
            }
          } catch (error) {
            console.error('Error in profile check:', error);
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error in session check:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Only run the initial check if we don't have a session yet
    if (!session) {
      checkSession();
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { error };
  };

  const signOut = async () => {
    try {
      // First, clear the session from the server
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      if (error) throw error;
      
      // Clear all local state
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      
      // Clear any stored data in localStorage that might be related to auth
      // Get all keys from localStorage
      const keys = Object.keys(localStorage);
      // Remove all Supabase-related keys
      keys.forEach(key => {
        if (key.includes('sb-') || key.includes('supabase')) {
          localStorage.removeItem(key);
        }
      });
      
      // Clear session storage as well
      sessionStorage.clear();
      
      // Force a re-render of all components that use useAuth
      return Promise.resolve();
    } catch (error) {
      console.error('Error signing out:', error);
      return Promise.reject(error);
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
