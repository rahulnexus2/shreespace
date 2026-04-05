import axios from "axios";

const api=axios.create({
  baseURL:import.meta.env.VITE_API_URL,
  timeout:10000,
  headers:{
    "Content-Type": "application/json",
  }
})


api.interceptors.response.use(
  (res) => res.data,   // unwrap .data globally so services get clean data
  (err) => {
    console.error('API error:', err.response?.status, err.message);
    return Promise.reject(err);
  }
);

export default api
