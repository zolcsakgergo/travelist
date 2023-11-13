import { Inter } from 'next/font/google'
import styles from '../styles/Search.module.css'
import { useState } from "react"
import { places } from '../utils/constants/places'
import Map from '../components/Map'

const inter = Inter({ subsets: ['latin'] })


const SearchPage = () => {
    const [selectedPlace, setSelectedPlace] = useState('Budapest')

    return (
        <div className={inter.className}>
            <div className={styles.layout}>
                <div className={styles.searchContainer}>
                    {Object.keys(places).map((place, index) => (
                        <div key={index} onClick={() => setSelectedPlace(place)} className={`${selectedPlace === place ? styles.selectedPlace : ''} ${styles.searchItem}`}>{place}</div>
                    ))}
                </div>
                <div className={styles.mapContainer}>
                        <Map selectedPlace={selectedPlace}/>
                </div>
            </div>
        </div>
    )
}

export default SearchPage