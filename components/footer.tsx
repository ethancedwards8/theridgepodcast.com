import Link from 'next/link';
import styles from '../styles/footer.module.scss';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.text}>
                <p className={styles.trp}>The Ridge Podcast</p>
                <br />
                <p>Interviews from the Blue Ridge/Appalachian area.</p>
                <br />
                <p>© 2023–2026 Ethan Carter Edwards, LLC</p>
            </div>
        </footer>
    );
}
