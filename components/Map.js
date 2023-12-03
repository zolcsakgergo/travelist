import { GoogleMap, useLoadScript, Marker, Circle } from '@react-google-maps/api';
import { places } from '../utils/constants/places';
import { useRouter } from 'next/router';

const libraries = ['places'];

const Map = ({ selectedPlace, allPlaces }) => {
    const router = useRouter();

    const handlePlaceClick = () => {
        if (!selectedPlace) return;
        router.push(`/places/${selectedPlace.toLowerCase()}`)
    }

    const mapContainerStyle = {
        width: '100%',
        height: '100%',
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
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={places[selectedPlace]}
            onClick={(e) => getPlaceData(e.latLng.lat(), e.latLng.lng())}
        >
            <Marker position={places[selectedPlace]} onClick={handlePlaceClick} />
            {allPlaces.map((place, index) => <Marker key={index} icon={"http://maps.google.com/mapfiles/ms/icons/green.png"} position={{ lat: Number( place.latitude), lng: Number(place.longitude) }} />)}
            <Circle
                key="id"
                center={places[selectedPlace]}
                radius={5000}
                options={{
                    strokeColor: "#66009a",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: `#66009a`,
                    fillOpacity: 0.35,
                    zIndex: 1
                }}
            />
        </GoogleMap>
    )
}

export default Map;