"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CalendarDays, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/app/(admin)/webadmin/login/actions";
import type { User } from "next-auth";

const routeLabels: Record<string, string> = {
  webadmin: "Dashboard",
  leads: "Demande de diagnostic",
  protocoles: "Protocoles",
  catalogue: "Catalogue",
  blog: "Blog",
};

export default function AdminTopbar({ user }: { user?: User }) {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<any>(user);

  useEffect(() => {
    const fetchLatestUser = async () => {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch latest user info:", err);
      }
    };

    fetchLatestUser();

    window.addEventListener("profile-updated", fetchLatestUser);
    return () => {
      window.removeEventListener("profile-updated", fetchLatestUser);
    };
  }, []);

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((s) => s !== "webadmin" || pathname === "/webadmin");

  const breadcrumbs = pathname === "/webadmin"
    ? [{ label: "Dashboard", href: "/webadmin", isCurrent: true }]
    : pathname
        .split("/")
        .filter(Boolean)
        .map((segment, index, arr) => ({
          label: routeLabels[segment] || segment,
          href: "/" + arr.slice(0, index + 1).join("/"),
          isCurrent: index === arr.length - 1,
        }));

  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 border-b bg-white/80 backdrop-blur-xl px-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {crumb.isCurrent ? (
                  <BreadcrumbPage className="font-semibold text-slate-900">
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.href} className="text-slate-500 hover:text-slate-900">
                    {crumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Date */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 capitalize">
          <CalendarDays className="w-3.5 h-3.5" />
          {today}
        </div>

        {/* Notifications */}
        <button className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-slate-100 transition-colors">
          <Bell className="w-4 h-4 text-slate-500" />
          <span className="absolute top-1.5 end-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        </button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-slate-100 transition-colors outline-none">
            <Avatar className="w-8 h-8">
              {currentUser?.image && (
                <AvatarImage src={currentUser.image} alt={currentUser.name || "Avatar"} />
              )}
              <AvatarFallback className="bg-[#0A2540] text-white text-xs font-bold uppercase">
                {currentUser?.name?.substring(0, 2) || "MN"}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-sm font-semibold text-slate-800">{currentUser?.name || "Administrateur"}</span>
              <span className="text-[10px] text-slate-500">{currentUser?.email || "Admin"}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0">
                <Link href="/webadmin/parametres" className="flex w-full px-1.5 py-1">
                  Paramètres
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <form action={logout}>
                <button type="submit" className="w-full text-left">
                  <DropdownMenuItem className="text-red-600">Déconnexion</DropdownMenuItem>
                </button>
              </form>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
