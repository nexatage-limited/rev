import { apiClient } from './api';

export interface JobCreateRequest {
  device_name: string;
  issue_description: string;
  location_lat: number;
  location_long: number;
  address: string;
}

export interface JobResponse {
  id: number;
  customer_id: number;
  technician_id?: number;
  device_name: string;
  issue_description: string;
  status: string;
  created_at: string;
}

export interface JobStatusUpdate {
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';
}

class JobService {
  async createJob(jobData: JobCreateRequest): Promise<JobResponse> {
    return apiClient.post<JobResponse>('/jobs', jobData);
  }

  async acceptJob(jobId: number): Promise<JobResponse> {
    return apiClient.post<JobResponse>(`/jobs/${jobId}/accept`);
  }

  async getJobById(jobId: number): Promise<JobResponse> {
    return apiClient.get<JobResponse>(`/jobs/${jobId}`);
  }

  async getMyJobs(): Promise<JobResponse[]> {
    return apiClient.get<JobResponse[]>('/jobs/my');
  }

  async getTechnicianJobs(): Promise<JobResponse[]> {
    return apiClient.get<JobResponse[]>('/jobs/technician');
  }

  async updateJobStatus(jobId: number, status: JobStatusUpdate): Promise<JobResponse> {
    return apiClient.put<JobResponse>(`/jobs/${jobId}/status`, status);
  }

  async getAvailableJobs(): Promise<JobResponse[]> {
    return apiClient.get<JobResponse[]>('/jobs/available');
  }
}

export const jobService = new JobService();