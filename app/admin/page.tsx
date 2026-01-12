export const dynamic = 'force-dynamic';

import styles from '@/styles/admin.module.scss';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Admin",
    robots: {
        index: false,
        follow: false,
        googleBot: {
        index: false,
        follow: false,
        },
    },
}

async function signIn(formData: FormData) {
    'use server';

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.get('email') as string,
        password: formData.get('password') as string
    });

    if (error) {
        console.log(error);
    } else {
        return redirect('/admin/dashboard');
    }
}

export default async function Admin() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        redirect('/admin/dashboard');
    }

    return (
        <div>

        <form action={signIn} className={styles.login}>
            <label htmlFor="email">Email: </label><br />
            <input
                type="email"
                name="email"
                placeholder="email@examle.com"
                required /><br />
            <label htmlFor="password">Password: </label><br />
            <input
                type="password"
                name="password"
                required /><br />
            <button>Sign In</button>
        </form>

        </div>
    );
}
