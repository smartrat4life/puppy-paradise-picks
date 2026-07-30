
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestedBreed: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Insert inquiry into database
      const { error } = await supabase
        .from('inquiries')
        .insert([
          {
            user_id: user?.id || null,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: `Interested in: ${formData.interestedBreed}\n\n${formData.message}`,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Thank you for your inquiry!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        interestedBreed: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Ready to welcome a new furry family member? Have questions about our puppies? 
            We'd love to hear from you and help you find your perfect companion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-amber-900 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-900">Phone</p>
                    <a href="tel:+12029364192" className="text-amber-700 hover:text-teal-600 transition-colors">(202) 936-4192</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-900">Email</p>
                    <p className="text-amber-700">pickapuppyplus@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-900">Location</p>
                    <p className="text-amber-700">Texas, USA</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-900">Available Hours</p>
                    <p className="text-amber-700">Mon-Sat: 9AM-6PM</p>
                    <p className="text-amber-700">Sunday: By Appointment</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-teal-50 to-amber-50 border-2 border-teal-200">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-amber-900 mb-4">Why Contact Us?</h4>
                <ul className="space-y-2 text-amber-700">
                  <li>• Schedule a visit to meet our puppies</li>
                  <li>• Get detailed health and lineage information</li>
                  <li>• Join our waiting list for upcoming litters</li>
                  <li>• Ask questions about puppy care and training</li>
                  <li>• Receive lifetime breeder support</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-2 border-amber-200 hover:border-teal-300 transition-colors duration-300">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-amber-900 mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-2">Name *</label>
                    <Input 
                      required
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="border-amber-200 focus:border-teal-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-2">Email *</label>
                    <Input 
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="border-amber-200 focus:border-teal-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-2">Phone</label>
                    <Input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="border-amber-200 focus:border-teal-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-2">Interested Breed</label>
                    <Select value={formData.interestedBreed} onValueChange={(value) => handleChange('interestedBreed', value)}>
                      <SelectTrigger className="border-amber-200 focus:border-teal-500">
                        <SelectValue placeholder="Select a breed" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shihtzu">ShihTzu</SelectItem>
                        <SelectItem value="doberman">Doberman</SelectItem>
                        <SelectItem value="cavapoo">Cavapoo</SelectItem>
                        <SelectItem value="goldendoodle">GoldenDoodle</SelectItem>
                        <SelectItem value="chihuahua">Chihuahua</SelectItem>
                        <SelectItem value="dachshund">Dachshund</SelectItem>
                        <SelectItem value="not-sure">Not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-amber-900 mb-2">Message *</label>
                  <Textarea 
                    required
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className="border-amber-200 focus:border-teal-500 min-h-32"
                    placeholder="Tell us about your family, living situation, and what you're looking for in a puppy..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
