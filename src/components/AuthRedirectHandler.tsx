
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthRedirectHandler = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/?error=auth_failed');
          return;
        }

        if (data.session) {
          // Successfully authenticated, redirect to success page
          const action = searchParams.get('action') || 'signin';
          navigate(`/auth-success?action=${action}`, { replace: true });
        } else {
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
      handleAuthCallback();
    } else {
      // Not an auth callback, proceed normally
      const action = searchParams.get('action') || 'signin';
      // Page will render normally
    }
  }, [navigate, searchParams]);

  return null; // This component doesn't render anything
};

export default AuthRedirectHandler;
