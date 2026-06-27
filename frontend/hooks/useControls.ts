"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export interface Control {
  id: number;
  control_id: string;
  title: string;
  description: string;
  framework: string;
  status: string;
  review_frequency: string;
  owner_id: number;
}

export default function useControls() {
  const [controls, setControls] = useState<Control[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      setLoading(true);
      const res = await api.get("/controls");
      setControls(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    controls,
    loading,
    refresh,
    setControls,
  };
}