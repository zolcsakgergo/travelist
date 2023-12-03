import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { places } from "../../utils/constants/places";
import { useState, useEffect } from "react";
import styles from '../../styles/UploadPlace.module.css'

const libraries = ['places'];

const PlacesUploadPage = () => {
    const [name, setName] = useState('');
    const [coordinates, setCoordinates] = useState(places.Budapest);
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(5);

    useEffect(() => {
        getPlaceData(coordinates.lat, coordinates.lng);
    }, [coordinates])

    const getPlaceData = async (lat, lng) => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
        const data = await response.json();
        const newLocation = data.plus_code?.compound_code?.split(' ')[1]?.replace(',', '');
        if (newLocation) setLocation(newLocation);
    }

    const handlePlaceUpload = async () => {
        await fetch('/api/places', {
            method: 'POST',
            body: JSON.stringify({
                name,
                location,
                description,
                longitude: coordinates.lng,
                latitude: coordinates.lat,
                rating,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    
    const mapContainerStyle = {
        width: '40vw',
        height: '40vh',
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
        <div className={styles.layout}>
            <div className={styles.infosContainer}>
                <h1>Upload a new place</h1>
                <div className={styles.infoContainer}>
                    <label htmlFor="name">Place Name</label>
                    <input name="name" type="text" placeholder="Fisherman's bastion" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>

                <div className={styles.infoContainer}>
                    <label htmlFor="city">City Name</label>
                    <input name="city" type="text" placeholder="Budapest" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className={styles.infoContainer}>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" type="text" placeholder="Fisherman's bastion is a place in Budapest" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <h2>Place Location</h2>
                <div className={styles.infoContainer}>
                    <label htmlFor="longitude">Longitude</label>
                    <input name="longitude" type="number" placeholder="47.5025" value={coordinates.lng} onChange={(e) => setCoordinates({ ...coordinates, lng: Number(e.target.value) })}/>
                </div>
                <div className={styles.infoContainer}>
                    <label htmlFor="latitude">Latitude</label>
                    <input name="latitude" type="number" placeholder="19.0344"  value={coordinates.lat} onChange={(e) => setCoordinates({ ...coordinates, lat: Number(e.target.value) })} />
                </div>
                <div className={styles.infoContainer}>
                    <label htmlFor="rating">Rating</label>
                    <input name="rating" type="number" min={0} max={5} step={0.5} value={rating} onChange={(e) => setRating(e.target.value)} />
                </div>
                <button onClick={handlePlaceUpload}>Save</button>
            </div>
            <div>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={10}
                    center={coordinates}
                    onChange={(e) => setCenter(e.center)}
                    onClick={(e) => {
                        setCoordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                        getPlaceData(coordinates.lat, coordinates.lng);
                    }}
                >
                    <Marker position={coordinates} />
                </GoogleMap>
            </div>
        </div>
    )
}

export default PlacesUploadPage;