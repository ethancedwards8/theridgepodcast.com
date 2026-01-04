import { Podcast } from 'podcast';

import { v5 as uuid } from 'uuid';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const episodesPath = path.join(process.cwd(), 'episodes');


const desc = "Interviews from the Blue Ridge/Appalachian area.";
const email = "theridgepodcast@gmail.com";
const author = "The Ridge Podcast";
const logo = "https://theridgepodcast.com/TheRidgePodcastLogoECEJLW3000x3000.png";
const site = 'https://theridgepodcast.com';

const feed = new Podcast({
    title: author,
    description: desc,
    feedUrl: 'https://theridgepodcast.com/feed/podcast/the-ridge-podcast',
    siteUrl: site,
    // author: author,
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

// feed.addItem({
//   title: 'Episode 1',
//   description: 'First episode',
//   url: 'https://example.com/ep1.mp3',
//   guid: 'https://theridgepodcast.com/?post_type=podcast&p=311',
//   date: new Date()
// });


const xml = feed.buildXml();

fs.writeFile("output.xml", xml, (err) => {

});




const filePath = path.join(episodesPath, `72-farewell.mdx`);
const source = fs.readFileSync(filePath, 'utf8');


const { content, data } = matter(source);

const mdxSource = await serialize(content);



console.log(mdxSource);
console.log(data);
