export const dynamic = 'force-dynamic';

import SignOut from './signout';

export default function DashboardLayout({
    children,
}) {
    return (
        <>
            <SignOut />

            <div>
                {children}
            </div>
        </>
    );
}
