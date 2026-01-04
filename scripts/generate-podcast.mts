import fs from 'fs';
import path from 'path';

import { Podcast } from 'podcast';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import striptags from 'striptags';

import { PodcastTrailer } from '../components/podcasttrailer';

const components = { PodcastTrailer };

const episodesPath = path.join(process.cwd(), 'episodes');

// for item desc/summary that requires html
async function mdxToHtml(mdxContent) {
    const source = await serialize(mdxContent);
    return renderToStaticMarkup(
        React.createElement(MDXRemote, { ...source, components })
    );
}

// for item desc/summary that requires plain text
async function mdxToPlainText(mdxContent) {
    const html = await mdxToHtml(mdxContent);
    return striptags(html).trim();
}


// TODO: split these into a new file
const desc = "Interviews from the Blue Ridge/Appalachian area.";
const email = "theridgepodcast@gmail.com";
const author = "The Ridge Podcast";
const logo = "https://theridgepodcast.com/TheRidgePodcastLogoECEJLW3000x3000.png";
const site = 'https://theridgepodcast.com';


const feed = new Podcast({
    title: author,
    description: desc,
    feedUrl: 'https://theridgepodcast.com/feed/podcast/',
    siteUrl: site,
    // author: author,
    // TODO: fix 2026 to some function ;)
    copyright: '© 2023-2026 The Ridge Podcast',
    language: 'en-US',
    namespaces: {
        simpleChapters: false,
    },
    customNamespaces: {
        googleplay: "http://www.google.com/schemas/play-podcasts/1.0",
        slash: "http://purl.org/rss/1.0/modules/slash/",
	    sy: "http://purl.org/rss/1.0/modules/syndication/",
        wfw: "http://wellformedweb.org/CommentAPI/",
        rawvoice: "https://blubrry.com/developer/rawvoice-rss/",
    },
    itunesSubtitle: desc,
    itunesAuthor: author,
    itunesType: "episodic",
    itunesSummary: desc,
    itunesOwner: {
      name: author,
      email: email,
    },
    itunesImage: logo,
    itunesCategory: [
        {
            text: "History",
        },
        {
            text: "Society & Culture",
            subcats: [
                {
                    text: "Documentary",
                }
            ]
        },
        {
            text: "Government",
        }
    ],
    
    // 	TODO: figure out if i need/want/care
    // 	<rawvoice:subscribe feed="https://lexfridman.com/feed/podcast/" itunes="https://podcasts.apple.com/us/podcast/lex-fridman-podcast/id1434243584" blubrry="https://www.blubrry.com/artificialintelligence/ " tunein="https://tunein.com/podcasts/Technology-Podcasts/Artificial-Intelligence-p1153019/" spotify="https://open.spotify.com/show/2MAi0BvDc6GTFvKFPXnkCL"></rawvoice:subscribe>
        // {
        //     'rawvoice:subscribe': {
        //         _attr: {
        //             feed: 'https://theridgepodcast.com/feed/podcast/the-ridge-podcast/',
        //             spotify: 'https://open.spotify.com/show/...',
        //         },
        //     },
        // },
    customElements: [
        {
            image: [
                { url: logo },
                { title: author },
                { link: site },
            ]
        },
        {
            "podcast:guid": "be71c3da-65b5-5ede-b088-87b305dec394",
        },
        {
            'podcast:locked': [
                { _attr: { owner: email } },
                'yes',
            ],
        },
        {
            "googleplay:author": author,
        },
        {
            "googleplay:email": email,
        },
        {
            "googleplay:description": desc,
        },
        {
            "googleplay:explicit": "no",
        },
        {
            "googleplay:image": {
                _attr: {
                    href: logo
                }
            }
        }
    ],
});

const files = fs.readdirSync(episodesPath);


const episodes = [];

for (const file of files) {
    if (!file.endsWith('.mdx')) continue;


    const filePath = path.join(episodesPath, file);
    const source = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(source);

    const htmlDescription = await mdxToHtml(content);
    const plainTextSummary = await mdxToPlainText(content);

    const slug = file.replace('.mdx', '');
    const audioUrl = `https://media.theridgepodcast.com/${slug}.mp3`;

    episodes.push({
        title: data.title,
        description: htmlDescription,
        itunesSummary: {
            _cdata: plainTextSummary
        },
        content: htmlDescription,
        url: audioUrl,
        guid: data.guid,
        date: new Date(data.date),
        // TODO: calculate 
        // itunesDuration:
        enclosure: {
            url: audioUrl,
            // TODO: calculate 
            size: 0,
            type: 'audio/mpeg'
        },
        customElements: [
            {
                "googleplay:description": {
                    _cdata: plainTextSummary
                },
            }
        ]
    });
}

episodes.sort((a, b) => b.date - a.date);

for (const episode of episodes) {
    feed.addItem(episode);
}

const xml = feed.buildXml();

const feedDir = path.join(process.cwd(), 'public', 'feed');
fs.mkdirSync(feedDir, { recursive: true });

fs.writeFileSync(path.join(feedDir, 'podcast'), xml);
// fs.writeFileSync("public/feed/podcast", xml);
// fs.writeFileSync("public/output.xml", xml);
