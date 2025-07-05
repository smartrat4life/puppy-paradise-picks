
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthRedirectHandler = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      console.log('Auth callback triggered with search params:', Object.fromEntries(searchParams));
      
      try {
        // Handle the OAuth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/?error=auth_failed');
          return;
        }

        if (data.session) {
          console.log('Successfully authenticated:', data.session.user.email);
          // Successfully authenticated, redirect to success page
          const action = searchParams.get('action') || 'signin';
          navigate(`/auth-success?action=${action}`, { replace: true });
        } else {
          console.log('No session found, redirecting to home');
          // No session found, redirect to home
          navigate('/', { replace: true });
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        navigate('/?error=auth_failed', { replace: true });
      }
    };

    // Check if this is an auth callback (has code parameter)
    if (searchParams.has('code')) {
      console.log('OAuth code detected, handling auth callback');
      handleAuthCallback();
    } else {
      console.log('No OAuth code found, normal page load');
    }
  }, [navigate, searchParams]);

  return null; // This component doesn't render anything
};

export default AuthRedirectHandler;
