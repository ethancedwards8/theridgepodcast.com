import dayjs from 'dayjs';

import styles from '../styles/episodecard.module.scss';

export default function EpisodeCard({ post }) {
    return (
        <div className={styles.card}>
            <hr/>
            <a href={'/podcast/' + post.slug}>
                <h2>{post.frontMatter.title}</h2>
            </a>
            <p>{dayjs(post.frontMatter.date).format('MMMM D, YYYY')}</p>
        </div>
    )
}
