"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

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

const statusColors: Record<string, string> = {
  Implemented:
    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",

  "In Progress":
    "bg-amber-500/10 text-amber-400 border border-amber-500/20",

  Pending:
    "bg-rose-500/10 text-rose-400 border border-rose-500/20",
};

interface Props {
  onEdit: (control: Control) => void;
  onDelete: (control: Control) => void;
}

export default function controlColumns({
  onEdit,
  onDelete,
}: Props): ColumnDef<Control>[] {
  return [
    {
      accessorKey: "control_id",
      header: "Control ID",
    },

    {
      accessorKey: "title",

      header: "Title",

      cell: ({ row }) => (
        <div>
          <div className="font-semibold text-white">
            {row.original.title}
          </div>

          <div className="text-xs text-zinc-500 mt-1 line-clamp-1">
            {row.original.description}
          </div>
        </div>
      ),
    },

    {
      accessorKey: "framework",

      header: "Framework",

      cell: ({ row }) => (
        <span className="text-zinc-300">
          {row.original.framework}
        </span>
      ),
    },

    {
      accessorKey: "status",

      header: "Status",

      cell: ({ row }) => (
        <span
          className={`
            inline-flex
            items-center

            rounded-full

            px-3
            py-1

            text-xs
            font-medium

            ${
              statusColors[
                row.original.status
              ] ??
              "bg-zinc-900 text-zinc-400 border border-zinc-700"
            }
          `}
        >
          {row.original.status}
        </span>
      ),
    },

    {
      accessorKey: "review_frequency",

      header: "Review",

      cell: ({ row }) => row.original.review_frequency,
    },

    {
      accessorKey: "owner_id",

      header: "Owner",

      cell: ({ row }) => (
        <span className="text-zinc-300">
          User #{row.original.owner_id}
        </span>
      ),
    },

    {
      id: "actions",

      header: "",

      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onEdit(row.original)}
            className="
              p-2

              rounded-lg

              hover:bg-zinc-800

              transition-all
            "
          >
            <Pencil
              size={16}
              className="text-zinc-400"
            />
          </button>

          <button
            onClick={() =>
              onDelete(row.original)
            }
            className="
              p-2

              rounded-lg

              hover:bg-rose-950

              transition-all
            "
          >
            <Trash2
              size={16}
              className="text-rose-400"
            />
          </button>
        </div>
      ),
    },
  ];
}