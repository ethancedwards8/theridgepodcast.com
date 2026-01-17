import styles from '../styles/header.module.scss';

export default function Header() {
    return (
        <nav className={styles.nav}>
            <a href="/"><img src="https://media.theridgepodcast.com/favicon.svg" alt="The Ridge Podcast Logo" /></a>
            <div>
                <a href="/"><h2>The Ridge Podcast</h2></a>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/podcast">Episodes</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/sftr">SFTR</a></li>
                </ul>
            </div>
        </nav>
    );
                    // <li><a href="/contact">Contact</a></li>
}
