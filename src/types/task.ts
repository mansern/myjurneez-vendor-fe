export type TaskCategory = 'Cleaning' | 'Maintenance' | 'Inspection' | 'Plumbing' | 'Electrical' | 'Security';
export type TaskStatus = 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'; // Changed to lowercase for easier API sync
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Task {
  id: string;
  tenantId: string;  
  propertyId: string;
  unitId: string;
  propertyName: string; 
  unitNumber: string;   
  category: TaskCategory;
  description: string; // We map issueTitle to this
  issueTitle?: string; // Original API key
  status: TaskStatus;
  priority: TaskPriority;
  reportedDate: string;
  dueDate: string;      
  completedAt?: string; 
  images: string[];      
}

export interface TaskFilters {
  status?: string;
  category?: string;
  priority?: string; 
}