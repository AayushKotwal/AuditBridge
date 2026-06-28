"use client";

import { useEffect, useState } from "react";
import { controlsApi } from "@/services/api";

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

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  async function refresh(currentPage = page) {
    try {
      setLoading(true);

      const data = await controlsApi.getAll(
        currentPage,
        10,
      );

      setControls(data.items);

      setPage(data.page);

      setPages(data.pages);

      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  }

  async function getNextControlId() {
    const data = await controlsApi.nextId();

    return data.control_id;
  }

  async function createControl(data: any) {
    await controlsApi.create(data);
    await refresh();
  }

  async function updateControl(
    id: number,
    data: any
  ) {
    await controlsApi.update(id, data);
    await refresh();
  }

  async function deleteControl(id: number) {
    await controlsApi.delete(id);
    await refresh();
  }

  function nextPage() {
    if (page < pages) {
      refresh(page + 1);
    }
  }

  function previousPage() {
    if (page > 1) {
      refresh(page - 1);
    }
  }

  useEffect(() => {
    refresh(1);
  }, []);

  return {
    controls,
    loading,

    page,
    pages,
    total,

    nextPage,
    previousPage,

    refresh,

    getNextControlId,

    createControl,

    updateControl,

    deleteControl,
  };
}