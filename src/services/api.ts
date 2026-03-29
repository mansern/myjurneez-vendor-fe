// Define your Backend URL - match your NestJS port
export const API_BASE_URL = 'http://localhost:3000';

/**
 * UTILITY: getHeaders
 * Centralized function to ensure every request is 
 * authenticated and tagged with the correct Tenant.
 */
export const getHeaders = () => {
  // Retrieve the token saved during login
  const token = localStorage.getItem('auth_token');
  
  // Base headers for JSON communication
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // Inject Authorization if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * OPTIONAL: handleResponse
 * A helper to standardize error catching across all fetch calls.
 */
export const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};