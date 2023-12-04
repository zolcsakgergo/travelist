import { Inter } from 'next/font/google'
import styles from '../styles/Search.module.css'
import { useEffect, useState } from "react"
import Map from '../components/Map'
import { places } from '../utils/constants/places'

const inter = Inter({ subsets: ['latin'] })

const SearchPage = () => {
    const [selectedLocation, setSelectedLocation] = useState(places.BudapestFull);
    const [allPlaces, setAllPlaces] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);

    const getAllPlaces = async () => {
        const response = await fetch('/api/places');
        const data = await response.json();
        setAllPlaces(data.places);
        setLocationOptions([...new Set(data.places.map(place => place.location))]);
    }

    const handleLocationClick = (location) => {
        setSelectedLocation(allPlaces.find( place  => place.location === location));    
    }

    useEffect(() => { 
        getAllPlaces();
    }, []);

    return (
        <div className={inter.className}>
            <div className={styles.layout}>
                <div className={styles.searchContainer}>
                    {locationOptions.map((location, index) => (
                        <div key={index} onClick={() => handleLocationClick(location)} className={styles.searchItem}>{location}</div>
                    ))}
                </div>
                <div className={styles.mapContainer}>
                        <Map selectedLocation={selectedLocation} allPlaces={allPlaces}/>
                </div>
            </div>
        </div>
    )
}

export default SearchPage