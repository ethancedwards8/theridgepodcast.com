import Link from 'next/link';
import Head from 'next/head';

import { NextSeo } from 'next-seo';

import EpisodeCard from '../../components/episodecard';

import { getAllPostsNoContent } from '../../lib/episodes';

export default function Blog({ posts }) {
    return (
        <>

          <h1>Episode archive:</h1>
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
