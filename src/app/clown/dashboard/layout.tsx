import DashboardShell from "@/components/layout/DashboardShell";

export default function ClownDashboardLayout({ children }: { children: React.ReactNode }) {
    return <DashboardShell>{children}</DashboardShell>;
}