"use client";

import { useEffect, useState } from "react";

interface ControlFormProps {
  initialData: {
    control_id: string;
    title: string;
    description: string;
    framework: string;
    status: string;
    review_frequency: string;
  };

  onSubmit: (data: {
    control_id: string;
    title: string;
    description: string;
    framework: string;
    status: string;
    review_frequency: string;
  }) => void;

  onCancel: () => void;

  loading?: boolean;
}

export default function ControlForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}: ControlFormProps) {
  const [form, setForm] = useState(initialData);

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-5">
        {/* Control ID */}
        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Control ID
          </label>

          <input
            name="control_id"
            value={form.control_id}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 focus:border-rose-500 focus:outline-none transition"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Title
          </label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 focus:border-rose-500 focus:outline-none transition"
          />
        </div>

        {/* Framework */}
        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Framework
          </label>

          <select
            name="framework"
            value={form.framework}
            onChange={handleChange}
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 focus:border-rose-500 focus:outline-none"
          >
            <option>SOC 2</option>
            <option>ISO 27001</option>
            <option>NIST</option>
            <option>HIPAA</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm text-zinc-400 mb-2">
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 focus:border-rose-500 focus:outline-none"
          >
            <option>Active</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>

        {/* Review Frequency */}
        <div className="col-span-2">
          <label className="block text-sm text-zinc-400 mb-2">
            Review Frequency
          </label>

          <select
            name="review_frequency"
            value={form.review_frequency}
            onChange={handleChange}
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 focus:border-rose-500 focus:outline-none"
          >
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Annually</option>
          </select>
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm text-zinc-400 mb-2">
            Description
          </label>

          <textarea
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 focus:border-rose-500 focus:outline-none transition resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="
            px-5
            py-2.5
            rounded-xl
            bg-zinc-800
            hover:bg-zinc-700
            transition
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="
            px-5
            py-2.5
            rounded-xl
            bg-rose-600
            hover:bg-rose-500
            transition
            disabled:opacity-60
          "
        >
          {loading ? "Creating..." : "Create Control"}
        </button>
      </div>
    </form>
  );
}