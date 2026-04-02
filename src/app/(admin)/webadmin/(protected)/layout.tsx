import { TooltipProvider } from "@/components/ui/tooltip";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log("Protected layout check - session:", !!session?.user, session?.user?.email);

  if (!session?.user) {
    console.log("No session found, redirecting to login...");
    redirect("/webadmin/login");
  }

  return (
    <TooltipProvider delay={0}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content area — offset by sidebar width */}
      <div className="ms-64 min-h-screen flex flex-col transition-all duration-300 peer-data-[collapsed=true]:ms-[68px]">
        <AdminTopbar user={session.user} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </TooltipProvider>
  );
}
