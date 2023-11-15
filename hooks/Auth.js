import { useEffect, useState } from "react";
import { verifyTokenCookie } from "../utils/helpers/jwtHelper";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const decoded = verifyTokenCookie();
        setUser(decoded ? decoded.payload.id : null);
        console.log(decoded)
    }, []);

    return user;
}