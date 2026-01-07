import Link from 'next/link';
import dayjs from 'dayjs';

import styles from '../styles/episodecard.module.scss';

export default function EpisodeCard({ post }) {
    return (
        <div className={styles.card}>
            <hr/>
            <Link href={'/podcast/' + post.slug} passHref>
                <h2>{post.frontMatter.title}</h2>
            </Link>
            <p>{dayjs(post.frontMatter.date).format('MMMM D, YYYY')}</p>
        </div>
    )
}
