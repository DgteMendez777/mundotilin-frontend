import RequireAuth from "@/components/auth/RequireAuth";
import DashboardShell from "@/components/layout/DashboardShell";
import RoleGuard from "@/components/auth/RoleGuard";

export default function ClownDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RoleGuard allowedRole="CLOWN">
        <RequireAuth allowedRole="CLOWN">
            <DashboardShell>{children}</DashboardShell>
        </RequireAuth>
        </RoleGuard>
    );
}