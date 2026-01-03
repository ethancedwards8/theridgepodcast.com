import Link from 'next/link';
import { generateNextSeo } from "next-seo/pages";
import Head from 'next/head';

import EpisodeCard from '../../components/episodecard';

import { getAllPostsNoContent } from '../../lib/episodes';

export default function Blog({ posts }) {
    return (
        <>
        <Head>
            {generateNextSeo({
                title: "Episode Archive",
                canonical: "https://theridgepodcast.com/podcast",
                description: "The Ridge Podcast Episode Archive",
                openGraph: {
                    url: 'https://theridgepodcast.com/podcast',
                    title: "Episode Archive",
                }
            })}
        </Head>

          <h1>Episode Archive:</h1>
          <div>
            {posts.map((post, index) => (
                <div key={index}>
                    <EpisodeCard post={post} />
                </div>
            ))}
          </div>
        </>
    );
}

export async function getStaticProps() {
    const posts = getAllPostsNoContent();

    return {
        props: {
            posts
        }
    };
}
