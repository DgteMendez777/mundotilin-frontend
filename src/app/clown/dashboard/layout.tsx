import RequireAuth from "@/components/auth/RequireAuth";
import DashboardShell from "@/components/layout/DashboardShell";

export default function ClownDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RequireAuth allowedRole="CLOWN">
            <DashboardShell>{children}</DashboardShell>
        </RequireAuth>
    );
}