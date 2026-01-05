import Link from 'next/link';
import dayjs from 'dayjs';

import styles from '../styles/episodecard.module.scss';

export default function EpisodeCard({ post }) {
    return (
        <div className={styles.card}>
            <hr/>
            <Link href={'/podcast/' + post.slug} passHref>
                <h1>{post.frontMatter.title}</h1>
            </Link>
            <h4>{post.frontMatter.author}</h4>
            <h4>{dayjs(post.frontMatter.date).format('MMMM D, YYYY')}</h4>
            <p>{post.frontMatter.description}</p>
        </div>
    )
}

