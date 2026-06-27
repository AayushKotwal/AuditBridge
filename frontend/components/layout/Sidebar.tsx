"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/icons/Logo";

import DashboardIcon from "@/components/icons/DashboardIcon";
import ControlsIcon from "@/components/icons/ControlsIcon";
import EvidenceIcon from "@/components/icons/EvidenceIcon";
import RequestsIcon from "@/components/icons/RequestIcon";
import FindingsIcon from "@/components/icons/FindingsIcon";
import RemediationIcon from "@/components/icons/RemediationIcon";
import ReportsIcon from "@/components/icons/ReportsIcon";

const menuItems = [
  { name: "Dashboard", href: "/", icon: DashboardIcon },
  { name: "Controls", href: "/controls", icon: ControlsIcon },
  { name: "Evidence", href: "/evidence", icon: EvidenceIcon },
  { name: "Requests", href: "/audit-requests", icon: RequestsIcon },
  { name: "Findings", href: "/findings", icon: FindingsIcon },
  { name: "Remediation", href: "/remediation", icon: RemediationIcon },
  { name: "Reports", href: "/reports", icon: ReportsIcon },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function Sidebar({
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        ${collapsed ? "w-20" : "w-56"}
        min-h-screen
        bg-black
        border-r
        border-zinc-900
        flex
        flex-col
        transition-all
        duration-500
        ease-in-out
      `}
    >
      {/* Logo */}
      <div
        className={`
          h-20
          flex
          items-center
          border-b
          border-zinc-900
          ${collapsed ? "justify-center" : "px-5"}
        `}
      >
        <Logo />

        <span
          className={`
            ml-3
            text-lg
            font-bold
            whitespace-nowrap
            overflow-hidden
            transition-all
            duration-500
            ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
          `}
        >
          AuditBridge
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <div
              key={item.name}
              className="relative group"
            >
              <Link
                href={item.href}
                className={`
                  flex
                  items-center
                  gap-3
                  px-3
                  py-3
                  rounded-xl
                  transition-all
                  duration-200
                  ${
                    active
                      ? "bg-rose-950 text-rose-400"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />

                <span
                  className={`
                    whitespace-nowrap
                    overflow-hidden
                    transition-all
                    duration-500
                    ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
                  `}
                >
                  {item.name}
                </span>
              </Link>

              {collapsed && (
                <div
                  className="
                    absolute
                    left-16
                    top-1/2
                    -translate-y-1/2
                    px-3
                    py-2
                    rounded-lg
                    bg-zinc-900
                    border
                    border-zinc-800
                    text-sm
                    text-white
                    whitespace-nowrap
                    opacity-0
                    translate-x-2
                    group-hover:opacity-100
                    group-hover:translate-x-0
                    transition-all
                    duration-200
                    pointer-events-none
                    z-[9999]
                  "
                >
                  {item.name}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <div className="flex justify-center py-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            text-zinc-500
            hover:text-rose-400
            transition-all
            duration-300
            hover:scale-110
            active:scale-95
          "
        >
          <div
            className={`
              text-lg
              transition-transform
              duration-500
              ${collapsed ? "rotate-180" : ""}
            `}
          >
            ❮
          </div>
        </button>
      </div>
    </aside>
  );
}