import api from '../axiosInstance';
import ENDPOINTS from '../endpoints';

const aboutService = {
  getActive: ()      => api.get(ENDPOINTS.ABOUT.ACTIVE),
  getById:   (id)    => api.get(ENDPOINTS.ABOUT.BY_ID(id)),
  
};

export default aboutService;