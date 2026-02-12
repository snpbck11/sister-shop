import { requireSessionPage } from "@/shared/auth/requireSessionPage";
import { AdminSidebar } from "@/widgets/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireSessionPage();

  return (
    <div className="flex h-screen bg-admin-background">
      <AdminSidebar />
      <main className="flex-1 min-h-0 overflow-hidden p-4 lg:p-8">{children}</main>
    </div>
  );
}
