
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Trash2, Users, Heart, Mail, FileText, Pencil, AlertCircle, Loader2 } from 'lucide-react';
import PuppyForm from './PuppyForm';
import { usePuppies } from '@/hooks/usePuppies';
import { InquiryService, Inquiry } from '@/services/inquiryService';
import { ApplicationService, Application } from '@/services/applicationService';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { puppies, loading: puppiesLoading, createPuppy, updatePuppy, deletePuppy } = usePuppies();
  
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(true);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  
  const [showPuppyForm, setShowPuppyForm] = useState(false);
  const [selectedPuppy, setSelectedPuppy] = useState<any>(null);
  const [puppyToDelete, setPuppyToDelete] = useState<any>(null);

  useEffect(() => {
    fetchInquiries();
    fetchApplications();
  }, []);

  const fetchInquiries = async () => {
    try {
      setInquiriesLoading(true);
      const data = await InquiryService.getAllInquiries();
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast({
        title: "Error",
        description: "Failed to fetch inquiries",
        variant: "destructive",
      });
    } finally {
      setInquiriesLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      setApplicationsLoading(true);
      const data = await ApplicationService.getAllApplications();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch applications",
        variant: "destructive",
      });
    } finally {
      setApplicationsLoading(false);
    }
  };

  const handleAddPuppy = () => {
    setSelectedPuppy(null);
    setShowPuppyForm(true);
  };

  const handleEditPuppy = (puppy: any) => {
    setSelectedPuppy(puppy);
    setShowPuppyForm(true);
  };

  const handleDeleteClick = (puppy: any) => {
    setPuppyToDelete(puppy);
  };

  const confirmDeletePuppy = async () => {
    if (!puppyToDelete?.id) return;
    
    try {
      await deletePuppy(puppyToDelete.id);
    } catch (error) {
      // Error handling is done in the hook
    } finally {
      setPuppyToDelete(null);
    }
  };

  const handlePuppyFormSuccess = () => {
    setShowPuppyForm(false);
    setSelectedPuppy(null);
  };

  const updatePuppyStatus = async (puppyId: string, newStatus: string) => {
    try {
      await updatePuppy(puppyId, { status: newStatus });
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const updateInquiryStatus = async (inquiryId: string, newStatus: string) => {
    try {
      const updatedInquiry = await InquiryService.updateInquiryStatus(inquiryId, newStatus);
      setInquiries(prev => prev.map(inquiry => 
        inquiry.id === inquiryId ? updatedInquiry : inquiry
      ));
      
      toast({
        title: "Success",
        description: "Inquiry status updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update inquiry status",
        variant: "destructive",
      });
    }
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const updatedApplication = await ApplicationService.updateApplicationStatus(applicationId, newStatus);
      setApplications(prev => prev.map(app => 
        app.id === applicationId ? updatedApplication : app
      ));
      
      toast({
        title: "Success",
        description: "Application status updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update application status",
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

  const loading = puppiesLoading || inquiriesLoading || applicationsLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin mb-4" />
          <div className="text-xl">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showPuppyForm && (
        <PuppyForm
          puppy={selectedPuppy}
          onSuccess={handlePuppyFormSuccess}
          onCancel={() => setShowPuppyForm(false)}
        />
      )}

      <AlertDialog open={!!puppyToDelete} onOpenChange={(open) => !open && setPuppyToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <AlertDialogTitle>Delete Puppy</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="pt-4">
              Are you sure you want to delete <span className="font-semibold">{puppyToDelete?.name}</span>? 
              This action cannot be undone and will also delete the associated image.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeletePuppy}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
                  <Button onClick={handleAddPuppy}>
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
                        <div className="flex gap-4 flex-1">
                          {puppy.image_url && (
                            <img 
                              src={puppy.image_url} 
                              alt={puppy.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{puppy.name}</h3>
                            <p className="text-gray-600">{puppy.breed} • {puppy.gender}</p>
                            <p className="text-amber-600 font-bold">${puppy.price}</p>
                            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{puppy.description}</p>
                          </div>
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
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditPuppy(puppy)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteClick(puppy)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {puppies.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No puppies found. Add your first puppy to get started.
                    </div>
                  )}
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
                  {inquiries.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No inquiries found.
                    </div>
                  )}
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
                  {applications.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No applications found.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminDashboard;
