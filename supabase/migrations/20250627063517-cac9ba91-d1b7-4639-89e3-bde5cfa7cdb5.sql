
-- First, let's create a storage bucket for puppy images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'puppy-images',
  'puppy-images', 
  true,
  5242880,  -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Create storage policy to allow public access to puppy images
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'puppy-images');

CREATE POLICY "Allow authenticated users to upload puppy images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'puppy-images' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Allow users to update their own puppy images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'puppy-images' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Allow users to delete puppy images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'puppy-images' AND 
  auth.role() = 'authenticated'
);

-- Add a single image_url column to puppies table (since your current PuppyForm expects this)
-- We'll keep image_urls array for future multi-image support but add image_url for current compatibility
ALTER TABLE public.puppies ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Update RLS policies for puppies table to allow proper admin access
DROP POLICY IF EXISTS "Anyone can view published puppies" ON public.puppies;
DROP POLICY IF EXISTS "Admins can manage puppies" ON public.puppies;

-- Allow everyone to view puppies (for public website)
CREATE POLICY "Public can view all puppies" ON public.puppies
  FOR SELECT USING (true);

-- Allow admins to manage all puppies
CREATE POLICY "Admins can insert puppies" ON public.puppies
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can update puppies" ON public.puppies
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can delete puppies" ON public.puppies
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Update RLS policies for inquiries to allow admin access
DROP POLICY IF EXISTS "Users can create inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Users can view their own inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can view all inquiries" ON public.inquiries;

CREATE POLICY "Anyone can create inquiries" ON public.inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own inquiries" ON public.inquiries
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can manage inquiries" ON public.inquiries
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Update RLS policies for adoption applications to allow admin access
DROP POLICY IF EXISTS "Users can create applications" ON public.adoption_applications;
DROP POLICY IF EXISTS "Users can view their own applications" ON public.adoption_applications;
DROP POLICY IF EXISTS "Admins can manage applications" ON public.adoption_applications;

CREATE POLICY "Anyone can create applications" ON public.adoption_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own applications" ON public.adoption_applications
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can manage applications" ON public.adoption_applications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Create an auto-admin setup trigger for your email
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

-- Create trigger to automatically make your email admin
DROP TRIGGER IF EXISTS auto_admin_setup_trigger ON public.profiles;
CREATE TRIGGER auto_admin_setup_trigger
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.auto_admin_setup();
