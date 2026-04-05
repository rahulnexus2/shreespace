// hooks/usePortfolioInit.js
import { useEffect, useState } from 'react';
import userService from '../api/services/userService';


const usePortfolioInit = () => {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);


  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const users = await userService.getActive();
        setData(users[0]); // portfolio owner is first active user
      } catch (err) {
        setError('Failed to load portfolio');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  return { data, loading, error };
};

export default usePortfolioInit;