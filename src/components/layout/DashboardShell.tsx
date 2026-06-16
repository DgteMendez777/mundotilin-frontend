import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

type DashboardShellProps = { children: React.ReactNode }

export default function DashboardShell({ children }: DashboardShellProps) {
    return (
        <div className="min-h-screen bg-(--background) text-(--text-main)">
            <DashboardSidebar />

            <div className="min-h-screen lg:pl-72">
                <DashboardHeader />
                <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}