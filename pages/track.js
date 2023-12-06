import { Inter } from "next/font/google";
import styles from "../styles/Search.module.css";
import { useEffect, useState } from "react";
import { places } from "../utils/constants/places";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const inter = Inter({ subsets: ["latin"] });
const libraries = ["places"];

const TrackPage = () => {
    const [requestHelps, setRequestHelps] = useState([]);

    const getRequestHelps = async () => {
        const response = await fetch("/api/request-help");
        const data = await response.json();
        console.log(data.requestHelps);
        setRequestHelps(data.requestHelps);
    };

    useEffect(() => {
        getRequestHelps();
    }, []);

    const mapContainerStyle = {
        width: "100vw",
        height: "80vh",
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    return (
        <div className={inter.className}>
            <div className={styles.layout}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={10}
                    center={places.Budapest}
                    onClick={(e) => {}}
                >
                    {requestHelps.map((requestHelp) => (
                        <Marker
                            icon={`http://maps.google.com/mapfiles/ms/icons/${
                                requestHelp.message ? "red" : "yellow"
                            }.png`}
                            key={requestHelp._id}
                            position={{
                                lat: Number(requestHelp.latitude),
                                lng: Number(requestHelp.longitude),
                            }}
                        />
                    ))}
                </GoogleMap>
            </div>
        </div>
    );
};

export default TrackPage;
