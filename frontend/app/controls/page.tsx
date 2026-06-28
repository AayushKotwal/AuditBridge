"use client";

import { useState } from "react";
import { toast } from "sonner";

import useControls from "@/hooks/useControls";

import ControlsToolbar from "@/components/controls/ControlsToolbar";
import ControlsTable from "@/components/controls/ControlsTable";
import ControlForm from "@/components/controls/ControlForm";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import Pagination from "@/components/ui/Pagination";
import { Control } from "@/components/controls/ControlColumns";

export default function ControlsPage() {
  const {
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
  } = useControls();

  const [search, setSearch] = useState("");
  const [framework, setFramework] = useState("");
  const [status, setStatus] = useState("");

  const [open, setOpen] = useState(false);

  const [editingControl, setEditingControl] =
    useState<Control | null>(null);

  const [deleteTarget, setDeleteTarget] =
    useState<Control | null>(null);

  const [deleting, setDeleting] =
    useState(false);

  const [nextControlId, setNextControlId] =
    useState("");

  const handleExport = () => {
    const json = JSON.stringify(
      controls,
      null,
      2
    );

    const blob = new Blob([json], {
      type: "application/json",
    });

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = "controls.json";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  const handleAdd = async () => {
    setEditingControl(null);

    const id =
      await getNextControlId();

    setNextControlId(id);

    setOpen(true);
  };

  const handleEdit = (
    control: Control
  ) => {
    setEditingControl(control);
    setOpen(true);
  };

  const handleDelete = (
    control: Control
  ) => {
    setDeleteTarget(control);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);

      await deleteControl(deleteTarget.id);

      toast.success(
        "Control deleted successfully"
      );

      setDeleteTarget(null);
    } catch (err) {
      console.error(err);

      toast.error(
        "Failed to delete control"
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Controls
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage compliance controls across frameworks.
        </p>
      </div>

      <ControlsToolbar
        search={search}
        setSearch={setSearch}
        framework={framework}
        setFramework={setFramework}
        status={status}
        setStatus={setStatus}
        onAdd={handleAdd}
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

      <Pagination
        page={page}
        pages={pages}
        total={total}
        onPrevious={previousPage}
        onNext={nextPage}
      />

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
            <ControlForm
              initialData={{
                control_id:
                  editingControl?.control_id ??
                  nextControlId,

                title:
                  editingControl?.title ?? "",

                description:
                  editingControl?.description ??
                  "",

                framework:
                  editingControl?.framework ??
                  "SOC 2",

                status:
                  editingControl?.status ??
                  "Pending",

                review_frequency:
                  editingControl?.review_frequency ??
                  "Quarterly",
              }}
              isEditing={editingControl !== null}
              onCancel={() => {
                setEditingControl(null);
                setNextControlId("");
                setOpen(false);
              }}
              onSubmit={async (data) => {
                try {
                  if (editingControl) {
                    await updateControl(
                      editingControl.id,
                      {
                        ...data,
                        owner_id:
                          editingControl.owner_id,
                      }
                    );

                    toast.success(
                      "Control updated successfully"
                    );
                  } else {
                    await createControl({
                      ...data,
                      owner_id: 1,
                    });

                    toast.success(
                      "Control created successfully"
                    );
                  }

                  await refresh();

                  setEditingControl(null);
                  setNextControlId("");
                  setOpen(false);
                } catch (err) {
                  console.error(err);

                  toast.error(
                    editingControl
                      ? "Failed to update control"
                      : "Failed to create control"
                  );
                }
              }}
            />
          </div>
        </div>
      )}

      <ConfirmationDialog
        open={deleteTarget !== null}
        title="Delete Control"
        description={
          deleteTarget
            ? `Are you sure you want to permanently delete "${deleteTarget.title}"? This action cannot be undone.`
            : ""
        }
        loading={deleting}
        onCancel={() =>
          setDeleteTarget(null)
        }
        onConfirm={confirmDelete}
      />
    </div>
  );
}