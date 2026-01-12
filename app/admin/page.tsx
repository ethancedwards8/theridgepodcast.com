export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

async function signIn(formData: FormData) {
    'use server';

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.get('email'),
        password: formData.get('password')
    });

    if (error) {
        console.log(error);
    } else {
        return redirect('/admin/dashboard');
    }
}

export default async function Admin() {
    return (
        <form action={signIn}>
            <input
                type="email"
                name="email"
                placeholder="email@examle.com"
                required />
            <input
                type="password"
                name="password"
                required />
            <button>Sign In</button>
        </form>
    );
}
