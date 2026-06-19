import RoleGuard from "@/components/auth/RoleGuard";
import ClientSidebar from "@/components/client/ClientSidebar";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRole="CLIENT">
      <main className="min-h-screen bg-(--background) text-(--text-main)">
        <ClientSidebar />

        <section className="min-h-screen px-4 py-6 lg:ml-72 lg:px-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </section>
      </main>
    </RoleGuard>
  );
}