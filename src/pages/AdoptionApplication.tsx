import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PawPrint, Home, Heart, CheckCircle2, User, Clock, MapPin, Moon, Target, Activity, DollarSign, Stethoscope } from 'lucide-react';
import { PuppyService } from '@/services/puppyService';

const AdoptionApplication: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const puppyId = searchParams.get('puppyId');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    applicant_name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || '',
    applicant_email: user?.email || '',
    applicant_phone: '',
    puppy_id: puppyId || '',
    living_situation: '',
    experience_with_pets: '',
    reason_for_adoption: '',
    has_yard: false,
    has_other_pets: false,
    has_children: false,
    children_ages: '',
    primary_caregiver: '',
    hours_alone: '',
    puppy_location_when_away: [] as string[],
    puppy_sleep_location: '',
    preferred_age: '',
    daily_exercise_time: '',
    desired_qualities: [] as string[],
    financial_responsibility: '',
    unable_to_keep_plan: '',
    veterinarian_status: '',
    agree_to_terms: false,
  });

  const [selectedPuppy, setSelectedPuppy] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingPuppy, setIsFetchingPuppy] = useState(false);

  React.useEffect(() => {
    const fetchPuppy = async () => {
      if (puppyId) {
        setIsFetchingPuppy(true);
        try {
          const puppy = await PuppyService.getPuppyById(puppyId);
          setSelectedPuppy(puppy);
        } catch (error) {
          console.error('Error fetching puppy:', error);
          toast({
            title: 'Error',
            description: 'Failed to load puppy information',
            variant: 'destructive',
          });
        } finally {
          setIsFetchingPuppy(false);
        }
      }
    };

    fetchPuppy();
  }, [puppyId, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleMultiCheckboxChange = (name: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[name as keyof typeof prev] as string[];
      if (checked) {
        return {
          ...prev,
          [name]: [...currentArray, value],
        };
      } else {
        return {
          ...prev,
          [name]: currentArray.filter(item => item !== value),
        };
      }
    });
  };

  // Calculate progress
  const calculateProgress = () => {
    const requiredFields = [
      'applicant_name',
      'applicant_email',
      'living_situation',
      'experience_with_pets',
      'reason_for_adoption',
      'primary_caregiver',
      'hours_alone',
      'puppy_sleep_location',
      'preferred_age',
      'daily_exercise_time',
      'financial_responsibility',
      'unable_to_keep_plan',
      'veterinarian_status',
    ];

    const optionalFields = [
      'applicant_phone',
      'children_ages',
      'puppy_location_when_away',
      'desired_qualities',
    ];

    let filledRequired = 0;
    let filledOptional = 0;

    requiredFields.forEach(field => {
      const value = formData[field as keyof typeof formData];
      if (typeof value === 'string' && value.trim()) {
        filledRequired++;
      } else if (Array.isArray(value) && value.length > 0) {
        filledRequired++;
      }
    });

    optionalFields.forEach(field => {
      const value = formData[field as keyof typeof formData];
      if (typeof value === 'string' && value.trim()) {
        filledOptional++;
      } else if (Array.isArray(value) && value.length > 0) {
        filledOptional++;
      }
    });

    const totalFields = requiredFields.length + optionalFields.length;
    const filledFields = filledRequired + filledOptional;
    return Math.round((filledFields / totalFields) * 100);
  };

  const progress = calculateProgress();

  const validateForm = () => {
    if (!formData.applicant_name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please provide your full name',
        variant: 'destructive',
      });
      return false;
    }

    if (!formData.applicant_email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.applicant_email)) {
      toast({
        title: 'Validation Error',
        description: 'Please provide a valid email address',
        variant: 'destructive',
      });
      return false;
    }

    if (!formData.living_situation.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please describe your living situation',
        variant: 'destructive',
      });
      return false;
    }

    if (!formData.experience_with_pets.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please describe your experience with pets',
        variant: 'destructive',
      });
      return false;
    }

    if (!formData.reason_for_adoption.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please explain why you want to adopt',
        variant: 'destructive',
      });
      return false;
    }

    if (!formData.primary_caregiver.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please specify who will have primary responsibility for caring for the puppy',
        variant: 'destructive',
      });
      return false;
    }

    if (!formData.hours_alone) {
      toast({
        title: 'Validation Error',
        description: 'Please specify how many hours the puppy will be left alone',
        variant: 'destructive',
      });
      return false;
    }

    if (!formData.puppy_sleep_location) {
      toast({
        title: 'Validation Error',
        description: 'Please specify where the puppy will sleep at night',
        variant: 'destructive',
      });
      return false;
    }

    if (!formData.preferred_age) {
      toast({
        title: 'Validation Error',
        description: 'Please specify your preferred age range',
        variant: 'destructive',
      });
      return false;
    }

    if (!formData.daily_exercise_time) {
      toast({
        title: 'Validation Error',
        description: 'Please specify how much time you can dedicate to exercise',
        variant: 'destructive',
      });
      return false;
    }

    if (!formData.financial_responsibility) {
      toast({
        title: 'Validation Error',
        description: 'Please confirm your financial preparedness',
        variant: 'destructive',
      });
      return false;
    }

    if (!formData.unable_to_keep_plan.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please explain what you would do if unable to keep the dog',
        variant: 'destructive',
      });
      return false;
    }

    if (!formData.veterinarian_status) {
      toast({
        title: 'Validation Error',
        description: 'Please specify your veterinarian status',
        variant: 'destructive',
      });
      return false;
    }

    if (!formData.agree_to_terms) {
      toast({
        title: 'Validation Error',
        description: 'Please agree to the terms and conditions',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const { supabase } = await import('@/integrations/supabase/client');

      const applicationData = {
        applicant_name: formData.applicant_name.trim(),
        applicant_email: formData.applicant_email.trim(),
        applicant_phone: formData.applicant_phone.trim() || null,
        puppy_id: formData.puppy_id || null,
        living_situation: formData.living_situation.trim(),
        experience_with_pets: formData.experience_with_pets.trim(),
        reason_for_adoption: formData.reason_for_adoption.trim(),
        primary_caregiver: formData.primary_caregiver.trim(),
        hours_alone: formData.hours_alone,
        puppy_location_when_away: formData.puppy_location_when_away,
        puppy_sleep_location: formData.puppy_sleep_location,
        preferred_age: formData.preferred_age,
        daily_exercise_time: formData.daily_exercise_time,
        desired_qualities: formData.desired_qualities,
        financial_responsibility: formData.financial_responsibility,
        unable_to_keep_plan: formData.unable_to_keep_plan.trim(),
        veterinarian_status: formData.veterinarian_status,
        status: 'pending',
        user_id: user?.id || null,
      };

      const { data, error } = await supabase
        .from('adoption_applications')
        .insert(applicationData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Application Submitted!',
        description: 'Your adoption application has been submitted successfully. We will contact you soon.',
      });

      navigate('/favorites');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit application',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Header />
      
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <div className="bg-teal-100 p-4 rounded-full">
                  <PawPrint className="w-12 h-12 text-teal-600" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
                Adoption Application
              </h1>
              <p className="text-xl text-amber-700">
                Take the first step toward finding your perfect companion
              </p>
            </div>

            {/* Selected Puppy Info */}
            {selectedPuppy && (
              <Card className="mb-8 border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-amber-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedPuppy.image_url || 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&q=80'}
                      alt={selectedPuppy.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-amber-900">{selectedPuppy.name}</h3>
                      <p className="text-teal-600 font-semibold">{selectedPuppy.breed}</p>
                      <p className="text-amber-700 text-sm">
                        {selectedPuppy.gender} • {new Date(selectedPuppy.birth_date).toLocaleDateString()}
                      </p>
                    </div>
                    <CheckCircle2 className="w-8 h-8 text-green-500 ml-auto" />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Application Form */}
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-amber-100 to-teal-100">
                <CardTitle className="text-2xl text-amber-900">Your Information</CardTitle>
                <CardDescription className="text-amber-700">
                  Please fill out all required fields to complete your application
                </CardDescription>
              </CardHeader>
              
              {/* Progress Bar */}
              <div className="sticky top-0 z-10 bg-white border-b px-8 py-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-amber-900">Application Progress</span>
                  <span className="text-sm font-bold text-teal-600">{progress}%</span>
                </div>
                <Progress value={progress} className="h-3" />
                <p className="text-xs text-amber-600 mt-2">
                  {progress < 100 ? 'Keep going! You\'re making great progress.' : 'Excellent! Your application is complete.'}
                </p>
              </div>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-teal-600" />
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="applicant_name">Full Name *</Label>
                        <Input
                          id="applicant_name"
                          name="applicant_name"
                          value={formData.applicant_name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="applicant_email">Email Address *</Label>
                        <Input
                          id="applicant_email"
                          name="applicant_email"
                          type="email"
                          value={formData.applicant_email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="applicant_phone">Phone Number</Label>
                        <Input
                          id="applicant_phone"
                          name="applicant_phone"
                          type="tel"
                          value={formData.applicant_phone}
                          onChange={handleChange}
                          placeholder="(555) 123-4567"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Living Situation */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2">
                      <Home className="w-5 h-5 text-teal-600" />
                      Living Situation
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="living_situation">Describe your living situation *</Label>
                      <Textarea
                        id="living_situation"
                        name="living_situation"
                        value={formData.living_situation}
                        onChange={handleChange}
                        placeholder="e.g., I live in a house with a fenced yard in a quiet neighborhood..."
                        rows={3}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="has_yard"
                          checked={formData.has_yard}
                          onCheckedChange={(checked) => handleCheckboxChange('has_yard', checked as boolean)}
                          disabled={isLoading}
                        />
                        <Label htmlFor="has_yard" className="cursor-pointer">I have a yard</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="has_other_pets"
                          checked={formData.has_other_pets}
                          onCheckedChange={(checked) => handleCheckboxChange('has_other_pets', checked as boolean)}
                          disabled={isLoading}
                        />
                        <Label htmlFor="has_other_pets" className="cursor-pointer">I have other pets</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="has_children"
                          checked={formData.has_children}
                          onCheckedChange={(checked) => handleCheckboxChange('has_children', checked as boolean)}
                          disabled={isLoading}
                        />
                        <Label htmlFor="has_children" className="cursor-pointer">I have children</Label>
                      </div>
                    </div>

                    {formData.has_children && (
                      <div className="space-y-2">
                        <Label htmlFor="children_ages">Children's ages</Label>
                        <Input
                          id="children_ages"
                          name="children_ages"
                          value={formData.children_ages}
                          onChange={handleChange}
                          placeholder="e.g., 5, 8, 12"
                          disabled={isLoading}
                        />
                      </div>
                    )}
                  </div>

                  {/* Pet Experience */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2">
                      <PawPrint className="w-5 h-5 text-teal-600" />
                      Pet Experience
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="experience_with_pets">Describe your experience with pets *</Label>
                      <Textarea
                        id="experience_with_pets"
                        name="experience_with_pets"
                        value={formData.experience_with_pets}
                        onChange={handleChange}
                        placeholder="e.g., I have owned dogs for 10 years and am familiar with training and care..."
                        rows={3}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Reason for Adoption */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-teal-600" />
                      Why do you want to adopt?
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="reason_for_adoption">Reason for adoption *</Label>
                      <Textarea
                        id="reason_for_adoption"
                        name="reason_for_adoption"
                        value={formData.reason_for_adoption}
                        onChange={handleChange}
                        placeholder="e.g., I'm looking for a companion for my family and have fallen in love with this breed..."
                        rows={3}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Primary Caregiver */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-teal-600" />
                      Primary Caregiver
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="primary_caregiver">Who will have primary responsibility for caring for the puppy? *</Label>
                      <Input
                        id="primary_caregiver"
                        name="primary_caregiver"
                        value={formData.primary_caregiver}
                        onChange={handleChange}
                        placeholder="e.g., Myself, My spouse and I, etc."
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Time Alone */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-teal-600" />
                      Time Alone
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="hours_alone">How many hours each day will the puppy typically be left alone? *</Label>
                      <Select
                        value={formData.hours_alone}
                        onValueChange={(value) => handleSelectChange('hours_alone', value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select hours" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="less_than_2">Less than 2 hours</SelectItem>
                          <SelectItem value="2_to_4">2 to 4 hours</SelectItem>
                          <SelectItem value="4_to_8">4 to 8 hours</SelectItem>
                          <SelectItem value="more_than_8">More than 8 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Where will the puppy stay when no one is home?</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Indoors', 'Crate', 'Playpen', 'Fenced yard', 'Other'].map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`location_${option.toLowerCase()}`}
                              checked={formData.puppy_location_when_away.includes(option)}
                              onCheckedChange={(checked) => handleMultiCheckboxChange('puppy_location_when_away', option, checked as boolean)}
                              disabled={isLoading}
                            />
                            <Label htmlFor={`location_${option.toLowerCase()}`} className="cursor-pointer text-sm">{option}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sleeping Arrangements */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2">
                      <Moon className="w-5 h-5 text-teal-600" />
                      Sleeping Arrangements
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="puppy_sleep_location">Where will the puppy sleep at night? *</Label>
                      <Select
                        value={formData.puppy_sleep_location}
                        onValueChange={(value) => handleSelectChange('puppy_sleep_location', value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select sleeping location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bedroom">In my bedroom</SelectItem>
                          <SelectItem value="crate">In a crate in my bedroom</SelectItem>
                          <SelectItem value="another_room">In another room</SelectItem>
                          <SelectItem value="kitchen">In the kitchen</SelectItem>
                          <SelectItem value="living_room">In the living room</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Age Preference */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2">
                      <Target className="w-5 h-5 text-teal-600" />
                      Age Preference
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="preferred_age">What age range are you looking for? *</Label>
                      <Select
                        value={formData.preferred_age}
                        onValueChange={(value) => handleSelectChange('preferred_age', value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select age preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="puppy">Puppy (up to 1 year)</SelectItem>
                          <SelectItem value="young">Young dog (1-3 years)</SelectItem>
                          <SelectItem value="adult">Adult (3-8 years)</SelectItem>
                          <SelectItem value="senior">Senior (8+ years)</SelectItem>
                          <SelectItem value="no_preference">No preference</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Exercise & Companionship */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-teal-600" />
                      Exercise & Companionship
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="daily_exercise_time">How much time can you dedicate to exercise and companionship each day? *</Label>
                      <Select
                        value={formData.daily_exercise_time}
                        onValueChange={(value) => handleSelectChange('daily_exercise_time', value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time commitment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="less_than_1">Less than 1 hour</SelectItem>
                          <SelectItem value="1_to_2">1-2 hours</SelectItem>
                          <SelectItem value="2_to_4">2-4 hours</SelectItem>
                          <SelectItem value="more_than_4">More than 4 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>What qualities are you looking for in your new companion?</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Friendly', 'Family companion', 'Active', 'Calm', 'Good with children', 'Good with other pets', 'Protection', 'Other'].map((quality) => (
                          <div key={quality} className="flex items-center space-x-2">
                            <Checkbox
                              id={`quality_${quality.toLowerCase().replace(' ', '_')}`}
                              checked={formData.desired_qualities.includes(quality)}
                              onCheckedChange={(checked) => handleMultiCheckboxChange('desired_qualities', quality, checked as boolean)}
                              disabled={isLoading}
                            />
                            <Label htmlFor={`quality_${quality.toLowerCase().replace(' ', '_')}`} className="cursor-pointer text-sm">{quality}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Financial Responsibility */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-teal-600" />
                      Financial Responsibility
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="financial_responsibility">Are you prepared for the financial responsibilities of dog ownership, including food, routine veterinary care, and emergencies? *</Label>
                      <Select
                        value={formData.financial_responsibility}
                        onValueChange={(value) => handleSelectChange('financial_responsibility', value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your answer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Long-term Planning */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-teal-600" />
                      Long-term Planning
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="unable_to_keep_plan">If you are unable to keep your dog in the future, what would you do? *</Label>
                      <Textarea
                        id="unable_to_keep_plan"
                        name="unable_to_keep_plan"
                        value={formData.unable_to_keep_plan}
                        onChange={handleChange}
                        placeholder="e.g., I would return the dog to the breeder, find a suitable home with family/friends, etc."
                        rows={2}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Veterinarian */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-teal-600" />
                      Veterinary Care
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="veterinarian_status">Do you have a veterinarian, or have you identified one you plan to use? *</Label>
                      <Select
                        value={formData.veterinarian_status}
                        onValueChange={(value) => handleSelectChange('veterinarian_status', value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your answer" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes, I have a veterinarian</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="still_looking">Still looking</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="pt-4 border-t">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agree_to_terms"
                        checked={formData.agree_to_terms}
                        onCheckedChange={(checked) => handleCheckboxChange('agree_to_terms', checked as boolean)}
                        disabled={isLoading}
                      />
                      <Label htmlFor="agree_to_terms" className="cursor-pointer text-sm">
                        I agree to the terms and conditions and understand that submitting this application does not guarantee adoption. I certify that all information provided is accurate and complete.
                      </Label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate(-1)}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <div className="mt-8 text-center text-sm text-amber-700">
              <p className="mb-2">
                <strong>What happens next?</strong>
              </p>
              <p>
                Our team will review your application and contact you within 2-3 business days to discuss the next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdoptionApplication;
