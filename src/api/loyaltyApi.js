const API_URL = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  const token = localStorage.getItem('lt_token');
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const login = (email, password) =>
  request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });

export const signup = (data) =>
  request('/api/auth/signup', { method: 'POST', body: JSON.stringify(data) });

export const getProgram = () => request('/api/loyalty-tavern/program');
export const saveProgram = (data) =>
  request('/api/loyalty-tavern/program', { method: 'PUT', body: JSON.stringify(data) });

export const getMessages = () => request('/api/loyalty-tavern/messages');
export const saveMessage = (templateId, text) =>
  request(`/api/loyalty-tavern/messages/${templateId}`, { method: 'PUT', body: JSON.stringify({ text }) });

export const getCustomers = () => request('/api/loyalty-tavern/customers');
export const getStats = () => request('/api/loyalty-tavern/stats');
export const getActivity = () => request('/api/loyalty-tavern/activity');
export const stampVisit = (phone, name) =>
  request('/api/loyalty-tavern/stamp', { method: 'POST', body: JSON.stringify({ phone, name }) });

export const getWhatsappStatus = () => request('/api/loyalty-tavern/whatsapp-status');
export const connectWhatsapp = (whapi_token, whapi_url) =>
  request('/api/auth/connect-whatsapp', { method: 'POST', body: JSON.stringify({ whapi_token, whapi_url }) });
