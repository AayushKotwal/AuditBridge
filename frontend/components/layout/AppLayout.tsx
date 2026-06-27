"use client";

import { useState } from "react";

import Sidebar from "@/components/layout/Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] =
    useState(true);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main
        className="
          flex-1
          p-8
          overflow-auto
        "
      >
        {children}
      </main>
    </div>
  );
}