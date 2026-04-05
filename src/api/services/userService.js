import api from '../axiosInstance';
import ENDPOINTS from '../endpoints';

const userService = {
  getActive: () => api.get(ENDPOINTS.USERS.ACTIVE),
  createUsers:(data)=>api.post(ENDPOINTS.USERS.CREATE,data)
};

export default userService;