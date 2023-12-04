import Image from "next/image"
import { useRouter } from "next/router"
import styles from "../../styles/Place.module.css"
import { Inter } from 'next/font/google'
import { useEffect, useState } from "react"

const inter = Inter({ subsets: ['latin'] })

const PlacePage = () => {
    const router = useRouter();
    const [place, setPlace] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const getPlaceData = async () => { 
        setIsLoading(true);
        const response = await fetch(`/api/places?id=${router.query.id}`);
        const data = await response.json();
        setIsLoading(false);
        if (data.place) setPlace(data.place);
    }

    useEffect(() => {
        if (router.isReady) getPlaceData();
    }, [router.isReady]);

    if (!place || isLoading) return <div>Loading...</div>

    return (
        <div className={`${styles.layout} ${inter.className}`}>
            <div className={styles.imagesContainer}>
                <h1>Place Page {place?.name}</h1>
                <Image alt="big image placeholder" height={300} width={300} src='/logo.png' />
                <div>
                    <Image alt="small image placeholder" height={100} width={100} src='/logo.png' />
                    <Image alt="small image placeholder" height={100} width={100} src='/logo.png' />
                    <Image alt="small image placeholder" height={100} width={100} src='/logo.png' />
                    <Image alt="small image placeholder" height={100} width={100} src='/logo.png' />
                    <Image alt="small image placeholder" height={100} width={100} src='/logo.png' />
                </div>
            </div>

            <div className={styles.reviewContainer}>
                <h1>Place location</h1>
                <p className={styles.description}>{place?.location}</p>

                <h1>Place description</h1>
                <p className={styles.description}>{place?.description}</p>

                <h1>Place rating</h1>
                <p className={styles.description}>{place?.rating}</p>

                <button className={styles.reviewButton}>Reviews</button>
            </div>
        </div>
    )
}

export default PlacePage