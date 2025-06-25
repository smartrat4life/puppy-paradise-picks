
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Eye, Edit, Trash2, Users, Heart, Mail, FileText } from 'lucide-react';

interface Puppy {
  id: string;
  name: string;
  breed: string;
  gender: string;
  birth_date: string;
  price: number;
  status: string;
  description: string;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
  puppy_id: string;
}

interface Application {
  id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  living_situation: string;
  experience_with_pets: string;
  reason_for_adoption: string;
  status: string;
  created_at: string;
  puppy_id: string;
}

const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch puppies
      const { data: puppiesData, error: puppiesError } = await supabase
        .from('puppies')
        .select('*')
        .order('created_at', { ascending: false });

      if (puppiesError) throw puppiesError;
      setPuppies(puppiesData || []);

      // Fetch inquiries
      const { data: inquiriesData, error: inquiriesError } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (inquiriesError) throw inquiriesError;
      setInquiries(inquiriesData || []);

      // Fetch applications
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('adoption_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (applicationsError) throw applicationsError;
      setApplications(applicationsData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePuppyStatus = async (puppyId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('puppies')
        .update({ status: newStatus })
        .eq('id', puppyId);

      if (error) throw error;

      setPuppies(prev => prev.map(puppy => 
        puppy.id === puppyId ? { ...puppy, status: newStatus } : puppy
      ));

      toast({
        title: "Success",
        description: "Puppy status updated successfully!",
      });
    } catch (error) {
      console.error('Error updating puppy status:', error);
      toast({
        title: "Error",
        description: "Failed to update puppy status.",
        variant: "destructive",
      });
    }
  };

  const updateInquiryStatus = async (inquiryId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: newStatus })
        .eq('id', inquiryId);

      if (error) throw error;

      setInquiries(prev => prev.map(inquiry => 
        inquiry.id === inquiryId ? { ...inquiry, status: newStatus } : inquiry
      ));

      toast({
        title: "Success",
        description: "Inquiry status updated successfully!",
      });
    } catch (error) {
      console.error('Error updating inquiry status:', error);
      toast({
        title: "Error",
        description: "Failed to update inquiry status.",
        variant: "destructive",
      });
    }
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('adoption_applications')
        .update({ status: newStatus })
        .eq('id', applicationId);

      if (error) throw error;

      setApplications(prev => prev.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      ));

      toast({
        title: "Success",
        description: "Application status updated successfully!",
      });
    } catch (error) {
      console.error('Error updating application status:', error);
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      case 'sold': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'responded': return 'bg-purple-100 text-purple-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-amber-900">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
          <Button onClick={signOut} variant="outline">
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Puppies</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{puppies.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Heart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {puppies.filter(p => p.status === 'available').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inquiries.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="puppies" className="space-y-4">
        <TabsList>
          <TabsTrigger value="puppies">Puppies</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="puppies">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Manage Puppies</CardTitle>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New Puppy
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {puppies.map((puppy) => (
                  <div key={puppy.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{puppy.name}</h3>
                        <p className="text-gray-600">{puppy.breed} • {puppy.gender}</p>
                        <p className="text-amber-600 font-bold">${puppy.price}</p>
                        <p className="text-sm text-gray-500 mt-2">{puppy.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(puppy.status)}>
                          {puppy.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updatePuppyStatus(puppy.id, 'available')}
                            disabled={puppy.status === 'available'}
                          >
                            Available
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updatePuppyStatus(puppy.id, 'reserved')}
                            disabled={puppy.status === 'reserved'}
                          >
                            Reserved
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updatePuppyStatus(puppy.id, 'sold')}
                            disabled={puppy.status === 'sold'}
                          >
                            Sold
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inquiries">
          <Card>
            <CardHeader>
              <CardTitle>Customer Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{inquiry.name}</h3>
                        <p className="text-sm text-gray-600">{inquiry.email} • {inquiry.phone}</p>
                        <p className="mt-2 text-sm">{inquiry.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(inquiry.status)}>
                          {inquiry.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateInquiryStatus(inquiry.id, 'responded')}
                            disabled={inquiry.status === 'responded'}
                          >
                            Mark Responded
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateInquiryStatus(inquiry.id, 'closed')}
                            disabled={inquiry.status === 'closed'}
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Adoption Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{app.applicant_name}</h3>
                        <p className="text-sm text-gray-600">{app.applicant_email} • {app.applicant_phone}</p>
                        <div className="mt-2 space-y-1 text-sm">
                          <p><strong>Living Situation:</strong> {app.living_situation}</p>
                          <p><strong>Pet Experience:</strong> {app.experience_with_pets}</p>
                          <p><strong>Reason:</strong> {app.reason_for_adoption}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(app.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(app.status)}>
                          {app.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateApplicationStatus(app.id, 'approved')}
                            disabled={app.status === 'approved'}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateApplicationStatus(app.id, 'rejected')}
                            disabled={app.status === 'rejected'}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
