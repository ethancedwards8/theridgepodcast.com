import Link from 'next/link';
import { generateNextSeo } from "next-seo/pages";

import EpisodeCard from '../../components/episodecard';

import { getAllPostsNoContent } from '../../lib/episodes';

import type { Metadata } from 'next'

export const metadata: Metadata = {
    alternates: { canonical: "https://theridgepodcast.com/podcast" },
    title: "Episode Archive",
    description: "The Ridge Podcast Episode Archive",
    openGraph: {
        url: 'https://theridgepodcast.com/podcast',
        title: "Episode Archive",
    }
}

export default function Blog() {
    const posts = getAllPostsNoContent();

    return (
        <>
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
