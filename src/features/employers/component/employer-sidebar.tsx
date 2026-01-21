"use client";

import { LogOutAction } from "@/features/auth/server/auth.action";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  Plus,
  Briefcase,
  Bookmark,
  CreditCard,
  Building,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const base = "/employer-dashboard";

const navigationItems = [
  { name: "Overview", icon: LayoutDashboard, href: base },
  { name: "Employers Profile", icon: User, href: base + "/profile" },
  { name: "Post a Job", icon: Plus, href: base + "/post-job" },
  { name: "My Jobs", icon: Briefcase, href: base + "/jobs" },
  { name: "Saved Candidate", icon: Bookmark, href: base + "/saved" },
  { name: "Plans & Billing", icon: CreditCard, href: base + "/billing" },
  { name: "All Companies", icon: Building, href: base + "/companies" },
  { name: "Settings", icon: Settings, href: base + "/settings" },
];

function isLinkActive(href: string, pathname: string) {
  const normalizedHref = href.replace(/\/$/, "");
  const normalizedPath = pathname.replace(/\/$/, "");

  // Special case for the dashboard root
  if (normalizedHref === "/employer-dashboard") {
    return normalizedPath === "/employer-dashboard";
  }

  return (
    normalizedPath === normalizedHref ||
    normalizedPath.startsWith(normalizedHref + "/")
  );
}

const EmployerSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-card border-r border-border fixed bottom-0 top-0">
      <div className="p-6">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Employers Dashboard
        </h2>
      </div>

      <nav className="px-3 space-y-1">
        {navigationItems.map((curNav) => {
          const Icon = curNav.icon;

          return (
            <Link
              key={curNav.name}
              href={curNav.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isLinkActive(curNav.href, pathname) &&
                  "text-primary bg-blue-500"
              )}
            >
              <Icon className="h-4 w-4" />
              {curNav.name}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-3 right-3">
        <button
          onClick={LogOutAction}
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Log-out
        </button>
      </div>
    </div>
  );
};

export default EmployerSidebar;
