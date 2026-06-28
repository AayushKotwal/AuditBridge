"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  pages: number;
  total: number;
  pageSize?: number;

  onPrevious: () => void;
  onNext: () => void;
}

export default function Pagination({
  page,
  pages,
  total,
  pageSize = 10,
  onPrevious,
  onNext,
}: PaginationProps) {
  const start =
    total === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const end = Math.min(
    page * pageSize,
    total
  );

  return (
    <div className="mt-6 flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-4">

      <button
        onClick={onPrevious}
        disabled={page === 1}
        className="flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      <div className="text-center">
        <p className="font-medium text-white">
          Page {page} of {pages}
        </p>

        <p className="mt-1 text-sm text-zinc-500">
          Showing {start}–{end} of {total} controls
        </p>
      </div>

      <button
        onClick={onNext}
        disabled={page === pages}
        className="flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight size={16} />
      </button>

    </div>
  );
}