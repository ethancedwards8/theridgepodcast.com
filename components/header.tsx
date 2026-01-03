import Link from 'next/link';
import styles from '../styles/header.module.scss';

export default function Header() {
    return (
        <nav className={styles.nav}>
            <Link href="/"><img src="/favicon.svg" alt="The Ridge Podcast Logo" /></Link>
            <div>
                <Link href="/"><h2>The Ridge Podcast</h2></Link>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/podcast">Episodes</Link></li>
                    <li><Link href="/about">About</Link></li>
                </ul>
            </div>
        </nav>
    );
                    // <li><Link href="/contact">Contact</Link></li>
}
