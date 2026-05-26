import axios from '../lib/axios';

const analyticsService = {
  getAnalytics: async () => {
    const response = await axios.get('/analytics');
    return response.data;
  },
};

export default analyticsService;
