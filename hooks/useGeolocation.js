import { useEffect, useState } from "react";

export const useGeolocation = () => {
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLatitude(latitude);
                setLongitude(longitude);
                console.log({ latitude, longitude });
            }, console.log);
        }
    }, []);

    return { latitude, longitude };
};
