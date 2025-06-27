
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export type Application = Database['public']['Tables']['adoption_applications']['Row'];
export type ApplicationUpdate = Database['public']['Tables']['adoption_applications']['Update'];

export class ApplicationService {
  static async getAllApplications(): Promise<Application[]> {
    const { data, error } = await supabase
      .from('adoption_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching applications:', error);
      throw new Error('Failed to fetch applications');
    }

    return data || [];
  }

  static async updateApplicationStatus(id: string, status: string): Promise<Application> {
    const { data, error } = await supabase
      .from('adoption_applications')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating application status:', error);
      throw new Error('Failed to update application status');
    }

    return data;
  }
}
