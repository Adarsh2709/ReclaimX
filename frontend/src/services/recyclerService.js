import axios from '../lib/axios';

const recyclerService = {
  createRecycler: async (recyclerData) => {
    const response = await axios.post('/recycler', recyclerData);
    return response.data;
  },

  getAllRecyclers: async () => {
    const response = await axios.get('/recycler');
    return response.data;
  },

  acceptPickup: async (id) => {
    const response = await axios.put(`/recycler/accept/${id}`);
    return response.data;
  },

  collectPickup: async (id) => {
    const response = await axios.put(`/recycler/collect/${id}`);
    return response.data;
  },

  recyclePickup: async (id) => {
    const response = await axios.put(`/recycler/recycle/${id}`);
    return response.data;
  },
};

export default recyclerService;
