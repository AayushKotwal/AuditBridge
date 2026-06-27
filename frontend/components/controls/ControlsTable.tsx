"use client";

import { useMemo } from "react";

import DataTable from "@/components/ui/data-table/DataTable";

import controlColumns, {
  Control,
} from "./ControlColumns";

interface ControlsTableProps {
  controls: Control[];

  search: string;

  framework: string;

  status: string;

  onEdit: (control: Control) => void;

  onDelete: (control: Control) => void;
}

export default function ControlsTable({
  controls,

  search,

  framework,

  status,

  onEdit,

  onDelete,
}: ControlsTableProps) {
  const filteredControls = useMemo(() => {
    return controls.filter((control) => {
      const matchesSearch =
        search === "" ||
        control.control_id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        control.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        control.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFramework =
        framework === "" ||
        control.framework === framework;

      const matchesStatus =
        status === "" ||
        control.status === status;

      return (
        matchesSearch &&
        matchesFramework &&
        matchesStatus
      );
    });
  }, [
    controls,
    search,
    framework,
    status,
  ]);

  const columns = useMemo(
    () =>
      controlColumns({
        onEdit,
        onDelete,
      }),
    [onEdit, onDelete]
  );

  return (
    <DataTable
    columns={columns}
    data={filteredControls}
  />
);
}