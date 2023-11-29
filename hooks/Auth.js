import { useState, useEffect } from 'react';
import { verifyTokenCookie } from '../utils/helpers/jwtHelper';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const decoded = verifyTokenCookie();
    setUser(decoded ? decoded.payload.id : null);
  }, []);

  const logout = () => {
    // Clear the authentication-related data (e.g., token, session)
    // Example: remove token from cookies, clear session storage, etc.
    // Then update the user state to null
    setUser(null);
  };

  return { user, logout };
};
