import { getArticleFromSlug } from '@/lib/episodes';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import MyAudioPlayer from '@/components/AudioPlayer';
import YTPlayer from '@/components/youtubeplayer';
import PodcastTrailer from '@/components/podcasttrailer';
import styles from '@/styles/podcast.module.scss';

const components = {};

export async function generateStaticParams() {
    const files = fs.readdirSync(path.join(process.cwd(), 'episodes'));
    
    return files.map(filename => ({
            slug: filename.replace('.mdx', '')
        }));
}

export async function generateMetadata({ params }) {
    const slug = (await params).slug;
    const post = getArticleFromSlug(slug);
    
    if (!post) {
        notFound();
    }
    
    const { frontMatter } = post;
    const url = `https://theridgepodcast.com/podcast/${slug}`;
    
    return {
        title: frontMatter.title,
        alternates: {
            canonical: url,
        },
        openGraph: {
            url,
            title: frontMatter.title,
        },
    };
}

export default async function EpisodePage({ params }) {
    const slug = (await params).slug;
    const post = getArticleFromSlug(slug);
    
    if (!post) {
        notFound();
    }
    
    const { frontMatter, content } = post;
    
    return (
        <div className={styles.episode}>
            <h1>{frontMatter.title}</h1>
            <div className={styles.dateaudio}>
                <h3>{dayjs(frontMatter.date).format('MMMM D, YYYY')}</h3>
                <div>
                    <MyAudioPlayer slug={slug} />
                </div>
            </div>
            <hr/>
            <main>
                <MDXRemote source={content} components={components} />

                <PodcastTrailer />
            </main>
            {frontMatter.youtube && <YTPlayer id={frontMatter.youtube} />}
        </div>
    );
}
