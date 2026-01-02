import Head from "next/head";
import { getRecentPost } from '../lib/episodes';
import EpisodeCard from '../components/episodecard';
import { AudioPlayer } from 'react-audio-play';

const CLOUDFLARE_URL = "https://media.theridgepodcast.com/";

export default function Home({ post }) {
    console.log(post.frontMatter.title);
    let recent = post.frontMatter.title;

  return (
      <>
        <h1>Welcome to The Ridge Podcast</h1>
        <h2>Check out our most recent episode!</h2>
        <AudioPlayer src={CLOUDFLARE_URL + post.slug + '.mp3'} />
        <EpisodeCard post={post} />
      </>
  );
}

export async function getStaticProps() {
    const post = getRecentPost();

    return {
        props: {
            post
        }
    }
}
