-- Add new columns to adoption_applications table for enhanced application form
ALTER TABLE public.adoption_applications 
ADD COLUMN IF NOT EXISTS primary_caregiver TEXT,
ADD COLUMN IF NOT EXISTS hours_alone TEXT,
ADD COLUMN IF NOT EXISTS puppy_location_when_away TEXT[],
ADD COLUMN IF NOT EXISTS puppy_sleep_location TEXT,
ADD COLUMN IF NOT EXISTS preferred_age TEXT,
ADD COLUMN IF NOT EXISTS daily_exercise_time TEXT,
ADD COLUMN IF NOT EXISTS desired_qualities TEXT[],
ADD COLUMN IF NOT EXISTS financial_responsibility TEXT,
ADD COLUMN IF NOT EXISTS unable_to_keep_plan TEXT,
ADD COLUMN IF NOT EXISTS veterinarian_status TEXT;

-- Add comments to document the new fields
COMMENT ON COLUMN public.adoption_applications.primary_caregiver IS 'Who will have primary responsibility for caring for the puppy';
COMMENT ON COLUMN public.adoption_applications.hours_alone IS 'How many hours each day will the puppy typically be left alone';
COMMENT ON COLUMN public.adoption_applications.puppy_location_when_away IS 'Where will the puppy stay when no one is home (array of options)';
COMMENT ON COLUMN public.adoption_applications.puppy_sleep_location IS 'Where will the puppy sleep at night';
COMMENT ON COLUMN public.adoption_applications.preferred_age IS 'What age range is the applicant looking for';
COMMENT ON COLUMN public.adoption_applications.daily_exercise_time IS 'How much time can be dedicated to exercise and companionship each day';
COMMENT ON COLUMN public.adoption_applications.desired_qualities IS 'What qualities are they looking for in their new companion (array of options)';
COMMENT ON COLUMN public.adoption_applications.financial_responsibility IS 'Confirmation of financial preparedness for dog ownership';
COMMENT ON COLUMN public.adoption_applications.unable_to_keep_plan IS 'Plan if unable to keep the dog in the future';
COMMENT ON COLUMN public.adoption_applications.veterinarian_status IS 'Whether they have a veterinarian or are still looking';
