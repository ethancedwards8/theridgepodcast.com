import type { Metadata } from 'next'

const desc = "Saving the stories we grew up hearing."

import styles from '@/styles/sftr.module.scss';

export const metadata: Metadata = {
    title: "Stories From The Ridge",
    alternates: { canonical: "https://theridgepodcast.com/sftr" },
    description: desc,
    openGraph: {
        url: 'https://theridgepodcast.com/sftr',
        title: "Stories From The Ridge",
    }
}

export default function SFTR() {
    return (
        <div className={styles.about}>
            <h1>Stories From The Ridge: Saving the stories we grew up hearing.</h1>
            <p>
            For generations, stories have been passed from person to person orally.
            Unfortunately, many of those stories are never written down or recorded,
            leading to them being forgotten. Many families cherish the tales told by
            their relatives, friends, and community members on their front porches,
            in their living rooms, and around the dinner table.
            </p>
            <p>
            The Ridge Podcast's <em>Stories From The Ridge</em> aims to
            preserve those stories by allowing local members of the Blue
            Ridge/Appalachian community to record and submit their own
            recordings to be published and archived for future generations to
            hear.
            </p>
            <p>
            If you would like to submit your own recordings, please feel free to reach
            out at <a href="mailto:theridgepodcast@gmail.com"> theridgepodcast@gmail.com</a>.
            Alternatively, if you have not recorded an interview yet but would like some starting
            questions to ask to get the interview flowing naturally, here are a few:
            </p>
            <ul>
                <li>What's your name and where/when were you born?</li>
                <li>Tell me about where you grew up</li>
                <li>What were your parent's names?</li>
                <li>What did your parents do?</li>
                <li>Where did you go to school?</li>
                <li>What was your first job?</li>
            </ul>
            <p>
            We ask that the following information is included with each submission:
            </p>
            <ul>
                <li>Name (or anonymous)</li>
                <li>Year of birth (optional)</li>
                <li>Town/county recorded in</li>
                <li>Recording date</li>
                <li>If there are multiple recordings organized by topic, please include the topic</li>
                <li>Topics like farming, family, faith, war, agriculture, church, military, veteran, etc.</li>
            </ul>
        </div>
    );
}
