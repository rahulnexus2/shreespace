import { createContext, useEffect, useState } from "react";
import serviceService from "../api/services/serviceService";


export const ServicesContext = createContext({ services: [], loading: false });


const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await serviceService.getActive(); 
        
          
        setServices(Array.isArray(res) ? res : []);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  
  return (
    <ServicesContext.Provider value={{ services, loading }}>
      {children}
    </ServicesContext.Provider>
  );
};

export default ServicesProvider;