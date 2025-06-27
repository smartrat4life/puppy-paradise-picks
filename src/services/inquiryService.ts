
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export type Inquiry = Database['public']['Tables']['inquiries']['Row'];
export type InquiryUpdate = Database['public']['Tables']['inquiries']['Update'];

export class InquiryService {
  static async getAllInquiries(): Promise<Inquiry[]> {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching inquiries:', error);
      throw new Error('Failed to fetch inquiries');
    }

    return data || [];
  }

  static async updateInquiryStatus(id: string, status: string): Promise<Inquiry> {
    const { data, error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating inquiry status:', error);
      throw new Error('Failed to update inquiry status');
    }

    return data;
  }
}
