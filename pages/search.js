import { Inter } from 'next/font/google'
import styles from '../styles/Search.module.css'
import { useState } from "react"
import { useRouter } from "next/router"

const inter = Inter({ subsets: ['latin'] })

const places = [
    "Budapest",
    "Szeged",
    "Pecs",
    "Esztergom",
    "Gyor",
    "Debrecen",
    "Tatabanya",
    "Nyiregyhaza"
]

const SearchPage = () => {
    const [selectedPlace, setSelectedPlace] = useState('')
    const router = useRouter()

    const handlePlaceClick = () => {
        if (!selectedPlace) return;
        router.push(`/places/${selectedPlace}`)
    }

    return (
        <div className={inter.className}>
            <div className={styles.layout}>
                <div className={styles.searchContainer}>
                    {places.map((place, index) => (
                        <div key={index} onClick={() => setSelectedPlace(place)} className={`${selectedPlace === place ? styles.selectedPlace : ''} ${styles.searchItem}`}>{place}</div>
                    ))}
                </div>
                <div className={styles.mapContainer}>
                    <h1 onClick={handlePlaceClick}>Map here: {selectedPlace}</h1>
                </div>
            </div>
        </div>
    )
}

export default SearchPage