import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import dayjs from 'dayjs';

const EPISODES_PATH = join(process.cwd(), 'episodes');

export function getPostsSlugs() {
    return fs.readdirSync(EPISODES_PATH);
}

export function getAllPostsNoContent() {
    const posts = getPostsSlugs().map(filename => {
        const markdownWithMeta = fs.readFileSync(join('episodes', filename), 'utf-8');
        const ret = matter(markdownWithMeta);

        let frontMatter = ret.data;

        return {
            frontMatter,
            slug: filename.split('.')[0]
        };
    }).sort((post1, post2) => (dayjs(post1.frontMatter.date).isAfter(post2.frontMatter.date) ? -1 : 1));

    return posts;
}

export function getAllPosts() {
    const posts = getPostsSlugs().map(filename => {
        const markdownWithMeta = fs.readFileSync(join('episodes', filename), 'utf-8');
        const ret = matter(markdownWithMeta);

        let frontMatter = ret.data;
        let content = ret.content;

        return {
            frontMatter,
            content,
            slug: filename.split('.')[0]
        };
    }).sort((post1, post2) => (dayjs(post1.frontMatter.date).isAfter(post2.frontMatter.date) ? -1 : 1));

    return posts;
}

export function getArticleFromSlug(slug: string) {
    return getAllPosts().find(x => x.slug === slug);
}
