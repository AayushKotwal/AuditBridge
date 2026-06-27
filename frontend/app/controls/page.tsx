"use client";

import { useState } from "react";

import useControls from "@/hooks/useControls";

import ControlsToolbar from "@/components/controls/ControlsToolbar";
import ControlsTable from "@/components/controls/ControlsTable";
import ControlForm from "@/components/controls/ControlForm";

import { Control } from "@/components/controls/ControlColumns";

export default function ControlsPage() {
  const {
    controls,
    refresh,
  } = useControls();

  const [search, setSearch] = useState("");

  const [framework, setFramework] = useState("");

  const [status, setStatus] = useState("");

  const [open, setOpen] = useState(false);

  const handleExport = () => {
    const json = JSON.stringify(
      controls,
      null,
      2
    );

    const blob = new Blob(
      [json],
      {
        type: "application/json",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download = "controls.json";

    a.click();

    window.URL.revokeObjectURL(url);
  };

  const handleEdit = (
    control: Control
  ) => {
    console.log("Edit", control);
  };

  const handleDelete = (
    control: Control
  ) => {
    console.log("Delete", control);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Controls
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage compliance controls across
          frameworks.
        </p>
      </div>

      <ControlsToolbar
        search={search}
        setSearch={setSearch}
        framework={framework}
        setFramework={setFramework}
        status={status}
        setStatus={setStatus}
        onAdd={() => setOpen(true)}
        onExport={handleExport}
      />

      <ControlsTable
              controls={controls}
              search={search}
              framework={framework}
              status={status}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
      
      {open && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div className="w-full max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
      <ControlForm
        initialData={{
          control_id: "",
          title: "",
          description: "",
          framework: "SOC 2",
          status: "Pending",
          review_frequency: "Quarterly",
        }}
        onCancel={() => setOpen(false)}
        onSubmit={(data) => {
          console.log(data);

          setOpen(false);

          refresh();
        }}
      />
    </div>
  </div>
)}
          </div>
        );
      }