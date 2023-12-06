import { useState, useEffect } from "react";
import { getCookie, verifyTokenCookie } from "../utils/helpers/jwtHelper";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const decoded = verifyTokenCookie();
        setUser(decoded ? decoded.payload.id : null);
        setToken(getCookie("token"));
    }, []);

    const logout = () => {
        setUser(null);
    };

    return { user, token, logout };
};
