"use client";

import { AudioPlayer } from 'react-audio-play';

const URL = "https://media.theridgepodcast.com/"

export default function MyAudioPlayer({ slug }) {
    return <AudioPlayer src={URL + slug + '.mp3'} />
}
