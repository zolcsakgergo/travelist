import Link from 'next/link'
import styles from './Navbar.module.css'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const Navbar = () => { 
    return (
        <div className={`${styles.container} ${inter.className}`} >
            <Image alt='logo image' src='/logo.png' width={120} height={120}/>
            <div className={styles.links}>
                <Link href={'/search'}>Search</Link>
                <Link href={'/about'}>Recomended for you</Link>
                <Link href={'/projects'}>Track others</Link>
                <Link href={'/contact'}>Upload new place</Link>
                <Link href={'/contact'}>Request help</Link>
            </div>
            <div className={styles.profile}></div>
        </div>
    )
}

export default Navbar