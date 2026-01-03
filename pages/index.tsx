import Head from "next/head";
import Link from 'next/link';
import { getAllPostsNoContent } from '../lib/episodes';
import EpisodeCard from '../components/episodecard';
import { AudioPlayer } from 'react-audio-play';
import { generateNextSeo } from "next-seo/pages";

import styles from '../styles/index.module.scss';

const CLOUDFLARE_URL = "https://media.theridgepodcast.com/";

type Badge = {
    name: string;
    link: string;
}

function createBadge(name: string, link: string): Badge {
  return { name, link }
}

export default function Home({ recentPost, posts }) {
    const recent = recentPost.frontMatter.title;

    // courtesy of https://www.podpage.com/badges/
    const badges: Badge[] = [
        // createBadge("amazonmusic-badge.svg", "https://music.amazon.com/podcasts/c905ebb7-055e-4317-b9ae-8874b4744f3c/the-ridge-podcast"),
        createBadge("audible-badge.svg", "https://www.audible.com/pd/The-Ridge-Podcast-Podcast/B0BXB1KY2L"),
        createBadge("applepodcasts-badge.svg", "https://podcasts.apple.com/us/podcast/the-ridge-podcast/id1675395041"),
        createBadge("overcast-badge.svg", "https://overcast.fm/itunes1675395041/the-ridge-podcast"),
        createBadge("pandora-badge.svg", "https://pandora.app.link/WS2Jiyig0xb"),
        // createBadge("pocketcasts-badge.svg", "https://pca.st/9wo986gb"),
        createBadge("rss-badge.svg", "https://theridgepodcast.com/feed/podcast/"),
        createBadge("spotify-badge.svg", "https://open.spotify.com/show/2cKCltgfcCJjaipPQxKVGi"),
        createBadge("youtube_player-badge.svg", "https://www.youtube.com/@theridgepodcast"),
    ];

  return (
      <>
        <Head>
            {generateNextSeo({
                canonical: "https://theridgepodcast.com/",
                description: "The Ridge Podcast Home Page",
                openGraph: {
                    title: "The Ridge Podcast",
                    url: 'https://theridgepodcast.com/',
                }
            })}
        </Head>
        <h1>Welcome to The Ridge Podcast</h1>
        <h2>Check out our most recent episode!</h2>
        <Link href={'/podcast/' + recentPost.frontMatter.slug}><p style={{ fontSize: "1.5em" }}>{recentPost.frontMatter.title}</p></Link>
        <AudioPlayer src={CLOUDFLARE_URL + recentPost.slug + '.mp3'} />
        <br/>
        <div className={styles.listenon}>
            {badges.map((badge, index) => (
              <Link key={index} href={badge.link}><img src={badge.name} /></Link>
            ))}
        </div>

        <h3>Latest episodes:</h3>

        {posts.map((post, index) => (
            <div key={index}>
                <EpisodeCard post={post} />
            </div>
        ))}
        <hr />

        <Link href="/podcast"><p style={{ fontSize: "1.5em", textDecoration: "underline" }}>More Episodes...</p></Link>
      </>
  );
}

export async function getStaticProps() {
    const posts = getAllPostsNoContent().slice(0, 10);
    const recentPost = posts[0];

    return {
        props: {
            recentPost,
            posts
        }
    }
}
