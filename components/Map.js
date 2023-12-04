import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useRouter } from 'next/router';

const libraries = ['places'];

const Map = ({ selectedLocation, allPlaces }) => {
    const router = useRouter();

    const handlePlaceClick = (place) => {
        if (!place) return;
        router.push(`/places/${place._id}`)
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
            center={{
                lat: Number(selectedLocation.latitude),
                lng: Number(selectedLocation.longitude)
            }}
            onClick={(e) => getPlaceData(e.latLng.lat(), e.latLng.lng())}
        >
            {allPlaces.map((place, index) =>
                <Marker
                    key={index}
                    onClick={() => handlePlaceClick(place)}
                    icon={"http://maps.google.com/mapfiles/ms/icons/green.png"}
                    position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
                />)}
        </GoogleMap>
    )
}

export default Map;