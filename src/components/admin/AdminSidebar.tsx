"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FlaskConical,
  Package,
  FileText,
  FlaskRound,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  FolderOpen,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
  children?: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
};

const navItems: NavItem[] = [
  {
    href: "/webadmin",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/webadmin/leads",
    label: "Leads & Diagnostics",
    icon: Users,
  },
  {
    href: "/webadmin/protocoles",
    label: "Protocoles",
    icon: FlaskConical,
  },
  {
    href: "/webadmin/catalogue",
    label: "Catalogue",
    icon: Package,
  },
  {
    href: "/webadmin/blog",
    label: "Blog",
    icon: FileText,
    children: [
      {
        href: "/webadmin/blog",
        label: "Articles",
        icon: Layers,
      },
      {
        href: "/webadmin/blog/categories",
        label: "Catégories",
        icon: FolderOpen,
      },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["/webadmin/blog"]);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const isGroupActive = (href: string) => pathname.startsWith(href);

  const toggleGroup = (href: string) => {
    setExpandedGroups((prev) =>
      prev.includes(href) ? prev.filter((g) => g !== href) : [...prev, href]
    );
  };

  const renderNavItem = (item: NavItem) => {
    const active = isActive(item.href, item.exact);
    const hasChildren = item.children && item.children.length > 0;
    const groupActive = hasChildren && isGroupActive(item.href);
    const isExpanded = expandedGroups.includes(item.href);

    // If item has children, render as expandable group
    if (hasChildren && !collapsed) {
      return (
        <div key={item.href}>
          <button
            onClick={() => toggleGroup(item.href)}
            className={cn(
              "group flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200 w-full px-3 py-2.5",
              groupActive
                ? "bg-white/12 text-white"
                : "text-slate-400 hover:text-white hover:bg-white/6"
            )}
          >
            <item.icon
              className={cn(
                "w-[18px] h-[18px] shrink-0 transition-colors",
                groupActive
                  ? "text-emerald-400"
                  : "text-slate-500 group-hover:text-slate-300"
              )}
            />
            <span>{item.label}</span>
            <ChevronDown
              className={cn(
                "ms-auto w-3.5 h-3.5 transition-transform duration-200",
                isExpanded ? "rotate-0" : "-rotate-90"
              )}
            />
          </button>
          {isExpanded && (
            <div className="mt-1 ms-4 border-s border-white/10 ps-2 space-y-0.5">
              {item.children!.map((child) => {
                const childActive = child.href === "/webadmin/blog"
                  ? pathname === "/webadmin/blog"
                  : pathname.startsWith(child.href);
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md text-[13px] font-medium transition-all duration-200 px-2.5 py-2",
                      childActive
                        ? "bg-white/10 text-white"
                        : "text-slate-500 hover:text-white hover:bg-white/6"
                    )}
                  >
                    <child.icon
                      className={cn(
                        "w-4 h-4 shrink-0",
                        childActive ? "text-emerald-400" : "text-slate-600"
                      )}
                    />
                    <span>{child.label}</span>
                    {childActive && (
                      <div className="ms-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    // Standard single item
    const linkContent = (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "group flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200",
          collapsed ? "justify-center p-2.5" : "px-3 py-2.5",
          active
            ? "bg-white/12 text-white shadow-sm"
            : "text-slate-400 hover:text-white hover:bg-white/6"
        )}
      >
        <item.icon
          className={cn(
            "shrink-0 transition-colors",
            collapsed ? "w-5 h-5" : "w-[18px] h-[18px]",
            active
              ? "text-emerald-400"
              : "text-slate-500 group-hover:text-slate-300"
          )}
        />
        {!collapsed && <span>{item.label}</span>}
        {active && !collapsed && (
          <div className="ms-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
        )}
      </Link>
    );

    if (collapsed) {
      return (
        <Tooltip key={item.href}>
          <TooltipTrigger
            render={linkContent}
          />
          <TooltipContent side="right" className="font-medium">
            {item.label}
          </TooltipContent>
        </Tooltip>
      );
    }

    return linkContent;
  };

  return (
    <aside
      className={cn(
        "fixed top-0 start-0 z-40 h-screen flex flex-col border-e border-white/10 transition-all duration-300",
        collapsed ? "w-[68px]" : "w-64"
      )}
      style={{ background: "#0A2540" }}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center h-16 border-b border-white/10 shrink-0",
        collapsed ? "justify-center px-2" : "px-5"
      )}>
        <Link href="/webadmin" className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500/20">
            <FlaskRound className="w-5 h-5 text-emerald-400" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-white tracking-wide">N2K</span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Admin</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className={cn("flex flex-col gap-1", collapsed ? "px-2" : "px-3")}>
          <div className={cn(
            "text-[10px] font-semibold tracking-widest uppercase text-slate-500 mb-2",
            collapsed ? "text-center" : "px-3"
          )}>
            {collapsed ? "•" : "Navigation"}
          </div>
          {navItems.map((item) => renderNavItem(item))}
        </nav>
      </ScrollArea>

      {/* Collapse Toggle */}
      <div className={cn(
        "shrink-0 border-t border-white/10 p-3",
        collapsed ? "flex justify-center" : ""
      )}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full gap-2 rounded-lg px-3 py-2 text-xs text-slate-500 hover:text-slate-300 hover:bg-white/6 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Réduire</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
