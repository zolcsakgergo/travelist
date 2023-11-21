import jwt from "jsonwebtoken";



export const verifyTokenCookie = () => {
    const token = getCookie('token');
    return jwt.decode(token, { complete: true });
}

export const getCookie = (name)  => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}