import api from '../axiosInstance';
import ENDPOINTS from '../endpoints';

const serviceService = {
  getActive: ()   => api.get(ENDPOINTS.SERVICES.ACTIVE),
  getById:   (id) => api.get(ENDPOINTS.SERVICES.BY_ID(id)),
};

export default serviceService;