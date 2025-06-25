
-- Create admin user profile (this will be linked when you sign up)
-- We'll set the admin flag for your email address
UPDATE public.profiles 
SET is_admin = TRUE 
WHERE email = 'ratsmart92@gmail.com';

-- If the profile doesn't exist yet (user hasn't signed up), we'll create a function to auto-make this email admin
CREATE OR REPLACE FUNCTION public.auto_admin_setup()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the new user's email should be admin
  IF NEW.email = 'ratsmart92@gmail.com' THEN
    UPDATE public.profiles 
    SET is_admin = TRUE 
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically set admin status for your email
DROP TRIGGER IF EXISTS auto_admin_trigger ON public.profiles;
CREATE TRIGGER auto_admin_trigger
  AFTER INSERT ON public.profiles
  FOR EACH ROW 
  EXECUTE FUNCTION public.auto_admin_setup();
