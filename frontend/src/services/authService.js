import axios from '../lib/axios';

const authService = {
  register: async (name, email, password, role) => {
    const response = await axios.post('/auth/register', { name, email, password, role });
    return response.data; // Returns status message
  },

  login: async (email, password) => {
    const response = await axios.post('/auth/login', { email, password });
    return response.data; // Returns { token }
  },
};

export default authService;
