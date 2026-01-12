import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

async function signOut() {
    'use server';

    const supabase = await createClient();

    await supabase.auth.signOut({ scope: 'local' });

    return redirect('/admin');
}

export default async function SignOut() {

    return (
        <form action={signOut}>
            <button>Sign Out</button>
        </form>
    );
}
