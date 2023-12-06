import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import "../styles/globals.css";
import { useAuth } from "../hooks/Auth";

export default function App({ Component, pageProps }) {
    const { token } = useAuth();
    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         console.log("send location for user: ", user);
    //     }, 10000);

    //     return () => clearInterval(intervalId);
    // }, [user]);
    return (
        <>
            <Navbar />
            <Component {...pageProps} />
        </>
    );
}
