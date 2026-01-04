import speakers from './speakers.json';

export function getSpeaker(slug: string): string {
    return speakers[slug];
}

