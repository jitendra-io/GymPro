const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';

// Helper to get token from storage
function getStoredToken() {
  try {
    return localStorage.getItem('gym_auth_token');
  } catch {
    return null;
  }
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getStoredToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  // Authentication
  auth: {
    register: async (userData) => {
      const res = await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      if (res.success && res.token) {
        localStorage.setItem('gym_auth_token', res.token);
      }
      return res;
    },
    login: async (credentials) => {
      const res = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      if (res.success && res.token) {
        localStorage.setItem('gym_auth_token', res.token);
      }
      return res;
    },
    getMe: () => request('/auth/me'),
    updateProfile: (profileData) =>
      request('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      }),
    logout: () => {
      try {
        localStorage.removeItem('gym_auth_token');
      } catch (err) {
        console.error('Error logging out:', err);
      }
    },
    getToken: getStoredToken,
  },

  // Health
  checkHealth: () => request('/health'),

  // Classes
  getClasses: () => request('/classes'),
  getClassById: (id) => request(`/classes/${id}`),
  createClass: (classData) =>
    request('/classes', {
      method: 'POST',
      body: JSON.stringify(classData),
    }),

  // Members
  getMembers: () => request('/members'),
  createMember: (memberData) =>
    request('/members', {
      method: 'POST',
      body: JSON.stringify(memberData),
    }),

  // Workouts
  getWorkouts: () => request('/workouts'),
  logWorkout: (workoutData) =>
    request('/workouts', {
      method: 'POST',
      body: JSON.stringify(workoutData),
    }),

  // BMI
  getBmiHistory: () => request('/bmi'),
  saveBmiRecord: (bmiData) =>
    request('/bmi', {
      method: 'POST',
      body: JSON.stringify(bmiData),
    }),

  // Dashboard stats
  getDashboardStats: () => request('/dashboard/stats'),
};

export default api;
