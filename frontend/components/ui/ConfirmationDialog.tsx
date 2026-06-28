"use client";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  description: string;

  confirmText?: string;
  cancelText?: string;

  loading?: boolean;

  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationDialog({
  open,
  title,
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/60
        backdrop-blur-sm
        animate-in fade-in duration-200
      "
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-md

          rounded-3xl

          border
          border-zinc-800

          bg-zinc-950

          p-8

          shadow-2xl
        "
      >
        <h2 className="text-xl font-semibold text-white">
          {title}
        </h2>

        <p className="mt-3 text-zinc-400 leading-relaxed">
          {description}
        </p>
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="
              px-5
              py-2.5

              rounded-xl

              bg-zinc-800
              hover:bg-zinc-700

              text-white

              transition

              disabled:opacity-50
            "
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
              px-5
              py-2.5

              rounded-xl

              bg-rose-600
              hover:bg-rose-500

              text-white

              transition

              disabled:opacity-50
            "
          >
            {loading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}