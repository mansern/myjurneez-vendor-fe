import { Task, TaskFilters } from '@/types/task';
import { API_BASE_URL, getHeaders } from './api';

const TENANT_ID = '7b2a9d1c-4e5f-4a0b-8c9d-1e2f3a4b5c6d';

export const taskService = {
  getTasks: async (filters: TaskFilters = {}): Promise<Task[]> => {
    const params = new URLSearchParams(filters as any);
    const response = await fetch(`${API_BASE_URL}/maintenance?${params}`, {
      headers: { ...getHeaders(), 'x-tenant-id': TENANT_ID },
    });
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();

    return data.map((item: any) => ({
      ...item,
      // Map API issueTitle to our internal description field
      description: item.issueTitle || item.description || '',
      status: item.status?.toLowerCase() || 'open',
      propertyName: item.propertyName || 'Property',
      unitNumber: item.unitNumber || 'Unit',
    }));
  },

  getTaskById: async (id: string): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/maintenance/${id}`, {
      headers: { ...getHeaders(), 'x-tenant-id': TENANT_ID },
    });

    if (!response.ok) {
      throw new Error(`Task ${id} not found`);
    }

    const item = await response.json();
    return {
      ...item,
      description: item.issueTitle || item.description || '',
      status: item.status?.toLowerCase() || 'open',
      // Ensure these keys exist for the detail page
      propertyName: item.propertyName || 'Property',
      unitNumber: item.unitNumber || 'Unit',
    };
  },

  updateTaskStatus: async (taskId: string, status: string): Promise<Task> => {
    // FIX: Map frontend status to the specific Enum values in your Backend Entity
    // This prevents the "invalid input value for enum" Postgres error
    const statusMapping: Record<string, string> = {
      'completed': 'resolved',
      'in_progress': 'in_progress',
      'open': 'open',
      'cancelled': 'cancelled'
    };

    const payloadStatus = statusMapping[status.toLowerCase()] || status.toLowerCase();

    const response = await fetch(`${API_BASE_URL}/maintenance/${taskId}`, {
      method: 'PATCH',
      headers: { 
        ...getHeaders(), 
        'Content-Type': 'application/json', 
        'x-tenant-id': TENANT_ID 
      },
      body: JSON.stringify({ status: payloadStatus }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Update failed');
    }

    const updated = await response.json();
    return { 
      ...updated, 
      status: updated.status.toLowerCase(), 
      description: updated.issueTitle || updated.description 
    };
  }
};