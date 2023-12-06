import { useState, useEffect } from 'react';
import { verifyTokenCookie } from '../utils/helpers/jwtHelper';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const decoded = verifyTokenCookie();
    setUser(decoded ? decoded.payload.id : null);
  }, []);

  const logout = () => {
    setUser(null);
  };

  return { user, logout };
};
