import api from '../axiosInstance';
import ENDPOINTS from '../endpoints';

const projectService = {
  getActive: ()   => api.get(ENDPOINTS.PROJECTS.ACTIVE),
  getById:   (id) => api.get(ENDPOINTS.PROJECTS.BY_ID(id)),
};

export default projectService;