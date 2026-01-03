import Link from "next/link";
import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";

import styles from '../styles/about.module.scss';

export default function About() {
  return (
    <>
    <Head>
        {generateNextSeo({
            title: "About",
            canonical: "https://theridgepodcast.com/about",
            description: "About The Ridge Podcast",
            openGraph: {
              url: 'https://theridgepodcast.com/about',
              title: "About",
            }
        })}
    </Head>

    <div className={styles.about}>
        <h1>About Us</h1>
        <p>
        The Ridge Podcast is a monthly show with a focus on interviews from the
        Blue Ridge/Appalachian area. Some guests include local officials,
        educators, business owners, historians, and people willing to share
        their stories. Episodes touch on local politics, community service,
        culture, history, education, faith, and more. Some notable guests include <Link href="/podcast/99-john-reid-republican-candidate-for-lieutenant-governor-politics-campaigning-platform-family">John Reid</Link>
        , <Link href="/podcast/49-beth-macy-dopesick-roanoke-times-factory-man-writing-journalism-research">Beth Macy</Link>
        , <Link href="/podcast/27-us-congressman-morgan-griffith-law-school-politics-family-coal-energy-insurance-advice">Morgan Griffith</Link>
        , <Link href="/podcast/45-sam-bush-musician-bluegrass-grammys-mandolin-fiddle-singing-new-grass-revival">Sam Bush</Link>
        , <Link href="/podcast/34-walter-rugaber-journalism-new-york-times-roanoke-times-richard-nixon-northwestern-georgia-watergate-civil-rights-humanities">Walter Rugaber</Link>
        , <Link href="/podcast/50-josh-deel-pbs-appalachia-hometowns-film-making-baseball-documentaries-entrepreneur">Josh Deel</Link>
        , <Link href="/podcast/15-john-bennardo-wheel-of-fortune-hollywood-afv-author-film-director-2-bill-just-a-typo-film-school">John Bennardo</Link>
        , and so <Link href="/podcast">many more</Link>.
        </p>
        <p>
        For the first 72 episodes, Ethan Carter Edwards was joined by Jeffrey
        "Luke" Watson during the interviews as a full-time co-host. After
        moving to college, however, Luke became a part-time co-host, joining in
        episodes as time permitted.
        </p>
        <p>
        When the podcast was created, it was a weekly production. Every week
        for 72 weeks, they recorded and published an episode. After a few weeks
        break, they switched to a bi-weekly schedule for around a year.
        Finally, when Ethan started his freshman year at Harvard, they switched
        to a monthly production.
        </p>
        <p>
        This labor of love has been an incredibly important part of Ethan's and Luke's
        life. It has connected them to countless amazing people and allowed them to share
        their stories with others. Additionally, the podcast serves as an archive for
        future generations. The podcast's role as an archive became more obvious to
        them after a guest unexpectedly passed away. Afterwards, they made it a point to
        interview family members and those close to them.
        </p>
        <p>
        Most of all, Ethan and Luke are incredibly thankful for the endless community
        and individual support. The Ridge Podcast would not exist today without its 
        listeners and fans. Thank you.
        </p>
        <h2>Meet the Hosts:</h2>
        <div className={styles.grid}>
            <div className={styles.host}>
                <div>
                    <h3>Ethan Carter Edwards</h3>
                    <img src="/EthanSuitSteps.jpg" alt="Ethan" />
                </div>

                <p>
                    Ethan is the owner, host, editor, webmaster, and manager of
                    The Ridge Podcast. He is 2025 graduate of Carroll County
                    High School and Wytheville Communtiy College. Currently, he
                    is a first-year at Harvard and can be contacted at
                    <a href="mailto:ethan@ethancedwards.com"> ethan@ethancedwards.com</a>.
                </p>
            </div>
            <div className={`${styles.luke} ${styles.host}`}>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit quisque
                    faucibus ex sapien vitae pellentesque sem placerat in id cursus
                    mi pretium tellus duis convallis tempus leo eu aenean sed diam
                    urna tempor pulvinar vivamus fringilla lacus nec metus bibendum
                    egestas.
                </p>

                <div>
                    <h3>Jeffrey (Luke) Watson</h3>
                    <img src="/jeffreylukewatson.jpeg" alt="Ethan" />
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

