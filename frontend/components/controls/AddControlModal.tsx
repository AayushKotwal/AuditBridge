"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";
import ControlForm from "./ControlForm";

interface AddControlModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddControlModal({
  open,
  onClose,
  onSuccess,
}: AddControlModalProps) {
  const [loading, setLoading] = useState(false);

  const [initialData, setInitialData] = useState({
    control_id: "",
    title: "",
    description: "",
    framework: "SOC 2",
    status: "Active",
    review_frequency: "Quarterly",
  });

  useEffect(() => {
    if (!open) return;

    async function loadNextId() {
      try {
        const res = await api.get("/controls/next-id");

        setInitialData({
          control_id: res.data.control_id,
          title: "",
          description: "",
          framework: "SOC 2",
          status: "Active",
          review_frequency: "Quarterly",
        });
      } catch (err) {
        console.error(err);
      }
    }

    loadNextId();
  }, [open]);

  if (!open) return null;

  async function handleSubmit(
    data: typeof initialData
  ) {
    try {
      setLoading(true);

      await api.post("/controls", {
        ...data,
        owner_id: null,
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create control.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/60
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-3xl

          rounded-3xl

          bg-zinc-950
          border
          border-zinc-800

          p-8

          shadow-2xl
        "
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">
              Create Control
            </h2>

            <p className="text-zinc-400 mt-1">
              Add a new compliance control.
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              text-zinc-500
              hover:text-white

              text-2xl

              transition
            "
          >
            ×
          </button>
        </div>

        <ControlForm
          initialData={initialData}
          loading={loading}
          onCancel={onClose}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}