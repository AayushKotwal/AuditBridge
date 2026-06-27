"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

import AppLayout from "@/components/layout/AppLayout";
import Header from "@/components/layout/Header";

import DashboardGrid from "@/components/dashboard/DashboardGrid";
import ComplianceHealth from "@/components/dashboard/ComplianceHealth";
import RecentFindings from "@/components/dashboard/RecentFindings";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import ControlsOverview from "@/components/dashboard/ControlsOverview";

export default function Home() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get("/dashboard/stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) {
    return (
      <div className="p-10 text-white">
        Loading...
      </div>
    );
  }

  return (
    <AppLayout>
      <Header />

      <DashboardGrid stats={stats} />

      <div className="mt-6">
        <ComplianceHealth />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <RecentFindings />
        <ControlsOverview />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <ActivityFeed />
      </div>
    </AppLayout>
  );
}