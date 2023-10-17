import Image from "next/image"
import { useRouter } from "next/router"
import styles from "../../styles/Place.module.css"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const PlacePage = () => {
    const router = useRouter()

    return (
        <div className={`${styles.layout} ${inter.className}`}>
            <div className={styles.imagesContainer}>
                <h1>Place Page {router.query.placename}</h1>
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
                <h1>Place description</h1>
                <p className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, quae. Quisquam, voluptates. Quos, voluptas. Quisquam, voluptates. Quos, voluptas. Eaque, quae. Quisquam, voluptates. Quos, voluptas. Quisquam, voluptates. Quos, voluptas.</p>
                <button className={styles.reviewButton}>Reviews</button>
            </div>
        </div>
    )
}

export default PlacePage