import Link from 'next/link'
import styles from './Navbar.module.css'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const Navbar = () => { 
    return (
        <div className={`${styles.container} ${inter.className}`} >
            <Link href = "/">
                <Image alt='logo image' src='/logo.png' priority width={120} height={120} />
            </Link>
            <div className={styles.links}>
                <Link href={'/search'}>Search</Link>
                <Link href={'/about'}>Recomended for you</Link>
                <Link href={'/track'}>Track others</Link>
                <Link href={'/places/upload'}>Upload new place</Link>
                <Link href={'/request-help'}>Request help</Link>
                <Link href={'/registration'}> Sign Up</Link>
                <Link href={'/login'}>Login</Link>
            </div>
        </div>
    )
}

export default Navbar