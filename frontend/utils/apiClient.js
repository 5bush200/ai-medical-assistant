// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (method, endpoint, data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Chat API
export const chatAPI = {
  sendMessage: (message, conversationId, userId) =>
    apiCall('POST', '/chat/send', {
      message,
      conversationId,
      userId,
    }),

  getConversation: (conversationId) =>
    apiCall('GET', `/chat/${conversationId}`),
};

// Conversations API
export const conversationsAPI = {
  getAll: (userId) =>
    apiCall('GET', `/conversations?userId=${userId}`),

  create: (userId, title = 'New Conversation') =>
    apiCall('POST', '/conversations', {
      userId,
      title,
    }),

  get: (conversationId) =>
    apiCall('GET', `/conversations/${conversationId}`),

  update: (conversationId, title) =>
    apiCall('PUT', `/conversations/${conversationId}`, { title }),

  delete: (conversationId) =>
    apiCall('DELETE', `/conversations/${conversationId}`),
};

// Topics API
export const topicsAPI = {
  getAll: () =>
    apiCall('GET', '/topics'),

  get: (topicId) =>
    apiCall('GET', `/topics/${topicId}`),

  getByCategory: (category) =>
    apiCall('GET', `/topics/category/${category}`),
};

// Appointments API
export const appointmentsAPI = {
  getAll: (userId) =>
    apiCall('GET', `/appointments?userId=${userId}`),

  create: (appointmentData) =>
    apiCall('POST', '/appointments', appointmentData),

  get: (appointmentId) =>
    apiCall('GET', `/appointments/${appointmentId}`),

  update: (appointmentId, updateData) =>
    apiCall('PUT', `/appointments/${appointmentId}`, updateData),

  delete: (appointmentId) =>
    apiCall('DELETE', `/appointments/${appointmentId}`),
};

// Medical Info API
export const medicalInfoAPI = {
  getConditions: () =>
    apiCall('GET', '/medical-info/conditions'),

  getCondition: (conditionId) =>
    apiCall('GET', `/medical-info/conditions/${conditionId}`),

  getMedications: () =>
    apiCall('GET', '/medical-info/medications'),

  getMedication: (medicationId) =>
    apiCall('GET', `/medical-info/medications/${medicationId}`),

  getLabTests: () =>
    apiCall('GET', '/medical-info/lab-tests'),

  getLabTest: (testId) =>
    apiCall('GET', `/medical-info/lab-tests/${testId}`),

  search: (query) =>
    apiCall('POST', '/medical-info/search', { query }),
};

// Users API
export const usersAPI = {
  register: (name, email) =>
    apiCall('POST', '/users/register', { name, email }),

  login: (email) =>
    apiCall('POST', '/users/login', { email }),

  get: (userId) =>
    apiCall('GET', `/users/${userId}`),

  update: (userId, updateData) =>
    apiCall('PUT', `/users/${userId}`, updateData),

  delete: (userId) =>
    apiCall('DELETE', `/users/${userId}`),
};

export default {
  chatAPI,
  conversationsAPI,
  topicsAPI,
  appointmentsAPI,
  medicalInfoAPI,
  usersAPI,
};
