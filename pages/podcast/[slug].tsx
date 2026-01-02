import { getAllPosts, getArticleFromSlug } from '../../lib/episodes';
import fs from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import path from 'path';
import dayjs from 'dayjs';

export default function slug({ frontMatter, source, slug }) {

    return (
        <>
          <div>
                <h1>{frontMatter.title}</h1>
                <h3>{dayjs(frontMatter.date).format('MMMM D, YYYY')}</h3>
                <hr/>
                <main>
                  <MDXRemote {...source} />
                </main>
          </div>
        </>
    );
}


export async function getStaticProps({ params: { slug } }) {
    const post = getArticleFromSlug(slug);
    const frontMatter = post.frontMatter;
    const source = await serialize(post.content);

    return {
        props: {
            frontMatter,
            source,
            slug
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
