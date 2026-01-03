import { getAllPosts, getArticleFromSlug } from '../../lib/episodes';
import Head from 'next/head';
import fs from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import path from 'path';
import dayjs from 'dayjs';

import { generateNextSeo } from "next-seo/pages";
import { PodcastTrailer } from '../../components/podcasttrailer';
const components = { PodcastTrailer };

import { AudioPlayer } from 'react-audio-play';

import styles from '../../styles/podcast.module.scss';

const CLOUDFLARE_URL = "https://media.theridgepodcast.com/";

export default function slug({ episode }) {
    let frontMatter = episode.frontMatter;
    let source = episode.source;
    let slug = episode.slug;

    return (
        <>
        <Head>
            {generateNextSeo({
                title: frontMatter.title,
                canonical: "https://theridgepodcast.com/podcast/" + slug,
                openGraph: {
                    url: 'https://theridgepodcast.com/podcast/' + slug,
                    title: frontMatter.title
                }
            })}
        </Head>

          <div className={styles.episode}>
                <h1>{frontMatter.title}</h1>
                <div className={styles.dateaudio}>
                    <h3>{dayjs(frontMatter.date).format('MMMM D, YYYY')}</h3>
                    <div>
                        <AudioPlayer className={styles.player} src={CLOUDFLARE_URL + episode.slug + '.mp3'} />
                    </div>
                </div>
                <hr/>
                <main>
                  <MDXRemote {...source} components={components} />
                </main>
          </div>
        </>
    );
}


export async function getStaticProps({ params: { slug } }) {
    const post = getArticleFromSlug(slug);
    const frontMatter = post.frontMatter;
    const source = await serialize(post.content);

    let episode = {
        frontMatter,
        source,
        slug,
    };

    return {
        props: {
            episode
        }
    };
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('episodes'));

    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.mdx', '')
        }
    }));

    return {
        paths,
        fallback: false
    };
}
