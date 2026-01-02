import Link from 'next/link';
import dayjs from 'dayjs';
import Head from 'next/head';

import { NextSeo } from 'next-seo';

import { getAllPosts } from '../../lib/episodes';

export default function Blog({ posts }) {
    return (
        <>

          <h1>List of episodes:</h1>
          <div>
            {posts.map((post, index) => (
                <div key={index}>
                  <hr/>
                  <Link href={'/podcast/' + post.slug} passHref>
                    <h1>{post.frontMatter.title}</h1>
                  </Link>
                  <h4>{post.frontMatter.author}</h4>
                  <h4>{dayjs(post.frontMatter.date).format('MMMM D, YYYY')}</h4>
                  <p>{post.frontMatter.description}</p>
                </div>
            ))}
          </div>
        </>
    );
}

export async function getStaticProps() {
    const posts = getAllPosts();

    return {
        props: {
            posts
        }
    };
}
