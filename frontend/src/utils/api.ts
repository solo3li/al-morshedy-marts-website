const isProd = process.env.NODE_ENV === 'production';
const defaultBackend = isProd ? 'http://eshak-backend' : 'http://localhost:5256';
export const API_BASE_URL = typeof window !== 'undefined' ? '/api' : (process.env.BACKEND_URL || defaultBackend) + '/api';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  let token = null;
  if (typeof window !== 'undefined') {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      try {
        const parsed = JSON.parse(authStorage);
        token = parsed.state?.token;
      } catch(e) {}
    }
  }

  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    cache: 'no-store'
  });

  if (!response.ok) {
    let errorMessage = 'An error occurred while fetching data';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.title || errorMessage;
    } catch {
      errorMessage = response.statusText;
    }
    throw new Error(errorMessage);
  }

  // Handle empty responses
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  
  return null;
}

export async function createOrder(orderData: any) {
  return fetchApi('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  });
}

