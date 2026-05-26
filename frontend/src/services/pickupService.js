import axios from '../lib/axios';

const pickupService = {
  createPickup: async (pickupData) => {
    const response = await axios.post('/pickup', pickupData);
    return response.data;
  },

  getAllPickups: async () => {
    const response = await axios.get('/pickup');
    return response.data;
  },

  getPickupById: async (id) => {
    const response = await axios.get(`/pickup/${id}`);
    return response.data;
  },

  deletePickup: async (id) => {
    const response = await axios.delete(`/pickup/${id}`);
    return response.data;
  },
};

export default pickupService;
