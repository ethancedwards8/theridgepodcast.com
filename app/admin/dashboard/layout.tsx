export const dynamic = 'force-dynamic';

export default function DashboardLayout({
    children,
}) {
    return (
        <>
            <div>
                {children}
            </div>
        </>
    );
}
