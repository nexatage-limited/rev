import { apiClient } from './api';

export interface TechnicianProfileCreate {
  business_name: string;
  years_experience: number;
  specialization: string;
  service_radius_km?: number;
}

export interface TechnicianProfileResponse {
  id: number;
  user_id: number;
  business_name: string;
  years_experience: number;
  specialization: string;
  verification_status: string;
  is_verified: boolean;
}

export interface DocumentResponse {
  id: number;
  document_type: string;
  file_name: string;
  file_url: string;
  uploaded_at: string;
}

export interface TechnicianVerificationRequest {
  action: 'approve' | 'reject';
  notes?: string;
}

class TechnicianService {
  async createProfile(profileData: TechnicianProfileCreate): Promise<TechnicianProfileResponse> {
    return apiClient.post<TechnicianProfileResponse>('/technicians/profile', profileData);
  }

  async uploadDocument(documentType: string, file: File): Promise<DocumentResponse> {
    const formData = new FormData();
    formData.append('document_type', documentType);
    formData.append('file', file);
    
    return apiClient.postFormData<DocumentResponse>('/technicians/documents', formData);
  }

  async getMyDocuments(): Promise<DocumentResponse[]> {
    return apiClient.get<DocumentResponse[]>('/technicians/documents');
  }

  async getProfile(): Promise<TechnicianProfileResponse> {
    return apiClient.get<TechnicianProfileResponse>('/technicians/profile');
  }

  // Admin endpoints
  async getPendingTechnicians(skip = 0, limit = 100): Promise<any[]> {
    return apiClient.get<any[]>(`/admin/technicians/pending?skip=${skip}&limit=${limit}`);
  }

  async verifyTechnician(technicianId: number, verificationData: TechnicianVerificationRequest): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>(`/admin/technicians/${technicianId}/verify`, verificationData);
  }

  async getTechnicianDocuments(technicianId: number): Promise<DocumentResponse[]> {
    return apiClient.get<DocumentResponse[]>(`/admin/technicians/${technicianId}/documents`);
  }
}

export const technicianService = new TechnicianService();