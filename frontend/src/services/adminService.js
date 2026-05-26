import axios from '../lib/axios';

const adminService = {
  getAllUsers: async () => {
    const response = await axios.get('/admin/users');
    return response.data;
  },

  getAllPickups: async () => {
    const response = await axios.get('/admin/pickups');
    return response.data;
  },

  assignRecycler: async (pickupId, recyclerId) => {
    const response = await axios.put(`/admin/assign/${pickupId}/${recyclerId}`);
    return response.data;
  },
};

export default adminService;
