const ENDPOINTS = {
  USERS: {
    ACTIVE: '/users/public/active',
    CREATE:'/users/public/create',
  },

  PROJECTS: {
    ACTIVE:    '/projects/public/active',
    BY_ID:     (id) => `/projects/public/id/${id}`,
  },

  SERVICES: {
    ACTIVE:    '/services/public/active',
    BY_ID:     (id) => `/services/public/id/${id}`,
  },

  
  MESSAGES: {
    ACTIVE:    '/messages/public/active',
    BY_ID:     (id) => `/messages/public/id/${id}`,
    TYPES:     '/messages/public/types',
    SAVE:      '/messages/public/save',
  },
  ABOUT: {
    ACTIVE:    '/about/public/active',
    BY_ID:     (id) => `/about/public/id/${id}`,
    
  },
};

export default ENDPOINTS;