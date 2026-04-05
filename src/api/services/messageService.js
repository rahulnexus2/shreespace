import api from '../axiosInstance';
import ENDPOINTS from '../endpoints';

const messageService = {
  getActive: ()      => api.get(ENDPOINTS.MESSAGES.ACTIVE),
  getById:   (id)    => api.get(ENDPOINTS.MESSAGES.BY_ID(id)),
  getTypes:  ()      => api.get(ENDPOINTS.MESSAGES.TYPES),
  save:      (data)  => api.post(ENDPOINTS.MESSAGES.SAVE, data),
};

export default messageService;