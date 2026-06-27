"use client";

import { Download, Plus } from "lucide-react";

import SearchInput from "@/components/ui/search-input";
import Dropdown from "@/components/ui/dropdown";
import Button from "@/components/ui/button";

interface ControlsToolbarProps {
  search: string;
  setSearch: (value: string) => void;

  framework: string;
  setFramework: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  onAdd: () => void;
  onExport: () => void;
}

const frameworkOptions = [
  {
    label: "All Frameworks",
    value: "",
  },
  {
    label: "ISO 27001",
    value: "ISO 27001",
  },
  {
    label: "SOC 2",
    value: "SOC 2",
  },
  {
    label: "NIST",
    value: "NIST",
  },
];

const statusOptions = [
  {
    label: "All Status",
    value: "",
  },
  {
    label: "Implemented",
    value: "Implemented",
  },
  {
    label: "In Progress",
    value: "In Progress",
  },
  {
    label: "Pending",
    value: "Pending",
  },
];

export default function ControlsToolbar({
  search,
  setSearch,

  framework,
  setFramework,

  status,
  setStatus,

  onAdd,
  onExport,
}: ControlsToolbarProps) {
  return (
    <div
      className="
        mb-8

        rounded-3xl

        border
        border-zinc-800

        bg-zinc-950/60

        backdrop-blur-xl

        p-6

        shadow-xl
        shadow-black/30
      "
    >
      <div
        className="
          flex

          flex-col
          xl:flex-row

          gap-4

          xl:items-center
          xl:justify-between
        "
      >
        {/* Search */}
        <div
          className="
            flex-1

            max-w-xl
          "
        >
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search controls..."
          />
        </div>

        {/* Actions */}
        <div
          className="
            flex

            flex-wrap

            items-center

            gap-3
          "
        >
          <Dropdown
            value={framework}
            onChange={setFramework}
            placeholder="Framework"
            options={frameworkOptions}
          />

          <Dropdown
            value={status}
            onChange={setStatus}
            placeholder="Status"
            options={statusOptions}
          />
                    <Button
            variant="secondary"
            onClick={onExport}
            className="
              min-w-[120px]
              rounded-2xl
            "
          >
            <Download size={18} />

            Export
          </Button>

          <Button
            onClick={onAdd}
            className="
              min-w-[160px]
              rounded-2xl

              bg-rose-600
              hover:bg-rose-500

              shadow-lg
              shadow-rose-900/30
            "
          >
            <Plus size={18} />

            Add Control
          </Button>
        </div>
      </div>
    </div>
  );
}