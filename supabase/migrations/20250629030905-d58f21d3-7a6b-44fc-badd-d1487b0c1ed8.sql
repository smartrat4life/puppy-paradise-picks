
-- First, let's enable RLS if it's not already enabled (this won't fail if already enabled)
ALTER TABLE public.puppies ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to view available puppies (public read access)
-- Using IF NOT EXISTS to avoid conflicts
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'puppies' 
        AND policyname = 'Anyone can view puppies'
    ) THEN
        CREATE POLICY "Anyone can view puppies" 
          ON public.puppies 
          FOR SELECT 
          TO public
          USING (true);
    END IF;
END $$;

-- Create policy to allow admins to update puppies (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'puppies' 
        AND policyname = 'Admins can update puppies'
    ) THEN
        CREATE POLICY "Admins can update puppies" 
          ON public.puppies 
          FOR UPDATE 
          TO authenticated
          USING (
            EXISTS (
              SELECT 1 FROM public.profiles 
              WHERE id = auth.uid() AND is_admin = true
            )
          );
    END IF;
END $$;

-- Create policy to allow admins to delete puppies (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'puppies' 
        AND policyname = 'Admins can delete puppies'
    ) THEN
        CREATE POLICY "Admins can delete puppies" 
          ON public.puppies 
          FOR DELETE 
          TO authenticated
          USING (
            EXISTS (
              SELECT 1 FROM public.profiles 
              WHERE id = auth.uid() AND is_admin = true
            )
          );
    END IF;
END $$;
